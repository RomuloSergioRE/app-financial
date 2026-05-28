import { ReactNode } from "react";

export type TextTag = "h1" | "h2" | "h3" | "p" | "span" | "label" | "small";

export interface TextProps {
  as?: TextTag;
  children: ReactNode;
  color?: "primary" | "secondary" | "error" | "textMuted";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "hero";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
}
