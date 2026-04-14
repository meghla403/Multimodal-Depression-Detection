"""Loads depression_model.h5 + matching audio/video scalers and runs predict.

The scalers are the ones fit during training (notebook cell 33):
    scaler_dv_a.fit(norm_audio_data)    # (961, 25) mean-pooled D-Vlog acoustics
    scaler_dv_v.fit(norm_visual_data)   # (961, 136) mean-pooled D-Vlog visuals

Exported as audio_scaler.pkl / video_scaler.pkl and dropped beside the model.
joblib.load() reads both .pkl and .joblib (they're both pickle-based).
"""
from __future__ import annotations

import os
from pathlib import Path
from typing import Tuple

import joblib
import keras  # standalone Keras 3.x
import numpy as np

BACKEND_DIR = Path(__file__).parent
MODEL_PATH = Path(os.getenv("MODEL_PATH", BACKEND_DIR / "depression_model.h5"))
AUDIO_SCALER_PATH = Path(os.getenv("AUDIO_SCALER_PATH", BACKEND_DIR / "audio_scaler.pkl"))
VIDEO_SCALER_PATH = Path(os.getenv("VIDEO_SCALER_PATH", BACKEND_DIR / "video_scaler.pkl"))


class ModelService:
    def __init__(self, model_path: Path = MODEL_PATH):
        if not model_path.exists():
            raise FileNotFoundError(
                f"Model file not found at {model_path}. "
                "Place depression_model.h5 in the backend/ folder or set MODEL_PATH."
            )
        self.model = keras.models.load_model(str(model_path), compile=False)
        (
            self.audio_time,
            self.audio_dim,
            self.video_time,
            self.video_dim,
        ) = self._infer_input_dims()

        self.audio_scaler = self._load_scaler(
            AUDIO_SCALER_PATH, "audio", expected_dim=self.audio_dim
        )
        self.video_scaler = self._load_scaler(
            VIDEO_SCALER_PATH, "video", expected_dim=self.video_dim
        )

    def _infer_input_dims(self) -> Tuple[int, int, int, int]:
        inputs = self.model.inputs
        if len(inputs) != 2:
            raise ValueError(
                f"Expected a 2-input multimodal model, got {len(inputs)} inputs."
            )
        a_shape = inputs[0].shape
        v_shape = inputs[1].shape
        return (
            int(a_shape[1]) if a_shape[1] is not None else 1,
            int(a_shape[2]),
            int(v_shape[1]) if v_shape[1] is not None else 1,
            int(v_shape[2]),
        )

    @staticmethod
    def _load_scaler(path: Path, kind: str, expected_dim: int):
        if not path.exists():
            print(
                f"[model_service] {kind} scaler not found at {path.name}; "
                "predictions will be out-of-distribution without it.",
                flush=True,
            )
            return None
        try:
            scaler = joblib.load(str(path))
        except Exception as e:
            print(f"[model_service] Failed to load {kind} scaler: {e}", flush=True)
            return None

        scaler_dim = getattr(scaler, "n_features_in_", None)
        if scaler_dim is not None and scaler_dim != expected_dim:
            print(
                f"[model_service] SKIPPING {kind} scaler — it was fit on "
                f"{scaler_dim} features but the model expects {expected_dim}. "
                f"Export the correct D-Vlog scaler (e.g. scaler_dv_a / scaler_dv_v).",
                flush=True,
            )
            return None

        print(
            f"[model_service] Loaded {kind} scaler from {path.name} "
            f"(n_features_in_={scaler_dim})",
            flush=True,
        )
        return scaler

    @property
    def has_audio_scaler(self) -> bool:
        return self.audio_scaler is not None

    @property
    def has_video_scaler(self) -> bool:
        return self.video_scaler is not None

    def predict(self, audio_seq: np.ndarray, video_seq: np.ndarray) -> float:
        """audio_seq shape (audio_time, audio_dim); same shape idea for video."""
        audio_vec = audio_seq.astype(np.float32).reshape(self.audio_time, self.audio_dim)
        video_vec = video_seq.astype(np.float32).reshape(self.video_time, self.video_dim)

        # Apply the training-time dataset-level scalers. StandardScaler expects
        # (n_samples, n_features); our (time, dim) shape fits directly.
        if self.audio_scaler is not None:
            audio_vec = self.audio_scaler.transform(audio_vec).astype(np.float32)
        if self.video_scaler is not None:
            video_vec = self.video_scaler.transform(video_vec).astype(np.float32)

        a = np.expand_dims(audio_vec, axis=0)
        v = np.expand_dims(video_vec, axis=0)
        out = self.model.predict([a, v], verbose=0)
        return float(np.array(out).reshape(-1)[0])


_service: ModelService | None = None


def get_service() -> ModelService:
    global _service
    if _service is None:
        _service = ModelService()
    return _service
