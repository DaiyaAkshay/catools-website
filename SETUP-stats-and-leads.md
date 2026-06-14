# One-time setup: install counter + download leads

The functions in `functions/api/` (`ping.js`, `stats.js`, `lead.js`) need a single
Cloudflare KV namespace to store data. Without it they degrade gracefully (the
hub ping no-ops, the counter stays hidden, the download form still lets people
download) — but nothing is recorded until you bind it.

## Create + bind the KV namespace (5 minutes, once)

1. Cloudflare dashboard → **Storage & Databases → KV** → **Create a namespace**.
   Name it e.g. `catool`.
2. Go to **Workers & Pages → your Pages project (catool.co.in) → Settings →
   Functions → KV namespace bindings → Add binding**.
3. Variable name: **`CATOOL_KV`** (must match exactly). Namespace: the one you
   just created. Save.
4. Redeploy (any push redeploys, or use "Retry deployment").

That's it. The same namespace holds both:
- `install:<id>` keys — anonymous install pings (counter source)
- `lead:<timestamp>` + `leademail:<email>` keys — download form submissions

## See your data

- **Counts** — open `https://catool.co.in/api/stats` → `{ installs, active30 }`.
  The homepage strip auto-appears once installs cross `STATS_MIN` (25 — change
  it in `index.html`).
- **Leads** — Cloudflare dashboard → KV → `catool` → filter keys by `lead:`
  (each value is the full record incl. marketing-consent flag + timestamp), or
  run `wrangler kv:key list --binding CATOOL_KV --prefix lead:`.

## Notes

- The install ping carries **no personal data** — a random install id + app
  version + OS family only. Disclosed in the privacy policy.
- The download form requires name/email/mobile; the marketing-consent checkbox
  is optional (unticked) so the consent record stays legally valid.
