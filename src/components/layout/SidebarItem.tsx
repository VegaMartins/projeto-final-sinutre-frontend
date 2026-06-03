import type { Icon } from '@phosphor-icons/react';

interface SidebarItemProps {
  label: string;
  Icon: Icon;
  active?: boolean;
  expanded: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  label,
  Icon,
  active = false,
  expanded,
  onClick,
}: SidebarItemProps) {
  return (
    <li>
      <a
        href="#"
        onClick={onClick}
        className={`flex items-center gap-4 px-4 h-12 ${active ? 'active' : ''}`}
      >
        <Icon size={22} weight={active ? 'fill' : 'regular'} />
        {expanded && <span>{label}</span>}
      </a>
    </li>
  );
}
