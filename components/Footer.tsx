import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { categories } from "@/data/products";
import { getBusinessGmailHref, getPhoneHref, getWhatsAppHref, navLinks, siteConfig } from "@/lib/site";
import { Logo } from "./Logo";
import { CopyrightYear } from "./CopyrightYear";

function ContactRow({
  icon,
  label,
  display,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  display: string;
  href?: string | null;
  external?: boolean;
}) {
  const body = (
    <span>
      <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ivory-100/50">
        {label}
      </span>
      {display}
    </span>
  );
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-ivory-100/75">
      <span aria-hidden="true" className="mt-0.5 text-gold-300">{icon}</span>
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="transition-colors hover:text-ivory-100 hover:underline hover:decoration-gold-400 hover:underline-offset-4"
        >
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}

export function Footer() {
  const { contact } = siteConfig;
  return (
    <footer className="bg-forest-950 text-ivory-100" aria-label="Footer">
      {/* Gold hairline */}
      <div aria-hidden="true" className="h-[3px] bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory-100/70">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.24em] text-gold-300">
            Built on quality · Driven by trust
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ivory-100/85">
            IEC · APEDA · GST Registered
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-300">
            Company
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ivory-100/75 transition-colors hover:text-ivory-100">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/request-a-quote" className="text-sm text-ivory-100/75 transition-colors hover:text-ivory-100">
                Request a Quote
              </Link>
            </li>
            <li>
              <Link href="/quality#licences-heading" className="text-sm text-ivory-100/75 transition-colors hover:text-ivory-100">
                Licences &amp; Registrations
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Product categories">
          <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-300">
            Products
          </h3>
          <ul className="mt-5 space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="text-sm text-ivory-100/75 transition-colors hover:text-ivory-100"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gold-300">
            Contact
          </h3>
          <ul className="mt-5 space-y-4">
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              display={contact.email.value || `${contact.email.placeholder} (to be confirmed)`}
              href={getBusinessGmailHref("Business enquiry — A To Z Exports")}
              external
            />
            <ContactRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              display={contact.phone.value || `${contact.phone.placeholder} (to be confirmed)`}
              href={getPhoneHref()}
            />
            <ContactRow
              icon={<MessageCircle className="h-4 w-4" />}
              label="WhatsApp"
              display={contact.whatsapp.value || `${contact.whatsapp.placeholder} (to be confirmed)`}
              href={getWhatsAppHref("Hello A To Z Exports, I would like to enquire about your agricultural products.")}
              external
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Location"
              display={contact.address.value || `${contact.address.placeholder}`}
            />
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory-100/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-ivory-100/55 sm:flex-row sm:px-8">
          <CopyrightYear />
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="transition-colors hover:text-ivory-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory-100">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
