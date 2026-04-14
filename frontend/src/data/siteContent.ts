export const features = [
  {
    title: "Audio Analysis",
    description:
      "Extracts tone, pitch, speech rate, and prosodic features to detect emotional patterns.",
    icon: "waveform",
  },
  {
    title: "Video Analysis",
    description:
      "Captures facial expressions, gaze direction, and micro-movements using deep vision models.",
    icon: "video",
  },
  {
    title: "Multimodal Fusion",
    description:
      "Combines audio and visual cues through cross-modal attention for higher accuracy.",
    icon: "layers",
  },
  {
    title: "Privacy First",
    description:
      "Uploaded media is processed in-memory and discarded immediately after inference. Nothing is persisted.",
    icon: "shield",
  },
];

export const techStack = [
  "Next.js 14",
  "TypeScript",
  "Tailwind CSS",
  "PyTorch",
  "HuggingFace Transformers",
  "OpenSMILE",
  "MediaPipe",
  "Scikit-Learn",
];

export const datasets = [
  {
    name: "LMVD",
    fullName: "Large-scale Multimodal Video Dataset",
    description:
      "A curated dataset containing synchronized audio, video, and textual annotations collected for depression screening research.",
    samples: "1,200+ subjects",
  },
  {
    name: "D-Vlog",
    fullName: "Depression Vlog Dataset",
    description:
      "A dataset consisting of vlogs from YouTube, providing real-world behavioral data to enhance the model's generalization capabilities.",
    samples: "961 subjects",
  },
];

export const datasetModalities =
  "Audio (Acoustic) • Video (Visual) • Transcript (Textual)";

export const modelPhases = [
  {
    step: "01",
    title: "Feature Extraction",
    text: "Audio features via wav2vec 2.0 & OpenSMILE. Visual features via ViT (Vision Transformer) backbone plus MediaPipe landmark cues.",
  },
  {
    step: "02",
    title: "Cross-Modal Fusion",
    text: "A Transformer-based Fusion Block learns joint representations with modality-aware attention and temporal alignment.",
  },
  {
    step: "03",
    title: "Classification",
    text: "A calibrated classifier outputs depression-likelihood levels with per-modality confidence breakdowns.",
  },
];

export const researchFeatures = [
  {
    title: "Domain Alignment",
    description:
      "Synchronizing clinical and non-clinical data for robust screening across diverse populations.",
    icon: "shield",
  },
  {
    title: "Explainable AI (XAI)",
    description:
      "Per-modality confidence scores (Audio vs. Video) make every model decision transparent and interpretable.",
    icon: "layers",
  },
  {
    title: "Data Augmentation",
    description:
      "Robustness through Gaussian Noise, Scaling, and Feature Permutation applied to multimodal inputs.",
    icon: "waveform",
  },
];
