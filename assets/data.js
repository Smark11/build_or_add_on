/* =========================================================================
   DATA — all figures traced to the research package (June 2026).
   Map coordinates are APPROXIMATE (street-level), labeled as such on the map.
   ========================================================================= */
const DATA = {

  property: {
    address: "2 Clover Lane, Weatogue (Simsbury), CT 06089",
    lat: 41.8385, lng: -72.8255,
    specs: [
      { k: "Bedrooms", v: "4" },
      { k: "Bathrooms", v: "2.5" },
      { k: "Finished area", v: "1,976", sub: "sq ft" },
      { k: "Lot", v: "1.59", sub: "acres" },
      { k: "Built", v: "1992" },
      { k: "Zone", v: "R-40" },
      { k: "Bought 12/2020", v: "$339K" },
      { k: "Est. value '26", v: "~$575K" },
    ],
    assessed: "$284,410",
    tax: "~$9,954 / yr",
    estRange: "$546K–$618K",
  },

  // GreatSchools 0–10 for bar; U.S. News 2024 CT rank for context
  schools: [
    { name: "Latimer Lane", sub: "current zone · #1 in Simsbury", gs: 9.0, rank: "#33 in CT", math: "78%", read: "82%", home: true },
    { name: "Tootin' Hills", sub: "West Simsbury", gs: 9.0, rank: "#40 in CT", math: "75%", read: "77%" },
    { name: "Central", sub: "Simsbury center", gs: 8.0, rank: "#73 in CT", math: "75%", read: "78%" },
    { name: "Squadron Line", sub: "largest, PK–6", gs: 8.5, rank: "#108 in CT", math: "69%", read: "75%" },
    { name: "Tariffville", sub: "smallest", gs: 8.0, rank: "#130 in CT", math: "62%", read: "67%" },
  ],

  pipeline: [
    { k: "Elementary", v: "Latimer Lane", s: "GreatSchools 9/10 · #1 in town" },
    { k: "Middle (7–8)", v: "Henry James Memorial", s: "Former Nat'l Blue Ribbon · 7/10" },
    { k: "High School", v: "Simsbury High", s: "10/10 · ~#14 in CT · 94% grad" },
  ],

  // 30-yr fixed rate path — research scenarios
  rateScenarios: {
    labels: ["Now (Jun '26)", "+1 yr", "+2 yr", "+3 yr", "+5 yr"],
    base:        [6.48, 6.40, 6.30, 6.15, 6.00],
    optimistic:  [6.48, 6.05, 5.70, 5.45, 5.25],
    pessimistic: [6.48, 6.80, 7.05, 7.25, 7.25],
  },

  options: [
    {
      id: "a", cls: "a", k: "Option A · Stay & Add", recommended: true,
      title: "Build a scope-controlled addition",
      score: 7.5,
      summary: "A focused, value-first addition — finish the ~384 sq ft walkout and put the unused formal living room to work (they already have a family room), with a rear great room only if they want more — financed by a fixed second lien that preserves the sub-4% first mortgage. Keeps the Latimer zone, dodges a bidding war, stays under the ~$650–700K ceiling.",
      pros: [
        "Preserves the pandemic-era sub-4% first mortgage — only the addition is borrowed at today's rates",
        "Keeps the Latimer Lane zone the family already has",
        "Adds the living space they actually lack — no new bedroom, no septic review",
        "Fully hedges a #1-hottest, supply-starved market — no bidding war",
      ],
      cons: [
        "Even the best new space recoups only part of its cost (~22–71% by type)",
        "A build means months of disruption with three kids under six",
        "Bedroom-adding versions trigger a CT septic review ($25–60K+ risk)",
        "Over-improvement risk — the street caps value near $650–700K",
      ],
      foot: [ { k: "Smart all-in", v: "~$50–110K" }, { k: "10-yr cash", v: "≈ tie" } ],
    },
    {
      id: "b", cls: "b", k: "Option B · Move Now",
      title: "Buy a larger in-zone home",
      score: 6.5,
      summary: "Sell 2 Clover Lane (~$575K) and buy a larger Latimer-zone home such as 5 Lawton Dr ($649,900, 4bd/3,157 sqft). A genuine co-finalist: turnkey space immediately, the lowest monthly payment, and the most cash-flow cushion — but it forfeits the low first mortgage and buys no school upgrade.",
      pros: [
        "Turnkey larger space now — no construction with three young kids",
        "Lowest monthly payment; frees ~$1,300/mo (≈$228K invested over 10 yr)",
        "Real, in-budget, in-zone inventory exists today",
        "Clean single first-lien payment",
      ],
      cons: [
        "Forfeits the sub-4% first mortgage — the core penalty (+~$197/mo per $100K)",
        "~$47K sunk transaction cost; +~$6K/yr property tax reset",
        "NO school upgrade — already in the Latimer zone",
        "Must win in a market selling ~113% of asking in ~14 days",
      ],
      foot: [ { k: "10-yr cash", v: "≈ tie" }, { k: "Monthly", v: "~$3.8K" } ],
    },
    {
      id: "c", cls: "c", k: "Option C · Wait",
      title: "Wait 1–3 years, then move",
      score: 3.5,
      summary: "Stay ~2 cheap years, then sell and buy. The weakest option — and all four experts agree. It bets against consensus (no real rate relief through 2027–28) and against a market where prices keep rising and CT lags the national inventory thaw.",
      pros: [
        "Two extra low-cost years modestly trim 10-yr cash cost",
        "Keeps the Latimer zone + low tax basis during the wait",
        "Optionality: pivot to a basement finish or small addition",
      ],
      cons: [
        "Bets against consensus rate forecasts (Fannie 6.3% / MBA 6.4–6.5%)",
        "Waiting likely means paying MORE (~$717K vs $650K) for less choice",
        "Still forfeits the low rate when the move finally happens",
        "Leaves three young kids cramped ~2 more years",
      ],
      foot: [ { k: "10-yr cash", v: "lowest*" }, { k: "*but", v: "fragile" } ],
    },
  ],

  experts: [
    {
      initials: "RE", color: "#B0461E",
      role: "Real-Estate Agent", sub: "20 yrs · Farmington Valley CT",
      verdict: "Directionally sound — and I verified the decisive fact myself: 2 Clover Lane IS in the Latimer zone. But the model's '$100K wealth lead' is manufactured by an over-optimistic equity credit; honestly marked, all three options cluster.",
      catchTitle: "What I caught",
      catch: "Valuing the post-addition house at ~$775K assumes ~65% instant recoup — it contradicts the model's own 27–53% figure and sits above the Weatogue comp ceiling. Mark it honestly and Option A's 'win' largely disappears.",
    },
    {
      initials: "GC", color: "#1F4A3D",
      role: "General Contractor", sub: "Cost estimator · Hartford County",
      verdict: "The build is modeled too cleanly and too cheaply. The lean toward staying is defensible, but treat the addition's numbers as a floor, not a midpoint — and don't commit until you have fixed-price bids and a survey-verified footprint.",
      catchTitle: "What I caught",
      catch: "$305K for 700 sqft is the optimistic edge; Farmington Valley design-build runs $450–650/sqft. Carry 20% contingency on a 1992 home — and you never modeled the unfinished basement (~63% recoup vs additions' 27–53%).",
    },
    {
      initials: "ML", color: "#5C6B71",
      role: "Mortgage Loan Officer", sub: "Connecticut",
      verdict: "The lock-in math is correct to the dollar — but the financing engine behind Option A is underpriced and may not even be approvable as scoped. Prove the premise first: bring me the actual Note.",
      catchTitle: "What I caught",
      catch: "A $305K second lien on a ~$575K home is ~95% CLTV — above most lenders' 80–85% cap. The full addition would force a HomeStyle reno first mortgage that RESETS the low rate, shrinking A's edge over B to almost nothing.",
    },
    {
      initials: "CFP", color: "#C0842B",
      role: "Fee-Only CFP", sub: "High-earning households",
      verdict: "Directionally defensible, quantitatively overstated. Accept the lean to A on lifestyle/zone/rate grounds — but strike the precise net-wealth ranking. It probably doesn't maximize net worth once realistic recoup and opportunity cost are modeled.",
      catchTitle: "What I caught",
      catch: "The 'net position' metric ignores that B/C free ~$1,300/mo which, invested at 7%, is ~$228K over a decade — enough to flip the ranking. No Fidelity advisor would tolerate that omission.",
    },
  ],

  corrections: [
    "Struck the headline <b>'Option A wins by ~$90–110K on net wealth.'</b> Re-based the post-addition value to a recoup-consistent ~$660–700K and reframed all three options as <b>clustering within noise</b>.",
    "Re-priced Option A financing from 7.75%/20yr to a realistic <b>~8.25% at 10–15yr</b>, raising the monthly to ~$5,217–$5,577 — which breaks the 28% DTI ceiling once childcare is counted.",
    "Added the <b>CLTV feasibility gate</b>: a $305K second lien is ~95% CLTV, above the 80–85% cap — so the full-scope all-second-lien plan likely isn't approvable.",
    "Changed the lead recommendation to a <b>smaller ~$150–250K</b> bedroom + bath addition that fits CLTV and DTI and stays under the comp ceiling.",
    "Added the omitted <b>opportunity cost</b>: B/C free ~$1,300/mo ≈ $228K invested over 10 yr — promoting B to a genuine co-finalist.",
    "Re-labeled 4%/yr appreciation as the <b>base case</b> (Zillow's +3.9% Hartford forecast), not 'conservative'; flagged the +16.4% trailing print as a 17-sale, high-variance sample.",
    "Elevated <b>'verify the actual mortgage rate, balance & term'</b> from a caveat to a gating prerequisite for the entire ranking.",
    "Surfaced the hidden Weatogue risk: on well + septic, adding bedrooms can trigger a <b>septic-capacity review ($25–60K+)</b> that no budget here includes.",
  ],

  forecast: [
    { h: "1–2 Years", t: "Stays tight", inv: "Rates ease only modestly; CT lock-in barely loosens; pipeline adds little for-sale supply. Low double-digit active listings, ~14–18 day sales, at/above asking.", price: "Mid-single-digit growth (~3–7%/yr); no decline expected." },
    { h: "3 Years", t: "Gradual loosening", inv: "If rates drift to high-5s, some lock-in releases and early 'silver-tsunami' listings begin; small subdivisions deliver a few lots. Still seller-leaning.", price: "Growth decelerates toward ~2–4%/yr; affordability improves via rates, not prices." },
    { h: "5 Years", t: "More supply, still firm", inv: "The 55+/65+ cohort (29% of town) increasingly lists; best odds of real selection of larger in-zone homes — but a true buyer's market isn't the base case.", price: "Real prices may flatten; nominal prices likely still grind upward." },
  ],

  // map markers — coordinates APPROXIMATE
  listings: [
    { addr: "5 Lawton Drive", price: "$649,900", beds: "4", baths: "4", sqft: "3,157", lot: "1.07 ac", zone: true, star: "Top in-zone match",
      note: "Cape, updated kitchen, 1st-floor primary, finished lower level. In budget AND in the Latimer zone.", url: "https://www.zillow.com/homedetails/5-Lawton-Dr-Simsbury-CT-06070/174081400_zpid/", lat: 41.8605, lng: -72.8175 },
    { addr: "72 Old Meadow Plain Rd", price: "$479–515K", beds: "4", baths: "3", sqft: "2,193", lot: "~0.95 ac", zone: true,
      note: "Renovated raised ranch in Weatogue, near the family's current home. In zone, below budget.", url: "https://www.zillow.com/homedetails/72-Old-Meadow-Plain-Rd-Weatogue-CT-06089/174084034_zpid/", lat: 41.8350, lng: -72.8290 },
    { addr: "14 Amy Lane", price: "$569,900", beds: "4", baths: "3", sqft: "2,156", lot: "0.93 ac", zone: true,
      note: "Standard 1972 colonial in the Latimer zone. Price via aggregator — verify.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8575, lng: -72.8150 },
    { addr: "12 Crane Place", price: "$484,999", beds: "4", baths: "3", sqft: "1,688", lot: "0.93 ac", zone: true,
      note: "Below budget, in zone. Smaller for a family of five but four bedrooms, nearly an acre.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8560, lng: -72.8120 },
    { addr: "44 Climax Road", price: "$519,000", beds: "4", baths: "2", sqft: "1,827", lot: "1.30 ac", zone: true,
      note: "In zone and budget, 1.3-acre lot. Only 2 baths — a candidate where an addition could still apply.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8510, lng: -72.8330 },
    { addr: "93 Old Meadow Plain Rd", price: "$549,900", beds: "4", baths: "3", sqft: "2,436", lot: "—", zone: true, status: "Under contract",
      note: "In-zone comp showing what mid-$500s buys — recently went under contract (strong demand signal).", url: "https://www.coldwellbankerhomes.com/ct/simsbury/weatogue/", lat: 41.8360, lng: -72.8300 },
    { addr: "98 Old Meadow Plain Rd", price: "$515,000", beds: "4", baths: "3", sqft: "2,012", lot: "—", zone: true, status: "Under contract",
      note: "Another in-zone comp, also under contract — evidence of fast-selling demand for this profile.", url: "https://www.coldwellbankerhomes.com/ct/simsbury/weatogue/", lat: 41.8358, lng: -72.8308 },
    { addr: "9 Branch Brook Drive", price: "$665,000", beds: "5", baths: "3", sqft: "2,513", lot: "0.34 ac", zone: false,
      note: "5 bedrooms, in budget — but Central zone (not Latimer) and a small 0.34-acre lot.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8700, lng: -72.8090 },
    { addr: "14 Long View Drive", price: "$624,900", beds: "5", baths: "3", sqft: "2,051", lot: "0.93 ac", zone: false,
      note: "5bd in budget — but Central zone, modest sqft for five bedrooms.", url: "https://www.coldwellbankerhomes.com/ct/simsbury/weatogue/", lat: 41.8430, lng: -72.8330 },
    { addr: "7 Tallwood Lane", price: "$899,900", beds: "4", baths: "3", sqft: "3,058", lot: "1.36 ac", zone: false,
      note: "Top of budget, larger/newer (1991), cul-de-sac by ~47 ac of open space — but Central zone.", url: "https://www.coldwellbankerhomes.com/ct/simsbury/weatogue/", lat: 41.8400, lng: -72.8360 },
    { addr: "10 Hampshire Lane", price: "$749,000", beds: "5", baths: "4", sqft: "5,023", lot: "0.57 ac", zone: false,
      note: "Most space for the money (5,023 sqft) — but Squadron Line zone, not Latimer.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8890, lng: -72.8010 },
    { addr: "6 Stratton Lane", price: "$550,000", beds: "4", baths: "3", sqft: "2,171", lot: "0.93 ac", zone: false,
      note: "In budget — but West Simsbury (06092), outside the Latimer attendance zone.", url: "https://www.compass.com/homes-for-sale/simsbury-ct/", lat: 41.8680, lng: -72.8620 },
  ],

  school_marker: { addr: "Latimer Lane Elementary", sub: "33 Mountain View Rd · the school", lat: 41.8425, lng: -72.8090 },

  assumptions: [
    { k: "Current home value", v: "$575,000" },
    { k: "Modeled first mortgage", v: "$239K @ 3.25%*" },
    { k: "Today's 30-yr rate", v: "6.48%" },
    { k: "Home-equity (2nd lien)", v: "~8.25% fixed" },
    { k: "New home (move)", v: "$650,000" },
    { k: "Appreciation", v: "4% / yr (base)" },
    { k: "Simsbury mill rate", v: "35.00 (70% assess.)" },
    { k: "Selling + buying costs", v: "5.5% + 2%" },
    { k: "Household income", v: "~$230K (range $185–290K)" },
    { k: "Horizon", v: "10 years" },
  ],

  sources: [
    { cat: "Property & Zoning" },
    { t: "Simsbury Assessor — 2 Clover Lane record", u: "https://www.propertyrecordcards.com/PropertyResults.aspx?towncode=128&uniqueid=32090751" },
    { t: "Simsbury Zoning Regulations (R-40)", u: "https://www.simsbury-ct.gov/sites/g/files/vyhlif9751/f/uploads/zoning_regulations_effective_special_events_in_i-1_districts_5-21-23_final_with_cover_0.pdf" },
    { t: "Simsbury Tax Collector — mill rate", u: "https://www.simsbury-ct.gov/372/Tax-Collector" },
    { t: "Simsbury Building Dept — permit fees", u: "https://www.simsbury-ct.gov/building-department/faq/what-do-permits-cost" },

    { cat: "Schools" },
    { t: "Simsbury Elementary District Street Listing (rev. 4/23/25) — 'Clover Lane → Latimer'", u: "https://www.simsbury.k12.ct.us/uploaded/District_Content/Transportation/Street_Lisiting_Elem_Districts.pdf" },
    { t: "Latimer Lane — GreatSchools", u: "https://www.greatschools.org/connecticut/simsbury/836-Latimer-Lane-School/" },
    { t: "How Simsbury elementaries rank (U.S. News 2024)", u: "https://patch.com/connecticut/simsbury/heres-how-simsburys-elementary-schools-rank-new-report" },
    { t: "Simsbury High — U.S. News (2025)", u: "https://www.usnews.com/education/best-high-schools/connecticut/districts/simsbury-school-district/simsbury-high-school-4539" },
    { t: "CT EdSight — state report card", u: "https://edsight.ct.gov/" },

    { cat: "Market & Listings" },
    { t: "5 Lawton Dr — Zillow (top in-zone match)", u: "https://www.zillow.com/homedetails/5-Lawton-Dr-Simsbury-CT-06070/174081400_zpid/" },
    { t: "William Pitt Sotheby's — Simsbury market report (May '26)", u: "https://www.williampitt.com/community-real-estate/hartford-county/simsbury-ct/market-report" },
    { t: "Coldwell Banker — Weatogue/Simsbury listings", u: "https://www.coldwellbankerhomes.com/ct/simsbury/weatogue/" },
    { t: "Compass — Simsbury homes for sale", u: "https://www.compass.com/homes-for-sale/simsbury-ct/" },
    { t: "Hartford = #1 hottest U.S. market 2026 (Zillow)", u: "https://www.zillow.com/research/hottest-markets-2026-35924/" },

    { cat: "Rates & Macro" },
    { t: "Freddie Mac PMMS — 30-yr 6.48% (wk 6/4/26)", u: "https://www.freddiemac.com/pmms" },
    { t: "Fed FOMC Summary of Economic Projections (3/18/26)", u: "https://www.federalreserve.gov/monetarypolicy/files/fomcprojtabl20260318.pdf" },
    { t: "Redfin — mortgage rate lock-in (52.5% sub-4%)", u: "https://www.redfin.com/news/mortgage-rate-lock-in-effect-eases/" },
    { t: "Bankrate — home-equity / HELOC rates (Jun '26)", u: "https://www.bankrate.com/home-equity/home-equity-loan-rates/" },
    { t: "10-yr Treasury yield", u: "https://tradingeconomics.com/united-states/government-bond-yield" },

    { cat: "Costs, Income & Forecast" },
    { t: "Home addition cost — Hartford (HomeBlue)", u: "https://www.homeblue.com/home-addition/hartford-ct-home-addition-cost.htm" },
    { t: "CT addition cost 2026 — Fine Home Contracting", u: "https://finehomecontracting.com/how-much-does-a-home-addition-cost-in-connecticut/" },
    { t: "2025 Cost vs Value — recoup rates", u: "https://www.fixr.com/articles/cost-vs-value" },
    { t: "Fidelity advisor comp (CT) — ZipRecruiter", u: "https://www.ziprecruiter.com/Salaries/Fidelity-Financial-Advisor-Salary--in-Connecticut" },
    { t: "School SLP salary (CT) — Salary.com", u: "https://www.salary.com/research/salary/recruiting/school-speech-language-pathologist-salary/ct" },
    { t: "CT active listings down 4.8% YoY — FRED", u: "https://fred.stlouisfed.org/series/ACTLISCOUCT" },
  ],

  // ---- house-specific addition deep-dive (see research/addition-deepdive.json) ----
  addition: {
    intro: "The home is a 26×38 colonial with a 912 sq ft WALKOUT lower level holding the two tuck-under garage bays + laundry — so the truly finishable basement is only ~384 sq ft. The main floor already has an eat-in kitchen, a family room with a fireplace, a formal dining room, a formal living room that goes unused, and a 12×16 rear deck. So the real gap isn't living space in general — it's usable, finished space for the kids. Constraints: the kitchen sits over the garage (no building up there), the 40-ft side-yard setback sends any addition off the rear, and the ~$650–700K comp ceiling caps the defensible spend near $100–150K. 2026 Hartford-County pricing.",
    ceiling: "Latimer/Weatogue comps top out near $650–700K against this home's ~$575K value — so the defensible all-in spend is ~$100–125K ($150K absolute). Bars past that line over-improve the street.",
    septic: "On well + septic, any option that adds a bedroom triggers a CT Public Health Code (19-13-B100a) septic-capacity review — budget $1–3K if the system has reserve capacity, or $25–60K+ if the leach field must be expanded or replaced. This is kept separate from the construction costs.",
    scenarios: [
      { key: "REC", name: "Finish the walkout + put the unused room to work", tag: "Recommended · best value", get: "Finish the ~384 sq ft walkout into a bright rec room/playroom, and reclaim the unused formal living room (open it to the kitchen or make it a playroom/office). They already have a family room — this adds the usable space they're missing without a big build.", lo: 50000, hi: 110000, sqft: "~384 sf walkout + the reclaimed room", recoup: "high (~70% on the walkout)", time: "2–4 mo", note: "The most value-defensible move for this house: cheapest usable space, no septic trigger, no variance, well under the ~$650–700K ceiling — using rooms they already have.", rec: true },
      { key: "A", name: "Finish the walkout basement", tag: "Inside the footprint", get: "Finish the ~384 sq ft unfinished walkout (the non-garage part of the lower level) into a bright playroom/rec room — walkout grade means real windows and light.", lo: 30000, hi: 60000, sqft: "~384 sf finished walkout", recoup: "~70% (walkout)", time: "2–3 mo", note: "Highest feasibility and best ROI; no bedroom = no septic trigger. Only ~384 sf is finishable — the rest of the lower level is the 2-car garage.", rec: false },
      { key: "B", name: "Rear great room + mudroom", tag: "Ground-floor rear (optional)", get: "A vaulted family/great room + mudroom off the rear at the main-floor level (where the deck is). No bedroom.", lo: 110000, hi: 175000, sqft: "+430–600 above grade", recoup: "22–40%", time: "4–6 mo", note: "Built up to the raised main floor on a full foundation; centered to clear the 40-ft side yard. Note: they already have a family room, so this is extra space.", rec: false },
      { key: "C", name: "Walkout finish + rear bump-out", tag: "Value combo", get: "Finish the ~384 sq ft walkout plus a small rear bump-out to enlarge the kitchen/family area.", lo: 95000, hi: 175000, sqft: "+150–250 above grade + ~384 finished walkout", recoup: "~45–65%", time: "4–6 mo", note: "Balanced middle path; bump-outs run high per sqft on fixed costs.", rec: false },
      { key: "E", name: "Two-story rear addition", tag: "Great room + suite", get: "Family room below, primary suite above — maximum space in one build, off the rear.", lo: 300000, hi: 500000, sqft: "+800–1,100 above grade", recoup: "16–40%", time: "8–12 mo", note: "Clear over-improvement on a ~$575K house; adds a bedroom (triggers the septic review).", rec: false },
      { key: "F", name: "Do-it-once: two-story rear + finished walkout", tag: "Everything at once", get: "A two-story rear addition (great room + primary suite) plus the finished walkout.", lo: 350000, hi: 550000, sqft: "+800–1,100 above grade + ~384 walkout", recoup: "low overall", time: "10–14 mo", note: "Solves everything but lands far above the street ceiling — lifestyle-only.", rec: false },
      { key: "K", name: "Finish walkout + open up the kitchen", tag: "Reconfigure · keeps the garage", get: "Finish the ~384 sq ft walkout and open the eat-in kitchen into the adjacent unused formal living room — without touching the garage, so no replacement garage is needed.", lo: 85000, hi: 150000, sqft: "~550 sq ft (~384 walkout + the unused room)", recoup: "~70–85% blended", time: "4–7 mo", note: "A value-defensible reconfiguration: skips the costly garage build-up and replacement garage, keeps your parking, and lets the high-ROI kitchen carry the return. The kitchen wall is load-bearing — budget an engineered beam ($4–12K).", rec: false },
      { key: "G", name: "Convert garage + finish walkout + new garage", tag: "Lower-level reconfiguration", get: "The tuck-under garage (~528 sf) becomes a heated family room/playroom, the ~384 sf walkout is finished, and a new 2-car garage restores parking — a much bigger home with the same garage count.", lo: 120000, hi: 230000, sqft: "~900 sq ft gained (≈528 garage + ≈384 walkout)", recoup: "~55–65% blended", time: "5–8 mo", note: "A forever-home reconfiguration that clears the ~$150K ceiling. The replacement garage (~$35–65K, build it detached) is mandatory remediation, not value-add. Biggest cost swing: building the old garage floor up to kitchen level.", rec: false },
      { key: "H", name: "Reconfigure + expand the kitchen", tag: "Reconfig + open kitchen", get: "Everything in Plan G, plus the kitchen opens into the adjacent unused formal living room and is remodeled into a large open kitchen with an island — dead space becomes the home's best feature.", lo: 175000, hi: 320000, sqft: "~1,050 sq ft gained/reclaimed", recoup: "~60–72% blended", time: "7–11 mo", note: "The strongest big plan on blended return (the kitchen pays back best), but firmly a forever-home spend past the ceiling. Keep the kitchen midrange ($55–90K) for the best return; upscale pushes past $300K and recoups least.", rec: false },
    ],
    lineItems: [
      { item: "Foundation / footings (42-in frost depth)", pct: 15, note: "~$16–23K · the biggest New England premium" },
      { item: "Framing & sheathing", pct: 14, note: "~$16–21K · tie into 1992 framing" },
      { item: "Roof + tie-in to existing roofline", pct: 10, note: "~$10–16K · ice-&-water shield, flashing" },
      { item: "Siding & trim matched to the colonial", pct: 8, note: "~$8–13K · so it doesn't read as a bolt-on" },
      { item: "HVAC extension", pct: 7.5, note: "~$7–13K · may need to upsize the system" },
      { item: "Electrical", pct: 7.5, note: "~$8–12K · new circuits, panel check" },
      { item: "Plumbing", pct: 7, note: "$0–13K · ~zero for a dry room, rises with a bath" },
      { item: "Flooring", pct: 7.5, note: "~$7–13K" },
      { item: "Windows & exterior doors", pct: 6.5, note: "~$7–10K · match the existing line" },
      { item: "Interior trim, paint, finishes", pct: 6, note: "~$5–10K · mid-grade to match the block" },
      { item: "Drywall & taping", pct: 5.5, note: "~$5–9K" },
      { item: "Insulation + ice-dam detailing", pct: 4.5, note: "~$4–8K · heavy R-values for CT winters" },
    ],
    softCosts: "On top of construction, budget ~15–25% for soft costs: architect/designer (5–15%), a structural engineer ($1–4K, required for any build-up), the Simsbury permit ($16.26 per $1,000 — about $1,656 on a $100K job), and a 10–20% contingency on a 30-year-old house.",
    bottomLine: "Add usable space, not bedrooms — and stay under ~$125K. The home already has a family room and an unused formal living room, so the best value is to finish the ~384 sq ft walkout (~$30–60K) and put the unused room to work — cheap, high-ROI, no septic review. A rear great room (~$110–175K) is extra space only if they want it. Avoid the two-story rear and do-it-once package as financial moves — at $300–550K they over-improve a ~$575K house and trigger the septic wildcard.",
  },

  // ---- architect-reconstructed floor plans (see research/floor-plans.json) ----
  floorplans: {
    disclaimer: "Grounded in the Simsbury assessor building record (a 26×38 colonial, 1,976 sq ft over a 912 sq ft WALKOUT lower level that holds the two tuck-under garage bays + laundry, plus a 12×16 rear deck) and the 2019 MLS description (eat-in kitchen opening to a family room with fireplace, separate formal living + dining rooms, a first-floor half bath, French doors to the deck, and a front-to-back master suite + 3 bedrooms upstairs). Room sizes and interior wall positions are inferred from that verified envelope and the owners' notes — no public room-by-room floor plan exists. Schematic, not to exact scale, not construction drawings.",
    existing: [
      { name: "Lower level — today (walkout)", cols: 4, grid: [["GAR","GAR","GAR","BAS"],["GAR","GAR","GAR","BAS"],["STA","LAU","MEC","BAS"]],
        rooms: { GAR:{n:"2-car tuck-under garage",d:"~528 sf"}, BAS:{n:"Unfinished walkout basement",d:"~384 sf"}, LAU:{n:"Laundry",d:""}, MEC:{n:"Mechanical",d:""}, STA:{n:"Stair up",d:""} } },
      { name: "Main level — today", cols: 5, grid: [["DEK","FAM","FAM","KIT","KIT"],["DEK","FAM","FAM","KIT","KIT"],["DIN","DIN","FOY","LIV","LIV"],["DIN","DIN","PWD","LIV","LIV"]],
        rooms: { DEK:{n:"Wood deck (French doors)",d:"12×16"}, FAM:{n:"Family room + fireplace",d:"~14×16"}, KIT:{n:"Eat-in kitchen (over garage)",d:"~13×16"}, DIN:{n:"Dining room",d:"~11×12"}, FOY:{n:"Foyer / stairs",d:""}, PWD:{n:"Half bath",d:"5×6"}, LIV:{n:"Formal living room (unused)",d:"~12×14"} } },
      { name: "Upper level — today (unchanged in every option)", cols: 4, grid: [["MST","MST","BD2","BD3"],["MST","MST","BD2","BD3"],["ENS","WIC","BTH","BD4"]],
        rooms: { MST:{n:"Master suite (front-to-back)",d:"~13×18"}, ENS:{n:"Master bath",d:"~7×9"}, WIC:{n:"Walk-in closet",d:"~5×7"}, BD2:{n:"Bedroom 2",d:"~11×12"}, BD3:{n:"Bedroom 3",d:"~10×12"}, BD4:{n:"Bedroom 4",d:"~10×11"}, BTH:{n:"Hall bath",d:"~5×9"} } },
    ],
    options: [
      { key: "REC", title: "Recommended — finish the walkout + put the unused room to work", note: "The home already has a family room with a fireplace, so the smart move isn't a big addition — it's finishing the ~384 sq ft walkout into a bright rec room/playroom and reclaiming the unused formal living room (open it to the kitchen, or make it a playroom/office). Cheapest usable space, no septic trigger, well under the value ceiling.",
        plans: [
          { name: "Main level — after", cols: 5, grid: [["DEK","FAM","FAM","KIT","KIT"],["DEK","FAM","FAM","KIT","KIT"],["DIN","DIN","FOY","RCL","RCL"],["DIN","DIN","PWD","RCL","RCL"]],
            rooms: { DEK:{n:"Wood deck",d:"12×16"}, FAM:{n:"Family room + fireplace",d:"~14×16"}, KIT:{n:"Eat-in kitchen",d:"~13×16"}, DIN:{n:"Dining room",d:"~11×12"}, FOY:{n:"Foyer / stairs",d:""}, PWD:{n:"Half bath",d:"5×6"}, RCL:{n:"Reclaimed room → playroom / office",d:"~12×14",new:true} } },
          { name: "Lower level — after", cols: 4, grid: [["GAR","GAR","GAR","REC"],["GAR","GAR","GAR","REC"],["STA","LAU","MEC","REC"]],
            rooms: { GAR:{n:"Garage (retained)",d:"~528 sf"}, REC:{n:"New finished walkout rec room",d:"≈384 sf",new:true}, LAU:{n:"Laundry",d:""}, MEC:{n:"Mechanical",d:""}, STA:{n:"Stair",d:""} } },
        ],
        renderings: [ { img:"plan-rec-walkout.jpg", cap:"Concept: the finished walkout lower level as a bright playroom (illustrative)" } ] },
      { key: "B", title: "Add a rear great room (optional, off the deck side)", note: "If they want more than they have, a single-story great room + mudroom can be added off the rear at the main-floor level (where the deck is). They already have a family room, so this is extra space — and the great room is the bulk of the cost.",
        plans: [
          { name: "Main level — after", cols: 5, grid: [["GRT","GRT","GRT","GRT","MUD"],["FAM","FAM","KIT","KIT","MUD"],["FAM","FAM","KIT","KIT","DIN"],["LIV","LIV","FOY","PWD","DIN"]],
            rooms: { GRT:{n:"New rear great room",d:"18×22",new:true}, MUD:{n:"Mudroom",d:"8×12",new:true}, FAM:{n:"Family room + fireplace",d:"~14×16"}, KIT:{n:"Eat-in kitchen",d:"~13×16"}, DIN:{n:"Dining",d:"~11×12"}, LIV:{n:"Formal living",d:"~12×14"}, FOY:{n:"Foyer",d:""}, PWD:{n:"Half bath",d:"5×6"} } },
        ],
        renderings: [ { img:"plan-rec-greatroom.jpg", cap:"Concept: the rear great room interior (illustrative)" }, { img:"plan-rec-rear-ext.jpg", cap:"Concept: the rear addition tied into the back of the colonial (illustrative)" } ] },
      { key: "G", title: "Convert garage + finish walkout + new 2-car garage", note: "The tuck-under garage (~528 sf) becomes a lower-level family room under the kitchen, the ~384 sq ft walkout is finished, and a new 2-car garage restores parking. (Main and upper levels unchanged.)",
        plans: [
          { name: "Lower level — after", cols: 5, grid: [["NGA","FAM","FAM","REC","REC"],["NGA","FAM","FAM","REC","REC"],["NGA","MUD","STA","MEC","LAU"]],
            rooms: { NGA:{n:"New 2-car garage",d:"24×24",new:true}, FAM:{n:"Family room (was garage)",d:"~528 sf",new:true}, REC:{n:"Finished walkout rec/flex",d:"≈384 sf",new:true}, MUD:{n:"Mudroom + entry",d:"",new:true}, STA:{n:"Stair up",d:""}, MEC:{n:"Mechanical",d:""}, LAU:{n:"Laundry",d:""} } },
        ],
        renderings: [ { img:"plan-g-playroom.jpg", cap:"Concept: the former tuck-under garage, now a light-filled lower-level playroom (illustrative)" }, { img:"plan-g-garage-ext.jpg", cap:"Concept: a new 2-car garage matched to the colonial (illustrative)" } ] },
      { key: "H", title: "Reconfigure + expand the kitchen", note: "Everything in Option G, plus the eat-in kitchen opens into the adjacent unused formal living room to become one large kitchen + family/keeping room with an island. (Lower level as in Option G.)",
        plans: [
          { name: "Main level — after", cols: 5, grid: [["DEK","FAM","FAM","KFK","KFK"],["DEK","FAM","FAM","KFK","KFK"],["DIN","DIN","FOY","KFK","KFK"],["DIN","DIN","PWD","KFK","KFK"]],
            rooms: { DEK:{n:"Wood deck",d:"12×16"}, FAM:{n:"Family room + fireplace",d:"~14×16"}, KFK:{n:"Expanded eat-in kitchen + island (into the unused room)",d:"~13×30",new:true}, DIN:{n:"Dining",d:"~11×12"}, FOY:{n:"Foyer / stairs",d:""}, PWD:{n:"Half bath",d:"5×6"} } },
        ],
        renderings: [ { img:"plan-h-kitchen.jpg", cap:"Concept: the expanded eat-in kitchen with an island, from removing the wall to the unused room (illustrative)" }, { img:"plan-h-openflow.jpg", cap:"Concept: the open kitchen-to-family-room flow (illustrative)" } ] },
    ],
  },

  // ---- calculator defaults (the financial engine reads these) ----
  model: {
    currentValue: 575000,
    currentBalance: 239000,
    currentRate: 3.25,      // THE swing variable
    currentTermLeft: 24,    // yrs remaining on the original 30
    todayRate: 6.50,
    additionCost: 90000,    // recommended value scope (finish walkout + reclaim the unused room)
    additionRecoup: 55,     // % of spend reflected in market value (walkout + reclaim weighted)
    heRate: 8.25,
    heTerm: 15,
    newHomePrice: 650000,
    appreciation: 4.0,
    investReturn: 7.0,
    horizon: 10,
    millRate: 0.035,
    assessRatio: 0.70,
    currentTax: 9954,
    insurance: 2400,
    maintRate: 0.01,
    sellCostPct: 0.055,
    buyCostPct: 0.02,
    waitYears: 2,
    waitApprNew: 5.0,       // target home grows faster while waiting
    waitRate: 6.25,
  },
};
