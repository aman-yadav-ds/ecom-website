"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic to be implemented separately
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-caption text-dark-900">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
          required
          className="w-full px-4 py-3 border border-light-300 rounded-md bg-light-100 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-caption text-dark-900">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="minimum 8 characters"
            required
            minLength={8}
            className="w-full px-4 py-3 border border-light-300 rounded-md bg-light-100 text-body text-dark-900 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-900 focus:border-transparent transition-all pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-900 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-footnote text-dark-700 hover:text-dark-900 transition-colors">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-dark-900 text-light-100 rounded-md text-body-medium hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900 focus:ring-offset-2"
      >
        Sign In
      </button>
    </form>
  );
}
