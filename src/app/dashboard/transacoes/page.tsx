"use client";

import { useState } from "react";
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
import { useCategories } from "@/hooks/useCategories";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/useTransactions";
import type { Transaction } from "@/types";
import * as S from "./style";

export default function TransacoesPage() {
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "outcome">("outcome");
  const [categoryId, setCategoryId] = useState("");
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState<"income" | "outcome">("outcome");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [deletingTx, setDeletingTx] = useState<Transaction | null>(null);

  const { data, isLoading } = useTransactions(page, 10, categoryFilter || undefined, startDate || undefined, endDate || undefined, debouncedSearch || undefined);
  const { data: categoriesData } = useCategories();
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();
  const updateMutation = useUpdateTransaction(editingTx?.id ?? "");

  const handleCreate = () => {
    const parsedAmount = parseFloat(amount);
    if (!description.trim() || !amount || !categoryId || isNaN(parsedAmount) || parsedAmount <= 0) return;
    createMutation.mutate(
      {
        description: description.trim(),
        amount: Math.round(parsedAmount * 100),
        type,
        date: new Date().toISOString(),
        categoryId,
      },
      {
        onSuccess: () => {
          setDescription("");
          setAmount("");
          setCategoryId("");
        },
      }
    );
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setEditDescription(tx.description);
    setEditAmount((tx.amount / 100).toString());
    setEditType(tx.type);
    setEditCategoryId(tx.categoryId.toString());
  };

  const handleUpdate = () => {
    if (!editDescription.trim() || !editAmount || !editingTx) return;
    updateMutation.mutate(
      {
        description: editDescription.trim(),
        amount: Math.round(parseFloat(editAmount) * 100),
        type: editType,
        categoryId: editCategoryId,
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

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.pagination?.totalPages ?? 1;
  const categories = categoriesData?.data?.data ?? [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Transações
      </Text>

      <S.Form>
        <S.FormGroup>
          <S.Label>Descrição</S.Label>
          <Input
            placeholder="Ex: Supermercado"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Valor</S.Label>
          <Input
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || parseFloat(val) >= 0) setAmount(val);
            }}
          />
        </S.FormGroup>
        <S.FormRow>
          <S.FormGroup>
            <S.Label>Tipo</S.Label>
            <Select
              value={type}
              onChange={(v) => setType(v as "income" | "outcome")}
              options={[
                { value: "outcome", label: "Saída" },
                { value: "income", label: "Entrada" },
              ]}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Categoria</S.Label>
            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={[
                { value: "", label: "Selecione" },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </S.FormGroup>
        </S.FormRow>
        <Button
          onClick={handleCreate}
          loading={createMutation.isPending}
          disabled={!description.trim() || !amount || !categoryId}
        >
          Adicionar
        </Button>
      </S.Form>

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

      {isLoading ? (
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

          {totalPages > 1 && (
            <S.Pagination>
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Anterior
              </Button>
              {(() => {
                const pages: (number | "...")[] = [];
                const range = 2;
                const start = Math.max(2, page - range);
                const end = Math.min(totalPages - 1, page + range);

                pages.push(1);
                if (start > 2) pages.push("...");
                for (let i = start; i <= end; i++) pages.push(i);
                if (end < totalPages - 1) pages.push("...");
                if (totalPages > 1) pages.push(totalPages);

                return pages.map((p, i) =>
                  p === "..." ? (
                    <S.PageDots key={`dots-${i}`}>...</S.PageDots>
                  ) : (
                    <S.PageButton
                      key={p}
                      $active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </S.PageButton>
                  )
                );
              })()}
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Próximo
              </Button>
            </S.Pagination>
          )}
        </>
      )}

      <Modal
        open={!!editingTx}
        onClose={() => setEditingTx(null)}
        title="Editar Transação"
      >
        <S.ModalForm>
          <S.FormGroup>
            <S.Label>Descrição</S.Label>
            <Input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Valor</S.Label>
            <Input
              type="number"
              step="0.01"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Tipo</S.Label>
            <Select
              value={editType}
              onChange={(v) => setEditType(v as "income" | "outcome")}
              options={[
                { value: "outcome", label: "Saída" },
                { value: "income", label: "Entrada" },
              ]}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Categoria</S.Label>
            <Select
              value={editCategoryId}
              onChange={setEditCategoryId}
              options={[
                { value: "", label: "Selecione" },
                ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
              ]}
            />
          </S.FormGroup>
          <S.ModalActions>
            <Button variant="outline" onClick={() => setEditingTx(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} loading={updateMutation.isPending}>
              Salvar
            </Button>
          </S.ModalActions>
        </S.ModalForm>
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
