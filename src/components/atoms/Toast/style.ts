import styled from "styled-components";

export const typeColors = {
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
  warning: "#F59E0B",
};

export type ToastType = keyof typeof typeColors;

export const ToastContainer = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 320px;
  max-width: 420px;
  padding: 12px 14px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${({ $type }) => typeColors[$type]};
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
  font-weight: 600;
  color: #1f2937;
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
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: #4b5563;
    background: #f3f4f6;
  }
`;
