"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { NavItem, SidebarProps } from "./types";
import * as S from "./style";

export function Sidebar({ items, isOpen, onToggle, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      <S.Hamburger onClick={onToggle} aria-label="Abrir menu">
        ☰
      </S.Hamburger>

      <S.Overlay $isOpen={isOpen} onClick={onToggle} />

      <S.Wrapper $isOpen={isOpen}>
        <S.Logo>Financial App</S.Logo>

        <S.Nav>
          {items.map((item: NavItem) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <S.NavItem $active={isActive(item.href)} onClick={onToggle}>
                <span>{item.icon}</span>
                {item.label}
              </S.NavItem>
            </Link>
          ))}
        </S.Nav>

        <S.LogoutButton onClick={onLogout}>
          <span>🚪</span>
          Sair
        </S.LogoutButton>
      </S.Wrapper>
    </>
  );
}
