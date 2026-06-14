// Cloudflare Pages Function — GET /api/stats
//
// Returns the REAL install counts for the homepage live counter, read from the
// CATOOL_KV namespace populated by /api/ping. No personal data is exposed —
// only aggregate counts.
//   { ok, installs, active30 }
// installs  = distinct installs that have ever pinged
// active30  = installs seen in the last 30 days

const json = (obj, status = 200, cacheSec = 300) => new Response(JSON.stringify(obj), {
  status,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'cache-control': `public, max-age=${cacheSec}`,
  },
});

export async function onRequestGet({ env }) {
  const kv = env.CATOOL_KV;
  if (!kv) return json({ ok: true, installs: 0, active30: 0 });

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

  return json({ ok: true, installs, active30 });
}
