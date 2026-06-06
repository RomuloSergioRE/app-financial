import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const GoalCard = styled.div<{ $achieved?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid
    ${({ theme, $achieved }) => ($achieved ? theme.colors.tradingUp : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border-left: 4px solid
    ${({ theme, $achieved }) => ($achieved ? theme.colors.tradingUp : theme.colors.primary)};
`;

export const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const GoalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const GoalName = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const GoalMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percentage: number; $achieved?: boolean }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: 999px;
  background: ${({ theme, $achieved }) =>
    $achieved ? theme.colors.tradingUp : theme.colors.primary};
  transition: width 0.4s ease;
`;

export const ProgressLabel = styled.span<{ $achieved?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, $achieved }) =>
    $achieved ? theme.colors.tradingUp : theme.colors.textSecondary};
  font-weight: ${({ theme, $achieved }) =>
    $achieved ? theme.fontWeight.semibold : theme.fontWeight.normal};
`;

export const GoalValues = styled.div`
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

export const ValueAmount = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
`;
