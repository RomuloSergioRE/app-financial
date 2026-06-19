"use client";

import { useTranslations } from "next-intl";
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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("sidebar");
  const { role, plan } = useAuth();

  const allNavItems: NavItem[] = [
    { label: t("dashboard"), href: "/dashboard", icon: <HiOutlineViewColumns size={20} /> },
    { label: t("transacoes"), href: "/transactions", icon: <HiOutlineCreditCard size={20} /> },
    { label: t("categorias"), href: "/categories", icon: <HiOutlineFolderOpen size={20} /> },
    { label: t("tags"), href: "/tags", icon: <HiOutlineTag size={20} />, planRequired: "pro" },
    { label: t("orcamentos"), href: "/budgets", icon: <HiOutlineCurrencyDollar size={20} />, planRequired: "pro" },
    { label: t("metas"), href: "/goals", icon: <HiOutlineTrophy size={20} />, planRequired: "pro" },
    { label: t("recorrentes"), href: "/recurring-rules", icon: <HiOutlineArrowPath size={20} />, planRequired: "pro" },
    { label: t("organizacoes"), href: "/organizations", icon: <HiOutlineBuildingOffice2 size={20} />, planRequired: "enterprise" },
    { label: t("perfil"), href: "/profile", icon: <HiOutlineUser size={20} /> },
    { label: t("configuracoes"), href: "/settings", icon: <HiOutlineCog6Tooth size={20} /> },
  ];

  const navItems = role ? filterNavItems(allNavItems, role, plan) : allNavItems;

  return <AppLayout navItems={navItems}>{children}</AppLayout>;
}
