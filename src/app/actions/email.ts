"use server";

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
 * Server Action: Sends Dealer Joining Application details to sales.koreva@gmail.com via EmailJS REST API
 */
export async function sendDealerRequestAction(data: DealerRequestData): Promise<ActionResult> {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID || "service_koreva_demo";
    const templateId = process.env.EMAILJS_TEMPLATE_ID_DEALER || "template_dealer_demo";
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || "user_public_key_demo";
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || "";
    const recipientEmail = process.env.RECIPIENT_EMAIL || "sales.koreva@gmail.com";

    // Validate inputs
    if (!data.companyName || !data.contactName || !data.email || !data.phone || !data.address) {
      return { success: false, message: "Please fill in all required fields." };
    }

    const payload: Record<string, unknown> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: recipientEmail,
        company_name: data.companyName,
        contact_name: data.contactName,
        from_email: data.email,
        phone: data.phone,
        address: data.address,
        years_experience: data.yearsExp,
        brands_handled: data.brands || "N/A",
        submission_date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      },
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    // Call EmailJS REST API server-to-server
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // If demo credentials are in use, log and return graceful success for local testing
      if (serviceId.includes("demo") || publicKey.includes("demo")) {
        console.log("[Server Action - Dealer Request (Demo Mode)]", data);
        return {
          success: true,
          message: "Application submitted successfully! (Demo mode configured: update .env with live EmailJS keys)",
        };
      }
      console.error("[EmailJS Error - Dealer Action]", response.status, errorText);
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
 * Server Action: Sends Newsletter Subscription notification to sales.koreva@gmail.com via EmailJS REST API
 */
export async function sendNewsletterSubscriptionAction(userEmail: string): Promise<ActionResult> {
  try {
    if (!userEmail || !userEmail.includes("@")) {
      return { success: false, message: "Please enter a valid email address." };
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID || "service_koreva_demo";
    const templateId = process.env.EMAILJS_TEMPLATE_ID_NEWSLETTER || "template_newsletter_demo";
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || "user_public_key_demo";
    const privateKey = process.env.EMAILJS_PRIVATE_KEY || "";
    const recipientEmail = process.env.RECIPIENT_EMAIL || "sales.koreva@gmail.com";

    const payload: Record<string, unknown> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: recipientEmail,
        subscriber_email: userEmail,
        subscribed_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      },
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (serviceId.includes("demo") || publicKey.includes("demo")) {
        console.log("[Server Action - Newsletter (Demo Mode)] Subscriber:", userEmail);
        return {
          success: true,
          message: "Subscribed successfully! Thank you for joining KOREVA updates.",
        };
      }
      console.error("[EmailJS Error - Newsletter Action]", response.status, errorText);
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
