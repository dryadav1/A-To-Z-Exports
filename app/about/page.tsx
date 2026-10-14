import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Eye, MessagesSquare, Sprout, Target } from "lucide-react";
import { IMAGES } from "@/data/products";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SafeImage } from "@/components/SafeImage";
import { LicencesStrip } from "@/components/Licences";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About A To Z Exports — our mission, sourcing philosophy and commitment to professional communication with international agricultural buyers.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    text: "To give international buyers a dependable, transparent way to source Indian agricultural products — specification by specification, shipment by shipment.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "Long-term partnerships where buyers plan their Indian sourcing around a partner they trust, and growers reach markets that value quality.",
  },
  {
    icon: Compass,
    title: "Business Approach",
    text: "Enquiry-first and specification-led: we confirm feasibility, align on grade and terms in writing, then coordinate quality, packing and dispatch.",
  },
  {
    icon: Sprout,
    title: "Sourcing Philosophy",
    text: "Source to the buyer's spec, not to leftover stock. Clean, grade, inspect and pack each lot as if our name travels with it — because it does.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>About us</Eyebrow>
              <h1 id="about-title" className="mt-4 font-serif text-4xl leading-tight text-balance text-forest-800 sm:text-5xl">
                Rooted in Agriculture. Focused on Global Partnerships.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-charcoal-500 sm:text-lg">
                A To Z Exports is an agricultural sourcing and export business
                based in Bhosari, Pune, Maharashtra — built to connect Indian
                farm produce with international buyers: importers, wholesalers,
                distributors and food manufacturers.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-500">
                We coordinate the details that make cross-border buying work:
                product specifications, grades, inspection, export-ready packaging,
                documentation and shipment planning — communicated clearly, in one
                place, by one accountable team.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] border border-gold-400/50" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(23,61,43,0.6)]">
                <SafeImage
                  src={IMAGES.tractor}
                  alt="Mechanised farming operations in an Indian agricultural region"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="values-heading" className="border-y border-forest-800/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading
            eyebrow="What guides us"
            title="Mission, Vision & Approach."
          />
          <h2 id="values-heading" className="sr-only">Mission, vision and approach</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <article className="h-full rounded-2xl border border-forest-800/10 bg-ivory-100 p-8">
                  <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                    <v.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl text-forest-800">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500 sm:text-base">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="communication-heading" className="bg-ivory-100">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(23,61,43,0.6)]">
              <SafeImage
                src={IMAGES.cornRows}
                alt="Cultivated crop rows prepared for the export supply chain"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <Eyebrow>How we communicate</Eyebrow>
            <h2 id="communication-heading" className="mt-4 font-serif text-3xl leading-tight text-balance text-forest-800 sm:text-4xl">
              Professional, Honest, Responsive.
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Written confirmation of specifications, timelines and terms before supply is committed.",
                "Realistic answers on feasibility, seasonality and lead times — including when we cannot meet a requirement.",
                "One point of contact from enquiry through shipment planning.",
                "Proactive updates if anything changes on sourcing, quality or scheduling.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal-500 sm:text-base">
                  <MessagesSquare aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-agri-600" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:bg-forest-700"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <LicencesStrip />

      <CtaBand />
    </>
  );
}
