import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-12 sm:pt-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-emerald-950 via-surface-2 to-surface shadow-glow">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-green-500/15 blur-3xl" />
            <div className="grid-overlay absolute inset-0" />
          </div>

          <div className="relative px-6 py-20 sm:px-12 sm:py-28">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Research demo · Powered by multimodal deep learning
              </span>

              <h1
                className="animate-fade-up delay-80 mt-6 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl"
                aria-label="Multimodal Depression Detection System"
              >
                <WaveText text="Multimodal " />
                <WaveText
                  text="Depression Detection System"
                  className="gradient-text"
                  offset={"Multimodal ".length}
                />
              </h1>

              <p className="animate-fade-up delay-160 mt-6 max-w-2xl text-base text-muted sm:text-lg">
                Multimodal depression detection using audio and video signals.
                Our model fuses vocal, facial, and emotional cues to deliver a
                fast, research-grade assessment — in a privacy-conscious
                interface.
              </p>

              <div className="animate-fade-up delay-240 mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <Link href="/predict" className="btn-primary">
                  Start Prediction
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn More
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaveText({
  text,
  className,
  offset = 0,
}: {
  text: string;
  className?: string;
  offset?: number;
}) {
  return (
    <span className={className} aria-hidden="true">
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="wave-char"
          // eslint-disable-next-line react/forbid-dom-props -- per-char animation-delay via CSS custom property
          style={{ ["--i" as string]: i + offset }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
