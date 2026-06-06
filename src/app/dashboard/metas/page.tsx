"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTrophy } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { GoalForm } from "@/components/molecules/GoalForm";
import { useCategories } from "@/hooks/useCategories";
import { useGoals, useCreateGoal, useUpdateGoal, useDeleteGoal } from "@/hooks/useGoals";
import { formatCurrency, formatDate } from "@/lib/format";
import { fromCents, toCents } from "@/lib/currency";
import type { Goal } from "@/types";
import * as S from "./style";

export default function MetasPage() {
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);

  const goalsState = useGoals();
  const categoriesState = useCategories();
  const createMutation = useCreateGoal();
  const deleteMutation = useDeleteGoal();
  const updateMutation = useUpdateGoal(editingGoal?.id ?? "");

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  const handleCreate = (data: {
    name: string;
    targetAmount: number;
    categoryId?: string;
    deadline?: string;
  }) => {
    createMutation.mutate(
      {
        name: data.name,
        targetAmount: toCents(data.targetAmount),
        categoryId: data.categoryId || undefined,
        deadline: data.deadline || undefined,
      },
      {},
    );
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
  };

  const handleUpdate = (data: {
    name: string;
    targetAmount: number;
    categoryId?: string;
    deadline?: string;
  }) => {
    if (!editingGoal) return;
    updateMutation.mutate(
      {
        name: data.name,
        targetAmount: toCents(data.targetAmount),
        categoryId: data.categoryId || undefined,
        deadline: data.deadline || undefined,
      },
      { onSuccess: () => setEditingGoal(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingGoal) return;
    deleteMutation.mutate(deletingGoal.id, {
      onSuccess: () => setDeletingGoal(null),
    });
  };

  if (goalsState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Metas
        </Text>
        <Text color="danger">Erro ao carregar metas: {goalsState.error}</Text>
      </S.Wrapper>
    );
  }

  const goals = goalsState.status === "success" ? goalsState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Metas
      </Text>

      <GoalForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Criar"
      />

      {goalsState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="100px" />
          <Skeleton variant="rect" height="100px" />
          <Skeleton variant="rect" height="100px" />
        </S.List>
      ) : goals.length === 0 ? (
        <EmptyState
          icon={<HiOutlineTrophy />}
          title="Nenhuma meta"
          description="Crie sua primeira meta para acompanhar seus objetivos financeiros."
        />
      ) : (
        <S.List>
          {goals.map((goal) => (
            <S.GoalCard key={goal.id} $achieved={goal.achieved}>
              <S.GoalHeader>
                <S.GoalInfo>
                  <S.GoalName>{goal.name}</S.GoalName>
                  <S.GoalMeta>
                    {goal.categoryName && goal.categoryName !== "Unknown"
                      ? `${goal.categoryName}`
                      : "Todas as categorias"}
                    {goal.deadline && ` · até ${formatDate(goal.deadline)}`}
                  </S.GoalMeta>
                </S.GoalInfo>
                <S.Actions>
                  <S.IconButton onClick={() => handleEdit(goal)} aria-label="Editar">
                    <HiOutlinePencil size={16} />
                  </S.IconButton>
                  <S.IconButton onClick={() => setDeletingGoal(goal)} aria-label="Excluir">
                    <HiOutlineTrash size={16} />
                  </S.IconButton>
                </S.Actions>
              </S.GoalHeader>

              <S.ProgressSection>
                <S.ProgressBarWrapper>
                  <S.ProgressBarFill
                    $percentage={Math.min(goal.progress ?? 0, 100)}
                    $achieved={goal.achieved}
                  />
                </S.ProgressBarWrapper>
                <S.ProgressLabel $achieved={goal.achieved}>
                  {goal.achieved ? "Meta alcançada! 🎉" : `${goal.progress}% concluído`}
                </S.ProgressLabel>
              </S.ProgressSection>

              <S.GoalValues>
                <S.ValueItem>
                  <S.ValueLabel>Atual</S.ValueLabel>
                  <S.ValueAmount>{formatCurrency(fromCents(goal.currentAmount))}</S.ValueAmount>
                </S.ValueItem>
                <S.ValueItem>
                  <S.ValueLabel>Alvo</S.ValueLabel>
                  <S.ValueAmount>{formatCurrency(fromCents(goal.targetAmount))}</S.ValueAmount>
                </S.ValueItem>
                {!goal.achieved && goal.targetAmount > goal.currentAmount && (
                  <S.ValueItem>
                    <S.ValueLabel>Faltam</S.ValueLabel>
                    <S.ValueAmount>
                      {formatCurrency(fromCents(goal.targetAmount - goal.currentAmount))}
                    </S.ValueAmount>
                  </S.ValueItem>
                )}
              </S.GoalValues>
            </S.GoalCard>
          ))}
        </S.List>
      )}

      <Modal open={!!editingGoal} onClose={() => setEditingGoal(null)} title="Editar Meta">
        <GoalForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={
            editingGoal
              ? {
                  name: editingGoal.name,
                  targetAmount: fromCents(editingGoal.targetAmount),
                  categoryId: editingGoal.categoryId ?? undefined,
                  deadline: editingGoal.deadline ? editingGoal.deadline.split("T")[0] : undefined,
                }
              : undefined
          }
          onCancel={() => setEditingGoal(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingGoal}
        onClose={() => setDeletingGoal(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Meta"
        message={`Tem certeza que deseja excluir a meta "${deletingGoal?.name}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
