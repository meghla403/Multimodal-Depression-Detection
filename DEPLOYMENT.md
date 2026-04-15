# Deployment guide (free tier)

Deploy the **frontend to Vercel** and the **backend to Hugging Face Spaces**
using Docker. Total cost: **$0**.

- Frontend → Vercel (hobby tier, unlimited for personal / research use)
- Backend → Hugging Face Spaces (CPU basic — 16 GB RAM, Docker SDK)

The repo is already configured for this split:

```
backend/
  Dockerfile              ← HF Spaces Docker build
  .dockerignore
  README.md               ← has HF Space YAML frontmatter at the top
  requirements.txt
  main.py, features.py, model_service.py
  depression_model.h5
  audio_scaler.pkl
  video_scaler.pkl

frontend/
  .env.production.example ← copy to .env.production and point at your HF URL
  (Next.js app)
```

---

## 1. Push everything to GitHub

```powershell
cd "D:\My-Personal-Project\Multimodal Depression Detection"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

`.gitignore` already excludes `node_modules/`, `.venv/`, `.next/`, so the
push stays lean. Model files (`.h5`, `.pkl`) are included — they're only a
few MB each.

---

## 2. Deploy the backend to Hugging Face Spaces

### 2.1 Create the Space

1. Sign up at https://huggingface.co
2. Click your avatar → **New Space**
3. Settings:
   - Owner: your HF username
   - Space name: `depression-api` (or whatever you want)
   - License: **MIT**
   - **SDK: Docker** (important — not Gradio/Streamlit)
   - Hardware: **CPU basic** (free, 16 GB RAM)
   - Visibility: Public
4. Click **Create Space**

### 2.2 Push the `backend/` folder to the Space

Hugging Face Spaces are git repositories. Push **only the backend folder**
to it (the Space repo is separate from your GitHub repo):

```powershell
cd "D:\My-Personal-Project\Multimodal Depression Detection\backend"

# Initialise as its own git repo (separate from the GitHub mono-repo)
git init
git add .
git commit -m "Deploy backend"
git branch -M main

# Generate an access token at https://huggingface.co/settings/tokens
#   Role: "Write"
# When git prompts for password, paste the token (not your HF password).
git remote add space https://huggingface.co/spaces/YOUR_HF_USERNAME/depression-api
git push space main
```

HF will detect the Dockerfile and start building automatically. Watch the
logs on the Space's page — the first build takes 10–20 minutes (TensorFlow
is a chunky dependency).

✅ When the Space status goes from **Building → Running**, your API is live at:

```
https://YOUR_HF_USERNAME-depression-api.hf.space
```

Verify:

- https://YOUR_HF_USERNAME-depression-api.hf.space/health → `{"status":"ok", ...}`
- https://YOUR_HF_USERNAME-depression-api.hf.space/docs   → Swagger UI

---

## 3. Deploy the frontend to Vercel

### 3.1 Import project

1. Sign up at https://vercel.com (use GitHub login)
2. **Add New → Project** → select your GitHub repo
3. **Root Directory: `frontend`** ⚠️ (not the repo root — the Next app lives in a subfolder)
4. Framework preset: **Next.js** (auto-detected)
5. Keep default build / install commands

### 3.2 Set environment variable

Before clicking **Deploy**, expand **Environment Variables** and add:

| Name                  | Value                                                  |
| --------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL` | `https://YOUR_HF_USERNAME-depression-api.hf.space`     |

### 3.3 Deploy

Click **Deploy** — Vercel builds in ~2 minutes. You'll get a URL like:

```
https://depression-detection.vercel.app
```

---

## 4. Allow the Vercel origin in the backend's CORS

Your backend already reads extra CORS origins from the `CORS_ORIGINS` env
var, so just set it on the Space — no code change needed.

1. Go to your Space → **Settings → Variables and secrets**
2. Add a **variable** (not a secret):
   - Name: `CORS_ORIGINS`
   - Value: `https://YOUR-PROJECT.vercel.app`
3. The Space auto-restarts with the new env.

You can list multiple origins comma-separated:

```
https://your-app.vercel.app,https://your-app-git-main.vercel.app
```

---

## 5. Verify end-to-end

1. Open your Vercel URL → navigate to `/predict`
2. Upload a short video (10–30 s, clear speaker face, audio track)
3. Click **Predict**

You should get a prediction in 5–20 s on CPU basic.

---

## 🧪 Troubleshooting

| Symptom                                          | Cause                                       | Fix                                                    |
| ------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------ |
| Frontend shows "Cannot reach backend"            | Wrong `NEXT_PUBLIC_API_URL` or CORS         | Verify env var in Vercel, verify `CORS_ORIGINS` on HF  |
| Browser console: `blocked by CORS policy`        | Vercel URL not in `CORS_ORIGINS`            | Add it on the Space → Settings                         |
| HF Space stuck on "Building" for 30+ min         | First-time install of TF/MediaPipe          | Normal — wait. Check logs for errors.                  |
| Space logs: `ModuleNotFoundError`                | A package missing from requirements.txt     | Add it, push a new commit to the Space                 |
| First request after idle is slow (~30 s)         | Space went to sleep (free tier behavior)    | Paid tier `$9/mo` = always-on, or ping `/health` cron  |
| `/predict` returns 500 with "ffmpeg not found"   | ffmpeg missing from container               | Already in Dockerfile — redeploy / rebuild             |

---

## 🆚 Alternative backend hosts (also free-ish)

| Platform            | Free tier                           | Pros                                  | Cons                                                    |
| ------------------- | ----------------------------------- | ------------------------------------- | ------------------------------------------------------- |
| **HF Spaces** ⭐    | 16 GB RAM, unlimited                | Designed for ML, easy                 | Sleeps only on private Spaces; public stays warm        |
| Render.com          | 512 MB RAM, sleeps after 15 min     | Simple GitHub deploy                  | 512 MB is tight for TensorFlow                          |
| Fly.io              | 3× small VMs (256 MB)               | Fast, global edge                     | Too small for this project without tweaks               |
| Google Cloud Run    | 2M requests/mo                      | Auto-scales, container-based          | Requires credit card; cold starts                       |
| Railway            | $5 free credit /mo                  | Nice UX                               | Credit runs out fast with ML workloads                  |

For a research / thesis demo, **HF Spaces is the best fit.**

---

## 💻 Local Docker (optional)

Test the Dockerfile locally before deploying:

```bash
cd backend
docker build -t depression-api .
docker run -p 7860:7860 depression-api
# → http://localhost:7860/docs
```

If this works locally, HF Spaces will work too.
