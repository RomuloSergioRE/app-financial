"use client";

import { useAuth } from "@/contexts/AuthContext";
import { filterNavItems } from "@/lib/permissions";
import { AppLayout } from "@/components/templates/AppLayout";
import {
  HiOutlineViewColumns,
  HiOutlineUser,
  HiOutlineFolderOpen,
  HiOutlineCreditCard,
  HiOutlineCog6Tooth,
  HiOutlineTag,
  HiOutlineCurrencyDollar,
  HiOutlineTrophy,
  HiOutlineArrowPath,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import type { NavItem } from "@/components/molecules/Sidebar/types";

const allNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Transactions", href: "/transactions", icon: <HiOutlineCreditCard size={20} /> },
  { label: "Categories", href: "/categories", icon: <HiOutlineFolderOpen size={20} /> },
  { label: "Tags", href: "/tags", icon: <HiOutlineTag size={20} />, planRequired: "pro" },
  { label: "Budgets", href: "/budgets", icon: <HiOutlineCurrencyDollar size={20} />, planRequired: "pro" },
  { label: "Goals", href: "/goals", icon: <HiOutlineTrophy size={20} />, planRequired: "pro" },
  { label: "Recurring", href: "/recurring-rules", icon: <HiOutlineArrowPath size={20} />, planRequired: "pro" },
  { label: "Organizations", href: "/organizations", icon: <HiOutlineBuildingOffice2 size={20} />, planRequired: "enterprise" },
  { label: "Profile", href: "/profile", icon: <HiOutlineUser size={20} /> },
  { label: "Settings", href: "/settings", icon: <HiOutlineCog6Tooth size={20} /> },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const navItems = role ? filterNavItems(allNavItems, role) : allNavItems;

  return <AppLayout navItems={navItems}>{children}</AppLayout>;
}
