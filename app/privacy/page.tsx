import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the A To Z Exports website — how business inquiry data is handled.",
};

export default function PrivacyPage() {
  return (
    <section aria-labelledby="privacy-title" className="bg-ivory-100">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <Eyebrow>Legal</Eyebrow>
        <h1 id="privacy-title" className="mt-4 font-serif text-4xl text-forest-800 sm:text-5xl">
          Privacy Policy
        </h1>
        <div className="prose-atoz mt-8 space-y-6 text-[0.95rem] leading-relaxed text-charcoal-600">
          <p>
            A To Z Exports (“we”, “us”) collects only the business information you
            choose to share through our inquiry and quotation forms — typically your
            name, company, email, country, phone number and requirement details.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">How we use your information</h2>
          <p>
            Your details are used solely to respond to your enquiry, prepare
            quotations and communicate about potential business. We do not sell,
            rent or share your information with third parties for marketing.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">How enquiries are delivered</h2>
          <p>
            Until our secure email integration is fully configured, form submissions
            are validated in your browser and forwarded via your own email
            application or WhatsApp — your data is not stored in a website database.
            Once email delivery is enabled, enquiries are emailed directly to our
            team and handled confidentially.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">Your rights</h2>
          <p>
            You may request a copy, correction or deletion of your information at any
            time by contacting us. Contact details are published on our{" "}
            <a href="/contact" className="link-underline text-forest-800">Contact page</a> once
            confirmed by the business owner.
          </p>
          <p className="text-sm text-charcoal-400">
            Last reviewed: October 2026. This is a standard policy for a business
            inquiry website and will be finalised with legal counsel before launch if required.
          </p>
        </div>
      </article>
    </section>
  );
}
