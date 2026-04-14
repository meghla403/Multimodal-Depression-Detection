import SectionTitle from "@/components/common/SectionTitle";
import {
  datasets,
  datasetModalities,
  modelPhases,
  researchFeatures,
  techStack,
} from "@/data/siteContent";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-6 py-16">
      <SectionTitle
        eyebrow="About the Project"
        title="Multi-Modal Behavioral Analysis for Depression Detection"
        subtitle="A unified deep learning architecture that captures subtle behavioral cues across Audio, Video, and Text — fused through a Cross-Modal Attention Mechanism."
      />

      <OverviewSection />
      <DatasetsSection />
      <PipelineSection />
      <ResearchFeaturesSection />
      <TechStackSection />
    </div>
  );
}

// ---------------- Overview ----------------
function OverviewSection() {
  return (
    <section className="animate-fade-up">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-950/60 via-surface-2 to-surface p-8 shadow-glow sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-center">
          <div>
            <Eyebrow step="01" label="Project Overview" />
            <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
              Subtle behavioral cues, captured at scale
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Depression is often reflected through subtle behavioral cues —
              lowered pitch, slower speech, reduced eye contact, and flattened
              facial affect. This project builds a unified deep learning
              architecture that captures these signals across modalities and
              fuses them using a{" "}
              <strong className="gradient-text">
                Cross-Modal Attention Mechanism
              </strong>
              .
            </p>
            <p className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs italic text-yellow-300">
              Note: This interface is a research-focused demo designed to
              illustrate a clean workflow — upload, analyze, review.
            </p>
          </div>

          <div className="relative hidden md:block">
            <div className="relative mx-auto h-56 w-56">
              <div className="absolute inset-0 animate-float rounded-full bg-gradient-to-br from-primary/30 via-emerald-400/20 to-transparent blur-2xl" />
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="relative h-full w-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="100" cy="100" r="70" className="stroke-primary/40" />
                <circle cx="100" cy="100" r="50" className="stroke-primary/60" />
                <circle cx="100" cy="100" r="30" className="stroke-primary" />
                <g className="stroke-primary">
                  <line x1="100" y1="10" x2="100" y2="190" />
                  <line x1="10" y1="100" x2="190" y2="100" />
                </g>
                <g className="fill-primary">
                  <circle cx="100" cy="30" r="3" />
                  <circle cx="170" cy="100" r="3" />
                  <circle cx="100" cy="170" r="3" />
                  <circle cx="30" cy="100" r="3" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------- Datasets ----------------
function DatasetsSection() {
  return (
    <section className="animate-fade-up">
      <Eyebrow step="02" label="Dataset Specifications" />
      <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Two datasets for clinical accuracy & real-world robustness
      </h3>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {datasets.map((d, i) => (
          <div
            key={d.name}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft"
          >
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-opacity duration-500 group-hover:bg-primary/20" />

            <div className="relative flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                  <path d="M3 12a9 3 0 0 0 18 0" />
                </svg>
              </div>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                0{i + 1}
              </span>
            </div>

            <h4 className="relative mt-5 text-lg font-semibold text-ink">
              {d.name}
            </h4>
            <p className="relative text-xs uppercase tracking-wider text-muted">
              {d.fullName}
            </p>
            <p className="relative mt-3 text-sm leading-relaxed text-muted">
              {d.description}
            </p>

            <div className="relative mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs uppercase tracking-wider text-muted">
                Samples
              </span>
              <span className="text-lg font-bold gradient-text">
                {d.samples}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface-2/50 px-5 py-4 text-xs">
        <span className="font-semibold uppercase tracking-wider text-muted">
          Modalities
        </span>
        <span className="text-ink">{datasetModalities}</span>
      </div>
    </section>
  );
}

// ---------------- Pipeline ----------------
function PipelineSection() {
  return (
    <section className="animate-fade-up">
      <Eyebrow step="03" label="Model Architecture" />
      <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Deep Learning Pipeline
      </h3>

      <div className="relative mt-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px md:block"
        >
          <div className="mx-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {modelPhases.map((p, i) => (
            <div
              key={p.step}
              className="group relative rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft"
            >
              <div className="relative z-10 mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-primary/30 bg-surface shadow-inner">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-2xl font-bold text-black transition-transform duration-300 group-hover:scale-110">
                  {p.step}
                </div>
              </div>
              <h4 className="mt-5 text-center text-base font-semibold text-ink">
                {p.title}
              </h4>
              <p className="mt-2 text-center text-xs leading-relaxed text-muted">
                {p.text}
              </p>

              {i < modelPhases.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-12 hidden translate-x-1/2 md:block"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-full border border-primary/40 bg-surface text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Research Features ----------------
const FEATURE_ICONS: Record<string, JSX.Element> = {
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  waveform: <path d="M2 12h3l2-7 3 14 3-10 2 6 2-3h5" />,
};

function ResearchFeaturesSection() {
  return (
    <section className="animate-fade-up">
      <Eyebrow step="04" label="Key Research Features" />
      <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Beyond standard prediction
      </h3>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {researchFeatures.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-soft"
          >
            <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
            <div className="relative mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-emerald-500/20 text-primary transition-all duration-300 group-hover:-rotate-6 group-hover:from-primary group-hover:to-emerald-500 group-hover:text-black">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
              >
                {FEATURE_ICONS[f.icon] ?? FEATURE_ICONS.layers}
              </svg>
            </div>
            <h4 className="relative text-base font-semibold text-ink">
              {f.title}
            </h4>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------- Tech Stack ----------------
function TechStackSection() {
  return (
    <section className="animate-fade-up">
      <Eyebrow step="05" label="Built With" />
      <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Technical Stack
      </h3>

      <div className="mt-8 flex flex-wrap gap-3">
        {techStack.map((t) => (
          <span
            key={t}
            className="group cursor-default rounded-full border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          >
            <span className="relative inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 transition-colors duration-300 group-hover:bg-primary" />
              {t}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ---------------- Shared bits ----------------
function Eyebrow({ step, label }: { step: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
      <span className="font-mono text-primary/80">{step}</span>
      <span className="h-3 w-px bg-primary/40" />
      {label}
    </span>
  );
}
