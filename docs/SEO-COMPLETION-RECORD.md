# SEO completion record (2026-10-05)

Preferred domain: https://www.elvionbulb.com (apex 308-redirects to www). Deploys: Vercel from main only.

## Deployed (merged to main, Vercel production READY)
- PR #5 (da6326c): accessible chat-button labels; 80px logo and 48px favicon replace the 100KB+ PNG used at 40px.
- PR #6 (d646224): otoscope-bulbs.html, ophthalmoscope-bulbs.html (CollectionPage/ItemList + BreadcrumbList), two guides (how-to-choose-a-replacement-otoscope-bulb.html, how-to-replace-an-otoscope-bulb-safely.html; Article + BreadcrumbList; sources HEINE instructions for use and Welch Allyn PocketScope manual), footer links, guides.html cards, sitemap.xml now 16 URLs.
- Verified live 2026-10-05: all 16 sitemap URLs return 200, self-canonical, no noindex, JSON-LD present.

## Search Console (property elvionbulb.com, checked 2026-10-05)
- sitemap.xml: submitted, last read Oct 3 2026, Success, 12 discovered pages (read before PR #6; 16 URLs now listed). A second stale entry dated Aug 11 shows Couldn't fetch (URL contains a hidden character).
- Confirmed indexed (URL Inspection): home, 03000-U, 03100-U, 03400-U, 03800-U, 03900-U, hpx06500 product pages.
- Indexing requested 2026-10-05, NOT yet confirmed indexed: otoscope-bulbs, ophthalmoscope-bulbs, both guides.
- Not-indexed report (last update 9/20): 404/403/4xx and 7 crawled-not-indexed rows are legacy WordPress and old http/apex URLs, not current pages.
- Not inspected individually: shop, guides, faq, about, contact.

## Not done, on purpose
- Product schema: not added. Google needs visible price/availability or review data; prices live on Amazon and no verified price is shown on the site. Add when a verified price is published on the page.
- Per-model compatibility lists: not published; no verified source.
- 03000-U and 03100-U not placed in a category: the site states no instrument type for them.

## Performance
- Local Lighthouse (mobile emulation) on served copies; live-site Lighthouse not run: PageSpeed API returned 429 and the web UI stalled. New category pages scored 100/100/100/100 locally.
