"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCompareStore } from "@/store/useCompareStore";

export default function CompareBackButton() {
  const router = useRouter();
  const clearAll = useCompareStore((state) => state.clearAll);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    clearAll();
    router.push("/products");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm font-medium text-dark-700 hover:text-brand-red transition-colors mb-8 cursor-pointer border-0 bg-transparent"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to previous page</span>
    </button>
  );
}
