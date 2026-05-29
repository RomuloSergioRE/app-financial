import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surfaceHover};
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  width: fit-content;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme, $active }) =>
    $active ? "#fff" : theme.colors.textSecondary};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : "transparent"};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.surface};
  }
`;
