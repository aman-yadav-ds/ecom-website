import { InferInsertModel } from "drizzle-orm";
import { categories } from "../db/schema/categories";

export const exampleCategories: InferInsertModel<typeof categories>[] = [
  {
    id: "11111111-1111-1111-1111-111111111111", // Use a static UUID so products can easily reference it
    name: "Tractors",
    slug: "tractors",
    parentId: null, // Optional: reference another category ID here for subcategories
  }
];
