"use client";

import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Briefcase, Tag, CheckCircle2, AlertCircle, Handshake, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={closeJoinModal}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-light-300/80 flex flex-col my-auto z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Top Decorative Gradient Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-brand-red via-brand-red-accent to-red-600 w-full" />

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-light-300 bg-white sticky top-0 z-20 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-jost text-xl md:text-2xl font-bold text-brand-black uppercase tracking-wide">
                Join Our Network
              </h2>
              <p className="font-jost text-xs md:text-sm text-dark-700 mt-1 leading-relaxed">
                Partner with <span className="font-semibold text-brand-red">KOREVA</span> and expand your business with premium agricultural machinery.
              </p>
            </div>
          </div>
          <button 
            onClick={closeJoinModal}
            className="p-2 text-dark-700 hover:text-brand-red hover:bg-light-200 rounded-full transition-all shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 max-h-[calc(85vh-120px)] overflow-y-auto bg-white">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="font-jost text-2xl font-bold text-brand-black mb-3 uppercase tracking-wide">Application Received!</h3>
              <p className="font-jost text-dark-700 max-w-md text-sm md:text-base leading-relaxed">
                Thank you for your interest in partnering with KOREVA! Your dealership application has been successfully transmitted to our team. We will review your credentials and contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3 text-red-800 text-sm font-medium shadow-sm animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid 1: Company & Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Company / Dealership Name</span>
                    <span className="text-brand-red font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Agro Solutions Private Ltd"
                      required 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>
                
                {/* Contact Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Contact Person Name</span>
                    <span className="text-brand-red font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="text" 
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                      required 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>

              </div>

              {/* Grid 2: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-brand-red font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@agrosolutions.com"
                      required 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Phone Number</span>
                    <span className="text-brand-red font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      required 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>

              </div>

              {/* Full Address */}
              <div className="flex flex-col gap-2">
                <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                  <span>Full Address</span>
                  <span className="text-brand-red font-bold">*</span>
                </label>
                <div className="relative group">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete showroom/office street address, city, state, and pincode"
                    required 
                    rows={3} 
                    className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs resize-none" 
                  />
                </div>
              </div>

              {/* Grid 3: Experience & Brands */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Experience */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Years of Experience</span>
                    <span className="text-brand-red font-bold">*</span>
                  </label>
                  <div className="relative group">
                    <Briefcase className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="number" 
                      name="yearsExp"
                      value={formData.yearsExp}
                      onChange={handleChange}
                      min="0" 
                      required 
                      placeholder="e.g. 8" 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>
                
                {/* Brands Handled */}
                <div className="flex flex-col gap-2">
                  <label className="font-jost text-xs md:text-sm font-bold text-brand-dark uppercase tracking-wider flex items-center justify-between">
                    <span>Current Brands Handled</span>
                    <span className="text-dark-500 text-xs font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative group">
                    <Tag className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500 group-focus-within:text-brand-red transition-colors pointer-events-none" />
                    <input 
                      type="text" 
                      name="brands"
                      value={formData.brands}
                      onChange={handleChange}
                      placeholder="e.g. Honda, STIHL, Mahindra" 
                      className="w-full bg-light-200/80 focus:bg-white border border-light-300 rounded-xl py-3 pl-11 pr-4 font-jost font-medium text-brand-black text-sm md:text-base placeholder:text-dark-500 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all shadow-xs" 
                    />
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end gap-3 border-t border-light-300 pt-6">
                <button 
                  type="button" 
                  onClick={closeJoinModal}
                  className="px-6 py-3 font-jost font-semibold text-brand-dark hover:text-brand-red hover:bg-light-200 rounded-xl transition-all cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 font-jost font-bold uppercase tracking-wider bg-brand-red hover:bg-brand-red-accent text-white rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[150px] cursor-pointer text-sm"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
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
