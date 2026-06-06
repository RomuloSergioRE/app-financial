"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import theme, { type Theme } from "@/styles/theme";
import themeLight from "@/styles/themeLight";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  mode: ThemeMode;
  themeObject: Theme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as ThemeMode | null;
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  const setTheme = useCallback((m: ThemeMode) => {
    setMode(m);
    localStorage.setItem("theme", m);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      themeObject: mode === "dark" ? theme : themeLight,
      toggleTheme,
      setTheme,
    }),
    [mode, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
