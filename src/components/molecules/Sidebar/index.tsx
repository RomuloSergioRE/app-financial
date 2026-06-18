"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineXMark, HiOutlineArrowRightOnRectangle, HiOutlineUserCircle } from "react-icons/hi2";
import { PLAN_TIER } from "@/lib/permissions";
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

  const planLabel = user?.plan
    ? user.plan === "free" ? "Free" : user.plan === "pro" ? "Pro" : "Enterprise"
    : null;

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onToggle} />

      <S.Wrapper $isOpen={isOpen}>
        <S.Header>
          <S.Logo>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="20" height="20">
              <path d="M16 2L4 8v7c0 7.5 5.5 14.5 12 16 6.5-1.5 12-8.5 12-16V8L16 2z" fill="#3B82F6"/>
              <path d="M11 11h10v2L13 19h8v2H11v-2l8-6H11V11z" fill="#fff"/>
            </svg>
            ZenyFin
          </S.Logo>
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
            <S.UserMeta>
              <S.UserName>{user.name}</S.UserName>
              {planLabel && <S.PlanBadge>{planLabel}</S.PlanBadge>}
            </S.UserMeta>
          </S.UserInfo>
        )}

        <S.Nav>
          {items.map((item: NavItem) => {
            const isProItem = !!(item.planRequired && user?.plan && PLAN_TIER[user.plan as keyof typeof PLAN_TIER] < PLAN_TIER[item.planRequired]);

            return (
              <S.NavItem
                key={item.href}
                href={item.href}
                $active={isActive(item.href)}
                onClick={onToggle}
              >
                <span>{item.icon}</span>
                {item.label}
                {isProItem && <S.ProTag>Pro</S.ProTag>}
              </S.NavItem>
            );
          })}
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
