"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";
import { sendNewsletterSubscriptionAction } from "@/app/actions/email";
import { motion } from "framer-motion";

export function ActionNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await sendNewsletterSubscriptionAction(email);
      if (res.success) {
        setStatus({ type: "success", message: res.message || "Thank you for subscribing to Koreva Global updates." });
        setEmail("");
      } else {
        setStatus({ type: "error", message: res.message || "Failed to subscribe. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-brand-surface border-t border-neutral-200 font-manrope">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Dealer Network Callout (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-brand-black text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg border border-neutral-800"
          >
            <div>
              <div className="inline-flex items-center space-x-2 text-brand-red text-[11px] font-bold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Pan-India Presence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3">
                Connect With An Authorized <br />
                <span className="text-brand-red">Koreva Dealer</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-medium">
                Locate your nearest authorized sales &amp; service center for equipment demonstrations, state subsidy documentation, and genuine spare parts.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
              <Link
                href="/dealers"
                prefetch={false}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded bg-brand-red hover:bg-brand-deepred text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Find Dealer Near You</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services-events/contact-us"
                prefetch={false}
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded border border-neutral-700 hover:border-neutral-500 text-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact HQ</span>
              </Link>
            </div>
          </motion.div>

          {/* Newsletter Subscription (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-neutral-200"
          >
            <div>
              <div className="inline-flex items-center space-x-2 text-brand-red text-[11px] font-bold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5" />
                <span>Agronomy &amp; Engineering Bulletin</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-brand-black mb-2">
                Subscribe to <span className="text-brand-red">Koreva Field Insights</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-medium">
                Receive seasonal crop preparation tips, maintenance guides, subsidy updates, and new machine launch alerts directly in your inbox.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-3 rounded text-xs sm:text-sm border border-neutral-300 bg-neutral-50 focus:bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red placeholder:text-neutral-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded bg-brand-red hover:bg-brand-deepred active:scale-98 text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow hover:shadow-md flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <span>{isSubmitting ? "Subscribing..." : "Join Newsletter"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {status && (
                <div
                  className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${
                    status.type === "success" ? "text-green-600" : "text-brand-red"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <p className="text-[11px] text-neutral-400 mt-3">
                No spam. Unsubscribe anytime with a single click.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
