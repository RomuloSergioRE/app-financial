"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import * as S from "./styles";

export function CtaSection() {
  const t = useTranslations("cta");
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <S.Wrapper>
      <S.Container ref={ref} $visible={isVisible}>
        <S.Title>{t("titulo")}</S.Title>
        <S.Subtitle>{t("subtitulo")}</S.Subtitle>
        <Button as={Link} href="/register" size="lg" variant="white">
          {t("botao")}
        </Button>
        <S.Disclaimer>{t("nota")}</S.Disclaimer>
      </S.Container>
    </S.Wrapper>
  );
}
