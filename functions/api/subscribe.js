// Cloudflare Pages Function — POST /api/subscribe
//
// Proxies the subscription request from the browser to the license-server
// (deployed separately on Render/Railway). The browser only ever talks to
// catool.co.in, so no CORS, and the license-server URL stays out of the
// public bundle.
//
// Required Cloudflare Pages environment variable:
//   LICENSE_SERVER_URL   e.g. https://catools-license.onrender.com

export async function onRequestPost(context) {
  const { request, env } = context;
  const base = env.LICENSE_SERVER_URL;
  if (!base) {
    return new Response(JSON.stringify({ error: 'LICENSE_SERVER_URL is not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  let body;
  try {
    body = await request.text();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/subscribe`, {
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
    return new Response(JSON.stringify({ error: 'upstream unreachable: ' + e.message }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}
