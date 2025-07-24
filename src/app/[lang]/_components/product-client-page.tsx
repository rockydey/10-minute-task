"use client";

import { useProductQuery } from "../_api/hooks";
import Loading from "./loading";

export default function ProductClientPage({ lang }: { lang: "en" | "bn" }) {
  const { data, isLoading } = useProductQuery(lang);

  if (isLoading) return <Loading />;

  return (
    <main>
      <h1>Hi</h1>
    </main>
  );
}
