"use client";

import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { Select } from "@/components/molecules/Select";
import { OrganizationList } from "@/components/organisms/OrganizationList";
import { MemberManager } from "@/components/organisms/MemberManager";
import {
  useOrganizations,
  useCreateOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
  useSelectOrganization,
  useOrgMembers,
  useInviteMember,
  useAcceptInvite,
  useUpdateMemberRole,
  useRemoveMember,
  useFiscalReport,
} from "@/hooks/useOrganizations";
import type { Organization } from "@/types";
import * as S from "./style";

export default function OrganizationsPage() {
  const t = useTranslations("organizations");
  const ct = useTranslations("common");
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [deletingOrg, setDeletingOrg] = useState<Organization | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [editName, setEditName] = useState("");

  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [showFiscal, setShowFiscal] = useState(false);
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear());

  const orgsState = useOrganizations();
  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization(editingOrg?.id ?? "");
  const deleteMutation = useDeleteOrganization();
  const selectMutation = useSelectOrganization();

  const membersState = useOrgMembers(selectedOrgId ?? "");
  const inviteMutation = useInviteMember(selectedOrgId ?? "");
  const acceptMutation = useAcceptInvite(selectedOrgId ?? "");
  const updateRoleMutation = useUpdateMemberRole(selectedOrgId ?? "");
  const removeMemberMutation = useRemoveMember(selectedOrgId ?? "");

  const fiscalState = useFiscalReport(selectedOrgId ?? "", fiscalYear);

  const orgs = orgsState.status === "success" ? orgsState.data : [];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    createMutation.mutate(
      { name: createName.trim() },
      {
        onSuccess: () => {
          setCreateName("");
          setShowCreate(false);
        },
      },
    );
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrg || !editName.trim()) return;
    updateMutation.mutate(
      { name: editName.trim() },
      {
        onSuccess: () => setEditingOrg(null),
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingOrg) return;
    deleteMutation.mutate(deletingOrg.id, {
      onSuccess: () => setDeletingOrg(null),
    });
  };

  const handleInvite = (email: string, role: string) => {
    inviteMutation.mutate({ email, role });
  };

  const members = membersState.status === "success" ? membersState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <S.Section>
        <S.Row>
          <Text as="h2" size="lg" weight="semibold" fontFamily="display">
            {t("minhas")}
          </Text>
          <Button onClick={() => setShowCreate(true)}>
            <HiOutlinePlus size={16} /> {t("nova")}
          </Button>
        </S.Row>
      </S.Section>

      <OrganizationList
        organizations={orgs}
        status={orgsState.status}
        onSelect={(id) => selectMutation.mutate(id)}
        onManageMembers={(id) => setSelectedOrgId(id)}
        onFiscalReport={(id) => {
          setSelectedOrgId(id);
          setShowFiscal(true);
        }}
        onEdit={(org) => {
          setEditingOrg(org);
          setEditName(org.name);
        }}
        onDelete={setDeletingOrg}
      />

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title={t("criar")}>
        <S.Form onSubmit={handleCreate}>
          <S.Field>
            <S.Label>{t("nome")}</S.Label>
            <S.Input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder={t("nomePlaceholder")}
              autoFocus
            />
          </S.Field>
          <Button type="submit" loading={createMutation.isPending}>
            {ct("criar")}
          </Button>
        </S.Form>
      </Modal>

      <Modal open={!!editingOrg} onClose={() => setEditingOrg(null)} title={t("editar")}>
        <S.Form onSubmit={handleUpdate}>
          <S.Field>
            <S.Label>{t("nome")}</S.Label>
            <S.Input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
          </S.Field>
          <Button type="submit" loading={updateMutation.isPending}>
            {ct("salvar")}
          </Button>
        </S.Form>
      </Modal>

      <ConfirmDialog
        open={!!deletingOrg}
        onClose={() => setDeletingOrg(null)}
        onConfirm={handleDeleteConfirm}
        title={t("excluir")}
        message={t("confirmarExclusao")}
        confirmLabel={t("confirmar")}
        loading={deleteMutation.isPending}
      />

      <Modal
        open={!!selectedOrgId && !showFiscal}
        onClose={() => setSelectedOrgId(null)}
        title={t("membros")}
      >
        <MemberManager
          open
          members={members}
          status={membersState.status}
          inviteIsLoading={inviteMutation.isPending}
          acceptIsLoading={acceptMutation.isPending}
          onInvite={handleInvite}
          onAccept={() => acceptMutation.mutate()}
          onUpdateRole={(memberId, role) => updateRoleMutation.mutate({ memberId, role })}
          onRemove={(userId) => removeMemberMutation.mutate(userId)}
        />
      </Modal>

      <Modal
        open={showFiscal && !!selectedOrgId}
        onClose={() => setShowFiscal(false)}
        title={t("relatorioFiscal")}
      >
        <S.Field>
          <S.Label>{t("ano")}</S.Label>
          <Select
            value={String(fiscalYear)}
            onChange={(v) => setFiscalYear(Number(v))}
            options={[
              { value: String(new Date().getFullYear()), label: String(new Date().getFullYear()) },
              {
                value: String(new Date().getFullYear() - 1),
                label: String(new Date().getFullYear() - 1),
              },
            ]}
          />
        </S.Field>

        {fiscalState.status === "loading" ? (
          <Skeleton variant="rect" height="200px" />
        ) : fiscalState.status === "success" && fiscalState.data.length > 0 ? (
          <S.List style={{ marginTop: 16 }}>
            <S.MemberTable>
              <thead>
                <tr>
                  <S.Th>{t("mes")}</S.Th>
                  <S.Th>{t("categoria")}</S.Th>
                  <S.Th>{t("total")}</S.Th>
                </tr>
              </thead>
              <tbody>
                {fiscalState.data.map((item, i) => (
                  <tr key={i}>
                    <S.Td>{item.month}</S.Td>
                    <S.Td>{item.categoryName}</S.Td>
                    <S.Td>R$ {(item.total / 100).toLocaleString("pt-BR")}</S.Td>
                  </tr>
                ))}
              </tbody>
            </S.MemberTable>
          </S.List>
        ) : fiscalState.status === "success" ? (
          <Text color="textSecondary" size="sm">
            {t("nenhumDado")}
          </Text>
        ) : null}
      </Modal>
    </S.Wrapper>
  );
}
