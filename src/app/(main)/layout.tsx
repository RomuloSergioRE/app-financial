"use client";

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

const userNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <HiOutlineViewColumns size={20} /> },
  { label: "Perfil", href: "/perfil", icon: <HiOutlineUser size={20} /> },
  { label: "Categorias", href: "/categorias", icon: <HiOutlineFolderOpen size={20} /> },
  { label: "Tags", href: "/tags", icon: <HiOutlineTag size={20} /> },
  {
    label: "Orçamentos",
    href: "/orcamentos",
    icon: <HiOutlineCurrencyDollar size={20} />,
  },
  { label: "Metas", href: "/metas", icon: <HiOutlineTrophy size={20} /> },
  {
    label: "Recorrentes",
    href: "/regras-recorrentes",
    icon: <HiOutlineArrowPath size={20} />,
  },
  {
    label: "Organizações",
    href: "/organizacoes",
    icon: <HiOutlineBuildingOffice2 size={20} />,
  },
  { label: "Transações", href: "/transacoes", icon: <HiOutlineCreditCard size={20} /> },
  {
    label: "Configurações",
    href: "/configuracoes",
    icon: <HiOutlineCog6Tooth size={20} />,
  },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout navItems={userNavItems}>{children}</AppLayout>;
}
