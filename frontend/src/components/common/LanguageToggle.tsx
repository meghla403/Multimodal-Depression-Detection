"use client";

import { useI18n, type Lang } from "@/components/common/I18nProvider";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "bn", label: "বাং" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative inline-flex items-center rounded-lg border border-border bg-surface-2 p-0.5 text-xs font-semibold"
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={active}
            className={`relative z-10 rounded-md px-2.5 py-1 transition-colors duration-200 ${
              active ? "text-black" : "text-muted hover:text-ink"
            }`}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-primary to-secondary"
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
