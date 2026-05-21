# How to Start a New San Patrik Landing Page

This template produces a complete luxury real estate landing page identical in
structure to petram.sanpatrik.co. Follow the steps below in order.

---

## Step 1 — Copy template

Duplicate the `_template\` folder and rename it:

```
C:\aureus-development\san-patrik\[project-name]\
```

Or use the scaffold script (recommended):

```bash
node C:\aureus-development\san-patrik\_template\scripts\new-project.js [project-name]
```

---

## Step 2 — Update content

Open `/lib/content.ts` and replace **every** `PLACEHOLDER_` value with real content.
All text, numbers, phone numbers, URLs, and image paths live here — you should
never need to edit JSX files for copy changes.

Key fields to fill first:
- `meta.title` / `meta.description` / `meta.siteUrl`
- `nav.brandName` / `nav.phone`
- `hero.vimeoId`
- `agent.*`
- `project.startingPrice` / `project.totalUnits`

---

## Step 3 — Add images

Drop images into `/public/images/` following this exact naming convention:

```
/public/images/hero/
  hero-poster.webp          ← used as og:image meta tag

/public/images/villas/
  villa-type-1.webp
  villa-type-2.webp
  villa-type-3.webp
  villa-type-4.webp         ← optional fourth type

/public/images/lifestyle/
  pool.webp
  spa.webp
  golf.webp
  dining.webp
  beach.webp
  villa-interior.webp

/public/images/agent/
  [agent-slug].webp         ← match content.agent.imageSrc

/public/images/logos/
  [agency-logo].svg
  leadingre-badge.png       ← only if content.project.leadingReMember = true
```

Recommended format: **WebP**, max 1920px wide, quality 80–85.
For the hero poster (og:image): 1200×630px minimum.

---

## Step 4 — Update Vimeo

1. Upload the client's background video to Vimeo
2. Set the video to **Unlisted** and enable background playback in Vimeo settings
3. Copy the numeric video ID from the URL: `https://vimeo.com/[VIDEO_ID]`
4. Set `content.hero.vimeoId` in `content.ts`

---

## Step 5 — Create Sanity project

1. Go to [sanity.io/manage](https://sanity.io/manage) and create a new project
2. Dataset: `production` (public read is fine — the API route handles writes)
3. Copy the **Project ID** — you'll need it in the next step
4. Add `[project].sanpatrik.co` under **API → CORS Origins** (allow credentials: no)
5. Open `sanity.config.ts` and replace `PLACEHOLDER_PROJECT_SLUG` and `PLACEHOLDER_PROJECT_TITLE`
6. Deploy to Vercel first, then invite the client as Editor at sanity.io/manage → Members

The Studio will be live at `[project].sanpatrik.co/studio` once deployed.

---

## Step 6 — Update environment variables

```bash
cp .env.local.example .env.local
```

Fill in all variables:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | console.google.com/recaptcha — type v3, domain: `[project].sanpatrik.co` |
| `RECAPTCHA_SECRET_KEY` | Same reCAPTCHA project — the secret key |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Cloud Console — Maps Embed API |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager — confirm with client: new container or reuse? |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business Manager → Events Manager |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Campaign Manager |
| `HUBSPOT_TOKEN` | HubSpot → Settings → Private Apps → create with contacts+notes write scopes |
| `RESEND_API_KEY` | resend.com → API Keys (domain `sanpatrik.co` must be verified) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | sanity.io/manage → project overview |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

---

## Step 7 — Test locally

```bash
cd C:\aureus-development\san-patrik\[project-name]
npm install
npm run dev
```

Check:
- [ ] Hero video plays on desktop and mobile
- [ ] Lead form submits (check Network tab for `/api/submit-lead`)
- [ ] All phone/WhatsApp links use the correct number
- [ ] og:image shows correctly (use https://developers.facebook.com/tools/debug/)
- [ ] GTM preview mode shows `lp_visit` event on page load

---

## Step 8 — Deploy

```bash
git init && git add . && git commit -m "init: [project-name] landing page"
```

1. Push to GitHub under `san-patrik/[project-name]`
2. Connect repo to Vercel (import project)
3. Add all `.env.local` values as Vercel Environment Variables
4. Add custom domain: `[project-name].sanpatrik.co` → point DNS to Vercel
5. Verify SSL certificate issued

---

## Checklist before go-live

- [ ] All PLACEHOLDER_ values replaced in `content.ts`
- [ ] All images in `/public/images/` (no 404s in Network tab)
- [ ] Real Vimeo video ID set
- [ ] All `.env.local` variables filled and added to Vercel
- [ ] Sanity project created, CORS origin added, client invited as Editor
- [ ] `sanity.config.ts` — `PLACEHOLDER_PROJECT_SLUG` and `PLACEHOLDER_PROJECT_TITLE` replaced
- [ ] Sanity Studio accessible at `[project].sanpatrik.co/studio`
- [ ] FAQ answers filled in (`components/sections/FAQ.tsx`)
- [ ] Testimonials replaced (`components/sections/SocialProof.tsx`)
- [ ] CookieConsent integrated (Cookiebot or CookieFirst) in `components/tracking/CookieConsent.tsx`
- [ ] CSP headers reviewed and `unsafe-inline` removed if possible
- [ ] GTM container published with all 9 triggers configured
- [ ] Meta Pixel and LinkedIn Insight verified firing in browser
