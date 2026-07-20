"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: { category: string; items: FAQItem[] }[] = [
  {
    category: "General Inquiries",
    items: [
      {
        question: "Where are KOREVA9 products manufactured?",
        answer: "KOREVA9 is a newly launched, proud national brand built on over 20 years of industry experience. Our high-quality agricultural implements are designed and assembled locally to meet the specific, rugged demands of our domestic farming community.",
      },
      {
        question: "How can I find a local dealer?",
        answer: "You can use our 'Find a Dealer' page to locate one of our authorized representatives in your state. We are rapidly expanding our network across the country.",
      },
      {
        question: "How do I become an authorized KOREVA9 dealer?",
        answer: "We are actively looking for passionate partners to join our growing national network. You can click the 'Join Us' button at the top of the page to submit your dealership application, and our team will get in touch with you shortly.",
      }
    ]
  },
  {
    category: "Product Maintenance & Care",
    items: [
      {
        question: "IMPORTANT: How should I store my Petrol Power Weeder when not in use?",
        answer: (
          <div>
            <p className="mb-2">
              <strong>Crucial Maintenance Tip regarding E20 Petrol:</strong> Due to the recent addition of 20% Ethanol (E20) in standard petrol, it is absolutely critical that you do not leave fuel sitting in the carburetor for long periods of inactivity.
            </p>
            <p>
              If the machine is left with the carburetor switch ON while not in use for long periods, the ethanol-blended petrol will shock, choke, and severely damage the carburetor. <strong>Always turn off the fuel valve and run the engine until it stops to ensure the carburetor is completely empty before long-term storage.</strong>
            </p>
          </div>
        ),
      },
      {
        question: "Are spare parts readily available?",
        answer: "Yes! Because we are a domestic brand focused on national growth, we maintain a robust inventory of spare parts across our local dealer network. You won't have to wait months for international shipping.",
      },
      {
        question: "How often should I service my Tractor Attachments?",
        answer: "We recommend a basic visual inspection before every use (checking for loose bolts or worn blades). A comprehensive service by an authorized dealer should be performed at the end of every harvesting season.",
      }
    ]
  },
  {
    category: "Warranty & Support",
    items: [
      {
        question: "What does the KOREVA9 warranty cover?",
        answer: "Our standard warranty covers manufacturing defects and structural failures under normal agricultural use. For specific timeframes and conditions, please refer to our Warranty Conditions page or your product manual.",
      },
      {
        question: "Who do I contact if my machine breaks down?",
        answer: "Your first point of contact should always be the authorized KOREVA9 dealer where you purchased the equipment. They are fully trained to handle repairs and warranty claims.",
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
    <div className="min-h-screen bg-light-100 py-12 md:py-20 px-4 font-jost">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark uppercase tracking-wide mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-2 bg-brand-red mx-auto mb-6"></div>
          <p className="text-lg text-dark-700 max-w-2xl mx-auto">
            Find answers to common questions about KOREVA9 products, maintenance tips, and our dealer network.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-2xl font-bold text-brand-black uppercase mb-6 border-b border-light-300 pb-2">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((item, itemIndex) => {
                  const id = `${groupIndex}-${itemIndex}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={id} 
                      className={`bg-white border transition-all duration-300 overflow-hidden ${
                        isOpen ? 'border-brand-red shadow-md' : 'border-light-300 hover:border-dark-400'
                      }`}
                    >
                      <button
                        className="w-full px-6 py-5 flex items-center justify-between focus:outline-none text-left"
                        onClick={() => toggleFAQ(id)}
                      >
                        <span className={`font-bold text-lg pr-8 ${isOpen ? 'text-brand-red' : 'text-brand-dark'}`}>
                          {item.question}
                        </span>
                        <div className="shrink-0 relative w-6 h-6 flex items-center justify-center">
                          <Plus className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-50 text-brand-red' : 'opacity-100 rotate-0 scale-100 text-dark-700'}`} />
                          <X className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100 text-brand-red' : 'opacity-0 -rotate-90 scale-50 text-dark-700'}`} />
                        </div>
                      </button>
                      <div 
                        className={`px-6 transition-all duration-300 ease-in-out ${
                          isOpen ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
                        }`}
                      >
                        <div className="text-dark-700 leading-relaxed pt-2 border-t border-light-200">
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
