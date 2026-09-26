// Local preview that behaves like production:
//   node scripts/serve.mjs [port]      (default 5500)
//
// - Every request goes through the real worker.js, so /api/* works too. With no KV binding
//   locally, the Worker's own safe defaults apply (e.g. /api/config reports freeMode: true,
//   /api/lead accepts but stores nothing).
// - Static files are served the way Cloudflare's assets layer does: clean URLs (/download →
//   download.html), /page.html → 307 to /page, /dir → /dir/, and .assetsignore'd files hidden.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, dirname, extname, normalize } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.argv[2] || 5500);
const worker = (await import(pathToFileURL(join(ROOT, 'worker.js')).href)).default;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.exe': 'application/octet-stream',
};
const HIDDEN = /^\/(\.git|scripts|_layout|node_modules|\.wrangler)(\/|$)|^\/(worker\.js|wrangler\.jsonc|\.gitignore|\.assetsignore)$|\.md$/i;

async function file(p) {
  try { const s = await stat(p); return s.isFile() ? p : null; } catch { return null; }
}

async function assets(request) {
  const url = new URL(request.url);
  const path = decodeURIComponent(url.pathname);
  if (HIDDEN.test(path)) return new Response('Not found', { status: 404 });
  const redirect = (to) => new Response(null, { status: 307, headers: { location: to + url.search } });

  if (/\.html$/.test(path)) {
    const clean = path.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
    if (await file(join(ROOT, normalize(path)))) return redirect(clean || '/');
  }
  let target = null;
  if (path.endsWith('/')) target = await file(join(ROOT, normalize(path), 'index.html'));
  else {
    target = await file(join(ROOT, normalize(path)));
    if (!target) target = await file(join(ROOT, normalize(path) + '.html'));
    if (!target && (await file(join(ROOT, normalize(path), 'index.html')))) return redirect(path + '/');
  }
  if (!target) return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain' } });
  return new Response(await readFile(target), {
    headers: { 'content-type': TYPES[extname(target).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' },
  });
}

const env = { ASSETS: { fetch: assets } };

createServer(async (req, res) => {
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const request = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: { ...req.headers, 'cf-connecting-ip': '127.0.0.1' },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
    });
    const response = await worker.fetch(request, env, { waitUntil() {} });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (e) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('serve.mjs error: ' + e.message);
  }
  console.log(req.method, req.url, res.statusCode);
}).listen(PORT, () => console.log(`catool.co.in preview on http://localhost:${PORT}`));
