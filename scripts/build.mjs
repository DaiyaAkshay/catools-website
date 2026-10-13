// Keeps every page of catool.co.in consistent. Run before committing:
//
//   node scripts/build.mjs          update pages + sitemap.xml
//   node scripts/build.mjs --check  report pages that are out of date (exit code 1), change nothing
//
// For each page listed in scripts/pages.mjs it rewrites the regions between marker comments:
//   <!-- @head -->     … <!-- /@head -->       title, description, canonical, social tags, stylesheet
//   <!-- @header -->   … <!-- /@header -->     _layout/header.html
//   <!-- @footer -->   … <!-- /@footer -->     _layout/footer.html (+ product links from pages.mjs)
//   <!-- @leadform --> … <!-- /@leadform -->   _layout/lead-modal.html (pages with lead: true)
// Everything outside the markers is the page's own content and is left alone, except that internal
// links to "/page.html" are rewritten to the clean URL "/page" (production serves both).
// A page without markers yet is converted on its first build.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, APPS, PRODUCT_LINKS, PAGES } from './pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const hash = (p) => createHash('sha1').update(readFileSync(join(ROOT, p))).digest('hex').slice(0, 8);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (tpl, vars) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : ''));

const STYLES_V = hash('assets/styles.css');
const LEAD_V = hash('assets/lead.js');
const YEAR = String(new Date().getFullYear());

const HEADER = read('_layout/header.html').trimEnd();
const FOOTER = read('_layout/footer.html').trimEnd();
const LEAD = read('_layout/lead-modal.html').trimEnd();

function productList() {
  return PRODUCT_LINKS.map((p) => `        <li><a href="${esc(p.href)}">${esc(p.label)}</a></li>`).join('\n');
}

function jsonLd(page) {
  if (page.noindex) return [];
  const url = SITE + page.path;
  const org = SITE + '/#organization';
  const site = SITE + '/#website';
  const blocks = [
    { '@type': 'Organization', '@id': org, name: 'CAtool', url: SITE + '/',
      logo: SITE + '/assets/logo-mark-72.png', email: 'akshaybkn@gmail.com', telephone: '+91-99290-89598',
      founder: { '@type': 'Person', name: 'CA Akshay Daiya', sameAs: 'https://www.linkedin.com/in/akshaydaiya/' } },
    { '@type': 'WebSite', '@id': site, name: 'CAtool', url: SITE + '/', publisher: { '@id': org }, inLanguage: 'en-IN' },
    { '@type': page.path === '/contact' ? 'ContactPage' : 'WebPage', '@id': url + '#webpage',
      url, name: page.title, description: page.description, inLanguage: 'en-IN',
      isPartOf: { '@id': site }, ...(page.app ? { mainEntity: { '@id': url + '#software' } } : {}) },
  ];
  if (!page.home) {
    blocks[2].breadcrumb = { '@id': url + '#breadcrumb' };
    blocks.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: page.app ? APPS[page.app].name : page.title.split(' — ')[0], item: url },
    ] });
  }
  if (page.app) {
    const app = APPS[page.app];
    blocks.push({ '@type': 'SoftwareApplication', '@id': url + '#software', name: app.name,
      description: app.description, url: SITE + app.url, applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows 10, Windows 11', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', url: SITE + app.url },
      author: { '@type': 'Person', name: 'CA Akshay Daiya', sameAs: 'https://www.linkedin.com/in/akshaydaiya/' },
      publisher: { '@id': org }, isAccessibleForFree: true });
  }
  const graph = { '@context': 'https://schema.org', '@graph': blocks };
  return [`  <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`];
}

const GA_ID = 'G-S4NBSRVDQ0';

function headBlock(page) {
  const url = SITE + page.path;
  const image = SITE + (page.image || '/assets/logo-mark.png');
  const ogTitle = page.ogTitle || page.title;
  const lines = [
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    // Google Analytics 4 (property G-S4NBSRVDQ0), on every page.
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>`,
    `<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');</script>`,
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    page.noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="max-image-preview:large" />',
    `<link rel="canonical" href="${esc(url)}" />`,
    '<link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="en_IN" />',
    '<meta property="og:site_name" content="catool.co.in" />',
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="${page.image ? 1072 : 822}" />`,
    `<meta property="og:image:height" content="${page.image ? 887 : 822}" />`,
    `<meta property="og:image:alt" content="${esc(page.image ? 'TallyDrop identifying the Tally release needed for client data' : 'CAtool logo')}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    `<meta name="twitter:image:alt" content="${esc(page.image ? 'TallyDrop identifying the Tally release needed for client data' : 'CAtool logo')}" />`,
    `<meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<link rel="stylesheet" href="/assets/styles.css?v=${STYLES_V}" />`,
  ].filter(Boolean).map((l) => '  ' + l);
  return ['  <!-- @head: generated by scripts/build.mjs from scripts/pages.mjs; edit there -->', ...lines, ...jsonLd(page), '  <!-- /@head -->'].join('\n');
}

// Replace the region between markers; if the markers don't exist yet, `migrate` inserts them.
function region(html, name, content, migrate) {
  const re = new RegExp(`[ \\t]*<!-- @${name}\\b[^>]*-->[\\s\\S]*?<!-- /@${name} -->`);
  if (re.test(html)) return html.replace(re, () => content);
  return migrate(html, content);
}

const wrap = (name, body) => `<!-- @${name} -->\n${body}\n<!-- /@${name} -->`;

// First-build conversion helpers: strip the old hand-written tags the generated block replaces.
const OLD_HEAD_TAGS = [
  /[ \t]*<meta\s+charset[^>]*>\s*\n?/gi,
  /[ \t]*<meta\s+name="viewport"[^>]*>\s*\n?/gi,
  /[ \t]*<title>[\s\S]*?<\/title>\s*\n?/gi,
  /[ \t]*<meta\s+name="(description|robots)"[^>]*>\s*\n?/gi,
  /[ \t]*<meta\s+(property|name)="(og|twitter):[^"]*"[^>]*>\s*\n?/gi,
  /[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/gi,
  /[ \t]*(<link\s+rel="icon"[^>]*>\s*)+\n?/gi,
  /[ \t]*<link\s+rel="stylesheet"\s+href="\/assets\/styles\.css[^"]*"[^>]*>\s*\n?/gi,
];

function migrateHead(html, block) {
  let out = html.replace(/<head>([\s\S]*?)<\/head>/i, (_, inner) => {
    let rest = inner;
    for (const re of OLD_HEAD_TAGS) rest = rest.replace(re, '');
    return `<head>\n${block}\n${rest.replace(/^\s*\n/, '')}</head>`;
  });
  return out;
}

function migrateTag(tagRe) {
  return (html, content) => {
    if (!tagRe.test(html)) throw new Error('no marker and nothing to replace for ' + tagRe);
    return html.replace(tagRe, () => content);
  };
}

// "/download.html" → "/download" in href/content attributes (outside <script> blocks).
const CLEAN = PAGES.filter((p) => p.file.endsWith('.html') && !p.file.includes('/'))
  .map((p) => [p.file === 'index.html' ? 'index' : p.file.replace(/\.html$/, ''), p.path]);

function cleanUrls(html) {
  return html.split(/(<script[\s\S]*?<\/script>)/i).map((part, i) => {
    if (i % 2 === 1) return part; // script block: leave JS strings alone
    return part.replace(/(href|content)="((?:https:\/\/catool\.co\.in)?)\/([a-z0-9-]+)\.html([#?][^"]*)?"/gi, (m, attr, origin, name, rest) => {
      const hit = CLEAN.find(([n]) => n === name);
      return hit ? `${attr}="${origin}${hit[1]}${rest || ''}"` : m;
    });
  }).join('');
}

let changed = 0;
for (const page of PAGES) {
  const path = join(ROOT, page.file);
  const original = readFileSync(path, 'utf8');
  const eol = original.includes('\r\n') ? '\r\n' : '\n';
  let html = original.replace(/\r\n/g, '\n');

  html = region(html, 'head', headBlock(page), migrateHead);

  const cta = page.cta || { label: 'Download', href: '/download' };
  html = region(html, 'header', wrap('header', fill(HEADER, { cta_label: esc(cta.label), cta_href: esc(cta.href) })),
    migrateTag(/<header class="site-header">[\s\S]*?<\/header>/));

  html = region(html, 'footer', wrap('footer', fill(FOOTER, { products: productList(), year: YEAR })),
    migrateTag(/<footer class="site">[\s\S]*?<\/footer>/));

  if (page.lead) {
    html = region(html, 'leadform', wrap('leadform', fill(LEAD, { lead_js_version: LEAD_V })),
      (h, c) => h.replace(/<\/body>/i, () => c + '\n</body>'));
  } else {
    html = html.replace(/\n?<!-- @leadform -->[\s\S]*?<!-- \/@leadform -->/, '');
  }

  html = cleanUrls(html).replace(/\n/g, eol);
  if (html !== original) {
    changed++;
    if (CHECK) console.log('out of date:', page.file);
    else { writeFileSync(path, html); console.log('updated', page.file); }
  }
}

// sitemap.xml — every indexable page, clean URLs.
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- Generated by scripts/build.mjs from scripts/pages.mjs -->',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PAGES.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE}${p.path}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
const sitemapPath = join(ROOT, 'sitemap.xml');
if (!existsSync(sitemapPath) || readFileSync(sitemapPath, 'utf8').replace(/\r\n/g, '\n') !== sitemap) {
  changed++;
  if (CHECK) console.log('out of date: sitemap.xml');
  else { writeFileSync(sitemapPath, sitemap); console.log('updated sitemap.xml'); }
}

// Keep flow pages crawlable: crawlers must be able to read their noindex tag.
const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`;
if (read('robots.txt').replace(/\r\n/g, '\n') !== robots) {
  changed++;
  if (CHECK) console.log('out of date: robots.txt');
  else { writeFileSync(join(ROOT, 'robots.txt'), robots); console.log('updated robots.txt'); }
}

if (CHECK && changed) { console.log(`\n${changed} file(s) out of date — run: node scripts/build.mjs`); process.exit(1); }
console.log(changed ? `\n${CHECK ? '' : 'Done:'} ${changed} file(s) ${CHECK ? 'out of date' : 'written'}.` : 'Everything up to date.');
