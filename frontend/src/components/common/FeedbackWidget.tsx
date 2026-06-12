"use client";

import { useEffect, useState } from "react";

type Category = "bug" | "idea" | "praise" | "other";

const CATEGORIES: { value: Category; label: string; icon: JSX.Element }[] = [
  {
    value: "bug",
    label: "Bug",
    icon: (
      <>
        <path d="M8 2 6 4" />
        <path d="m16 2 2 2" />
        <path d="M12 14v6" />
        <path d="M20 14v2a8 8 0 0 1-16 0v-2" />
        <rect x="6" y="6" width="12" height="10" rx="6" />
      </>
    ),
  },
  {
    value: "idea",
    label: "Idea",
    icon: (
      <>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2Z" />
      </>
    ),
  },
  {
    value: "praise",
    label: "Praise",
    icon: (
      <>
        <path d="M7 10v12" />
        <path d="M15 5.9c0-1.6-.5-2.9-2-2.9-1.7 0-2 2-2 5 0 .6-.3 2-2 2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9.5a3 3 0 0 0 3-2.4l1.3-7.1a2 2 0 0 0-2-2.4H15V5.9Z" />
      </>
    ),
  },
  {
    value: "other",
    label: "Other",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </>
    ),
  },
];

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>("idea");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Placeholder — replace with your backend / Google Form / mailto as needed.
    console.log("[Feedback]", { category, message, email, at: new Date().toISOString() });
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setMessage("");
      setEmail("");
      setCategory("idea");
    }, 1600);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send feedback"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_30px_-6px_rgba(34,197,94,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(34,197,94,0.6)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
        </svg>
        Feedback
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-up"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Card */}
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface-2 shadow-2xl">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-emerald-500"
            />

            <div className="p-6 sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3
                    id="feedback-title"
                    className="text-xl font-bold text-ink sm:text-2xl"
                  >
                    Send us feedback
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Bug? Idea? Compliment? We read everything.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close feedback"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-3 text-muted transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-7 w-7"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="mt-4 text-base font-semibold text-ink">
                    Thank you!
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Your feedback helps shape the next version.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Category chips */}
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Category
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {CATEGORIES.map((c) => {
                        const active = category === c.value;
                        return (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => setCategory(c.value)}
                            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all duration-200 ${
                              active
                                ? "border-primary/50 bg-primary/10 text-primary"
                                : "border-border bg-surface-3 text-muted hover:border-primary/30 hover:text-ink"
                            }`}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              {c.icon}
                            </svg>
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="fb-msg"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted"
                    >
                      Your message
                    </label>
                    <textarea
                      id="fb-msg"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Tell us what's on your mind..."
                      className="w-full resize-none rounded-xl border border-border bg-surface-3 px-4 py-3 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary/50"
                    />
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label
                      htmlFor="fb-email"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-muted"
                    >
                      Email <span className="text-muted/60">(optional)</span>
                    </label>
                    <input
                      id="fb-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border bg-surface-3 px-4 py-3 text-sm text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary/50"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className={`btn-primary w-full ${
                      !message.trim()
                        ? "cursor-not-allowed opacity-50 hover:opacity-50"
                        : ""
                    }`}
                  >
                    Send feedback
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
