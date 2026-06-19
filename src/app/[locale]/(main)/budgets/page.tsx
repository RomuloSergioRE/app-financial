"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineCurrencyDollar } from "react-icons/hi2";
import { useTranslations, useLocale } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { Can } from "@/components/atoms/Can";
import { Select } from "@/components/molecules/Select";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { UpgradeBanner } from "@/components/molecules/UpgradeBanner";
import { BudgetForm } from "@/components/molecules/BudgetForm";
import { useCategories } from "@/hooks/useCategories";
import { useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from "@/hooks/useBudgets";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/format";
import { fromCents, toCents } from "@/lib/currency";
import type { Budget } from "@/types";
import * as S from "./style";

export default function BudgetsPage() {
  const t = useTranslations("budgets");
  const locale = useLocale();
  const { currency } = useAuth();
  const currentYear = new Date().getFullYear();
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState(String(currentYear));
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [deletingBudget, setDeletingBudget] = useState<Budget | null>(null);

  const months = t.raw("meses") as string[];

  const MONTHS = [
    { value: "", label: t("todos") },
    ...months.map((name, i) => ({ value: String(i + 1), label: name })),
  ];

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
      { categoryId: data.categoryId, month: data.month, year: data.year, limit: toCents(data.limit) },
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
      { categoryId: data.categoryId, month: data.month, year: data.year, limit: toCents(data.limit) },
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
          {t("titulo")}
        </Text>
        <Text color="danger">{t("erroCarregar")} {budgetsState.error}</Text>
      </S.Wrapper>
    );
  }

  const budgets = budgetsState.status === "success" ? budgetsState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <Can feature="budgets" fallback={<UpgradeBanner />}>
        <BudgetForm
          categories={categories}
          onSubmit={handleCreate}
          isLoading={createMutation.isPending}
          submitLabel={t("criar")}
        />
      </Can>

      <S.FilterRow>
        <S.FormGroup>
          <S.Label>{t("filtrarMes")}</S.Label>
          <Select value={monthFilter} onChange={(v) => setMonthFilter(v)} options={MONTHS} />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>{t("filtrarAno")}</S.Label>
          <Select
            value={yearFilter}
            onChange={(v) => setYearFilter(v)}
            options={[
              { value: "", label: t("todos") },
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
          title={t("nenhum")}
          description={t("criePrimeiro")}
        />
      ) : (
        <S.List>
          {budgets.map((budget) => (
            <S.BudgetCard key={budget.id} $overBudget={budget.overBudget}>
              <S.BudgetHeader>
                <S.BudgetInfo>
                  <Text as="span" size="sm" weight="bold">
                    {budget.categoryName ?? t("semCategoria")}
                  </Text>
                  <S.MonthYear>
                    {months[budget.month - 1] ?? budget.month} / {budget.year}
                  </S.MonthYear>
                </S.BudgetInfo>
                <S.Actions>
                  <Can feature="budgets">
                    <IconButton onClick={() => handleEdit(budget)} aria-label={t("editar")}>
                      <HiOutlinePencil size={16} />
                    </IconButton>
                    <IconButton onClick={() => setDeletingBudget(budget)} aria-label={t("excluir")}>
                      <HiOutlineTrash size={16} />
                    </IconButton>
                  </Can>
                </S.Actions>
              </S.BudgetHeader>

              <S.BudgetValues>
                <S.ValueItem>
                  <S.ValueLabel>{t("gasto")}</S.ValueLabel>
                  <S.ValueAmount $type="spent">
                    {formatCurrency(fromCents(budget.spent), currency, locale)}
                  </S.ValueAmount>
                </S.ValueItem>
                <S.ValueItem>
                  <S.ValueLabel>{t("limite")}</S.ValueLabel>
                  <S.ValueAmount>{formatCurrency(fromCents(budget.limit), currency, locale)}</S.ValueAmount>
                </S.ValueItem>
                {budget.overBudget && (
                  <S.ValueItem>
                    <S.ValueLabel>{t("excedente")}</S.ValueLabel>
                    <S.ValueAmount $type="over">
                      +{formatCurrency(fromCents(budget.spent - budget.limit), currency, locale)}
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
                {budget.percentage}{t("porcentagemUtilizada")}
              </S.PercentageLabel>
            </S.BudgetCard>
          ))}
        </S.List>
      )}

      <Modal open={!!editingBudget} onClose={() => setEditingBudget(null)} title={t("editar")}>
        <BudgetForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel={t("salvar")}
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
        title={t("excluir")}
        message={t("confirmarExclusao")}
        confirmLabel={t("confirmar")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
