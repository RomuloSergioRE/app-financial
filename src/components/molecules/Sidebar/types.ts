export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface SidebarProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}
