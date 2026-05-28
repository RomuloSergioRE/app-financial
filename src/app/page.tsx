"use client";

import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.hero};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default function Home() {
  return (
    <Wrapper>
      <Title>Financial App</Title>
      <p>Bem-vindo ao seu gerenciador financeiro pessoal.</p>
    </Wrapper>
  );
}
