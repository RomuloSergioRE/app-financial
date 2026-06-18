"use client";

import { useTranslations } from "next-intl";
import { PricingCard } from "@/components/molecules/PricingCard";
import * as S from "./styles";

const PLAN_KEYS = ["free", "pro", "enterprise"] as const;

export function Pricing() {
  const t = useTranslations("pricing");

  return (
    <S.Wrapper id="planos">
      <S.Container>
        <S.Title>{t("titulo")}</S.Title>
        <S.Subtitle>{t("subtitulo")}</S.Subtitle>
        <S.Grid>
          {PLAN_KEYS.map((key) => (
            <PricingCard
              key={key}
              name={t(`${key}.nome`)}
              price={t(`${key}.preco`)}
              period={t(`${key}.periodo`)}
              description={t(`${key}.desc`)}
              features={t.raw(`${key}.features`) as string[]}
              highlighted={key === "pro"}
              badge={key === "pro" ? t(`${key}.popular`) : undefined}
              cta={t(`${key}.cta`)}
              ctaHref="/register"
            />
          ))}
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}
