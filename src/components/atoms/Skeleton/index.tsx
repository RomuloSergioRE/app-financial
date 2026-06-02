import type { SkeletonProps } from "./types";
import * as S from "./style";

export function Skeleton({
  width = "100%",
  height = "1em",
  variant = "text",
  ...props
}: SkeletonProps) {
  return (
    <S.Wrapper
      $width={width}
      $height={height}
      $variant={variant}
      aria-hidden="true"
      {...props}
    />
  );
}
