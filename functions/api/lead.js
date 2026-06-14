// Cloudflare Pages Function — POST /api/lead
//
// Stores a download lead: name, email, mobile, and (optional) marketing consent
// with a timestamp — the DPDP-friendly consent record. Saved to CATOOL_KV under
// a `lead:` prefix. Email + phone are required (the download form enforces it);
// marketing consent is freely given (unticked by default) so consent stays
// valid even though the form itself is required to download.
//
// To export leads: Cloudflare dashboard → Workers & Pages → KV → CATOOL_KV →
// filter keys by the `lead:` prefix (or `wrangler kv:key list`).

const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'POST, OPTIONS',
  },
});

const str = (v, max) => String(v == null ? '' : v).trim().slice(0, max);

export async function onRequestOptions() { return json({ ok: true }); }

export async function onRequestPost({ request, env }) {
  let b;
  try { b = await request.json(); } catch { return json({ ok: false, error: 'bad json' }, 400); }

  const name = str(b.name, 80);
  const email = str(b.email, 120).toLowerCase();
  const phone = str(b.phone, 24);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ ok: false, error: 'A valid email is required.' }, 400);
  if (phone.replace(/\D/g, '').length < 10) return json({ ok: false, error: 'A valid mobile number is required.' }, 400);

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
      // one record per submission (timestamped key) + a quick lookup by email
      const rand = Math.random().toString(36).slice(2, 8);
      await kv.put(`lead:${rec.ts}-${rand}`, JSON.stringify(rec), { metadata: { email, phone, consent: rec.marketingConsent } });
      await kv.put(`leademail:${email}`, JSON.stringify(rec)); // latest record per email
    } catch { /* best effort — don't block the download */ }
  }
  return json({ ok: true });
}
