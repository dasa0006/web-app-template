import {
  ChartLine,
  GlobeIcon,
  Menu,
  PuzzleIcon,
  ShieldIcon,
  UsersIcon,
  X,
  Zap,
} from "lucide-react";

export const ICON_MAP = {
  menu: <Menu />,
  menuClose: <X />,
  speed: <Zap aria-hidden="true" />,
  security: <ShieldIcon aria-hidden="true" />,
  integration: <PuzzleIcon aria-hidden="true" />,
  analytics: <ChartLine aria-hidden="true" />,
  team: <UsersIcon aria-hidden="true" />,
  global: <GlobeIcon aria-hidden="true" />,
} as const;

export type FeatureIconType = keyof typeof ICON_MAP;

export interface Feature {
  title: string;
  description: string;
  type?: FeatureIconType;
}

export function getFeatureIcon(type?: FeatureIconType) {
  return type ? (ICON_MAP[type] ?? ICON_MAP.speed) : ICON_MAP.speed;
}
