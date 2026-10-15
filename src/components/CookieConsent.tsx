"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const emptySubscribe = () => () => {};

export default function CookieConsent() {
  const [userDismissed, setUserDismissed] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [isReadyToMount, setIsReadyToMount] = useState(false);
  
  // Cookie Preferences State
  const [functionalCookies, setFunctionalCookies] = useState(true);
  const [optionalCookies, setOptionalCookies] = useState(false);

  // Delay mounting on the client to guarantee 0 impact on mobile LCP measurement
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number })
        .requestIdleCallback(() => {
          setIsReadyToMount(true);
        }, { timeout: 1500 });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        }
      };
    } else {
      timerId = setTimeout(() => {
        setIsReadyToMount(true);
      }, 1500);
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }
  }, []);

  const hasConsent = React.useSyncExternalStore(
    emptySubscribe,
    () => Boolean(localStorage.getItem("koreva_cookie_consent")),
    () => true
  );

  const isVisible = isReadyToMount && !hasConsent && !userDismissed;

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
    setUserDismissed(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-2.5 sm:p-4 pointer-events-none flex justify-center font-jost">
      <div className="bg-white/95 backdrop-blur-xl border border-neutral-300/80 shadow-2xl w-full max-w-4xl p-3 sm:p-4 pointer-events-auto rounded-2xl flex flex-col relative text-xs">
        {!showCustomize ? (
          // Compact Sleek Bottom Bar Layout (<15% viewport height on mobile)
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-6 text-neutral-800">
            <div className="flex-1 text-[11px] sm:text-xs leading-relaxed text-center sm:text-left">
              <span>We use cookies to ensure optimal machinery browsing and telemetry. </span>
              <Link href="/cookies" prefetch={false} className="text-brand-red font-bold hover:underline inline-block ml-1">
                Cookie Policy
              </Link>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button 
                type="button"
                onClick={() => setShowCustomize(true)}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 border border-neutral-300 hover:border-neutral-800 text-neutral-800 font-bold text-[11px] sm:text-xs uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer"
              >
                Customize
              </button>
              <button 
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial px-4 py-1.5 bg-brand-red hover:bg-brand-deepred text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider rounded-lg transition-colors shadow-xs text-center active:scale-95 cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Customize View Modal / Expanded View
          <div className="flex flex-col w-full p-2">
            <h2 className="text-sm sm:text-base font-extrabold text-neutral-900 uppercase tracking-wide mb-2">Cookie Preferences</h2>
            <p className="text-neutral-600 text-xs mb-4">
              Select allowed cookie categories for your device:
            </p>
            
            <div className="space-y-2 mb-4">
              {/* Strictly Necessary */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                <div className="pr-2">
                  <h3 className="font-bold text-neutral-900 text-xs">Essential Operation</h3>
                  <p className="text-[10px] text-neutral-500">Required for RFQ and machinery comparison.</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red font-bold text-[10px] uppercase shrink-0">
                  <Check className="w-3.5 h-3.5" /> Always Active
                </div>
              </div>

              {/* Functional / Profile */}
              <div className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg">
                <div className="pr-2">
                  <h3 className="font-bold text-neutral-900 text-xs">Functional Settings</h3>
                  <p className="text-[10px] text-neutral-500">Remembers dealer locator preferences.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={functionalCookies}
                    onChange={(e) => setFunctionalCookies(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-red"></div>
                </label>
              </div>

              {/* Optional / Analytics */}
              <div className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 rounded-lg">
                <div className="pr-2">
                  <h3 className="font-bold text-neutral-900 text-xs">Analytics Telemetry</h3>
                  <p className="text-[10px] text-neutral-500">Helps us evaluate speed and site reliability.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={optionalCookies}
                    onChange={(e) => setOptionalCookies(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-red"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full justify-end">
              <button 
                type="button"
                onClick={() => setShowCustomize(false)}
                className="px-3.5 py-1.5 border border-neutral-300 text-neutral-800 font-bold uppercase text-[11px] rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button 
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-1.5 bg-brand-red text-white font-bold uppercase text-[11px] rounded-lg hover:bg-brand-deepred transition-colors shadow-xs cursor-pointer"
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
