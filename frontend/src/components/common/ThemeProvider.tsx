"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Accent = "green" | "blue" | "purple" | "amber" | "rose";
export type Mode = "dark" | "light";

export const ACCENTS: { value: Accent; label: string; swatch: string }[] = [
  { value: "green", label: "Green", swatch: "#22c55e" },
  { value: "blue", label: "Blue", swatch: "#3b82f6" },
  { value: "purple", label: "Purple", swatch: "#a855f7" },
  { value: "amber", label: "Amber", swatch: "#f59e0b" },
  { value: "rose", label: "Rose", swatch: "#f43f5e" },
];

interface ThemeCtx {
  accent: Accent;
  setAccent: (a: Accent) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
}

const Ctx = createContext<ThemeCtx>({
  accent: "green",
  setAccent: () => {},
  mode: "dark",
  setMode: () => {},
  toggleMode: () => {},
});

const ACCENT_KEY = "mdds-accent";
const MODE_KEY = "mdds-mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("green");
  const [mode, setModeState] = useState<Mode>("dark");

  // Load saved preferences
  useEffect(() => {
    const savedAccent = window.localStorage.getItem(ACCENT_KEY) as Accent | null;
    if (savedAccent && ACCENTS.some((a) => a.value === savedAccent)) {
      setAccentState(savedAccent);
    }
    const savedMode = window.localStorage.getItem(MODE_KEY) as Mode | null;
    if (savedMode === "light" || savedMode === "dark") {
      setModeState(savedMode);
    }
  }, []);

  // Apply accent to <html>
  useEffect(() => {
    if (accent === "green") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", accent);
    }
  }, [accent]);

  // Apply mode to <html>
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [mode]);

  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    window.localStorage.setItem(ACCENT_KEY, a);
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    window.localStorage.setItem(MODE_KEY, m);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next: Mode = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(MODE_KEY, next);
      return next;
    });
  }, []);

  return (
    <Ctx.Provider value={{ accent, setAccent, mode, setMode, toggleMode }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  return useContext(Ctx);
}
