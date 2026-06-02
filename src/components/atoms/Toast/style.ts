import styled from "styled-components";

export type ToastType = "success" | "error" | "info" | "warning";

export const ToastContainer = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 320px;
  max-width: 420px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-left: 3px solid ${({ $color }) => $color};
`;

export const ToastIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
  line-height: 1;
`;

export const ToastMessage = styled.span`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transition.fast},
    background ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
