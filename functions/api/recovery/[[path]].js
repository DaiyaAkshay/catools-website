// Cloudflare Pages Function — catchall for /api/recovery/*
//
// Routes:
//   POST /api/recovery/send-code   → license-server /recovery/send-code
//   POST /api/recovery/verify-code → license-server /recovery/verify-code
//
// Same proxy pattern as /api/subscribe — keeps LICENSE_SERVER_URL out of
// the browser bundle. The catchall (`[[path]]`) is needed because Cloudflare
// Pages routes by file path; a single `recovery.js` would only match
// `/api/recovery` (no sub-path).

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const base = env.LICENSE_SERVER_URL;
  if (!base) {
    return json({ error: 'LICENSE_SERVER_URL not configured' }, 500);
  }

  // params.path is an array of path segments for [[path]] catchalls.
  const segments = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);
  if (!segments.length) return json({ error: 'recovery action required' }, 400);
  const action = segments[0]; // 'send-code' or 'verify-code'
  if (!['send-code', 'verify-code'].includes(action)) {
    return json({ error: 'unknown recovery action: ' + action }, 404);
  }

  let body;
  try { body = await request.text(); }
  catch { return json({ error: 'invalid body' }, 400); }

  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/recovery/${action}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    return json({ error: 'upstream unreachable: ' + e.message }, 502);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
