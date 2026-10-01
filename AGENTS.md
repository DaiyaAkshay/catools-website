# catools-website (catool.co.in)

## What this is
The marketing site and small API for CA Akshay Daiya's desktop tools (CAtool hub, Docward, TallyDrop),
served at https://catool.co.in. Visitors download installers here; installed apps call its `/api/*` routes.

## Owning agent
Claude. The other agent works here only on its own task branch.

## Stack and layout
- One Cloudflare Worker: `worker.js`, configured in `wrangler.jsonc` (`name: catools-site`,
  `compatibility_date 2026-06-15`, `nodejs_compat`). It answers `/api/*` and serves every other path as a
  static file from the repo root (`env.ASSETS`). KV namespace binding `CATOOL_KV`.
- No package.json, no dependencies. Build/preview scripts are plain Node (`scripts/*.mjs`; Node 23.7 on this PC).
- `*.html` at the root, `tallydrop/` (page, `TallyDrop.exe`, `version.json`): the pages.
- `scripts/pages.mjs`: page titles, meta, canonical URLs, structured data, sitemap, `PRODUCT_LINKS`.
- `_layout/header.html`, `footer.html`, `lead-modal.html`: shared parts written into every page by the build.
- `assets/`: `styles.css`, `lead.js` (download form), logos, screenshots.
- `banners.json`: in-app banners read by the hub.

## Commands (PowerShell)
```powershell
node scripts/build.mjs           # rewrite generated regions of every page + sitemap.xml
node scripts/build.mjs --check   # exit 1 if any page is out of date; changes nothing
node scripts/serve.mjs           # preview at http://localhost:5500, runs the real worker.js
npx wrangler dev                 # Worker exactly as deployed (needs a Cloudflare login)
```
No install step and no test suite. `build.mjs --check` is the only automated check.

Release: there is no release step. **Cloudflare deploys `main` automatically; a push to `main` is live in
about a minute.** Work on a branch; merge or push to `main` only with the owner's yes.

## Test baseline (2026-10-01)
- `node scripts/build.mjs --check` in a normal Windows checkout: **fails, 14 files "out of date"**.
  Cause: `core.autocrlf=true` and no `.gitattributes`, so pages are checked out with CRLF while the build
  writes LF. On an LF copy of the same commit (`git archive HEAD`) it prints "Everything up to date".
  So a CRLF-only "out of date" is not a real change. Don't commit a mass line-ending rewrite to "fix" it.

## Rules specific to this repo
- Only edit content between the `<!-- @head -->`, `<!-- @header -->`, `<!-- @footer -->`,
  `<!-- @leadform -->` markers by editing `scripts/pages.mjs` / `_layout/*`, then run the build.
  Everything outside the markers is the page's own content.
- Addresses the apps depend on. Never rename or remove:
  - Hub: `/api/config`, `/api/ping`, `/banners.json`, `/api/recovery/send-code`, `/api/recovery/verify-code`,
    `/api/myip`, `/subscribe.html?tier=…&device=…`
  - TallyDrop: `/tallydrop/version.json`, `/tallydrop/TallyDrop.exe` (both listed in
    `assets.run_worker_first` so the Worker counts them)
  - Docward: `/api/docward/license`, `/api/docward/webhook`, `/docward` (payment success redirect)
- Download buttons: `data-download="catool|docward|tallydrop"` plus a direct `href` fallback.
- Secrets used by `worker.js` (`DOCWARD_LICENSE_SK`, `DOCWARD_RAZORPAY_WEBHOOK_SECRET`, `STATS_SALT`) are
  Cloudflare Worker secrets. They are never written into `wrangler.jsonc` or any file in the repo.
  `.gitignore` covers only `node_modules/`, `.wrangler/`, `*.log`, `.DS_Store`. A local `.dev.vars` file
  (wrangler's local secrets) is **not** ignored, so never create one here without adding it to `.gitignore`.
- What is public: `.assetsignore` keeps `*.md`, `worker.js`, `wrangler.jsonc`, `scripts/`, `_layout/`,
  `.git`, `.github` out of the served files, so `AGENTS.md`/`CLAUDE.md` are not served. Any new
  non-public file type or folder must be added to `.assetsignore`.
- KV data (`lead:*`, `leademail:*`, `docward:lic:*`, `install:*`, `config`) holds leads and licences.
  Never dump it into the repo.
- The install ping carries no personal data. Keep it that way; the privacy page says so.
- Legal pages (`privacy`, `terms`, `refund`, `contact`) are needed for Razorpay KYC. Don't remove them.

## Docs
- [README.md](README.md): hosting, page editing, page list, app-dependent addresses, downloads
- [SETUP-stats-and-leads.md](SETUP-stats-and-leads.md): KV keys, stats endpoints, how to read leads
