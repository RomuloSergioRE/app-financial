"use client";

import { useState } from "react";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Button } from "@/components/atoms/Button";
import { IconButton } from "@/components/atoms/IconButton";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { EmptyState } from "@/components/molecules/EmptyState";
import {
  useGlobalCategories,
  useCreateGlobalCategory,
  useUpdateGlobalCategory,
  useDeleteGlobalCategory,
} from "@/hooks/useAdmin";
import type { GlobalCategory } from "@/types";
import * as S from "./style";

export default function AdminGlobalCategoriesPage() {
  const t = useTranslations("admin.globalCategories");
  const [showCreate, setShowCreate] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GlobalCategory | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<GlobalCategory | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const categoriesState = useGlobalCategories();
  const createMutation = useCreateGlobalCategory();
  const updateMutation = useUpdateGlobalCategory();
  const deleteMutation = useDeleteGlobalCategory();

  const categories = categoriesState.status === "success" ? categoriesState.data : [];

  const resetForm = () => {
    setName("");
    setColor("");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createMutation.mutate(
      { name: name.trim(), color: color || undefined },
      {
        onSuccess: () => {
          resetForm();
          setShowCreate(false);
        },
      },
    );
  };

  const handleEdit = (cat: GlobalCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setColor(cat.color ?? "");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !name.trim()) return;
    updateMutation.mutate(
      { id: editingCategory.id, data: { name: name.trim(), color: color || undefined } },
      {
        onSuccess: () => {
          resetForm();
          setEditingCategory(null);
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => setDeletingCategory(null),
    });
  };

  return (
    <S.Wrapper>
      <Text as="h1" size="3xl" weight="bold" fontFamily="display">
        {t("titulo")}
      </Text>

      <S.Section>
        <S.Row>
          <Text as="h2" size="lg" weight="semibold" fontFamily="display">
            {t("todas")}
          </Text>
          <Button
            onClick={() => {
              resetForm();
              setShowCreate(true);
            }}
          >
            <HiOutlinePlus size={16} /> {t("nova")}
          </Button>
        </S.Row>
      </S.Section>

      {categoriesState.status === "loading" ? (
        <S.List>
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
          <Skeleton variant="rect" height="48px" />
        </S.List>
      ) : categories.length === 0 ? (
        <EmptyState
          title={t("nenhuma")}
          description={t("criePrimeira")}
        />
      ) : (
        <S.List>
          {categories.map((cat) => (
            <S.Section key={cat.id}>
              <S.Row>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {cat.color && (
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: cat.color,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Text size="md" weight="medium">
                    {cat.name}
                  </Text>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <IconButton onClick={() => handleEdit(cat)} title={t("editar")} variant="ghost">
                    <HiOutlinePencil size={16} />
                  </IconButton>
                  <IconButton onClick={() => setDeletingCategory(cat)} title={t("excluir")} variant="ghost">
                    <HiOutlineTrash size={16} />
                  </IconButton>
                </div>
              </S.Row>
            </S.Section>
          ))}
        </S.List>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title={t("novaTitulo")}>
        <S.Form onSubmit={handleCreate}>
          <S.Field>
            <S.Label>{t("nome")}</S.Label>
            <S.Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </S.Field>
          <S.Field>
            <S.Label>{t("corHex")}</S.Label>
            <S.Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder={t("corPlaceholder")}
            />
          </S.Field>
          <Button type="submit" loading={createMutation.isPending}>
            {t("criar")}
          </Button>
        </S.Form>
      </Modal>

      <Modal
        open={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title={t("editarTitulo")}
      >
        <S.Form onSubmit={handleUpdate}>
          <S.Field>
            <S.Label>{t("nome")}</S.Label>
            <S.Input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
          </S.Field>
          <S.Field>
            <S.Label>{t("corHex")}</S.Label>
            <S.Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder={t("corPlaceholder")}
            />
          </S.Field>
          <Button type="submit" loading={updateMutation.isPending}>
            {t("salvar")}
          </Button>
        </S.Form>
      </Modal>

      <ConfirmDialog
        open={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title={t("excluirTitulo")}
        message={t("confirmarExclusao")}
        confirmLabel={t("excluir")}
        loading={deleteMutation.isPending}
      />
    </S.Wrapper>
  );
}
