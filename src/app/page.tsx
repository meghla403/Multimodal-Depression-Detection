import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-emerald-950 via-surface-2 to-surface p-10 shadow-glow sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-ink sm:text-3xl">
                Ready to try the{" "}
                <span className="gradient-text">multimodal demo</span>?
              </h3>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Upload sample audio and video clips to see how the model fuses
                signals to produce a depression-likelihood assessment.
              </p>
            </div>
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
          </div>
        </div>
      </section>
    </>
  );
}
