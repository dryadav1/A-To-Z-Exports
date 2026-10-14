/**
 * Central business configuration for A To Z Exports.
 *
 * TODO (owner — required before launch):
 *  - Set NEXT_PUBLIC_SITE_URL to the production domain (for canonical URLs + metadata).
 *  - Provide real contact details below (email, phone, WhatsApp, address).
 *  - Confirm product availability, grades, packaging and MOQs in `data/products.ts`.
 *  - Supply verified certifications / export markets if any (leave empty until verified).
 */

export const siteConfig = {
  name: "A To Z Exports",
  shortName: "A To Z",
  tagline: "From Indian Farms to Global Markets.",
  description:
    "A To Z Exports connects global buyers with carefully sourced Indian agricultural products through dependable supply, quality-focused processes, and long-term partnerships.",
  locale: "en_IN",
  // Only applied to metadata when NEXT_PUBLIC_SITE_URL is configured.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "",
  baseCity: "India",
  contact: {
    // Confirmed business details (owner-supplied). Phone doubles as WhatsApp.
    email: { value: "dryadav1275@gmail.com", placeholder: "info@atozexports.in" },
    phone: { value: "+91 9370514126", placeholder: "+91 XXXXX XXXXX" },
    whatsapp: { value: "+91 9370514126", placeholder: "+91 XXXXX XXXXX" },
    address: { value: "Alandi Road, Bhosari, Pune, Maharashtra – 411039", placeholder: "Address to be confirmed — India" },
    hours: "Monday – Saturday, 9:30 AM – 6:30 PM IST",
  },
  socials: [] as { label: string; href: string }[],
  // Trade licences & registrations. Numbers are shown only when `number`
  // is filled with a verified value. Empty number = "Available on request".
  // TODO (owner): fill `number` + `validUntil` for each licence below.
  licences: [
    {
      shortName: "IEC",
      fullName: "Importer Exporter Code",
      issuer: "DGFT, Government of India",
      description:
        "Mandatory registration for any business importing or exporting goods from India.",
      number: "",
      validUntil: "",
    },
    {
      shortName: "APEDA",
      fullName: "APEDA Registration (RCMC)",
      issuer: "Agricultural & Processed Food Products Export Development Authority",
      description:
        "Registration for export of scheduled agricultural and processed food products.",
      number: "",
      validUntil: "",
    },
    {
      shortName: "GST",
      fullName: "GST Registration",
      issuer: "Government of India",
      description:
        "Goods and Services Tax registration for domestic trade and export invoicing.",
      number: "",
      validUntil: "",
    },
  ],
  // Verified certifications only. Empty until evidence is supplied.
  certifications: [] as string[],
  // Confirmed destination markets only. Empty until supplied.
  exportMarkets: [] as string[],
} as const;

export type ContactChannel = keyof typeof siteConfig.contact;

function digits(value: string): string {
  return value.replace(/[^\d]/g, "");
}

/** `mailto:` link once a real email is configured, otherwise null. */
export function getEmailHref(subject?: string, body?: string): string | null {
  const email = siteConfig.contact.email.value;
  if (!email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ""}`;
}

/** `tel:` link once a real phone number is configured, otherwise null. */
export function getPhoneHref(): string | null {
  const phone = siteConfig.contact.phone.value;
  if (!phone) return null;
  return `tel:+${digits(phone)}`;
}

/** `wa.me` link once a real WhatsApp number is configured, otherwise null. */
export function getWhatsAppHref(message?: string): string | null {
  const number = siteConfig.contact.whatsapp.value;
  if (!number) return null;
  const base = `https://wa.me/${digits(number)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Gmail web-compose link — opens Gmail in any browser, so buyers without a
 * configured desktop mail app still reach us in one click.
 */
export function getGmailHref(to: string, subject?: string, body?: string): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** Outlook web-compose link — the non-Gmail one-click alternative. */
export function getOutlookHref(to: string, subject?: string, body?: string): string {
  const params = new URLSearchParams({ to });
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

/** Gmail compose addressed to the business inbox, or null until configured. */
export function getBusinessGmailHref(subject?: string, body?: string): string | null {
  const email = siteConfig.contact.email.value;
  if (!email) return null;
  return getGmailHref(email, subject, body);
}

/** Outlook compose addressed to the business inbox, or null until configured. */
export function getBusinessOutlookHref(subject?: string, body?: string): string | null {
  const email = siteConfig.contact.email.value;
  if (!email) return null;
  return getOutlookHref(email, subject, body);
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
  { label: "Quality & Standards", href: "/quality" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
