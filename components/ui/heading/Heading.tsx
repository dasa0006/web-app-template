import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes, ReactNode } from "react";

export interface IHeading extends HtmlHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Heading = ({ children, className, ...props }: IHeading) => {
  return (
    <h1
      className={cn(
        "text-4xl sm:text-5xl text-pretty font-semibold tracking-tight text-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
