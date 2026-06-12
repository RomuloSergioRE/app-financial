"use client";

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

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Users", href: "/admin/users", icon: <HiOutlineUsers size={20} /> },
  {
    label: "Global Categories",
    href: "/admin/global-categories",
    icon: <HiOutlineFolderOpen size={20} />,
  },
  {
    label: "Audit",
    href: "/admin/audit",
    icon: <HiOutlineClipboardDocumentList size={20} />,
  },
  { label: "Analytics", href: "/admin/analytics", icon: <HiOutlineChartBarSquare size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRoles={["admin"]}>
      <AppLayout navItems={adminNavItems}>{children}</AppLayout>
    </RouteGuard>
  );
}
