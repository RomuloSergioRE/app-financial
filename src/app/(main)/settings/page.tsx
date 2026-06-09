"use client";

import { Text } from "@/components/atoms/Text";
import { Select } from "@/components/molecules/Select";
import { useTheme } from "@/contexts/ThemeContext";
import * as S from "./style";

export default function SettingsPage() {
  const { mode, setTheme } = useTheme();

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Configurações
      </Text>
      <S.Section>
        <S.SectionTitle>Tema</S.SectionTitle>
        <Select
          value={mode}
          onChange={(v) => setTheme(v as "dark" | "light")}
          options={[
            { value: "dark", label: "Escuro" },
            { value: "light", label: "Claro" },
          ]}
        />
      </S.Section>
    </S.Wrapper>
  );
}
