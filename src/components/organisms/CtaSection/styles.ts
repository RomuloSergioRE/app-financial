import styled, { css } from "styled-components";

export const Wrapper = styled.section`
  padding: 80px ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primaryDark},
    ${({ theme }) => theme.colors.primary}
  );
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 120px ${({ theme }) => theme.spacing.lg};
  }
`;

export const Container = styled.div<{ $visible: boolean }>`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: #ffffff;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 8px;
  max-width: 500px;
  line-height: 1.6;
`;

export const Disclaimer = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: rgba(255, 255, 255, 0.65);
`;
