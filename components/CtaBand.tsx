import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./SectionHeading";

export function CtaBand({
  eyebrow = "Start a conversation",
  title = "Looking for a Reliable Agricultural Sourcing Partner?",
  copy = "Share your product requirements, target specifications, destination market, and estimated order quantity. Our team can discuss the next steps with you.",
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden bg-forest-900">
      {/* Decorative botanical line-art */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-ivory-100/[0.06]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M12 21V9" />
        <path d="M12 9C12 5.5 9.5 3 6 3c0 3.5 2.5 6 6 6Z" />
        <path d="M12 9c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Z" />
        <path d="M12 14c0-3-2.2-5.2-5.2-5.2 0 3 2.2 5.2 5.2 5.2Z" />
        <path d="M12 14c0-3 2.2-5.2 5.2-5.2 0 3-2.2 5.2-5.2 5.2Z" />
      </svg>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600" />
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <Reveal>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h2 id="cta-heading" className="mt-4 font-serif text-3xl leading-tight text-balance text-ivory-100 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ivory-100/75 sm:text-lg">
            {copy}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/request-a-quote"
              className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest-950 transition-all hover:bg-gold-300 sm:w-auto"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ivory-100/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:border-ivory-100/60 hover:bg-ivory-100/10 sm:w-auto"
            >
              Contact Our Team
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
