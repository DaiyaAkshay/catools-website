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
