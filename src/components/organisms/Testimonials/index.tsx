"use client";

import { useTranslations } from "next-intl";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import * as S from "./styles";

const TESTIMONIAL_KEYS = ["ana", "carlos", "juliana"] as const;

export function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <S.Wrapper id="depoimentos">
      <S.Container>
        <S.Title>{t("titulo")}</S.Title>
        <S.Grid>
          {TESTIMONIAL_KEYS.map((key) => (
            <TestimonialCard
              key={key}
              name={t(`${key}.nome`)}
              role={t(`${key}.cargo`)}
              quote={t(`${key}.texto`)}
              rating={5}
            />
          ))}
        </S.Grid>
      </S.Container>
    </S.Wrapper>
  );
}
