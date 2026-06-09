const theme = {
  colors: {
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    primaryDark: "#2563EB",
    secondary: "#3B82F6",
    secondaryLight: "#60A5FA",
    secondaryDark: "#2563EB",
    danger: "#F6465D",
    dangerLight: "#FF6B81",
    dangerDark: "#D03048",
    tradingUp: "#0ECB81",
    tradingDown: "#F6465D",
    info: "#3B82F6",
    background: "#0B0E11",
    surface: "#1E2329",
    surfaceHover: "#2B3139",
    text: "#EAECEF",
    textSecondary: "#707A8A",
    textMuted: "#5A6270",
    border: "#2B3139",
    borderFocus: "#3B82F6",
    overlay: "rgba(0, 0, 0, 0.6)",
    onPrimary: "#FFFFFF",
    onSurface: "#EAECEF",
    warning: "#D4A853",
    disabled: "rgba(255, 255, 255, 0.3)",
  },
  fonts: {
    display: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "var(--font-mono), 'JetBrains Mono', monospace",
  },
  breakpoints: {
    mobile: "480px",
    sm: "640px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1280px",
    "2xl": "1536px",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    section: "64px",
  },
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.8125rem",
    md: "0.9375rem",
    lg: "1.0625rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    "3xl": "2rem",
    hero: "2.5rem",
    display: "3rem",
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 12px rgba(0,0,0,0.4)",
    lg: "0 8px 24px rgba(0,0,0,0.5)",
  },
  transition: {
    fast: "0.15s ease",
    base: "0.2s ease",
    slow: "0.3s ease",
  },
} as const;

export interface Theme {
  colors: Record<keyof typeof theme.colors, string>;
  fonts: Record<keyof typeof theme.fonts, string>;
  breakpoints: Record<keyof typeof theme.breakpoints, string>;
  spacing: Record<keyof typeof theme.spacing, string>;
  borderRadius: Record<keyof typeof theme.borderRadius, string>;
  fontSize: Record<keyof typeof theme.fontSize, string>;
  fontWeight: Record<keyof typeof theme.fontWeight, number>;
  shadow: Record<keyof typeof theme.shadow, string>;
  transition: Record<keyof typeof theme.transition, string>;
}

export default theme;
