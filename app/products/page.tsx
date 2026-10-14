import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/Catalogue";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Browse the A To Z Exports product catalogue — rice and grains, pulses, spices, oilseeds and other Indian agricultural commodities for international buyers.",
};

function CatalogueSkeleton() {
  return (
    <div aria-label="Loading products" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-forest-800/10 bg-white">
          <div className="aspect-[4/3] bg-forest-800/10" />
          <div className="space-y-3 p-6">
            <div className="h-3 w-1/3 rounded bg-forest-800/10" />
            <div className="h-5 w-2/3 rounded bg-forest-800/10" />
            <div className="h-3 w-full rounded bg-forest-800/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <section aria-labelledby="products-title" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pt-20">
          <SectionHeading
            eyebrow="Catalogue"
            title="Products for International Buyers."
            copy="Search and filter by category. Specifications marked “To be confirmed” are aligned with you before any supply commitment."
          />
          <h1 id="products-title" className="sr-only">Our Products — searchable catalogue</h1>
          <div className="mt-10">
            <Suspense fallback={<CatalogueSkeleton />}>
              <Catalogue />
            </Suspense>
          </div>
        </div>
      </section>
      <CtaBand
        eyebrow="Need a specification we haven't listed?"
        title="Send Your Spec — We'll Source to It."
        copy="Share grades, packaging, quantity and destination. We respond with feasibility, timelines and a quotation basis."
      />
    </>
  );
}
