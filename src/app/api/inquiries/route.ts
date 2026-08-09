import { NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { z } from "zod";

const inquiryItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

const inquiryPayloadSchema = z.object({
  fullName: z.string().trim().min(2, "Full Name is required"),
  companyName: z.string().trim().optional(),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(6, "Valid phone number is required"),
  countryOrRegion: z.string().trim().optional(),
  inquiryType: z
    .enum(["rfq", "sample", "custom_oem", "general"])
    .default("rfq"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
  items: z.array(inquiryItemSchema).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquiryPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation Error",
          details: parsed.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const db = await getDb();

    const newInquiryId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await db.insert(schema.inquiries).values({
      id: newInquiryId,
      fullName: data.fullName,
      companyName: data.companyName || null,
      email: data.email,
      phone: data.phone,
      countryOrRegion: data.countryOrRegion || "India",
      inquiryType: data.inquiryType,
      message: data.message,
      items: data.items || [],
      status: "new",
      notes: null,
      createdAt,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully. Our engineering sales team will contact you shortly.",
        id: newInquiryId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Inquiries API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
