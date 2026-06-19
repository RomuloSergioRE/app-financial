"use client";

import { useState } from "react";
import { HiOutlineLockClosed, HiOutlinePencil, HiOutlineTrash, HiOutlineTag } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { IconButton } from "@/components/atoms/IconButton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { ProFeatureGate } from "@/components/molecules/ProFeatureGate";
import { TagForm } from "@/components/organisms/TagForm";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessFeature } from "@/lib/permissions";
import { useTags, useCreateTag, useUpdateTag, useDeleteTag } from "@/hooks/useTags";
import type { Tag } from "@/types";
import * as S from "./style";

export default function TagsPage() {
  const t = useTranslations("tags");
  const { plan } = useAuth();
  const canManage = canAccessFeature(plan, "tags");
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
          {t("titulo")}
        </Text>
        <Text color="danger">{t("erroCarregar")} {tagsState.error}</Text>
      </S.Wrapper>
    );
  }

  const tags = tagsState.status === "success" ? tagsState.data : [];

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <ProFeatureGate feature="tags">
        <TagForm onSubmit={handleCreate} isLoading={createMutation.isPending} submitLabel={t("criar")} />
      </ProFeatureGate>

      {tagsState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
        </S.List>
      ) : tags.length === 0 ? (
        <EmptyState
          icon={<HiOutlineTag />}
          title={t("nenhuma")}
          description={t("criePrimeira")}
        />
      ) : (
        <S.List>
          {tags.map((tag) => (
            <S.Item key={tag.id}>
              <S.TagBadge $color={tag.color ?? undefined}>{tag.name}</S.TagBadge>
              <S.Actions>
                <IconButton disabled={!canManage} onClick={() => handleEdit(tag)} aria-label={t("editar")}>
                  {canManage ? <HiOutlinePencil size={16} /> : <HiOutlineLockClosed size={16} />}
                </IconButton>
                <IconButton disabled={!canManage} onClick={() => setDeletingTag(tag)} aria-label={t("excluir")}>
                  {canManage ? <HiOutlineTrash size={16} /> : <HiOutlineLockClosed size={16} />}
                </IconButton>
              </S.Actions>
            </S.Item>
          ))}
        </S.List>
      )}

      <Modal open={!!editingTag} onClose={() => setEditingTag(null)} title={t("editar")}>
        <TagForm
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel={t("salvar")}
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
        title={t("excluir")}
        message={t("confirmarExclusao")}
        confirmLabel={t("confirmar")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
