"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export default function AdminPage() {
  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Dashboard Administrativo</Text>
      <Text color="textMuted">Visão geral do sistema em desenvolvimento.</Text>
    </Wrapper>
  );
}
