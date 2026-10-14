import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Handshake,
  Leaf,
  MessagesSquare,
  Package,
  SearchCheck,
  Ship,
  Sprout,
} from "lucide-react";
import { IMAGES, categories, products } from "@/data/products";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/SectionHeading";
import { SafeImage } from "@/components/SafeImage";
import { ProductCard } from "@/components/ProductCard";
import { LicencesStrip } from "@/components/Licences";
import { TradeRoutes } from "@/components/TradeRoutes";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "From Indian Farms to Global Markets",
  description:
    "A To Z Exports connects global buyers with carefully sourced Indian agricultural products — rice, pulses, spices, oilseeds and more — through dependable supply and quality-focused processes.",
};

const commitments = [
  { icon: Leaf, title: "Quality-focused sourcing", text: "Crops selected against the specifications you define, lot by lot." },
  { icon: Package, title: "Export-ready packaging", text: "Bag sizes, labelling and palletisation coordinated to your market." },
  { icon: MessagesSquare, title: "Buyer-oriented communication", text: "Clear, responsive updates from enquiry to shipment planning." },
  { icon: Ship, title: "Reliable supply coordination", text: "Sourcing, inspection and documentation planned around your timeline." },
];

const whyFeatures = [
  {
    icon: Sprout,
    title: "Thoughtful Product Sourcing",
    text: "We work back from your specification — variety, grade, size and purity — and source accordingly, rather than pushing ready stock.",
  },
  {
    icon: BadgeCheck,
    title: "Quality-Focused Handling",
    text: "Cleaning, grading, inspection and lab checks are coordinated per order, so what ships matches what was agreed.",
  },
  {
    icon: Package,
    title: "Export-Oriented Packaging",
    text: "Moisture-safe, food-grade packing in the bag sizes and labels your market expects, including private labelling on request.",
  },
  {
    icon: Handshake,
    title: "Responsive Buyer Communication",
    text: "One point of contact, realistic timelines and honest answers — the basis of the long-term partnerships we aim to build.",
  },
];

const steps = [
  {
    icon: MessagesSquare,
    n: "01",
    title: "Product Inquiry",
    text: "Share the product, target specifications, quantity and destination. We confirm what is feasible before anything else.",
  },
  {
    icon: SearchCheck,
    n: "02",
    title: "Sourcing & Specification Alignment",
    text: "We source to your spec and align on grade, price basis and timelines — in writing, with samples where practical.",
  },
  {
    icon: ClipboardCheck,
    n: "03",
    title: "Quality & Packaging Coordination",
    text: "Inspection, lab checks where applicable, and export-ready packing and labelling are arranged to your requirements.",
  },
  {
    icon: FileCheck2,
    n: "04",
    title: "Shipment Planning & Documentation",
    text: "Dispatch scheduling and product-specific documentation are prepared in line with the order and destination regulations.",
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-ivory-100">
        <div aria-hidden="true" className="texture-grain absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <Reveal>
            <Eyebrow>Indian Agriculture · Global Reach</Eyebrow>
            <h1 id="hero-heading" className="mt-5 font-serif text-[2.6rem] leading-[1.08] text-balance text-forest-800 sm:text-6xl lg:text-[4.2rem]">
              From Indian Farms to{" "}
              <span className="relative inline-block">
                <em className="font-serif-italic italic">Global Markets.</em>
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full bg-gold-400/80" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-charcoal-500 sm:text-lg">
              Connecting global buyers with carefully sourced Indian agricultural
              products through dependable supply, quality-focused processes, and
              long-term partnerships.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 shadow-[0_18px_38px_-16px_rgba(23,61,43,0.7)] transition-all hover:bg-forest-700"
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/request-a-quote"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-800/25 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest-800 transition-colors hover:border-forest-800 hover:bg-forest-800 hover:text-ivory-100"
              >
                Partner With Us
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-agri-600">
              <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
              Built on quality. Driven by trust. Connected globally.
            </p>
            {/* Licence badges + live catalogue counts */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              {["IEC", "APEDA", "GST"].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/50 bg-gold-100/50 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest-800"
                >
                  <BadgeCheck className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
                  {badge} Registered
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-400">
              {products.length} Products · {categories.length} Categories · Pan-India Sourcing
            </p>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] border border-gold-400/50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(23,61,43,0.6)] sm:aspect-[5/5]">
                <SafeImage
                  src={IMAGES.heroGrains}
                  alt="Artfully arranged selection of Indian agricultural commodities — rice, grains, pulses and spices"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="ken-burns object-cover"
                />
              </div>
              {/* Botanical corner detail */}
              <svg aria-hidden="true" className="absolute -bottom-6 -left-6 h-24 w-24 text-agri-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M12 21V9" />
                <path d="M12 9C12 5.5 9.5 3 6 3c0 3.5 2.5 6 6 6Z" />
                <path d="M12 9c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Z" />
              </svg>
              {/* Floating sourcing note */}
              <div className="absolute -bottom-5 right-4 rounded-2xl border border-forest-800/10 bg-white/95 px-5 py-4 shadow-[0_20px_45px_-20px_rgba(23,61,43,0.5)] backdrop-blur sm:right-8">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold-600">Sourcing focus</p>
                <p className="mt-1 font-serif text-lg text-forest-800">Rice · Pulses · Spices · Oilseeds</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section aria-label="Our commitments" className="border-y border-forest-800/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-6 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800/[0.06] text-forest-800">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-forest-800">{c.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-500">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <LicencesStrip />

      {/* ============ COMMODITY TICKER ============ */}
      <div aria-hidden="true" className="overflow-hidden border-y border-forest-950 bg-forest-900 py-4">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap pr-10">
          {[...products, ...products].map((p, i) => (
            <span
              key={`${p.slug}-${i}`}
              className="inline-flex items-center gap-10 font-serif text-lg tracking-wide text-ivory-100/90"
            >
              {p.name}
              <span className="text-[0.6rem] text-gold-400">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ PRODUCT SHOWCASE ============ */}
      <section aria-labelledby="products-heading" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="01 · What we source"
            title="Agricultural Products, Carefully Sourced."
            copy="Explore agricultural commodities suited to the needs of international buyers, distributors, wholesalers, and food businesses."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 3) * 0.08} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <article className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl shadow-[0_24px_60px_-30px_rgba(23,61,43,0.55)]">
                  <SafeImage
                    src={cat.image}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/35 to-transparent" />
                  <div className="relative p-7">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.26em] text-gold-300">{cat.tagline}</p>
                    <h3 id={i === 0 ? "products-heading" : undefined} className="mt-2 font-serif text-[1.7rem] text-ivory-100">
                      {cat.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ivory-100/75">{cat.description}</p>
                    <div className="mt-4 flex items-center gap-5">
                      <Link
                        href={`/products?category=${cat.slug}`}
                        className="inline-flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-ivory-100 transition-colors hover:text-gold-300"
                      >
                        Explore Products
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                      <Link
                        href={`/request-a-quote?category=${cat.slug}`}
                        className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-gold-300 transition-colors hover:text-gold-200"
                      >
                        Enquire Now
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
            {/* Editorial enquiry tile closing the grid */}
            <Reveal delay={0.16}>
              <Link
                href="/products"
                className="group flex h-full min-h-[380px] flex-col justify-between rounded-2xl bg-forest-800 p-7 transition-colors hover:bg-forest-700"
                aria-label="View the full product catalogue"
              >
                <Leaf aria-hidden="true" className="h-8 w-8 text-gold-300" />
                <div>
                  <p className="font-serif text-[1.7rem] leading-snug text-ivory-100">
                    Looking for something specific?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ivory-100/70">
                    Browse the full searchable catalogue — or send your specification and we will source to it.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-gold-300">
                    View all products
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section aria-labelledby="why-heading" className="border-y border-forest-800/10 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <SafeImage src={IMAGES.farmer} alt="Indian farmer reviewing crops in the field" fill sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" className="object-cover" />
              </div>
              <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
                <SafeImage src={IMAGES.spicePiles} alt="Graded spices and pulses ready for quality checks" fill sizes="(max-width: 1024px) 50vw, 25vw" loading="lazy" className="object-cover" />
              </div>
            </div>
            <p className="mt-4 border-l-2 border-gold-400 pl-4 font-serif text-lg italic text-forest-800">
              “{siteConfig.tagline}”
            </p>
          </Reveal>
          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow>02 · Why buyers work with us</Eyebrow>
              <h2 id="why-heading" className="mt-4 font-serif text-3xl leading-tight text-balance text-forest-800 sm:text-4xl lg:text-[2.75rem]">
                A Sourcing Partner, Not Just a Supplier.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal-500 sm:text-lg">
                International buying teams need consistency, documentation and straight
                answers. Our way of working is built around exactly that.
              </p>
            </Reveal>
            <dl className="mt-9 space-y-7">
              {whyFeatures.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.07}>
                  <div className="flex gap-5">
                    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/60 text-forest-800">
                      <f.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <dt className="font-serif text-xl text-forest-800">{f.title}</dt>
                      <dd className="mt-1 max-w-lg text-sm leading-relaxed text-charcoal-500">{f.text}</dd>
                    </div>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section aria-labelledby="process-heading" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <SectionHeading
            eyebrow="03 · How it works"
            title="From Source to Shipment."
            copy="A clear, four-step path from your first enquiry to dispatch — with details agreed per product, order, destination and applicable regulations."
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-forest-800/10 bg-white p-7 shadow-[0_14px_40px_-26px_rgba(23,61,43,0.4)]">
                  <span aria-hidden="true" className="font-serif text-5xl text-gold-400/50">{s.n}</span>
                  <s.icon aria-hidden="true" className="mt-4 h-6 w-6 text-forest-800" strokeWidth={1.6} />
                  <h3 className="mt-3 font-serif text-xl text-forest-800">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{s.text}</p>
                  {i < steps.length - 1 ? (
                    <span aria-hidden="true" className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center text-gold-500 lg:flex">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-8 text-center">
            <Link href="/quality" className="link-underline text-xs font-bold uppercase tracking-[0.18em] text-forest-800">
              Read about our quality approach
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ GLOBAL TRADE ============ */}
      <section aria-labelledby="trade-heading" className="border-y border-forest-800/10 bg-forest-800 text-ivory-100">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          <Reveal>
            <Eyebrow tone="light">04 · Global trade</Eyebrow>
            <h2 id="trade-heading" className="mt-4 font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              Your Partner for Agricultural Trade.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ivory-100/75 sm:text-lg">
              Building reliable connections between agricultural supply and
              international demand, one business relationship at a time.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory-100/60">
              Every enquiry is handled individually — product, specification,
              packaging and destination requirements are agreed order by order.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/request-a-quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-forest-950 transition-colors hover:bg-gold-300"
              >
                Start an enquiry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-ivory-100/30 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:border-ivory-100/60 hover:bg-ivory-100/10"
              >
                Our Story
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-ivory-100/15 bg-forest-950/40">
              <TradeRoutes className="h-auto w-full text-ivory-100" />
            </div>
            <div className="relative mt-4 aspect-[21/9] overflow-hidden rounded-2xl">
              <SafeImage
                src={IMAGES.containers}
                alt="Container terminal coordinating international agricultural shipments"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section aria-labelledby="featured-heading" className="bg-ivory-100">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              align="left"
              eyebrow="05 · Buyer favourites"
              title="Featured Commodities."
              copy="A starting selection from the catalogue — every specification is confirmed with you before supply is committed."
            />
            <Reveal>
              <Link
                href="/products"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-forest-800/25 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-forest-800 transition-colors hover:bg-forest-800 hover:text-ivory-100"
              >
                All products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <h2 id="featured-heading" className="sr-only">Featured products</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT PREVIEW ============ */}
      <section aria-labelledby="about-heading" className="border-t border-forest-800/10 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:py-28">
          <Reveal className="relative">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] border border-gold-400/50" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(23,61,43,0.6)]">
              <SafeImage
                src={IMAGES.greenField}
                alt="Lush green Indian farmland under a wide sky"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>06 · About A To Z Exports</Eyebrow>
            <h2 id="about-heading" className="mt-4 font-serif text-3xl leading-tight text-balance text-forest-800 sm:text-4xl lg:text-[2.75rem]">
              Rooted in Agriculture. Focused on Global Partnerships.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-charcoal-500 sm:text-lg">
              A To Z Exports exists for one purpose: helping international buyers
              source Indian agricultural products with confidence. We coordinate
              sourcing, specifications, packaging and communication — and we stay
              with the order until shipment planning is complete.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-charcoal-500">
              No inflated claims, no shortcuts — just careful product work and
              professional buyer communication, relationship by relationship.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-forest-800 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-colors hover:bg-forest-700"
            >
              Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
