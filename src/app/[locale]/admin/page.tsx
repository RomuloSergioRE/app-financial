"use client";

import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function AdminPage() {
  const t = useTranslations("admin.dashboard");

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>
      <S.Section>
        <S.SectionTitle>{t("emBreve")}</S.SectionTitle>
        <S.Description>{t("descricao")}</S.Description>
      </S.Section>
    </S.Wrapper>
  );
}
