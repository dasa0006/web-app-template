import { MaxWidthWrapper } from "@/components/ui/maxWidthWrapper/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface IFooterLink {
  label: string;
  href: string;
}

export interface IFooterColumn {
  heading: string;
  links: IFooterLink[];
}

export interface ISocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface IFooter {
  brand: ReactNode;
  tagline?: string;
  columns?: IFooterColumn[];
  socialLinks?: ISocialLink[];
  legalLinks?: IFooterLink[];
  copyright?: string;
  className?: string;
}

const FooterLinkItem = ({ label, href }: IFooterLink) => (
  <li>
    <a
      href={href}
      className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-900"
    >
      {label}
    </a>
  </li>
);

export const Footer = ({
  brand,
  tagline,
  columns = [],
  socialLinks = [],
  legalLinks = [],
  copyright,
  className,
}: IFooter) => {
  return (
    <footer
      className={cn("w-full border-t border-zinc-100 bg-white", className)}
    >
      <MaxWidthWrapper>
        <div className="py-16">
          {/* Top: brand + columns */}
          <div
            className={cn(
              "grid grid-cols-2 gap-8",
              columns.length > 0
                ? "md:grid-cols-[2fr_repeat(var(--col-count),1fr)]"
                : ""
            )}
            style={{ "--col-count": columns.length } as React.CSSProperties}
          >
            {/* Brand block */}
            <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
              <div>{brand}</div>
              {tagline && (
                <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
                  {tagline}
                </p>
              )}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-3 mt-2">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-900"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Nav columns */}
            {columns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <FooterLinkItem key={link.label} {...link} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom: legal */}
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-400">{copyright}</p>
            {legalLinks.length > 0 && (
              <nav aria-label="Legal links">
                <ul className="flex flex-wrap gap-4">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-zinc-400 transition-colors duration-200 hover:text-zinc-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
