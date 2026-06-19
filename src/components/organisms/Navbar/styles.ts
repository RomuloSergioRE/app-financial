import styled from "styled-components";

export const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${({ theme }) => `${theme.colors.surface}dd`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.3s ease, border-color 0.3s ease;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg}`};
  height: 56px;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 1;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DesktopLinks = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const NavLink = styled.a`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transition.fast};
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const DesktopActions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: 99;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  z-index: 101;
  display: flex;
  flex-direction: column;
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform 0.3s ease;
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

export const MobileNavLink = styled.a`
  position: relative;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const MobileCtas = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;


