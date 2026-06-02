import type { ButtonProps } from "./types";
import * as S from "./style";

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  as,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <S.Wrapper
      as={as}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </S.Wrapper>
  );
}
