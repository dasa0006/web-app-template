import { IFeatureGrid } from "./FeatureGrid";

const BoltIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PuzzleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

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
