# Search Console export analysis, 2026-10-12

Source: Search Console Performance export, Web search, last 28 days (2026-09-13 to 2026-10-10). Raw CSVs saved in docs/gsc-exports/2026-10-12/. Earlier baseline (docs/SEO-BASELINE-2026-10-11.md) is unchanged.

## Totals
- 1 click, 35 impressions, 28 days. Impressions came on 13 of 28 days (0-7 per day).
- Weekly impressions: 10, 16, 6, 3. Clicks: 1 (2026-09-23, on contact.html, a page, not a product).
- Country: United States 34 impressions (1 click), Russia 1. Device: Desktop 35, Mobile 0, Tablet 0.
- Queries: one visible, "otoscope light bulb replacement", 1 impression, average position 51. All other queries are anonymized by Google.
- Search appearance: "Product snippets" 5 impressions (position 6.8).

## Confirmed by the data
1. Volume is extremely low. 35 impressions in 28 days cannot support conclusions about individual keywords.
2. Impressions fell: 26 in the first 14 days versus 9 in the last 14 (weekly 10, 16, 6, 3). The earlier 28-day baseline (2026-08-29 to 09-25) had 32, so overall level is similar but the latest fortnight is lower.
3. Where the site shows, it ranks well (average position 1.6-4 on most impression days). The low visibility is a lack of impressions, not poor positions.
4. Impressions are concentrated on brand-type pages: contact (19), faq (17), about (16), shop (14), home (13). Product pages: 03100-U 11, 03400-U 2, 03000-U 2, 03900-U 2. 03800-U and HPX06500 have none. Guides: guides.html 8, how-to-replace 1.
5. Page rows sum to 113 impressions against 35 total. This is expected when one search shows several of the site's URLs at once, as it often does for brand searches.
6. Old URLs still get impressions: /product/compatible-with-wa-style-devices/ (5, position 6.8, shown with Product snippets), http://elvionbulb.com/ (1), https://elvionbulb.com/ (1), /index.html (1). The live site 301-redirects all of them (checked 2026-10-12).

## Not confirmed, needs more data
- Whether the recent fall is real or noise: counts are too small. Re-compare weekly over 4-8 weeks.
- What people actually searched: 34 of 35 impressions have anonymized queries. Page mix suggests mostly branded or navigational searches, but this is an inference.
- Why no mobile impressions: zero mobile impressions at this volume is not proof of a mobile problem. Check Search Console > Page indexing and Core Web Vitals for mobile; PageSpeed was 99-100 on 2026-10-08.
- Whether the two new guides (indexed 2026-10-12) and the product-page links will earn impressions. Too early.

## Live technical checks, 2026-10-12 (www.elvionbulb.com)
- robots.txt: 200, "Allow: /" plus the sitemap line. No X-Robots-Tag header; no noindex on home (only the 404 page is noindex).
- sitemap.xml: 200, 18 URLs, all exist in the repo.
- Redirects: /index.html -> /, /contact-us/ -> /contact.html, /about-us -> /about.html, /product/... -> /shop.html, http://elvionbulb.com -> https://www.elvionbulb.com/. Unknown paths return 404, wp-admin 403.
- Repo audit of all 19 pages: one H1 each, canonical equals the www .html URL (home is /), unique titles and descriptions, every image has alt and dimensions, JSON-LD parses, no broken internal .html links.
- Not re-run: PageSpeed (the Google API rate-limited this session). Last result 99-100 mobile and desktop on 2026-10-08.

## Changes in this branch
- Shortened over-long titles and meta descriptions on the two new guides, otoscope-bulbs, ophthalmoscope-bulbs. FAQ description now names the six lamp references. No product claims, voltage, price or reviews added.

## Further Search Console exports that would help (owner)
1. Performance > Queries, date range "Last 3 months" (or 16 months when available): export, to see all visible queries. Add the Filter Page contains "-replacement-lamp".
2. Performance > Pages for the same range, for page trend.
3. Indexing > Pages > "Why pages aren't indexed", Export (all 6 reasons) after 2026-10-16.
4. Settings > Crawl stats > Export (shows how often Google fetches the new site).
5. Core Web Vitals (Mobile) report, if it shows data.
