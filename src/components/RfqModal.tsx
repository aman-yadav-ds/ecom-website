"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRfqStore } from "@/store/useRfqStore";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Send,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building2,
  Mail,
  Phone,
  Globe,
  Sparkles,
  Loader2,
} from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Full Name is required"),
  companyName: z.string().trim().optional(),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(6, "Please enter a valid phone number"),
  countryOrRegion: z.string().trim().optional(),
  inquiryType: z.enum(["rfq", "sample", "custom_oem", "general"]),
  message: z.string().trim().min(5, "Please enter your requirements (at least 5 characters)"),
});

type FormData = z.infer<typeof formSchema>;

export default function RfqModal() {
  const { isOpen, closeModal, items, removeItem, updateQuantity, clear } = useRfqStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    countryOrRegion: "India",
    inquiryType: "rfq",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    const parseResult = formSchema.safeParse(formData);
    if (!parseResult.success) {
      const formattedErrors: Partial<Record<keyof FormData, string>> = {};
      parseResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FormData;
        if (fieldName) formattedErrors[fieldName] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        companyName: formData.companyName || undefined,
        email: formData.email,
        phone: formData.phone,
        countryOrRegion: formData.countryOrRegion || "India",
        inquiryType: formData.inquiryType,
        message: formData.message,
        items: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId || undefined,
          quantity: i.quantity,
        })),
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = (await res.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
        details?: string[];
      };

      if (res.ok && responseData.success) {
        setSubmitResult({
          type: "success",
          message: responseData.message || "Request submitted successfully! Our engineering team will contact you within 24 hours.",
        });
        clear();
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          countryOrRegion: "India",
          inquiryType: "rfq",
          message: "",
        });
        setTimeout(() => {
          closeModal();
          setSubmitResult(null);
        }, 3500);
      } else {
        setSubmitResult({
          type: "error",
          message: responseData.error || responseData.details?.join(", ") || "Failed to send quote request. Please try again.",
        });
      }
    } catch {
      setSubmitResult({
        type: "error",
        message: "Network error occurred. Please check your internet connection or call hotline +91 7455 973 188.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex justify-end font-jost">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 text-white flex items-center justify-between border-b border-light-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/20 border border-brand-red/30 flex items-center justify-center text-brand-red">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold uppercase tracking-wide">Request For Quote (RFQ)</h2>
              <p className="text-xs text-white/70">Direct Manufacturer Wholesale Pricing & Specs</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close RFQ Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Notification Alert */}
          {submitResult && (
            <div
              className={`p-4 rounded-2xl border flex items-start gap-3 text-sm font-medium ${
                submitResult.type === "success"
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : "bg-rose-50 border-rose-300 text-rose-900"
              }`}
            >
              {submitResult.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>{submitResult.message}</div>
            </div>
          )}

          {/* Section 1: Selected RFQ Items */}
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-light-200 pb-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-dark-900 flex items-center gap-2">
                <span>Selected Items for Quote</span>
                <span className="px-2 py-0.5 rounded-full bg-brand-red/10 text-brand-red text-xs">
                  {items.length}
                </span>
              </h3>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="text-xs font-bold text-dark-500 hover:text-brand-red transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="p-8 rounded-2xl bg-light-100/70 border border-light-300 border-dashed text-center">
                <p className="text-sm font-bold text-dark-700 mb-1">No machinery selected for RFQ cart yet</p>
                <p className="text-xs text-dark-500">
                  You can submit general inquiries below or browse products and click &quot;Request a Quote&quot;.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId || ""}`}
                    className="p-3.5 rounded-2xl bg-light-100/80 border border-light-300/80 flex items-center gap-4 hover:border-brand-red/30 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-light-300 shrink-0">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-light-200 text-xs font-bold text-dark-400">
                          KOREVA
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-dark-900 truncate">{item.name}</h4>
                      <p className="text-xs text-dark-500 font-medium">
                        ID: {item.productId} {item.variantId ? `(${item.variantId})` : ""}
                      </p>
                      {item.moq && (
                        <span className="inline-block mt-1 text-[10px] font-extrabold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full">
                          MOQ: {item.moq}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 border border-light-300 rounded-lg bg-white p-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1, item.variantId)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-dark-700 hover:bg-light-200 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-dark-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.variantId)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-dark-700 hover:bg-light-200 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="p-1.5 rounded-lg text-dark-400 hover:text-brand-red hover:bg-rose-50 transition-colors cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Buyer & Corporate Information Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-dark-900 border-b border-light-200 pb-2">
              Buyer &amp; Company Details
            </h3>

            {/* Row 1: Name & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Full Name <span className="text-brand-red">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-red ${
                    errors.fullName ? "border-rose-500 bg-rose-50/30" : "border-light-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Company / Organization
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Kisan Agro Enterprises"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-light-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                  <Building2 className="w-4 h-4 text-dark-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Email Address <span className="text-brand-red">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-red ${
                      errors.email ? "border-rose-500 bg-rose-50/30" : "border-light-300"
                    }`}
                  />
                  <Mail className="w-4 h-4 text-dark-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Phone / WhatsApp <span className="text-brand-red">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-red ${
                      errors.phone ? "border-rose-500 bg-rose-50/30" : "border-light-300"
                    }`}
                  />
                  <Phone className="w-4 h-4 text-dark-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Row 3: Country & Inquiry Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Country / Region
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="countryOrRegion"
                    value={formData.countryOrRegion}
                    onChange={handleChange}
                    placeholder="India / UAE / Kenya..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-light-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                  <Globe className="w-4 h-4 text-dark-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                  Inquiry Purpose
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-light-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-red font-medium"
                >
                  <option value="rfq">Bulk Wholesale Quote (RFQ)</option>
                  <option value="sample">Sample Order Request</option>
                  <option value="custom_oem">OEM &amp; Custom Manufacturing</option>
                  <option value="general">Dealership / General Inquiry</option>
                </select>
              </div>
            </div>

            {/* Row 4: Custom Message */}
            <div>
              <label className="text-xs font-bold text-dark-700 uppercase tracking-wider block mb-1">
                Custom Specifications &amp; Project Requirements <span className="text-brand-red">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Mention expected delivery timelines, target quantities, custom branding requirements, or specific attachments needed..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-red ${
                  errors.message ? "border-rose-500 bg-rose-50/30" : "border-light-300"
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request For Quote</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-dark-500 text-center mt-2 font-medium">
                ISO 9001:2015 Manufacturer Direct Guarantee. Your data is strictly confidential.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
