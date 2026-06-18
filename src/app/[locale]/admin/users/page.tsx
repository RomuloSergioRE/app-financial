"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  HiOutlineTrash,
  HiOutlineDocumentArrowDown,
  HiOutlineEye,
} from "react-icons/hi2";
import { fromCents } from "@/lib/currency";
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

export default function AdminUsersPage() {
  const t = useTranslations("admin.users");
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
          {t("titulo")}
        </Text>
        <Button variant="outline" onClick={() => exportCsv.mutate()} loading={exportCsv.isPending}>
          <HiOutlineDocumentArrowDown size={16} /> {t("exportCSV")}
        </Button>
      </S.Row>

      <S.Section>
        <S.FiltersRow>
          <S.Input
            placeholder={t("buscar")}
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
              { value: "", label: t("todasFuncoes") },
              { value: "user", label: t("usuario") },
              { value: "admin", label: t("admin") },
              { value: "company", label: t("empresa") },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: t("todosStatus") },
              { value: "active", label: t("ativo") },
              { value: "inactive", label: t("inativo") },
              { value: "suspended", label: t("suspenso") },
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
          <Text color="textSecondary">{t("nenhum")}</Text>
        </S.Section>
      ) : (
        <S.Section>
          <S.Table>
            <thead>
              <tr>
                <S.Th>{t("nome")}</S.Th>
                <S.Th>{t("email")}</S.Th>
                <S.Th>{t("funcao")}</S.Th>
                <S.Th>{t("status")}</S.Th>
                <S.Th>{t("criadoEm")}</S.Th>
                <S.Th>{t("acoes")}</S.Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <S.Td data-label={t("nome")}>{u.name}</S.Td>
                  <S.Td data-label={t("email")}>{u.email}</S.Td>
                  <S.Td data-label={t("funcao")}>
                    <Select
                      value={u.role}
                      onChange={(v) =>
                        roleMutation.mutate({
                          userId: u.id,
                          role: v as "admin" | "user" | "company",
                        })
                      }
                      options={[
                        { value: "user", label: t("usuario") },
                        { value: "admin", label: t("admin") },
                        { value: "company", label: t("empresa") },
                      ]}
                    />
                  </S.Td>
                  <S.Td data-label={t("status")}>
                    <Select
                      value={u.status}
                      onChange={(v) =>
                        statusMutation.mutate({
                          userId: u.id,
                          status: v as "active" | "inactive" | "suspended",
                        })
                      }
                      options={[
                        { value: "active", label: t("ativo") },
                        { value: "inactive", label: t("inativo") },
                        { value: "suspended", label: t("suspenso") },
                      ]}
                    />
                  </S.Td>
                  <S.Td data-label={t("criadoEm")}>{new Date(u.createdAt).toLocaleDateString("pt-BR")}</S.Td>
                  <S.Td data-label={t("acoes")}>
                    <IconButton onClick={() => setSelectedUserId(u.id)} title={t("detalhes")} variant="ghost">
                      <HiOutlineEye size={16} />
                    </IconButton>
                    <IconButton onClick={() => setDeletingUserId(u.id)} title={t("excluir")} variant="ghost">
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
        title={t("detalhesTitulo")}
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
                <S.StatLabel>{t("transacoes")}</S.StatLabel>
                <S.StatValue>{userDetailsState.data.totalTransactions}</S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>{t("receitas")}</S.StatLabel>
                <S.StatValue $positive>
                  R$ {fromCents(userDetailsState.data.totalIncome).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>{t("despesas")}</S.StatLabel>
                <S.StatValue>
                  R$ {fromCents(userDetailsState.data.totalOutcome).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
              <S.StatCard>
                <S.StatLabel>{t("saldo")}</S.StatLabel>
                <S.StatValue $positive={userDetailsState.data.netBalance >= 0}>
                  R$ {fromCents(userDetailsState.data.netBalance).toLocaleString("pt-BR")}
                </S.StatValue>
              </S.StatCard>
            </S.Row>
          </div>
        ) : (
          <Text color="danger">{t("erroDetalhes")}</Text>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deletingUserId}
        onClose={() => setDeletingUserId(null)}
        onConfirm={handleDeleteConfirm}
        title={t("excluirTitulo")}
        message={t("confirmarExclusao")}
        confirmLabel={t("excluir")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
