import { ReactNode } from "react";
import Header from "./_components/header";

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: "en" | "bn" };
}) {
  return (
    <>
      <Header currentLang={params.lang} />
      {children}
    </>
  );
}
