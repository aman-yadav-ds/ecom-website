import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#a80000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://koreva9.com"),
  title: {
    default: "Koreva Agriculture & Farm Machines | Koreva9",
    template: "%s",
  },
  description:
    "Buy high-performance Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, ISO Lubricants, and Hand Tools directly from official manufacturer Koreva9 (Koreva Global LLP).",
  keywords: [
    "Koreva9",
    "Koreva",
    "Koreva Agriculture",
    "Koreva Machines",
    "Koreva Global",
    "Koreva Global LLP",
    "Power Weeder",
    "Laser Land Leveller",
    "Disc Harrow",
    "Agricultural Reapers",
    "Farm Tools",
    "Agricultural Machinery Manufacturer",
    "Farm Equipment India",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Koreva Agriculture & Farm Machines | Koreva9",
    description:
      "Buy high-performance Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, ISO Lubricants, and Hand Tools directly from official manufacturer Koreva9.",
    url: "https://koreva9.com",
    siteName: "Koreva9",
    images: [
      {
        url: "/images/og-koreva9-default.jpg",
        width: 1200,
        height: 630,
        alt: "Koreva Agriculture & Farm Machines by Koreva Global LLP (Koreva9)",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@koreva9",
    creator: "@koreva9",
    title: "Koreva Agriculture & Farm Machines | Koreva Global LLP (Koreva9)",
    description:
      "Koreva Global LLP (Koreva Agriculture / Koreva Machines / Koreva9) manufactures high-performance Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, Lubricants, and Hand Tools.",
    images: ["/images/og-koreva9-default.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Koreva Global LLP",
  "legalName": "Koreva Global LLP",
  "alternateName": [
    "Koreva",
    "Koreva9",
    "Koreva Agriculture",
    "Koreva Machines",
    "Koreva Global"
  ],
  "url": "https://koreva9.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://koreva9.com/trademark.webp",
    "width": 280,
    "height": 56
  },
  "brand": {
    "@type": "Brand",
    "name": "Koreva9",
    "alternateName": ["Koreva Machines", "Koreva Agriculture", "Koreva", "Koreva Global"]
  },
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "NH 9, Kichha Rudrapur Road, Nearby Yes Bank, Kishanpur",
    "addressLocality": "Kichha",
    "addressRegion": "Udham Singh Nagar, Uttarakhand",
    "postalCode": "263148",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7455973188",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"],
  },
  "areaServed": {
    "@type": "Country",
    "name": "IN"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61592533542061",
    "https://www.instagram.com/koreva_global/",
    "https://x.com/koreva9"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jost.className} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbfbfb] text-[#080808] overflow-x-hidden max-w-full font-jost antialiased">
        <h1>Testing Deployment</h1>
        {children}
      </body>
    </html>
  );
}

