import styled, { css } from "styled-components";

export const Wrapper = styled.div<{ $visible: boolean }>`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

export const Frame = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

export const FrameHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surfaceHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Dot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const FrameContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 479px) {
    padding: 12px;
    gap: 14px;
  }
`;

export const BalanceRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 479px) {
    gap: 4px;
  }
`;

export const BalanceCard = styled.div<{ $accent?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  border-left: 3px solid ${({ $accent, theme }) => $accent ?? theme.colors.primary};

  @media (max-width: 479px) {
    padding: 6px;
  }
`;

export const BalanceLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BalanceValue = styled.span<{ $color?: string }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ $color }) => $color ?? "inherit"};
`;

export const ChartSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 479px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const ChartLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ChartRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;

  @media (max-width: 479px) {
    height: 50px;
    min-width: 260px;
    gap: 3px;
  }
`;

export const ChartBar = styled.div<{ $height: number; $color: string }>`
  flex: 1;
  height: ${({ $height }) => $height}%;
  border-radius: 3px 3px 0 0;
  background: ${({ $color }) => $color};
  opacity: 0.8;
  transition: height 0.3s ease;
  min-width: 8px;
`;

export const DayLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const TransactionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TxTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const TxViewAll = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const TxList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TxItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TxInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const TxDescription = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 479px) {
    font-size: 11px;
  }
`;

export const TxCategory = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TxAmount = styled.span<{ $positive?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.tradingUp : theme.colors.tradingDown};

  @media (max-width: 479px) {
    font-size: 11px;
  }
`;
