import styled from "styled-components";

export const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: 80px ${({ theme }) => theme.spacing.lg} 64px;

  @media (max-width: 479px) {
    padding: 80px ${({ theme }) => theme.spacing.md} 48px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 120px ${({ theme }) => theme.spacing.lg} 80px;
    min-height: 90vh;
    display: flex;
    align-items: center;
  }
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 479px) {
    gap: 24px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 64px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  align-items: stretch;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    align-items: flex-start;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  width: fit-content;
  align-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-self: auto;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize["3xl"]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.display};
  }
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
  max-width: 540px;

  @media (max-width: 767px) {
    text-align: center;
  }

  @media (max-width: 479px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`;

export const TrustRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  line-height: 1.5;
  gap: ${({ theme }) => theme.spacing.xs};
  width: fit-content;
  margin: 0 auto;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.sm};
    justify-content: flex-start;
    width: auto;
    margin: 0;
  }
`;

export const Bullet = styled.span`
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textMuted};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MockupColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
