import styled from "styled-components";
export { Table, Th, Td, TdMono } from "@/components/atoms/Table";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Link = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const List = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
`;

export const TypeBadge = styled.span<{ $type: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $type }) => ($type === "income" ? theme.colors.primary : theme.colors.danger)};
`;
