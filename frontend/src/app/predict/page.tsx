import PredictionForm from "@/components/predict/PredictionForm";
import AnimatedReveal from "@/components/common/AnimatedReveal";

export default function PredictPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <HeroSection />
      <PredictionForm />
      <TipsStrip />
    </div>
  );
}

// ---------------- Hero ----------------
function HeroSection() {
  return (
    <AnimatedReveal direction="zoom" duration={800}>
    <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-950/60 via-surface-2 to-surface p-8 shadow-glow sm:p-12">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="grid-overlay pointer-events-none absolute inset-0" />

      <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Inference Studio
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
            Run a <span className="gradient-text">multimodal</span> prediction
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Drop in a short video clip — the server extracts acoustic features
            (OpenSMILE) from the audio track and facial cues (MediaPipe) from
            the frames, then fuses them via cross-modal attention in under two
            seconds.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <FactPill icon="bolt" label="~2s latency" />
            <FactPill icon="brain" label="Cross-modal attention" />
            <FactPill icon="lock" label="In-memory only" />
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
    </AnimatedReveal>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="absolute inset-8 animate-float rounded-full bg-gradient-to-br from-primary/30 via-emerald-400/20 to-transparent blur-3xl" />
      <svg
        viewBox="0 0 240 240"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <g className="stroke-primary/40 svg-spin-center animate-spin-slow">
          <circle cx="120" cy="120" r="100" strokeDasharray="6 8" />
          <circle cx="120" cy="120" r="76" strokeDasharray="4 6" />
          <circle cx="120" cy="120" r="52" strokeDasharray="3 5" />
        </g>

        <g className="fill-primary svg-spin-center animate-spin-reverse">
          {[6, 10, 14, 12, 8, 16, 20, 10, 6].map((h, i) => (
            <rect key={`a-${i}`} x={14} y={80 + i * 9} width={4} height={h} rx={2} />
          ))}
        </g>

        <g className="fill-primary svg-spin-center animate-spin-reverse">
          {[
            [196, 80],
            [206, 96],
            [212, 116],
            [210, 136],
            [202, 154],
            [188, 166],
            [186, 144],
            [190, 120],
            [192, 100],
          ].map(([cx, cy], i) => (
            <circle key={`v-${i}`} cx={cx} cy={cy} r={2.2} />
          ))}
        </g>

        <g>
          <circle cx="120" cy="120" r="28" className="fill-surface stroke-primary" strokeWidth="1.5" />
          <circle cx="120" cy="120" r="6" className="fill-primary" />
          <line x1="38" y1="115" x2="92" y2="120" className="stroke-primary/60" strokeDasharray="3 4" />
          <line x1="200" y1="115" x2="148" y2="120" className="stroke-primary/60" strokeDasharray="3 4" />
          <line x1="120" y1="148" x2="120" y2="200" className="stroke-primary/60" strokeDasharray="3 4" />
        </g>

        <g>
          <rect x="100" y="204" width="40" height="10" rx="5" className="fill-primary/20 stroke-primary" />
          <circle cx="120" cy="209" r="2" className="fill-primary" />
        </g>
      </svg>
    </div>
  );
}

// ---------------- Tips Strip ----------------
function TipsStrip() {
  const tips = [
    {
      icon: "camera",
      title: "Clear face visibility",
      text: "Front-facing, well-lit single speaker gives the model the best signal.",
    },
    {
      icon: "mic",
      title: "Keep the audio track",
      text: "The same video powers both modalities — a muted clip loses the acoustic half.",
    },
    {
      icon: "clock",
      title: "10–30 seconds is plenty",
      text: "The clip is aggregated to a single feature vector — longer isn't better.",
    },
  ];

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Tips
        </span>
        <span className="text-sm text-muted">
          Best practices for the clip you upload
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {tips.map((t, i) => {
          const dir = i === 0 ? "right" : i === tips.length - 1 ? "left" : "up";
          return (
            <AnimatedReveal
              key={t.title}
              direction={dir}
              delay={i * 120}
              duration={700}
              distance={60}
            >
              <div className="group flex items-start gap-3 rounded-xl border border-border bg-surface-2/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-2">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-black">
                  <TipIcon name={t.icon} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">{t.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{t.text}</p>
                </div>
              </div>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}

// ---------------- Small helpers ----------------
function FactPill({ icon, label }: { icon: "bolt" | "brain" | "lock"; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-xs text-muted">
      <span className="text-primary">
        <PillIcon name={icon} />
      </span>
      {label}
    </span>
  );
}

function PillIcon({ name }: { name: "bolt" | "brain" | "lock" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-3.5 w-3.5",
  };
  if (name === "bolt")
    return (
      <svg {...common}>
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    );
  if (name === "brain")
    return (
      <svg {...common}>
        <path d="M9 2a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 1 2 3 3 0 0 0-1 2 3 3 0 0 0 3 3 3 3 0 0 0 3 3h1V2Z" />
        <path d="M15 2a3 3 0 0 1 3 3 3 3 0 0 1 3 3 3 3 0 0 1-1 2 3 3 0 0 1 1 2 3 3 0 0 1-3 3 3 3 0 0 1-3 3h-1V2Z" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function TipIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
  if (name === "camera")
    return (
      <svg {...common}>
        <path d="M23 19V8l-5 3V8H3v12h15v-3l5 2Z" />
        <circle cx="11" cy="14" r="3" />
      </svg>
    );
  if (name === "mic")
    return (
      <svg {...common}>
        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
