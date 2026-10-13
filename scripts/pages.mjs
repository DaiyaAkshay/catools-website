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

// Product schema definitions. Only standalone download keys (catool/docward/tallydrop) are used by lead.js.
export const APPS = {
  downloader: {
    name: 'CAtool 26AS / AIS / TIS Downloader', url: '/26as-downloader',
    description: 'Bulk-download Form 26AS, AIS and TIS, unlock PDFs and export TDS summaries to Excel. Included in the CAtool hub.',
  },
  recon: {
    name: 'CAtool GSTR-2B Recon', url: '/gstr2b-recon',
    description: 'Reconcile GSTR-2B against books of accounts from JSON, Excel or Tally. Included in the CAtool hub.',
  },
  audit: {
    name: 'CAtool Tally Audit Dashboard (beta)', url: '/tally-audit',
    description: 'Review live Tally data, TDS/TCS comparisons against 26AS and audit exceptions. Beta tool included in CAtool.',
  },
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
    title: 'CAtool: 26AS Downloader, GST Reconciliation & Tally Audit',
    description: 'Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop.',
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
    file: '26as-downloader.html', path: '/26as-downloader', app: 'downloader',
    title: '26AS / AIS / TIS Bulk Downloader for CAs — CAtool',
    description: 'Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows.',
  },
  {
    file: 'gstr2b-recon.html', path: '/gstr2b-recon', app: 'recon',
    title: 'GSTR-2B Reconciliation Software for CAs — CAtool',
    description: 'Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool.',
  },
  {
    file: 'tally-audit.html', path: '/tally-audit', app: 'audit',
    title: 'Tally Audit Software & TDS Reconciliation (Beta) — CAtool',
    description: 'End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&L and TDS/TCS against 26AS. In beta, free inside CAtool.',
  },
  {
    file: 'docward.html', path: '/docward',
    title: 'Docward PDF Editor for Windows — OCR & Redaction | CAtool',
    description: 'Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it.',
    cta: { label: 'Get Docward', href: '#pricing' },
    lead: true, app: 'docward',
  },
  {
    file: 'tallydrop/index.html', path: '/tallydrop/',
    title: 'TallyDrop — Open Tally Data in the Right Version | CAtool',
    description: 'Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download.',
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
