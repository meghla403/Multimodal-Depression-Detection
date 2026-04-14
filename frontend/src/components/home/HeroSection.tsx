import Image from "next/image";
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

          {/* Floating robot assistant — left side decoration */}
          <div className="pointer-events-none absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block xl:left-10">
            <div className="relative animate-float">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-primary/30 blur-3xl"
              />
              <Image
                src="/images/hero.webp"
                alt="Robot assistant"
                width={220}
                height={220}
                priority
                className="h-40 w-40 object-contain drop-shadow-[0_10px_30px_rgba(34,197,94,0.45)] xl:h-52 xl:w-52"
              />
            </div>
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
  const words = text.trim().split(/\s+/);
  const hasTrailingSpace = /\s$/.test(text);
  let charIndex = offset;

  return (
    <span aria-hidden="true">
      {words.flatMap((word, wi) => {
        const wordEl = (
          <span
            key={`w${wi}`}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((ch) => {
              const idx = charIndex++;
              return (
                <span
                  key={idx}
                  className={className ? `wave-char ${className}` : "wave-char"}
                  // eslint-disable-next-line react/forbid-dom-props -- per-char animation-delay via CSS custom property
                  style={{ ["--i" as string]: idx }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        charIndex++;
        const isLast = wi === words.length - 1;
        return !isLast || hasTrailingSpace ? [wordEl, " "] : [wordEl];
      })}
    </span>
  );
}
