/**
 * Centralized Site Configuration & Official Contact Information for Koreva Global LLP (https://koreva9.com)
 * All contact details, official phone numbers, addresses, emails, and social handles are bound here.
 */

export const SITE_CONFIG = {
  name: "Koreva Global LLP",
  legalName: "Koreva Global LLP",
  brandName: "Koreva9",
  brandAliases: ["Koreva", "Koreva Agriculture", "Koreva Machines", "Koreva Global"],
  tagline: "Heavy-Duty Farm Machinery & STOU Lubricants",
  url: "https://koreva9.com",

  // Official Contact Information
  phone: {
    display: "+91 91052 99555",
    raw: "+919105299555",
    clean: "9105299555",
    telLink: "tel:+919105299555",
  },

  whatsapp: {
    number: "919105299555",
    defaultMessage: "Hi Koreva Team, I am interested in your agricultural machinery.",
    link: "https://wa.me/919105299555?text=Hi%20Koreva%20Team,%20I%20am%20interested%20in%20your%20agricultural%20machinery.",
  },

  email: {
    primary: "sales@koreva9.com",
    sales: "sales@koreva9.com",
    export: "export@koreva9.com",
    mailtoPrimary: "mailto:sales@koreva9.com",
  },

  address: {
    full: "Panchakki, Kichha Rudrapur Road, Distt. Udham Singh Nagar, Uttarakhand, India",
    street: "Panchakki, Kichha Rudrapur Road",
    district: "Distt. Udham Singh Nagar",
    city: "Rudrapur",
    state: "Uttarakhand",
    postalCode: "263148",
    country: "India",
    countryCode: "IN",
  },

  operatingHours: {
    days: "Monday – Saturday",
    hours: "10:00 AM – 6:00 PM IST",
    full: "Monday – Saturday: 10:00 AM – 6:00 PM IST",
  },

  social: {
    youtube: "https://www.youtube.com/@koreva9",
    facebook: "https://www.facebook.com/profile.php?id=61592533542061",
    instagram: "https://www.instagram.com/koreva_global/",
    twitter: "https://x.com/koreva9",
    linkedin: "https://www.linkedin.com/company/koreva9",
  },

  maps: {
    googleMapsUrl: "https://maps.app.goo.gl/NyPHE3a5nzvR4YJAA",
  },
} as const;

// Convenience exports for clean imports across components
export const OFFICIAL_PHONE_DISPLAY = SITE_CONFIG.phone.display;
export const OFFICIAL_TEL_LINK = SITE_CONFIG.phone.telLink;
export const OFFICIAL_WHATSAPP_LINK = SITE_CONFIG.whatsapp.link;
export const OFFICIAL_PRIMARY_EMAIL = SITE_CONFIG.email.primary;
export const OFFICIAL_EXPORT_EMAIL = SITE_CONFIG.email.export;
export const OFFICIAL_HQ_ADDRESS = SITE_CONFIG.address.full;
