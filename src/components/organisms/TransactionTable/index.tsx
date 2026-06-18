"use client";

import { useTranslations } from "next-intl";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTag,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Pagination } from "@/components/molecules/Pagination";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents } from "@/lib/currency";
import type { Transaction } from "@/types";
import * as S from "./style";

interface TransactionTableProps {
  status: "loading" | "error" | "success";
  transactions: Transaction[];
  totalPages: number;
  page: number;
  error?: string;
  onPageChange: (page: number) => void;
  onEdit: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  onManageTags: (tx: Transaction) => void;
}

export function TransactionTable({
  status,
  transactions,
  totalPages,
  page,
  error,
  onPageChange,
  onEdit,
  onDelete,
  onManageTags,
}: TransactionTableProps) {
  const t = useTranslations("transactions");

  if (status === "loading") {
    return (
      <S.TableWrapper>
        <Skeleton variant="rect" height="240px" />
      </S.TableWrapper>
    );
  }

  if (status === "error") {
    return <S.ErrorText>{t("erroCarregar")} {error}</S.ErrorText>;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<HiOutlinePlusCircle />}
        title={t("nenhuma")}
        description={t("criePrimeira")}
      />
    );
  }

  return (
    <>
      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <S.Th>{t("data")}</S.Th>
              <S.Th>{t("descricao")}</S.Th>
              <S.Th>{t("categoria")}</S.Th>
              <S.Th>{t("tags")}</S.Th>
              <S.Th>{t("tipo")}</S.Th>
              <S.Th>{t("valor")}</S.Th>
              <S.Th></S.Th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <S.Td data-label={t("data")}>{formatDate(tx.date)}</S.Td>
                <S.Td data-label={t("descricao")}>{tx.description}</S.Td>
                <S.Td data-label={t("categoria")}>{tx.category?.name ?? "-"}</S.Td>
                <S.Td data-label={t("tags")}>
                  {tx.tags && tx.tags.length > 0 ? (
                    <S.TagList>
                      {tx.tags.map((tag) => (
                        <S.TagPill key={tag.id} $color={tag.color ?? undefined}>
                          {tag.name}
                        </S.TagPill>
                      ))}
                    </S.TagList>
                  ) : (
                    <S.TextMuted>—</S.TextMuted>
                  )}
                </S.Td>
                <S.Td data-label={t("tipo")}>
                  <S.TypeBadge $type={tx.type}>
                    {tx.type === "income" ? t("entrada") : t("saida")}
                  </S.TypeBadge>
                </S.Td>
                <S.TdMono data-label={t("valor")}>{formatCurrency(fromCents(tx.amount))}</S.TdMono>
                <S.Td data-label="">
                  <S.Actions>
                    <IconButton onClick={() => onManageTags(tx)} aria-label={t("tags")}>
                      <HiOutlineTag size={16} />
                    </IconButton>
                    <IconButton onClick={() => onEdit(tx)} aria-label={t("editar")}>
                      <HiOutlinePencil size={16} />
                    </IconButton>
                    <IconButton onClick={() => onDelete(tx)} aria-label={t("excluir")}>
                      <HiOutlineTrash size={16} />
                    </IconButton>
                  </S.Actions>
                </S.Td>
              </tr>
            ))}
          </tbody>
        </S.Table>
      </S.TableWrapper>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}
