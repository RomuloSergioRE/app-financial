import styled, { keyframes, css } from "styled-components";
import type { SkeletonProps } from "./types";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: calc(400px + 100%) 0; }
`;

export const Wrapper = styled.div<{
  $width: string;
  $height: string;
  $variant: SkeletonProps["variant"];
}>`
  background: ${({ theme }) => theme.colors.surface};
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 0%,
    ${({ theme }) => theme.colors.surfaceHover} 40%,
    ${({ theme }) => theme.colors.surface} 80%
  );
  background-size: 400px 100%;
  background-repeat: no-repeat;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: ${({ theme, $variant }) =>
    $variant === "circle"
      ? "50%"
      : $variant === "text"
        ? theme.borderRadius.sm
        : theme.borderRadius.md};

  ${({ $variant }) =>
    $variant === "text" &&
    css`
      display: inline-block;
      vertical-align: middle;
      &::before {
        content: "\u00a0";
      }
    `}
`;
