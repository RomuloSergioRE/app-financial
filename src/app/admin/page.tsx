"use client";

import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function AdminPage() {
  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Dashboard Administrativo</Text>
      <Text color="textMuted">Visão geral do sistema em desenvolvimento.</Text>
    </S.Wrapper>
  );
}
