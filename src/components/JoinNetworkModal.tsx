"use client";

import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Briefcase, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import { useModalStore } from '@/store/useModalStore';
import { sendDealerRequestAction } from '@/app/actions/email';

export default function JoinNetworkModal() {
  const { isJoinModalOpen, closeJoinModal } = useModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    yearsExp: '',
    brands: ''
  });

  if (!isJoinModalOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await sendDealerRequestAction(formData);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          closeJoinModal();
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            address: '',
            yearsExp: '',
            brands: ''
          });
        }, 3500);
      } else {
        setErrorMessage(res.message || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-brand-black/70 backdrop-blur-sm" 
        onClick={closeJoinModal}
      />
      
      <div className="relative bg-light-100 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-300 sticky top-0 bg-light-100 z-10">
          <div>
            <h2 className="font-jost text-heading-3 md:text-2xl font-[700] text-brand-dark uppercase tracking-wider">
              Join Our Network
            </h2>
            <p className="font-jost text-sm text-dark-700 mt-1">
              Partner with KOREVA and expand your business with premium agriculture implements.
            </p>
          </div>
          <button 
            onClick={closeJoinModal}
            className="p-2 text-dark-700 hover:text-brand-red hover:bg-light-200 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CheckCircle2 size={64} className="text-green-600 mb-4" />
              <h3 className="font-jost text-2xl font-[700] text-brand-dark mb-2 uppercase">Application Submitted</h3>
              <p className="font-jost text-dark-700 max-w-sm text-sm">
                Thank you for your interest! Your dealership application has been forwarded to our sales team at <span className="font-bold text-brand-red">sales.koreva@gmail.com</span>. We will review your details and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-3 text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <Building2 size={16} /> Company/Dealership Name *
                  </label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <User size={16} /> Contact Person Name *
                  </label>
                  <input 
                    type="text" 
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <Mail size={16} /> Email Address *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <Phone size={16} /> Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                  <MapPin size={16} /> Full Address *
                </label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required 
                  rows={3} 
                  className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost resize-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <Briefcase size={16} /> Years of Experience *
                  </label>
                  <input 
                    type="number" 
                    name="yearsExp"
                    value={formData.yearsExp}
                    onChange={handleChange}
                    min="0" 
                    required 
                    placeholder="e.g. 5" 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-sm font-[600] text-brand-dark flex items-center gap-2">
                    <Tag size={16} /> Current Brands Handled
                  </label>
                  <input 
                    type="text" 
                    name="brands"
                    value={formData.brands}
                    onChange={handleChange}
                    placeholder="e.g. Honda, STIHL, Husqvarna" 
                    className="w-full bg-light-200 border border-light-300 rounded-sm py-2 px-3 focus:outline-none focus:border-brand-dark focus:bg-light-100 font-jost" 
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-4 border-t border-light-300 pt-6">
                <button 
                  type="button" 
                  onClick={closeJoinModal}
                  className="px-6 py-2.5 font-jost font-[600] text-brand-dark hover:bg-light-200 rounded-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-2.5 font-jost font-[600] uppercase tracking-wider bg-brand-red text-white hover:bg-brand-red-accent rounded-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
