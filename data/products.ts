/**
 * Product catalogue — single source of truth for categories and products.
 *
 * IMPORTANT: sample specifications below are LAYOUT PLACEHOLDERS, not confirmed
 * business facts. Anything marked `confirmed: false` (or availability
 * "to-be-confirmed") renders in the UI with a "To be confirmed" note.
 * The owner must verify every grade, packaging option and MOQ before launch.
 */

export const IMAGES = {
  heroGrains: "/images/hero.jpg",
  rice: "/images/rice.jpg",
  wheat: "/images/wheat.jpg",
  pulses: "/images/pulses.jpg",
  lentils: "/images/lentils.jpg",
  spices: "/images/spices.jpg",
  spicePiles: "/images/lentils.jpg",
  spiceMarket: "/images/spice-market.jpg",
  spiceSpoons: "/images/spice-spoons.jpg",
  pantry: "/images/pantry.jpg",
  turmeric: "/images/turmeric.jpg",
  oilseeds: "/images/oilseeds.jpg",
  field: "/images/field.jpg",
  greenField: "/images/greenfield.jpg",
  cornRows: "/images/cornrows.jpg",
  farmer: "/images/farmer.jpg",
  tractor: "/images/tractor.jpg",
  containers: "/images/containers.jpg",
  port: "/images/port.jpg",
} as const;

export interface ProductCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
}

export type Availability = "available" | "on-request" | "to-be-confirmed";

export interface SpecItem {
  label: string;
  /** False = placeholder shown as "To be confirmed" in the UI. */
  confirmed: boolean;
}

export interface Product {
  slug: string;
  name: string;
  category: string; // category slug
  shortDescription: string;
  overview: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  availability: Availability;
  grades: SpecItem[];
  packaging: SpecItem[];
  moq: SpecItem | null;
  featured?: boolean;
}

export const categories: ProductCategory[] = [
  {
    slug: "rice-grains",
    name: "Rice & Grains",
    tagline: "Staple grains, milled and graded to specification.",
    description:
      "Rice, wheat and cereal grains sourced from established growing regions, with milling, grading and packaging coordinated to buyer specifications.",
    image: IMAGES.rice,
    imageAlt: "Bowls of premium Indian rice and grains",
  },
  {
    slug: "pulses-legumes",
    name: "Pulses & Legumes",
    tagline: "Protein-rich pulses, cleaned and sorted.",
    description:
      "Chickpeas, lentils and other pulses, machine-cleaned and sortex-graded to meet the size, purity and moisture levels buyers require.",
    image: IMAGES.pulses,
    imageAlt: "Assorted Indian pulses and legumes in wooden spoons",
  },
  {
    slug: "spices",
    name: "Spices",
    tagline: "High-aroma spices, ground or whole.",
    description:
      "Turmeric, chillies, cumin and other spices selected for colour, aroma and pungency, supplied whole or ground with food-safe packing.",
    image: IMAGES.spices,
    imageAlt: "Vibrant Indian spices at a traditional market",
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    tagline: "Oil-rich seeds for crushing and processing.",
    description:
      "Sesame, groundnuts and other oilseeds sourced for oil content, purity and uniform size, suited to crushers and food processors.",
    image: IMAGES.oilseeds,
    imageAlt: "Sunflower field representing oilseed sourcing regions",
  },
  {
    slug: "other-commodities",
    name: "Other Agricultural Commodities",
    tagline: "Seasonal and speciality crops on enquiry.",
    description:
      "Millets, sweeteners and other crops coordinated on a case-by-case basis, subject to season, specification and destination requirements.",
    image: IMAGES.field,
    imageAlt: "Golden harvest field at sunset in India",
  },
];

export const products: Product[] = [
  {
    slug: "basmati-rice",
    name: "Basmati Rice",
    category: "rice-grains",
    shortDescription:
      "Long-grain aromatic rice, milled and graded for international buyers.",
    overview:
      "Basmati rice selected for average grain length, aroma and low breakage. Grades and packaging are aligned with the buyer's specification before shipment planning begins.",
    image: IMAGES.rice,
    imageAlt: "Premium basmati rice grains",
    gallery: [
      { src: IMAGES.rice, alt: "Premium basmati rice grains" },
      { src: IMAGES.field, alt: "Paddy growing region at harvest" },
      { src: IMAGES.port, alt: "Export-ready shipment coordination" },
    ],
    availability: "on-request",
    grades: [
      { label: "1121 Steam / Golden Sella (placeholder)", confirmed: false },
      { label: "Pusa / Traditional varieties (placeholder)", confirmed: false },
    ],
    packaging: [
      { label: "5 kg / 10 kg / 25 kg / 50 kg bags (placeholder)", confirmed: false },
      { label: "Buyer private labelling on request (placeholder)", confirmed: false },
    ],
    moq: { label: "1 × 20 ft container (placeholder)", confirmed: false },
    featured: true,
  },
  {
    slug: "wheat",
    name: "Wheat",
    category: "rice-grains",
    shortDescription:
      "Milling and general-purpose wheat, cleaned and bagged to order.",
    overview:
      "Wheat sourced for test weight, moisture and foreign-matter levels agreed with the buyer. Suitability for milling or general use is confirmed per order.",
    image: IMAGES.wheat,
    imageAlt: "Close-up of harvested wheat grains",
    gallery: [
      { src: IMAGES.wheat, alt: "Close-up of harvested wheat grains" },
      { src: IMAGES.greenField, alt: "Wheat growing region" },
    ],
    availability: "to-be-confirmed",
    grades: [
      { label: "Milling grade, protein levels per enquiry (placeholder)", confirmed: false },
    ],
    packaging: [
      { label: "25 kg / 50 kg PP bags, bulk on request (placeholder)", confirmed: false },
    ],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "kabuli-chickpeas",
    name: "Kabuli Chickpeas",
    category: "pulses-legumes",
    shortDescription:
      "Bold, uniform chickpeas, sortex-graded for size and purity.",
    overview:
      "Kabuli chickpeas machine-cleaned and sortex-sorted for uniform calibre and appearance, supplied in sizes aligned to the destination market's preference.",
    image: IMAGES.pulses,
    imageAlt: "Kabuli chickpeas with other Indian pulses",
    gallery: [
      { src: IMAGES.pulses, alt: "Kabuli chickpeas with other Indian pulses" },
      { src: IMAGES.lentils, alt: "Graded pulses ready for packing" },
    ],
    availability: "on-request",
    grades: [
      { label: "42 / 44 / 58 count sizes (placeholder)", confirmed: false },
      { label: "Sortex-cleaned, max 0.5% foreign matter (placeholder)", confirmed: false },
    ],
    packaging: [
      { label: "25 kg / 50 kg PP bags (placeholder)", confirmed: false },
    ],
    moq: { label: "1 × 20 ft container (placeholder)", confirmed: false },
    featured: true,
  },
  {
    slug: "red-lentils",
    name: "Red Lentils (Masoor)",
    category: "pulses-legumes",
    shortDescription:
      "Whole and split red lentils for retail and food manufacturing.",
    overview:
      "Red lentils supplied whole (sabut) or split (malka) as required, with size and polish levels agreed per order.",
    image: IMAGES.lentils,
    imageAlt: "Piles of red lentils and colourful pulses",
    gallery: [{ src: IMAGES.lentils, alt: "Piles of red lentils and colourful pulses" }],
    availability: "to-be-confirmed",
    grades: [{ label: "Whole / split, size per enquiry (placeholder)", confirmed: false }],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "turmeric",
    name: "Turmeric Fingers & Powder",
    category: "spices",
    shortDescription:
      "High-curcumin turmeric, polished fingers or ground powder.",
    overview:
      "Turmeric selected for colour and curcumin content, supplied as polished fingers or ground powder with moisture-controlled, food-safe packing.",
    image: IMAGES.turmeric,
    imageAlt: "Turmeric powder and dried turmeric roots",
    gallery: [
      { src: IMAGES.turmeric, alt: "Turmeric powder and dried turmeric roots" },
      { src: IMAGES.spices, alt: "Spice sourcing and selection" },
    ],
    availability: "on-request",
    grades: [
      { label: "Salem / Erode varieties (placeholder)", confirmed: false },
      { label: "Curcumin 3–5% per lab report (placeholder)", confirmed: false },
    ],
    packaging: [
      { label: "25 kg / 50 kg bags; retail packs on request (placeholder)", confirmed: false },
    ],
    moq: { label: "500 kg (placeholder)", confirmed: false },
    featured: true,
  },
  {
    slug: "red-chillies",
    name: "Dried Red Chillies",
    category: "spices",
    shortDescription:
      "Stemless dried chillies, graded for colour and pungency.",
    overview:
      "Dried red chillies with stem / stemless options, graded for colour (ASTA), heat (SHU) and stem content as agreed with the buyer.",
    image: IMAGES.spices,
    imageAlt: "Dried red chillies among Indian market spices",
    gallery: [{ src: IMAGES.spices, alt: "Dried red chillies among Indian market spices" }],
    availability: "to-be-confirmed",
    grades: [
      { label: "Guntur Teja / S17 / Byadgi (placeholder)", confirmed: false },
      { label: "ASTA colour & SHU heat per enquiry (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "25 kg / 50 kg compressed bales (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
    featured: true,
  },
  {
    slug: "cumin-seeds",
    name: "Cumin Seeds",
    category: "spices",
    shortDescription:
      "High-aroma cumin, cleaned and sortex-graded.",
    overview:
      "Cumin seeds selected for aroma, volatile-oil content and uniform colour, supplied whole or ground with food-safe packing.",
    image: IMAGES.pantry,
    imageAlt: "Cumin seeds and cooking spices arranged for inspection",
    gallery: [{ src: IMAGES.pantry, alt: "Cumin seeds and cooking spices" }],
    availability: "to-be-confirmed",
    grades: [{ label: "99% / 99.5% purity grades (placeholder)", confirmed: false }],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "coriander-seeds",
    name: "Coriander Seeds",
    category: "spices",
    shortDescription:
      "Bold, fragrant coriander seeds — an everyday Indian staple.",
    overview:
      "Coriander seeds selected for size, aroma and uniformity, supplied whole or split with machine-cleaned, sortex-graded lots as agreed with the buyer.",
    image: IMAGES.spiceSpoons,
    imageAlt: "Assorted seed spices and ground spices styled for inspection",
    gallery: [
      { src: IMAGES.spiceSpoons, alt: "Assorted seed spices and ground spices styled for inspection" },
      { src: IMAGES.spiceMarket, alt: "Traditional spice market selection" },
    ],
    availability: "to-be-confirmed",
    grades: [
      { label: "Parrot / Scooter / Eagle grades (placeholder)", confirmed: false },
      { label: "Whole / split, size per enquiry (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "fennel-seeds",
    name: "Fennel Seeds",
    category: "spices",
    shortDescription:
      "Sweet, aromatic fennel — widely grown across Gujarat and Rajasthan.",
    overview:
      "Fennel seeds selected for green colour, sweetness and uniform size, supplied whole with cleaning and grading coordinated to buyer specifications.",
    image: IMAGES.pantry,
    imageAlt: "Fennel and cooking spices arranged for inspection",
    gallery: [{ src: IMAGES.pantry, alt: "Fennel and cooking spices arranged for inspection" }],
    availability: "to-be-confirmed",
    grades: [{ label: "Green / bold grades per enquiry (placeholder)", confirmed: false }],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "fenugreek-seeds",
    name: "Fenugreek Seeds",
    category: "spices",
    shortDescription:
      "Bold fenugreek (methi) seeds, a kitchen staple across India.",
    overview:
      "Fenugreek seeds machine-cleaned and graded for boldness and purity, supplied whole for spice, food-manufacturing and seasoning use.",
    image: IMAGES.spicePiles,
    imageAlt: "Graded seeds and pulses ready for quality checks",
    gallery: [{ src: IMAGES.spicePiles, alt: "Graded seeds and pulses ready for quality checks" }],
    availability: "to-be-confirmed",
    grades: [{ label: "Bold, machine-cleaned, purity per enquiry (placeholder)", confirmed: false }],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "mustard-seeds",
    name: "Mustard Seeds",
    category: "spices",
    shortDescription:
      "Pungent mustard seeds for oil crushing and tempering.",
    overview:
      "Mustard seeds sourced for pungency, oil content and uniform size — suited to oil crushers, spice packers and food processors.",
    image: IMAGES.spices,
    imageAlt: "Mustard and market spices at a traditional market",
    gallery: [
      { src: IMAGES.spices, alt: "Mustard and market spices at a traditional market" },
      { src: IMAGES.spiceMarket, alt: "Traditional spice market selection" },
    ],
    availability: "to-be-confirmed",
    grades: [
      { label: "Bold / small, yellow / black varieties (placeholder)", confirmed: false },
      { label: "Oil content per enquiry (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    shortDescription:
      "Bold Malabar pepper, garbled and graded for pungency.",
    overview:
      "Black pepper selected for boldness, density and piperine content, supplied garbled with moisture-controlled, food-safe packing.",
    image: IMAGES.spiceMarket,
    imageAlt: "Traditional spice market bowls including whole spices",
    gallery: [
      { src: IMAGES.spiceMarket, alt: "Traditional spice market bowls including whole spices" },
      { src: IMAGES.spices, alt: "Spice sourcing and selection" },
    ],
    availability: "to-be-confirmed",
    grades: [
      { label: "500 / 550 G/L, garbled grades (placeholder)", confirmed: false },
      { label: "Steam-sterilised on request (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "green-cardamom",
    name: "Green Cardamom",
    category: "spices",
    shortDescription:
      "Aromatic green cardamom, graded by boldness and colour.",
    overview:
      "Green cardamom selected for size, deep-green colour and intense aroma, supplied in standard export grades with moisture-safe packing.",
    image: IMAGES.spiceSpoons,
    imageAlt: "Whole spices and ground spice blends styled for inspection",
    gallery: [{ src: IMAGES.spiceSpoons, alt: "Whole spices and ground spice blends styled for inspection" }],
    availability: "to-be-confirmed",
    grades: [
      { label: "7 mm / 8 mm bold green grades (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "5 kg / 25 kg cartons and bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "sesame-seeds",
    name: "Sesame Seeds",
    category: "oilseeds",
    shortDescription:
      "Natural and hulled sesame for crushing and food use.",
    overview:
      "Sesame seeds supplied natural, hulled or roasted as required, with purity and oil-content parameters agreed per order.",
    image: IMAGES.oilseeds,
    imageAlt: "Oilseed sourcing region under a bright sky",
    gallery: [{ src: IMAGES.oilseeds, alt: "Oilseed sourcing region under a bright sky" }],
    availability: "to-be-confirmed",
    grades: [
      { label: "Natural / hulled, 99/1 – 99.95% purity (placeholder)", confirmed: false },
    ],
    packaging: [{ label: "25 kg / 50 kg bags (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "groundnuts",
    name: "Groundnuts (Peanuts)",
    category: "oilseeds",
    shortDescription:
      "Bold groundnut kernels for snacking, crushing and butter.",
    overview:
      "Groundnut kernels graded by count per ounce with aflatoxin-aware handling and moisture-controlled packing, per buyer and destination norms.",
    image: IMAGES.oilseeds,
    imageAlt: "Groundnut sourcing region at harvest season",
    gallery: [{ src: IMAGES.oilseeds, alt: "Groundnut sourcing region at harvest season" }],
    availability: "to-be-confirmed",
    grades: [{ label: "Count 40/50 – 80/90 per ounce (placeholder)", confirmed: false }],
    packaging: [{ label: "25 kg / 50 kg bags, vacuum on request (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
  {
    slug: "millets",
    name: "Millets",
    category: "other-commodities",
    shortDescription:
      "Foxtail, finger and pearl millets for health-food markets.",
    overview:
      "A range of Indian millets gaining demand in health-food segments. Varieties, processing (hulled / unhulled) and packing are coordinated per enquiry and season.",
    image: IMAGES.field,
    imageAlt: "Millet growing region at golden hour",
    gallery: [
      { src: IMAGES.field, alt: "Millet growing region at golden hour" },
      { src: IMAGES.cornRows, alt: "Row crops under cultivation" },
    ],
    availability: "to-be-confirmed",
    grades: [{ label: "Variety and processing per enquiry (placeholder)", confirmed: false }],
    packaging: [{ label: "Retail and bulk options per enquiry (placeholder)", confirmed: false }],
    moq: { label: "To be confirmed", confirmed: false },
  },
];

export const availabilityLabel: Record<Availability, string> = {
  available: "Available",
  "on-request": "On request",
  "to-be-confirmed": "Availability to be confirmed",
};

export function getCategory(slug: string): ProductCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, count = 3): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}
