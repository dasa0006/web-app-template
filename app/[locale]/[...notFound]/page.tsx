// app/[locale]/[...notFound]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAll() {
  notFound();
}