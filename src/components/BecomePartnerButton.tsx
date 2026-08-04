"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";

interface BecomePartnerButtonProps {
  className?: string;
  label?: string;
}

export function BecomePartnerButton({
  className = "bg-brand-red hover:bg-brand-red-accent text-white font-extrabold py-4 px-10 rounded-full transition-all duration-300 inline-flex items-center justify-center uppercase tracking-wider text-xs sm:text-sm gap-2.5 shadow-lg hover:shadow-brand-red/30 active:scale-95 cursor-pointer group",
  label = "Become a Partnered Dealer",
}: BecomePartnerButtonProps) {
  const { openJoinModal } = useModalStore();

  return (
    <button
      type="button"
      onClick={openJoinModal}
      className={className}
    >
      <span>{label}</span>
      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
