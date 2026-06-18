"use client";

import { useTranslations } from "next-intl";
import { FaqItem } from "@/components/molecules/FaqItem";
import * as S from "./styles";

const FAQ_KEYS = ["1", "2", "3", "4", "5"] as const;

export function Faq() {
  const t = useTranslations("faq");

  return (
    <S.Wrapper id="faq">
      <S.Container>
        <S.Title>{t("titulo")}</S.Title>
        <S.List>
          {FAQ_KEYS.map((key) => (
            <FaqItem
              key={key}
              question={t(`q${key}`)}
              answer={t(`a${key}`)}
            />
          ))}
        </S.List>
      </S.Container>
    </S.Wrapper>
  );
}
