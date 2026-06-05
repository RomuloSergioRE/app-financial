"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Select } from "@/components/molecules/Select";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Pagination } from "@/components/molecules/Pagination";
import { TransactionForm } from "@/components/molecules/TransactionForm";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategories";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents, toCents } from "@/lib/currency";
import type { Transaction } from "@/types";
import * as S from "./style";

export default function TransacoesPage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deletingTx, setDeletingTx] = useState<Transaction | null>(null);

  const transactionsState = useTransactions({
    page,
    categoryId: categoryFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    search: debouncedSearch || undefined,
  });
  const categoriesState = useCategories();
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();
  const updateMutation = useUpdateTransaction(editingTx?.id ?? "");

  const handleCreate = (data: { description: string; amount: number; type: "income" | "outcome"; date: string; categoryId: string }) => {
    createMutation.mutate(
      {
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        date: new Date(data.date).toISOString(),
        categoryId: data.categoryId,
      },
      {}
    );
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
  };

  const handleUpdate = (data: { description: string; amount: number; type: "income" | "outcome"; date: string; categoryId: string }) => {
    if (!editingTx) return;
    updateMutation.mutate(
      {
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        date: new Date(data.date).toISOString(),
        categoryId: data.categoryId,
      },
      { onSuccess: () => setEditingTx(null) }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingTx) return;
    deleteMutation.mutate(deletingTx.id, {
      onSuccess: () => setDeletingTx(null),
    });
  };

  if (transactionsState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Transações
        </Text>
        <Text color="danger">Erro ao carregar transações: {transactionsState.error}</Text>
      </S.Wrapper>
    );
  }

  const transactions = transactionsState.status === "success" ? transactionsState.data.data : [];
  const totalPages = transactionsState.status === "success" ? transactionsState.data.pagination.totalPages : 1;
  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Transações
      </Text>

      <TransactionForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Adicionar"
      />

      <S.FilterRow>
        <S.FormGroup>
          <S.Label>Pesquisar</S.Label>
          <S.SearchWrapper>
            <S.SearchIcon><HiOutlineMagnifyingGlass size={16} /></S.SearchIcon>
            <Input
              placeholder="Buscar por descrição..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ paddingLeft: "36px" }}
            />
          </S.SearchWrapper>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Filtrar por Categoria</S.Label>
          <Select
            value={categoryFilter}
            onChange={(v) => {
              setCategoryFilter(v);
              setPage(1);
            }}
            options={[
              { value: "", label: "Todas" },
              ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
            ]}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Data Início</S.Label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Data Fim</S.Label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          />
        </S.FormGroup>
      </S.FilterRow>

      {transactionsState.status === "loading" ? (
        <S.TableWrapper>
          <Skeleton variant="rect" height="240px" />
        </S.TableWrapper>
      ) : transactions.length === 0 ? (
        <EmptyState
          icon={<HiOutlinePlusCircle />}
          title="Nenhuma transação"
          description="Crie sua primeira transação usando o formulário acima."
        />
      ) : (
        <>
          <S.TableWrapper>
            <S.Table>
              <thead>
                <tr>
                  <S.Th>Data</S.Th>
                  <S.Th>Descrição</S.Th>
                  <S.Th>Categoria</S.Th>
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
                      <S.TypeBadge $type={tx.type}>
                        {tx.type === "income" ? "Entrada" : "Saída"}
                      </S.TypeBadge>
                    </S.Td>
                    <S.TdMono>
                      {formatCurrency(fromCents(tx.amount))}
                    </S.TdMono>
                    <S.Td>
                      <S.Actions>
                        <S.IconButton onClick={() => handleEdit(tx)} aria-label="Editar">
                          <HiOutlinePencil size={16} />
                        </S.IconButton>
                        <S.IconButton onClick={() => setDeletingTx(tx)} aria-label="Excluir">
                          <HiOutlineTrash size={16} />
                        </S.IconButton>
                      </S.Actions>
                    </S.Td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableWrapper>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      <Modal
        open={!!editingTx}
        onClose={() => setEditingTx(null)}
        title="Editar Transação"
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={editingTx ? {
            description: editingTx.description,
            amount: fromCents(editingTx.amount),
            type: editingTx.type,
            date: editingTx.date.split("T")[0],
            categoryId: editingTx.categoryId.toString(),
          } : undefined}
          onCancel={() => setEditingTx(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingTx}
        onClose={() => setDeletingTx(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Transação"
        message={`Tem certeza que deseja excluir a transação "${deletingTx?.description}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
