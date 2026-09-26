# catool.co.in — website

Marketing site and small API for CA Akshay Daiya's desktop tools: the **CAtool hub** (26AS / AIS / TIS
Downloader, GSTR-2B Recon, Tally Audit, CAtool Remote), **Docward** and **TallyDrop**.

## How it's hosted

- A **Cloudflare Worker** (`worker.js`, configured in `wrangler.jsonc`). It answers `/api/*` itself and
  serves everything else as static files from this folder (`env.ASSETS`).
- **Cloudflare deploys `main` automatically** — a push to `main` is live in about a minute. Work on a branch
  and merge when ready.
- `.assetsignore` keeps repo files (`worker.js`, `*.md`, `.git`, …) from being served.
- `/api/*` routes in `worker.js`: `lead`, `ping`, `stats`, `config`, `myip`, `subscribe`, `key`, `recovery/*`,
  `docward/webhook`, `docward/license`. See [SETUP-stats-and-leads.md](SETUP-stats-and-leads.md) for the KV data.

## Local preview

```powershell
python -m http.server 5500     # static pages only; /api/* returns 404 locally
npx wrangler dev               # full Worker incl. /api/* (needs a Cloudflare login)
```

Pages are served with clean URLs in production (`/download.html` redirects to `/download`).

## Pages

| Page | Purpose |
|---|---|
| `/` (`index.html`) | Home: products, how it works, security, FAQ |
| `/download.html` | CAtool hub download (lead form, latest release from GitHub) |
| `/26as-downloader.html`, `/gstr2b-recon.html`, `/tally-audit.html` | Hub tool pages |
| `/docward` (`docward.html`) | Docward: download, Pro pricing (Razorpay), licence pickup |
| `/tallydrop/` | TallyDrop: page, `TallyDrop.exe`, `version.json` (read by installed copies) |
| `/pricing.html` | "Free during early access" |
| `/subscribe.html`, `/success.html` | Hub subscription flow (opened by the hub; hidden while `freeMode` is on) |
| `/privacy.html`, `/terms.html`, `/refund.html`, `/contact.html` | Legal pages (also needed for Razorpay KYC) |
| `banners.json` | In-app announcement banners read by the hub |

## Addresses the apps depend on — don't rename or remove

- Hub: `/api/config`, `/api/ping`, `/banners.json`, `/api/recovery/send-code`, `/api/recovery/verify-code`,
  `/api/myip`, `/subscribe.html?tier=…&device=…`
- TallyDrop: `/tallydrop/version.json`, `/tallydrop/TallyDrop.exe`
- Docward: `/api/docward/license`, `/docward` (success redirect)

## Downloads

Installers live in public GitHub release repos (source code stays private):
`DaiyaAkshay/catool-releases` (hub), `catool-tool-releases` (hub tools), `docward-releases` (Docward).
TallyDrop's exe is committed here under `tallydrop/` (it's ~140 KB).
