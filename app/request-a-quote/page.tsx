import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteClient from "./QuoteClient";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit a B2B request for quotation — product, grade, quantity, packaging and destination. A To Z Exports responds within 1–2 business days.",
};

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8" aria-label="Loading quotation form">
          <div className="animate-pulse rounded-2xl border border-forest-800/10 bg-white p-9">
            <div className="h-8 w-1/3 rounded bg-forest-800/10" />
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 rounded-xl bg-forest-800/10" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <QuoteClient />
    </Suspense>
  );
}
