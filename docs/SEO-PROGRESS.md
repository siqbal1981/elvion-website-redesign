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

## Deliberately NOT published (no verified source)
Voltage, wattage, compatible instrument lists, prices, stock, reviews, 03000-U / 03100-U categories. Welch Allyn pages are blocked to our tools (robots/530); distributors disagree on 03100-U voltage.

## Rich-result eligibility
Product snippets / merchant listings need visible price+availability (offers) or genuine reviews/ratings. Prices live on Amazon only and no reviews are shown on-site, so those are blocked. Product markup is present for entity clarity only.

## Still needed from owner
1. Welch Allyn manuals/spec sheets (or supplier datasheets) for each of the six lamp references: voltage, wattage/current, base type, instrument compatibility; and which are otoscope vs ophthalmoscope for 03000-U and 03100-U.
2. ELVION's own verified specs per model (supplier records), kept separate from the originals.
3. Decision: show Amazon price/availability on-site (needs a verified, kept-current source) and/or add genuine customer reviews.
4. A PageSpeed API key (optional) for automated re-checks.

## Next steps
After merge/deploy: verify the six live pages (JSON-LD present, 200, canonical), run Rich Results Test, request indexing once for the six changed pages only, re-check GSC after ~7 days.
