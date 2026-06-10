import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const Trigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 48px;
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const Chevron = styled.span<{ $open: boolean }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.colors.textSecondary};

  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(180deg);
    `}
`;

export const Content = styled.div<{ $open: boolean; $height: number }>`
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  max-height: ${({ $open, $height }) => ($open ? $height : 0)}px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
`;

export const Answer = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin: 0;
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;
