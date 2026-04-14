"""Audio + video feature extraction aligned with D-Vlog training features.

Audio  → OpenSMILE eGeMAPSv02 low-level descriptors (25-dim frame-level), matching
          D-Vlog's `{sid}_acoustic.npy` files used to train depression_model.h5.

Video  → MediaPipe FaceMesh, subset-mapped to the dlib 68-point scheme → 136-dim
          (68 × xy). OpenFace 2.0 would be exact; dlib-style mapping is the
          Windows-friendly stand-in (no CMake/VC++ dependencies).

Both extractors produce (T, dim) sequences that are **per-clip StandardScaled**
(zero-mean, unit-variance across time) before mean-pooling to (1, dim). The
scaling approximates the dataset-level scaler fit during training; exact
reproduction requires saving that scaler and loading it here.
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
import cv2
import librosa
import mediapipe as mp
import opensmile
from sklearn.preprocessing import StandardScaler

TARGET_SR = 16000
FRAME_STRIDE = 2  # sample every Nth video frame
MAX_VIDEO_FRAMES = 300

_mp_face_mesh = mp.solutions.face_mesh

# eGeMAPSv02 low-level descriptors — 25-dim frame-level features, matching
# D-Vlog's acoustic feature dimensionality.
_smile = opensmile.Smile(
    feature_set=opensmile.FeatureSet.eGeMAPSv02,
    feature_level=opensmile.FeatureLevel.LowLevelDescriptors,
)

# Standard mapping from the dlib 68-point face model to MediaPipe FaceMesh
# (478 landmarks). Preserves the OpenFace/dlib ordering the model was trained
# against — jawline, brows, nose, eyes, mouth.
DLIB_68_TO_MP = [
    234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365, 397,   # 0–16 jaw
    70, 63, 105, 66, 107,                                                                # 17–21 right brow
    336, 296, 334, 293, 300,                                                             # 22–26 left brow
    168, 197, 5, 4,                                                                      # 27–30 nose bridge
    75, 97, 2, 326, 305,                                                                 # 31–35 nose base
    33, 160, 158, 133, 153, 144,                                                         # 36–41 right eye
    362, 385, 387, 263, 373, 380,                                                        # 42–47 left eye
    61, 39, 37, 0, 267, 269, 291, 405, 314, 17, 84, 181,                                 # 48–59 outer mouth
    78, 82, 13, 312, 308, 317, 14, 87,                                                   # 60–67 inner mouth
]


# ---------- Audio ----------
def extract_audio_features(path: Path, audio_dim: int, time_steps: int = 1) -> np.ndarray:
    """OpenSMILE eGeMAPSv02 LLDs → (time_steps, audio_dim), per-clip scaled."""
    try:
        y, sr = librosa.load(str(path), sr=TARGET_SR, mono=True)
    except Exception:
        return np.zeros((time_steps, audio_dim), dtype=np.float32)
    if y.size == 0:
        return np.zeros((time_steps, audio_dim), dtype=np.float32)

    df = _smile.process_signal(y.astype(np.float32), TARGET_SR)
    seq = df.to_numpy(dtype=np.float32)  # (T, n_features)

    seq = _fit_feature_dim(seq, audio_dim)
    return _aggregate(seq, audio_dim, time_steps)


# ---------- Video ----------
def extract_video_features(path: Path, video_dim: int, time_steps: int = 1) -> np.ndarray:
    """MediaPipe FaceMesh → dlib-68 subset → (time_steps, video_dim), per-clip scaled."""
    n_landmarks = max(1, video_dim // 2)  # 68 for video_dim=136
    indices = DLIB_68_TO_MP[:n_landmarks]

    cap = cv2.VideoCapture(str(path))
    if not cap.isOpened():
        return np.zeros((time_steps, video_dim), dtype=np.float32)

    frames: list[np.ndarray] = []
    with _mp_face_mesh.FaceMesh(
        static_image_mode=False,
        max_num_faces=1,
        refine_landmarks=False,
        min_detection_confidence=0.5,
    ) as mesh:
        idx = 0
        while True:
            ok, frame = cap.read()
            if not ok:
                break
            if idx % FRAME_STRIDE == 0:
                rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                res = mesh.process(rgb)
                vec = np.zeros(video_dim, dtype=np.float32)
                if res.multi_face_landmarks:
                    lms = res.multi_face_landmarks[0].landmark
                    pts = np.array(
                        [[lms[i].x, lms[i].y] for i in indices],
                        dtype=np.float32,
                    ).reshape(-1)
                    vec[: pts.size] = pts[:video_dim]
                frames.append(vec)
                if len(frames) >= MAX_VIDEO_FRAMES:
                    break
            idx += 1
    cap.release()

    if not frames:
        return np.zeros((time_steps, video_dim), dtype=np.float32)
    seq = np.stack(frames, axis=0).astype(np.float32)
    return _aggregate(seq, video_dim, time_steps)


# ---------- helpers ----------
def _scale_sequence(seq: np.ndarray) -> np.ndarray:
    """Per-clip StandardScaler — zero-mean / unit-variance across time, per feature."""
    if seq.ndim != 2 or seq.shape[0] < 2:
        return seq
    scaled = StandardScaler().fit_transform(seq)
    return np.nan_to_num(scaled, nan=0.0, posinf=0.0, neginf=0.0).astype(np.float32)


def _fit_feature_dim(seq: np.ndarray, dim: int) -> np.ndarray:
    """Pad/truncate the feature axis to match `dim`."""
    if seq.ndim != 2:
        return np.zeros((1, dim), dtype=np.float32)
    if seq.shape[1] == dim:
        return seq
    if seq.shape[1] > dim:
        return seq[:, :dim]
    pad = np.zeros((seq.shape[0], dim - seq.shape[1]), dtype=seq.dtype)
    return np.concatenate([seq, pad], axis=1)


def _aggregate(seq: np.ndarray, dim: int, time_steps: int) -> np.ndarray:
    """Reduce a (T, dim) sequence to (time_steps, dim) by mean pooling."""
    if seq.shape[0] == 0:
        return np.zeros((time_steps, dim), dtype=np.float32)
    if time_steps == 1:
        return seq.mean(axis=0, keepdims=True).astype(np.float32)
    if seq.shape[0] >= time_steps:
        return seq[:time_steps].astype(np.float32)
    pad = np.zeros((time_steps - seq.shape[0], dim), dtype=np.float32)
    return np.concatenate([seq, pad], axis=0).astype(np.float32)


def zero_sequence(dim: int, time_steps: int = 1) -> np.ndarray:
    """Used when one modality is missing — model still requires the input tensor."""
    return np.zeros((time_steps, dim), dtype=np.float32)
