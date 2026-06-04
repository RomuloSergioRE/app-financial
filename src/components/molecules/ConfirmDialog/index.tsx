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
  confirmLabel = "Confirmar",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <S.Message>{message}</S.Message>
      <S.Actions>
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </S.Actions>
    </Modal>
  );
}
