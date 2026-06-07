# Add-On vs. Move — Decision Research Site

**Date:** 2026-06-06
**For:** A family of five (parents + twin 3-year-olds + one 5-year-old) at **2 Clover Lane, Weatogue, Simsbury, CT 06089**.

## The decision
Should they:
- **(A) Add on** to 2 Clover Lane to gain space, or
- **(B) Move now** to a larger home in the **Latimer Lane Elementary** attendance zone, or
- **(C) Wait 1–3 years and move** when rates/inventory may be friendlier?

## Audience & stance
- Husband is a **Fidelity financial advisor**; wife is a **public-school speech-language pathologist** working Tue/Wed/Thu (~0.6 FTE).
- The site **makes a data-driven recommendation** and argues for it, while showing the tradeoffs honestly.
- Tone/look: **beautiful, image-rich, data-forward** — premium financial-report feel with maps, charts, and pictures.

## Priorities (what the analysis emphasizes)
1. More bedrooms/space for three young kids.
2. The Latimer Lane school zone.
3. **It must make financial sense** — this is the deciding lens.

## Budget (if moving)
$500k–$700k comfortable; up to ~$900k a real stretch.

## Deeper requirements (explicit from the client)
- **Real, currently-listed homes with working links** in the Latimer zone.
- **Forward-looking inventory forecast** — what's likely to come on market in **1–5 years** (turnover velocity, owner-tenure / "silver tsunami" signals, new construction, rate-driven supply thaw).
- **Macro/micro economic analysis → interest-rate path** (Fed, 10-yr Treasury, inflation, recession odds; base/optimistic/pessimistic scenarios for years 1–5) wired into the financial model.

## Starting assumptions (researched + exposed as adjustable on the site)
- Household income ≈ Fidelity advisor (~$120–170k) + part-time school SLP (~$45–57k) ≈ **$170–220k** — refine via research.
- Current home value, lot, taxes, and **current elementary zone**: pull from public records.
- Mortgage rate unknown → model **two scenarios**: a locked-in low rate (~3.25%) and a recent/current rate (~6.5%). The lock-in effect is likely the single biggest factor.

## Key analytical angles
- **Rate lock-in ("golden handcuffs")** — giving up a sub-4% mortgage to re-borrow at ~6.5–7% can make moving far more expensive than it looks.
- **Is Latimer Lane actually an upgrade** over 2 Clover Lane's *current* zone? Verify early — if it's already Latimer, schools aren't a differentiator.
- **Transaction-cost drag of moving** (~6% + closing + moving) vs. **renovation risk** (overruns, living through it with toddlers, over-improving the block).
- **Timing** — the wait-and-move option, driven by the rate/inventory forecast.

## Methodology (multi-phase agent team)
1. **Foundation research** (parallel specialists): current property; schools & zone; live market + listings; addition cost & zoning feasibility; financing/rates/macro; forward-inventory forecast; household income & taxes.
2. **Financial model** — 10-yr total-cost-of-ownership for A/B/C under rate scenarios.
3. **Expert panel** (adversarial): local realtor, GC/cost estimator, mortgage lender, CFP.
4. **Synthesis** — final recommendation, conditions, risks, and site narrative.

## Deliverable / tech
- Self-contained static site (HTML/CSS/JS), shareable as a folder or hosted anywhere.
- **Interactive Leaflet map** of real listings (pins → popups with links), **Chart.js** for the financial charts, and an **interactive calculator** (sliders for rate, addition cost, sale price, etc.).
- Imagery decided at build time (interactive maps + charts always; hero/section pictures via stock or locally-generated originals).

## Data-integrity rules
- Use **real data and real URLs** actually retrieved. **Never fabricate** listings, prices, or links. Anything unverifiable is flagged as a caveat and timestamped.

## Open items (will refine, not blocking)
- Exact current mortgage rate; new-home must-haves; commute anchor; hard constraints.
