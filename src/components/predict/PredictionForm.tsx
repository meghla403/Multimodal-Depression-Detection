"use client";

import { useState } from "react";
import UploadCard from "@/components/predict/UploadCard";
import ResultCard from "@/components/predict/ResultCard";
import Loader from "@/components/common/Loader";
import { runPrediction } from "@/utils/api";
import type { PredictionResult, UploadedFiles } from "@/types/prediction";

export default function PredictionForm() {
  const [files, setFiles] = useState<UploadedFiles>({ audio: null, video: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canPredict = files.audio !== null || files.video !== null;

  const handlePredict = async () => {
    if (!canPredict || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await runPrediction(files);
      setResult(res);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFiles({ audio: null, video: null });
    setResult(null);
    setError(null);
  };

  if (result) {
    return <ResultCard result={result} onReset={handleReset} />;
  }

  if (loading) {
    return (
      <div className="card-static">
        <Loader label="Running multimodal analysis..." size="lg" />
        <div className="mt-6 space-y-2 text-center text-xs text-muted">
          <p>
            Extracting acoustic features · analyzing facial cues · fusing modalities
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <UploadCard
          kind="audio"
          file={files.audio}
          onChange={(f) => setFiles((p) => ({ ...p, audio: f }))}
        />
        <UploadCard
          kind="video"
          file={files.video}
          onChange={(f) => setFiles((p) => ({ ...p, video: f }))}
        />
      </div>

      {error && (
        <div className="card-static border-red-500/40 bg-red-500/5 text-sm text-red-300">
          <strong className="font-semibold text-red-200">Prediction failed:</strong>{" "}
          {error}
          <p className="mt-2 text-xs text-red-300/80">
            Make sure the FastAPI backend is running on{" "}
            <code className="text-red-200">localhost:8000</code> (see{" "}
            <code className="text-red-200">backend/README.md</code>).
          </p>
        </div>
      )}

      <div className="card-static flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div>
          <h4 className="text-sm font-semibold text-ink">Ready to analyze?</h4>
          <p className="mt-1 text-xs text-muted">
            Upload at least one modality to run the multimodal model.
          </p>
        </div>
        <button
          type="button"
          onClick={handlePredict}
          disabled={!canPredict}
          className={`btn-primary ${!canPredict ? "cursor-not-allowed opacity-50 hover:opacity-50" : ""}`}
        >
          Predict
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
