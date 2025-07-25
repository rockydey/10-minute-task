export async function fetchProductData(lang: "en" | "bn") {
  const res = await fetch(
    `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=${lang}`,
    {
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();
  return data;
}
