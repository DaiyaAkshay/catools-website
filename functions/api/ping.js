// Cloudflare Pages Function — POST /api/ping
//
// Anonymous install counter. The CAtool hub posts { installId, version, os,
// arch } once a day. We store ONE key per install with last/first-seen in
// metadata — no personal data, no client data, no IP retention beyond the
// request itself. Powers the live counter on the homepage (/api/stats).
//
// One-time setup (Cloudflare dashboard → Pages → this project → Settings →
// Functions → KV namespace bindings): create a KV namespace and bind it as
//   CATOOL_KV
// The same namespace also stores download leads (lead: prefix).

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'POST, OPTIONS',
  },
});

export async function onRequestOptions() { return json({ ok: true }); }

export async function onRequestPost({ request, env }) {
  const kv = env.CATOOL_KV;
  if (!kv) return json({ ok: false, error: 'storage not configured' }, 200); // never error the hub
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, error: 'bad json' }, 400); }
  const id = String(b.installId || '').replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64);
  if (!id) return json({ ok: false, error: 'installId required' }, 400);

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
  return json({ ok: true });
}
