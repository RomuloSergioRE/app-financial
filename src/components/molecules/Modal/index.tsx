import { ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import * as S from "./style";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <>
      <S.Overlay onClick={onClose} />
      <S.Wrapper role="dialog" aria-modal="true" aria-label={title}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </S.Header>
        {children}
      </S.Wrapper>
    </>
  );
}
