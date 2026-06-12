"use client";

import { useEffect, useState } from "react";
import AnimatedReveal from "@/components/common/AnimatedReveal";
import { useI18n } from "@/components/common/I18nProvider";

const TESTIMONIALS = [
  {
    quote:
      "A well-engineered research demo. The cross-modal fusion pipeline is cleanly exposed and easy to reason about — ideal for teaching multimodal ML to graduate students.",
    name: "Dr. Ayesha Rahman",
    role: "Associate Professor · Computer Science · University of Dhaka",
  },
  {
    quote:
      "We used this interface as a reference design while prototyping a mental-health screening tool for our rural telehealth pilot. The privacy-first approach was exactly what we needed.",
    name: "Tanvir Ahmed",
    role: "Research Associate · Centre for Digital Health Innovation",
  },
  {
    quote:
      "Finally a depression-detection demo that shows both the audio and video channels — not a black box. The attention-based fusion is the right architectural choice for this problem.",
    name: "Prof. Mohammad Kabir",
    role: "Director · AI & Behavioral Analytics Lab",
  },
  {
    quote:
      "Clear disclaimers, ethical framing, clean UI. The project is what every research demo should aim for. I've pointed my thesis students here as a reference.",
    name: "Dr. Nusrat Jahan",
    role: "Senior Researcher · BRAC Institute of Cognitive Science",
  },
];

const ROTATE_MS = 6000;

export default function TestimonialsSection() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <AnimatedReveal direction="up" duration={700}>
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("testimonials.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            {t("testimonials.title")}
          </h2>
        </div>
      </AnimatedReveal>

      <AnimatedReveal direction="zoom" duration={800}>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface-2 via-surface-2 to-surface p-8 shadow-lg sm:p-12"
        >
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
          />

          {/* Giant decorative quote mark */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 text-primary/10"
          >
            <path d="M7 7h4v4H9c0 2 1 3 3 3v2c-4 0-5-2-5-5V7Zm9 0h4v4h-2c0 2 1 3 3 3v2c-4 0-5-2-5-5V7Z" />
          </svg>

          <div className="relative min-h-[180px]">
            {TESTIMONIALS.map((item, i) => (
              <blockquote
                key={item.name}
                aria-hidden={i !== index ? "true" : "false"}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === index
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <p className="text-lg font-medium leading-relaxed text-ink sm:text-xl">
                  {item.quote}
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-sm font-bold text-black">
                    {item.name
                      .split(" ")
                      .map((p) => p[0])
                      .filter((c) => /[A-Z]/.test(c))
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      {item.name}
                    </div>
                    <div className="text-xs text-muted">{item.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Dots */}
          <div className="relative mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-border hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-[11px] text-muted/70">
            Auto-rotates every {ROTATE_MS / 1000}s — hover to pause · sample
            quotes for demo purposes
          </p>

          <span className="sr-only">{current.quote}</span>
        </div>
      </AnimatedReveal>
    </section>
  );
}
