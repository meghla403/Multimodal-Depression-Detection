---
title: Depression Detection API
emoji: 🧠
colorFrom: green
colorTo: emerald
sdk: docker
app_port: 7860
pinned: false
license: mit
short_description: Multimodal depression detection API (audio + video)
---

# Multimodal Depression Detection — Backend API

FastAPI service that fuses acoustic and facial cues from a single video clip
through a cross-modal-attention Keras model to produce a depression-likelihood
assessment.

- **Feature extraction:** OpenSMILE eGeMAPSv02 (audio) + MediaPipe FaceMesh (video)
- **Model:** two-input Keras checkpoint trained on D-Vlog
- **Audio + video come from the same uploaded video file** — librosa reads the
  audio track via ffmpeg.

## Endpoints

| Method | Path       | Purpose                               |
| ------ | ---------- | ------------------------------------- |
| GET    | `/health`  | Service + model status                |
| POST   | `/predict` | Upload a video → get prediction       |
| GET    | `/docs`    | Interactive Swagger UI                |

## Local run

Use **Python 3.10 or 3.11** (TensorFlow 2.17 doesn't support 3.12+ on Windows).

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- Health: http://localhost:8000/health
- Docs:   http://localhost:8000/docs

Requires **ffmpeg** on PATH (librosa uses it to read audio tracks from videos):

```bash
# Windows
winget install Gyan.FFmpeg
```

## Docker run

```bash
docker build -t depression-api .
docker run -p 7860:7860 depression-api
```

## Model artifacts

Place these files in `backend/` (already included in the repo):

```
depression_model.h5     # Keras model, two-input (audio, video)
audio_scaler.pkl        # StandardScaler fit on training audio features
video_scaler.pkl        # StandardScaler fit on training video features
```

Expected shapes:

- Audio input: `(1, 25)` — OpenSMILE eGeMAPSv02 LLDs, mean-pooled across time
- Video input: `(1, 136)` — 68 face landmarks × (x, y), mean-pooled across frames

The loader inspects the model's input shape automatically — if you swap in a
sequence model, feature extraction will adapt.

## Endpoint contract

`POST /predict` — multipart form data:

| Field | Type             | Required                       |
| ----- | ---------------- | ------------------------------ |
| video | file (video/\*) | yes (primary input)            |
| audio | file (audio/\*) | optional audio-only fallback   |

Response:

```json
{
  "prediction": "Depressed",
  "message": "The model detects multimodal indicators consistent with depression.",
  "score": 0.78,
  "depressed_pct": 78.0,
  "not_depressed_pct": 22.0
}
```

## Configuration

| Env var             | Default               | Purpose                                              |
| ------------------- | --------------------- | ---------------------------------------------------- |
| `PORT`              | `7860`                | Listen port (HF Spaces / Render / Fly set this)      |
| `CORS_ORIGINS`      | _(empty)_             | Comma-separated extra origins, e.g. your Vercel URL  |
| `MODEL_PATH`        | `depression_model.h5` | Override model path                                  |
| `AUDIO_SCALER_PATH` | `audio_scaler.pkl`    | Override audio scaler path                           |
| `VIDEO_SCALER_PATH` | `video_scaler.pkl`    | Override video scaler path                           |

## Frontend env

In `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For a deployed frontend (e.g. Vercel), set `NEXT_PUBLIC_API_URL` to your
hosted API URL (e.g. `https://YOUR_HF_USERNAME-depression-api.hf.space`).

## Disclaimer

Research & educational demo — **not a medical diagnostic tool**.
