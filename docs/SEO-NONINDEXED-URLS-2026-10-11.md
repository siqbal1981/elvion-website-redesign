# Search Console non-indexed URLs, exported 2026-10-11

Source: Search Console > Pages > "Why pages aren't indexed", property sc-domain:elvionbulb.com. The report's last update was 2026-10-03, so it lags the live site. 19 URLs in 6 reasons, copied exactly from the Examples tables (Last crawled in brackets).

## Crawled - currently not indexed (8, Google systems, validation Failed)
- https://www.elvionbulb.com/how-to-replace-an-otoscope-bulb-safely.html (Oct 5, 2026)
- https://www.elvionbulb.com/how-to-choose-a-replacement-otoscope-bulb.html (Oct 5, 2026)
- https://www.elvionbulb.com/otoscope-bulbs.html (Oct 5, 2026)
- https://www.elvionbulb.com/contact-us/ (Jul 14, 2026)
- https://www.elvionbulb.com/product/engineered-to-fit-welch-allyn-models/ (Jul 13, 2026)
- https://www.elvionbulb.com/wp-includes/js/wp-emoji-release.min.js?ver=6.9.4 (Jul 1, 2026)
- http://www.elvionbulb.com/ (May 26, 2026)
- https://www.elvionbulb.com/comments/feed/ (Feb 27, 2026)

## Not found (404) (3)
- https://www.elvionbulb.com/about-us/ (Sep 10, 2026)
- https://www.elvionbulb.com/product/compatible-with-wa-style-devices/feed/ (Aug 31, 2026)
- https://www.elvionbulb.com/product/suitable-for-welch-allyn-equipment/ (Aug 27, 2026)

## Blocked due to access forbidden (403) (3)
- https://www.elvionbulb.com/wp-content/themes/hello-elementor/* (Aug 27, 2026)
- https://www.elvionbulb.com/wp-content/plugins/woocommerce-payments/dist/ (Aug 13, 2026)
- https://www.elvionbulb.com/wp-includes/js/wp-emoji-release.min.js?ver=7.0.1 (Jul 31, 2026)

## Page with redirect (3)
- http://elvionbulb.com/ (Sep 30, 2026)
- https://elvionbulb.com/ (Sep 30, 2026)
- https://www.elvionbulb.com/product/compatible-with-wa-style-devices/ (Sep 25, 2026)

## Blocked due to other 4xx issue (1)
- https://www.elvionbulb.com/wp-admin/admin-ajax.php?action=rest-nonce (Jun 22, 2026)

## Alternate page with proper canonical tag (1)
- https://www.elvionbulb.com/?wc-ajax=%%endpoint%% (Sep 4, 2026)

## What was checked (live Search Console URL inspection, 2026-10-11)
- otoscope-bulbs.html: "URL is on Google", page is indexed.
- how-to-choose-a-replacement-otoscope-bulb.html: "URL is on Google", page is indexed.
- how-to-replace-an-otoscope-bulb-safely.html: not re-inspected yet. Inspect it on the next check.
So the "Crawled - currently not indexed" rows for these pages are stale report entries, not current problems. Validation was started 2026-10-03 and failed 2026-10-05, before those crawls resolved.

## Assessment (evidence, not assumption)
- Real site pages (3 above, plus contact-us/ and about-us/): the current repo redirects /contact-us/ and /about-us/ to the .html pages with 301. Their GSC state predates that or reflects the old WordPress crawl; recheck, do not change.
- /product/... URLs: vercel.json sends /product/(.*) to /shop.html (301). The 404 and redirect statuses were recorded Aug-Sep; recheck with URL inspection > Test live URL before editing anything.
- wp-content, wp-includes, wp-admin, /feed and /comments/feed paths are intentionally answered with a not-found response by vercel.json rewrites. They should not be indexed, so no action is needed.
- http://, apex and non-www homepage variants appear as "Page with redirect", which is the expected result when they redirect to https://www.elvionbulb.com/.
- /?wc-ajax=%%endpoint%% is a WordPress/WooCommerce artifact with a canonical to the home page; harmless.
- No redirect or robots change is made in this commit.

## Needed from the owner (optional)
- Nothing is required. For a re-validation, in Search Console open each reason and press "Validate fix" only after the live-URL test passes.
