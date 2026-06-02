import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    z-index: 30;
    pointer-events: none;
  }
`;

export const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  pointer-events: auto;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.125rem;
  display: ${({ $isOpen }) => ($isOpen ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 2px;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.section};
  overflow-x: hidden;

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
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;
  line-height: 1.15;
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

export const RecentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const RecentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RecentLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const RecentList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
`;

export const RecentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const RecentTh = styled.th`
  text-align: left;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  white-space: nowrap;
`;

export const RecentTd = styled.td`
  padding: ${({ theme }) => `${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  vertical-align: middle;

  &:last-child {
    text-align: right;
  }
`;

export const RecentTdMono = styled.td`
  padding: ${({ theme }) => `${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-variant-numeric: tabular-nums;
  vertical-align: middle;
  white-space: nowrap;
  text-align: right;
`;

export const RecentTypeBadge = styled.span<{ $type: string }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme, $type }) =>
    $type === "income" ? theme.colors.primary : theme.colors.danger};
`;

