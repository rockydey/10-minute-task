"use client";

import { useProductQuery } from "../_api/hooks";

export default function ProductClientPage({ lang }: { lang: "en" | "bn" }) {
  const { data, isLoading } = useProductQuery(lang);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!data) return <p className="p-4">No product data found</p>;

  console.log(data);

  return (
    <div className="p-6 space-y-4">
      <h1>Hi</h1>
    </div>
  );
}
