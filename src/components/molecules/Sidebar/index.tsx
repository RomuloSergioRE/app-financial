"use client";

import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
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
        <HiOutlineBars3 size={24} />
      </S.Hamburger>

      <S.Overlay $isOpen={isOpen} onClick={onToggle} />

      <S.Wrapper $isOpen={isOpen}>
        <S.Logo>Financial App</S.Logo>

        <S.Nav>
          {items.map((item: NavItem) => (
            <S.NavItem
              key={item.href}
              href={item.href}
              $active={isActive(item.href)}
              onClick={onToggle}
            >
              <span>{item.icon}</span>
              {item.label}
            </S.NavItem>
          ))}
        </S.Nav>

        <S.LogoutButton onClick={onLogout}>
          <HiOutlineArrowRightOnRectangle size={20} />
          Sair
        </S.LogoutButton>
      </S.Wrapper>
    </>
  );
}
