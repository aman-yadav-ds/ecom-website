"use client";

import dynamic from "next/dynamic";

const CompareDrawer = dynamic(() => import("@/components/CompareDrawer"), {
  ssr: false,
});

export default function CompareDrawerWrapper() {
  return <CompareDrawer />;
}
