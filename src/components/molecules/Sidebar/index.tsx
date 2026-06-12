"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineXMark, HiOutlineArrowRightOnRectangle, HiOutlineUserCircle } from "react-icons/hi2";
import type { NavItem, SidebarProps } from "./types";
import * as S from "./style";

export const Sidebar = memo(function Sidebar({ items, isOpen, onToggle, onLogout, user }: SidebarProps) {
  const pathname = usePathname();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
            <HiOutlineXMark size={24} />
          </S.CloseButton>
        </S.Header>

        {user && (
          <S.UserInfo>
            <S.Avatar>
              {user.avatarUrl ? (
                <S.AvatarImage
                  src={`${apiUrl}${user.avatarUrl}`}
                  alt={user.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <S.AvatarFallback>
                  <HiOutlineUserCircle size={28} />
                </S.AvatarFallback>
              )}
            </S.Avatar>
            <S.UserName>{user.name}</S.UserName>
          </S.UserInfo>
        )}

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
