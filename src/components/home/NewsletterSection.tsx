"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { sendNewsletterSubscriptionAction } from "@/app/actions/email";

export function NewsletterSection() {
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
        setStatus({ type: "success", message: res.message });
        setEmail("");
      } else {
        setStatus({ type: "error", message: res.message });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-dark-900 text-light-100 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Subtle Pattern / Decorative Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-dark-800/80 border border-dark-700/80 rounded-2xl p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/15 border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-wider mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Stay Informed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-light-100 mb-3 font-jost">
              Subscribe To <span className="text-brand-red">KOREVA</span> Newsletter
            </h2>
            <p className="text-dark-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-jost">
              Get seasonal crop advice, machinery maintenance checklists, and exclusive product launch announcements delivered straight to your inbox.
            </p>
          </div>

          {/* Form Content - Mobile First Stacked, Tablet/Desktop Side-by-Side */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
              <div className="relative flex-grow min-w-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-dark-500 shrink-0" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-dark-900 border border-dark-700 text-light-100 placeholder-dark-500 rounded-xl sm:rounded-l-xl sm:rounded-r-none py-3.5 pl-12 pr-4 text-sm sm:text-base font-jost focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red h-[52px] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 bg-brand-red hover:bg-brand-red-accent text-white font-bold text-sm uppercase tracking-wider rounded-xl sm:rounded-r-xl sm:rounded-l-none transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 h-[52px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Status Message Alert */}
            {status && (
              <div
                className={`mt-4 p-3.5 rounded-lg text-xs sm:text-sm font-jost flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300 ${
                  status.type === "success"
                    ? "bg-green-950/60 border border-green-800 text-green-300"
                    : "bg-red-950/60 border border-red-800 text-red-300"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <p className="text-[12px] text-dark-500 mt-3 text-center sm:text-left font-jost">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
