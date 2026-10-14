"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const hintId = useId();
  const errorId = useId();
  return (
    <div>
      <label className="mb-1.5 block text-[0.78rem] font-bold uppercase tracking-[0.14em] text-forest-800">
        {label}
        {required ? <span aria-hidden="true" className="text-gold-600"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-xs leading-relaxed text-charcoal-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputStyles = (hasError?: boolean) =>
  cn(
    "w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] text-charcoal-800 placeholder:text-charcoal-400/70 transition-colors",
    hasError
      ? "border-red-700/60 focus:border-red-700"
      : "border-forest-800/15 focus:border-forest-700 hover:border-forest-800/30",
  );

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, className, ...rest } = props;
  return <input {...rest} aria-invalid={Boolean(error)} className={cn(inputStyles(Boolean(error)), className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  const { error, className, children, ...rest } = props;
  return (
    <select {...rest} aria-invalid={Boolean(error)} className={cn(inputStyles(Boolean(error)), className)}>
      {children}
    </select>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  const { error, className, ...rest } = props;
  return <textarea {...rest} aria-invalid={Boolean(error)} className={cn(inputStyles(Boolean(error)), "min-h-32 resize-y", className)} />;
}

export const COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain",
  "United States", "Canada", "United Kingdom", "Germany", "Netherlands", "France",
  "Singapore", "Malaysia", "Indonesia", "Vietnam", "Thailand", "Japan", "South Korea",
  "Australia", "South Africa", "Egypt", "Kenya", "Nigeria", "Ethiopia",
  "Bangladesh", "Sri Lanka", "Nepal", "Bhutan", "Maldives",
  "China", "Russia", "Ukraine", "Turkey", "Iraq", "Iran", "Yemen", "Morocco", "Algeria",
  "Brazil", "Mexico", "New Zealand", "Italy", "Spain", "Belgium", "Other",
];

/** Dial codes for the phone picker — business home country first, then A–Z. */
export const DIAL_CODES: { country: string; code: string }[] = [
  { country: "India", code: "+91" },
  { country: "Algeria", code: "+213" },
  { country: "Australia", code: "+61" },
  { country: "Bahrain", code: "+973" },
  { country: "Bangladesh", code: "+880" },
  { country: "Belgium", code: "+32" },
  { country: "Bhutan", code: "+975" },
  { country: "Brazil", code: "+55" },
  { country: "Canada", code: "+1" },
  { country: "China", code: "+86" },
  { country: "Egypt", code: "+20" },
  { country: "Ethiopia", code: "+251" },
  { country: "France", code: "+33" },
  { country: "Germany", code: "+49" },
  { country: "Indonesia", code: "+62" },
  { country: "Iran", code: "+98" },
  { country: "Iraq", code: "+964" },
  { country: "Italy", code: "+39" },
  { country: "Japan", code: "+81" },
  { country: "Kenya", code: "+254" },
  { country: "Kuwait", code: "+965" },
  { country: "Malaysia", code: "+60" },
  { country: "Maldives", code: "+960" },
  { country: "Mexico", code: "+52" },
  { country: "Morocco", code: "+212" },
  { country: "Nepal", code: "+977" },
  { country: "Netherlands", code: "+31" },
  { country: "New Zealand", code: "+64" },
  { country: "Nigeria", code: "+234" },
  { country: "Oman", code: "+968" },
  { country: "Qatar", code: "+974" },
  { country: "Russia", code: "+7" },
  { country: "Saudi Arabia", code: "+966" },
  { country: "Singapore", code: "+65" },
  { country: "South Africa", code: "+27" },
  { country: "South Korea", code: "+82" },
  { country: "Spain", code: "+34" },
  { country: "Sri Lanka", code: "+94" },
  { country: "Thailand", code: "+66" },
  { country: "Turkey", code: "+90" },
  { country: "Ukraine", code: "+380" },
  { country: "United Arab Emirates", code: "+971" },
  { country: "United Kingdom", code: "+44" },
  { country: "United States", code: "+1" },
  { country: "Vietnam", code: "+84" },
  { country: "Yemen", code: "+967" },
  { country: "Other", code: "+" },
];

/**
 * Phone input with a country-code selector. Renders two controls
 * (`countryCode` + `phoneNumber`); callers combine them on submit.
 */
export function PhoneField({ error }: { error?: string }) {
  const invalid = Boolean(error);
  return (
    <div className="flex gap-2">
      <div className="w-32 shrink-0">
        <label className="sr-only" htmlFor="phone-code">
          Country code
        </label>
        <select
          id="phone-code"
          name="countryCode"
          defaultValue="+91"
          required
          aria-invalid={invalid}
          className={cn(inputStyles(invalid), "px-3")}
        >
          {DIAL_CODES.map((d) => (
            <option key={`${d.country}-${d.code}`} value={d.code}>
              {d.code} {d.country}
            </option>
          ))}
        </select>
      </div>
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor="phone-number">
          Phone / WhatsApp number
        </label>
        <input
          id="phone-number"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-invalid={invalid}
          placeholder="98765 43210"
          className={inputStyles(invalid)}
        />
      </div>
    </div>
  );
}

/** Digits-only length check for the phone number part (code excluded). */
export function isValidPhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 14;
}

/** Incoterms 2020 shipping methods offered to buyers. */
export const SAMPLE_SHIPPING_TERM = "Sample — trial shipment before bulk order";

export const SHIPPING_TERMS = [
  "EXW — Ex Works",
  "FCA — Free Carrier",
  "FAS — Free Alongside Ship",
  "FOB — Free on Board",
  "CFR — Cost and Freight",
  "CIF — Cost, Insurance and Freight",
  "CPT — Carriage Paid To",
  "CIP — Carriage and Insurance Paid To",
  "DAP — Delivered at Place",
  "DPU — Delivered at Place Unloaded",
  "DDP — Delivered Duty Paid",
  SAMPLE_SHIPPING_TERM,
  "To be discussed",
];

/** Major destination seaports keyed by destination country. */
export const DESTINATION_PORTS: Record<string, string[]> = {
  "United Arab Emirates": ["Jebel Ali", "Port Rashid", "Khalifa Port (Abu Dhabi)", "Port Khalid (Sharjah)", "Port of Fujairah"],
  "Saudi Arabia": ["Jeddah Islamic Port", "King Abdullah Port", "King Abdulaziz Port (Dammam)", "Jubail Port"],
  Qatar: ["Hamad Port", "Doha Port", "Mesaieed Port"],
  Kuwait: ["Shuwaikh Port", "Shuaiba Port"],
  Oman: ["Sohar Port", "Salalah Port", "Sultan Qaboos Port (Muscat)"],
  Bahrain: ["Khalifa Bin Salman Port", "Mina Salman"],
  "United States": ["Port of New York & New Jersey", "Port of Los Angeles / Long Beach", "Port of Houston", "Port of Savannah", "Port of Norfolk"],
  Canada: ["Port of Vancouver", "Port of Montreal", "Port of Toronto", "Port of Halifax"],
  "United Kingdom": ["Port of Felixstowe", "Port of Southampton", "London Gateway", "Port of Liverpool"],
  Germany: ["Port of Hamburg", "Port of Bremerhaven"],
  Netherlands: ["Port of Rotterdam", "Port of Amsterdam"],
  France: ["Port of Le Havre", "Marseille-Fos", "Port of Dunkirk"],
  Singapore: ["Port of Singapore"],
  Malaysia: ["Port Klang", "Port of Tanjung Pelepas", "Penang Port"],
  Indonesia: ["Tanjung Priok (Jakarta)", "Tanjung Perak (Surabaya)", "Belawan (Medan)"],
  Vietnam: ["Cat Lai (Ho Chi Minh City)", "Haiphong Port", "Da Nang Port"],
  Thailand: ["Laem Chabang", "Bangkok Port (Klong Toey)"],
  Japan: ["Port of Tokyo", "Port of Yokohama", "Port of Osaka / Kobe", "Port of Nagoya"],
  "South Korea": ["Port of Busan", "Port of Incheon", "Port of Gwangyang"],
  Australia: ["Port of Melbourne", "Port Botany (Sydney)", "Port of Brisbane", "Port of Fremantle"],
  "South Africa": ["Port of Durban", "Port of Cape Town", "Port of Ngqura"],
  Egypt: ["Port of Alexandria", "Port Said", "Ain Sokhna"],
  Kenya: ["Port of Mombasa", "Port of Lamu"],
  Nigeria: ["Apapa / Tin Can (Lagos)", "Onne Port"],
  Ethiopia: ["Port of Djibouti (gateway for Ethiopia)"],
  Bangladesh: ["Chattogram (Chittagong)", "Mongla Port"],
  "Sri Lanka": ["Port of Colombo", "Hambantota Port"],
  Nepal: ["Kolkata / Haldia (via, for Nepal)", "Birgunj Dry Port"],
  Bhutan: ["Kolkata (via, for Bhutan)"],
  Maldives: ["Malé Port"],
  China: ["Port of Shanghai", "Ningbo-Zhoushan", "Port of Shenzhen", "Port of Qingdao", "Port of Guangzhou"],
  Russia: ["Port of Novorossiysk", "Port of St. Petersburg", "Port of Vladivostok"],
  Ukraine: ["Port of Odesa", "Port of Chornomorsk"],
  Turkey: ["Port of Mersin", "Ambarli (Istanbul)", "Port of Izmir"],
  Iraq: ["Umm Qasr Port", "Khor Al Zubair (Basra)"],
  Iran: ["Bandar Abbas", "Chabahar Port"],
  Yemen: ["Port of Aden", "Port of Hodeidah"],
  Morocco: ["Tanger Med", "Port of Casablanca"],
  Algeria: ["Port of Algiers", "Port of Oran"],
  Brazil: ["Port of Santos", "Port of Paranaguá", "Port of Rio de Janeiro"],
  Mexico: ["Port of Veracruz", "Port of Manzanillo", "Port of Altamira"],
  "New Zealand": ["Port of Auckland", "Port of Tauranga"],
  Italy: ["Port of Genoa", "Gioia Tauro", "Port of Naples"],
  Spain: ["Port of Algeciras", "Port of Valencia", "Port of Barcelona"],
  Belgium: ["Port of Antwerp-Bruges", "Port of Zeebrugge"],
  India: ["Mundra Port", "Nhava Sheva (Mumbai)", "Chennai Port", "Cochin Port", "Kolkata / Haldia"],
};

/** Destination-country options: buyer countries plus India. */
export const DESTINATION_COUNTRIES = [...COUNTRIES.filter((c) => c !== "Other"), "India", "Other"];

/** Sentinel value for "port not listed — type it in". */
export const OTHER_PORT = "__other";
