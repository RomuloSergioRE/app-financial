"use client";

import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Select } from "@/components/molecules/Select";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateSettings } from "@/hooks/useUser";
import * as S from "./style";

const CURRENCY_OPTIONS = [
  { value: "BRL", label: "BRL (R$)" },
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "ARS", label: "ARS ($)" },
];

export default function SettingsPage() {
  const t = useTranslations("settings");
  const { mode, setTheme } = useTheme();
  const { currency } = useAuth();
  const { mutate: updateSettings } = useUpdateSettings();

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>
      <S.Section>
        <S.SectionTitle>{t("tema")}</S.SectionTitle>
        <Select
          value={mode}
          onChange={(v) => setTheme(v as "dark" | "light")}
          options={[
            { value: "dark", label: t("escuro") },
            { value: "light", label: t("claro") },
          ]}
        />
      </S.Section>
      <S.Section>
        <S.SectionTitle>{t("moedaPadrao")}</S.SectionTitle>
        <Select
          value={currency}
          onChange={(v) => updateSettings({ currency: v })}
          options={CURRENCY_OPTIONS}
        />
      </S.Section>
    </S.Wrapper>
  );
}
