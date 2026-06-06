import styled, { css } from "styled-components";
import type { TextProps } from "./types";

export const Wrapper = styled.p<{
  $color: TextProps["color"];
  $size: TextProps["size"];
  $weight: TextProps["weight"];
  $align: TextProps["align"];
  $fontFamily: "display" | "body" | "mono";
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

  font-family: ${({ $fontFamily, theme }) => theme.fonts[$fontFamily]};
  line-height: ${({ $fontFamily }) => ($fontFamily === "display" ? 1.2 : 1.5)};

  text-align: ${({ $align }) => $align};
  overflow-wrap: break-word;
  word-break: break-word;
`;
