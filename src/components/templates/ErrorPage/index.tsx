"use client";

import type { ErrorPageProps } from "./types";
import * as S from "./style";

export function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <S.Wrapper>
      <S.Title>Algo deu errado!</S.Title>
      <S.Description>Ocorreu um erro inesperado. Tente novamente.</S.Description>
      <S.RetryButton onClick={reset}>Tentar novamente</S.RetryButton>
    </S.Wrapper>
  );
}
