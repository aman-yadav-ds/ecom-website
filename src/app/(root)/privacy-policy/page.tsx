import React from "react";
import { ShieldCheck } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-4xl mx-auto glass-panel-elevated border border-light-300 p-8 sm:p-12 rounded-3xl shadow-md">
        <div className="flex items-center gap-3 mb-8 border-b border-light-300 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase">
            Privacy Policy
          </h1>
        </div>
        
        <div className="space-y-6 text-dark-700 leading-relaxed font-medium text-sm sm:text-base">
          <p><strong className="text-dark-900">Effective Date:</strong> January 1, 2026</p>
          
          <p>
            At <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong> (operating under the brand name <strong className="text-brand-red font-extrabold">KOREVA</strong>), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and physical address when you voluntarily submit it through our contact forms, newsletter sign-ups, or dealer registration processes.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Respond to your inquiries and fulfill your machinery requests.</li>
            <li>Send administrative information to you, such as changes to our terms, conditions, and policies.</li>
            <li>Process your dealer application or warranty registration.</li>
            <li>Send you marketing communications that we believe may be of interest to you.</li>
          </ul>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:<br /><br />
            <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong><br />
            NH9 KICHHA RUDRAPUR ROAD, KISHANPUR<br />
            U.S.NAGAR, UTTARAKHAND, INDIA - 263148
          </p>
          
          <div className="mt-8 p-4 bg-light-100 border-l-4 border-brand-red text-xs sm:text-sm rounded-r-2xl font-bold text-dark-800">
            <strong>Note:</strong> We comply with applicable Indian national data protection guidelines.
          </div>
        </div>
      </div>
    </div>
  );
}
