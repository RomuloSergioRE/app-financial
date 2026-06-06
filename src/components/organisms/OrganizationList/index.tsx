"use client";

import {
  HiOutlineBuildingOffice2,
  HiOutlineCheck,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import type { Organization } from "@/types";
import * as S from "./style";

interface OrganizationListProps {
  organizations: Organization[];
  status: "loading" | "error" | "success";
  onSelect: (id: string) => void;
  onManageMembers: (id: string) => void;
  onFiscalReport: (id: string) => void;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrganizationList({
  organizations,
  status,
  onSelect,
  onManageMembers,
  onFiscalReport,
  onEdit,
  onDelete,
}: OrganizationListProps) {
  if (status === "loading") {
    return (
      <S.List>
        <Skeleton variant="rect" height="64px" />
        <Skeleton variant="rect" height="64px" />
      </S.List>
    );
  }

  if (organizations.length === 0) {
    return (
      <EmptyState
        icon={<HiOutlineBuildingOffice2 />}
        title="Nenhuma organização"
        description="Crie ou participe de uma organização para gerenciar finanças em equipe."
      />
    );
  }

  return (
    <S.List>
      {organizations.map((org) => (
        <S.OrgCard key={org.id}>
          <S.OrgInfo>
            <S.OrgName>{org.name}</S.OrgName>
            <S.OrgMeta>
              {org.memberCount} membro(s) · {org.role}
            </S.OrgMeta>
          </S.OrgInfo>
          <S.Actions>
            <S.IconButton onClick={() => onSelect(org.id)} title="Selecionar organização">
              <HiOutlineCheck size={16} />
            </S.IconButton>
            <S.IconButton onClick={() => onManageMembers(org.id)} title="Membros">
              <HiOutlineUserGroup size={16} />
            </S.IconButton>
            <S.IconButton onClick={() => onFiscalReport(org.id)} title="Relatório fiscal">
              <HiOutlineDocumentText size={16} />
            </S.IconButton>
            <S.IconButton onClick={() => onEdit(org)} title="Editar">
              <HiOutlinePencil size={16} />
            </S.IconButton>
            <S.IconButton onClick={() => onDelete(org)} title="Excluir">
              <HiOutlineTrash size={16} />
            </S.IconButton>
          </S.Actions>
        </S.OrgCard>
      ))}
    </S.List>
  );
}
