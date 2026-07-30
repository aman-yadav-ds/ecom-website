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
    canonical: "./",
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
  "logo": "https://koreva9.com/icon.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7455973188",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"],
  },
  "sameAs": [
    "https://facebook.com",
    "https://twitter.com",
    "https://instagram.com",
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
      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden max-w-full">
        {children}
      </body>
    </html>
  );
}

