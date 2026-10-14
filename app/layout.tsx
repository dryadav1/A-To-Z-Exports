import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSerifItalic = DM_Serif_Display({
  variable: "--font-dm-serif-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = siteConfig.siteUrl || undefined;

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title: {
    default: "A To Z Exports — From Indian Farms to Global Markets",
    template: "%s · A To Z Exports",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: baseUrl ? { canonical: "./" } : undefined,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "A To Z Exports — From Indian Farms to Global Markets",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "A To Z Exports — From Indian Farms to Global Markets",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    ...(baseUrl ? { url: baseUrl } : {}),
    areaServed: "Worldwide",
    email: siteConfig.contact.email.value || undefined,
    telephone: siteConfig.contact.phone.value || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Alandi Road, Bhosari",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411039",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSerifItalic.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory-100 text-charcoal-800">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <ScrollProgress />
        <Header />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
