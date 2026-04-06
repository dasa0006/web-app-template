import {
  BoltIcon,
  ChartIcon,
  GlobeIcon,
  PuzzleIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

export const ICON_MAP = {
  speed: <BoltIcon aria-hidden="true" />,
  security: <ShieldIcon aria-hidden="true" />,
  integration: <PuzzleIcon aria-hidden="true" />,
  analytics: <ChartIcon aria-hidden="true" />,
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
