"use client";

import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTag,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { Skeleton } from "@/components/atoms/Skeleton";
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
  if (status === "loading") {
    return (
      <S.TableWrapper>
        <Skeleton variant="rect" height="240px" />
      </S.TableWrapper>
    );
  }

  if (status === "error") {
    return <S.ErrorText>Erro ao carregar transações: {error}</S.ErrorText>;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={<HiOutlinePlusCircle />}
        title="Nenhuma transação"
        description="Crie sua primeira transação usando o formulário acima."
      />
    );
  }

  return (
    <>
      <S.TableWrapper>
        <S.Table>
          <thead>
            <tr>
              <S.Th>Data</S.Th>
              <S.Th>Descrição</S.Th>
              <S.Th>Categoria</S.Th>
              <S.Th>Tags</S.Th>
              <S.Th>Tipo</S.Th>
              <S.Th>Valor</S.Th>
              <S.Th></S.Th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <S.Td>{formatDate(tx.date)}</S.Td>
                <S.Td>{tx.description}</S.Td>
                <S.Td>{tx.category?.name ?? "-"}</S.Td>
                <S.Td>
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
                <S.Td>
                  <S.TypeBadge $type={tx.type}>
                    {tx.type === "income" ? "Entrada" : "Saída"}
                  </S.TypeBadge>
                </S.Td>
                <S.TdMono>{formatCurrency(fromCents(tx.amount))}</S.TdMono>
                <S.Td>
                  <S.Actions>
                    <S.IconButton onClick={() => onManageTags(tx)} aria-label="Gerenciar tags">
                      <HiOutlineTag size={16} />
                    </S.IconButton>
                    <S.IconButton onClick={() => onEdit(tx)} aria-label="Editar">
                      <HiOutlinePencil size={16} />
                    </S.IconButton>
                    <S.IconButton onClick={() => onDelete(tx)} aria-label="Excluir">
                      <HiOutlineTrash size={16} />
                    </S.IconButton>
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
