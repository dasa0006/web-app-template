import { ReactNode } from "react";

interface SectionRendererProps {
  sections: ReactNode[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        return section;
      })}
    </>
  );
}
