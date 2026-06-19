"use client";

import {
  HiOutlineBuildingOffice2,
  HiOutlineCheck,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { EmptyState } from "@/components/molecules/EmptyState";
import type { Organization } from "@/types";
import * as S from "./style";

interface OrganizationListProps {
  organizations: Organization[];
  status: "loading" | "error" | "success";
  disabled?: boolean;
  onSelect: (id: string) => void;
  onManageMembers: (id: string) => void;
  onFiscalReport: (id: string) => void;
  onEdit: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export function OrganizationList({
  organizations,
  status,
  disabled = false,
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
            <IconButton disabled={disabled} onClick={() => onSelect(org.id)} title="Selecionar organização" variant="outline">
              {disabled ? <HiOutlineLockClosed size={16} /> : <HiOutlineCheck size={16} />}
            </IconButton>
            <IconButton disabled={disabled} onClick={() => onManageMembers(org.id)} title="Membros" variant="outline">
              {disabled ? <HiOutlineLockClosed size={16} /> : <HiOutlineUserGroup size={16} />}
            </IconButton>
            <IconButton disabled={disabled} onClick={() => onFiscalReport(org.id)} title="Relatório fiscal" variant="outline">
              {disabled ? <HiOutlineLockClosed size={16} /> : <HiOutlineDocumentText size={16} />}
            </IconButton>
            <IconButton disabled={disabled} onClick={() => onEdit(org)} title="Editar" variant="outline">
              {disabled ? <HiOutlineLockClosed size={16} /> : <HiOutlinePencil size={16} />}
            </IconButton>
            <IconButton disabled={disabled} onClick={() => onDelete(org)} title="Excluir" variant="outline">
              {disabled ? <HiOutlineLockClosed size={16} /> : <HiOutlineTrash size={16} />}
            </IconButton>
          </S.Actions>
        </S.OrgCard>
      ))}
    </S.List>
  );
}
