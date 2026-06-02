"use client";

import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function AdminPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Dashboard Administrativo
      </Text>
      <S.Section>
        <S.SectionTitle>Em breve</S.SectionTitle>
        <S.Description>
          O dashboard administrativo está sendo desenvolvido. Em breve você
          terá acesso a métricas e visão geral do sistema.
        </S.Description>
      </S.Section>
    </S.Wrapper>
  );
}
