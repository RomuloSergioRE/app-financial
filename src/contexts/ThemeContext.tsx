"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import theme from "@/styles/theme";
import themeLight from "@/styles/themeLight";
import type { Theme } from "@/styles/theme";

type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  mode: ThemeMode;
  themeObject: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      themeObject: mode === "dark" ? theme : (themeLight as unknown as Theme),
      toggleTheme,
    }),
    [mode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
