import { ReactNode } from "react";
import LangWrapper from "./_components/lang-wrapper";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en" | "bn" }>;
}) {
  const { lang } = await params;
  return <LangWrapper lang={lang}>{children}</LangWrapper>;
}
