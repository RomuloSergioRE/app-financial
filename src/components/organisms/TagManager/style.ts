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
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 2px solid ${({ $selected, $color }) => ($selected ? $color || "#D4A853" : "transparent")};
  background: ${({ $selected, $color }) =>
    $selected ? `${$color || "#D4A853"}20` : "transparent"};
  color: ${({ $selected, $color }) => ($selected ? $color || "#D4A853" : "inherit")};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  transition: all ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ $color }) => ($color ? `${$color}15` : "#D4A85315")};
  }

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color || "#D4A853"};
    opacity: ${({ $selected }) => ($selected ? 1 : 0.4)};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;


