"use client";

import AnimatedReveal from "@/components/common/AnimatedReveal";
import { useI18n } from "@/components/common/I18nProvider";

const ICONS = [
  (
    <>
      <path d="M12 3v12" />
      <path d="m7 8 5-5 5 5" />
      <path d="M5 21h14" />
    </>
  ),
  (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  (
    <>
      <path d="M20 6 9 17l-5-5" />
    </>
  ),
];

export default function HowItWorksSection() {
  const { t } = useI18n();

  const STEPS = [
    {
      num: "01",
      title: t("how.step1.title"),
      text: t("how.step1.text"),
      icon: ICONS[0],
    },
    {
      num: "02",
      title: t("how.step2.title"),
      text: t("how.step2.text"),
      icon: ICONS[1],
    },
    {
      num: "03",
      title: t("how.step3.title"),
      text: t("how.step3.text"),
      icon: ICONS[2],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <AnimatedReveal direction="up" duration={700}>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("how.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
            {t("how.subtitle")}
          </p>
        </div>
      </AnimatedReveal>

      <div className="relative grid gap-6 md:grid-cols-3">
        {/* Connecting line on desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px md:block"
        >
          <div className="mx-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {STEPS.map((s, i) => (
          <AnimatedReveal
            key={s.num}
            direction="up"
            delay={i * 150}
            duration={700}
          >
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)]">
              {/* Decorative ring */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-primary/10 transition-all duration-700 group-hover:scale-110 group-hover:border-primary/30"
              />

              {/* Step number */}
              <span
                aria-hidden="true"
                className="absolute right-4 top-4 font-mono text-xs font-semibold text-muted/60 transition-colors duration-300 group-hover:text-primary"
              >
                {s.num}
              </span>

              {/* Icon with badge */}
              <div className="relative mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full border-2 border-primary/30 bg-surface shadow-inner transition-all duration-500 group-hover:scale-105">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-emerald-500 text-black transition-transform duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    {s.icon}
                  </svg>
                </div>
              </div>

              <h3 className="relative text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
                {s.title}
              </h3>

              <span
                aria-hidden="true"
                className="mx-auto mt-2 block h-px w-8 origin-center scale-x-100 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-[4]"
              />

              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
