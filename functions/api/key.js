// Cloudflare Pages Function — GET /api/key
//
// Polls the license-server for an issued activation key. Called by
// /success.html after the user completes the UPI AutoPay flow.

export async function onRequestGet(context) {
  const { request, env } = context;
  const base = env.LICENSE_SERVER_URL;
  if (!base) {
    return new Response(JSON.stringify({ error: 'LICENSE_SERVER_URL is not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url = new URL(request.url);
  const qs = url.searchParams.toString();

  try {
    const upstream = await fetch(`${base.replace(/\/$/, '')}/key?${qs}`);
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
