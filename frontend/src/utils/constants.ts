export const APP_NAME = "MindScope AI";
export const APP_TAGLINE = "Multimodal Depression Detection System";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Predict", href: "/predict" },
  { label: "About", href: "/about" },
];

export const ACCEPTED_AUDIO = "audio/*";
export const ACCEPTED_VIDEO = "video/*";

export const MAX_FILE_MB = 50;

export type Severity = "low" | "moderate" | "high";

export const PREDICTION_SEVERITY: Record<string, Severity> = {
  "Not Depressed": "low",
  "Depressed": "high",
};

export const SEVERITY_STYLES: Record<
  Severity,
  {
    gradient: string;
    dot: string;
    number: string;
    stroke: string;
    bg: string;
    text: string;
    border: string;
  }
> = {
  low: {
    gradient: "from-green-500 to-emerald-500",
    dot: "bg-green-500",
    number: "text-green-600",
    stroke: "stroke-green-500",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  moderate: {
    gradient: "from-yellow-400 to-amber-500",
    dot: "bg-yellow-500",
    number: "text-yellow-600",
    stroke: "stroke-yellow-500",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  high: {
    gradient: "from-red-500 to-rose-600",
    dot: "bg-red-500",
    number: "text-red-600",
    stroke: "stroke-red-500",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
};
