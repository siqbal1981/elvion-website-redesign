# SEO follow-up checks (2026-10-05)

Search Console data: Page indexing report last updated 9/20/26 (property elvionbulb.com). URL Inspection results are Google's stored index data as read on 2026-10-05. Live HTTP checks run 2026-10-05 against https://www.elvionbulb.com.

## Sitemap
- Resubmitted https://www.elvionbulb.com/sitemap.xml on Oct 5 2026 (Search Console: Sitemap submitted successfully). Last read still shows Oct 3 / 12 pages: Google has not yet re-read it for the 16 current URLs (pending with Google).
- The earlier resubmission failed because of the automation, not the site: typed input never reached the form field.
- Removed the stale Aug 11 entry whose URL ended in an invisible U+2060 character (%E2%81%A0, General HTTP error). One clean entry remains.

## Not indexed groups (report date 9/20/26)
- 404 (3): /about-us/, /product/compatible-with-wa-style-devices/feed/, /product/suitable-for-welch-allyn-equipment/ - old WordPress URLs. Live now: 301 to /about.html and /shop.html (already in vercel.json).
- 403 (3): wp-content/themes/hello-elementor/*, wp-content/plugins/woocommerce-payments/dist/, wp-includes/js/wp-emoji-release.min.js - old WordPress asset paths, no replacement, intentionally left.
- Other 4xx (1): /wp-admin/admin-ajax.php - WordPress, no replacement.
- Alternate page with proper canonical (1): homepage with a query string - expected.
- Crawled, currently not indexed (7): apex/http variants of the homepage (redirect to www), /contact-us/ (now 301 to /contact.html), /product/engineered-to-fit-welch-allyn-models/ (301 to /shop.html), wp-emoji js, /comments/feed/ (404, no replacement).
- None of the 15 are current site pages.

## Current pages (live HTTP check + URL Inspection)
All 16 sitemap URLs: HTTP 200, self-canonical, no robots meta, no X-Robots-Tag, listed in sitemap, robots.txt allows all.
Google index status: home, shop, guides, faq, about, contact and the six product pages = indexed. otoscope-bulbs, ophthalmoscope-bulbs and both guides = indexing requested, not yet confirmed.

## 03000-U and 03100-U categories: not changed
Official Welch Allyn pages exist (welchallyn.com .../Parts/0/03000-U.html and 03100-U.html) but could not be read in this session. Distributor listings (not manufacturer documentation) describe 03000-U as an ophthalmoscope lamp and 03100-U as an otoscope lamp, and disagree on 03100-U voltage (2.5V vs 3.5V). Categories stay unassigned until the manufacturer pages or manual are read.
