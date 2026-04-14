"""FastAPI app — POST audio + video, get a depression-likelihood prediction."""
from __future__ import annotations

import os
import shutil
import tempfile
from pathlib import Path
from typing import Annotated, Optional

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field

from features import (
    extract_audio_features,
    extract_video_features,
    zero_sequence,
)
from model_service import get_service

API_DESCRIPTION = """
Multimodal Depression Detection API.

A research-focused service that runs the trained Keras model
(`depression_model.h5`) over uploaded **audio** and/or **video** clips and
returns a depression-likelihood label with confidence breakdowns.

* **Model:** D-Vlog champion checkpoint (Keras 3.10) — audio `(1, 25)` + video `(1, 136)`
* **Audio features:** librosa MFCC, mean-pooled across time
* **Video features:** MediaPipe FaceMesh landmarks (68 × xy), mean-pooled across frames

Open `/docs` for the Swagger UI or `/redoc` for ReDoc.
"""

tags_metadata = [
    {"name": "system", "description": "Health and metadata endpoints."},
    {"name": "inference", "description": "Run the multimodal model on uploaded media."},
]

app = FastAPI(
    title="Multimodal Depression Detection API",
    description=API_DESCRIPTION,
    version="0.1.0",
    contact={"name": "MindScope AI"},
    license_info={"name": "Research / educational use"},
    openapi_tags=tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow the Next.js dev server (and prod origin via env)
EXTRA_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", *EXTRA_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- schemas ----------
class HealthOK(BaseModel):
    status: str = Field(example="ok")
    audio_input: list[int] = Field(example=[1, 25], description="[time_steps, feature_dim] for audio input")
    video_input: list[int] = Field(example=[1, 136], description="[time_steps, feature_dim] for video input")


class HealthMissing(BaseModel):
    status: str = Field(example="model_missing")
    detail: str


class PredictionResponse(BaseModel):
    prediction: str = Field(example="Depressed")
    message: str = Field(
        example="The model detects multimodal indicators consistent with depression.",
    )


class ErrorResponse(BaseModel):
    detail: str


# ---------- routes ----------
@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    """Redirect the root to Swagger so visitors see the API docs."""
    return RedirectResponse(url="/docs")


@app.get(
    "/health",
    tags=["system"],
    summary="Service & model health",
    response_model=HealthOK,
    responses={503: {"model": HealthMissing, "description": "Model file not found"}},
)
def health():
    try:
        svc = get_service()
        return {
            "status": "ok",
            "audio_input": [svc.audio_time, svc.audio_dim],
            "video_input": [svc.video_time, svc.video_dim],
            "audio_scaler": svc.has_audio_scaler,
            "video_scaler": svc.has_video_scaler,
        }
    except FileNotFoundError as e:
        return {"status": "model_missing", "detail": str(e)}


def _save_upload(upload: UploadFile, suffix: str) -> Path:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    try:
        shutil.copyfileobj(upload.file, tmp)
    finally:
        tmp.close()
    return Path(tmp.name)


def _label_for(score: float) -> tuple[str, str]:
    """Map a 0–1 sigmoid score to a binary label + message."""
    if score < 0.5:
        return (
            "Not Depressed",
            "The model does not detect significant indicators of depression in the provided signals.",
        )
    return (
        "Depressed",
        "The model detects multimodal indicators consistent with depression.",
    )


@app.post(
    "/predict",
    tags=["inference"],
    summary="Run depression prediction on audio and/or video",
    description=(
        "Upload at least one of `audio` or `video` (multipart form data). "
        "The server extracts features, runs the multimodal Keras model, and "
        "returns a label + confidence breakdown."
    ),
    response_model=PredictionResponse,
    responses={
        400: {"model": ErrorResponse, "description": "No media supplied."},
        500: {"model": ErrorResponse, "description": "Inference failure."},
    },
)
async def predict(
    audio: Annotated[
        Optional[UploadFile],
        File(description="Audio file (mp3, wav, ogg, ...)."),
    ] = None,
    video: Annotated[
        Optional[UploadFile],
        File(description="Video file (mp4, mov, webm, ...)."),
    ] = None,
):
    if audio is None and video is None:
        raise HTTPException(status_code=400, detail="Provide at least one of audio or video.")

    svc = get_service()

    audio_path: Path | None = None
    video_path: Path | None = None
    try:
        if audio is not None:
            audio_path = _save_upload(audio, suffix=Path(audio.filename or "in.wav").suffix or ".wav")
            audio_seq = extract_audio_features(audio_path, svc.audio_dim, svc.audio_time)
        else:
            audio_seq = zero_sequence(svc.audio_dim, svc.audio_time)

        if video is not None:
            video_path = _save_upload(video, suffix=Path(video.filename or "in.mp4").suffix or ".mp4")
            video_seq = extract_video_features(video_path, svc.video_dim, svc.video_time)
        else:
            video_seq = zero_sequence(svc.video_dim, svc.video_time)

        score = svc.predict(audio_seq, video_seq)
        print(
            f"[predict] score={score:.4f} | "
            f"audio_mean={float(audio_seq.mean()):+.3f} video_mean={float(video_seq.mean()):+.3f}",
            flush=True,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference failed: {e}") from e
    finally:
        for p in (audio_path, video_path):
            if p and p.exists():
                try:
                    p.unlink()
                except OSError:
                    pass

    label, message = _label_for(score)
    return PredictionResponse(prediction=label, message=message)
