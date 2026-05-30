"use client";

import { useState } from "react";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import type { NavItem } from "@/components/molecules/Sidebar/types";
import {
  HiOutlineViewColumns,
  HiOutlineUsers,
} from "react-icons/hi2";
import * as S from "./style";

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Usuários", href: "/admin/usuarios", icon: <HiOutlineUsers size={20} /> },
];

export default function AdminLayout({
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
    <S.LayoutWrapper>
      <Sidebar
        items={adminNavItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />
      <S.Main>{children}</S.Main>
    </S.LayoutWrapper>
  );
}
