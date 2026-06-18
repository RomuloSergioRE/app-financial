"use client";

import { useTranslations } from "next-intl";
import { Text } from "@/components/atoms/Text";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { TagForm } from "@/components/organisms/TagForm";
import type { CreateTagDTO } from "@/schemas/tag.schema";
import * as S from "./style";

interface TagManagerProps {
  open: boolean;
  transactionDescription: string;
  tags: { id: string; name: string; color?: string | null }[];
  selectedTagIds: string[];
  isLoading?: boolean;
  createTagIsLoading?: boolean;
  onToggle: (tagId: string) => void;
  onSave: () => void;
  onClose: () => void;
  onCreateTag: (data: CreateTagDTO) => void;
}

export function TagManager({
  open,
  transactionDescription,
  tags,
  selectedTagIds,
  isLoading,
  createTagIsLoading,
  onToggle,
  onSave,
  onClose,
  onCreateTag,
}: TagManagerProps) {
  const t = useTranslations("common");

  return (
    <Modal open={open} onClose={onClose} title={`Gerenciar Tags — ${transactionDescription}`}>
      <S.ModalForm>
        <S.TagGrid>
          {tags.map((tag) => {
            const isSelected = selectedTagIds.includes(tag.id);
            return (
              <S.TagCheckbox
                key={tag.id}
                $selected={isSelected}
                $color={tag.color ?? undefined}
                onClick={() => onToggle(tag.id)}
              >
                {tag.name}
              </S.TagCheckbox>
            );
          })}
        </S.TagGrid>

        <S.Divider />

        <Text as="span" size="xs" color="textSecondary">
          Criar nova tag
        </Text>
        <TagForm onSubmit={onCreateTag} isLoading={createTagIsLoading} submitLabel={t("criar")} />

        <S.ModalActions>
          <Button variant="outline" onClick={onClose} type="button">
            {t("cancelar")}
          </Button>
          <Button type="button" onClick={onSave} loading={isLoading}>
            {t("salvar")}
          </Button>
        </S.ModalActions>
      </S.ModalForm>
    </Modal>
  );
}
