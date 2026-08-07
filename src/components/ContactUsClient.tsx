"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { sendContactUsAction } from "@/app/actions/email";

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const res = await sendContactUsAction(formData);
      if (res.success) {
        setResultMessage({ type: "success", text: res.message });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          inquiryType: "General Inquiry",
          subject: "",
          message: "",
        });
      } else {
        setResultMessage({ type: "error", text: res.message });
      }
    } catch {
      setResultMessage({
        type: "error",
        text: "Something went wrong. Please call our hotline directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-jost bg-[#fbfbfb] text-dark-900 min-h-screen">
      {/* 1. Hero Banner */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-light-300 overflow-hidden bg-[#fbfbfb]">
        {/* Soft Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-red/8 rounded-full filter blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-brand-red" />
            <span>KOREVA GLOBAL LLP Corporate Headquarters</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase mb-4 text-dark-900">
            Get in Touch with <span className="text-brand-red">KOREVA</span>
          </h1>

          <p className="text-base sm:text-lg text-dark-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Have questions about our Power Weeders, Laser Land Levellers, Harrows, STOU Lubricants, or Dealership Opportunities? Our technical and sales engineers are here to assist you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 2. Quick Contact Stat Cards (Mobile-First 3-Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Phone Hotline */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                <PhoneCall className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-dark-500 block mb-1">
                Customer Support Hotline
              </span>
              <a
                href="tel:+917455973188"
                className="text-xl sm:text-2xl font-extrabold text-dark-900 hover:text-brand-red transition-colors block mb-2"
              >
                +91 7455 973 188
              </a>
              <p className="text-xs text-dark-600 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-red" />
                Monday – Saturday: 10:00 AM – 6:00 PM IST
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-light-200">
              <a
                href="tel:+917455973188"
                className="text-xs font-extrabold uppercase tracking-wider text-brand-red flex items-center gap-1 hover:underline"
              >
                <span>Call Customer Care</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Email Inquiry */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                <Mail className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-dark-500 block mb-1">
                Official Email Correspondence
              </span>
              <a
                href="mailto:info@koreva.com"
                className="text-xl sm:text-2xl font-extrabold text-dark-900 hover:text-brand-red transition-colors block mb-2"
              >
                info@koreva.com
              </a>
              <p className="text-xs text-dark-600 font-medium">
                Sales inquiries, bulk quotes, & technical documentation requests.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-light-200">
              <a
                href="mailto:info@koreva.com"
                className="text-xs font-extrabold uppercase tracking-wider text-brand-red flex items-center gap-1 hover:underline"
              >
                <span>Send Email</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Corporate Address */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-light-300/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-xs">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-dark-500 block mb-1">
                Manufacturing & Corporate Hub
              </span>
              <p className="text-sm font-extrabold text-dark-900 leading-snug mb-1 uppercase">
                KOREVA GLOBAL LLP
              </p>
              <p className="text-xs text-dark-600 leading-relaxed font-medium">
                NH 9, Kichha Rudrapur Road, Nearby Yes Bank, Kishanpur, Udham Singh Nagar, Uttarakhand - 263148, India
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-light-200">
              <a
                href="https://maps.app.goo.gl/NyPHE3a5nzvR4YJAA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold uppercase tracking-wider text-brand-red flex items-center gap-1 hover:underline"
              >
                <span>Open Google Maps</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3. Form & Direct Contact Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel-elevated p-6 sm:p-10 rounded-3xl border border-light-300 shadow-md">
            <div className="border-b border-light-200 pb-6 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-900 uppercase tracking-wide">
                Send Us an Inquiry
              </h2>
              <p className="text-sm text-dark-600 mt-1 font-medium">
                Fill out the form below. Our machinery specialist will contact you within 24 hours.
              </p>
            </div>

            {resultMessage && (
              <div
                className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border text-sm font-bold ${resultMessage.type === "success"
                  ? "bg-green-50 border-green-300 text-green-900"
                  : "bg-red-50 border-red-300 text-red-900"
                  }`}
              >
                {resultMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span>{resultMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type Selector */}
              <div>
                <label
                  htmlFor="inquiryType"
                  className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                >
                  Topic / Inquiry Type *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-bold focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                  required
                >
                  <option value="General Inquiry">General Machinery Inquiry</option>
                  <option value="Dealership Application">Dealership & Distribution Partner</option>
                  <option value="Machinery Quotation">Bulk Machinery Purchase & Quotation</option>
                  <option value="Spare Parts & Support">Spare Parts & Field Service Support</option>
                  <option value="Export Inquiry">International Export & Trade Desk</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Singh"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    minLength={10}
                    pattern="^(?:\+?91[\s-]?)?[6-9]\d{9}$|^\+?[1-9]\d{7,14}$"
                    title="Please enter a valid 10-digit mobile number (e.g. 9876543210 or +91 98765 43210)"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Quotation for 7HP Power Weeder"
                    className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-extrabold uppercase tracking-wider text-dark-900 mb-2"
                >
                  Your Message / Requirement Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your requirements, location, or machinery queries..."
                  required
                  className="w-full px-4 py-3.5 bg-white border border-light-300 rounded-2xl text-dark-900 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition-all shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red hover:bg-brand-red-accent text-white font-extrabold py-4 px-8 rounded-full shadow-md transition-all uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Specialized Departments & Facility Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Department Breakdown Box */}
            <div className="glass-panel border border-light-300 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
              <h3 className="text-xl font-extrabold uppercase tracking-wide border-b border-light-200 pb-3 flex items-center gap-2 text-dark-900">
                <Building2 className="w-5 h-5 text-brand-red" />
                <span>Specialized Departments</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm font-medium">
                <div className="border-b border-light-200 pb-3">
                  <span className="font-extrabold text-dark-900 block uppercase text-sm">
                    1. Sales & Dealership Network Desk
                  </span>
                  <p className="text-dark-600 mt-0.5">
                    For new dealer registrations, territory inquiries, and tractor attachment catalog orders.
                  </p>
                  <span className="text-brand-red font-bold block mt-1">
                    Email: info@koreva.com
                  </span>
                </div>

                <div className="border-b border-light-200 pb-3">
                  <span className="font-extrabold text-dark-900 block uppercase text-sm">
                    2. Spare Parts & Field Technical Support
                  </span>
                  <p className="text-dark-600 mt-0.5">
                    Order genuine replacement blades, carburetor kits, EP-90 gear oils, and operator manuals.
                  </p>
                  <span className="text-brand-red font-bold block mt-1">
                    Hotline: +91 7455 973 188
                  </span>
                </div>

                <div>
                  <span className="font-extrabold text-dark-900 block uppercase text-sm">
                    3. Global Export & Import Division
                  </span>
                  <p className="text-dark-600 mt-0.5">
                    International shipments of power weeders and SK5 hand tools across South Asia & Africa.
                  </p>
                  <span className="text-brand-red font-bold block mt-1">
                    Desk: export@koreva9.com
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Facility Showcase Image Box */}
            <div className="glass-card p-6 rounded-3xl border border-light-300 shadow-xs space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xs border border-light-200">
                <Image
                  src="/contact_address.webp"
                  alt="Koreva Global LLP Corporate Headquarters in Uttarakhand"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-dark-900 uppercase text-base">
                  Koreva Global LLP Manufacturing Facility
                </h3>
                <p className="text-xs text-dark-600 mt-1 leading-relaxed font-medium">
                  Located along NH 9 Kichha Rudrapur Road, Uttarakhand. Equipped with modern assembly lines and testing facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom FAQ Banner */}
        <div className="glass-panel border border-light-300 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-dark-900 uppercase">
                Looking for Quick Answers?
              </h3>
              <p className="text-xs sm:text-sm text-dark-600 font-medium">
                Check our Frequently Asked Questions section for maintenance, warranty, and spare part guidelines.
              </p>
            </div>
          </div>
          <Link
            href="/faq"
            className="px-6 py-3.5 bg-brand-black text-white hover:bg-brand-red font-extrabold text-xs uppercase tracking-wider rounded-full transition-all shrink-0 flex items-center gap-2 shadow-xs active:scale-95"
          >
            <span>Visit FAQ Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
