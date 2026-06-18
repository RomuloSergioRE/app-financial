"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import { MockupPreview } from "@/components/molecules/MockupPreview";
import * as S from "./styles";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <S.Wrapper>
      <S.Container>
        <S.Content>
          <S.Badge>{t("novaVersao")}</S.Badge>
          <S.Title>{t("titulo")}</S.Title>
          <S.Subtitle>
            {t("subtitulo")}
          </S.Subtitle>
          <S.Actions>
            <Button as={Link} href="/register" size="md">
              {t("cta")}
            </Button>
            <Button as={Link} href="#sobre" variant="outline" size="md">
              {t("saibaMais")}
            </Button>
          </S.Actions>
          <S.TrustRow>
            <S.Bullet />
            <span>{t("gratuito")}</span>
            <S.Bullet />
            <span>{t("semCartao")}</span>
            <S.Bullet />
            <span>{t("cancele")}</span>
          </S.TrustRow>
        </S.Content>
        <S.MockupColumn>
          <MockupPreview />
        </S.MockupColumn>
      </S.Container>
    </S.Wrapper>
  );
}
