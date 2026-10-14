# A To Z Exports — Premium Agricultural Export Website

Simple, fast, premium single-site build: home, product catalogue, product pages,
about, quality, contact, quote request. No accounts, no dashboards — buyers enquire
as guests via the contact/RFQ forms.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · React Hook Form +
Zod · Lucide icons · Framer Motion.

## Run locally

```bash
cd "a-to-z-exports"
npm install
npm run dev        # http://localhost:3000
```

Checks: `npm run lint` · `npx tsc --noEmit` · `npm run build`.

## Content to confirm before launch

- `lib/site.ts` → real email, phone, WhatsApp, address (placeholders say “to be confirmed”)
- `data/products.ts` → grades/packaging/MOQ marked `confirmed: false` are layout
  placeholders — verify each with the business owner
- `NEXT_PUBLIC_SITE_URL` in `.env.local` → the real domain (canonical URLs, sitemap)
- Enquiry inbox → submit one test enquiry after deploy, then click the one-time
  activation link in the business inbox so future enquiries forward automatically

## Going live (Vercel — recommended, free to start)

1. **Put the code on GitHub**: create a repo, then in the project folder:
   ```bash
   git init; git add -A; git commit -m "A To Z Exports website"
   git branch -M main; git remote add origin https://github.com/YOU/atoz-exports.git
   git push -u origin main
   ```
   (`.env*` files are gitignored — secrets never leave your machine.)
2. **Deploy**: sign up at https://vercel.com → Add New → Project → import the repo →
   Framework Preset: Next.js (auto-detected) → Deploy. You get a live
   `https://atoz-exports.vercel.app` URL in ~2 minutes.
3. **Your own domain** (optional): buy one (e.g. Namecheap/GoDaddy/Hostinger),
   then Vercel project → Settings → Domains → add it → copy the shown DNS
   records to your registrar. HTTPS is automatic.
4. **Point the site at the domain**: Vercel → Environment Variables → add
   `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` → Redeploy.
5. **Update details anytime**: edit `lib/site.ts` / `data/products.ts`, commit,
   push — Vercel rebuilds and republishes automatically.

That's it — no server to manage, no database needed for this build.
