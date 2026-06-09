import styled from "styled-components";
export { ModalForm, ModalActions } from "@/components/molecules/Modal";

export const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TagCheckbox = styled.button<{ $selected: boolean; $color?: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: 999px;
  border: 2px solid
    ${({ $selected, $color, theme }) =>
      $selected ? $color || theme.colors.warning : "transparent"};
  background: ${({ $selected, $color, theme }) =>
    $selected ? `${$color || theme.colors.warning}20` : "transparent"};
  color: ${({ $selected, $color, theme }) =>
    $selected ? $color || theme.colors.warning : "inherit"};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ $color, theme }) =>
      $color ? `${$color}15` : `${theme.colors.warning}15`};
  }

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color, theme }) => $color || theme.colors.warning};
    opacity: ${({ $selected }) => ($selected ? 1 : 0.4)};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;


