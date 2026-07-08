import { InferInsertModel } from "drizzle-orm";
import { variants } from "../db/schema/variants";

export const exampleVariants: InferInsertModel<typeof variants>[] = [
  {
    id: "33333333-3333-3333-3333-333333333333", // Static UUID 
    name: "Standard Model",
    productId: "22222222-2222-2222-2222-222222222222", // Refers to example product
    price: "350000.00",
    salePrice: "340000.00", // Optional
    applicableGst: "18",
    technicalDetails: {
      brand: "Koreva",
      model: "MINI-20HP",
      weight: "850 kg",
      warranty: "2 Years"
    },
  }
];
