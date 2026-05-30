"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Text } from "@/components/atoms/Text";
import * as S from "./style";

export default function PerfilPage() {
  const { user } = useAuth();

  return (
    <S.Wrapper>
      <Text as="h1" size="xxl" weight="bold">Perfil</Text>
      <S.Field>
        <S.Label>Nome</S.Label>
        <S.Value>{user?.name}</S.Value>
      </S.Field>
      <S.Field>
        <S.Label>Email</S.Label>
        <S.Value>{user?.email}</S.Value>
      </S.Field>
      <S.Field>
        <S.Label>Função</S.Label>
        <S.Value>{user?.role === "admin" ? "Administrador" : "Usuário"}</S.Value>
      </S.Field>
    </S.Wrapper>
  );
}
