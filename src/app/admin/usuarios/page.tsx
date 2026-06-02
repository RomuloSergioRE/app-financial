"use client";

import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function UsuariosPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Usuários
      </Text>
      <S.Section>
        <S.SectionTitle>Em breve</S.SectionTitle>
        <S.Description>
          O gerenciamento de usuários está sendo desenvolvido. Em breve você
          poderá visualizar e gerenciar todos os usuários do sistema.
        </S.Description>
      </S.Section>
    </S.Wrapper>
  );
}
