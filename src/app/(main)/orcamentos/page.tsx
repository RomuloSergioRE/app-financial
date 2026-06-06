"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { Select } from "@/components/molecules/Select";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { BudgetForm } from "@/components/molecules/BudgetForm";
import { useCategories } from "@/hooks/useCategories";
import { useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from "@/hooks/useBudgets";
import { formatCurrency } from "@/lib/format";
import { fromCents, toCents } from "@/lib/currency";
import type { Budget } from "@/types";
import * as S from "./style";

const MONTHS = [
  { value: "", label: "Todos" },
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

export default function OrcamentosPage() {
  const currentYear = new Date().getFullYear();
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState(String(currentYear));
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deletingBudget, setDeletingBudget] = useState<Budget | null>(null);

  const budgetsState = useBudgets({
    month: monthFilter ? Number(monthFilter) : undefined,
    year: yearFilter ? Number(yearFilter) : undefined,
  });
  const categoriesState = useCategories();
  const createMutation = useCreateBudget();
  const deleteMutation = useDeleteBudget();
  const updateMutation = useUpdateBudget(editingBudget?.id ?? "");

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  const handleCreate = (data: {
    categoryId: string;
    month: number;
    year: number;
    limit: number;
  }) => {
    createMutation.mutate(
      {
        categoryId: data.categoryId,
        month: data.month,
        year: data.year,
        limit: toCents(data.limit),
      },
      {},
    );
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
  };

  const handleUpdate = (data: {
    categoryId: string;
    month: number;
    year: number;
    limit: number;
  }) => {
    if (!editingBudget) return;
    updateMutation.mutate(
      {
        categoryId: data.categoryId,
        month: data.month,
        year: data.year,
        limit: toCents(data.limit),
      },
      { onSuccess: () => setEditingBudget(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingBudget) return;
    deleteMutation.mutate(deletingBudget.id, {
      onSuccess: () => setDeletingBudget(null),
    });
  };

  if (budgetsState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Orçamentos
        </Text>
        <Text color="danger">Erro ao carregar orçamentos: {budgetsState.error}</Text>
      </S.Wrapper>
    );
  }

  const budgets = budgetsState.status === "success" ? budgetsState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Orçamentos
      </Text>

      <BudgetForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Criar"
      />

      <S.FilterRow>
        <S.FormGroup>
          <S.Label>Filtrar por Mês</S.Label>
          <Select value={monthFilter} onChange={(v) => setMonthFilter(v)} options={MONTHS} />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Filtrar por Ano</S.Label>
          <Select
            value={yearFilter}
            onChange={(v) => setYearFilter(v)}
            options={[
              { value: "", label: "Todos" },
              ...Array.from({ length: 5 }, (_, i) => ({
                value: String(currentYear - 1 + i),
                label: String(currentYear - 1 + i),
              })),
            ]}
          />
        </S.FormGroup>
      </S.FilterRow>

      {budgetsState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="80px" />
          <Skeleton variant="rect" height="80px" />
          <Skeleton variant="rect" height="80px" />
        </S.List>
      ) : budgets.length === 0 ? (
        <EmptyState
          icon={<HiOutlineCurrencyDollar />}
          title="Nenhum orçamento"
          description="Crie seu primeiro orçamento para controlar seus gastos por categoria."
        />
      ) : (
        <S.List>
          {budgets.map((budget) => (
            <S.BudgetCard key={budget.id} $overBudget={budget.overBudget}>
              <S.BudgetHeader>
                <S.BudgetInfo>
                  <Text as="span" size="sm" weight="bold">
                    {budget.categoryName ?? "Sem categoria"}
                  </Text>
                  <S.MonthYear>
                    {MONTHS[budget.month]?.label ?? budget.month} / {budget.year}
                  </S.MonthYear>
                </S.BudgetInfo>
                <S.Actions>
                  <IconButton onClick={() => handleEdit(budget)} aria-label="Editar">
                    <HiOutlinePencil size={16} />
                  </IconButton>
                  <IconButton onClick={() => setDeletingBudget(budget)} aria-label="Excluir">
                    <HiOutlineTrash size={16} />
                  </IconButton>
                </S.Actions>
              </S.BudgetHeader>

              <S.BudgetValues>
                <S.ValueItem>
                  <S.ValueLabel>Gasto</S.ValueLabel>
                  <S.ValueAmount $type="spent">
                    {formatCurrency(fromCents(budget.spent))}
                  </S.ValueAmount>
                </S.ValueItem>
                <S.ValueItem>
                  <S.ValueLabel>Limite</S.ValueLabel>
                  <S.ValueAmount>{formatCurrency(fromCents(budget.limit))}</S.ValueAmount>
                </S.ValueItem>
                {budget.overBudget && (
                  <S.ValueItem>
                    <S.ValueLabel>Excedente</S.ValueLabel>
                    <S.ValueAmount $type="over">
                      +{formatCurrency(fromCents(budget.spent - budget.limit))}
                    </S.ValueAmount>
                  </S.ValueItem>
                )}
              </S.BudgetValues>

              <S.ProgressBarWrapper>
                <S.ProgressBarFill
                  $percentage={Math.min(budget.percentage ?? 0, 100)}
                  $overBudget={budget.overBudget}
                />
              </S.ProgressBarWrapper>
              <S.PercentageLabel $overBudget={budget.overBudget}>
                {budget.percentage}% utilizado
              </S.PercentageLabel>
            </S.BudgetCard>
          ))}
        </S.List>
      )}

      <Modal open={!!editingBudget} onClose={() => setEditingBudget(null)} title="Editar Orçamento">
        <BudgetForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={
            editingBudget
              ? {
                  categoryId: editingBudget.categoryId,
                  month: editingBudget.month,
                  year: editingBudget.year,
                  limit: fromCents(editingBudget.limit),
                }
              : undefined
          }
          onCancel={() => setEditingBudget(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingBudget}
        onClose={() => setDeletingBudget(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Orçamento"
        message={`Tem certeza que deseja excluir o orçamento de "${editingBudget?.categoryName ?? deletingBudget?.categoryName ?? ""}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
