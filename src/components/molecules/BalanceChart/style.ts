import styled from "styled-components";

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  min-width: 0;
  min-height: 0;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

export const BalanceInfo = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const BalanceLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
`;

export const BalanceValue = styled.span<{ $positive: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.tradingUp : theme.colors.tradingDown};
`;
