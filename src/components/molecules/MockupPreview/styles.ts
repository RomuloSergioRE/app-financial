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

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

export const FrameContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ChartBar = styled.div<{ $height: number; $color?: string }>`
  height: ${({ $height }) => $height}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $color, theme }) => $color ?? theme.colors.primary};
  opacity: 0.7;
  transition: height 0.3s ease;
`;

export const ChartRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 80px;
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.tradingUp};
`;
