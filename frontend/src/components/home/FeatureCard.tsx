"use client";

import { useEffect, useRef, useState } from "react";
import InteractiveCardShell from "@/components/common/InteractiveCardShell";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index?: number;
  total?: number;
}

const ICONS: Record<string, JSX.Element> = {
  waveform: <path d="M2 12h3l2-7 3 14 3-10 2 6 2-3h5" />,
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

const DELAY_MS = [0, 80, 160, 240];

export default function FeatureCard({
  title,
  description,
  icon,
  index = 0,
  total = 1,
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isFirst = index === 0;
  const isLast = index === total - 1;

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const hidden = isFirst
      ? "translate3d(-100vw, 0, 0)"
      : isLast
        ? "translate3d(100vw, 0, 0)"
        : "translate3d(0, -40px, 0)";
    el.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
    el.style.transitionDelay = `${DELAY_MS[index] ?? 0}ms`;
    el.style.willChange = "transform, opacity";
    el.style.transform = visible ? "translate3d(0, 0, 0)" : hidden;
    el.style.opacity = visible ? "1" : "0";
  }, [visible, isFirst, isLast, index]);

  return (
    <div ref={ref} className="h-full">
      <div ref={innerRef} className="h-full">
        <InteractiveCardShell index={index}>
          <div className="relative mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:from-primary group-hover:to-secondary group-hover:text-black group-hover:shadow-glow">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-7 w-7"
            >
              {ICONS[icon] ?? ICONS.layers}
            </svg>
          </div>

          <h3 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          <span
            aria-hidden="true"
            className="mt-2 block h-px w-8 origin-left scale-x-100 bg-gradient-to-r from-primary to-transparent transition-transform duration-500 group-hover:scale-x-[4]"
          />

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {description}
          </p>

          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
            <span>Learn more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </InteractiveCardShell>
      </div>
    </div>
  );
}
