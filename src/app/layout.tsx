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
    default: "Koreva9 | Heavy Agriculture Implements & Farm Equipment Manufacturer",
    template: "%s | Koreva9 - Agriculture Machinery",
  },
  description:
    "Koreva Global LLP (Koreva9) is a leading Indian manufacturer of high-performance agricultural machinery, including Power Weeders, Laser Land Levellers, Disc Harrows, Agricultural Reapers, Lubricants, and Hand Tools.",
  keywords: [
    "Power Weeder",
    "Laser Land Leveller",
    "Disc Harrow",
    "Agricultural Reapers",
    "Farm Tools",
    "Koreva Global LLP",
    "Koreva9",
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
    title: "Koreva9 | Heavy Agriculture Implements & Farm Equipment Manufacturer",
    description:
      "Koreva Global LLP (Koreva9) manufactures high-performance Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, Lubricants, and Hand Tools.",
    url: "https://koreva9.com",
    siteName: "Koreva9",
    images: [
      {
        url: "/images/og-koreva9-default.jpg",
        width: 1200,
        height: 630,
        alt: "Koreva9 Agricultural Machinery & Farm Equipment Manufacturer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@koreva9",
    creator: "@koreva9",
    title: "Koreva9 | Heavy Agriculture Implements & Farm Equipment Manufacturer",
    description:
      "Koreva Global LLP (Koreva9) manufactures high-performance Power Weeders, Laser Land Levellers, Disc Harrows, Reapers, Lubricants, and Hand Tools.",
    images: ["/images/og-koreva9-default.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Koreva Global LLP",
  "alternateName": "Koreva9",
  "url": "https://koreva9.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://koreva9.com/trademark.webp",
    "width": 280,
    "height": 56
  },
  "foundingDate": "2018",
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
        {children}
      </body>
    </html>
  );
}

