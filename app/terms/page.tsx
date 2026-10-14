import type { Metadata } from "next";
import { Eyebrow } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the A To Z Exports website and requesting quotations.",
};

export default function TermsPage() {
  return (
    <section aria-labelledby="terms-title" className="bg-ivory-100">
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <Eyebrow>Legal</Eyebrow>
        <h1 id="terms-title" className="mt-4 font-serif text-4xl text-forest-800 sm:text-5xl">
          Terms &amp; Conditions
        </h1>
        <div className="mt-8 space-y-6 text-[0.95rem] leading-relaxed text-charcoal-600">
          <h2 className="font-serif text-2xl text-forest-800">Website content</h2>
          <p>
            Product descriptions, grades, packaging options and availability shown on
            this website are indicative and for discussion purposes. Final
            specifications, pricing and terms are confirmed in writing per order
            before any supply commitment.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">Quotations</h2>
          <p>
            Submitting an inquiry or RFQ does not create a contract. Quotations we
            provide are valid for the period stated in the quotation and are subject
            to availability, specification alignment and destination regulations.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">No unverified claims</h2>
          <p>
            We make no claims regarding certifications, export volumes or market
            coverage beyond what is stated and evidenced. Anything marked “to be
            confirmed” on this website requires written confirmation.
          </p>
          <h2 className="font-serif text-2xl text-forest-800">Acceptable use</h2>
          <p>
            Inquiry forms are for genuine business enquiries only. Misuse, spam or
            automated submission may be blocked without notice.
          </p>
          <p className="text-sm text-charcoal-400">
            Last reviewed: October 2026. These terms will be finalised with legal
            counsel before launch if required.
          </p>
        </div>
      </article>
    </section>
  );
}
