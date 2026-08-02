"use client";

import React, { useState } from "react";
import { Plus, X, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: { category: string; items: FAQItem[] }[] = [
  {
    category: "General Inquiries",
    items: [
      {
        question: "Where are KOREVA products manufactured?",
        answer: "KOREVA is a national brand built on over 20 years of manufacturing experience. Our high-quality agricultural machinery, power weeders, disc harrows, and lubricants are designed and assembled locally in Uttarakhand to meet the rugged demands of domestic farming.",
      },
      {
        question: "How can I find an authorized local dealer?",
        answer: "You can use our 'Find a Dealer' page to locate one of our 500+ authorized sales and service representatives across India.",
      },
      {
        question: "How do I become an authorized KOREVA dealer?",
        answer: "We are actively looking for passionate partners to join our expanding dealer network. Submit your application through our 'Join Network' button, and our regional manager will contact you within 24 hours.",
      }
    ]
  },
  {
    category: "Product Maintenance & Care",
    items: [
      {
        question: "IMPORTANT: How should I store my Petrol Power Weeder when not in use?",
        answer: (
          <div className="bg-red-50 border-l-4 border-brand-red p-4 rounded-2xl text-red-950 my-1 font-medium text-xs sm:text-sm">
            <p className="mb-2 font-bold uppercase tracking-wider text-brand-red">
              Crucial Maintenance Tip regarding E20 Petrol:
            </p>
            <p className="mb-2">
              Due to the 20% Ethanol blend (E20) in standard petrol, it is critical that you do not leave fuel sitting in the carburetor for extended periods of inactivity.
            </p>
            <p>
              Ethanol-blended petrol attracts moisture, which chokes and damages precision carburetor jets. <strong>Always turn off the fuel valve and run the engine until it stops to completely empty the carburetor before long-term storage.</strong>
            </p>
          </div>
        ),
      },
      {
        question: "Are genuine spare parts readily available?",
        answer: "Yes! Because we maintain domestic assembly lines and a nationwide distribution hub, we stock complete inventories of replacement blades, carburetor kits, EP-90 gear oils, and cables at local dealer points.",
      },
      {
        question: "How often should I service my Tractor Attachments?",
        answer: "Perform a basic visual inspection before every field session (checking bolt torque and blade wear). Perform a complete lubricant change and service with your local authorized dealer at the end of every harvesting season.",
      }
    ]
  },
  {
    category: "Warranty & Support",
    items: [
      {
        question: "What does the KOREVA warranty cover?",
        answer: "Our standard warranty covers manufacturing defects, engine structural components, and gear transmission failures under normal agricultural operation. Refer to your product manual or warranty card for specific coverage periods.",
      },
      {
        question: "Who do I contact if my machine requires field service?",
        answer: "Contact the authorized KOREVA dealer where you purchased your equipment. They house certified technicians equipped with genuine factory parts.",
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("1-0"); // Open the Ethanol tip by default

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-dark-900 py-12 md:py-20 px-4 sm:px-6 lg:px-8 font-jost">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-brand-red/20 text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xs">
            <HelpCircle className="w-4 h-4" />
            <span>Help & Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 uppercase tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-dark-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Find answers to common questions about KOREVA machinery, E20 petrol maintenance tips, and our national dealer network.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-xl sm:text-2xl font-extrabold text-dark-900 uppercase mb-4 border-b border-light-300 pb-3 tracking-wide">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((item, itemIndex) => {
                  const id = `${groupIndex}-${itemIndex}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={id} 
                      className={`glass-panel border rounded-3xl transition-all duration-300 overflow-hidden ${
                        isOpen ? 'border-brand-red shadow-md bg-white' : 'border-light-300 hover:border-light-400 bg-white/80'
                      }`}
                    >
                      <button
                        className="w-full px-6 py-5 flex items-center justify-between focus:outline-none text-left cursor-pointer group"
                        onClick={() => toggleFAQ(id)}
                      >
                        <span className={`font-extrabold text-base md:text-lg pr-6 uppercase tracking-wide transition-colors ${isOpen ? 'text-brand-red' : 'text-dark-900'}`}>
                          {item.question}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-light-200 group-hover:bg-brand-red group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-xs">
                          {isOpen ? <X className="w-4 h-4 text-brand-red group-hover:text-white" /> : <Plus className="w-4 h-4 text-dark-700 group-hover:text-white" />}
                        </div>
                      </button>
                      <div 
                        className={`px-6 transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-[600px] pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                        }`}
                      >
                        <div className="text-dark-700 text-sm md:text-base leading-relaxed pt-3 border-t border-light-200 font-medium">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
