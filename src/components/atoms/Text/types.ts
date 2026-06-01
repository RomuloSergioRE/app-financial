import { ReactNode } from "react";

export type TextTag = "h1" | "h2" | "h3" | "p" | "span" | "label" | "small";

export interface TextProps {
  as?: TextTag;
  children: ReactNode;
  color?: "primary" | "secondary" | "danger" | "error" | "text" | "textSecondary" | "textMuted";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "hero" | "display";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}
