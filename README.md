# catool.co.in — marketing site

Static marketing site for the CA Tools product line. Hosted on Cloudflare Pages.
Two small Pages Functions (`functions/api/subscribe.js`, `functions/api/key.js`)
proxy subscription calls to the licence server so the browser only ever sees
the catool.co.in origin.

## Local preview

Any static HTTP server works. The simplest:

```powershell
cd H:\ca-tools-website
npx serve@latest -p 5173 .
# open http://localhost:5173
```

The `/api/*` endpoints will return 404 locally — that's fine; they only run
on Cloudflare. To test them locally, use Cloudflare's wrangler:

```powershell
npx wrangler@latest pages dev .
# now /api/subscribe and /api/key proxy to your LICENSE_SERVER_URL
```

## Production deploy (Cloudflare Pages, free tier)

1. **Push to GitHub** — create a new repo (e.g. `catools-website`) and push this
   folder. Cloudflare Pages auto-deploys from `main`.

2. **Connect to Cloudflare Pages**
   - Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
   - Pick your repo. Framework preset: **None**. Build command: leave empty.
     Output directory: leave as `/` (the site is already static).
   - Save and deploy. You'll get a default URL like
     `https://catools-website.pages.dev`.

3. **Set the environment variable**
   - Pages project → Settings → Environment variables → Production.
   - Add `LICENSE_SERVER_URL` = the URL of your deployed licence-server
     (e.g. `https://catools-license.onrender.com`). No trailing slash.
   - Re-deploy (Cloudflare does this automatically when you save).

4. **Custom domain**
   - Buy `catool.co.in` (Namecheap, ~₹650/yr).
   - Pages project → Custom domains → Set up a custom domain → `catool.co.in`.
   - Cloudflare gives you two name-servers. Paste them into Namecheap's
     "Custom DNS" section. SSL takes 5–10 minutes to provision.
   - Repeat for `www.catool.co.in` (optional, but recommended).

5. **Update the desktop app's subscribe URL**
   - Edit `H:\IT-Downloader\renderer\app.js` → find `openSubscribePage`.
   - Replace `https://your-license-backend.example.com/subscribe`
     with `https://catool.co.in/subscribe.html?device=${dev}`.

## Pages
- `/` — home, product showcase
- `/26as-downloader.html` — main paid product
- `/gstr2b-recon.html` — free product
- `/tally-audit.html` — coming-soon product
- `/pricing.html` — ₹99/mo, FAQ
- `/subscribe.html` — UPI subscription form
- `/success.html` — post-payment polling for the activation key
- `/privacy.html`, `/terms.html`, `/refund.html`, `/contact.html` — required by Razorpay for KYC approval

## Razorpay KYC notes

Razorpay reviewer will check that the live website has, at minimum:
- a clear product description ✅ (home + product pages)
- pricing in INR ✅ (`/pricing.html`)
- refund / cancellation policy ✅ (`/refund.html`)
- privacy policy ✅ (`/privacy.html`)
- terms of service ✅ (`/terms.html`)
- contact details with phone number ✅ (`/contact.html` + footer)
- business address ✅ (`/contact.html` and `/terms.html`)

Once the site is live at `catool.co.in`, submit the website URL to Razorpay
in your KYC submission. Live mode is usually approved within 2-3 working days.

## File layout

```
ca-tools-website/
├── index.html
├── 26as-downloader.html
├── gstr2b-recon.html
├── tally-audit.html
├── pricing.html
├── subscribe.html
├── success.html
├── privacy.html
├── terms.html
├── refund.html
├── contact.html
├── assets/
│   └── styles.css
├── functions/
│   └── api/
│       ├── subscribe.js
│       └── key.js
├── _headers
├── README.md
└── .gitignore
```
