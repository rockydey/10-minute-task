"use client";

import Header from "./header";

export default function LangWrapper({
  lang,
  children,
}: {
  lang: "en" | "bn";
  children: React.ReactNode;
}) {
  return (
    <>
      <Header currentLang={lang} />
      {children}
    </>
  );
}
