"use client";

import { useState } from "react";
import AnimatedReveal from "@/components/common/AnimatedReveal";
import { useI18n } from "@/components/common/I18nProvider";

const FAQS = [
  {
    q: "Is my uploaded video stored anywhere?",
    a: "No. Videos are processed in memory on the server, features are extracted, and the file is immediately deleted after inference. Nothing is persisted to disk or shared with third parties.",
  },
  {
    q: "How accurate is the model?",
    a: "The underlying cross-modal-attention model was trained and evaluated on the D-Vlog dataset. Exact metrics (accuracy, F1, precision, recall) are documented on the About page. Real-world accuracy will vary based on video quality, speaker demographics, and background conditions.",
  },
  {
    q: "Can I use this for clinical diagnosis?",
    a: "No. This is a research and educational demo only. It is NOT a medical device and should never be used to diagnose, treat, or make clinical decisions about real patients. Please consult a qualified mental health professional for clinical evaluation.",
  },
  {
    q: "What languages / demographics does it support?",
    a: "The D-Vlog training data is predominantly English-speaking. Predictions on non-English speakers, heavily accented speech, or speakers outside the training distribution may be unreliable. We're actively exploring fine-tuning on multilingual and locally relevant datasets.",
  },
  {
    q: "How long should my video be?",
    a: "10 to 30 seconds of clear, front-facing speech is ideal. Shorter clips may not capture enough signal; longer clips are aggregated to a single feature vector, so more length doesn't add accuracy.",
  },
  {
    q: "Why does the model need both audio and video?",
    a: "Depression is reflected through subtle multi-channel cues — lowered pitch, slower speech, reduced eye contact, flattened affect. A cross-modal attention mechanism fuses both signals to find patterns that would be missed by analyzing audio or video alone.",
  },
  {
    q: "Can I run this offline / on my own server?",
    a: "Yes. The entire project is open source. The backend (FastAPI + Keras) and frontend (Next.js) can be deployed anywhere that runs Docker. See the repository README for deployment instructions.",
  },
];

export default function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <AnimatedReveal direction="up" duration={700}>
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("faq.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            {t("faq.subtitle")}
          </p>
        </div>
      </AnimatedReveal>

      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <AnimatedReveal
              key={item.q}
              direction="up"
              delay={i * 60}
              duration={500}
              distance={20}
            >
              <div
                className={`group overflow-hidden rounded-2xl border bg-surface-2 transition-all duration-300 ${
                  isOpen
                    ? "border-primary/50 shadow-[0_10px_40px_-12px_rgba(34,197,94,0.3)]"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen ? "true" : "false"}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                        isOpen ? "text-primary" : "text-muted/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 sm:text-base ${
                        isOpen ? "text-primary" : "text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-surface-3 text-muted"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-border px-6 py-5 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}
