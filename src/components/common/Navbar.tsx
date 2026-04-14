"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_TAGLINE, NAV_LINKS } from "@/utils/constants";

const STAGGER = ["", "delay-80", "delay-160", "delay-240", "delay-320"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-3" : "py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group relative flex items-center gap-3">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-black shadow-soft transition-all duration-300 group-hover:rotate-6 group-hover:shadow-glow">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-xl bg-primary/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 2 1 3.5 2 5 1 1.2 1 2 1 3v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1c0-1 0-1.8 1-3 1-1.5 2-3 2-5a7 7 0 0 0-7-7Z" />
              <path d="M9 22h6" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-tight gradient-text sm:text-base">
            {APP_TAGLINE}
          </span>
        </Link>

        {/* Desktop links — floating pill */}
        <ul className="hidden items-center gap-2 rounded-full border border-border bg-surface-2/70 p-1.5 backdrop-blur-md md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  className={`relative inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted hover:bg-surface-3 hover:text-ink"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.7)]"
                    />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2 text-ink transition-colors duration-200 hover:border-primary/50 hover:text-primary md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden="true"
              className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — smooth height transition */}
      <div
        className={`grid overflow-hidden border-border bg-surface/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((l, i) => {
              const active = pathname === l.href;
              return (
                <li
                  key={l.href}
                  className={`animate-fade-up ${open ? STAGGER[i] ?? "" : ""}`}
                >
                  <Link
                    href={l.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      active
                        ? "border border-primary/30 bg-primary/10 text-primary"
                        : "border border-transparent text-muted hover:border-border hover:bg-surface-2 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
                    )}
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
