export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  planRequired?: "free" | "pro" | "enterprise";
}

export interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  user?: {
    name: string;
    avatarUrl?: string | null;
    plan?: string | null;
  } | null;
}
