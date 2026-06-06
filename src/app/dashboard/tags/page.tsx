"use client";

import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { TagForm } from "@/components/organisms/TagForm";
import { useTags, useCreateTag, useUpdateTag, useDeleteTag } from "@/hooks/useTags";
import type { Tag } from "@/types";
import * as S from "./style";

export default function TagsPage() {
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);

  const tagsState = useTags();
  const createMutation = useCreateTag();
  const deleteMutation = useDeleteTag();
  const updateMutation = useUpdateTag(editingTag?.id ?? "");

  const handleCreate = (data: { name: string; color?: string }) => {
    createMutation.mutate({ name: data.name }, { onSuccess: () => {} });
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
  };

  const handleUpdate = (data: { name: string; color?: string }) => {
    if (!editingTag) return;
    updateMutation.mutate(
      { name: data.name, color: data.color || undefined },
      { onSuccess: () => setEditingTag(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingTag) return;
    deleteMutation.mutate(deletingTag.id, {
      onSuccess: () => setDeletingTag(null),
    });
  };

  if (tagsState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          Tags
        </Text>
        <Text color="danger">Erro ao carregar tags: {tagsState.error}</Text>
      </S.Wrapper>
    );
  }

  const tags = tagsState.status === "success" ? tagsState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        Tags
      </Text>

      <TagForm onSubmit={handleCreate} isLoading={createMutation.isPending} submitLabel="Criar" />

      {tagsState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
        </S.List>
      ) : tags.length === 0 ? (
        <EmptyState
          icon={<HiOutlineTag />}
          title="Nenhuma tag"
          description="Crie sua primeira tag para organizar suas transações."
        />
      ) : (
        <S.List>
          {tags.map((tag) => (
            <S.Item key={tag.id}>
              <S.TagBadge $color={tag.color ?? undefined}>{tag.name}</S.TagBadge>
              <S.Actions>
                <S.IconButton onClick={() => handleEdit(tag)} aria-label="Editar">
                  <HiOutlinePencil size={16} />
                </S.IconButton>
                <S.IconButton onClick={() => setDeletingTag(tag)} aria-label="Excluir">
                  <HiOutlineTrash size={16} />
                </S.IconButton>
              </S.Actions>
            </S.Item>
          ))}
        </S.List>
      )}

      <Modal open={!!editingTag} onClose={() => setEditingTag(null)} title="Editar Tag">
        <TagForm
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          initialData={
            editingTag ? { name: editingTag.name, color: editingTag.color ?? undefined } : undefined
          }
          onCancel={() => setEditingTag(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingTag}
        onClose={() => setDeletingTag(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Tag"
        message={`Tem certeza que deseja excluir a tag "${deletingTag?.name}"?`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
