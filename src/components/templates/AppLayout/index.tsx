"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";
import { canAccess, getRequiredPlan, PLAN_TIER } from "@/lib/permissions";
import type { NavItem } from "@/components/molecules/Sidebar/types";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import * as S from "./style";

interface AppLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
}

export function AppLayout({ children, navItems }: AppLayoutProps) {
  const { isAuthenticated, initializing, role, plan, logout, user } = useAuth();
  const { requirePlan } = useUpgradeModal();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (initializing) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (role && !canAccess(role, pathname)) {
      router.replace("/dashboard");
      return;
    }

    const requiredPlan = getRequiredPlan(pathname);
    if (requiredPlan && requiredPlan !== "free" && plan && PLAN_TIER[plan] < PLAN_TIER[requiredPlan]) {
      requirePlan(requiredPlan);
    }
  }, [initializing, isAuthenticated, role, plan, pathname, router, requirePlan]);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  const handleToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      <S.TopBar>
        <S.HamburgerWrapper>
          <S.HamburgerButton
            $isOpen={sidebarOpen}
            onClick={handleToggle}
            aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            {sidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
          </S.HamburgerButton>
        </S.HamburgerWrapper>
        <S.TopBarTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18">
            <path d="M16 2L4 8v7c0 7.5 5.5 14.5 12 16 6.5-1.5 12-8.5 12-16V8L16 2z" fill="#3B82F6"/>
            <path d="M11 11h10v2L13 19h8v2H11v-2l8-6H11V11z" fill="#fff"/>
          </svg>
          ZenyFin
        </S.TopBarTitle>
      </S.TopBar>
      <S.LayoutWrapper>
        <Sidebar
          items={navItems}
          isOpen={sidebarOpen}
          onToggle={handleToggle}
          onLogout={handleLogout}
          user={user}
        />
        <S.Main>{children}</S.Main>
      </S.LayoutWrapper>
    </>
  );
}
