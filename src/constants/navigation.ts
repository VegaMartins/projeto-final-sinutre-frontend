import type { Icon } from '@phosphor-icons/react';
import {
  AppleLogo,
  Barbell,
  ChartLineUp,
  Gear,
  House,
} from '@phosphor-icons/react';

export interface NavItem {
  id: string;
  label: string;
  Icon: Icon;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Início', Icon: House },
  { id: 'diet', label: 'Dieta', Icon: AppleLogo },
  { id: 'activities', label: 'Atividades', Icon: Barbell },
  { id: 'progress', label: 'Progresso', Icon: ChartLineUp },
  { id: 'settings', label: 'Configurações', Icon: Gear },
] as const;
