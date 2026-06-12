"use client";

import { useEffect, useRef, useState } from "react";
import { ACCENTS, useTheme } from "@/components/common/ThemeProvider";

export default function ThemePicker() {
  const { accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change accent color"
        aria-expanded={open}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 text-muted transition-colors duration-200 hover:border-primary/50 hover:text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2A10 10 0 0 0 2 12c0 5.5 4.5 10 10 10a2 2 0 0 0 2-2 1.9 1.9 0 0 0-.5-1.3 2 2 0 0 1-.5-1.2 2 2 0 0 1 2-2h2a4 4 0 0 0 4-4 10 10 0 0 0-10-10Z" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-56 animate-fade-up rounded-xl border border-border bg-surface-2 p-3 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Accent color
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {ACCENTS.map((a) => {
              const active = accent === a.value;
              return (
                <button
                  key={a.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => setAccent(a.value)}
                  aria-label={a.label}
                  title={a.label}
                  className={`group relative grid h-9 w-9 place-items-center rounded-lg border transition-all duration-200 ${
                    active
                      ? "border-ink scale-105"
                      : "border-border hover:scale-105"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 rounded-full ring-2 ring-inset ring-white/10 theme-swatch"
                    data-swatch={a.value}
                  />
                  {active && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute h-3 w-3 text-white drop-shadow"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-muted/80">
            Your choice is saved in this browser.
          </p>
        </div>
      )}
    </div>
  );
}
