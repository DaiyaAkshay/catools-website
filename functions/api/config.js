// Cloudflare Pages Function — GET /api/config
//
// Remote runtime config / KILL SWITCH for the CAtool hub + its tools.
//
// The desktop hub fetches this on launch and every few minutes, caches it
// locally (fail-open), and gates tool access on it. Editing the value flips
// behaviour on every running install within minutes — no app update needed.
//
// ── Source of truth: Cloudflare KV (binding CATOOL_KV), key "config" ──────────
// Flip the switch from the Cloudflare dashboard (Workers & Pages → KV →
// CATOOL_KV → edit key "config"), or via wrangler:
//   wrangler kv:key put --binding=CATOOL_KV config '{"freeMode":false}'
//
// ── Shape (all fields optional) ──────────────────────────────────────────────
//   freeMode    bool    true  → every tool is free (early access).
//                       false → enforce the normal trial/subscription gates.
//   freeUntil   ISO date|null  Free until this date even if freeMode is false;
//                              after it, paid. Lets you schedule the cut-over.
//   killSwitch  bool    true  → HARD STOP: the hub blocks all tool launches and
//                              shows `message`. The actual "cease services" lever.
//   minVersion  string  Builds older than this semver are blocked ("please update").
//   message     string  Shown to the user whenever they're blocked.
//
// Safe defaults below === today's behaviour (everything free, nothing blocked),
// so a missing/empty/corrupt KV value can never disrupt users.

const DEFAULTS = {
  freeMode: true,
  freeUntil: null,
  killSwitch: false,
  minVersion: '0.0.0',
  message: '',
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      // Never cache the kill switch — flips must propagate fast.
      'cache-control': 'no-store',
    },
  });

export async function onRequestGet({ env }) {
  let cfg = {};
  try {
    const kv = env.CATOOL_KV;
    if (kv) {
      const raw = await kv.get('config');
      if (raw) cfg = JSON.parse(raw);
    }
  } catch {
    // Bad JSON in KV → ignore and serve safe defaults rather than 500, so a
    // typo in the config can never take the whole fleet down.
    cfg = {};
  }
  return json({ ...DEFAULTS, ...cfg, served_at: new Date().toISOString() });
}
