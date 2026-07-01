import React from "react";
import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-heading-3 md:text-[32px] md:leading-[40px] font-bold text-dark-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-body text-dark-500">
          Sign in to your Koreva account
        </p>
      </div>

      <AuthForm />
    </>
  );
}
