import {
  BoltIcon,
  ChartIcon,
  GlobeIcon,
  PuzzleIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { IFeatureGrid } from "./FeatureGrid";

const base: IFeatureGrid = {
  eyebrow: "Why teams choose us",
  heading: "Everything you need. Nothing you don't.",
  subheading:
    "Built for how modern teams actually work — fast, collaborative, and distributed.",
  columns: 3,
  features: [
    {
      icon: <BoltIcon />,
      title: "Instant deployments",
      description:
        "Push to main and ship in seconds. Zero downtime, zero config. Your pipeline, handled.",
    },
    {
      icon: <ShieldIcon />,
      title: "Enterprise-grade security",
      description:
        "SOC 2 Type II, SSO, audit logs, and role-based access — security that scales with you.",
    },
    {
      icon: <PuzzleIcon />,
      title: "150+ integrations",
      description:
        "Connect to the tools you already use. GitHub, Slack, Jira, Linear — all in one click.",
    },
    {
      icon: <ChartIcon />,
      title: "Real-time analytics",
      description:
        "Understand what's happening the moment it happens. Dashboards that actually answer questions.",
    },
    {
      icon: <UsersIcon />,
      title: "Built for teams",
      description:
        "Permissions, workspaces, and collaboration tools designed for teams of 2 to 2,000.",
    },
    {
      icon: <GlobeIcon />,
      title: "Global infrastructure",
      description:
        "Deployed across 30+ regions. Sub-100ms response times for users wherever they are.",
    },
  ],
};

export const mockFeatureGridProps = base;

export const mockFeatureGridTwoCol: IFeatureGrid = {
  ...base,
  columns: 2,
  features: base.features.slice(0, 4),
};
