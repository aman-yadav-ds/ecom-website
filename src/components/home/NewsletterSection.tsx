"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="relative w-full bg-[#fbfbfb] text-dark-900 py-16 sm:py-20 lg:py-24 overflow-hidden font-jost border-b border-light-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-red/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel border border-light-300 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
        >
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold uppercase tracking-widest mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>Stay Informed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-dark-900 mb-3">
              Subscribe To <span className="text-brand-red">KOREVA</span> Newsletter
            </h2>
            <p className="text-dark-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Get seasonal crop advice, machinery maintenance checklists, and exclusive product launch announcements delivered straight to your inbox.
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full lg:w-1/2 max-w-xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
              <div className="relative flex-grow min-w-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-dark-500 shrink-0" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-white border border-light-300 text-dark-900 placeholder-dark-400 rounded-2xl sm:rounded-r-none py-3.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red h-[52px] transition-all shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 bg-brand-red hover:bg-brand-red-accent text-white font-bold text-sm uppercase tracking-wider rounded-2xl sm:rounded-l-none transition-all shadow-md hover:shadow-brand-red/30 flex items-center justify-center gap-2 shrink-0 h-[52px] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group whitespace-nowrap active:scale-95"
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
                className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
                  status.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <p className="text-[12px] text-dark-500 mt-3 text-center sm:text-left font-medium">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}


