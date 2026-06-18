"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { RecurringForm } from "@/components/organisms/RecurringForm";
import { useCategories } from "@/hooks/useCategories";
import {
  useRecurring,
  useCreateRecurring,
  useUpdateRecurring,
  useDeleteRecurring,
  useExecuteRecurring,
} from "@/hooks/useRecurring";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents, toCents } from "@/lib/currency";
import type { Recurring } from "@/types";
import * as S from "./style";

export default function RecurringRulesPage() {
  const t = useTranslations("recurring");
  const [editingRule, setEditingRule] = useState<Recurring | null>(null);
  const [deletingRule, setDeletingRule] = useState<Recurring | null>(null);

  const recurringState = useRecurring();
  const categoriesState = useCategories();
  const createMutation = useCreateRecurring();
  const deleteMutation = useDeleteRecurring();
  const updateMutation = useUpdateRecurring(editingRule?.id ?? "");
  const executeMutation = useExecuteRecurring();

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  const FREQUENCY_LABELS: Record<string, string> = {
    daily: t("diario"),
    weekly: t("semanal"),
    monthly: t("mensal"),
    yearly: t("anual"),
  };

  const handleCreate = (data: {
    categoryId: string;
    description: string;
    amount: number;
    type: "income" | "outcome";
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    nextDate: string;
    endDate?: string;
  }) => {
    createMutation.mutate(
      {
        categoryId: data.categoryId,
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        frequency: data.frequency,
        interval: data.interval,
        nextDate: data.nextDate,
        endDate: data.endDate || undefined,
      },
      {},
    );
  };

  const handleEdit = (rule: Recurring) => {
    setEditingRule(rule);
  };

  const handleUpdate = (data: {
    categoryId: string;
    description: string;
    amount: number;
    type: "income" | "outcome";
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval: number;
    nextDate: string;
    endDate?: string;
  }) => {
    if (!editingRule) return;
    updateMutation.mutate(
      {
        categoryId: data.categoryId,
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        frequency: data.frequency,
        interval: data.interval,
        nextDate: data.nextDate,
        endDate: data.endDate || undefined,
      },
      { onSuccess: () => setEditingRule(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingRule) return;
    deleteMutation.mutate(deletingRule.id, {
      onSuccess: () => setDeletingRule(null),
    });
  };

  const handleExecute = (id: string) => {
    executeMutation.mutate(id);
  };

  if (recurringState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          {t("titulo")}
        </Text>
        <Text color="danger">{t("erroCarregar")} {recurringState.error}</Text>
      </S.Wrapper>
    );
  }

  const rules = recurringState.status === "success" ? recurringState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <RecurringForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel={t("criar")}
      />

      {recurringState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="100px" />
          <Skeleton variant="rect" height="100px" />
          <Skeleton variant="rect" height="100px" />
        </S.List>
      ) : rules.length === 0 ? (
        <EmptyState
          icon={<HiOutlineArrowPath />}
          title={t("nenhuma")}
          description={t("criePrimeira")}
        />
      ) : (
        <S.List>
          {rules.map((rule) => (
            <S.RuleCard key={rule.id} $active={rule.active}>
              <S.RuleHeader>
                <S.RuleInfo>
                  <S.RuleName>{rule.description}</S.RuleName>
                  <S.RuleMeta>
                    {rule.categoryName ?? t("semCategoria")} ·{" "}
                    {FREQUENCY_LABELS[rule.frequency] ?? rule.frequency}
                    {rule.interval > 1 ? ` (${t("aCada")} ${rule.interval})` : ""}
                  </S.RuleMeta>
                </S.RuleInfo>
                <S.Actions>
                  <IconButton
                    onClick={() => handleExecute(rule.id)}
                    aria-label={t("executar")}
                    title={t("executar")}
                    disabled={!rule.active || executeMutation.isPending}
                  >
                    <HiOutlinePlay size={16} />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(rule)} aria-label={t("editar")}>
                    <HiOutlinePencil size={16} />
                  </IconButton>
                  <IconButton onClick={() => setDeletingRule(rule)} aria-label={t("excluir")}>
                    <HiOutlineTrash size={16} />
                  </IconButton>
                </S.Actions>
              </S.RuleHeader>

              <S.RuleDetails>
                <S.DetailItem>
                  <S.DetailLabel>{t("valor")}</S.DetailLabel>
                  <S.DetailValue>{formatCurrency(fromCents(rule.amount))}</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>{t("tipo")}</S.DetailLabel>
                  <S.DetailValue>
                    <S.TypeBadge $type={rule.type}>
                      {rule.type === "income" ? t("entrada") : t("saida")}
                    </S.TypeBadge>
                  </S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>{t("proxima")}</S.DetailLabel>
                  <S.DetailValue>{formatDate(rule.nextDate)}</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>{t("status")}</S.DetailLabel>
                  <S.StatusBadge $active={rule.active}>
                    {rule.active ? t("ativa") : t("inativa")}
                  </S.StatusBadge>
                </S.DetailItem>
              </S.RuleDetails>
            </S.RuleCard>
          ))}
        </S.List>
      )}

      <Modal
        open={!!editingRule}
        onClose={() => setEditingRule(null)}
        title={t("editar")}
      >
        <RecurringForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel={t("salvar")}
          initialData={
            editingRule
              ? {
                  categoryId: editingRule.categoryId,
                  description: editingRule.description,
                  amount: fromCents(editingRule.amount),
                  type: editingRule.type,
                  frequency: editingRule.frequency,
                  interval: editingRule.interval,
                  nextDate: editingRule.nextDate.split("T")[0],
                  endDate: editingRule.endDate ? editingRule.endDate.split("T")[0] : undefined,
                }
              : undefined
          }
          onCancel={() => setEditingRule(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingRule}
        onClose={() => setDeletingRule(null)}
        onConfirm={handleDeleteConfirm}
        title={t("excluir")}
        message={t("confirmarExclusao")}
        confirmLabel={t("confirmar")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
