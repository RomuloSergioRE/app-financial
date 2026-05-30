"use client";

import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function UsuariosPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Usuários</Text>
      <Text color="textMuted">Gerenciamento de usuários em desenvolvimento.</Text>
    </S.Wrapper>
  );
}
