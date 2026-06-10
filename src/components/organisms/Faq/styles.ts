import styled from "styled-components";

export const Wrapper = styled.section`
  padding: 80px ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 100px ${({ theme }) => theme.spacing.lg};
  }
`;

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin: 0 0 48px;
`;

export const List = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
