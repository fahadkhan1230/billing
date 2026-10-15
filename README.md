# Ucchash Center Billing System (Multi-page Next.js)

## What changed
- Separate reusable `SiteHeader.tsx` and `SiteFooter.tsx` components.
- Each wizard step has its own App Router page URL: `/billing/step-1` through `/billing/step-9`.
- Final printable invoice has a separate route: `/billing/invoice`.
- Form data is shared across pages and auto-saved in browser localStorage, so moving to the next page does not clear entered values.
- STP profile save/load/delete uses `/api/profiles` and MongoDB when `.env.local` is configured.
- Logo and organization name are code-configured in `src/lib/branding.ts`: change `ORG_NAME` and `ORG_LOGO`; put the logo file in `public/`. No logo upload control appears on the website.
- Developer credit is configured in `src/components/SiteFooter.tsx` and invoice page.

## Run
1. Install Node.js LTS.
2. Extract the ZIP and open this folder in terminal.
3. Run `npm install`.
4. Optional MongoDB: copy `.env.example` to `.env.local` and set `MONGODB_URI` and `MONGODB_DB`.
5. Run `npm run dev`, then open `http://localhost:3000`.

## Pages/components
- `src/app/page.tsx` — welcome page
- `src/app/billing/step-1/page.tsx` — mode and tranche
- `src/app/billing/step-2/page.tsx` — ADTP/TSTP
- `src/app/billing/step-3/page.tsx` — batch count
- `src/app/billing/step-4/page.tsx` — STP profile
- `src/app/billing/step-5/page.tsx` — trainer/trainee counts and amounts
- `src/app/billing/step-6/page.tsx` — invoice metadata
- `src/app/billing/step-7/page.tsx` — bank details
- `src/app/billing/step-8/page.tsx` — trainee list and CSV export
- `src/app/billing/step-9/page.tsx` — calculations and exports
- `src/app/billing/invoice/page.tsx` — final printable invoice (browser Print > Save as PDF, A4)
- `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, `StepLayout.tsx`, `Fields.tsx`, `InvoiceLetterhead.tsx` — reusable components
- `src/context/BillingContext.tsx` — shared data and localStorage persistence
- `src/lib/branding.ts` — code-only organization/logo/developer configuration

Note: PDF uses the browser print dialog; choose A4 and “Save as PDF”. Validate amounts and organization-specific fields before submitting an official claim.
