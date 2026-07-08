import { InferInsertModel } from "drizzle-orm";
import { productImages } from "../db/schema/images";

export const exampleImages: InferInsertModel<typeof productImages>[] = [
  {
    id: "66666666-6666-6666-6666-666666666666",
    productId: "22222222-2222-2222-2222-222222222222",
    variantId: "33333333-3333-3333-3333-333333333333", // Optional: specify if image is variant-specific
    url: "/static/uploads/example-tractor.jpg",
    sortOrder: 0,
    isPrimary: true,
  }
];
