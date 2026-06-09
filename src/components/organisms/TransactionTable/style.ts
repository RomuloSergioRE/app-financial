import styled from "styled-components";
export { Table, Th, Td, TdMono } from "@/components/atoms/Table";

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surface};
`;

export const TypeBadge = styled.span<{ $type: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $type }) => ($type === "income" ? theme.colors.primary : theme.colors.danger)};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;

  @media (max-width: calc(${({ theme }) => theme.breakpoints.sm} - 1px)) {
    justify-content: flex-start;
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const TagPill = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 2px 8px;
  border-radius: 999px;
  background: ${({ $color }) => ($color ? `${$color}20` : "#D4A85320")};
  color: ${({ $color }) => $color || "#D4A853"};
  white-space: nowrap;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color }) => $color || "#D4A853"};
  }
`;

export const TextMuted = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
