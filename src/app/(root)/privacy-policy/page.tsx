import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-light-100 py-16 px-4 font-jost">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-light-300">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black uppercase mb-8 border-b-2 border-brand-red inline-block pb-2">
          Privacy Policy
        </h1>
        
        <div className="space-y-6 text-brand-dark leading-relaxed">
          <p><strong>Effective Date:</strong> January 1, 2026</p>
          
          <p>
            At <strong>KOREVA GLOBAL LLP</strong> (operating under the brand name <strong>KOREVA9</strong>), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and physical address when you voluntarily submit it through our contact forms, newsletter sign-ups, or dealer registration processes.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-4">2. How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Respond to your inquiries and fulfill your requests.</li>
            <li>Send administrative information to you, such as changes to our terms, conditions, and policies.</li>
            <li>Process your dealer application or warranty registration.</li>
            <li>Send you marketing communications that we believe may be of interest to you.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-4">3. Data Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, loss, or misuse. However, please be aware that no data transmission over the Internet can be guaranteed to be 100% secure.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:<br /><br />
            <strong>KOREVA GLOBAL LLP</strong><br />
            NH9 KICHHA RUDRAPUR ROAD, KISHANPUR<br />
            U.S.NAGAR, UTTARAKHAND, INDIA - 263148
          </p>
          
          <div className="mt-12 p-4 bg-light-200 border-l-4 border-brand-red text-sm">
            <strong>Note:</strong> This is a placeholder privacy policy. Please consult with legal counsel to ensure compliance with applicable local and national data protection laws.
          </div>
        </div>
      </div>
    </div>
  );
}
