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

## Editing pages

Shared parts are kept in one place and written into every page by a small build script (Node, no packages):

| What | Where to edit |
|---|---|
| Page titles, descriptions, canonical URLs, social tags, structured data, sitemap | `scripts/pages.mjs` |
| Top menu | `_layout/header.html` (per-page button: `cta` in `pages.mjs`) |
| Footer (product links come from `PRODUCT_LINKS` in `pages.mjs`) | `_layout/footer.html` |
| Download form (name / email / mobile → `/api/lead`, then the file) | `_layout/lead-modal.html`, `assets/lead.js` |

```powershell
node scripts/build.mjs           # after any change: updates every page + sitemap.xml
node scripts/build.mjs --check   # verify nothing is out of date (exit code 1 if it is)
node scripts/serve.mjs           # preview at http://localhost:5500 — behaves like production
```

In each page, the regions between `<!-- @head -->`, `<!-- @header -->`, `<!-- @footer -->` and `<!-- @leadform -->`
markers are generated; everything else is the page's own content. The build also turns internal links to
clean URLs (`/pricing`, not `/pricing.html`) and versions `styles.css` / `lead.js` by content hash, so a CSS
change reaches visitors immediately.

**Adding a product:** write its page, add it to `PAGES` (and `APPS` if downloadable) and `PRODUCT_LINKS` in
`pages.mjs`, add a card to the home `#products` catalogue and `/download`, run the build.

**Download buttons:** any link with `data-download="catool" | "docward" | "tallydrop"` opens the download form.
Keep a direct `href` to the file on it as a fallback.

`serve.mjs` runs the real `worker.js`, so `/api/*` works locally too (without KV, the Worker's safe defaults
apply, e.g. `freeMode: true`). For the Worker exactly as deployed, `npx wrangler dev` (needs a Cloudflare login).

## Pages

| Page | Purpose |
|---|---|
| `/` (`index.html`) | Home: products, how it works, security, FAQ |
| `/download` | All downloads: CAtool hub, plus Docward and TallyDrop |
| `/26as-downloader`, `/gstr2b-recon`, `/tally-audit` | Hub tool pages |
| `/docward` | Docward: download, Pro pricing (Razorpay), licence pickup |
| `/tallydrop/` | TallyDrop: page, `TallyDrop.exe`, `version.json` (read by installed copies) |
| `/pricing` | What each app costs |
| `/subscribe`, `/success` | Hub subscription flow (opened by the hub; form hidden while `freeMode` is on) |
| `/privacy`, `/terms`, `/refund`, `/contact` | Legal pages (also needed for Razorpay KYC) |
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
