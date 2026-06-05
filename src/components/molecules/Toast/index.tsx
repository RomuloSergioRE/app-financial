"use client";

import { Toaster, toast as sonnerToast } from "sonner";
import { memo } from "react";
import { useTheme } from "styled-components";
import {
  HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineInformationCircle, HiOutlineExclamationTriangle, HiOutlineXMark,
} from "react-icons/hi2";
import * as S from "./style";
import type { ToastType } from "./style";
import type { ToastContentProps } from "./types";

const ToastContent = memo(function ToastContent({ type, message, toastId }: ToastContentProps) {
  const theme = useTheme();

  const typeColors: Record<ToastType, string> = {
    success: theme.colors.primary,
    error: theme.colors.danger,
    info: theme.colors.info,
    warning: theme.colors.secondary,
  };

  const color = typeColors[type];

  const icons: Record<ToastType, React.ReactNode> = {
    success: <HiOutlineCheckCircle color={color} size={20} />,
    error: <HiOutlineXCircle color={color} size={20} />,
    info: <HiOutlineInformationCircle color={color} size={20} />,
    warning: <HiOutlineExclamationTriangle color={color} size={20} />,
  };

  return (
    <S.ToastContainer $color={color}>
      <S.ToastIcon>{icons[type]}</S.ToastIcon>
      <S.ToastMessage>{message}</S.ToastMessage>
      <S.CloseButton onClick={() => sonnerToast.dismiss(toastId)}>
        <HiOutlineXMark size={16} />
      </S.CloseButton>
    </S.ToastContainer>
  );
});

export function Toast() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "transparent",
          border: "none",
          padding: 0,
          boxShadow: "none",
          borderRadius: 0,
          gap: 0,
        },
      }}
    />
  );
}

export const toast = {
  success: (message: string) => {
    sonnerToast.custom(
      (id) => <ToastContent type="success" message={message} toastId={id} />,
      { duration: 4000 }
    );
  },
  error: (message: string) => {
    sonnerToast.custom(
      (id) => <ToastContent type="error" message={message} toastId={id} />,
      { duration: 6000 }
    );
  },
  info: (message: string) => {
    sonnerToast.custom(
      (id) => <ToastContent type="info" message={message} toastId={id} />,
      { duration: 4000 }
    );
  },
  warning: (message: string) => {
    sonnerToast.custom(
      (id) => (
        <ToastContent type="warning" message={message} toastId={id} />
      ),
      { duration: 5000 }
    );
  },
};
