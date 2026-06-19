import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const FormWrapper = styled.div`
  pointer-events: none;
  opacity: 0.5;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  z-index: 1;
`;
