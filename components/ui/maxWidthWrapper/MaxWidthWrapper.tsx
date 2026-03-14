import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IMaxWidthWrapper {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({ className, children }: IMaxWidthWrapper) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-7xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};
