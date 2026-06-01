"use client";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "@/contexts/ThemeContext";
import * as S from "./style";

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <S.Wrapper
      onClick={toggleTheme}
      aria-label={mode === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {mode === "dark" ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
    </S.Wrapper>
  );
}
