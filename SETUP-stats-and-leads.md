# Install counter + download leads

`worker.js` handles `/api/ping`, `/api/stats` and `/api/lead` and stores everything in one
Cloudflare KV namespace, bound as **`CATOOL_KV`** in `wrangler.jsonc` (namespace id
`e528a47004b147cf8e1487293a7c7141`). The binding ships with every deploy, so there's nothing to
set up by hand. If KV were missing, the handlers degrade gracefully: the hub ping no-ops, the
counter stays hidden, and the download form still lets people download.

The namespace holds:
- `install:<id>` — anonymous install pings from the CAtool hub (the counter's source)
- `lead:<timestamp>-<rand>` + `leademail:<email>` — download-form submissions. The `source`
  field says which page they came from (`download` for CAtool, `tallydrop` for TallyDrop).
- `docward:lic:*` — Docward licences issued by the Razorpay webhook
- `config` — the hub's remote config / kill switch (see `/api/config`)

## See your data

- **Counts** — `https://catool.co.in/api/stats` → `{ installs, active30 }`. The homepage strip
  appears once installs cross `STATS_MIN` (25, set in `index.html`).
- **Leads** — Cloudflare dashboard → Storage & Databases → KV → the namespace above → filter keys
  by `lead:`. Or: `npx wrangler kv key list --binding CATOOL_KV --prefix lead: --remote`.

## Notes

- The install ping carries **no personal data**: a random install id, app version and OS family.
  Disclosed in the privacy policy.
- The download form requires name, email and mobile. The marketing-consent checkbox is optional
  and unticked by default, so the consent record stays valid.
