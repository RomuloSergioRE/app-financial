"use client";

import { forwardRef } from "react";
import type { IconButtonProps } from "./types";
import * as S from "./style";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ variant = "primary", label, children, ...props }, ref) {
    return (
      <S.Wrapper ref={ref} $variant={variant} aria-label={label} {...props}>
        {children}
      </S.Wrapper>
    );
  },
);
