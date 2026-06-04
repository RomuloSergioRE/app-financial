"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@/hooks/useDebounce";
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlusCircle, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Pagination } from "@/components/molecules/Pagination";
import { useCategories } from "@/hooks/useCategories";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";
import { createTransactionSchema } from "@/schemas/transaction.schema";
import type { CreateTransactionDTO } from "@/schemas/transaction.schema";
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

  const transactionsState = useTransactions(page, 10, categoryFilter || undefined, startDate || undefined, endDate || undefined, debouncedSearch || undefined);
  const categoriesState = useCategories();
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();
  const updateMutation = useUpdateTransaction(editingTx?.id ?? "");

  const createForm = useForm<CreateTransactionDTO>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "outcome",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
    },
  });

  const editForm = useForm<CreateTransactionDTO>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "outcome",
      date: new Date().toISOString().split("T")[0],
      categoryId: "",
    },
  });

  useEffect(() => {
    if (editingTx) {
      editForm.reset({
        description: editingTx.description,
        amount: editingTx.amount / 100,
        type: editingTx.type,
        date: editingTx.date.split("T")[0],
        categoryId: editingTx.categoryId.toString(),
      });
    }
  }, [editingTx, editForm]);

  const handleCreate = (data: CreateTransactionDTO) => {
    createMutation.mutate(
      {
        description: data.description,
        amount: Math.round(data.amount * 100),
        type: data.type,
        date: new Date(data.date).toISOString(),
        categoryId: data.categoryId,
      },
      {
        onSuccess: () => {
          createForm.reset({
            description: "",
            amount: 0,
            type: "outcome",
            date: new Date().toISOString().split("T")[0],
            categoryId: "",
          });
        },
      }
    );
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
  };

  const handleUpdate = (data: CreateTransactionDTO) => {
    if (!editingTx) return;
    updateMutation.mutate(
      {
        description: data.description,
        amount: Math.round(data.amount * 100),
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

      <form onSubmit={createForm.handleSubmit(handleCreate)}>
        <S.Form>
          <S.FormGroup>
            <S.Label>Descrição</S.Label>
            <Input
              placeholder="Ex: Supermercado"
              error={createForm.formState.errors.description?.message}
              {...createForm.register("description")}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Valor (R$)</S.Label>
            <Input
              type="number"
              step="0.01"
              placeholder="0,00"
              error={createForm.formState.errors.amount?.message}
              {...createForm.register("amount", { valueAsNumber: true })}
            />
          </S.FormGroup>
          <S.FormRow>
            <S.FormGroup>
              <S.Label>Tipo</S.Label>
              <Select
                value={createForm.watch("type")}
                onChange={(v) => createForm.setValue("type", v as "income" | "outcome")}
                options={[
                  { value: "outcome", label: "Saída" },
                  { value: "income", label: "Entrada" },
                ]}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Categoria</S.Label>
              <Select
                value={createForm.watch("categoryId")}
                onChange={(v) => createForm.setValue("categoryId", v)}
                options={[
                  { value: "", label: "Selecione" },
                  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                ]}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Data</S.Label>
              <Input
                type="date"
                error={createForm.formState.errors.date?.message}
                {...createForm.register("date")}
              />
            </S.FormGroup>
          </S.FormRow>
          <Button
            type="submit"
            loading={createMutation.isPending}
            disabled={!createForm.formState.isValid}
          >
            Adicionar
          </Button>
        </S.Form>
      </form>

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
                    <S.Td>{new Date(tx.date).toLocaleDateString("pt-BR")}</S.Td>
                    <S.Td>{tx.description}</S.Td>
                    <S.Td>{tx.category?.name ?? "-"}</S.Td>
                    <S.Td>
                      <S.TypeBadge $type={tx.type}>
                        {tx.type === "income" ? "Entrada" : "Saída"}
                      </S.TypeBadge>
                    </S.Td>
                    <S.TdMono>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(tx.amount / 100)}
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
        <form onSubmit={editForm.handleSubmit(handleUpdate)}>
          <S.ModalForm>
            <S.FormGroup>
              <S.Label>Descrição</S.Label>
              <Input
                error={editForm.formState.errors.description?.message}
                {...editForm.register("description")}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Valor (R$)</S.Label>
              <Input
                type="number"
                step="0.01"
                error={editForm.formState.errors.amount?.message}
                {...editForm.register("amount", { valueAsNumber: true })}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Tipo</S.Label>
              <Select
                value={editForm.watch("type")}
                onChange={(v) => editForm.setValue("type", v as "income" | "outcome")}
                options={[
                  { value: "outcome", label: "Saída" },
                  { value: "income", label: "Entrada" },
                ]}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Categoria</S.Label>
              <Select
                value={editForm.watch("categoryId")}
                onChange={(v) => editForm.setValue("categoryId", v)}
                options={[
                  { value: "", label: "Selecione" },
                  ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
                ]}
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>Data</S.Label>
              <Input
                type="date"
                error={editForm.formState.errors.date?.message}
                {...editForm.register("date")}
              />
            </S.FormGroup>
            <S.ModalActions>
              <Button variant="outline" onClick={() => setEditingTx(null)} type="button">
                Cancelar
              </Button>
              <Button type="submit" loading={updateMutation.isPending}>
                Salvar
              </Button>
            </S.ModalActions>
          </S.ModalForm>
        </form>
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
