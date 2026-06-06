"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import {
  HiOutlineViewColumns,
  HiOutlineUsers,
  HiOutlineFolderOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type { NavItem } from "@/components/molecules/Sidebar/types";

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Usuários", href: "/admin/usuarios", icon: <HiOutlineUsers size={20} /> },
  {
    label: "Categorias Globais",
    href: "/admin/categorias-globais",
    icon: <HiOutlineFolderOpen size={20} />,
  },
  {
    label: "Auditoria",
    href: "/admin/auditoria",
    icon: <HiOutlineClipboardDocumentList size={20} />,
  },
  { label: "Analytics", href: "/admin/analytics", icon: <HiOutlineChartBar size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout navItems={adminNavItems}>{children}</AppLayout>;
}
