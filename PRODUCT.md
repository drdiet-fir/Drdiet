# Product

<!-- impeccable:product-schema 1 -->

<!-- Derived from the existing codebase, content, and the menu PDF rather than a live interview. Fields marked (inferred) should be confirmed by the owner. -->

## Platform

web

## Users

Health-conscious people in Indian metros who want to eat well without the effort of planning, cooking, or counting macros themselves:

- **Busy working professionals and students** (inferred as the primary audience, from the About story) who want convenient, affordable, genuinely tasty healthy food day to day.
- **Fitness-goal eaters** — weight loss, muscle gain, clean eating — who need calorie-counted, high-protein meals.
- **People managing conditions** — PCOS, diabetes, thyroid — who need medically-sensible, macro-tracked meals.

They order either à la carte (Swiggy/Zomato, WhatsApp, Instagram, or the ordering site) or via a daily meal **subscription**.

## Product Purpose

Dr Diet is a healthy cloud-kitchen meal brand. It cooks calorie-counted, high-protein Indian meals fresh to order and delivers them daily across six cities, as both single orders and subscription plans. The purpose is to make clean, goal-fit eating effortless and affordable — "Eat What's Right" — so staying healthy doesn't depend on willpower, meal prep, or expensive health food.

## Positioning

Real Indian comfort food re-engineered for macros: every dish is **calorie-counted and protein-tagged**, cooked fresh to order with **no maida, no preservatives, no seed oils**, starting around **₹200/meal**, and customizable to the eater's goal. Built from a single 10×8 kitchen in Chandigarh to **17 outlets across 6 cities**. The combination a neighbouring brand can't truthfully copy: familiar Indian dishes (chilla, paneer, biryani bowls, tikka wraps) delivered with transparent, gym-grade nutrition at an everyday price.

## Operating Context

- Customers reach Dr Diet via **Swiggy / Zomato**, **WhatsApp** (7015732242), **Instagram** (@drdiet.fit), or the dedicated ordering site **order.drdiet.fit** (per-product deep links).
- **Subscriptions and partnership enquiries** come through website forms; the team follows up on WhatsApp "within minutes."
- Delivery runs **every day, 11 AM–11 PM**, typically 30–45 minutes from the kitchen.
- The marketing site itself is the top of the funnel: it explains the offer, shows the menu and locations, and captures leads.

## Capabilities and Constraints

- **Stack:** React 18 + Vite single-page app (React Router v6, react-helmet-async); frontend on Vercel, lead backend as a Node/Express service on Render.
- **Lead capture:** Contact, Subscription, Franchise, and Careers forms POST to the backend (`drdiet.onrender.com/submit`), which appends a row to a **Google Sheet** and sends **Twilio WhatsApp** notifications to the team and the user. Careers leads route to a separate "Career Leads" sheet tab; the CV is submitted as a link.
- **Ordering and payment happen off-site** — the app hands off to order.drdiet.fit and the aggregators; there is no in-app cart or payment.
- **Menu is sourced from the official PDF** (`brand_assets/DR DIET MENU.pdf`); dish names, protein and prices must match it.
- Backend config (Google service account, Twilio, allowed origins) lives in environment variables, not the repo.

## Brand Commitments

- **Name:** Dr. Diet. **Logo:** `/logo-primary.png` (the "D" leaf mark). **Mascot line in the logo:** "Eat What's Right."
- **Signature line:** "Dieting Made Delicious." (brand-signature SVG in the footer).
- **Palette:** brand green `#414C3C`, warm cream `#F8F4EC`, lime-yellow accent `#E2E573`.
- **Type:** a flowing script display face (self-hosted "Bethany Elingston") for headings; Inter for body.
- **Contacts:** WhatsApp/phone 7015732242, email drdietdelhi@gmail.com, Instagram @drdiet.fit.
- **Count claim:** 17 outlets across 6 cities — keep consistent sitewide.

## Evidence on Hand

- **Real menu** — `brand_assets/DR DIET MENU.pdf`; dish photography in `public/brand_assets/menu/`.
- **Real outlets** — 17 addresses across Delhi, Gurgaon, Noida, Bengaluru, Chandigarh, and Punjab (Mohali/Kharar/Zirakpur), on the Locations page.
- **Real testimonials** — Swiggy and Google reviews (Kia, Khushi Arora, Abhi, Mohit Yadav, Yuktika Dhupar), used verbatim.
- **Real press** — the StartupPedia feature (verified URL). **Do not fabricate press:** earlier invented Times of India / Forbes mentions were removed and must not return.
- **Real team photo** — `public/brand_assets/dr-diet-team.webp`.
- **Do not fabricate** customer before/after "transformations," ratings, or outlet/city counts beyond the real ones.

## Product Principles

1. **Real food, re-engineered — never bland "diet food."** Familiar Indian dishes done with clean ingredients and macros.
2. **Transparent nutrition.** Every dish shows calories and protein; nothing is a mystery.
3. **Accessible by design.** ₹200 price point and metro coverage keep healthy eating within reach.
4. **Clean ingredients, no shortcuts.** No maida, no preservatives, no seed oils.
5. **Convenience over willpower.** Subscriptions and aggregator reach remove the daily friction of eating well.

## Accessibility & Inclusion

No product-specific standard was formally set; the implementation targets **WCAG 2.1 AA** (labeled form fields, visible keyboard focus, `prefers-reduced-motion` honored, alt text on meaningful imagery).
