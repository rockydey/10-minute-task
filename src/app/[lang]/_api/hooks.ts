"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "./api";

export function useProductQuery(lang: "en" | "bn") {
  return useQuery<Record<string, unknown>>({
    queryKey: ["product", lang],
    queryFn: () => fetchProductData(lang),
  });
}
