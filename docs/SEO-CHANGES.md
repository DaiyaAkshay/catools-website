# Complete SEO implementation changes

All tracked source and generated HTML edits are shown below, followed by the new checker.
The audit and this review document are documentation additions, excluded from public assets.
No commit or deployment has been made.

```diff
diff --git a/.assetsignore b/.assetsignore
index 5c7cc35..2732a97 100644
--- a/.assetsignore
+++ b/.assetsignore
@@ -17,3 +17,6 @@ scripts
 scripts/**
 _layout
 _layout/**
+
+docs
+docs/**
diff --git a/26as-downloader.html b/26as-downloader.html
index 25bc38c..7163ef1 100644
--- a/26as-downloader.html
+++ b/26as-downloader.html
@@ -7,19 +7,27 @@
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>26AS / AIS / TIS Bulk Downloader for CAs — CAtool</title>
-  <meta name="description" content="Bulk downloader for Form 26AS, AIS and TIS from the Indian IT e-Filing portal. Per-assessee folders, auto PDF-unlock, partywise + sectionwise Excel, ITR intimation refund + 244A interest." />
+  <meta name="description" content="Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/26as-downloader" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/26as-downloader" />
   <meta property="og:title" content="26AS / AIS / TIS Bulk Downloader for CAs — CAtool" />
-  <meta property="og:description" content="Bulk downloader for Form 26AS, AIS and TIS from the Indian IT e-Filing portal. Per-assessee folders, auto PDF-unlock, partywise + sectionwise Excel, ITR intimation refund + 244A interest." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:description" content="Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows." />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="26AS / AIS / TIS Bulk Downloader for CAs — CAtool" />
-  <meta name="twitter:description" content="Bulk downloader for Form 26AS, AIS and TIS from the Indian IT e-Filing portal. Per-assessee folders, auto PDF-unlock, partywise + sectionwise Excel, ITR intimation refund + 244A interest." />
+  <meta name="twitter:description" content="Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/26as-downloader#webpage","url":"https://catool.co.in/26as-downloader","name":"26AS / AIS / TIS Bulk Downloader for CAs — CAtool","description":"Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/26as-downloader#software"},"breadcrumb":{"@id":"https://catool.co.in/26as-downloader#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/26as-downloader#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"CAtool 26AS / AIS / TIS Downloader","item":"https://catool.co.in/26as-downloader"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/26as-downloader#software","name":"CAtool 26AS / AIS / TIS Downloader","description":"Bulk-download Form 26AS, AIS and TIS, unlock PDFs and export TDS summaries to Excel. Included in the CAtool hub.","url":"https://catool.co.in/26as-downloader","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/26as-downloader"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 </head>
 <body>
@@ -41,7 +49,7 @@
 <section class="product-hero">
   <div class="container">
     <div class="crumbs"><a href="/">Home</a> / <a href="/#products">Products</a> / 26AS Downloader</div>
-    <h1>26AS / AIS / TIS Downloader</h1>
+    <h1>Bulk 26AS / AIS / TIS Downloader</h1>
     <p class="summary">
       One-click bulk download of Form 26AS, AIS, TIS — plus 143(1) intimation —
       from the Indian Income Tax e-Filing portal. Logs in for every client,
@@ -154,6 +162,12 @@
   </div>
 </section>
 
+<section class="prose" aria-label="Related tools">
+  <h2>Related tools for CA firms</h2>
+  <p>Continue your client review with <a href="/gstr2b-recon">GSTR-2B reconciliation</a> and the <a href="/tally-audit">Tally Audit Dashboard (beta)</a>.</p>
+  <p><a href="/pricing">Compare app pricing</a> · <a href="/contact">Contact CA Akshay Daiya</a></p>
+</section>
+
 <!-- @footer -->
 <footer class="site">
   <div class="grid">
diff --git a/README.md b/README.md
index 87f5afa..b1ff877 100644
--- a/README.md
+++ b/README.md
@@ -70,3 +70,16 @@ apply, e.g. `freeMode: true`). For the Worker exactly as deployed, `npx wrangler
 Installers live in public GitHub release repos (source code stays private):
 `DaiyaAkshay/catool-releases` (hub), `catool-tool-releases` (hub tools), `docward-releases` (Docward).
 TallyDrop's exe is committed here under `tallydrop/` (it's ~140 KB).
+
+## SEO checks and review
+
+After editing pages, run `node scripts/build.mjs`, `node scripts/build.mjs --check`, and
+`python3 scripts/check-seo.py` (`python` on Windows). The SEO check covers metadata, JSON-LD,
+local links and anchors, image dimensions, analytics, and sitemap/robots consistency.
+For Node versions that treat `worker.js` as CommonJS, preview with
+`node --experimental-default-type=module scripts/serve.mjs 5501`.
+
+The SEO audit, decisions, limitations and complete review diff are in `docs/SEO-AUDIT.md`
+and `docs/SEO-CHANGES.md`. `docs/` is excluded from public assets. Product schemas describe
+software, including hub modules, rather than professional services. Existing pricing and
+beta status remain authoritative; no ratings or reviews are invented for rich results.
diff --git a/_headers b/_headers
index 46df643..d7ac8f5 100644
--- a/_headers
+++ b/_headers
@@ -1,4 +1,4 @@
-# Cloudflare Pages headers config
+# Cloudflare Workers static asset headers
 
 /*
   X-Content-Type-Options: nosniff
@@ -7,4 +7,10 @@
   Permissions-Policy: geolocation=(), microphone=(), camera=()
 
 /assets/*
-  Cache-Control: public, max-age=86400, immutable
+  Cache-Control: public, max-age=86400
+
+/tallydrop/*.png
+  Cache-Control: public, max-age=86400
+
+/tallydrop/*.webp
+  Cache-Control: public, max-age=86400
diff --git a/contact.html b/contact.html
index 9da90cd..7ec694b 100644
--- a/contact.html
+++ b/contact.html
@@ -8,18 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Contact — CAtool (CA Akshay Daiya)</title>
   <meta name="description" content="Email, WhatsApp and postal address for catool.co.in — CA Akshay Daiya, M/s Daiya Tiwari &amp; Soni, Chartered Accountants." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/contact" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/contact" />
   <meta property="og:title" content="Contact — CAtool (CA Akshay Daiya)" />
   <meta property="og:description" content="Email, WhatsApp and postal address for catool.co.in — CA Akshay Daiya, M/s Daiya Tiwari &amp; Soni, Chartered Accountants." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Contact — CAtool (CA Akshay Daiya)" />
   <meta name="twitter:description" content="Email, WhatsApp and postal address for catool.co.in — CA Akshay Daiya, M/s Daiya Tiwari &amp; Soni, Chartered Accountants." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"ContactPage","@id":"https://catool.co.in/contact#webpage","url":"https://catool.co.in/contact","name":"Contact — CAtool (CA Akshay Daiya)","description":"Email, WhatsApp and postal address for catool.co.in — CA Akshay Daiya, M/s Daiya Tiwari & Soni, Chartered Accountants.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"breadcrumb":{"@id":"https://catool.co.in/contact#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/contact#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Contact","item":"https://catool.co.in/contact"}]}]}</script>
   <!-- /@head -->
 </head>
 <body>
diff --git a/docward.html b/docward.html
index 1164d76..8b0bdfb 100644
--- a/docward.html
+++ b/docward.html
@@ -6,21 +6,28 @@
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
-  <title>Docward — Acrobat-class PDF editing that never leaves your device</title>
-  <meta name="description" content="Docward is a privacy-first desktop PDF editor with built-in OCR. Edit text, redact, recognise scans, add signature images, organise and convert PDFs — 100% on your own PC. Free with a watermark; a one-time upgrade removes it." />
+  <title>Docward PDF Editor for Windows — OCR &amp; Redaction | CAtool</title>
+  <meta name="description" content="Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/docward" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/docward" />
-  <meta property="og:title" content="Docward — Acrobat-class PDF editing that never leaves your device" />
-  <meta property="og:description" content="Docward is a privacy-first desktop PDF editor with built-in OCR. Edit text, redact, recognise scans, add signature images, organise and convert PDFs — 100% on your own PC. Free with a watermark; a one-time upgrade removes it." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:title" content="Docward PDF Editor for Windows — OCR &amp; Redaction | CAtool" />
+  <meta property="og:description" content="Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it." />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
-  <meta name="twitter:title" content="Docward — Acrobat-class PDF editing that never leaves your device" />
-  <meta name="twitter:description" content="Docward is a privacy-first desktop PDF editor with built-in OCR. Edit text, redact, recognise scans, add signature images, organise and convert PDFs — 100% on your own PC. Free with a watermark; a one-time upgrade removes it." />
+  <meta name="twitter:title" content="Docward PDF Editor for Windows — OCR &amp; Redaction | CAtool" />
+  <meta name="twitter:description" content="Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
-  <script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Docward","description":"Privacy-first PDF editor with OCR and true redaction that works 100% on your own PC.","url":"https://catool.co.in/docward","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR"},"author":{"@type":"Person","name":"CA Akshay Daiya"}}</script>
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/docward#webpage","url":"https://catool.co.in/docward","name":"Docward PDF Editor for Windows — OCR & Redaction | CAtool","description":"Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/docward#software"},"breadcrumb":{"@id":"https://catool.co.in/docward#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/docward#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Docward","item":"https://catool.co.in/docward"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/docward#software","name":"Docward","description":"Privacy-first PDF editor with OCR and true redaction that works 100% on your own PC.","url":"https://catool.co.in/docward","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/docward"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 <style>
     .dw-trust { display:flex; gap:22px; justify-content:center; flex-wrap:wrap; margin-top:14px; color:#475569; font-size:13px; font-weight:600; }
@@ -62,7 +69,7 @@
 <!-- /@header -->
 
 <section class="dl-hero">
-  <h1>Docward</h1>
+  <h1>Docward PDF Editor for Windows</h1>
   <p class="sub">
     <strong>Acrobat-class PDF editing that never leaves your device.</strong><br />
     Edit text, redact, recognise scanned pages (OCR), add a signature image, organise and convert PDFs —
@@ -181,6 +188,12 @@
   </div>
 </section>
 
+<section class="prose" aria-label="Related tools">
+  <h2>Related tools for CA firms</h2>
+  <p>Explore <a href="/26as-downloader">bulk 26AS, AIS and TIS downloads</a> and <a href="/gstr2b-recon">GSTR-2B reconciliation</a> in the CAtool hub. See <a href="/download">all Windows downloads</a>.</p>
+  <p><a href="/pricing">Compare app pricing</a> · <a href="/contact">Contact CA Akshay Daiya</a></p>
+</section>
+
 <!-- @footer -->
 <footer class="site">
   <div class="grid">
diff --git a/download.html b/download.html
index ee1a0f4..91caee7 100644
--- a/download.html
+++ b/download.html
@@ -8,19 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Download CAtool, Docward and TallyDrop for Windows — free</title>
   <meta name="description" content="Download the CAtool hub (26AS / AIS / TIS Downloader, GSTR-2B Recon, Tally Audit), the Docward PDF editor and TallyDrop for Windows 10 / 11. Free during early access, no card required." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/download" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/download" />
   <meta property="og:title" content="Download CAtool, Docward and TallyDrop for Windows — free" />
   <meta property="og:description" content="Download the CAtool hub (26AS / AIS / TIS Downloader, GSTR-2B Recon, Tally Audit), the Docward PDF editor and TallyDrop for Windows 10 / 11. Free during early access, no card required." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Download CAtool, Docward and TallyDrop for Windows — free" />
   <meta name="twitter:description" content="Download the CAtool hub (26AS / AIS / TIS Downloader, GSTR-2B Recon, Tally Audit), the Docward PDF editor and TallyDrop for Windows 10 / 11. Free during early access, no card required." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
-  <script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"CAtool","description":"Windows hub app for practising CAs: bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation and a Tally audit dashboard.","url":"https://catool.co.in/download","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR"},"author":{"@type":"Person","name":"CA Akshay Daiya"}}</script>
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/download#webpage","url":"https://catool.co.in/download","name":"Download CAtool, Docward and TallyDrop for Windows — free","description":"Download the CAtool hub (26AS / AIS / TIS Downloader, GSTR-2B Recon, Tally Audit), the Docward PDF editor and TallyDrop for Windows 10 / 11. Free during early access, no card required.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/download#software"},"breadcrumb":{"@id":"https://catool.co.in/download#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/download#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"CAtool","item":"https://catool.co.in/download"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/download#software","name":"CAtool","description":"Windows hub app for practising CAs: bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation and a Tally audit dashboard.","url":"https://catool.co.in/download","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/download"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 </head>
 <body>
diff --git a/gstr2b-recon.html b/gstr2b-recon.html
index 80284a6..32e0f6a 100644
--- a/gstr2b-recon.html
+++ b/gstr2b-recon.html
@@ -6,20 +6,28 @@
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
-  <title>GSTR-2B vs Books Reconciliation — CAtool</title>
-  <meta name="description" content="Reconcile GSTR-2B with books of accounts. Smart Excel reader, fuzzy column mapping, 16(4) ITC + Rule 37 + RCM compliance baked in. Free inside CAtool." />
+  <title>GSTR-2B Reconciliation Software for CAs — CAtool</title>
+  <meta name="description" content="Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/gstr2b-recon" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/gstr2b-recon" />
-  <meta property="og:title" content="GSTR-2B vs Books Reconciliation — CAtool" />
-  <meta property="og:description" content="Reconcile GSTR-2B with books of accounts. Smart Excel reader, fuzzy column mapping, 16(4) ITC + Rule 37 + RCM compliance baked in. Free inside CAtool." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:title" content="GSTR-2B Reconciliation Software for CAs — CAtool" />
+  <meta property="og:description" content="Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool." />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
-  <meta name="twitter:title" content="GSTR-2B vs Books Reconciliation — CAtool" />
-  <meta name="twitter:description" content="Reconcile GSTR-2B with books of accounts. Smart Excel reader, fuzzy column mapping, 16(4) ITC + Rule 37 + RCM compliance baked in. Free inside CAtool." />
+  <meta name="twitter:title" content="GSTR-2B Reconciliation Software for CAs — CAtool" />
+  <meta name="twitter:description" content="Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/gstr2b-recon#webpage","url":"https://catool.co.in/gstr2b-recon","name":"GSTR-2B Reconciliation Software for CAs — CAtool","description":"Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/gstr2b-recon#software"},"breadcrumb":{"@id":"https://catool.co.in/gstr2b-recon#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/gstr2b-recon#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"CAtool GSTR-2B Recon","item":"https://catool.co.in/gstr2b-recon"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/gstr2b-recon#software","name":"CAtool GSTR-2B Recon","description":"Reconcile GSTR-2B against books of accounts from JSON, Excel or Tally. Included in the CAtool hub.","url":"https://catool.co.in/gstr2b-recon","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/gstr2b-recon"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 </head>
 <body>
@@ -85,12 +93,26 @@
     reconciles 12 months in 30 seconds.
   </p>
 
+  <h2>How to reconcile GSTR-2B with books</h2>
+  <ol>
+    <li>Open GSTR-2B Recon inside CAtool and load your GSTR-2B JSON or Excel download.</li>
+    <li>Load the books from Excel or pull the purchase register from Tally. Check the detected columns before matching.</li>
+    <li>Review matched invoices, mismatches, credit notes and ITC exceptions, then export the reconciliation for review.</li>
+  </ol>
+  <p>The reconciliation supports your review of the records. Check source documents and investigate exceptions before using the results for a return.</p>
+
   <div class="note">
     <b>Available now:</b> GSTR-2B Recon ships inside <a href="/download">CAtool</a> — free during
     early access. Install the hub, open the GSTR-2B Recon tool, and reconcile your first client in minutes.
   </div>
 </div>
 
+<section class="prose" aria-label="Related tools">
+  <h2>Related tools for CA firms</h2>
+  <p>Review related income-tax records with the <a href="/26as-downloader">26AS / AIS / TIS Downloader</a>, or inspect live Tally data with the <a href="/tally-audit">Tally Audit Dashboard (beta)</a>.</p>
+  <p><a href="/pricing">Compare app pricing</a> · <a href="/contact">Contact CA Akshay Daiya</a></p>
+</section>
+
 <!-- @footer -->
 <footer class="site">
   <div class="grid">
diff --git a/index.html b/index.html
index 1142055..834dbe8 100644
--- a/index.html
+++ b/index.html
@@ -6,21 +6,28 @@
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
-  <title>CAtool — desktop tools for CA firms: 26AS, GSTR-2B Recon, Tally Audit</title>
-  <meta name="description" content="Windows tools built by a practising CA: the CAtool hub (bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation, Tally audit) plus the Docward PDF editor and TallyDrop. Free during early access." />
+  <title>CAtool: 26AS Downloader, GST Reconciliation &amp; Tally Audit</title>
+  <meta name="description" content="Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/" />
   <meta property="og:title" content="CAtool — desktop tools built by a CA, for CAs" />
-  <meta property="og:description" content="Windows tools built by a practising CA: the CAtool hub (bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation, Tally audit) plus the Docward PDF editor and TallyDrop. Free during early access." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:description" content="Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop." />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="CAtool — desktop tools built by a CA, for CAs" />
-  <meta name="twitter:description" content="Windows tools built by a practising CA: the CAtool hub (bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation, Tally audit) plus the Docward PDF editor and TallyDrop. Free during early access." />
+  <meta name="twitter:description" content="Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
-  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}}</script>
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/#webpage","url":"https://catool.co.in/","name":"CAtool: 26AS Downloader, GST Reconciliation & Tally Audit","description":"Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"}}]}</script>
   <!-- /@head -->
 <meta name="google-site-verification" content="pkmGz6RvL5RXhTFM0pgedficnbGigiOTNzrfAOZ_QMo" />
 </head>
@@ -117,7 +124,7 @@
       <h3>26AS / AIS / TIS Downloader</h3>
       <p>Bulk-download Form 26AS, AIS and TIS for your entire client list in one click. Auto-unlocks PDFs, parses TDS partywise + sectionwise into Excel, and fetches the latest 143(1) intimation with refund + 244A interest.</p>
       <div class="price"><span class="free">Free</span> <span class="muted">while in early access</span></div>
-      <a class="btn btn-primary" href="/26as-downloader">Learn more →</a>
+      <a class="btn btn-primary" href="/26as-downloader">Explore the 26AS Downloader →</a>
     </div>
 
     <div class="card">
@@ -125,7 +132,7 @@
       <h3>GSTR-2B vs Books Recon</h3>
       <p>Reconcile GSTR-2B against your books with one click — or pull books straight from Tally. Smart column mapping, monthly + annual modes, carry-forward matching, with Sec 16(4), Rule 37 and RCM compliance baked in.</p>
       <div class="price"><span class="free">Free</span> <span class="muted">while in early access</span></div>
-      <a class="btn btn-primary" href="/gstr2b-recon">Learn more →</a>
+      <a class="btn btn-primary" href="/gstr2b-recon">Explore GSTR-2B reconciliation →</a>
     </div>
 
     <div class="card">
@@ -133,7 +140,7 @@
       <h3>Tally Audit Dashboard</h3>
       <p>End-to-end Tally data audit: trial balance, party ledger matrix, voucher book, variance analysis, P&amp;L, TDS/TCS section-wise comparison against 26AS, and BS cleanliness checks — all from live Tally data.</p>
       <div class="price"><span class="free">Free</span> <span class="muted">while in early access</span></div>
-      <a class="btn btn-primary" href="/tally-audit">Learn more →</a>
+      <a class="btn btn-primary" href="/tally-audit">Explore Tally Audit →</a>
     </div>
 
     <div class="card card-highlight">
@@ -162,14 +169,14 @@
         <h3>Docward — PDF editor</h3>
         <p>Acrobat-class PDF editing that never leaves your device: edit text, true redaction, OCR for scans, sign, organise and convert — 100% on your own PC.</p>
         <div class="price"><span class="free">Free</span> <span class="muted">· one-time Pro upgrade removes the watermark</span></div>
-        <a class="btn btn-primary" href="/docward">Learn more →</a>
+        <a class="btn btn-primary" href="/docward">Explore Docward PDF Editor →</a>
       </div>
       <div class="card">
         <span class="badge live">Available now</span>
         <h3>TallyDrop — right Tally, every time</h3>
         <p>Drop any client's Tally data and it opens in the exact Tally release it belongs to — TallyPrime, Edit Log or Tally.ERP 9. Release not installed? One click gets the official download.</p>
         <div class="price"><span class="free">Free</span> <span class="muted">while in early access</span></div>
-        <a class="btn btn-primary" href="/tallydrop/">Learn more →</a>
+        <a class="btn btn-primary" href="/tallydrop/">Explore TallyDrop →</a>
       </div>
     </div>
   </div>
@@ -274,11 +281,11 @@
   <p class="lead">A desktop app that looks and behaves like one — no browser tabs, no logins to juggle.</p>
   <div class="gallery gallery-wide">
     <figure class="shot">
-      <img src="/assets/shots/hub-home.webp" alt="The CAtool hub home screen with all three tools installed" loading="lazy" onerror="this.closest('.shot').classList.add('shot-empty');this.remove();" />
+      <img width="1400" height="757" decoding="async" src="/assets/shots/hub-home.webp" alt="The CAtool hub home screen with all three tools installed" loading="lazy" onerror="this.closest('.shot').classList.add('shot-empty');this.remove();" />
       <figcaption>The CAtool hub — every tool in one window, one client list</figcaption>
     </figure>
     <figure class="shot">
-      <img src="/assets/shots/gstr2b.webp" alt="GSTR-2B vs Books reconciliation results with matched, mismatched and ITC totals" loading="lazy" onerror="this.closest('.shot').classList.add('shot-empty');this.remove();" />
+      <img width="1400" height="821" decoding="async" src="/assets/shots/gstr2b.webp" alt="GSTR-2B vs Books reconciliation results with matched, mismatched and ITC totals" loading="lazy" onerror="this.closest('.shot').classList.add('shot-empty');this.remove();" />
       <figcaption>GSTR-2B vs Books — matched, mismatched &amp; net ITC at a glance</figcaption>
     </figure>
   </div>
diff --git a/pricing.html b/pricing.html
index 51db845..463253c 100644
--- a/pricing.html
+++ b/pricing.html
@@ -8,18 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Pricing — CAtool, Docward and TallyDrop</title>
   <meta name="description" content="CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/pricing" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/pricing" />
   <meta property="og:title" content="Pricing — CAtool, Docward and TallyDrop" />
   <meta property="og:description" content="CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Pricing — CAtool, Docward and TallyDrop" />
   <meta name="twitter:description" content="CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/pricing#webpage","url":"https://catool.co.in/pricing","name":"Pricing — CAtool, Docward and TallyDrop","description":"CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"breadcrumb":{"@id":"https://catool.co.in/pricing#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/pricing#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Pricing","item":"https://catool.co.in/pricing"}]}]}</script>
   <!-- /@head -->
 </head>
 <body>
diff --git a/privacy.html b/privacy.html
index efc438a..0b2fbba 100644
--- a/privacy.html
+++ b/privacy.html
@@ -8,18 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Privacy Policy — CAtool</title>
   <meta name="description" content="How catool.co.in and the CAtool, Docward and TallyDrop apps handle your data. Client data never leaves your PC." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/privacy" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/privacy" />
   <meta property="og:title" content="Privacy Policy — CAtool" />
   <meta property="og:description" content="How catool.co.in and the CAtool, Docward and TallyDrop apps handle your data. Client data never leaves your PC." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Privacy Policy — CAtool" />
   <meta name="twitter:description" content="How catool.co.in and the CAtool, Docward and TallyDrop apps handle your data. Client data never leaves your PC." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/privacy#webpage","url":"https://catool.co.in/privacy","name":"Privacy Policy — CAtool","description":"How catool.co.in and the CAtool, Docward and TallyDrop apps handle your data. Client data never leaves your PC.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"breadcrumb":{"@id":"https://catool.co.in/privacy#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/privacy#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Privacy Policy","item":"https://catool.co.in/privacy"}]}]}</script>
   <!-- /@head -->
 </head>
 <body>
diff --git a/refund.html b/refund.html
index c4302f2..0128918 100644
--- a/refund.html
+++ b/refund.html
@@ -8,18 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Refund &amp; Cancellation Policy — CAtool</title>
   <meta name="description" content="Refund and cancellation terms for CAtool subscriptions and Docward Pro purchases." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/refund" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/refund" />
   <meta property="og:title" content="Refund &amp; Cancellation Policy — CAtool" />
   <meta property="og:description" content="Refund and cancellation terms for CAtool subscriptions and Docward Pro purchases." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Refund &amp; Cancellation Policy — CAtool" />
   <meta name="twitter:description" content="Refund and cancellation terms for CAtool subscriptions and Docward Pro purchases." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/refund#webpage","url":"https://catool.co.in/refund","name":"Refund & Cancellation Policy — CAtool","description":"Refund and cancellation terms for CAtool subscriptions and Docward Pro purchases.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"breadcrumb":{"@id":"https://catool.co.in/refund#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/refund#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Refund & Cancellation Policy","item":"https://catool.co.in/refund"}]}]}</script>
   <!-- /@head -->
 </head>
 <body>
diff --git a/robots.txt b/robots.txt
index 7b2f4ea..e8e0d25 100644
--- a/robots.txt
+++ b/robots.txt
@@ -1,4 +1,5 @@
 User-agent: *
 Allow: /
+Disallow: /api/
 
 Sitemap: https://catool.co.in/sitemap.xml
diff --git a/scripts/build.mjs b/scripts/build.mjs
index 2ace755..2248e16 100644
--- a/scripts/build.mjs
+++ b/scripts/build.mjs
@@ -39,31 +39,43 @@ function productList() {
 }
 
 function jsonLd(page) {
-  const blocks = [];
-  if (page.home) {
-    blocks.push({
-      '@context': 'https://schema.org', '@type': 'Organization', name: 'CAtool', url: SITE + '/',
+  if (page.noindex) return [];
+  const url = SITE + page.path;
+  const org = SITE + '/#organization';
+  const site = SITE + '/#website';
+  const blocks = [
+    { '@type': 'Organization', '@id': org, name: 'CAtool', url: SITE + '/',
       logo: SITE + '/assets/logo-mark-72.png', email: 'akshaybkn@gmail.com', telephone: '+91-99290-89598',
-      founder: { '@type': 'Person', name: 'CA Akshay Daiya', sameAs: 'https://www.linkedin.com/in/akshaydaiya/' },
-    });
+      founder: { '@type': 'Person', name: 'CA Akshay Daiya', sameAs: 'https://www.linkedin.com/in/akshaydaiya/' } },
+    { '@type': 'WebSite', '@id': site, name: 'CAtool', url: SITE + '/', publisher: { '@id': org }, inLanguage: 'en-IN' },
+    { '@type': page.path === '/contact' ? 'ContactPage' : 'WebPage', '@id': url + '#webpage',
+      url, name: page.title, description: page.description, inLanguage: 'en-IN',
+      isPartOf: { '@id': site }, ...(page.app ? { mainEntity: { '@id': url + '#software' } } : {}) },
+  ];
+  if (!page.home) {
+    blocks[2].breadcrumb = { '@id': url + '#breadcrumb' };
+    blocks.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: [
+      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
+      { '@type': 'ListItem', position: 2, name: page.app ? APPS[page.app].name : page.title.split(' — ')[0], item: url },
+    ] });
   }
   if (page.app) {
     const app = APPS[page.app];
-    blocks.push({
-      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: app.name, description: app.description,
-      url: SITE + app.url, applicationCategory: 'BusinessApplication', operatingSystem: 'Windows 10, Windows 11',
-      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
-      author: { '@type': 'Person', name: 'CA Akshay Daiya' },
-    });
+    blocks.push({ '@type': 'SoftwareApplication', '@id': url + '#software', name: app.name,
+      description: app.description, url: SITE + app.url, applicationCategory: 'BusinessApplication',
+      operatingSystem: 'Windows 10, Windows 11', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', url: SITE + app.url },
+      author: { '@type': 'Person', name: 'CA Akshay Daiya', sameAs: 'https://www.linkedin.com/in/akshaydaiya/' },
+      publisher: { '@id': org }, isAccessibleForFree: true });
   }
-  return blocks.map((b) => `  <script type="application/ld+json">${JSON.stringify(b).replace(/</g, '\\u003c')}</script>`);
+  const graph = { '@context': 'https://schema.org', '@graph': blocks };
+  return [`  <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`];
 }
 
 const GA_ID = 'G-S4NBSRVDQ0';
 
 function headBlock(page) {
   const url = SITE + page.path;
-  const image = SITE + (page.image || '/assets/logo-full.png');
+  const image = SITE + (page.image || '/assets/logo-mark.png');
   const ogTitle = page.ogTitle || page.title;
   const lines = [
     '<meta charset="utf-8" />',
@@ -73,15 +85,21 @@ function headBlock(page) {
     `<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');</script>`,
     `<title>${esc(page.title)}</title>`,
     `<meta name="description" content="${esc(page.description)}" />`,
-    page.noindex ? '<meta name="robots" content="noindex" />' : null,
+    page.noindex ? '<meta name="robots" content="noindex, follow" />' : '<meta name="robots" content="max-image-preview:large" />',
     `<link rel="canonical" href="${esc(url)}" />`,
     '<link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />',
     '<meta property="og:type" content="website" />',
+    '<meta property="og:locale" content="en_IN" />',
     '<meta property="og:site_name" content="catool.co.in" />',
     `<meta property="og:url" content="${esc(url)}" />`,
     `<meta property="og:title" content="${esc(ogTitle)}" />`,
     `<meta property="og:description" content="${esc(page.description)}" />`,
     `<meta property="og:image" content="${esc(image)}" />`,
+    `<meta property="og:image:width" content="${page.image ? 1072 : 822}" />`,
+    `<meta property="og:image:height" content="${page.image ? 887 : 822}" />`,
+    `<meta property="og:image:alt" content="${esc(page.image ? 'TallyDrop identifying the Tally release needed for client data' : 'CAtool logo')}" />`,
+    `<meta name="twitter:image" content="${esc(image)}" />`,
+    `<meta name="twitter:image:alt" content="${esc(page.image ? 'TallyDrop identifying the Tally release needed for client data' : 'CAtool logo')}" />`,
     `<meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}" />`,
     `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
     `<meta name="twitter:description" content="${esc(page.description)}" />`,
@@ -188,5 +206,13 @@ if (!existsSync(sitemapPath) || readFileSync(sitemapPath, 'utf8').replace(/\r\n/
   else { writeFileSync(sitemapPath, sitemap); console.log('updated sitemap.xml'); }
 }
 
+// Keep flow pages crawlable: crawlers must be able to read their noindex tag.
+const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`;
+if (read('robots.txt').replace(/\r\n/g, '\n') !== robots) {
+  changed++;
+  if (CHECK) console.log('out of date: robots.txt');
+  else { writeFileSync(join(ROOT, 'robots.txt'), robots); console.log('updated robots.txt'); }
+}
+
 if (CHECK && changed) { console.log(`\n${changed} file(s) out of date — run: node scripts/build.mjs`); process.exit(1); }
 console.log(changed ? `\n${CHECK ? '' : 'Done:'} ${changed} file(s) ${CHECK ? 'out of date' : 'written'}.` : 'Everything up to date.');
diff --git a/scripts/pages.mjs b/scripts/pages.mjs
index 7e0615a..eb6d308 100644
--- a/scripts/pages.mjs
+++ b/scripts/pages.mjs
@@ -12,8 +12,20 @@
 export const SITE = 'https://catool.co.in';
 export const BRAND = 'CAtool';
 
-// Downloadable apps. `lead.js` uses the same keys (data-download="catool" etc.).
+// Product schema definitions. Only standalone download keys (catool/docward/tallydrop) are used by lead.js.
 export const APPS = {
+  downloader: {
+    name: 'CAtool 26AS / AIS / TIS Downloader', url: '/26as-downloader',
+    description: 'Bulk-download Form 26AS, AIS and TIS, unlock PDFs and export TDS summaries to Excel. Included in the CAtool hub.',
+  },
+  recon: {
+    name: 'CAtool GSTR-2B Recon', url: '/gstr2b-recon',
+    description: 'Reconcile GSTR-2B against books of accounts from JSON, Excel or Tally. Included in the CAtool hub.',
+  },
+  audit: {
+    name: 'CAtool Tally Audit Dashboard (beta)', url: '/tally-audit',
+    description: 'Review live Tally data, TDS/TCS comparisons against 26AS and audit exceptions. Beta tool included in CAtool.',
+  },
   catool: {
     name: 'CAtool',
     description: 'Windows hub app for practising CAs: bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation and a Tally audit dashboard.',
@@ -44,8 +56,8 @@ export const PRODUCT_LINKS = [
 export const PAGES = [
   {
     file: 'index.html', path: '/',
-    title: 'CAtool — desktop tools for CA firms: 26AS, GSTR-2B Recon, Tally Audit',
-    description: 'Windows tools built by a practising CA: the CAtool hub (bulk 26AS / AIS / TIS downloads, GSTR-2B reconciliation, Tally audit) plus the Docward PDF editor and TallyDrop. Free during early access.',
+    title: 'CAtool: 26AS Downloader, GST Reconciliation & Tally Audit',
+    description: 'Windows software for CA firms: bulk 26AS, AIS and TIS downloads, GSTR-2B reconciliation and Tally audit. Explore CAtool, Docward and TallyDrop.',
     ogTitle: 'CAtool — desktop tools built by a CA, for CAs',
     home: true,
   },
@@ -61,31 +73,31 @@ export const PAGES = [
     description: 'CAtool and TallyDrop are free during early access — no card, no subscription. Docward is free to use, with a one-time Pro upgrade that removes the watermark.',
   },
   {
-    file: '26as-downloader.html', path: '/26as-downloader',
+    file: '26as-downloader.html', path: '/26as-downloader', app: 'downloader',
     title: '26AS / AIS / TIS Bulk Downloader for CAs — CAtool',
-    description: 'Bulk downloader for Form 26AS, AIS and TIS from the Indian IT e-Filing portal. Per-assessee folders, auto PDF-unlock, partywise + sectionwise Excel, ITR intimation refund + 244A interest.',
+    description: 'Bulk-download Form 26AS, AIS and TIS from the income tax portal. Unlock PDFs and export TDS summaries to Excel. Included in CAtool for Windows.',
   },
   {
-    file: 'gstr2b-recon.html', path: '/gstr2b-recon',
-    title: 'GSTR-2B vs Books Reconciliation — CAtool',
-    description: 'Reconcile GSTR-2B with books of accounts. Smart Excel reader, fuzzy column mapping, 16(4) ITC + Rule 37 + RCM compliance baked in. Free inside CAtool.',
+    file: 'gstr2b-recon.html', path: '/gstr2b-recon', app: 'recon',
+    title: 'GSTR-2B Reconciliation Software for CAs — CAtool',
+    description: 'Reconcile GSTR-2B JSON or Excel with books from Tally, Busy or SAP. Match invoices, review ITC exceptions and export results. Included in CAtool.',
   },
   {
-    file: 'tally-audit.html', path: '/tally-audit',
-    title: 'Tally Audit Dashboard (beta) — CAtool',
+    file: 'tally-audit.html', path: '/tally-audit', app: 'audit',
+    title: 'Tally Audit Software & TDS Reconciliation (Beta) — CAtool',
     description: 'End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&L and TDS/TCS against 26AS. In beta, free inside CAtool.',
   },
   {
     file: 'docward.html', path: '/docward',
-    title: 'Docward — Acrobat-class PDF editing that never leaves your device',
-    description: 'Docward is a privacy-first desktop PDF editor with built-in OCR. Edit text, redact, recognise scans, add signature images, organise and convert PDFs — 100% on your own PC. Free with a watermark; a one-time upgrade removes it.',
+    title: 'Docward PDF Editor for Windows — OCR & Redaction | CAtool',
+    description: 'Edit, redact, sign and organise PDFs on your PC with Docward for Windows. Built-in OCR for scans. Free with a watermark; a one-time Pro upgrade removes it.',
     cta: { label: 'Get Docward', href: '#pricing' },
     lead: true, app: 'docward',
   },
   {
     file: 'tallydrop/index.html', path: '/tallydrop/',
-    title: 'TallyDrop — open every client\'s Tally data in the right Tally version | CAtool',
-    description: 'TallyDrop tells which Tally release a client\'s data belongs to (TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 …) and opens it in exactly that version — or gives you the official download. Built by a CA for CA firms. Free during early access.',
+    title: 'TallyDrop — Open Tally Data in the Right Version | CAtool',
+    description: 'Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download.',
     ogTitle: 'TallyDrop — drop client data, it opens in the right Tally',
     cta: { label: 'Get TallyDrop', href: '#download' },
     lead: true, app: 'tallydrop',
diff --git a/subscribe.html b/subscribe.html
index c5c5240..de8c3d1 100644
--- a/subscribe.html
+++ b/subscribe.html
@@ -8,15 +8,21 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Subscribe — CAtool</title>
   <meta name="description" content="CAtool subscription." />
-  <meta name="robots" content="noindex" />
+  <meta name="robots" content="noindex, follow" />
   <link rel="canonical" href="https://catool.co.in/subscribe" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/subscribe" />
   <meta property="og:title" content="Subscribe — CAtool" />
   <meta property="og:description" content="CAtool subscription." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Subscribe — CAtool" />
   <meta name="twitter:description" content="CAtool subscription." />
diff --git a/success.html b/success.html
index 6121b69..e750188 100644
--- a/success.html
+++ b/success.html
@@ -8,15 +8,21 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Thank you — CAtool</title>
   <meta name="description" content="Payment confirmation." />
-  <meta name="robots" content="noindex" />
+  <meta name="robots" content="noindex, follow" />
   <link rel="canonical" href="https://catool.co.in/success" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/success" />
   <meta property="og:title" content="Thank you — CAtool" />
   <meta property="og:description" content="Payment confirmation." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Thank you — CAtool" />
   <meta name="twitter:description" content="Payment confirmation." />
diff --git a/tally-audit.html b/tally-audit.html
index a97edb3..3e97d8e 100644
--- a/tally-audit.html
+++ b/tally-audit.html
@@ -6,20 +6,28 @@
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
-  <title>Tally Audit Dashboard (beta) — CAtool</title>
+  <title>Tally Audit Software &amp; TDS Reconciliation (Beta) — CAtool</title>
   <meta name="description" content="End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&amp;L and TDS/TCS against 26AS. In beta, free inside CAtool." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/tally-audit" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/tally-audit" />
-  <meta property="og:title" content="Tally Audit Dashboard (beta) — CAtool" />
+  <meta property="og:title" content="Tally Audit Software &amp; TDS Reconciliation (Beta) — CAtool" />
   <meta property="og:description" content="End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&amp;L and TDS/TCS against 26AS. In beta, free inside CAtool." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
-  <meta name="twitter:title" content="Tally Audit Dashboard (beta) — CAtool" />
+  <meta name="twitter:title" content="Tally Audit Software &amp; TDS Reconciliation (Beta) — CAtool" />
   <meta name="twitter:description" content="End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&amp;L and TDS/TCS against 26AS. In beta, free inside CAtool." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/tally-audit#webpage","url":"https://catool.co.in/tally-audit","name":"Tally Audit Software & TDS Reconciliation (Beta) — CAtool","description":"End-to-end audit of live Tally data: trial balance, party ledger matrix, voucher book, variance analysis, P&L and TDS/TCS against 26AS. In beta, free inside CAtool.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/tally-audit#software"},"breadcrumb":{"@id":"https://catool.co.in/tally-audit#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/tally-audit#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"CAtool Tally Audit Dashboard (beta)","item":"https://catool.co.in/tally-audit"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/tally-audit#software","name":"CAtool Tally Audit Dashboard (beta)","description":"Review live Tally data, TDS/TCS comparisons against 26AS and audit exceptions. Beta tool included in CAtool.","url":"https://catool.co.in/tally-audit","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/tally-audit"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 </head>
 <body>
@@ -63,6 +71,10 @@
     <li><b>Exception reports.</b> Round-trip transactions, ledger duplications, suspicious round-figure entries — the things partners want to see before signing.</li>
   </ul>
 
+  <h2>Review Tally audit exceptions</h2>
+  <p>Open the Tally Audit Dashboard inside CAtool to review live Tally data. Inspect section-wise TDS/TCS comparisons against 26AS, PAN grouping and exception reports alongside the source records.</p>
+  <p>The dashboard is in beta. Cross-check reported figures and investigate flagged entries before relying on them in audit working papers.</p>
+
   <div class="note">
     <b>Beta:</b> Tally Audit ships inside <a href="/download">CAtool</a> today, free. Some modules
     are still being refined, so always cross-check the figures before you rely on them — and please
@@ -71,6 +83,12 @@
   </div>
 </div>
 
+<section class="prose" aria-label="Related tools">
+  <h2>Related tools for CA firms</h2>
+  <p>Use the <a href="/26as-downloader">26AS Downloader</a> for TDS records and <a href="/gstr2b-recon">GSTR-2B reconciliation</a> for GST invoice matching. <a href="/tallydrop/">TallyDrop</a> helps open client data in the matching Tally release.</p>
+  <p><a href="/pricing">Compare app pricing</a> · <a href="/contact">Contact CA Akshay Daiya</a></p>
+</section>
+
 <!-- @footer -->
 <footer class="site">
   <div class="grid">
diff --git a/tallydrop/index.html b/tallydrop/index.html
index 82bd9be..3954887 100644
--- a/tallydrop/index.html
+++ b/tallydrop/index.html
@@ -6,21 +6,28 @@
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-S4NBSRVDQ0"></script>
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
-  <title>TallyDrop — open every client's Tally data in the right Tally version | CAtool</title>
-  <meta name="description" content="TallyDrop tells which Tally release a client's data belongs to (TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 …) and opens it in exactly that version — or gives you the official download. Built by a CA for CA firms. Free during early access." />
+  <title>TallyDrop — Open Tally Data in the Right Version | CAtool</title>
+  <meta name="description" content="Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/tallydrop/" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/tallydrop/" />
   <meta property="og:title" content="TallyDrop — drop client data, it opens in the right Tally" />
-  <meta property="og:description" content="TallyDrop tells which Tally release a client's data belongs to (TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 …) and opens it in exactly that version — or gives you the official download. Built by a CA for CA firms. Free during early access." />
+  <meta property="og:description" content="Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download." />
   <meta property="og:image" content="https://catool.co.in/tallydrop/screenshot-decision.png" />
+  <meta property="og:image:width" content="1072" />
+  <meta property="og:image:height" content="887" />
+  <meta property="og:image:alt" content="TallyDrop identifying the Tally release needed for client data" />
+  <meta name="twitter:image" content="https://catool.co.in/tallydrop/screenshot-decision.png" />
+  <meta name="twitter:image:alt" content="TallyDrop identifying the Tally release needed for client data" />
   <meta name="twitter:card" content="summary_large_image" />
   <meta name="twitter:title" content="TallyDrop — drop client data, it opens in the right Tally" />
-  <meta name="twitter:description" content="TallyDrop tells which Tally release a client's data belongs to (TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 …) and opens it in exactly that version — or gives you the official download. Built by a CA for CA firms. Free during early access." />
+  <meta name="twitter:description" content="Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
-  <script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"TallyDrop","description":"Opens every client's Tally data in the exact Tally release it belongs to, or gets you the official download.","url":"https://catool.co.in/tallydrop/","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR"},"author":{"@type":"Person","name":"CA Akshay Daiya"}}</script>
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/tallydrop/#webpage","url":"https://catool.co.in/tallydrop/","name":"TallyDrop — Open Tally Data in the Right Version | CAtool","description":"Identify the TallyPrime, Edit Log or Tally.ERP 9 release your client data needs. TallyDrop opens the matching version or links to the official download.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"mainEntity":{"@id":"https://catool.co.in/tallydrop/#software"},"breadcrumb":{"@id":"https://catool.co.in/tallydrop/#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/tallydrop/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"TallyDrop","item":"https://catool.co.in/tallydrop/"}]},{"@type":"SoftwareApplication","@id":"https://catool.co.in/tallydrop/#software","name":"TallyDrop","description":"Opens every client's Tally data in the exact Tally release it belongs to, or gets you the official download.","url":"https://catool.co.in/tallydrop/","applicationCategory":"BusinessApplication","operatingSystem":"Windows 10, Windows 11","offers":{"@type":"Offer","price":"0","priceCurrency":"INR","url":"https://catool.co.in/tallydrop/"},"author":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"},"publisher":{"@id":"https://catool.co.in/#organization"},"isAccessibleForFree":true}]}</script>
   <!-- /@head -->
 <style>
     .td-trust { display:flex; gap:22px; justify-content:center; flex-wrap:wrap; margin-top:14px; color:#475569; font-size:13px; font-weight:600; }
@@ -78,7 +85,7 @@
 </div>
 
 <section class="dl-hero" id="download">
-  <h1>TallyDrop</h1>
+  <h1>TallyDrop: Open the Right Tally Version</h1>
   <p class="sub">
     <strong>Drop a client's data. It opens in the right Tally.</strong><br />
     TallyDrop reads which Tally release the data belongs to — TallyPrime 6.2, Edit Log 6.1, Tally.ERP 9 —
@@ -103,8 +110,8 @@
     one Tally that matches.
   </p>
   <div class="td-shot">
-    <figure><img src="/tallydrop/screenshot-decision.png" alt="TallyDrop showing that the data is at TallyPrime 7.1 with a Download TallyPrime 7.1 button" loading="lazy" /><figcaption>Release not installed? TallyDrop shows exactly which one to download.</figcaption></figure>
-    <figure><img src="/tallydrop/screenshot-main.webp" alt="TallyDrop listing several client companies with the Tally release each needs" loading="lazy" /><figcaption>Drop a whole data folder: every company with the release it needs.</figcaption></figure>
+    <figure><img width="1072" height="887" decoding="async" src="/tallydrop/screenshot-decision.png" alt="TallyDrop showing that the data is at TallyPrime 7.1 with a Download TallyPrime 7.1 button" loading="lazy" /><figcaption>Release not installed? TallyDrop shows exactly which one to download.</figcaption></figure>
+    <figure><img width="1400" height="952" decoding="async" src="/tallydrop/screenshot-main.webp" alt="TallyDrop listing several client companies with the Tally release each needs" loading="lazy" /><figcaption>Drop a whole data folder: every company with the release it needs.</figcaption></figure>
   </div>
 </section>
 
@@ -171,6 +178,12 @@
     Tally, TallyPrime and Tally.ERP 9 are trademarks of Tally Solutions Pvt. Ltd., used here only to describe compatibility.</p>
 </section>
 
+<section class="prose" aria-label="Related tools">
+  <h2>Related tools for CA firms</h2>
+  <p>Once the correct Tally release is running, explore the <a href="/tally-audit">Tally Audit Dashboard (beta)</a> and <a href="/gstr2b-recon">GSTR-2B reconciliation</a> in CAtool.</p>
+  <p><a href="/pricing">Compare app pricing</a> · <a href="/contact">Contact CA Akshay Daiya</a></p>
+</section>
+
 <!-- @footer -->
 <footer class="site">
   <div class="grid">
diff --git a/terms.html b/terms.html
index 319d3ab..635c99d 100644
--- a/terms.html
+++ b/terms.html
@@ -8,18 +8,26 @@
   <script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-S4NBSRVDQ0');</script>
   <title>Terms of Service — CAtool</title>
   <meta name="description" content="Terms of service for catool.co.in and the CAtool, Docward and TallyDrop desktop apps." />
+  <meta name="robots" content="max-image-preview:large" />
   <link rel="canonical" href="https://catool.co.in/terms" />
   <link rel="icon" href="/assets/favicon.png" type="image/png" /><link rel="icon" href="/assets/favicon.ico" sizes="any" />
   <meta property="og:type" content="website" />
+  <meta property="og:locale" content="en_IN" />
   <meta property="og:site_name" content="catool.co.in" />
   <meta property="og:url" content="https://catool.co.in/terms" />
   <meta property="og:title" content="Terms of Service — CAtool" />
   <meta property="og:description" content="Terms of service for catool.co.in and the CAtool, Docward and TallyDrop desktop apps." />
-  <meta property="og:image" content="https://catool.co.in/assets/logo-full.png" />
+  <meta property="og:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta property="og:image:width" content="822" />
+  <meta property="og:image:height" content="822" />
+  <meta property="og:image:alt" content="CAtool logo" />
+  <meta name="twitter:image" content="https://catool.co.in/assets/logo-mark.png" />
+  <meta name="twitter:image:alt" content="CAtool logo" />
   <meta name="twitter:card" content="summary" />
   <meta name="twitter:title" content="Terms of Service — CAtool" />
   <meta name="twitter:description" content="Terms of service for catool.co.in and the CAtool, Docward and TallyDrop desktop apps." />
   <link rel="stylesheet" href="/assets/styles.css?v=6f639366" />
+  <script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://catool.co.in/#organization","name":"CAtool","url":"https://catool.co.in/","logo":"https://catool.co.in/assets/logo-mark-72.png","email":"akshaybkn@gmail.com","telephone":"+91-99290-89598","founder":{"@type":"Person","name":"CA Akshay Daiya","sameAs":"https://www.linkedin.com/in/akshaydaiya/"}},{"@type":"WebSite","@id":"https://catool.co.in/#website","name":"CAtool","url":"https://catool.co.in/","publisher":{"@id":"https://catool.co.in/#organization"},"inLanguage":"en-IN"},{"@type":"WebPage","@id":"https://catool.co.in/terms#webpage","url":"https://catool.co.in/terms","name":"Terms of Service — CAtool","description":"Terms of service for catool.co.in and the CAtool, Docward and TallyDrop desktop apps.","inLanguage":"en-IN","isPartOf":{"@id":"https://catool.co.in/#website"},"breadcrumb":{"@id":"https://catool.co.in/terms#breadcrumb"}},{"@type":"BreadcrumbList","@id":"https://catool.co.in/terms#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://catool.co.in/"},{"@type":"ListItem","position":2,"name":"Terms of Service","item":"https://catool.co.in/terms"}]}]}</script>
   <!-- /@head -->
 </head>
 <body>
```

## New file: scripts/check-seo.py

```python
"""Check rendered SEO, local links/assets, anchors and crawl directives (stdlib only)."""
import json
import subprocess
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
catalog = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {PAGES} from './scripts/pages.mjs'; console.log(JSON.stringify(PAGES));"
], cwd=ROOT, text=True))

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.tags, self.ids, self.schemas = [], set(), []
        self.schema = None
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags.append((tag, attrs))
        if attrs.get('id'):
            assert attrs['id'] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.schema = ''

    def handle_data(self, data):
        if self.schema is not None:
            self.schema += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

    def select(self, tag, **attrs):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in attrs.items())]

pages = {p['path']: Page((ROOT / p['file']).read_text()) for p in catalog}
titles, descriptions = set(), set()
for entry in catalog:
    path, page = entry['path'], pages[entry['path']]
    source = (ROOT / entry['file']).read_text()
    assert len(page.select('title')) == 1, path
    assert entry['title'] not in titles, path
    titles.add(entry['title'])
    assert entry['description'] not in descriptions, path
    descriptions.add(entry['description'])
    assert len(page.select('meta', name='description')) == 1, path
    assert page.select('meta', name='description')[0]['content'] == entry['description'], path
    assert page.select('link', rel='canonical') == [{'rel': 'canonical', 'href': 'https://catool.co.in' + path}], path
    for prop in ['og:url', 'og:image', 'og:image:alt', 'og:image:width', 'og:image:height']:
        assert len(page.select('meta', property=prop)) == 1, (path, prop)
    assert page.select('meta', property='og:url')[0]['content'] == 'https://catool.co.in' + path, path
    assert page.select('meta', name='twitter:image')[0]['content'] == page.select('meta', property='og:image')[0]['content'], path
    robots = page.select('meta', name='robots')[0]['content']
    assert ('noindex' in robots) == bool(entry.get('noindex')), path
    if not entry.get('noindex'):
        assert len(page.select('h1')) == 1, path
        graph = page.schemas[0]['@graph']
        assert all('@id' in node for node in graph), path
        assert any(node['@type'] == 'WebSite' for node in graph), path
        apps = [node for node in graph if node['@type'] == 'SoftwareApplication']
        assert bool(apps) == bool(entry.get('app')), path
        for app in apps:
            assert app['url'] == 'https://catool.co.in' + path, path
            assert 'aggregateRating' not in app and 'review' not in app, path
    assert source.count('gtag/js?id=G-S4NBSRVDQ0') == 1, path
    for tag, attrs in page.tags:
        if tag == 'img':
            assert attrs.get('alt') and int(attrs['width']) > 0 and int(attrs['height']) > 0, path
        refs = [attrs[k] for k in ['href', 'src'] if k in attrs]
        if tag == 'meta' and attrs.get('property') == 'og:image':
            refs.append(attrs['content'])
        for ref in refs:
            url = urlsplit(ref)
            if url.netloc and url.netloc != 'catool.co.in' or url.scheme not in ['', 'http', 'https']:
                continue
            target = unquote(url.path) or path
            if target in pages:
                if url.fragment:
                    assert unquote(url.fragment) in pages[target].ids, (path, ref)
            else:
                assert (ROOT / target.lstrip('/')).is_file(), (path, ref)

ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
locs = [node.text for node in ET.parse(ROOT / 'sitemap.xml').findall('s:url/s:loc', ns)]
assert len(locs) == len(set(locs))
assert set(locs) == {'https://catool.co.in' + p['path'] for p in catalog if not p.get('noindex')}
robots = (ROOT / 'robots.txt').read_text()
assert 'Sitemap: https://catool.co.in/sitemap.xml' in robots
assert 'Disallow: /api/' in robots
assert not any('Disallow: ' + p in robots for p in ['/assets', '/subscribe', '/success'])
print(f'PASS: {len(catalog)} pages; metadata, JSON-LD, images, internal links/anchors, analytics, sitemap and robots.')
```
