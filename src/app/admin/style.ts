import styled from "styled-components";

export const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 64px;
  overflow-x: hidden;

  @media (min-width: 769px) {
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: 64px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
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
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: margin-left 0.3s ease;
  margin-left: ${({ $isOpen }) => ($isOpen ? "168px" : "0px")};
`;
