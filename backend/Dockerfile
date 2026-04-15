# ----- Multimodal Depression Detection API -----
# Designed for Hugging Face Spaces (Docker SDK) but works on any
# container host (Render, Fly.io, Cloud Run, etc.).

FROM python:3.11-slim

# System dependencies:
#   ffmpeg      → librosa reads audio tracks from uploaded videos
#   libsndfile1 → required by soundfile / librosa
#   libgl1      → required by opencv-python
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libsndfile1 \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# HF Spaces runs containers as UID 1000. Create a matching user so we can
# write to cache dirs (keras, huggingface, mediapipe download temp, etc.).
RUN useradd -m -u 1000 appuser
WORKDIR /home/appuser/app
ENV HOME=/home/appuser \
    PATH=/home/appuser/.local/bin:$PATH \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Install Python deps first (better layer caching)
COPY --chown=appuser:appuser requirements.txt .
USER appuser
RUN pip install --user --upgrade pip && \
    pip install --user -r requirements.txt

# Copy source code + model artifacts
COPY --chown=appuser:appuser . .

# Hugging Face Spaces expects the container to listen on $PORT (default 7860).
# Render / Fly also use $PORT. Falls back to 8000 for local docker runs.
EXPOSE 7860
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-7860}"]
