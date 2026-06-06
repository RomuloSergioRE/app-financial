"use client";

import { useState, useMemo } from "react";
import {
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
  HiOutlineDocumentArrowDown,
  HiOutlineEye,
} from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { Pagination } from "@/components/molecules/Pagination";
import { Select } from "@/components/molecules/Select";
import {
  useAdminUsers,
  useAdminUserDetails,
  useUpdateUserStatus,
  useUpdateUserRole,
  useDeleteUser,
  useAdminExportUsersCsv,
} from "@/hooks/useAdmin";
import * as S from "./style";

export default function AdminUsuariosPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit: 20,
      ...(roleFilter ? { role: roleFilter } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(search ? { search } : {}),
    }),
    [page, roleFilter, statusFilter, search],
  );

  const usersQuery = useAdminUsers(queryParams);
  const userDetailsState = useAdminUserDetails(selectedUserId ?? "");
  const statusMutation = useUpdateUserStatus();
  const roleMutation = useUpdateUserRole();
  const deleteMutation = useDeleteUser();
  const exportCsv = useAdminExportUsersCsv();

  const users = usersQuery.data?.data ?? [];
  const pagination = usersQuery.data?.pagination;

  const handleDeleteConfirm = () => {
    if (!deletingUserId) return;
    deleteMutation.mutate(deletingUserId, {
      onSuccess: () => setDeletingUserId(null),
    });
  };

  return (
    <S.Wrapper>
      <S.Row>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Usuários
        </Text>
        <Button variant="outline" onClick={() => exportCsv.mutate()} loading={exportCsv.isPending}>
          <HiOutlineDocumentArrowDown size={16} /> Exportar CSV
        </Button>
      </S.Row>

      <S.Section>
        <S.FiltersRow>
          <S.Input
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select
            value={roleFilter}
            onChange={(v) => {
              setRoleFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: "Todas as funções" },
              { value: "user", label: "Usuário" },
              { value: "admin", label: "Admin" },
              { value: "company", label: "Empresa" },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: "Todos os status" },
              { value: "active", label: "Ativo" },
              { value: "inactive", label: "Inativo" },
              { value: "suspended", label: "Suspenso" },
            ]}
          />
        </S.FiltersRow>
      </S.Section>

      {usersQuery.isPending ? (
        <S.List>
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
        </S.List>
      ) : users.length === 0 ? (
        <S.Section>
          <Text color="textSecondary">Nenhum usuário encontrado.</Text>
        </S.Section>
      ) : (
        <S.Section>
          <S.Table>
            <thead>
              <tr>
                <S.Th>Nome</S.Th>
                <S.Th>Email</S.Th>
                <S.Th>Função</S.Th>
                <S.Th>Status</S.Th>
                <S.Th>Criado em</S.Th>
                <S.Th>Ações</S.Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <S.Td>{u.name}</S.Td>
                  <S.Td>{u.email}</S.Td>
                  <S.Td>
                    <Select
                      value={u.role}
                      onChange={(v) =>
                        roleMutation.mutate({
                          userId: u.id,
                          role: v as "admin" | "user" | "company",
                        })
                      }
                      options={[
                        { value: "user", label: "Usuário" },
                        { value: "admin", label: "Admin" },
                        { value: "company", label: "Empresa" },
                      ]}
                    />
                  </S.Td>
                  <S.Td>
                    <Select
                      value={u.status}
                      onChange={(v) =>
                        statusMutation.mutate({
                          userId: u.id,
                          status: v as "active" | "inactive" | "suspended",
                        })
                      }
                      options={[
                        { value: "active", label: "Ativo" },
                        { value: "inactive", label: "Inativo" },
                        { value: "suspended", label: "Suspenso" },
                      ]}
                    />
                  </S.Td>
                  <S.Td>{new Date(u.createdAt).toLocaleDateString("pt-BR")}</S.Td>
                  <S.Td>
                    <IconButton onClick={() => setSelectedUserId(u.id)} title="Detalhes" variant="ghost">
                      <HiOutlineEye size={16} />
                    </IconButton>
                    <IconButton onClick={() => setDeletingUserId(u.id)} title="Excluir" variant="ghost">
                      <HiOutlineTrash size={16} />
                    </IconButton>
                  </S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>
          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </S.Section>
      )}

      <Modal
        open={!!selectedUserId}
        onClose={() => setSelectedUserId(null)}
        title="Detalhes do Usuário"
      >
        {userDetailsState.status === "loading" ? (
          <Skeleton variant="rect" height="200px" />
        ) : userDetailsState.status === "success" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Text size="md" weight="semibold">
              {userDetailsState.data.user.name}
            </Text>
            <Text size="sm" color="textSecondary">
              {userDetailsState.data.user.email}
            </Text>
            <S.Row>
              <S.StatCard>
                <S.StatLabel>Transações</S.StatLabel>
                <S.StatValue>{userDetailsState.data.totalTransactions}</S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>Receitas</S.StatLabel>
                <S.StatValue $positive>
                  R$ {(userDetailsState.data.totalIncome / 100).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>Despesas</S.StatLabel>
                <S.StatValue>
                  R$ {(userDetailsState.data.totalOutcome / 100).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>Saldo</S.StatLabel>
                <S.StatValue $positive={userDetailsState.data.netBalance >= 0}>
                  R$ {(userDetailsState.data.netBalance / 100).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
            </S.Row>
          </div>
        ) : (
          <Text color="danger">Erro ao carregar detalhes.</Text>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deletingUserId}
        onClose={() => setDeletingUserId(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Usuário"
        message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
