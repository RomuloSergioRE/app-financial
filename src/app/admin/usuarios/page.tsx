"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export default function UsuariosPage() {
  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Usuários</Text>
      <Text color="textMuted">Gerenciamento de usuários em desenvolvimento.</Text>
    </Wrapper>
  );
}
