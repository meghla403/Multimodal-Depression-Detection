"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "zoom";

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  distance?: number;
}

const hiddenTransform = (direction: Direction, distance: number): string => {
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}px, 0)`;
    case "down":
      return `translate3d(0, -${distance}px, 0)`;
    case "left":
      return `translate3d(${distance}px, 0, 0)`;
    case "right":
      return `translate3d(-${distance}px, 0, 0)`;
    case "zoom":
      return `scale(0.9)`;
    case "fade":
    default:
      return "translate3d(0, 0, 0)";
  }
};

export default function AnimatedReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = "",
  once = false,
  distance = 40,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${duration}ms ease-out`;
    el.style.transitionDelay = `${delay}ms`;
    el.style.willChange = "transform, opacity";
    el.style.transform = visible
      ? "translate3d(0, 0, 0) scale(1)"
      : hiddenTransform(direction, distance);
    el.style.opacity = visible ? "1" : "0";
  }, [visible, direction, distance, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
