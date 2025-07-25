import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { fetchProductData } from "./_api/api";
import ProductClientPage from "./_components/product-client-page";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: "en" | "bn" };
}) {
  const { lang } = await params;
  const data = await fetchProductData(lang);
  return {
    title: data.seo?.metaTitle || data.title,
    description: data.seo?.metaDescription || "",
  };
}

export default async function ProductSSRPage({
  params,
}: {
  params: { lang: "en" | "bn" };
}) {
  const queryClient = getQueryClient();
  const { lang } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["product", lang],
    queryFn: () => fetchProductData(lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClientPage lang={lang} />
    </HydrationBoundary>
  );
}
