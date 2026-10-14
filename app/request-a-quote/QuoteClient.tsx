"use client";

import { useSearchParams } from "next/navigation";
import { ClipboardCheck, MessagesSquare, SearchCheck, Ship } from "lucide-react";
import { Eyebrow } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";

const aside = [
  { icon: MessagesSquare, text: "Share product, specs, quantity and destination." },
  { icon: SearchCheck, text: "We confirm feasibility and align on terms in writing." },
  { icon: ClipboardCheck, text: "Quality, inspection and packaging coordinated to your spec." },
  { icon: Ship, text: "Shipment planning and documentation per order." },
];

export default function QuoteClient() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") ?? undefined;

  return (
    <section aria-labelledby="quote-title" className="bg-ivory-100">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Request a Quote</Eyebrow>
              <h1 id="quote-title" className="mt-4 font-serif text-4xl leading-tight text-balance text-forest-800 sm:text-5xl">
                Tell Us What You Need. We&apos;ll Quote It Properly.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-charcoal-500 sm:text-lg">
                Every quotation is prepared individually — per product,
                specification, packaging and destination. Detailed RFQs get faster,
                more accurate quotes.
              </p>
            </Reveal>
            <ol className="mt-8 space-y-4">
              {aside.map((a, i) => (
                <Reveal key={a.text} delay={i * 0.06}>
                  <li className="flex items-center gap-4 rounded-2xl border border-forest-800/10 bg-white p-4">
                    <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-800/[0.06] text-forest-800">
                      <a.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold text-charcoal-600">{a.text}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-forest-800/10 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(23,61,43,0.5)] sm:p-9">
              <h2 className="font-serif text-2xl text-forest-800">Request for Quotation</h2>
              <p className="mb-6 mt-1 text-sm text-charcoal-500">
                All fields marked * are required. We respond within 1–2 business days.
              </p>
              <QuoteForm defaultProductSlug={product} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
