import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes, ReactNode } from "react";

export interface IHeading extends HtmlHTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
}

export const Heading = ({
  as: Tag = "h1",
  children,
  className,
  ...props
}: IHeading) => {
  return (
    <Tag
      className={cn(
        "text-4xl sm:text-5xl text-pretty font-semibold tracking-tight text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
