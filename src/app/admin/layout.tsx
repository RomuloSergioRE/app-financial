"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import type { NavItem } from "@/components/molecules/Sidebar/types";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineViewColumns,
  HiOutlineUsers,
  HiOutlineFolderOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineChartBar,
} from "react-icons/hi2";
import * as S from "./style";

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Usuários", href: "/admin/usuarios", icon: <HiOutlineUsers size={20} /> },
  { label: "Categorias Globais", href: "/admin/categorias-globais", icon: <HiOutlineFolderOpen size={20} /> },
  { label: "Auditoria", href: "/admin/auditoria", icon: <HiOutlineClipboardDocumentList size={20} /> },
  { label: "Analytics", href: "/admin/analytics", icon: <HiOutlineChartBar size={20} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);

  const handleToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      <S.HamburgerWrapper>
        <S.HamburgerButton
          $isOpen={sidebarOpen}
          onClick={handleToggle}
          aria-label="Abrir menu"
        >
          {sidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </S.HamburgerButton>
      </S.HamburgerWrapper>
      <S.LayoutWrapper>
        <Sidebar
          items={adminNavItems}
          isOpen={sidebarOpen}
          onToggle={handleToggle}
          onLogout={handleLogout}
        />
        <S.Main>{children}</S.Main>
      </S.LayoutWrapper>
    </>
  );
}
