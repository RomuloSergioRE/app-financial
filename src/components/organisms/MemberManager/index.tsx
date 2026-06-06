"use client";

import { HiOutlineXMark } from "react-icons/hi2";
import { useState } from "react";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Select } from "@/components/molecules/Select";
import { Skeleton } from "@/components/atoms/Skeleton";
import * as S from "./style";

interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface MemberManagerProps {
  open: boolean;
  members: Member[];
  status: "loading" | "error" | "success";
  inviteIsLoading: boolean;
  acceptIsLoading: boolean;
  onInvite: (email: string, role: string) => void;
  onAccept: () => void;
  onUpdateRole: (memberId: string, role: string) => void;
  onRemove: (userId: string) => void;
}

const ROLE_OPTIONS = [
  { value: "viewer", label: "Visualizador" },
  { value: "finance", label: "Financeiro" },
  { value: "admin", label: "Admin" },
];

export function MemberManager({
  open,
  members,
  status,
  inviteIsLoading,
  acceptIsLoading,
  onInvite,
  onAccept,
  onUpdateRole,
  onRemove,
}: MemberManagerProps) {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");

  if (!open) return null;

  const handleSubmitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    onInvite(inviteEmail, inviteRole);
    setInviteEmail("");
  };

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmitInvite}>
        <Text as="h3" size="sm" weight="semibold">
          Convidar Membro
        </Text>
        <S.Field>
          <S.Label>Email</S.Label>
          <S.Input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="email@exemplo.com"
          />
        </S.Field>
        <S.Field>
          <S.Label>Função</S.Label>
          <Select value={inviteRole} onChange={(v) => setInviteRole(v)} options={ROLE_OPTIONS} />
        </S.Field>
        <Button type="submit" loading={inviteIsLoading}>
          Convidar
        </Button>
      </S.Form>

      {status === "loading" ? (
        <Skeleton variant="rect" height="100px" />
      ) : status === "success" ? (
        <S.List style={{ marginTop: 16 }}>
          <S.MemberTable>
            <thead>
              <tr>
                <S.Th>Nome</S.Th>
                <S.Th>Email</S.Th>
                <S.Th>Função</S.Th>
                <S.Th>Status</S.Th>
                <S.Th>Ações</S.Th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <S.Td>{m.name}</S.Td>
                  <S.Td>{m.email}</S.Td>
                  <S.Td>
                    <Select
                      value={m.role}
                      onChange={(v) => onUpdateRole(m.id, v)}
                      options={ROLE_OPTIONS}
                    />
                  </S.Td>
                  <S.Td>
                    <S.StatusBadge $status={m.status}>
                      {m.status === "active" ? "Ativo" : "Pendente"}
                    </S.StatusBadge>
                  </S.Td>
                  <S.Td>
                    {m.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={onAccept}
                        loading={acceptIsLoading}
                      >
                        Aceitar
                      </Button>
                    )}
                    <IconButton onClick={() => onRemove(m.userId)} title="Remover" variant="outline">
                      <HiOutlineXMark size={16} />
                    </IconButton>
                  </S.Td>
                </tr>
              ))}
            </tbody>
          </S.MemberTable>
        </S.List>
      ) : null}
    </S.Container>
  );
}
