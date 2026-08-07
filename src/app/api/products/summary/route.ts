import { NextResponse } from "next/server";
import { getCachedPublishedProducts } from "@/lib/cached-queries";
import { z } from "zod";

// Module-level Zod schema for query parameter validation (compiled once to keep CPU < 10ms limit)
const summaryQuerySchema = z.object({
  ids: z
    .string()
    .trim()
    .min(1)
    .transform((val) => val.split(",").map((s) => s.trim()).filter(Boolean))
    .pipe(z.array(z.string().min(1).max(100)).max(20, "Maximum 20 IDs allowed per request")),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rawIdsParam = searchParams.get("ids");
    if (!rawIdsParam) {
      return NextResponse.json([]);
    }

    const parsed = summaryQuerySchema.safeParse({ ids: rawIdsParam });
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request parameters" },
        { status: 400 }
      );
    }

    const ids = parsed.data.ids;
    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    const idSet = new Set(ids);
    const allProducts = await getCachedPublishedProducts();
    const productMap = new Map<string, (typeof allProducts)[0]>();
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
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
