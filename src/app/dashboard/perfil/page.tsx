"use client";

import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { Text } from "@/components/atoms/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <Wrapper>
      <Text as="h1" size="xxl" weight="bold">Perfil</Text>
      <Field>
        <Label>Nome</Label>
        <Value>{user?.name}</Value>
      </Field>
      <Field>
        <Label>Email</Label>
        <Value>{user?.email}</Value>
      </Field>
      <Field>
        <Label>Função</Label>
        <Value>{user?.role === "admin" ? "Administrador" : "Usuário"}</Value>
      </Field>
    </Wrapper>
  );
}
