"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { canAccess } from "@/lib/permissions";
import type { NavItem } from "@/components/molecules/Sidebar/types";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import * as S from "./style";

interface AppLayoutProps {
  children: ReactNode;
  navItems: NavItem[];
}

export function AppLayout({ children, navItems }: AppLayoutProps) {
  const { isAuthenticated, initializing, role, logout, user } = useAuth();
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
    }
  }, [initializing, isAuthenticated, role, pathname, router]);

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
        <S.TopBarTitle>Financial</S.TopBarTitle>
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
