import styled, { css } from "styled-components";

export const Wrapper = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.borderFocus};
  }

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border-color: ${theme.colors.error};

      &:focus {
        border-color: ${theme.colors.error};
      }
    `}
`;
