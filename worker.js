// CAtool website Worker — single entrypoint.
//
// Cloudflare merged Pages into Workers; the old `functions/` (Pages Functions)
// convention is NOT executed by a Workers deploy, so this Worker reproduces
// each former function and routes by URL. Anything that isn't an /api/* route
// falls through to the static assets (the HTML pages) via env.ASSETS.
//
// Bindings (see wrangler.jsonc):
//   env.CATOOL_KV          KV namespace — install pings + download leads
//   env.LICENSE_SERVER_URL var — license-server base URL (subscribe/key/recovery)
//   env.ASSETS             static assets binding (the website files)

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'content-type',
  'access-control-allow-methods': 'POST, GET, OPTIONS',
};

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...extra },
  });

const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS preflight for the browser-facing endpoints.
    if (method === 'OPTIONS' && path.startsWith('/api/')) {
      return new Response(null, { status: 204, headers: CORS });
    }

    try {
      if (path === '/api/lead' && method === 'POST')   return await handleLead(request, env);
      if (path === '/api/ping' && method === 'POST')   return await handlePing(request, env);
      if (path === '/api/stats' && method === 'GET')   return await handleStats(env);
      if (path === '/api/subscribe' && method === 'POST') return await proxySubscribe(request, env);
      if (path === '/api/key' && method === 'GET')     return await proxyKey(request, env);
      if (path.startsWith('/api/recovery/') && method === 'POST') return await proxyRecovery(request, env, path);
      if (path === '/api/config' && method === 'GET')  return await handleConfig(env);
      // Docward PDF licensing (Razorpay → signed Ed25519 license).
      if (path === '/api/docward/webhook' && method === 'POST') return await docwardWebhook(request, env);
      if (path === '/api/docward/license' && method === 'GET')  return await docwardGetLicense(request, env);

      // Unknown /api path → JSON 404 (so callers get a clean error, not an HTML page).
      if (path.startsWith('/api/')) return json({ ok: false, error: 'not found' }, 404, CORS);
    } catch (e) {
      return json({ ok: false, error: 'server error: ' + (e && e.message) }, 500, CORS);
    }

    // Everything else: serve the static website.
    return env.ASSETS.fetch(request);
  },
};

// ── POST /api/lead ─────────────────────────────────────────────
// Stores a download lead (name, email, mobile + optional marketing consent).
async function handleLead(request, env) {
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, error: 'bad json' }, 400, CORS); }

  const name = str(b.name, 80);
  const email = str(b.email, 120).toLowerCase();
  const phone = str(b.phone, 24);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'A valid email is required.' }, 400, CORS);
  if (phone.replace(/\D/g, '').length < 10) return json({ ok: false, error: 'A valid mobile number is required.' }, 400, CORS);

  const rec = {
    name, email, phone,
    marketingConsent: !!b.consent,
    source: str(b.source, 40) || 'download',
    ts: new Date().toISOString(),
    ua: str(request.headers.get('user-agent'), 200),
    country: request.headers.get('cf-ipcountry') || '',
  };

  const kv = env.CATOOL_KV;
  if (kv) {
    try {
      const rand = Math.random().toString(36).slice(2, 8);
      await kv.put(`lead:${rec.ts}-${rand}`, JSON.stringify(rec), { metadata: { email, phone, consent: rec.marketingConsent } });
      await kv.put(`leademail:${email}`, JSON.stringify(rec)); // latest record per email
    } catch { /* best effort — don't block the download */ }
  }
  return json({ ok: true }, 200, CORS);
}

// ── POST /api/ping ─────────────────────────────────────────────
// Anonymous install counter. No personal data.
async function handlePing(request, env) {
  const kv = env.CATOOL_KV;
  if (!kv) return json({ ok: false, error: 'storage not configured' }, 200, CORS); // never error the hub
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, error: 'bad json' }, 400, CORS); }
  const id = String(b.installId || '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64);
  if (!id) return json({ ok: false, error: 'installId required' }, 400, CORS);

  const key = 'install:' + id;
  const now = new Date().toISOString();
  let firstSeen = now;
  try {
    const ex = await kv.getWithMetadata(key);
    if (ex && ex.metadata && ex.metadata.firstSeen) firstSeen = ex.metadata.firstSeen;
  } catch { /* first ping */ }

  try {
    await kv.put(key, '1', {
      metadata: {
        firstSeen,
        lastSeen: now,
        version: String(b.version || '').slice(0, 20),
        os: String(b.os || '').slice(0, 12),
        arch: String(b.arch || '').slice(0, 12),
      },
    });
  } catch { /* best effort */ }
  return json({ ok: true }, 200, CORS);
}

// ── GET /api/stats ─────────────────────────────────────────────
// Aggregate install counts for the homepage counter. No personal data.
async function handleStats(env) {
  const kv = env.CATOOL_KV;
  const cache = { 'cache-control': 'public, max-age=300' };
  if (!kv) return json({ ok: true, installs: 0, active30: 0 }, 200, cache);

  const cutoff = Date.now() - 30 * 86400 * 1000;
  let cursor;
  let installs = 0;
  let active30 = 0;
  try {
    do {
      const res = await kv.list({ prefix: 'install:', limit: 1000, cursor });
      for (const k of res.keys) {
        installs++;
        const ls = k.metadata && k.metadata.lastSeen;
        if (ls && Date.parse(ls) >= cutoff) active30++;
      }
      cursor = res.list_complete ? null : res.cursor;
    } while (cursor);
  } catch { /* return whatever we counted */ }

  return json({ ok: true, installs, active30 }, 200, cache);
}

// ── GET /api/config ────────────────────────────────────────────
// Remote runtime config / KILL SWITCH for the desktop hub + tools. KV-backed
// (CATOOL_KV key "config"); safe defaults = all tools free, nothing blocked, so
// a missing/empty/corrupt value can never disrupt users. Edit the KV value to
// flip free<->paid, gate a min-version, or pause the service. See KILL-SWITCH.md
// in the catool-hub repo for the field reference and example payloads.
const CONFIG_DEFAULTS = { freeMode: true, freeUntil: null, killSwitch: false, minVersion: '0.0.0', message: '' };
async function handleConfig(env) {
  let cfg = {};
  try {
    const raw = env.CATOOL_KV ? await env.CATOOL_KV.get('config') : null;
    if (raw) cfg = JSON.parse(raw);
  } catch { cfg = {}; }
  return json({ ...CONFIG_DEFAULTS, ...cfg, served_at: new Date().toISOString() }, 200, { ...CORS, 'cache-control': 'no-store' });
}

// ══ Docward PDF licensing ════════════════════════════════════════════════════
// Razorpay payment → webhook here → we sign an Ed25519 license the desktop app
// verifies offline (matches src/lib/entitlements.ts + src-tauri/src/lib.rs in the
// docward-pdf repo). The buyer retrieves it on the success page by order/payment id.
//
// Secrets (Cloudflare → Settings → Variables → Encrypt):
//   DOCWARD_LICENSE_SK               base64 of the 64-byte tweetnacl secretKey
//                                  (from docward-pdf/vendor-key.local.json)
//   DOCWARD_RAZORPAY_WEBHOOK_SECRET  the Razorpay webhook secret
const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const bytesToB64 = (u) => btoa(String.fromCharCode(...u));
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

// Canonical claims encoding — MUST byte-match encodeClaims() in the app (alphabetical
// keys, compact JSON) so the signature verifies there.
function docwardEncodeClaims(c) {
  const ordered = {
    email: c.email, exp: c.exp, features: c.features ?? [], grace_days: c.grace_days,
    iat: c.iat, seats: c.seats, sub: c.sub, tier: c.tier,
  };
  return new TextEncoder().encode(JSON.stringify(ordered));
}

// Sign claims with the vendor Ed25519 private key via WebCrypto. DOCWARD_LICENSE_SK is
// the 64-byte tweetnacl secretKey (seed||pub); WebCrypto wants a PKCS8-wrapped seed.
async function docwardSignLicense(env, claims) {
  const sk = b64ToBytes(env.DOCWARD_LICENSE_SK);         // 64 bytes
  const seed = sk.slice(0, 32);
  const PKCS8_PREFIX = Uint8Array.from([0x30,0x2e,0x02,0x01,0x00,0x30,0x05,0x06,0x03,0x2b,0x65,0x70,0x04,0x22,0x04,0x20]);
  const pkcs8 = new Uint8Array([...PKCS8_PREFIX, ...seed]);
  const key = await crypto.subtle.importKey('pkcs8', pkcs8, { name: 'Ed25519' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('Ed25519', key, docwardEncodeClaims(claims)));
  return { claims, sig: bytesToB64(sig) };
}

// Verify the Razorpay webhook HMAC-SHA256 signature over the raw body.
async function docwardVerifyRazorpay(rawBody, signatureHex, secret) {
  if (!signatureHex || !secret) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(rawBody));
  const expected = hex(mac);
  // constant-time-ish compare
  if (expected.length !== signatureHex.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signatureHex.charCodeAt(i);
  return diff === 0;
}

// POST /api/docward/webhook — Razorpay calls this on payment. Signs + stores a license.
async function docwardWebhook(request, env) {
  if (!env.DOCWARD_LICENSE_SK) return json({ ok: false, error: 'signing key not configured' }, 500, CORS);
  const raw = await request.text();
  const sig = request.headers.get('x-razorpay-signature') || '';
  const okSig = await docwardVerifyRazorpay(raw, sig, env.DOCWARD_RAZORPAY_WEBHOOK_SECRET);
  if (!okSig) return json({ ok: false, error: 'bad signature' }, 401, CORS);

  let evt;
  try { evt = JSON.parse(raw); } catch { return json({ ok: false, error: 'bad json' }, 400, CORS); }

  // Handle a captured one-time payment. (Subscriptions can be added later via
  // subscription.charged — issue a period-dated license instead of perpetual.)
  const pay = evt?.payload?.payment?.entity;
  if (evt?.event !== 'payment.captured' || !pay) {
    return json({ ok: true, ignored: evt?.event || 'unknown' }, 200, CORS); // ack so Razorpay stops retrying
  }

  const email = str(pay.email, 120).toLowerCase() || (pay.notes && str(pay.notes.email, 120).toLowerCase());
  const tier = (pay.notes && ['pro', 'team', 'enterprise'].includes(pay.notes.tier)) ? pay.notes.tier : 'pro';
  const orderId = str(pay.order_id, 64);
  const paymentId = str(pay.id, 64);

  const now = Math.floor(Date.now() / 1000);
  const rand = crypto.getRandomValues(new Uint8Array(6));
  const claims = {
    sub: 'LIC-' + [...rand].map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase(),
    email: email || 'unknown@docward',
    tier,
    seats: 1,
    iat: now,
    exp: now + 100 * 365 * 86400, // perpetual (one-time purchase); ~100 years
    grace_days: 30,
    features: [],
  };
  const license = await docwardSignLicense(env, claims);
  const licStr = JSON.stringify(license);

  const kv = env.CATOOL_KV;
  if (kv) {
    const opts = { expirationTtl: 60 * 60 * 24 * 400 }; // keep the pickup record ~400 days
    if (orderId)   await kv.put(`docward:lic:order:${orderId}`, licStr, opts);
    if (paymentId) await kv.put(`docward:lic:pay:${paymentId}`, licStr, opts);
    if (email)     await kv.put(`docward:lic:email:${email}`, licStr); // support lookup (not publicly retrievable)
  }
  return json({ ok: true }, 200, CORS);
}

// GET /api/docward/license?order=<id> | ?payment=<id> — the success page polls this.
// Keyed on the unguessable Razorpay order/payment id (never on email, to avoid
// letting anyone fetch a buyer's license by guessing their address).
async function docwardGetLicense(request, env) {
  const kv = env.CATOOL_KV;
  if (!kv) return json({ ok: false, error: 'storage not configured' }, 500, CORS);
  const q = new URL(request.url).searchParams;
  const order = str(q.get('order'), 64);
  const payment = str(q.get('payment'), 64);
  if (!order && !payment) return json({ ok: false, error: 'order or payment id required' }, 400, CORS);
  const key = order ? `docward:lic:order:${order}` : `docward:lic:pay:${payment}`;
  const lic = await kv.get(key);
  if (!lic) return json({ ok: false, pending: true }, 200, { ...CORS, 'cache-control': 'no-store' });
  return json({ ok: true, license: JSON.parse(lic) }, 200, { ...CORS, 'cache-control': 'no-store' });
}

// ── License-server proxies (keep LICENSE_SERVER_URL out of the browser) ──
function licenseBase(env) {
  const base = env.LICENSE_SERVER_URL;
  return base ? base.replace(/\/$/, '') : null;
}

async function proxySubscribe(request, env) {
  const base = licenseBase(env);
  if (!base) return json({ error: 'LICENSE_SERVER_URL is not configured' }, 500);
  let body;
  try { body = await request.text(); } catch { return json({ error: 'invalid body' }, 400); }
  try {
    const upstream = await fetch(`${base}/subscribe`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body,
    });
    return new Response(await upstream.text(), { status: upstream.status, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return json({ error: 'upstream unreachable: ' + e.message }, 502);
  }
}

async function proxyKey(request, env) {
  const base = licenseBase(env);
  if (!base) return json({ error: 'LICENSE_SERVER_URL is not configured' }, 500);
  const qs = new URL(request.url).searchParams.toString();
  try {
    const upstream = await fetch(`${base}/key?${qs}`);
    return new Response(await upstream.text(), { status: upstream.status, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return json({ error: 'upstream unreachable: ' + e.message }, 502);
  }
}

async function proxyRecovery(request, env, path) {
  const base = licenseBase(env);
  if (!base) return json({ error: 'LICENSE_SERVER_URL not configured' }, 500);
  const action = path.slice('/api/recovery/'.length).split('/')[0];
  if (!['send-code', 'verify-code'].includes(action)) return json({ error: 'unknown recovery action: ' + action }, 404);
  let body;
  try { body = await request.text(); } catch { return json({ error: 'invalid body' }, 400); }
  try {
    const upstream = await fetch(`${base}/recovery/${action}`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body,
    });
    return new Response(await upstream.text(), { status: upstream.status, headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return json({ error: 'upstream unreachable: ' + e.message }, 502);
  }
}
