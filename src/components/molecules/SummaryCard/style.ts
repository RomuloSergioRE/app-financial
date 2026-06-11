import styled from "styled-components";

export const Wrapper = styled.div<{ $accent: string }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 3px solid ${({ $accent }) => $accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  overflow-wrap: break-word;
  word-break: break-word;

  @media (max-width: 479px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
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
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ $color }) => $color};
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $color }) => $color}26;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const Change = styled.span<{ $positive: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $positive }) =>
    $positive ? theme.colors.tradingUp : theme.colors.tradingDown};
  background: ${({ theme, $positive }) =>
    $positive ? theme.colors.tradingUp : theme.colors.tradingDown}18;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  width: fit-content;
  line-height: 1.4;
`;
