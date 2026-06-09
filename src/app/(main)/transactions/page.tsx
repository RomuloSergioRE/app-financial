"use client";

import { useState, useRef } from "react";
import {
  HiOutlineDocumentArrowDown,
  HiOutlineDocumentArrowUp,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { Modal } from "@/components/molecules/Modal";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { TransactionForm } from "@/components/organisms/TransactionForm";
import { TransactionFilters } from "@/components/organisms/TransactionFilters";
import { TransactionTable } from "@/components/organisms/TransactionTable";
import { TagManager } from "@/components/organisms/TagManager";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/hooks/useCategories";
import { useTags, useCreateTag } from "@/hooks/useTags";
import {
  useTransactions,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
  useLinkTags,
  useUnlinkTag,
  useExportTransactionsCsv,
  useExportTransactionsPdf,
  useExportTransactionsTemplate,
  useImportTransactionsCsv,
} from "@/hooks/useTransactions";
import { fromCents, toCents } from "@/lib/currency";
import type { Transaction } from "@/types";
import type { CreateTagDTO } from "@/schemas/tag.schema";
import * as S from "./style";

export default function TransactionsPage() {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deletingTx, setDeletingTx] = useState<Transaction | null>(null);
  const [taggingTx, setTaggingTx] = useState<Transaction | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const transactionsState = useTransactions({
    page,
    categoryId: categoryFilter || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    search: debouncedSearch || undefined,
  });
  const categoriesState = useCategories();
  const tagsState = useTags();
  const createMutation = useCreateTransaction();
  const deleteMutation = useDeleteTransaction();
  const updateMutation = useUpdateTransaction(editingTx?.id ?? "");
  const linkTagsMutation = useLinkTags();
  const unlinkTagMutation = useUnlinkTag();
  const createTagMutation = useCreateTag();
  const exportCsvMutation = useExportTransactionsCsv();
  const exportPdfMutation = useExportTransactionsPdf();
  const exportTemplateMutation = useExportTransactionsTemplate();
  const importCsvMutation = useImportTransactionsCsv();
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleCreate = (data: {
    description: string;
    amount: number;
    type: "income" | "outcome";
    date: string;
    categoryId: string;
  }) => {
    createMutation.mutate(
      {
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        date: new Date(data.date).toISOString(),
        categoryId: data.categoryId,
      },
      {},
    );
  };

  const handleUpdate = (data: {
    description: string;
    amount: number;
    type: "income" | "outcome";
    date: string;
    categoryId: string;
  }) => {
    if (!editingTx) return;
    updateMutation.mutate(
      {
        description: data.description,
        amount: toCents(data.amount),
        type: data.type,
        date: new Date(data.date).toISOString(),
        categoryId: data.categoryId,
      },
      { onSuccess: () => setEditingTx(null) },
    );
  };

  const handleDeleteConfirm = () => {
    if (!deletingTx) return;
    deleteMutation.mutate(deletingTx.id, {
      onSuccess: () => setDeletingTx(null),
    });
  };

  const handleManageTags = (tx: Transaction) => {
    setTaggingTx(tx);
    setSelectedTagIds(tx.tags?.map((t) => t.id) ?? []);
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  const handleSaveTags = () => {
    if (!taggingTx) return;
    const currentTagIds = taggingTx.tags?.map((t) => t.id) ?? [];
    const toAdd = selectedTagIds.filter((id) => !currentTagIds.includes(id));
    const toRemove = currentTagIds.filter((id) => !selectedTagIds.includes(id));

    if (toAdd.length > 0) {
      linkTagsMutation.mutate({ id: taggingTx.id, tagIds: toAdd });
    }

    toRemove.forEach((tagId) => {
      unlinkTagMutation.mutate({ id: taggingTx.id, tagId });
    });

    setTaggingTx(null);
  };

  const handleCreateTagInline = (data: CreateTagDTO) => {
    createTagMutation.mutate(data);
  };

  const transactions = transactionsState.status === "success" ? transactionsState.data.data : [];
  const totalPages =
    transactionsState.status === "success" ? transactionsState.data.pagination.totalPages : 1;
  const categories = categoriesState.status === "success" ? categoriesState.data.data : [];

  const tags = tagsState.status === "success" ? tagsState.data : [];

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
          Transações
        </Text>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportCsvMutation.mutate({
                startDate: startDate || undefined,
                endDate: endDate || undefined,
                search: debouncedSearch || undefined,
              })
            }
            loading={exportCsvMutation.isPending}
          >
            <HiOutlineDocumentArrowDown size={14} /> CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportPdfMutation.mutate({
                startDate: startDate || undefined,
                endDate: endDate || undefined,
              })
            }
            loading={exportPdfMutation.isPending}
          >
            <HiOutlineDocumentArrowDown size={14} /> PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportTemplateMutation.mutate()}
            loading={exportTemplateMutation.isPending}
          >
            <HiOutlineDocumentText size={14} /> Template
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => importFileRef.current?.click()}
            loading={importCsvMutation.isPending}
          >
            <HiOutlineDocumentArrowUp size={14} /> Importar
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

      <TransactionForm
        categories={categories}
        onSubmit={handleCreate}
        isLoading={createMutation.isPending}
        submitLabel="Adicionar"
        variant="inline"
      />

      <TransactionFilters
        search={search}
        categoryFilter={categoryFilter}
        startDate={startDate}
        endDate={endDate}
        categories={categories}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        onCategoryChange={(v) => {
          setCategoryFilter(v);
          setPage(1);
        }}
        onStartDateChange={(v) => {
          setStartDate(v);
          setPage(1);
        }}
        onEndDateChange={(v) => {
          setEndDate(v);
          setPage(1);
        }}
      />

      <TransactionTable
        status={transactionsState.status}
        transactions={transactions}
        totalPages={totalPages}
        page={page}
        error={transactionsState.status === "error" ? transactionsState.error : undefined}
        onPageChange={setPage}
        onEdit={setEditingTx}
        onDelete={setDeletingTx}
        onManageTags={handleManageTags}
      />

      <Modal open={!!editingTx} onClose={() => setEditingTx(null)} title="Editar Transação">
        <TransactionForm
          categories={categories}
          onSubmit={handleUpdate}
          isLoading={updateMutation.isPending}
          submitLabel="Salvar"
          variant="modal"
          initialData={
            editingTx
              ? {
                  description: editingTx.description,
                  amount: fromCents(editingTx.amount),
                  type: editingTx.type,
                  date: editingTx.date.split("T")[0],
                  categoryId: editingTx.categoryId.toString(),
                }
              : undefined
          }
          onCancel={() => setEditingTx(null)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deletingTx}
        onClose={() => setDeletingTx(null)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Transação"
        message={`Tem certeza que deseja excluir a transação "${deletingTx?.description}"? Esta ação não pode ser feita.`}
        confirmLabel="Excluir"
        loading={deleteMutation.isPending}
      />

      <TagManager
        open={!!taggingTx}
        transactionDescription={taggingTx?.description ?? ""}
        tags={tags}
        selectedTagIds={selectedTagIds}
        isLoading={linkTagsMutation.isPending || unlinkTagMutation.isPending}
        createTagIsLoading={createTagMutation.isPending}
        onToggle={handleTagToggle}
        onSave={handleSaveTags}
        onClose={() => setTaggingTx(null)}
        onCreateTag={handleCreateTagInline}
      />
    </S.Wrapper>
  );
}
