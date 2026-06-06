"use client";

import { forwardRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Input } from "@/components/atoms/Input";
import type { InputProps } from "@/components/atoms/Input/types";
import * as S from "./style";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <S.Wrapper>
      <Input
        ref={ref}
        {...props}
        type={visible ? "text" : "password"}
        style={{ paddingRight: "40px", ...(props.style || {}) }}
      />
      <S.ToggleButton
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Esconder senha" : "Mostrar senha"}
      >
        {visible ? <HiOutlineEye size={18} /> : <HiOutlineEyeSlash size={18} />}
      </S.ToggleButton>
    </S.Wrapper>
  );
});

PasswordInput.displayName = "PasswordInput";
