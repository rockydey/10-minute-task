import { ReactNode } from "react";

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: "en" | "bn" };
}) {
  return <>{children}</>;
}
