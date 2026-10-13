# catool.co.in SEO audit and decisions

Review date: 13 October 2026. Branch: `codex/seo-optimization`.
Base: `origin/main` at `9b65cd4`, fetched before creating this isolated worktree.
No commits, pushes or deployments made. The original checkout was not edited.

## Findings and changes

| Area | Finding | Implemented change |
| --- | --- | --- |
| Metadata | Several product titles/descriptions were long or lacked the software search intent | Refined home, 26AS, GST reconciliation, Tally Audit, Docward and TallyDrop metadata while keeping existing product capabilities and beta status |
| Canonical URLs | Existing HTTPS extensionless canonicals were consistent | Preserved them; added checks for one canonical per page and agreement with social URLs and sitemap |
| Structured data | Organization only on home; software schema absent on three hub-module pages | Connected Organization, WebSite, WebPage/ContactPage, BreadcrumbList and SoftwareApplication graphs with stable IDs; six software pages covered |
| Social previews | Twitter image missing; image alt text, dimensions and locale missing | Added matching Twitter images, image alt text, Open Graph dimensions and en_IN locale; switched default preview to existing square 822px logo |
| Crawling | robots allowed API paths; existing noindex flow pages correctly excluded from sitemap | Generate robots from same origin as sitemap; disallow /api/; retain crawl access to subscribe/success and make noindex/follow explicit |
| Sitemap | Existing sitemap already includes the correct 12 indexable pages | Preserved output; added exact membership and uniqueness checks; no fabricated lastmod dates |
| On-page content | Generic Docward/TallyDrop headings; little contextual cross-linking among product pages | Clearer H1s; descriptive home card links; related tool sections on five product pages; GST reconciliation workflow and Tally beta review guidance using existing documented capabilities |
| Performance | Four screenshots lacked intrinsic dimensions; cache immutable applied to changeable asset names | Added correct dimensions and async decoding while retaining lazy loading; allow one-day revalidation for assets and add screenshot cache rules |
| Maintenance | No SEO regression checker | Added dependency-free Python checker and documented commands |
| Public files | Review documents should not become public static assets | Excluded docs/ from asset deployment |

Default social image size is 280,162 bytes versus 531,656 bytes previously (47% smaller).
This reduces social-preview fetching, not the browser page load. Page screenshots already use
WebP where supplied; image dimensions reserve layout space, but no measured CLS improvement is claimed.

## Decisions

The website markets desktop software. SoftwareApplication describes the products more accurately
than adding a professional Service or LocalBusiness type. Free offers reflect existing visible
free/early-access versions, including Docward's free watermarked version; paid Pro pricing and
payment behavior are unchanged. No invented reviews, ratings, fees, statistics or testimonials
were added. Google software rich results require a rating or review in addition to other fields;
this implementation does not claim that eligibility.

Breadcrumbs represent Home → page hierarchy. Existing visual product navigation remains intact.
The home heading and shared design/CSS are preserved. Related content uses existing prose styling.
Existing long metadata on pages outside the main product work was retained where already descriptive;
Google does not specify a hard character cutoff for snippets.

## Verification

- Baseline: `node scripts/build.mjs --check` passed before edits.
- After changes: build, build consistency check, Node syntax checks, SEO checker, and
  `git diff --check` passed.
- SEO checker: all 14 pages passed metadata, canonical/social URLs, JSON-LD parsing,
  image alt text and dimensions, local asset/link/anchor checks, analytics presence,
  12-page sitemap membership and robots directives.
- Local HTTP preview: all 14 page routes returned 200; robots/sitemap returned 200;
  index.html/product .html routes redirected to canonical clean paths; the legacy
  subscribe.html URL retained its synthetic tier/device query string.
- Existing TallyDrop executable/version URLs returned 200; unknown page/API and private
  script paths returned 404. `/api/config` retained its safe local freeMode default.
- All executable script blocks and inline CSS blocks match the base across 14 pages.
  Shared CSS, lead/download JavaScript, Worker, hosting config, payment code, and binaries
  have no changes.
- `node scripts/serve.mjs` failed under installed Node 18 due to Worker ES module handling.
  Preview succeeded with `node --experimental-default-type=module scripts/serve.mjs 5501`.
  The issue predates the SEO changes; preview source was not modified.

## Limits and follow-up after approval

The web reader could inspect the live homepage, but direct requests to production routes,
robots and sitemap returned HTTP 403 from this environment. That does not establish how Googlebot
is treated. Confirm crawler access, host/HTTPS redirects, status codes and rendered schema in
Search Console and production after an approved deployment.

No browser runtime was available, so visual layout, responsive wrapping, actual JavaScript
interactions and Lighthouse/Core Web Vitals were not measured. Local preview does not emulate
Cloudflare _headers; deployed cache/header behavior is unverified. No live payment, lead-storage,
email, licence or third-party download transactions were performed.

Submit the existing sitemap in Search Console and use URL Inspection/Rich Results Test after
publication. Indexing, rankings and rich results are not guaranteed by these source changes.

## References

- [Google software application structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google robots.txt guidance](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Cloudflare static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/)
- [Cloudflare HTML routing](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)
