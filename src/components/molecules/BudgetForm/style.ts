import styled from "styled-components";

export const Form = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: end;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    width: auto;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export { ModalForm, ModalActions } from "@/components/molecules/Modal";
