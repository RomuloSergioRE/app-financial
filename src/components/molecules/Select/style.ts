import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const Trigger = styled.button<{ $isOpen: boolean; $hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  padding-right: 36px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? theme.colors.danger : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: inherit;
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
  min-height: 38px;
  transition:
    border-color ${({ theme }) => theme.transition.base},
    box-shadow ${({ theme }) => theme.transition.base};

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.info};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.info};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Chevron = styled.span<{ $isOpen: boolean }>`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.sm};
  transform: translateY(-50%) rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform ${({ theme }) => theme.transition.base};
  pointer-events: none;
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadow.md};
  max-height: 200px;
  overflow-y: auto;
`;

export const OptionItem = styled.li<{ $isActive: boolean; $isSelected: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: inherit;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.primary : theme.colors.text)};
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.surfaceHover : "transparent")};
  transition: background ${({ theme }) => theme.transition.base};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;
