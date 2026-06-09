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

  & > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    overflow-x: hidden;

    & > :nth-child(1),
    & > :nth-child(2) {
      flex: 1;
      min-width: 0;
    }

    & > div,
    & > button {
      min-width: 0;
    }

    & > button {
      flex: 0 0 auto;
    }
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  & > * {
    min-width: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex: 1 0 100%;
    gap: ${({ theme }) => theme.spacing.sm};

    & > * {
      flex: 1;
      min-width: 0;
    }
  }
`;

export { ModalForm, ModalActions } from "@/components/molecules/Modal";
