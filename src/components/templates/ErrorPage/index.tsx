"use client";

import { useTranslations } from "next-intl";
import type { ErrorPageProps } from "./types";
import * as S from "./style";

export function ErrorPage({ reset }: ErrorPageProps) {
  const t = useTranslations("error");
  return (
    <S.Wrapper>
      <S.Title>{t("algoErrado")}</S.Title>
      <S.Description>{t("descricao")}</S.Description>
      <S.RetryButton onClick={reset}>{t("tentarNovamente")}</S.RetryButton>
    </S.Wrapper>
  );
}
