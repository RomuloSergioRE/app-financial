"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import type { ConfirmDialogProps } from "./types";
import * as S from "./style";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  loading = false,
}: ConfirmDialogProps) {
  const t = useTranslations("common");

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <S.Message>{message}</S.Message>
      <S.Actions>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {t("cancelar")}
        </Button>
        <Button variant="primary" onClick={onConfirm} loading={loading}>
          {confirmLabel ?? t("confirmar")}
        </Button>
      </S.Actions>
    </Modal>
  );
}
