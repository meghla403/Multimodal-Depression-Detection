export type PredictionLabel = "Depressed" | "Not Depressed";

export interface PredictionResult {
  prediction: PredictionLabel | string;
  message: string;
  score: number;
  depressed_pct: number;
  not_depressed_pct: number;
}

export interface UploadedFiles {
  video: File | null;
}
