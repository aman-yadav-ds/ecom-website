"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  // Cookie Preferences State
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [optionalCookies, setOptionalCookies] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("koreva_cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleSavePreferences = () => {
    saveConsent(functionalCookies, optionalCookies);
  };

  const saveConsent = (functional: boolean, optional: boolean) => {
    const preferences = {
      necessary: true,
      functional,
      optional,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("koreva_cookie_consent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 md:p-8 pointer-events-none flex flex-col items-center">
      <div className="glass-panel-elevated backdrop-blur-3xl border border-white/95 shadow-2xl w-full max-w-4xl p-6 sm:p-8 pointer-events-auto flex flex-col font-jost relative rounded-3xl">
        {!showCustomize ? (
          // Main Banner View
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-extrabold text-dark-900 uppercase tracking-wide mb-2">We Value Your Privacy</h2>
              <p className="text-dark-600 text-xs sm:text-sm leading-relaxed mb-2 font-medium">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. 
              </p>
              <Link href="/cookies" className="text-brand-red text-xs sm:text-sm font-bold hover:underline">
                Read our Cookie Policy
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
              <button 
                onClick={() => setShowCustomize(true)}
                className="px-5 py-3 border border-light-300 hover:border-dark-900 text-dark-900 font-bold text-xs uppercase tracking-wider rounded-full transition-colors w-full sm:w-auto text-center"
              >
                Customize
              </button>
              <button 
                onClick={handleAcceptAll}
                className="px-7 py-3 bg-brand-red hover:bg-brand-red-accent text-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-colors shadow-md w-full sm:w-auto text-center active:scale-95"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Customize View
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-bold text-brand-dark uppercase tracking-wide mb-4">Cookie Preferences</h2>
            <p className="text-dark-700 text-sm mb-6">
              You can choose which categories of cookies you allow us to use. 
            </p>
            
            <div className="space-y-4 mb-8">
              {/* Strictly Necessary */}
              <div className="flex items-start justify-between p-4 bg-light-100 border border-light-300">
                <div className="pr-4">
                  <h3 className="font-bold text-dark-900 mb-1">Strictly Necessary Cookies</h3>
                  <p className="text-xs text-dark-700 leading-relaxed">
                    These cookies are essential for the website to function (e.g., product filters, comparison selections). They cannot be switched off.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-brand-red font-bold text-xs uppercase shrink-0 mt-1">
                  <Check className="w-4 h-4" /> Always Active
                </div>
              </div>

              {/* Functional / Profile */}
              <div className="flex items-start justify-between p-4 bg-white border border-light-300">
                <div className="pr-4">
                  <h3 className="font-bold text-dark-900 mb-1">Functional & Profile Cookies</h3>
                  <p className="text-xs text-dark-700 leading-relaxed">
                    These cookies allow the website to remember choices you make (like 'Join Us' form data or dealer network preferences) to provide enhanced, personalized features.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={functionalCookies}
                    onChange={(e) => setFunctionalCookies(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                </label>
              </div>

              {/* Optional / Analytics */}
              <div className="flex items-start justify-between p-4 bg-white border border-light-300">
                <div className="pr-4">
                  <h3 className="font-bold text-dark-900 mb-1">Optional & Analytics Cookies</h3>
                  <p className="text-xs text-dark-700 leading-relaxed">
                    These cookies help us understand how visitors interact with our website, discover errors, and provide a better overall analytics approach.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={optionalCookies}
                    onChange={(e) => setOptionalCookies(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-end">
              <button 
                onClick={() => setShowCustomize(false)}
                className="px-6 py-2.5 border border-dark-900 text-dark-900 font-bold uppercase text-sm hover:bg-light-200 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={handleSavePreferences}
                className="px-6 py-2.5 bg-brand-red text-white font-bold uppercase text-sm hover:bg-red-700 transition-colors shadow-md"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
