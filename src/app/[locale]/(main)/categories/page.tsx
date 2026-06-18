"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineTag,
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentArrowUp,
} from "react-icons/hi2";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import { CategoryForm } from "@/components/organisms/CategoryForm";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useExportCategoriesCsv,
  useExportCategoriesPdf,
  useImportCategoriesCsv,
} from "@/hooks/useCategories";
import type { Category } from "@/types";
import * as S from "./style";

export default function CategoriesPage() {
  const t = useTranslations("categories");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const categoriesState = useCategories();
  const createMutation = useCreateCategory();
  const deleteMutation = useDeleteCategory();
  const updateMutation = useUpdateCategory(editingCategory?.id ?? "");
  const exportCsvMutation = useExportCategoriesCsv();
  const exportPdfMutation = useExportCategoriesPdf();
  const importCsvMutation = useImportCategoriesCsv();
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleCreate = (data: { name: string; color?: string; icon?: string }) => {
    createMutation.mutate({ name: data.name }, { onSuccess: () => {} });
  };

  const handleEdit = (cat: Category) => {
    setEditingCategory(cat);
  };

  const handleUpdate = (data: { name: string; color?: string; icon?: string }) => {
    if (!editingCategory) return;
    updateMutation.mutate(
      { name: data.name, color: data.color || undefined },
      { onSuccess: () => setEditingCategory(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  if (categoriesState.status === "error") {
    return (
      <S.Wrapper>
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          {t("titulo")}
        </Text>
        <Text color="danger">{t("erroCarregar")} {categoriesState.error}</Text>
      </S.Wrapper>
    );
  }

  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  return (
    <S.Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <Text as="h1" size="3xl" weight="bold" fontFamily="display">
          {t("titulo")}
        </Text>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCsvMutation.mutate()}
            loading={exportCsvMutation.isPending}
          >
            <HiOutlineDocumentArrowDown size={14} /> CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportPdfMutation.mutate()}
            loading={exportPdfMutation.isPending}
          >
            <HiOutlineDocumentArrowDown size={14} /> PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => importFileRef.current?.click()}
            loading={importCsvMutation.isPending}
          >
            <HiOutlineDocumentArrowUp size={14} /> {t("criar")}
          </Button>
          <input
            ref={importFileRef}
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file)
                importCsvMutation.mutate(file, {
                  onSettled: () => {
                    if (importFileRef.current) importFileRef.current.value = "";
                  },
                });
            }}
          />
        </div>
      </div>

      <CategoryForm
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel={t("criar")}
      />

      {categoriesState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
          <Skeleton variant="rect" height="56px" />
        </S.List>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={<HiOutlineTag />}
          title={t("nenhuma")}
          description={t("criePrimeira")}
        />
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.Item key={cat.id}>
              <S.CategoryBadge $color={cat.color ?? undefined}>{cat.name}</S.CategoryBadge>
              <S.Actions>
                <IconButton onClick={() => handleEdit(cat)} aria-label={t("editar")}>
                  <HiOutlinePencil size={16} />
                </IconButton>
                <IconButton onClick={() => setDeletingCategory(cat)} aria-label={t("excluir")}>
                  <HiOutlineTrash size={16} />
                </IconButton>
              </S.Actions>
            </S.Item>
          ))}
        </S.List>
      )}

      <Modal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title={t("editar")}
      >
        <CategoryForm
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel={t("salvar")}
          initialData={
            editingCategory
              ? { name: editingCategory.name, color: editingCategory.color ?? undefined }
              : undefined
          }
          onCancel={() => setEditingCategory(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title={t("excluir")}
        message={t("confirmarExclusao")}
        confirmLabel={t("confirmar")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
