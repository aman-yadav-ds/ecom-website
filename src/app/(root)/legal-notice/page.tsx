import React from "react";

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-light-100 py-16 px-4 font-jost">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-light-300">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black uppercase mb-8 border-b-2 border-brand-red inline-block pb-2">
          Legal Notice
        </h1>
        
        <div className="space-y-6 text-brand-dark leading-relaxed">
          <h2 className="text-xl font-bold text-brand-black uppercase mt-4 mb-2">Company Information</h2>
          <p>
            This website is owned and operated by:<br /><br />
            <strong>KOREVA GLOBAL LLP</strong><br />
            NH9 KICHHA RUDRAPUR ROAD, KISHANPUR<br />
            U.S.NAGAR, UTTARAKHAND, INDIA - 263148
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-2">Intellectual Property Rights</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of <strong>KOREVA GLOBAL LLP</strong> or its content suppliers and is protected by Indian and international copyright laws.
          </p>
          <p>
            <strong>KOREVA9</strong> is a registered trademark of KOREVA GLOBAL LLP. Any unauthorized use of this trademark is strictly prohibited.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-2">Disclaimer of Liability</h2>
          <p>
            The information contained on this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          
          <div className="mt-12 p-4 bg-light-200 border-l-4 border-brand-red text-sm">
            <strong>Note:</strong> This is a placeholder legal notice. Please consult with legal counsel to ensure all required corporate disclosures and liability limitations are accurate according to Indian law.
          </div>
        </div>
      </div>
    </div>
  );
}
