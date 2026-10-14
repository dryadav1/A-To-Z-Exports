import type { Metadata } from "next";
import { ClipboardCheck, FileCheck2, FlaskConical, PackageCheck, ScrollText, ShieldCheck } from "lucide-react";
import { IMAGES } from "@/data/products";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SafeImage } from "@/components/SafeImage";
import { LicencesSection } from "@/components/Licences";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Quality & Standards",
  description:
    "How A To Z Exports approaches quality — specification alignment, inspections, export packaging, documentation and destination-market compliance considerations.",
};

const pillars = [
  {
    icon: ScrollText,
    title: "Specifications First",
    text: "Every order starts from the buyer's target specification — variety, grade, size, moisture, purity and tolerance levels. Nothing is assumed; everything material is confirmed in writing before sourcing begins.",
  },
  {
    icon: FlaskConical,
    title: "Inspection & Quality Checks",
    text: "Cleaning, grading and sortex sorting are coordinated per lot, with lab testing arranged where the product or destination requires it — for example moisture, aflatoxin-aware handling of groundnuts, or curcumin levels in turmeric. Third-party inspection can be accommodated on request.",
  },
  {
    icon: PackageCheck,
    title: "Packaging & Labelling",
    text: "Food-grade, moisture-safe packing in the bag sizes your market expects, with labelling — including nutrition, barcodes and private labels — coordinated to your requirements and destination norms.",
  },
  {
    icon: FileCheck2,
    title: "Documentation",
    text: "Product-specific documents are prepared per order: commercial invoice, packing list, certificate of origin, and phytosanitary or health documentation where the commodity and destination require them.",
  },
  {
    icon: ShieldCheck,
    title: "Destination-Market Compliance",
    text: "Maximum residue limits, packaging rules and import formalities differ by market. We plan each shipment against the destination's applicable regulations and flag gaps early — before goods move.",
  },
  {
    icon: ClipboardCheck,
    title: "Traceability & Records",
    text: "Lot-level records link your order back to sourcing, inspection results and packing — so questions after delivery can be answered with evidence, not memory.",
  },
];

export default function QualityPage() {
  return (
    <>
      <section aria-labelledby="quality-title" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>Quality & standards</Eyebrow>
              <h1 id="quality-title" className="mt-4 font-serif text-4xl leading-tight text-balance text-forest-800 sm:text-5xl">
                Quality Is a Process, Not a Promise.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-charcoal-500 sm:text-lg">
                Our quality approach is straightforward: agree the specification,
                verify against it at each stage, pack to protect it, and document
                everything. What ships should match what was agreed — lot by lot.
              </p>
              <div className="mt-6 rounded-2xl border border-gold-500/40 bg-gold-100/50 p-5 text-sm leading-relaxed text-charcoal-600">
                <strong className="text-forest-800">Registered exporter:</strong>{" "}
                IEC (DGFT) · APEDA · GST. Registration numbers are shared with
                buyers on request — see the register below.
              </div>
            </Reveal>
            <Reveal delay={0.12} className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] border border-gold-400/50" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(23,61,43,0.6)]">
                <SafeImage
                  src={IMAGES.spices}
                  alt="Spices undergoing selection and quality checks"
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

      <section aria-labelledby="pillars-heading" className="border-y border-forest-800/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Our approach"
            title="Six Pillars of Our Quality Process."
          />
          <h2 id="pillars-heading" className="sr-only">Quality pillars</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.07}>
                <article className="h-full rounded-2xl border border-forest-800/10 bg-ivory-100 p-7">
                  <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                    <p.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 font-serif text-xl text-forest-800">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LicencesSection />

      <CtaBand
        eyebrow="Quality questions?"
        title="Discuss Your Specification With Us."
        copy="Send your target parameters — grades, tolerances, testing and packaging needs — and we will walk through exactly how we would meet them."
      />
    </>
  );
}
