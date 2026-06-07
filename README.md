# Add On, Move Up, or Wait? — A Decision Report for 2 Clover Lane

A data-driven analysis of whether a family of five in Weatogue (Simsbury), Connecticut should **build an addition** onto their home, **move** to a larger house in the Latimer Lane school district, or **wait**.

**🔗 Live site:** https://smark11.github.io/build_or_add_on/

---

## The bottom line

**Stay and build a modest (~$150–250K) addition** — because the research surfaced the fact that reframes the whole decision: **2 Clover Lane is *already* in the Latimer Lane Elementary zone** (verified against the official district map), so moving buys *no* school upgrade. Once four industry experts corrected the financial model, the three options **cluster financially** — so the call rests on what a spreadsheet can't price: the school zone they already own, the sub‑4% mortgage rate an addition preserves, and not having to win a bidding war in the #1‑hottest U.S. housing market.

- **Option A — Stay & add (recommended):** keeps the zone + the low rate; controlled scope avoids over‑improving the street.
- **Option B — Move now (co‑finalist):** turnkey space, lowest monthly payment, but forfeits the low rate and buys no school upgrade.
- **Option C — Wait (not advised):** bets against consensus rate forecasts while prices keep rising.

> ⚠️ The entire ranking hinges on one **unverified** number — the family's actual current mortgage rate. The site's interactive calculator lets you drop in real figures and watch the verdict move.

---

## What's in this repo

| Path | What it is |
|------|------------|
| `index.html` | The single‑page decision site |
| `assets/` | `style.css`, `data.js`, `model.js` (financial engine), `app.js` |
| `images/` | 8 original, locally‑generated photos |
| `research/full-research.json` | The complete underlying research package (owner names redacted) |
| `research/addition-deepdive.json` | House‑specific addition‑cost research for 2 Clover Lane |
| `research/design-brief.md` | The project brief / spec |

## Features

- An interactive **10‑year decision calculator** (drag any assumption; the verdict recomputes live)
- An interactive **map of the real current listings** with working links, color‑coded by school zone
- Financial, market, and rate‑scenario **charts**
- A **house‑specific addition cost** breakdown
- An unusually honest **four‑expert review** section showing where the model's own numbers were corrected

## How it was built

- A **13‑agent research workflow** (parallel specialists → financial model → four‑expert adversarial panel → synthesis)
- A second **adversarial QA workflow** (financial logic, data‑vs‑sources accuracy, front‑end, accessibility)
- A dedicated **addition‑cost research** pass specific to this house
- **8 images** generated locally with Flux (no stock licensing)

## Viewing locally

Open `index.html` in any modern browser. An internet connection is needed for the interactive map tiles, the charting library, and web fonts; everything else is local.

## Enabling GitHub Pages

In the repository: **Settings → Pages → Build and deployment → Source: “Deploy from a branch” → Branch: `main` / `(root)` → Save.** The site will publish at `https://smark11.github.io/build_or_add_on/` within a minute or two.

---

## Important notes

- All figures are **well‑researched estimates triangulated from public sources**, *not* the family's confirmed financials. Live listings, prices, and rates change daily.
- Property, school‑zone, tax, and zoning details should be **verified with the Town of Simsbury, Simsbury Public Schools, and licensed professionals** before any decision.
- Map pin locations are **approximate** (street‑level).
- Photography is **illustrative and AI‑generated**; it does not depict the actual home.
- The current owners' personal names have been **redacted** from the research files.

*This is independent research and general financial/market information — not personalized investment, mortgage, tax, or real‑estate advice.*
