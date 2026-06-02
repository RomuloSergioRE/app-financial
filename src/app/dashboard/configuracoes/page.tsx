"use client";

import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function ConfiguracoesPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Configurações
      </Text>
      <S.Section>
        <S.SectionTitle>Em breve</S.SectionTitle>
        <S.Description>
          A página de configurações está sendo desenvolvida. Em breve você
          poderá personalizar suas preferências por aqui.
        </S.Description>
      </S.Section>
    </S.Wrapper>
  );
}
