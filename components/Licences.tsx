import Link from "next/link";
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function LicencesStrip() {
  const licences = siteConfig.licences;
  if (!licences.length) return null;
  return (
    <div className="border-b border-forest-800/10 bg-forest-800/[0.03]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 sm:px-8">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-forest-800">
          Registered exporter
        </p>
        {licences.map((lic) => (
          <span
            key={lic.shortName}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-agri-600" aria-hidden="true" />
            {lic.shortName} · {lic.fullName}
          </span>
        ))}
        <Link
          href="/quality#licences-heading"
          className="link-underline text-[0.7rem] font-bold uppercase tracking-[0.16em] text-forest-800"
        >
          View register
        </Link>
      </div>
    </div>
  );
}

export function LicencesSection({ compact = false }: { compact?: boolean }) {
  const licences = siteConfig.licences;
  if (!licences.length) return null;

  return (
    <section
      aria-labelledby="licences-heading"
      className={compact ? "bg-ivory-100" : "border-t border-forest-800/10 bg-white"}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Licences & registrations"
          title="Registered for International Trade."
          copy="A To Z Exports operates with the mandatory Indian registrations for agricultural exports. Registration numbers are shared with buyers on request and with every formal quotation."
        />
        <h2 id="licences-heading" className="sr-only">
          Trade licences and registrations
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {licences.map((lic, i) => (
            <Reveal key={lic.shortName} delay={(i % 3) * 0.07}>
              <article className="flex h-full flex-col rounded-2xl border border-forest-800/10 bg-ivory-100 p-7 shadow-[0_14px_40px_-26px_rgba(23,61,43,0.4)]">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-gold-300"
                >
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 font-serif text-xl leading-snug text-forest-800">
                  {lic.shortName}
                  <span className="mt-1 block font-sans text-sm font-semibold text-charcoal-500">
                    {lic.fullName}
                  </span>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal-500">
                  {lic.description}
                </p>
                <dl className="mt-5 space-y-1.5 border-t border-forest-800/10 pt-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                      Issuer
                    </dt>
                    <dd className="text-right text-xs font-semibold text-charcoal-600">
                      {lic.issuer}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                      Status
                    </dt>
                    <dd className="inline-flex items-center gap-1.5 text-xs font-bold text-agri-600">
                      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      Registered
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-charcoal-400">
                      Number
                    </dt>
                    <dd className="text-right text-xs font-semibold text-charcoal-600">
                      {lic.number ? (
                        lic.number
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-gold-700">
                          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                          Available on request
                        </span>
                      )}
                    </dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 text-center">
          <p className="text-xs leading-relaxed text-charcoal-400">
            Copies of registration certificates are provided to serious buyers
            during quotation and order finalisation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
