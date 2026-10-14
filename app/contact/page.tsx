import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getBusinessGmailHref, getBusinessOutlookHref, getEmailHref, getPhoneHref, getWhatsAppHref, siteConfig } from "@/lib/site";
import { Eyebrow } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact A To Z Exports for product sourcing, quotations and partnership enquiries. We respond within 1–2 business days.",
};

function ChannelCard({
  icon: Icon,
  label,
  value,
  href,
  external,
  note,
  alternatives,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
  note?: string;
  alternatives?: { label: string; href: string; external?: boolean }[];
}) {
  const valueLine = href ? (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="mt-1 block break-all text-[0.95rem] font-semibold text-forest-800 transition-opacity hover:opacity-80"
    >
      {value}
    </a>
  ) : (
    <span className="mt-1 block break-all text-[0.95rem] font-semibold text-forest-800">{value}</span>
  );
  return (
    <li className="rounded-2xl border border-forest-800/10 bg-white p-5">
      <div className="flex items-start gap-4">
        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-gold-300">
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-gold-600">{label}</span>
          {valueLine}
          {note ? <span className="mt-0.5 block text-xs text-charcoal-400">{note}</span> : null}
          {alternatives?.length ? (
            <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {alternatives.map((a) => (
                <a
                  key={a.label}
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="link-underline text-[0.7rem] font-bold uppercase tracking-[0.14em] text-forest-800"
                >
                  {a.label}
                </a>
              ))}
            </span>
          ) : null}
        </span>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const { contact } = siteConfig;
  const subject = "Business enquiry — A To Z Exports";
  const emailGmail = getBusinessGmailHref(subject);
  const emailOutlook = getBusinessOutlookHref(subject);
  const emailApp = getEmailHref(subject);
  const phoneHref = getPhoneHref();
  const whatsappHref = getWhatsAppHref("Hello A To Z Exports, I would like to enquire about your agricultural products.");

  return (
    <section aria-labelledby="contact-title" className="bg-ivory-100">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 id="contact-title" className="mt-4 font-serif text-4xl leading-tight text-balance text-forest-800 sm:text-5xl">
              Let&apos;s Talk About Your Requirements.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal-500 sm:text-lg">
              Send a business inquiry and our team will respond within 1–2
              business days. The more detail you share — product, specification,
              quantity, destination — the faster we can help.
            </p>
            <ul className="mt-8 space-y-4">
              <ChannelCard
                icon={Mail}
                label="Email"
                value={contact.email.value || contact.email.placeholder}
                href={emailGmail}
                external
                note={contact.email.value ? "Opens Gmail with a pre-addressed message" : "Business email — to be confirmed"}
                alternatives={[
                  ...(emailOutlook ? [{ label: "Open in Outlook", href: emailOutlook, external: true }] : []),
                  ...(emailApp ? [{ label: "Use another email app", href: emailApp }] : []),
                ]}
              />
              <ChannelCard
                icon={Phone}
                label="Phone"
                value={contact.phone.value || contact.phone.placeholder}
                href={phoneHref}
                note={contact.phone.value ? "Tap to call — opens your phone dialer" : "Phone number — to be confirmed"}
              />
              <ChannelCard
                icon={MessageCircle}
                label="WhatsApp"
                value={contact.whatsapp.value || contact.whatsapp.placeholder}
                href={whatsappHref}
                external
                note={contact.whatsapp.value ? "Fastest for quick questions — opens WhatsApp" : "WhatsApp number — to be confirmed"}
              />
              <ChannelCard
                icon={MapPin}
                label="Location"
                value={contact.address.value || contact.address.placeholder}
                href={null}
              />
            </ul>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-charcoal-400">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {contact.hours}. Contact details marked “to be confirmed” are
              placeholders until the business owner provides them.
            </p>
            <div className="mt-6 overflow-hidden rounded-2xl border border-forest-800/10 shadow-[0_20px_45px_-25px_rgba(23,61,43,0.5)]">
              <iframe
                title="Map — A To Z Exports, Alandi Road, Bhosari, Pune"
                src="https://www.google.com/maps?q=Alandi%20Road%2C%20Bhosari%2C%20Pune%2C%20Maharashtra%20411039&output=embed"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-forest-800/10 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(23,61,43,0.5)] sm:p-9">
              <h2 className="font-serif text-2xl text-forest-800">Business Inquiry Form</h2>
              <p className="mb-6 mt-1 text-sm text-charcoal-500">
                All fields marked * are required.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
