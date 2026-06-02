import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const Value = styled.span<{ $color: string }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ $color }) => $color};
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const Change = styled.span<{ $positive: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.tradingUp : theme.colors.tradingDown};
  line-height: 1;
`;
