"use server";

import { Resend } from "resend";

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
 * Server Action: Sends Dealer Joining Application details to sales.koreva@gmail.com via Resend SDK
 */
export async function sendDealerRequestAction(data: DealerRequestData): Promise<ActionResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY || "";
    const recipientEmail = process.env.RECIPIENT_EMAIL || "sales.koreva@gmail.com";

    // Validate inputs
    if (!data.companyName || !data.contactName || !data.email || !data.phone || !data.address) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const submissionDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Fallback/demo mode handling if API key is unconfigured or a demo placeholder
    if (!apiKey || apiKey.includes("demo")) {
      console.log("[Server Action - Dealer Request (Demo Mode)]", data);
      return {
        success: true,
        message: "Application submitted successfully! (Demo mode configured: update .env with live Resend API key)",
      };
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #c81e1e; border-bottom: 2px solid #c81e1e; padding-bottom: 10px;">New Dealership Application</h2>
        <p style="font-size: 14px; color: #555;">A new dealer application has been submitted via the KOREVA website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Company / Dealership:</td>
            <td style="padding: 8px 0;">${data.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Contact Person:</td>
            <td style="padding: 8px 0;">${data.contactName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Full Address:</td>
            <td style="padding: 8px 0;">${data.address}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Years of Experience:</td>
            <td style="padding: 8px 0;">${data.yearsExp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Current Brands Handled:</td>
            <td style="padding: 8px 0;">${data.brands || "N/A"}</td>
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

    const { error } = await resend.emails.send({
      from: "KOREVA <send@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: data.email,
      subject: `New Dealer Application - ${data.companyName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error - Dealer Action]", error);
      return { success: false, message: "Failed to send email. Please try again later." };
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
 * Server Action: Sends Newsletter Subscription notification to sales.koreva@gmail.com via Resend SDK
 */
export async function sendNewsletterSubscriptionAction(userEmail: string): Promise<ActionResult> {
  try {
    if (!userEmail || !userEmail.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const apiKey = process.env.RESEND_API_KEY || "";
    const recipientEmail = process.env.RECIPIENT_EMAIL || "sales.koreva@gmail.com";
    const subscribedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Fallback/demo mode handling if API key is unconfigured or a demo placeholder
    if (!apiKey || apiKey.includes("demo")) {
      console.log("[Server Action - Newsletter (Demo Mode)] Subscriber:", userEmail);
      return {
        success: true,
        message: "Subscribed successfully! Thank you for joining KOREVA updates.",
      };
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #c81e1e; border-bottom: 2px solid #c81e1e; padding-bottom: 10px;">New Newsletter Subscription</h2>
        <p style="font-size: 14px; color: #555;">A new user has subscribed to the KOREVA newsletter updates.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Subscriber Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${userEmail}">${userEmail}</a></td>
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

    const { error } = await resend.emails.send({
      from: "KOREVA <sales@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: userEmail,
      subject: `New Newsletter Subscription - ${userEmail}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error - Newsletter Action]", error);
      return { success: false, message: "Failed to subscribe. Please try again later." };
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
 * Server Action: Sends Contact Us inquiry details to sales.koreva@gmail.com via Resend SDK
 */
export async function sendContactUsAction(data: ContactUsData): Promise<ActionResult> {
  try {
    const apiKey = process.env.RESEND_API_KEY || "";
    const recipientEmail = process.env.RECIPIENT_EMAIL || "sales.koreva@gmail.com";

    if (!data.fullName || !data.email || !data.phone || !data.message) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const submissionDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    if (!apiKey || apiKey.includes("demo")) {
      console.log("[Server Action - Contact Us (Demo Mode)]", data);
      return {
        success: true,
        message: "Thank you for contacting Koreva Global LLP! Our representative will respond within 24 hours.",
      };
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #a80000; border-bottom: 2px solid #a80000; padding-bottom: 10px;">New Contact Us Inquiry</h2>
        <p style="font-size: 14px; color: #555;">A new contact message was received via the Koreva9 Website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px;">Inquiry Type:</td>
            <td style="padding: 8px 0;">${data.inquiryType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
            <td style="padding: 8px 0;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px 0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0;">${data.subject || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; white-space: pre-wrap;">${data.message}</td>
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

    const { error } = await resend.emails.send({
      from: "Koreva9 Contact <info@mail.koreva9.com>",
      to: [recipientEmail],
      replyTo: data.email,
      subject: `[Contact Form] ${data.inquiryType}: ${data.subject || data.fullName}`,
      html: htmlContent,
    });

    if (error) {
      console.error("[Resend Error - Contact Us]", error);
      return { success: false, message: "Failed to send your message. Please call our support line." };
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
