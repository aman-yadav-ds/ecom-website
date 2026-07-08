import { InferInsertModel } from "drizzle-orm";
import { products } from "../db/schema/products";

export const exampleProducts: InferInsertModel<typeof products>[] = [
  {
    id: "22222222-2222-2222-2222-222222222222", // Static UUID for variants and images to reference
    name: "Koreva Mini Tractor 20HP",
    description: "Compact tractor for small farms and orchards.",
    categoryId: "11111111-1111-1111-1111-111111111111", // Refers to example category
    isPublished: true,
    defaultVariantId: "33333333-3333-3333-3333-333333333333", // Refers to the primary variant
  }
];
