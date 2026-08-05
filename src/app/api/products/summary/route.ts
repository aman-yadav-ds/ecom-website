import { NextResponse } from "next/server";
import { getCachedPublishedProducts } from "@/lib/cached-queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");
    if (!idsParam) {
      return NextResponse.json([]);
    }

    const ids = idsParam.split(",").filter(Boolean);
    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    const idSet = new Set(ids);
    const allProducts = await getCachedPublishedProducts();
    const productMap = new Map<string, typeof allProducts[0]>();
    for (let i = 0; i < allProducts.length; i++) {
      if (idSet.has(allProducts[i].id)) {
        productMap.set(allProducts[i].id, allProducts[i]);
      }
    }

    const mapped = ids
      .map((id) => {
        const product = productMap.get(id);
        if (!product) return null;
        const variants = product.variants || [];
        const defaultVariant =
          variants.find((v) => v.id === product.defaultVariantId) || variants[0];
        return {
          id: product.id,
          name: product.name,
          image: product.coverImage || defaultVariant?.images?.[0] || "/placeholder.png",
          imageAlt: product.coverImageAlt || defaultVariant?.imagesAlt?.[0] || product.name,
        };
      })
      .filter(Boolean);

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("[Products Summary API Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch products summary" },
      { status: 500 }
    );
  }
}
