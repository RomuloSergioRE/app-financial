"use client";

import { useState, useMemo } from "react";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { Pagination } from "@/components/molecules/Pagination";
import { Select } from "@/components/molecules/Select";
import { useAuditLogs, useAdminExportAuditLogsCsv } from "@/hooks/useAdmin";
import * as S from "./style";

export default function AdminAuditoriaPage() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");
  const [targetFilter, setTargetFilter] = useState("");

  const queryParams = useMemo(
    () => ({
      page,
      limit: 50,
      ...(actionFilter ? { action: actionFilter } : {}),
      ...(targetFilter ? { targetType: targetFilter } : {}),
    }),
    [page, actionFilter, targetFilter],
  );

  const auditQuery = useAuditLogs(queryParams);
  const exportCsv = useAdminExportAuditLogsCsv();

  const logs = auditQuery.data?.data ?? [];
  const pagination = auditQuery.data?.pagination;

  return (
    <S.Wrapper>
      <S.Row>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Auditoria
        </Text>
        <Button variant="outline" onClick={() => exportCsv.mutate()} loading={exportCsv.isPending}>
          <HiOutlineDocumentArrowDown size={16} /> Exportar CSV
        </Button>
      </S.Row>

      <S.Section>
        <S.FiltersRow>
          <Select
            value={actionFilter}
            onChange={(v) => {
              setActionFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: "Todas as ações" },
              { value: "create", label: "Criação" },
              { value: "update", label: "Atualização" },
              { value: "delete", label: "Exclusão" },
              { value: "status_change", label: "Mudança de status" },
              { value: "role_change", label: "Mudança de função" },
            ]}
          />
          <Select
            value={targetFilter}
            onChange={(v) => {
              setTargetFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: "Todos os alvos" },
              { value: "user", label: "Usuário" },
              { value: "category", label: "Categoria" },
              { value: "transaction", label: "Transação" },
              { value: "organization", label: "Organização" },
            ]}
          />
        </S.FiltersRow>
      </S.Section>

      {auditQuery.isPending ? (
        <S.List>
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
        </S.List>
      ) : logs.length === 0 ? (
        <S.Section>
          <Text color="textSecondary">Nenhum registro de auditoria encontrado.</Text>
        </S.Section>
      ) : (
        <S.Section>
          <S.Table>
            <thead>
              <tr>
                <S.Th>Data</S.Th>
                <S.Th>Admin</S.Th>
                <S.Th>Ação</S.Th>
                <S.Th>Alvo</S.Th>
                <S.Th>Tipo</S.Th>
                <S.Th>Detalhes</S.Th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <S.Td data-label="Data">{new Date(log.createdAt).toLocaleString("pt-BR")}</S.Td>
                  <S.Td data-label="Admin" style={{ fontFamily: "monospace", fontSize: 12 }}>
                    {log.adminId.slice(0, 8)}...
                  </S.Td>
                  <S.Td data-label="Ação">
                    <S.RoleBadge
                      $role={
                        log.action === "delete"
                          ? "admin"
                          : log.action === "create"
                            ? "company"
                            : "user"
                      }
                    >
                      {log.action}
                    </S.RoleBadge>
                  </S.Td>
                  <S.Td data-label="Alvo" style={{ fontFamily: "monospace", fontSize: 12 }}>
                    {log.targetId.slice(0, 8)}...
                  </S.Td>
                  <S.Td data-label="Tipo">{log.targetType}</S.Td>
                  <S.Td data-label="Detalhes">{log.details ?? "-"}</S.Td>
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
    </S.Wrapper>
  );
}
