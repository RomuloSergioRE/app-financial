"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { Pagination } from "@/components/molecules/Pagination";
import { Select } from "@/components/molecules/Select";
import { useAuditLogs, useAdminExportAuditLogsCsv } from "@/hooks/useAdmin";
import * as S from "./style";

export default function AdminAuditPage() {
  const t = useTranslations("admin.audit");
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
          {t("titulo")}
        </Text>
        <Button variant="outline" onClick={() => exportCsv.mutate()} loading={exportCsv.isPending}>
          <HiOutlineDocumentArrowDown size={16} /> {t("exportCSV")}
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
              { value: "", label: t("todasAcoes") },
              { value: "create", label: t("criacao") },
              { value: "update", label: t("atualizacao") },
              { value: "delete", label: t("exclusao") },
              { value: "status_change", label: t("mudancaStatus") },
              { value: "role_change", label: t("mudancaFuncao") },
            ]}
          />
          <Select
            value={targetFilter}
            onChange={(v) => {
              setTargetFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: t("todosAlvos") },
              { value: "user", label: t("usuario") },
              { value: "category", label: t("categoria") },
              { value: "transaction", label: t("transacao") },
              { value: "organization", label: t("organizacao") },
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
          <Text color="textSecondary">{t("nenhum")}</Text>
        </S.Section>
      ) : (
        <S.Section>
          <S.Table>
            <thead>
              <tr>
                <S.Th>{t("data")}</S.Th>
                <S.Th>{t("admin")}</S.Th>
                <S.Th>{t("acao")}</S.Th>
                <S.Th>{t("alvo")}</S.Th>
                <S.Th>{t("tipo")}</S.Th>
                <S.Th>{t("detalhes")}</S.Th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <S.Td data-label={t("data")}>{new Date(log.createdAt).toLocaleString("pt-BR")}</S.Td>
                  <S.Td data-label={t("admin")} style={{ fontFamily: "monospace", fontSize: 12 }}>
                    {log.adminId.slice(0, 8)}...
                  </S.Td>
                  <S.Td data-label={t("acao")}>
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
                  <S.Td data-label={t("alvo")} style={{ fontFamily: "monospace", fontSize: 12 }}>
                    {log.targetId.slice(0, 8)}...
                  </S.Td>
                  <S.Td data-label={t("tipo")}>{log.targetType}</S.Td>
                  <S.Td data-label={t("detalhes")}>{log.details ?? "-"}</S.Td>
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
