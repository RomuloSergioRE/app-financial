"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/atoms/Button";
import * as S from "./styles";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const LOCALE_OPTIONS = [
    { value: "pt-BR", label: "Português (BR)" },
    { value: "en-US", label: "English (US)" },
    { value: "es-ES", label: "Español (ES)" },
  ];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const NAV_KEYS = [
    { key: "sobre", href: "#sobre" },
    { key: "recursos", href: "#diferenciais" },
    { key: "precos", href: "#planos" },
    { key: "depoimentos", href: "#depoimentos" },
    { key: "faq", href: "#faq" },
  ];

  return (
    <S.Wrapper>
      <S.Container>
        <S.LeftGroup>
          <S.MenuButton
            onClick={() => setMenuOpen(true)}
            aria-label={t("abrirMenu")}
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
          <S.Logo href="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" style={{ display: "block" }}>
              <path d="M16 2L4 8v7c0 7.5 5.5 14.5 12 16 6.5-1.5 12-8.5 12-16V8L16 2z" fill="#3B82F6"/>
              <path d="M11 11h10v2L13 19h8v2H11v-2l8-6H11V11z" fill="#fff"/>
            </svg>
            ZenyFin
          </S.Logo>
        </S.LeftGroup>

        <S.DesktopLinks>
          {NAV_KEYS.map((link) => (
            <S.NavLink key={link.href} href={link.href}>
              {t(link.key)}
            </S.NavLink>
          ))}
        </S.DesktopLinks>

        <S.DesktopActions>
          <S.LocaleSelect value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
            {LOCALE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </S.LocaleSelect>
          <Button as={Link} href="/login" variant="outline" size="sm">
            {t("entrar")}
          </Button>
          <Button as={Link} href="/register" size="sm">
            {t("criarConta")}
          </Button>
        </S.DesktopActions>
      </S.Container>

      <S.Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      <S.MobileMenu $open={menuOpen}>
        <S.MobileHeader>
          <S.Logo href="/" onClick={() => setMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20" style={{ display: "block" }}>
              <path d="M16 2L4 8v7c0 7.5 5.5 14.5 12 16 6.5-1.5 12-8.5 12-16V8L16 2z" fill="#3B82F6"/>
              <path d="M11 11h10v2L13 19h8v2H11v-2l8-6H11V11z" fill="#fff"/>
            </svg>
            ZenyFin
          </S.Logo>
          <S.MenuButton
            onClick={() => setMenuOpen(false)}
            aria-label={t("fecharMenu")}
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
          {NAV_KEYS.map((link) => (
            <S.MobileNavLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </S.MobileNavLink>
          ))}
          <S.MobileCtas>
            <S.LocaleSelect value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </S.LocaleSelect>
            <Button as={Link} href="/login" variant="outline" style={{ width: "100%" }}>
              {t("entrar")}
            </Button>
            <Button as={Link} href="/register" style={{ width: "100%" }}>
              {t("criarConta")}
            </Button>
          </S.MobileCtas>
        </S.MobileLinks>
      </S.MobileMenu>
    </S.Wrapper>
  );
}
