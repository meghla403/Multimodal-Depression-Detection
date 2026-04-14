"use client";

import {
  useRef,
  useState,
  useEffect,
  DragEvent,
  ChangeEvent,
} from "react";
import { MAX_FILE_MB } from "@/utils/constants";

interface UploadCardProps {
  kind: "audio" | "video";
  file: File | null;
  onChange: (file: File | null) => void;
}

export default function UploadCard({ kind, file, onChange }: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const accept = kind === "audio" ? "audio/*" : "video/*";
  const label = kind === "audio" ? "Audio Input" : "Video Input";
  const hint =
    kind === "audio"
      ? "MP3, WAV, OGG · up to "
      : "MP4, MOV, WEBM · up to ";

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFile = (f: File | null) => {
    setError(null);
    if (!f) {
      onChange(null);
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`File exceeds ${MAX_FILE_MB}MB limit.`);
      return;
    }
    const isValid =
      kind === "audio" ? f.type.startsWith("audio/") : f.type.startsWith("video/");
    if (!isValid) {
      setError(`Please select a valid ${kind} file.`);
      return;
    }
    onChange(f);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const hasFile = file !== null;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-surface-2 p-5 shadow-lg transition-all duration-300 ${
        hasFile
          ? "border-primary/40"
          : "border-border hover:border-primary/40"
      }`}
    >
      {/* Ambient background illustration */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-20">
        {kind === "audio" ? <WaveformIllustration /> : <FaceMeshIllustration />}
      </div>

      {/* Header */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
            {kind === "audio" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="3" y="6" width="13" height="12" rx="2" />
                <path d="m16 10 5-3v10l-5-3" />
              </svg>
            )}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-ink">{label}</h3>
            <p className="text-[10px] uppercase tracking-wider text-muted">
              {kind === "audio" ? "Acoustic signals" : "Facial cues"}
            </p>
          </div>
        </div>
        {hasFile ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
            Loaded
          </span>
        ) : (
          <span className="rounded-full bg-surface-3 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            {kind}
          </span>
        )}
      </div>

      {/* Drop zone or preview */}
      {hasFile && previewUrl ? (
        <div className="relative rounded-xl border border-border bg-surface-3/40 p-4">
          {kind === "audio" ? (
            <audio
              controls
              src={previewUrl}
              className="w-full [filter:hue-rotate(90deg)_saturate(1.2)]"
            >
              <track kind="captions" />
            </audio>
          ) : (
            <video
              controls
              src={previewUrl}
              className="max-h-48 w-full rounded-lg bg-black object-cover"
            >
              <track kind="captions" />
            </video>
          )}

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-ink">{file.name}</p>
              <p className="text-[10px] text-muted">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="rounded-lg border border-border bg-surface-2 px-3 py-1 text-[10px] font-semibold text-red-400 transition-colors hover:border-red-400/50 hover:bg-red-400/10"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            aria-label={`Upload ${kind} file`}
            className="hidden"
            onChange={onPick}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsOver(true);
            }}
            onDragLeave={() => setIsOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ${
              isOver
                ? "scale-[1.02] border-primary bg-primary/10"
                : "border-border bg-surface-3/20 hover:border-primary/60 hover:bg-primary/5"
            }`}
          >
            <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-xl"
            />
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/20 text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:from-primary group-hover:to-emerald-500 group-hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 3v12" />
                <path d="m7 8 5-5 5 5" />
                <path d="M5 21h14" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-ink">
            Drop your {kind} file here
          </p>
          <p className="mt-1 text-xs text-muted">
            or <span className="text-primary underline">browse</span> from your computer
          </p>
            <p className="mt-3 text-[11px] text-muted/70">
              {hint}
              {MAX_FILE_MB}MB
            </p>
          </div>
        </>
      )}

      {error && (
        <p className="relative mt-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------- Illustrations ----------------
function WaveformIllustration() {
  const bars = Array.from({ length: 36 });
  return (
    <svg viewBox="0 0 360 120" className="h-full w-full" preserveAspectRatio="none">
      {bars.map((_, i) => {
        const h = 20 + Math.sin(i * 0.7) * 18 + Math.sin(i * 0.21) * 22 + 40;
        const y = (120 - h) / 2;
        return (
          <rect
            key={i}
            x={i * 10}
            y={y}
            width={6}
            height={h}
            rx={3}
            className="fill-primary"
          />
        );
      })}
    </svg>
  );
}

function FaceMeshIllustration() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <g className="stroke-primary">
        <ellipse cx="120" cy="100" rx="62" ry="80" />
        <ellipse cx="120" cy="100" rx="48" ry="66" />
        <ellipse cx="120" cy="100" rx="32" ry="50" />
        <circle cx="98" cy="82" r="6" />
        <circle cx="142" cy="82" r="6" />
        <path d="M120 90 v18 l-6 6 h12" />
        <path d="M100 130 q20 10 40 0" />
        <line x1="58" y1="100" x2="182" y2="100" />
        <line x1="120" y1="20" x2="120" y2="180" />
      </g>
    </svg>
  );
}
