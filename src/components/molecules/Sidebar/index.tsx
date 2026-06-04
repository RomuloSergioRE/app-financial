"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import type { NavItem, SidebarProps } from "./types";
import * as S from "./style";

export const Sidebar = memo(function Sidebar({ items, isOpen, onToggle, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onToggle} />

      <S.Wrapper $isOpen={isOpen}>
        <S.Header>
          <S.Logo>Financial</S.Logo>
          <S.CloseButton onClick={onToggle} aria-label="Fechar menu">
            <HiOutlineXMark size={20} />
          </S.CloseButton>
        </S.Header>

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
          <S.Divider />
          <S.LogoutButton onClick={onLogout}>
            <HiOutlineArrowRightOnRectangle size={20} />
            Sair
          </S.LogoutButton>
        </S.Nav>
      </S.Wrapper>
    </>
  );
});
