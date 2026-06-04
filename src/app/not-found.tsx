"use client";

import Link from "next/link";
import styled, { useTheme } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.display};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const StyledLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Description>Página não encontrada</Description>
      <StyledLink href="/">Voltar ao início</StyledLink>
    </Wrapper>
  );
}
