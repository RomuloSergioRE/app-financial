import { ButtonHTMLAttributes, ElementType } from "react";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "white";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  as?: ElementType;
  href?: string;
}
