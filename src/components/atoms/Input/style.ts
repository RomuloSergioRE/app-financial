import styled, { css } from "styled-components";

export const Wrapper = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  transition: border-color ${({ theme }) => theme.transition.base},
    box-shadow ${({ theme }) => theme.transition.base};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.info};
  }

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.danger};

      &:focus-visible {
        border-color: ${theme.colors.danger};
        box-shadow: 0 0 0 1px ${theme.colors.danger};
      }
    `}
`;
