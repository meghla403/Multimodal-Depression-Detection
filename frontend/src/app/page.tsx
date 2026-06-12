"use client";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import AnimatedReveal from "@/components/common/AnimatedReveal";
import { useI18n } from "@/components/common/I18nProvider";
import Link from "next/link";

export default function HomePage() {
  const { t } = useI18n();
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <AnimatedReveal direction="zoom" duration={800}>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-950 via-surface-2 to-surface p-10 shadow-glow sm:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {t("cta.badge")}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
                  {t("cta.title")}{" "}
                  <span className="gradient-text">{t("cta.titleAccent")}</span>?
                </h3>
                <p className="mt-2 text-sm text-muted sm:text-base">
                  {t("cta.description")}
                </p>

                {/* Trust indicators */}
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
                  <li className="inline-flex items-center gap-1.5">
                    <Check />
                    {t("cta.check1")}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Check />
                    {t("cta.check2")}
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Check />
                    {t("cta.check3")}
                  </li>
                </ul>
              </div>

              <Link href="/predict" className="btn-primary">
                {t("cta.button")}
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
            </div>
          </div>
        </AnimatedReveal>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 text-primary"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
