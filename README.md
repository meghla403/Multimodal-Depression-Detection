# Multimodal Depression Detection

A research-grade Next.js + FastAPI app for multimodal (audio + video) depression detection.

## Getting Started

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

See [backend/README.md](backend/README.md) for model setup details.

## Pages

- `/` — Home: hero, features, CTA
- `/predict` — Audio/video upload, inference, result card
- `/about` — Project overview, LMVD dataset, model & tech stack

## Structure

```
.
├── frontend/          # Next.js app (App Router + TS + Tailwind)
│   ├── src/
│   │   ├── app/          # pages
│   │   ├── components/   # common / home / predict
│   │   ├── data/         # demo data
│   │   ├── types/        # TS types
│   │   └── utils/        # constants, api client
│   ├── package.json
│   └── ...
├── backend/           # FastAPI + TensorFlow
│   ├── main.py
│   ├── model_service.py
│   ├── features.py
│   └── requirements.txt
└── notebooks/
```

## Stack

Next.js 14 · TypeScript · Tailwind CSS · FastAPI · TensorFlow · MediaPipe · OpenSMILE
