import type { TextProps } from "./types";
import * as S from "./style";

export function Text({
  as = "p",
  children,
  color,
  size = "md",
  weight = "normal",
  align = "left",
}: TextProps) {
  return (
    <S.Wrapper as={as} $color={color} $size={size} $weight={weight} $align={align}>
      {children}
    </S.Wrapper>
  );
}
