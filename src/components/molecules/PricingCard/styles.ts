import styled, { css } from "styled-components";

export const Wrapper = styled.div<{
  $highlighted?: boolean;
  $visible: boolean;
  $delay?: number;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.primary : theme.colors.surface};
  border: 2px solid
    ${({ theme, $highlighted }) =>
      $highlighted ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  cursor: default;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease,
    box-shadow ${({ theme }) => theme.transition.base};

  ${({ $visible, $delay }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      transition-delay: ${$delay ?? 0}ms;
    `}

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

export const Badge = styled.span`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  white-space: nowrap;
`;

export const PlanName = styled.h3<{ $highlighted?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.onPrimary : theme.colors.text};
  margin: 0;
`;

export const PriceRow = styled.div<{ $highlighted?: boolean }>`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Value = styled.span<{ $highlighted?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.display};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.onPrimary : theme.colors.text};
`;

export const Period = styled.span<{ $highlighted?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme, $highlighted }) =>
    $highlighted
      ? `${theme.colors.onPrimary}aa`
      : theme.colors.textSecondary};
`;

export const Description = styled.p<{ $highlighted?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $highlighted }) =>
    $highlighted
      ? `${theme.colors.onPrimary}cc`
      : theme.colors.textSecondary};
  margin: 0;
`;

export const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FeatureItem = styled.li<{ $highlighted?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $highlighted }) =>
    $highlighted
      ? `${theme.colors.onPrimary}dd`
      : theme.colors.textSecondary};
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    color: ${({ theme, $highlighted }) =>
      $highlighted ? theme.colors.onPrimary : theme.colors.tradingUp};
  }
`;
