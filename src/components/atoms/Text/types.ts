import { ReactNode } from "react";

export type TextTag = "h1" | "h2" | "h3" | "p" | "span" | "label" | "small";

export interface TextProps {
  as?: TextTag;
  children: ReactNode;
  color?: "primary" | "secondary" | "danger" | "text" | "textSecondary" | "textMuted";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "3xl" | "hero" | "display";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  fontFamily?: "display" | "body" | "mono";
}
