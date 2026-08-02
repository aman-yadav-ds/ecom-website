import React from "react";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-4xl mx-auto glass-panel-elevated border border-light-300 p-8 sm:p-12 rounded-3xl shadow-md">
        <div className="flex items-center gap-3 mb-8 border-b border-light-300 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
            <Cookie size={20} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase">
            Cookies Policy
          </h1>
        </div>
        
        <div className="space-y-6 text-dark-700 leading-relaxed font-medium text-sm sm:text-base">
          <p>
            This Cookies Policy explains how <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong> ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-2">What are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-2">Why Do We Use Cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong className="text-dark-900 font-bold">Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website.</li>
            <li><strong className="text-dark-900 font-bold">Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website.</li>
            <li><strong className="text-dark-900 font-bold">Analytics and Customization Cookies:</strong> These cookies collect information that is used in aggregate form to help us understand website traffic.</li>
          </ul>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-2">How Can I Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies using our on-screen cookie preferences banner.
          </p>

          <div className="mt-8 p-4 bg-light-100 border-l-4 border-brand-red text-xs sm:text-sm rounded-r-2xl font-bold text-dark-800">
            <strong>Note:</strong> You can manage or reset your cookie preferences at any time.
          </div>
        </div>
      </div>
    </div>
  );
}
