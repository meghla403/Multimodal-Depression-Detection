"use client";

import { useState } from "react";
import UploadCard from "@/components/predict/UploadCard";
import ResultCard from "@/components/predict/ResultCard";
import Loader from "@/components/common/Loader";
import AnimatedReveal from "@/components/common/AnimatedReveal";
import { runPrediction } from "@/utils/api";
import type { PredictionResult, UploadedFiles } from "@/types/prediction";

export default function PredictionForm() {
  const [files, setFiles] = useState<UploadedFiles>({ video: null });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canPredict = files.video !== null;

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
    setFiles({ video: null });
    setResult(null);
    setError(null);
  };

  if (result) {
    return <ResultCard result={result} onReset={handleReset} />;
  }

  if (loading) {
    return (
      <AnimatedReveal direction="zoom" duration={600}>
        <div className="card-static">
          <Loader label="Running multimodal analysis..." size="lg" />
          <div className="mt-6 space-y-2 text-center text-xs text-muted">
            <p>
              Extracting acoustic features · analyzing facial cues · fusing modalities
            </p>
          </div>
        </div>
      </AnimatedReveal>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <AnimatedReveal direction="zoom" duration={700}>
        <UploadCard
          kind="video"
          file={files.video}
          onChange={(f) => setFiles((p) => ({ ...p, video: f }))}
        />
      </AnimatedReveal>

      {error && (
        <AnimatedReveal direction="down" duration={500}>
          <div className="card-static border-red-500/40 bg-red-500/5 text-sm text-red-300">
            <strong className="font-semibold text-red-200">Prediction failed:</strong>{" "}
            {error}
            <p className="mt-2 text-xs text-red-300/80">
              Make sure the FastAPI backend is running on{" "}
              <code className="text-red-200">localhost:8000</code> (see{" "}
              <code className="text-red-200">backend/README.md</code>).
            </p>
          </div>
        </AnimatedReveal>
      )}

      <AnimatedReveal direction="up" duration={700} delay={200}>
        <div className="card-static flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div>
            <h4 className="text-sm font-semibold text-ink">Ready to analyze?</h4>
            <p className="mt-1 text-xs text-muted">
              Audio is extracted from the same clip — one upload powers both modalities.
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
      </AnimatedReveal>
    </div>
  );
}
