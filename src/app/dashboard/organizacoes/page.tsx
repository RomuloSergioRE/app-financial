"use client";

import { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineBuildingOffice2,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Select } from "@/components/molecules/Select";
import {
  useOrganizations,
  useCreateOrganization,
  useUpdateOrganization,
  useDeleteOrganization,
  useSelectOrganization,
  useSelectNoneOrganization,
  useOrgMembers,
  useInviteMember,
  useAcceptInvite,
  useUpdateMemberRole,
  useRemoveMember,
  useFiscalReport,
} from "@/hooks/useOrganizations";
import type { Organization } from "@/types";
import * as S from "./style";

export default function OrganizacoesPage() {
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [deletingOrg, setDeletingOrg] = useState<Organization | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createName, setCreateName] = useState("");
  const [editName, setEditName] = useState("");

  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("viewer");

  const [showFiscal, setShowFiscal] = useState(false);
  const [fiscalYear, setFiscalYear] = useState(new Date().getFullYear());

  const orgsState = useOrganizations();
  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization(editingOrg?.id ?? "");
  const deleteMutation = useDeleteOrganization();
  const selectMutation = useSelectOrganization();
  const selectNoneMutation = useSelectNoneOrganization();

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
    createMutation.mutate({ name: createName.trim() }, {
      onSuccess: () => {
        setCreateName("");
        setShowCreate(false);
      },
    });
  };

  const handleEdit = (org: Organization) => {
    setEditingOrg(org);
    setEditName(org.name);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrg || !editName.trim()) return;
    updateMutation.mutate({ name: editName.trim() }, {
      onSuccess: () => setEditingOrg(null),
    });
  };

  const handleDeleteConfirm = () => {
    if (!deletingOrg) return;
    deleteMutation.mutate(deletingOrg.id, {
      onSuccess: () => setDeletingOrg(null),
    });
  };

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Organizações
      </Text>

      <S.Section>
        <S.Row>
          <Text as="h2" size="lg" weight="semibold" fontFamily="display">
            Minhas Organizações
          </Text>
          <Button onClick={() => setShowCreate(true)}>
            <HiOutlinePlus size={16} /> Nova
          </Button>
        </S.Row>
      </S.Section>

      {orgsState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="64px" />
          <Skeleton variant="rect" height="64px" />
        </S.List>
      ) : orgs.length === 0 ? (
        <EmptyState
          icon={<HiOutlineBuildingOffice2 />}
          title="Nenhuma organização"
          description="Crie ou participe de uma organização para gerenciar finanças em equipe."
        />
      ) : (
        <S.List>
          {orgs.map((org) => (
            <S.OrgCard key={org.id}>
              <S.OrgInfo>
                <S.OrgName>{org.name}</S.OrgName>
                <S.OrgMeta>{org.memberCount} membro(s) · {org.role}</S.OrgMeta>
              </S.OrgInfo>
              <S.Actions>
                <S.IconButton
                  onClick={() => selectMutation.mutate(org.id)}
                  title="Selecionar organização"
                >
                  <HiOutlineCheck size={16} />
                </S.IconButton>
                <S.IconButton
                  onClick={() => { setSelectedOrgId(org.id); }}
                  title="Membros"
                >
                  <HiOutlineUserGroup size={16} />
                </S.IconButton>
                <S.IconButton
                  onClick={() => { setSelectedOrgId(org.id); setShowFiscal(true); }}
                  title="Relatório fiscal"
                >
                  <HiOutlineDocumentText size={16} />
                </S.IconButton>
                <S.IconButton onClick={() => handleEdit(org)} title="Editar">
                  <HiOutlinePencil size={16} />
                </S.IconButton>
                <S.IconButton onClick={() => setDeletingOrg(org)} title="Excluir">
                  <HiOutlineTrash size={16} />
                </S.IconButton>
              </S.Actions>
            </S.OrgCard>
          ))}
        </S.List>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Criar Organização">
        <S.Form onSubmit={handleCreate}>
          <S.Field>
            <S.Label>Nome</S.Label>
            <S.Input
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              placeholder="Nome da organização"
              autoFocus
            />
          </S.Field>
          <Button type="submit" loading={createMutation.isPending}>
            Criar
          </Button>
        </S.Form>
      </Modal>

      <Modal open={!!editingOrg} onClose={() => setEditingOrg(null)} title="Editar Organização">
        <S.Form onSubmit={handleUpdate}>
          <S.Field>
            <S.Label>Nome</S.Label>
            <S.Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
          </S.Field>
          <Button type="submit" loading={updateMutation.isPending}>
            Salvar
          </Button>
        </S.Form>
      </Modal>

      <ConfirmDialog
        open={!!deletingOrg}
        onClose={() => setDeletingOrg(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Organização"
        message={`Tem certeza que deseja excluir "${deletingOrg?.name}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />

      <Modal
        open={!!selectedOrgId && !showFiscal}
        onClose={() => { setSelectedOrgId(null); setInviteEmail(""); }}
        title="Membros"
      >
        <S.Form onSubmit={(e) => { e.preventDefault(); inviteMutation.mutate({ email: inviteEmail, role: inviteRole }, { onSuccess: () => setInviteEmail("") }); }}>
          <Text as="h3" size="sm" weight="semibold">Convidar Membro</Text>
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
            <Select
              value={inviteRole}
              onChange={(v) => setInviteRole(v)}
              options={[
                { value: "viewer", label: "Visualizador" },
                { value: "finance", label: "Financeiro" },
                { value: "admin", label: "Admin" },
              ]}
            />
          </S.Field>
          <Button type="submit" loading={inviteMutation.isPending}>Convidar</Button>
        </S.Form>

        {membersState.status === "loading" ? (
          <Skeleton variant="rect" height="100px" />
        ) : membersState.status === "success" ? (
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
                {membersState.data.map((m) => (
                  <tr key={m.id}>
                    <S.Td>{m.name}</S.Td>
                    <S.Td>{m.email}</S.Td>
                    <S.Td>
                      <Select
                        value={m.role}
                        onChange={(v) => updateRoleMutation.mutate({ memberId: m.id, role: v })}
                        options={[
                          { value: "viewer", label: "Visualizador" },
                          { value: "finance", label: "Financeiro" },
                          { value: "admin", label: "Admin" },
                        ]}
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
                          onClick={() => acceptMutation.mutate()}
                          loading={acceptMutation.isPending}
                        >
                          Aceitar
                        </Button>
                      )}
                      <S.IconButton
                        onClick={() => removeMemberMutation.mutate(m.userId)}
                        title="Remover"
                      >
                        <HiOutlineXMark size={16} />
                      </S.IconButton>
                    </S.Td>
                  </tr>
                ))}
              </tbody>
            </S.MemberTable>
          </S.List>
        ) : null}
      </Modal>

      <Modal open={showFiscal && !!selectedOrgId} onClose={() => setShowFiscal(false)} title="Relatório Fiscal">
        <S.Field>
          <S.Label>Ano</S.Label>
          <Select
            value={String(fiscalYear)}
            onChange={(v) => setFiscalYear(Number(v))}
            options={[
              { value: String(new Date().getFullYear()), label: String(new Date().getFullYear()) },
              { value: String(new Date().getFullYear() - 1), label: String(new Date().getFullYear() - 1) },
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
                  <S.Th>Mês</S.Th>
                  <S.Th>Categoria</S.Th>
                  <S.Th>Total</S.Th>
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
          <Text color="textSecondary" size="sm">Nenhum dado para o ano selecionado.</Text>
        ) : null}
      </Modal>
    </S.Wrapper>
  );
}
