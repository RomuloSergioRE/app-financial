import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const TopBar = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    z-index: 30;
  }
`;

export const TopBarToggle = styled.button`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    width: 36px;
    height: 36px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.125rem;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
`;

export const TopBarLogo = styled.span`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSize.lg};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    letter-spacing: -0.02em;
    white-space: nowrap;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.section};
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 72px;
  }

  @media (min-width: 769px) {
    padding: ${({ theme }) => theme.spacing.xl};
    padding-top: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.section};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.section};
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Charts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: 769px) {
    grid-template-columns: 7fr 5fr;
  }
`;

