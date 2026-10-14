"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { products } from "@/data/products";
import { COUNTRIES, Field, PhoneField, SHIPPING_TERMS, Select, Textarea, TextInput, isValidPhoneNumber } from "./fields";
import { SubmissionStatus, useInquirySubmit } from "./submit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  product?: string;
  shippingTerms?: string;
  message?: string;
}

export function ContactForm({ defaultProduct }: { defaultProduct?: string }) {
  const { state, lastPayload, statusRef, submit, reset } = useInquirySubmit();
  const [errors, setErrors] = useState<Errors>({});

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
      inquiryType: String(formData.get("inquiryType") ?? ""),
      product: String(formData.get("product") ?? ""),
      shippingTerms: String(formData.get("shippingTerms") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const next: Errors = {};
    if (values.name.length < 2) next.name = "Please enter your full name.";
    if (values.company.length < 2) next.company = "Please enter your company name.";
    if (!EMAIL_RE.test(values.email)) next.email = "Please enter a valid email address — email only, no extra text.";
    if (!isValidPhoneNumber(phoneNumber)) next.phone = "Please enter a valid phone number with 6–14 digits.";
    if (!values.country) next.country = "Please select your country.";
    if (!values.product) next.product = "Please select a product of interest.";
    if (!values.shippingTerms) next.shippingTerms = "Please select the shipping terms.";
    if (values.message.length < 10) next.message = "Please describe your requirement (min. 10 characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    await submit({ kind: "contact", ...values });
  }

  const sending = state.status === "sending";

  return (
    <form
      action={handleSubmit}
      noValidate
      aria-label="Business inquiry form"
      className="grid gap-5"
    >
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
        <Field label="Inquiry type" hint="Helps us route your message faster.">
          <Select name="inquiryType" defaultValue="Product sourcing">
            {["Product sourcing", "Pricing & quotation", "Samples", "Partnership", "Other"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Product of interest" required error={errors.product}>
          <Select name="product" defaultValue={defaultProduct ?? ""} error={errors.product} required>
            <option value="" disabled>Select a product</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>{p.name}</option>
            ))}
          </Select>
        </Field>
        <Field label="Shipping terms" required error={errors.shippingTerms}>
          <Select name="shippingTerms" defaultValue="" error={errors.shippingTerms} required>
            <option value="" disabled>Select FOB, CIF, EXW…</option>
            {SHIPPING_TERMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Your requirement" required error={errors.message}>
        <Textarea
          name="message"
          placeholder="Product, target specifications, estimated quantity, destination market…"
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
          {sending ? "Sending…" : "Send inquiry"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-charcoal-400">
          By submitting, you agree to be contacted about your inquiry. We never share your details.
        </p>
      </div>
    </form>
  );
}
