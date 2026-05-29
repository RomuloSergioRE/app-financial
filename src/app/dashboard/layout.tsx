"use client";

import { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "@/components/molecules/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import type { NavItem } from "@/components/molecules/Sidebar/types";

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Perfil", href: "/dashboard/perfil", icon: "👤" },
  { label: "Categorias", href: "/dashboard/categorias", icon: "📁" },
  { label: "Transações", href: "/dashboard/transacoes", icon: "💳" },
  { label: "Configurações", href: "/dashboard/configuracoes", icon: "⚙️" },
];

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    padding-top: 64px;
  }
`;

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
    <LayoutWrapper>
      <Sidebar
        items={userNavItems}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />
      <Main>{children}</Main>
    </LayoutWrapper>
  );
}
