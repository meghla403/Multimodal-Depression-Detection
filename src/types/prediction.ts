export type PredictionLabel = "Depressed" | "Not Depressed";

export interface PredictionResult {
  prediction: PredictionLabel | string;
  message: string;
}

export interface UploadedFiles {
  audio: File | null;
  video: File | null;
}
