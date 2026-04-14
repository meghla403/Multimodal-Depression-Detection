"use client";

import { useRef, useState } from "react";

interface InteractiveCardShellProps {
  children: React.ReactNode;
  index?: number;
  badgeLabel?: string;
  className?: string;
}

export default function InteractiveCardShell({
  children,
  index,
  badgeLabel,
  className = "",
}: InteractiveCardShellProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    const y = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    for (const el of [glowRef.current, spotRef.current]) {
      if (!el) continue;
      el.style.setProperty("--mouse-x", x);
      el.style.setProperty("--mouse-y", y);
    }
    if (!active) setActive(true);
  };

  const showBadge = index !== undefined || badgeLabel !== undefined;
  const badgeText =
    badgeLabel ?? (index !== undefined ? `0${index + 1}` : undefined);

  const overlayOpacity = active ? "opacity-100" : "opacity-0";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActive(false)}
      className={`group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.35)] ${className}`}
    >
      {/* Animated border glow on hover */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className={`interactive-border-glow pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-500 ${overlayOpacity}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-2xl bg-surface-2"
      />

      {/* Mouse-follow spotlight */}
      <div
        ref={spotRef}
        aria-hidden="true"
        className={`interactive-spotlight pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${overlayOpacity}`}
      />

      {/* Decorative corner rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full border border-primary/20 transition-all duration-700 group-hover:scale-125 group-hover:border-primary/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full border border-primary/10 transition-all duration-700 group-hover:scale-110 group-hover:border-primary/20"
      />

      {/* Index / label badge */}
      {showBadge && (
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 font-mono text-xs font-semibold text-muted/60 transition-colors duration-300 group-hover:text-primary"
        >
          {badgeText}
        </span>
      )}

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
