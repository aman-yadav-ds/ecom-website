import { InferInsertModel } from "drizzle-orm";
import { dealers } from "../db/schema/dealers";

export const exampleDealers: InferInsertModel<typeof dealers>[] = [
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "AgriTech Solutions",
    addressLine1: "123 Farm Road",
    addressLine2: "Industrial Area",
    addressLine3: "Ludhiana, Punjab",
    contactNo: "+91-9876543210",
    email: "contact@agritech.com",
    mapLink: "https://maps.google.com/?q=123+Farm+Road",
  }
];
