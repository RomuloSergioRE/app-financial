import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: end;
  flex-wrap: wrap;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BudgetCard = styled.div<{ $overBudget?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, $overBudget }) => ($overBudget ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid ${({ theme, $overBudget }) => ($overBudget ? theme.colors.danger : theme.colors.primary)};
`;

export const BudgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BudgetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MonthYear = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: none;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.info};
    outline-offset: 2px;
  }
`;

export const BudgetValues = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ValueItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ValueLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ValueAmount = styled.span<{ $type?: "spent" | "over" }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme, $type }) =>
    $type === "over" ? theme.colors.danger : $type === "spent" ? theme.colors.text : theme.colors.text};
  font-variant-numeric: tabular-nums;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percentage: number; $overBudget?: boolean }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ theme, $overBudget }) => ($overBudget ? theme.colors.danger : theme.colors.primary)};
  transition: width 0.3s ease;
`;

export const PercentageLabel = styled.span<{ $overBudget?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, $overBudget }) => ($overBudget ? theme.colors.danger : theme.colors.textSecondary)};
  font-weight: ${({ theme, $overBudget }) => ($overBudget ? theme.fontWeight.medium : theme.fontWeight.normal)};
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;
