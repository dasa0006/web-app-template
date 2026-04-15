import { BRAND_NAME } from "@/lib/constants";

const Brand = () => (
  <span className="text-lg font-bold tracking-tight text-text-primary">
    {BRAND_NAME}<span className="text-brand-accent">.</span>
  </span>
);

export default Brand;
