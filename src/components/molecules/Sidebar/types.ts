export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}
