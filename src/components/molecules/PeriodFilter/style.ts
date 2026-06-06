import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 2px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 3px;
  width: fit-content;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transition.fast};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  background: ${({ theme, $active }) => ($active ? theme.colors.surfaceHover : "transparent")};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
