import React from "react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-light-100 py-16 px-4 font-jost">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-light-300">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black uppercase mb-8 border-b-2 border-brand-red inline-block pb-2">
          Cookies Policy
        </h1>
        
        <div className="space-y-6 text-brand-dark leading-relaxed">
          <p>
            This Cookies Policy explains how <strong>KOREVA GLOBAL LLP</strong> ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-2">What are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-2">Why Do We Use Cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features.</li>
            <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use.</li>
            <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used, or to help us customize our website for you.</li>
          </ul>

          <h2 className="text-xl font-bold text-brand-black uppercase mt-8 mb-2">How Can I Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser controls. Since the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
          </p>

          <div className="mt-12 p-4 bg-light-200 border-l-4 border-brand-red text-sm">
            <strong>Note:</strong> This is a placeholder cookies policy. Ensure you have implemented an actual cookie consent banner if required by law and that this document accurately reflects the specific cookies your site uses.
          </div>
        </div>
      </div>
    </div>
  );
}
