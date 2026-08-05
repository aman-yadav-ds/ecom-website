import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { inArray } from "drizzle-orm";
import { products as productsTable } from "@/db/schema";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");
    if (!idsParam) {
      return NextResponse.json([]) as any;
    }

    const ids = idsParam.split(",").filter(Boolean);
    if (ids.length === 0) {
      return NextResponse.json([]) as any;
    }

    const db = await getDb();
    const fetchedProducts = await db.query.products.findMany({
      where: inArray(productsTable.id, ids),
      with: {
        variants: true,
      },
    });

    const mapped = ids
      .map((id) => {
        const product = fetchedProducts.find((p) => p.id === id);
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

    return NextResponse.json(mapped) as any;
  } catch (error) {
    console.error("[Products Summary API Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch products summary" },
      { status: 500 }
    ) as any;
  }
}
