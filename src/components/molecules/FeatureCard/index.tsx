"use client";

import type { ReactNode } from "react";
import * as S from "./styles";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <S.Wrapper>
      <S.IconBox>{icon}</S.IconBox>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Wrapper>
  );
}
