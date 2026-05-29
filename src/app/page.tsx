"use client";

import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <Wrapper>
      <Text as="h1" size="xl" weight="bold">
        Bem-vindo{user?.name ? `, ${user.name}` : ""}!
      </Text>
      <Text as="p" size="md" color="textMuted">
        Você está logado.
      </Text>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </Wrapper>
  );
}
