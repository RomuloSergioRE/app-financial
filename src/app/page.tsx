"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function Home() {
  const { user } = useAuth();

  return (
    <S.Wrapper>
      <Text as="h1" size="display" weight="bold" align="center">
        Financial
      </Text>
      <Text as="p" size="lg" color="textSecondary" align="center">
        {user?.name
          ? `Bem-vindo, ${user.name}.`
          : "Gerencie suas finanças com clareza."}
      </Text>
      <S.Actions>
        {user ? (
            <Button as={Link} href="/dashboard">Ir para o Dashboard</Button>
        ) : (
          <>
            <Button as={Link} href="/login">Entrar</Button>
            <Button as={Link} href="/register" variant="outline">Criar Conta</Button>
          </>
        )}
      </S.Actions>
    </S.Wrapper>
  );
}
