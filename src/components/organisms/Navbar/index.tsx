"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import * as S from "./styles";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Recursos", href: "#diferenciais" },
  { label: "Preços", href: "#planos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <S.Wrapper>
      <S.Container>
        <S.LeftGroup>
          <S.MenuButton
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </S.MenuButton>
          <S.Logo href="/">App Financial</S.Logo>
        </S.LeftGroup>

        <S.DesktopLinks>
          {NAV_LINKS.map((link) => (
            <S.NavLink key={link.href} href={link.href}>
              {link.label}
            </S.NavLink>
          ))}
        </S.DesktopLinks>

        <S.DesktopActions>
          <Button as={Link} href="/login" variant="outline" size="sm">
            Entrar
          </Button>
          <Button as={Link} href="/register" size="sm">
            Criar Conta
          </Button>
        </S.DesktopActions>
      </S.Container>

      <S.Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <S.MobileMenu $open={menuOpen}>
        <S.MobileHeader>
          <S.Logo href="/" onClick={() => setMenuOpen(false)}>
            App Financial
          </S.Logo>
          <S.MenuButton
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              width="24"
              height="24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </S.MenuButton>
        </S.MobileHeader>
        <S.MobileLinks>
          {NAV_LINKS.map((link) => (
            <S.MobileNavLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </S.MobileNavLink>
          ))}
          <S.MobileCtas>
            <Button as={Link} href="/login" variant="outline" style={{ width: "100%" }}>
              Entrar
            </Button>
            <Button as={Link} href="/register" style={{ width: "100%" }}>
              Criar Conta
            </Button>
          </S.MobileCtas>
        </S.MobileLinks>
      </S.MobileMenu>
    </S.Wrapper>
  );
}
