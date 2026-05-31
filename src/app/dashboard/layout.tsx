"use client";

import { useState } from "react";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import type { NavItem } from "@/components/molecules/Sidebar/types";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineViewColumns,
  HiOutlineUser,
  HiOutlineFolderOpen,
  HiOutlineCreditCard,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import * as S from "./style";

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Perfil", href: "/dashboard/perfil", icon: <HiOutlineUser size={20} /> },
  { label: "Categorias", href: "/dashboard/categorias", icon: <HiOutlineFolderOpen size={20} /> },
  { label: "Transações", href: "/dashboard/transacoes", icon: <HiOutlineCreditCard size={20} /> },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: <HiOutlineCog6Tooth size={20} /> },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      <S.HamburgerWrapper>
        <S.HamburgerButton
          $isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {sidebarOpen ? <HiOutlineXMark size={24} /> : <HiOutlineBars3 size={24} />}
        </S.HamburgerButton>
      </S.HamburgerWrapper>
      <S.LayoutWrapper>
        <Sidebar
          items={userNavItems}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
        />
        <S.Main>{children}</S.Main>
      </S.LayoutWrapper>
    </>
  );
}
