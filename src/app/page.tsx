"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function Home() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <S.Wrapper>
      <Text as="h1" size="xl" weight="bold">
        Bem-vindo{user?.name ? `, ${user.name}` : ""}!
      </Text>
      <Text as="p" size="md" color="textMuted">
        Você está logado.
      </Text>
      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </S.Wrapper>
  );
}
