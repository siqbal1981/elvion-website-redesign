# ELVION SEO progress record (continue from here)

Last updated: 2026-10-08 (session 2). Preferred domain https://www.elvionbulb.com, URLs end in .html; do not change.

## Completed (evidence in earlier docs + this PR)
- GSC (read 2026-10-08): data lags ~2 days (latest data 2026-10-05); volumes 0-5 impressions/day. 28-day impressions 34 vs 16 previous; last 7 days 8 vs 16 previous = low-volume noise, not a confirmed decline. The 24-hour zero is reporting lag. Query data anonymized (no query table). Manual Actions and Security Issues clean.
- URL Inspection: all six product pages, both category pages, both guides indexed, self-selected canonical. Legacy WordPress URLs already 301 in vercel.json; no new redirect needed.
- PageSpeed Insights (live, 2026-10-08, Lighthouse 13.5.0): 
  - Home mobile 99 / desktop 100 (LCP 1.5s mobile, 0.3s desktop, TBT 0, CLS 0).
  - 03100-U page mobile 100 / desktop 100 (LCP 1.4s mobile, 0.3s desktop, TBT 0, CLS 0). Accessibility/Best Practices/SEO 100.
  - Field (CrUX) Core Web Vitals: No Data (site too low traffic). Lab and field are separate; no performance fix needed, so no before/after.
- This PR: on all six product pages added Product JSON-LD (name, model, brand, image, url, description; NO offers/price/rating), a "Reading the model reference" section, related-links section (category, sibling model, guides, contact), and an extra FAQ (model vs alias) in HTML + FAQPage JSON-LD. Sitemap lastmod for the six pages set to 2026-10-08.

## Session 3 (2026-10-09)
- PR #9 merged 2026-10-09 14:10 UTC (10:10 ET), merge commit b657ef5. Vercel production deploy succeeded. Live check of all six product pages (via browser): HTTP 200, self-canonical on www, no robots meta, in sitemap (lastmod 2026-10-08), JSON-LD Organization+BreadcrumbList+FAQPage+Product all parse, new FAQ + related sections present, all images and internal links 200.
- robots.txt allows all and lists the sitemap.
- Official source found: Welch Allyn lamp replacement chart (Baxter/Hillrom support PDF): https://support.baxter.com/content/dam/hillrom-aem/us/en/marketing/products/diagnostic-sets/Lamp%20Replacement.pdf . It lists devices per lamp reference. It does NOT give voltage, wattage or lamp type. Device lists per reference (original Welch Allyn data, not ELVION specs):
  - 03000-U: episcope 47300, ophthalmoscopes 11600/11605/11610, retinoscope 18000, strabismoscope 12400 (all obsolete)
  - 03100-U: otoscopes 20000, 20200, 20202, 21700, 25000, 25020, 25200; illuminators 26530, 26538, 27000, 27050, 41100, 43300; handle adapter 73500; tongue blade holder 28100
  - 03400-U: otoscopes 21110, 21111, 24000, 24011, 24020, 24031; PocketScope otoscope/throat illuminator 22820; illuminators 27200, 27250, 41110; handle adapter 73550
  - 03800-U: PanOptic ophthalmoscopes 11800, 11810, 11820
  - 03900-U: PocketScope ophthalmoscopes 11110, 12810, 13000
  - 06500 family (06500-U): Macroview otoscopes 23810, 23814, 23820, 23810-L, 23820-L; Digital Macroview 23920 (obsolete). "HPX06500" is not in the chart.
- Branch seo/manufacturer-chart-2026-10-09 adds this chart as a clearly labelled "Original Welch Allyn listing" section on each product page (no voltage, no ELVION fit claim).
- Third-party distributor pages (not official) quote 3.5V for 03000/03800/03100/06500 and 2.5V for 03900 and disagree elsewhere. NOT published. Treat as unverified.
- Prices/stock: not shown; Amazon buy links only (owner decision 2026-10-09).
- Reviews: none added; no genuine, verifiable ELVION reviews available. Do not add Review/AggregateRating markup unless real reviews are displayed on the page.
- Search Console access via Chrome only; indexing requests: see final report for status.

## Recheck Search Console on or after 2026-10-16 (7 days after merge)
Compare 7 days vs previous 7, check six pages remain indexed, last crawl dates after 2026-10-09, sitemap lastmod read.

## Deliberately NOT published (no verified source)
Voltage, wattage, ELVION-verified compatibility, prices, stock, reviews. Titles/descriptions left unchanged (03100-U and 03000-U not retitled with a category).

## Rich-result eligibility
Product snippets/merchant listings need visible price+availability (offers) or genuine reviews. Prices are not shown by owner decision; no reviews. So blocked. Product markup is entity-only.

## Still needed from owner (one list)
1. Voltage and wattage (and base type) for each original Welch Allyn lamp: from a Welch Allyn/Hillrom lamp datasheet or the supplier.
2. ELVION's own supplier datasheet per model (voltage, wattage, base, bulb type) so ELVION specs can be shown separately.
3. Which instruments ELVION has confirmed each bulb fits (if you want an ELVION compatibility claim).
4. Any real customer reviews you can verify (order-linked) if you want them shown.
