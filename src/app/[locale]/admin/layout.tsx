"use client";

import { useTranslations } from "next-intl";
import { AppLayout } from "@/components/templates/AppLayout";
import { RouteGuard } from "@/components/molecules/RouteGuard";
import {
  HiOutlineViewColumns,
  HiOutlineUsers,
  HiOutlineFolderOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineChartBarSquare,
} from "react-icons/hi2";
import type { NavItem } from "@/components/molecules/Sidebar/types";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const ts = useTranslations("sidebar");

  const adminNavItems: NavItem[] = [
    { label: ts("dashboard"), href: "/admin", icon: <HiOutlineViewColumns size={20} /> },
    { label: ts("usuarios"), href: "/admin/users", icon: <HiOutlineUsers size={20} /> },
    {
      label: ts("categoriasGlobais"),
      href: "/admin/global-categories",
      icon: <HiOutlineFolderOpen size={20} />,
    },
    {
      label: ts("auditoria"),
      href: "/admin/audit",
      icon: <HiOutlineClipboardDocumentList size={20} />,
    },
    { label: ts("analiticos"), href: "/admin/analytics", icon: <HiOutlineChartBarSquare size={20} /> },
  ];

  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AppLayout navItems={adminNavItems}>{children}</AppLayout>
    </RouteGuard>
  );
}
