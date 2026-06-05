"use client";

import { useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlay,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { RecurringForm } from "@/components/molecules/RecurringForm";
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

const FREQUENCY_LABELS: Record<string, string> = {
  daily: "Diário",
  weekly: "Semanal",
  monthly: "Mensal",
  yearly: "Anual",
};

export default function RegrasRecorrentesPage() {
  const [editingRule, setEditingRule] = useState<Recurring | null>(null);
  const [deletingRule, setDeletingRule] = useState<Recurring | null>(null);

  const recurringState = useRecurring();
  const categoriesState = useCategories();
  const createMutation = useCreateRecurring();
  const deleteMutation = useDeleteRecurring();
  const updateMutation = useUpdateRecurring(editingRule?.id ?? "");
  const executeMutation = useExecuteRecurring();

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

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
      {}
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
      { onSuccess: () => setEditingRule(null) }
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
          Regras Recorrentes
        </Text>
        <Text color="danger">Erro ao carregar regras: {recurringState.error}</Text>
      </S.Wrapper>
    );
  }

  const rules = recurringState.status === "success" ? recurringState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Regras Recorrentes
      </Text>

      <RecurringForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Criar"
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
          title="Nenhuma regra recorrente"
          description="Crie sua primeira regra para automatizar transações recorrentes."
        />
      ) : (
        <S.List>
          {rules.map((rule) => (
            <S.RuleCard key={rule.id} $active={rule.active}>
              <S.RuleHeader>
                <S.RuleInfo>
                  <S.RuleName>{rule.description}</S.RuleName>
                  <S.RuleMeta>
                    {rule.categoryName ?? "Sem categoria"} ·{" "}
                    {FREQUENCY_LABELS[rule.frequency] ?? rule.frequency}
                    {rule.interval > 1 ? ` (a cada ${rule.interval})` : ""}
                  </S.RuleMeta>
                </S.RuleInfo>
                <S.Actions>
                  <S.IconButton
                    onClick={() => handleExecute(rule.id)}
                    aria-label="Executar"
                    title="Executar manualmente"
                    disabled={!rule.active || executeMutation.isPending}
                  >
                    <HiOutlinePlay size={16} />
                  </S.IconButton>
                  <S.IconButton onClick={() => handleEdit(rule)} aria-label="Editar">
                    <HiOutlinePencil size={16} />
                  </S.IconButton>
                  <S.IconButton onClick={() => setDeletingRule(rule)} aria-label="Excluir">
                    <HiOutlineTrash size={16} />
                  </S.IconButton>
                </S.Actions>
              </S.RuleHeader>

              <S.RuleDetails>
                <S.DetailItem>
                  <S.DetailLabel>Valor</S.DetailLabel>
                  <S.DetailValue>
                    {formatCurrency(fromCents(rule.amount))}
                  </S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Tipo</S.DetailLabel>
                  <S.DetailValue>
                    <S.TypeBadge $type={rule.type}>
                      {rule.type === "income" ? "Entrada" : "Saída"}
                    </S.TypeBadge>
                  </S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Próxima</S.DetailLabel>
                  <S.DetailValue>{formatDate(rule.nextDate)}</S.DetailValue>
                </S.DetailItem>
                <S.DetailItem>
                  <S.DetailLabel>Status</S.DetailLabel>
                  <S.StatusBadge $active={rule.active}>
                    {rule.active ? "Ativa" : "Inativa"}
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
        title="Editar Regra Recorrente"
      >
        <RecurringForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={editingRule ? {
            categoryId: editingRule.categoryId,
            description: editingRule.description,
            amount: fromCents(editingRule.amount),
            type: editingRule.type,
            frequency: editingRule.frequency,
            interval: editingRule.interval,
            nextDate: editingRule.nextDate.split("T")[0],
            endDate: editingRule.endDate ? editingRule.endDate.split("T")[0] : undefined,
          } : undefined}
          onCancel={() => setEditingRule(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingRule}
        onClose={() => setDeletingRule(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Regra Recorrente"
        message={`Tem certeza que deseja excluir a regra "${deletingRule?.description}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
