# Everglow Cleaning Co. website

Static, mobile-first website for Everglow Cleaning Co. (Yuba City, CA).
Planned domain: https://everglowcleaning-company.com

## Pages (clean URLs, no .html)
Every page lives in its own folder as `index.html`, so URLs look like:

- `/` home
- `/services/` all services
- `/services/standard-cleaning/`
- `/services/deep-cleaning/`
- `/services/recurring-cleaning/`
- `/services/move-in-move-out-cleaning/`
- `/services/commercial-cleaning/`
- `/services/post-construction-cleaning/`
- `/services/vacation-rental-airbnb-cleaning/`
- `/services/add-on-services/`
- `/about/`
- `/contact/`
- `404.html` (served automatically by Netlify, Vercel, Cloudflare Pages and GitHub Pages)

Works on any static host. No build step needed: upload the folder as is.

## Files
- `css/styles.css` brand styles (logo black + Everglow blue #00A0EE, Archivo + Inter)
- `js/main.js` menu, services dropdown, before/after slider, quote form
- `assets/` logo, favicon set, Open Graph image, optimized WebP photos
- `robots.txt`, `sitemap.xml`, `site.webmanifest`

## Before going live
1. **Starting prices** are placeholders and must be confirmed with the client:
   Standard $129, Deep $229, Recurring $109, Move-In/Out $269, Post-Construction $299,
   Airbnb $99, Add-ons $25, Commercial = custom quote.
2. **Email**: `hello@everglowcleaning-company.com` is used everywhere. Create that inbox
   or replace it across the HTML files.
3. **Phone number**: none was provided, so none is shown. Add one to the top bar,
   contact page and schema once available.
4. **Quote form**: opens the visitor's email app pre-filled. To receive submissions
   directly, create a Formspree form and add `action="https://formspree.io/f/XXXX"`
   to each `<form data-quote>`; the script will post to it automatically.
5. Connect the domain, then submit `sitemap.xml` in Google Search Console and
   set up a Google Business Profile for local SEO.

## SEO included
Unique titles and descriptions per page, canonical URLs, Open Graph and Twitter cards,
geo meta tags, JSON-LD (HouseCleaningService/LocalBusiness with service area and reviews,
Service + Offer per service page, FAQPage, BreadcrumbList), sitemap and robots.txt.
