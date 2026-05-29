import { forwardRef } from "react";
import type { InputProps } from "./types";
import * as S from "./style";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <S.Wrapper ref={ref} $hasError={!!error} {...props} />
    );
  }
);

Input.displayName = "Input";
