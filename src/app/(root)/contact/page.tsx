import { Metadata } from "next";
import ContactUsPage from "../services-events/contact-us/page";

// This route is a URL alias for /services-events/contact-us.
// We suppress indexing here to prevent duplicate content; the canonical is /contact
// as declared in the contact-us page metadata.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default ContactUsPage;
