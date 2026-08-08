"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Fast zero-dependency HTML escaping helper for email template strings
function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return match;
    }
  });
}

/**
 * Retrieve environment variables supporting both process.env and Cloudflare Worker context bindings
 */
async function getEnvVars(): Promise<{ apiKey: string; recipientEmail: string }> {
  let apiKey = process.env.RESEND_API_KEY;
  let recipientEmail = process.env.RECIPIENT_EMAIL;

  try {
    const { env } = await getCloudflareContext({ async: true });
    const cfEnv = env as unknown as Record<string, string | undefined>;
    if (!apiKey && cfEnv.RESEND_API_KEY) {
      apiKey = cfEnv.RESEND_API_KEY;
    }
    if (!recipientEmail && cfEnv.RECIPIENT_EMAIL) {
      recipientEmail = cfEnv.RECIPIENT_EMAIL;
    }
  } catch {
    // Ignore error if Cloudflare context is uninitialized (e.g., SSG build step or static evaluation)
  }

  return {
    apiKey: apiKey || "",
    recipientEmail: recipientEmail || "korevasales@gmail.com",
  };
}

// Reusable phone number validation schema enforcing a valid 10-digit mobile number
const phoneSchema = z
  .string()
  .trim()
  .transform((val) => val.replace(/[\s\-()]/g, ""))
  .pipe(
    z
      .string()
      .length(10, "Phone number must be exactly 10 digits")
      .regex(
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit mobile number (e.g. 9876543210)"
      )
  );

// Reusable email validation schema
const emailSchema = z.string().trim().email("Invalid email address").max(255);

// Module-level Zod schemas compiled ONCE to optimize Cloudflare Worker CPU execution (<10ms budget)
const dealerRequestSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(150),
  contactName: z.string().trim().min(1, "Contact name is required").max(150),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().trim().min(1, "Address is required").max(500),
  yearsExp: z.union([z.string(), z.number()]).transform((val) => String(val)),
  brands: z.string().trim().max(300).optional(),
});

const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
});

const contactUsSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(150),
  email: emailSchema,
  phone: phoneSchema,
  inquiryType: z.string().trim().min(1).max(100).default("General Inquiry"),
  subject: z.string().trim().max(200).optional().default("General Inquiry"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export interface DealerRequestData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  yearsExp: string | number;
  brands?: string;
}

export interface ActionResult {
  success: boolean;
  message: string;
}

/**
 * Server Action: Sends Dealer Joining Application details to recipient email via Resend SDK
 */
export async function sendDealerRequestAction(data: DealerRequestData): Promise<ActionResult> {
  try {
    const parsed = dealerRequestSchema.safeParse(data);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Invalid input data provided.";
      return { success: false, message: firstIssue };
    }
    const validatedData = parsed.data;

    const { apiKey, recipientEmail } = await getEnvVars();

    if (!apiKey) {
      console.error("[Server Action - Dealer Request] RESEND_API_KEY is not configured.");
      return {
        success: false,
        message: "Email service is temporarily unavailable. Please contact our support line directly.",
      };
    }

    if (apiKey.includes("demo")) {
      console.log("[Server Action - Dealer Request (Demo Mode)]", validatedData);
      return {
        success: true,
        message: "Application submitted successfully! (Demo mode active)",
      };
    }

    const submissionDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const safeCompanyName = escapeHtml(validatedData.companyName);
    const safeContactName = escapeHtml(validatedData.contactName);
    const safeEmail = escapeHtml(validatedData.email);
    const safePhone = escapeHtml(validatedData.phone);
    const safeAddress = escapeHtml(validatedData.address);
    const safeYearsExp = escapeHtml(validatedData.yearsExp);
    const safeBrands = validatedData.brands ? escapeHtml(validatedData.brands) : "N/A";

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #c81e1e; border-bottom: 2px solid #c81e1e; padding-bottom: 10px;">New Dealership Application</h2>
        <p style="font-size: 14px; color: #555;">A new dealer application has been submitted via the KOREVA website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Company / Dealership:</td>
            <td style="padding: 8px 0;">${safeCompanyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Contact Person:</td>
            <td style="padding: 8px 0;">${safeContactName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Full Address:</td>
            <td style="padding: 8px 0;">${safeAddress}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Years of Experience:</td>
            <td style="padding: 8px 0;">${safeYearsExp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Current Brands Handled:</td>
            <td style="padding: 8px 0;">${safeBrands}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Submitted At:</td>
            <td style="padding: 8px 0;">${submissionDate}</td>
          </tr>
        </table>
        
        <hr style="margin-top: 25px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">This is an automated notification from the KOREVA Website.</p>
      </div>
    `;

    let emailRes = await resend.emails.send({
      from: "KOREVA <send@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: validatedData.email,
      subject: `New Dealer Application - ${safeCompanyName}`,
      html: htmlContent,
    });

    if (emailRes.error) {
      console.warn("[Resend primary domain error, retrying with onboarding domain]", emailRes.error);
      emailRes = await resend.emails.send({
        from: "KOREVA <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: validatedData.email,
        subject: `New Dealer Application - ${safeCompanyName}`,
        html: htmlContent,
      });
    }

    if (emailRes.error) {
      console.error("[Resend Error - Dealer Action]", emailRes.error);
      return { success: false, message: `Email delivery failed: ${emailRes.error.message}` };
    }

    return {
      success: true,
      message: "Application submitted successfully! Our team will contact you shortly.",
    };
  } catch (error) {
    console.error("[Server Action - Dealer Exception]", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

/**
 * Server Action: Sends Newsletter Subscription notification to recipient email via Resend SDK
 */
export async function sendNewsletterSubscriptionAction(userEmail: string): Promise<ActionResult> {
  try {
    const parsed = newsletterSubscriptionSchema.safeParse({ email: userEmail });
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Please enter a valid email address.";
      return { success: false, message: firstIssue };
    }
    const validatedEmail = parsed.data.email;
    const safeEmail = escapeHtml(validatedEmail);

    const { apiKey, recipientEmail } = await getEnvVars();

    if (!apiKey) {
      console.error("[Server Action - Newsletter] RESEND_API_KEY is not configured.");
      return {
        success: false,
        message: "Subscription service is temporarily unavailable.",
      };
    }

    if (apiKey.includes("demo")) {
      console.log("[Server Action - Newsletter (Demo Mode)] Subscriber:", validatedEmail);
      return {
        success: true,
        message: "Subscribed successfully! Thank you for joining KOREVA updates.",
      };
    }

    const subscribedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #c81e1e; border-bottom: 2px solid #c81e1e; padding-bottom: 10px;">New Newsletter Subscription</h2>
        <p style="font-size: 14px; color: #555;">A new user has subscribed to the KOREVA newsletter updates.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Subscriber Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subscribed At:</td>
            <td style="padding: 8px 0;">${subscribedAt}</td>
          </tr>
        </table>
        
        <hr style="margin-top: 25px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">This is an automated notification from the KOREVA Website.</p>
      </div>
    `;

    let emailRes = await resend.emails.send({
      from: "KOREVA <sales@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: validatedEmail,
      subject: `New Newsletter Subscription - ${safeEmail}`,
      html: htmlContent,
    });

    if (emailRes.error) {
      console.warn("[Resend primary domain error, retrying with onboarding domain]", emailRes.error);
      emailRes = await resend.emails.send({
        from: "KOREVA <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: validatedEmail,
        subject: `New Newsletter Subscription - ${safeEmail}`,
        html: htmlContent,
      });
    }

    if (emailRes.error) {
      console.error("[Resend Error - Newsletter Action]", emailRes.error);
      return { success: false, message: `Failed to subscribe: ${emailRes.error.message}` };
    }

    return {
      success: true,
      message: "Subscribed successfully! Thank you for joining KOREVA updates.",
    };
  } catch (error) {
    console.error("[Server Action - Newsletter Exception]", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export interface ContactUsData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
}

/**
 * Server Action: Sends Contact Us inquiry details to recipient email via Resend SDK
 */
export async function sendContactUsAction(data: ContactUsData): Promise<ActionResult> {
  try {
    const parsed = contactUsSchema.safeParse(data);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Please fill in all required fields.";
      return { success: false, message: firstIssue };
    }
    const validatedData = parsed.data;

    const { apiKey, recipientEmail } = await getEnvVars();

    if (!apiKey) {
      console.error("[Server Action - Contact Us] RESEND_API_KEY is not configured.");
      return {
        success: false,
        message: "Contact service is temporarily unavailable. Please call our hotline (+91 7455 973 188) directly.",
      };
    }

    if (apiKey.includes("demo")) {
      console.log("[Server Action - Contact Us (Demo Mode)]", validatedData);
      return {
        success: true,
        message: "Thank you for contacting Koreva Global LLP! Our representative will respond within 24 hours.",
      };
    }

    const submissionDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const safeFullName = escapeHtml(validatedData.fullName);
    const safeEmail = escapeHtml(validatedData.email);
    const safePhone = escapeHtml(validatedData.phone);
    const safeInquiryType = escapeHtml(validatedData.inquiryType);
    const safeSubject = escapeHtml(validatedData.subject || "General Inquiry");
    const safeMessage = escapeHtml(validatedData.message);

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #a80000; border-bottom: 2px solid #a80000; padding-bottom: 10px;">New Contact Us Inquiry</h2>
        <p style="font-size: 14px; color: #555;">A new contact message was received via the Koreva9 Website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Inquiry Type:</td>
            <td style="padding: 8px 0;">${safeInquiryType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px 0;">${safeFullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px 0;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0;">${safeSubject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${safeMessage}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Submitted At:</td>
            <td style="padding: 8px 0;">${submissionDate}</td>
          </tr>
        </table>
        
        <hr style="margin-top: 25px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #888;">This is an automated notification from Koreva Global LLP website (Koreva9).</p>
      </div>
    `;

    let emailRes = await resend.emails.send({
      from: "Koreva9 Contact <info@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: validatedData.email,
      subject: `[Contact Form] ${safeInquiryType}: ${safeSubject}`,
      html: htmlContent,
    });

    if (emailRes.error) {
      console.warn("[Resend primary domain error, retrying with onboarding domain]", emailRes.error);
      emailRes = await resend.emails.send({
        from: "Koreva9 Contact <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: validatedData.email,
        subject: `[Contact Form] ${safeInquiryType}: ${safeSubject}`,
        html: htmlContent,
      });
    }

    if (emailRes.error) {
      console.error("[Resend Error - Contact Us]", emailRes.error);
      return { success: false, message: `Email delivery failed: ${emailRes.error.message}` };
    }

    return {
      success: true,
      message: "Thank you for contacting Koreva Global LLP! Our representative will respond within 24 hours.",
    };
  } catch (error) {
    console.error("[Server Action - Contact Us Exception]", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

