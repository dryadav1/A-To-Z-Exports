"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { getProduct, products } from "@/data/products";
import { COUNTRIES, DESTINATION_COUNTRIES, DESTINATION_PORTS, Field, OTHER_PORT, PhoneField, SAMPLE_SHIPPING_TERM, SHIPPING_TERMS, Select, Textarea, TextInput, isValidPhoneNumber } from "./fields";
import { SubmissionStatus, useInquirySubmit } from "./submit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  product?: string;
  grade?: string;
  quantity?: string;
  packaging?: string;
  destinationCountry?: string;
  destination?: string;
  shippingTerms?: string;
  message?: string;
}

export function QuoteForm({ defaultProductSlug }: { defaultProductSlug?: string }) {
  const { state, lastPayload, statusRef, submit, reset } = useInquirySubmit();
  const [errors, setErrors] = useState<Errors>({});
  const [destCountry, setDestCountry] = useState("");
  const [portValue, setPortValue] = useState("");
  const [shipValue, setShipValue] = useState("");
  const resolvedDefault = defaultProductSlug ? getProduct(defaultProductSlug)?.name ?? "" : "";
  const ports = destCountry ? (DESTINATION_PORTS[destCountry] ?? []) : [];
  const isSample = shipValue === SAMPLE_SHIPPING_TERM;

  if (state.status === "sent" || state.status === "error") {
    return <SubmissionStatus state={state} payload={lastPayload} statusRef={statusRef} onReset={reset} />;
  }

  async function handleSubmit(formData: FormData) {
    const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
    const countryCode = String(formData.get("countryCode") ?? "").trim();
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim().toLowerCase(),
      country: String(formData.get("country") ?? "").trim(),
      phone: phoneNumber ? `${countryCode} ${phoneNumber}`.trim() : "",
      product: String(formData.get("product") ?? "").trim(),
      grade: String(formData.get("grade") ?? "").trim(),
      quantity: String(formData.get("quantity") ?? "").trim(),
      packaging: String(formData.get("packaging") ?? "").trim(),
      destinationCountry: String(formData.get("destinationCountry") ?? "").trim(),
      destinationPort: String(formData.get("destinationPort") ?? "").trim(),
      destinationPortOther: String(formData.get("destinationPortOther") ?? "").trim(),
      shippingTerms: String(formData.get("shippingTerms") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const destination =
      values.destinationPort === OTHER_PORT
        ? values.destinationPortOther
        : values.destinationPort;
    const next: Errors = {};
    if (values.name.length < 2) next.name = "Please enter your full name.";
    if (values.company.length < 2) next.company = "Please enter your company name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email address — email only, no extra text.";
    if (!isValidPhoneNumber(phoneNumber)) next.phone = "Please enter a valid phone number with 6–14 digits.";
    if (!values.country) next.country = "Please select your country.";
    if (!values.product) next.product = "Please select a product of interest.";
    if (!values.grade) next.grade = "Please specify the required grade or specifications.";
    if (!values.quantity) next.quantity = "Please provide an estimated order quantity.";
    if (!values.packaging) next.packaging = "Please specify your preferred packaging.";
    if (!values.destinationCountry) next.destinationCountry = "Please select the destination country.";
    if (!destination) {
      next.destination =
        values.destinationPort === OTHER_PORT
          ? "Please type the destination port."
          : "Please select the destination port.";
    }
    if (!values.shippingTerms) next.shippingTerms = "Please select the shipping terms.";
    if (values.message.length < 10) next.message = "Please add any extra requirements (min. 10 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await submit({
      kind: "quote",
      ...values,
      destination: values.destinationCountry ? `${destination}, ${values.destinationCountry}` : destination,
    });
  }

  const sending = state.status === "sending";

  return (
    <form action={handleSubmit} noValidate aria-label="Request for quotation form" className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.name}>
          <TextInput name="name" autoComplete="name" placeholder="Priya Sharma" error={errors.name} required />
        </Field>
        <Field label="Company name" required error={errors.company}>
          <TextInput name="company" autoComplete="organization" placeholder="Global Foods Ltd." error={errors.company} required />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business email" required error={errors.email}>
          <TextInput
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@company.com"
            error={errors.email}
            required
          />
        </Field>
        <Field label="Phone / WhatsApp" required error={errors.phone}>
          <PhoneField error={errors.phone} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Country" required error={errors.country}>
          <Select name="country" defaultValue="" error={errors.country} required>
            <option value="" disabled>Select your country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Product of interest" required error={errors.product}>
          <Select name="product" defaultValue={resolvedDefault} error={errors.product} required>
            <option value="" disabled>Select a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>{p.name}</option>
            ))}
            <option value="Multiple / mixed consignment">Multiple / mixed consignment</option>
            <option value="Other (describe below)">Other (describe below)</option>
          </Select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Required grade / specifications" required error={errors.grade}>
          <TextInput name="grade" placeholder="E.g. 1121 steam, sortex-cleaned, 3–5% curcumin" error={errors.grade} required />
        </Field>
        <Field label="Estimated order quantity" required error={errors.quantity} hint={isSample ? "Trial samples are small — e.g. 1–5 kg." : undefined}>
          <TextInput
            name="quantity"
            placeholder={isSample ? "E.g. 2 kg trial sample" : "E.g. 1 × 20 ft container / 25 MT"}
            error={errors.quantity}
            required
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred packaging" required error={errors.packaging} hint={isSample ? "Small, food-safe sample packing is arranged by default." : undefined}>
          <TextInput name="packaging" placeholder="E.g. 25 kg PP bags, private label" error={errors.packaging} required />
        </Field>
        <Field label="Shipping terms" required error={errors.shippingTerms}>
          <Select
            name="shippingTerms"
            value={shipValue}
            onChange={(e) => setShipValue(e.target.value)}
            error={errors.shippingTerms}
            required
          >
            <option value="" disabled>Select FOB, CIF, EXW…</option>
            {SHIPPING_TERMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Destination country" required error={errors.destinationCountry}>
          <Select
            name="destinationCountry"
            value={destCountry}
            onChange={(e) => {
              setDestCountry(e.target.value);
              setPortValue("");
            }}
            error={errors.destinationCountry}
            required
          >
            <option value="" disabled>Select destination country</option>
            {DESTINATION_COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Field>
        <Field label="Destination port" required error={errors.destination}>
          <Select
            name="destinationPort"
            value={portValue}
            onChange={(e) => setPortValue(e.target.value)}
            error={errors.destination}
            required
            disabled={!destCountry}
          >
            <option value="" disabled>
              {destCountry ? "Select destination port" : "Select a country first"}
            </option>
            {ports.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
            {destCountry ? <option value={OTHER_PORT}>Other — type below</option> : null}
          </Select>
        </Field>
      </div>
      {portValue === OTHER_PORT ? (
        <Field label="Specify destination port" required error={errors.destination}>
          <TextInput
            name="destinationPortOther"
            placeholder="E.g. Port of Aqaba, Jordan"
            error={errors.destination}
            required
          />
        </Field>
      ) : (
        <input type="hidden" name="destinationPortOther" value="" />
      )}
      <Field label="Additional requirements" required error={errors.message}>
        <Textarea
          name="message"
          placeholder="Target price, shipment timeline, samples, documents needed…"
          error={errors.message}
          required
        />
      </Field>
      <div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ivory-100 transition-all hover:bg-forest-700 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {sending ? "Sending…" : "Submit RFQ"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-400">
          Quotes are prepared per product, specification and destination — we respond within 1–2 business days.
        </p>
      </div>
    </form>
  );
}
