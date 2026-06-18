import styled from "styled-components";
export { Table, Th, Td, TdMono } from "@/components/atoms/Table";

/* Page styles */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Section = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow-x: auto;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

export const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;







export const StatusBadge = styled.span<{ $status: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, $status }) =>
    $status === "active"
      ? `${theme.colors.tradingUp}1A`
      : $status === "inactive"
        ? `${theme.colors.textSecondary}1A`
        : `${theme.colors.tradingDown}1A`};
  color: ${({ theme, $status }) =>
    $status === "active"
      ? theme.colors.tradingUp
      : $status === "inactive"
        ? theme.colors.textSecondary
        : theme.colors.tradingDown};
`;

export const RoleBadge = styled.span<{ $role: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme, $role }) =>
    $role === "admin"
      ? `${theme.colors.tradingDown}1A`
      : $role === "company"
        ? `${theme.colors.primary}1A`
        : `${theme.colors.textSecondary}1A`};
  color: ${({ theme, $role }) =>
    $role === "admin"
      ? theme.colors.tradingDown
      : $role === "company"
        ? theme.colors.primary
        : theme.colors.textSecondary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatCard = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const StatLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatValue = styled.span<{ $positive?: boolean; $danger?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme, $positive, $danger }) =>
    $danger ? theme.colors.tradingDown : $positive ? theme.colors.tradingUp : theme.colors.text};
`;
