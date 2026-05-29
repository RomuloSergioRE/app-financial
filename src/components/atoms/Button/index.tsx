import { forwardRef } from "react";
import type { ButtonProps } from "./types";
import * as S from "./style";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <S.Wrapper
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? "Carregando..." : children}
      </S.Wrapper>
    );
  }
);

Button.displayName = "Button";
