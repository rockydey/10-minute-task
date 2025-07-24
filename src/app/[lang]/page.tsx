import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { fetchProductData } from "./_api/api";
import ProductClientPage from "./_components/product-client-page";

export async function generateMetadata({
  params,
}: {
  params: { lang: "en" | "bn" };
}) {
  const data = await fetchProductData(params.lang);
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

  await queryClient.prefetchQuery({
    queryKey: ["product", params.lang],
    queryFn: () => fetchProductData(params.lang),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductClientPage lang={params.lang} />
    </HydrationBoundary>
  );
}
