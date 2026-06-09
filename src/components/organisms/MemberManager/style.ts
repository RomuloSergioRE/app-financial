import styled from "styled-components";
import { Table as BaseTable, Th, Td } from "@/components/atoms/Table";

export const MemberTable = styled(BaseTable)``;

export { Th, Td };

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export { Input } from "@/components/atoms/Input";

export const StatusBadge = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, $status }) =>
    $status === "active" ? `${theme.colors.tradingUp}1A` : `${theme.colors.tradingDown}1A`};
  color: ${({ theme, $status }) =>
    $status === "active" ? theme.colors.tradingUp : theme.colors.tradingDown};
`;


