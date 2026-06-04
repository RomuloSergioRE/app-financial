import styled from "styled-components";

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.03em;
`;
