import styled, { css } from "styled-components";
import type { TextProps } from "./types";

export const Wrapper = styled.p<{
  $color: TextProps["color"];
  $size: TextProps["size"];
  $weight: TextProps["weight"];
  $align: TextProps["align"];
}>`
  ${({ $color, theme }) =>
    $color &&
    css`
      color: ${theme.colors[$color]};
    `}

  ${({ $size, theme }) =>
    $size &&
    css`
      font-size: ${theme.fontSize[$size]};
    `}

  ${({ $weight, theme }) =>
    $weight &&
    css`
      font-weight: ${theme.fontWeight[$weight]};
    `}

  text-align: ${({ $align }) => $align};
  line-height: 1.5;
`;
