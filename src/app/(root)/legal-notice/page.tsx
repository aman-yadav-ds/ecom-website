import React from "react";
import { Scale } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-4xl mx-auto glass-panel-elevated border border-light-300 p-8 sm:p-12 rounded-3xl shadow-md">
        <div className="flex items-center gap-3 mb-8 border-b border-light-300 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
            <Scale size={20} />
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-dark-900 uppercase">
            Legal Notice
          </h1>
        </div>
        
        <div className="space-y-6 text-dark-700 leading-relaxed font-medium text-sm sm:text-base">
          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-4 mb-2">Company Information</h2>
          <p>
            This website is owned and operated by:<br /><br />
            <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong><br />
            NH9 KICHHA RUDRAPUR ROAD, KISHANPUR<br />
            U.S.NAGAR, UTTARAKHAND, INDIA - 263148
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-2">Intellectual Property Rights</h2>
          <p>
            All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of <strong className="text-dark-900 font-extrabold">KOREVA GLOBAL LLP</strong> or its content suppliers and is protected by Indian and international copyright laws.
          </p>
          <p>
            <strong className="text-brand-red font-extrabold">KOREVA</strong> is a registered trademark of KOREVA GLOBAL LLP. Any unauthorized use of this trademark is strictly prohibited.
          </p>

          <h2 className="text-lg font-extrabold text-dark-900 uppercase mt-8 mb-2">Disclaimer of Liability</h2>
          <p>
            The information contained on this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>
          
          <div className="mt-8 p-4 bg-light-100 border-l-4 border-brand-red text-xs sm:text-sm rounded-r-2xl font-bold text-dark-800">
            <strong>Note:</strong> Corporate disclosures and liability limitations are subject to Indian jurisdiction laws.
          </div>
        </div>
      </div>
    </div>
  );
}
