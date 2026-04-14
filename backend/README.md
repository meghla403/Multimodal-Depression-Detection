# Backend — FastAPI + TensorFlow

Serves `depression_model.h5` over HTTP for the Next.js frontend.

## 1. Place the model

Drop your trained model here:

```
backend/depression_model.h5
```

(Or set `MODEL_PATH=/abs/path/to/model.h5` in your env.)

## 2. Setup

Use Python 3.10 or 3.11 (TensorFlow 2.15 doesn't support 3.12+ on Windows).

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
```

## 3. Run

```bash
uvicorn main:app --reload --port 8000
```

- Health check: http://localhost:8000/health
- Interactive docs: http://localhost:8000/docs

## 4. Endpoint

`POST /predict` — multipart form data.

| field | type | required |
|-------|------|----------|
| audio | file (audio/*) | one of audio/video |
| video | file (video/*) | one of audio/video |

Response:

```json
{
  "prediction": "Depressed",
  "message": "The model detects multimodal indicators consistent with depression."
}
```

## Notes

- The current `depression_model.h5` was saved with **Keras 3.10.0** and expects clip-level features:
  - Audio input: `(1, 25)` — OpenSMILE eGeMAPSv02 LLDs, mean-pooled across time
  - Video input: `(1, 136)` — 68 face landmarks × (x, y), mean-pooled across frames
- The loader inspects the model to learn its `(time, dim)` per input automatically — if you swap in a sequence model later it will adapt.
- Feature extractors:
  - **Audio** — OpenSMILE eGeMAPSv02 LLDs (matches D-Vlog's `{sid}_acoustic.npy`).
  - **Video** — MediaPipe FaceMesh, subset-indexed to the dlib 68-point scheme so the output mirrors OpenFace's `{sid}_visual.npy`. Exact OpenFace binaries are available if you need 1:1 parity (requires CMake/VC++ on Windows).
- **Per-clip StandardScaler** is applied before mean-pooling as an approximation of the dataset-level scaler fit during training. For exact reproduction, save the training scaler as `audio_scaler.joblib` / `video_scaler.joblib` next to the model and load it in `features.py`.
- CORS allows `http://localhost:3000` by default. Add more via `CORS_ORIGINS=https://yourdomain.com,...`.

## Frontend env

In the Next.js project root:

```
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```
