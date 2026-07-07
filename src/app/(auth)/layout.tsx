import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-light-100 font-jost">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-dark-900 text-light-100 flex-col justify-between p-12">
        <div>
          <Link href="/" className="inline-block bg-light-100 rounded-md p-2">
            <Image
              src="/trademark.webp"
              alt="Koreva Global Trademark"
              width={80}
              height={30}
              className="object-contain"
              style={{ height: "auto" }}
            />
          </Link>
        </div>

        <div className="max-w-md">
          <h1 className="text-heading-2 mb-6">Cultivate Success</h1>
          <p className="text-lead text-dark-500">
            Join thousands of farmers who trust Koreva Global for premium agriculture implements and performance needs.
          </p>
          <div className="flex gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-light-100"></div>
            <div className="w-2 h-2 rounded-full bg-dark-500"></div>
            <div className="w-2 h-2 rounded-full bg-dark-500"></div>
          </div>
        </div>

        <div className="text-footnote text-dark-500">
          © {new Date().getFullYear()} Koreva Global. All rights reserved.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}
