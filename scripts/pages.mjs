// Every public page of catool.co.in, in one place. `node scripts/build.mjs` uses this to write each
// page's <head> (title, description, canonical, social tags, structured data), the shared header and
// footer, the download form, and sitemap.xml. Edit here, then run the build.
//
//   file      page file in the repo
//   path      clean public URL (what links, canonicals and the sitemap use)
//   cta       the top-right header button (default: Download → /download)
//   lead      true = page has download buttons (data-download="…"), so it gets the download form
//   app       product key → adds SoftwareApplication structured data (see APPS)
//   noindex   true = keep out of search engines and the sitemap

export const SITE = 'https://catool.co.in';
export const BRAND = 'CAtool';

// Downloadable apps. `lead.js` uses the same keys (data-download="catool" etc.).
export const APPS = {
  catool: {
    name: 'CAtool',
    description: 'Windows hub app for practising CAs: bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation and a Tally audit dashboard.',
    url: '/download',
  },
  docward: {
    name: 'Docward',
    description: 'Privacy-first PDF editor with OCR and true redaction that works 100% on your own PC.',
    url: '/docward',
  },
  tallydrop: {
    name: 'TallyDrop',
    description: 'Opens every client\'s Tally data in the exact Tally release it belongs to, or gets you the official download.',
    url: '/tallydrop/',
  },
};

// Footer "Products" column. Adding a product = one line here + its page below.
export const PRODUCT_LINKS = [
  { label: 'Download all apps', href: '/download' },
  { label: '26AS / AIS / TIS Downloader', href: '/26as-downloader', group: 'CAtool hub' },
  { label: 'GSTR-2B Recon', href: '/gstr2b-recon', group: 'CAtool hub' },
  { label: 'Tally Audit (beta)', href: '/tally-audit', group: 'CAtool hub' },
  { label: 'Docward — PDF editor', href: '/docward', group: 'Standalone apps' },
  { label: 'TallyDrop — right Tally, every time', href: '/tallydrop/', group: 'Standalone apps' },
];

export const PAGES = [
  {
    file: 'index.html', path: '/',
    title: 'CAtool — desktop tools for CA firms: 26AS, GSTR-2B Recon, Tally Audit',
    description: 'Windows tools built by a practising CA: the CAtool hub (bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation, Tally audit) plus the Docward PDF editor and TallyDrop. Free during early access.',
    ogTitle: 'CAtool — desktop tools built by a CA, for CAs',
    home: true,
  },
  {
    file: 'download.html', path: '/download',
    title: 'Download CAtool, Docward and TallyDrop for Windows — free',
    description: 'Download the CAtool hub (26AS / AIS / TIS Downloader, GSTR-2B Recon, Tally Audit), the Docward PDF editor and TallyDrop for Windows 10 / 11. Free during early access, no card required.',
    lead: true, app: 'catool',
  },
  {
    file: 'pricing.html', path: '/pricing',
    title: 'Pricing — CAtool, Docward and TallyDrop',
    description: 'CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark.',
  },
  {
    file: '26as-downloader.html', path: '/26as-downloader',
    title: '26AS / AIS / TIS Bulk Downloader for CAs — CAtool',
    description: 'Bulk downloader for Form 26AS, AIS and TIS from the Indian IT e-Filing portal. Per-assessee folders, auto PDF-unlock, partywise + sectionwise Excel, ITR intimation refund + 244A interest.',
  },
  {
    file: 'gstr2b-recon.html', path: '/gstr2b-recon',
    title: 'GSTR-2B vs Books Reconciliation — CAtool',
    description: 'Reconcile GSTR-2B with books of accounts. Smart Excel reader, fuzzy column mapping, 16(4) ITC + Rule 37 + RCM compliance baked in. Free inside CAtool.',
  },
  {
    file: 'tally-audit.html', path: '/tally-audit',
    title: 'Tally Audit Dashboard (beta) — CAtool',
    description: 'End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&L and TDS/TCS against 26AS. In beta, free inside CAtool.',
  },
  {
    file: 'docward.html', path: '/docward',
    title: 'Docward — Acrobat-class PDF editing that never leaves your device',
    description: 'Docward is a privacy-first desktop PDF editor with built-in OCR. Edit text, redact, recognise scans, add signature images, organise and convert PDFs — 100% on your own PC. Free with a watermark; a one-time upgrade removes it.',
    cta: { label: 'Get Docward', href: '#pricing' },
    lead: true, app: 'docward',
  },
  {
    file: 'tallydrop/index.html', path: '/tallydrop/',
    title: 'TallyDrop — open every client\'s Tally data in the right Tally version | CAtool',
    description: 'TallyDrop tells which Tally release a client\'s data belongs to (TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 …) and opens it in exactly that version — or gives you the official download. Built by a CA for CA firms. Free during early access.',
    ogTitle: 'TallyDrop — drop client data, it opens in the right Tally',
    cta: { label: 'Get TallyDrop', href: '#download' },
    lead: true, app: 'tallydrop',
    image: '/tallydrop/screenshot-decision.png',
  },
  {
    file: 'contact.html', path: '/contact',
    title: 'Contact — CAtool (CA Akshay Daiya)',
    description: 'Email, WhatsApp and postal address for catool.co.in — CA Akshay Daiya, M/s Daiya Tiwari & Soni, Chartered Accountants.',
  },
  {
    file: 'privacy.html', path: '/privacy',
    title: 'Privacy Policy — CAtool',
    description: 'How catool.co.in and the CAtool, Docward and TallyDrop apps handle your data. Client data never leaves your PC.',
  },
  {
    file: 'terms.html', path: '/terms',
    title: 'Terms of Service — CAtool',
    description: 'Terms of service for catool.co.in and the CAtool, Docward and TallyDrop desktop apps.',
  },
  {
    file: 'refund.html', path: '/refund',
    title: 'Refund & Cancellation Policy — CAtool',
    description: 'Refund and cancellation terms for CAtool subscriptions and Docward Pro purchases.',
  },
  // Opened by the CAtool hub / payment flow; not for search engines.
  { file: 'subscribe.html', path: '/subscribe', title: 'Subscribe — CAtool', description: 'CAtool subscription.', noindex: true },
  { file: 'success.html', path: '/success', title: 'Thank you — CAtool', description: 'Payment confirmation.', noindex: true },
];
