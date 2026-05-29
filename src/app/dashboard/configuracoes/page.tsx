"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function ConfiguracoesPage() {
  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Configurações</Text>
      <Text color="textMuted">Página em desenvolvimento.</Text>
    </Wrapper>
  );
}
