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
      summary: "A focused ~$150–250K bedroom + bath addition financed by a fixed second lien that preserves the sub-4% first mortgage. Keeps the already-secured Latimer zone, dodges a bidding war, and avoids ~$47K of transaction friction — contingent on clearing survey, septic, wetlands and comp-ceiling checks.",
      pros: [
        "Preserves the pandemic-era sub-4% first mortgage — only the addition is borrowed at today's rates",
        "Keeps the Latimer Lane zone the family already has",
        "Avoids ~$47K of sunk selling + buying costs",
        "Fully hedges a #1-hottest, supply-starved market — no bidding war",
      ],
      cons: [
        "Additions recoup only ~27–53% — money spent on living, not equity",
        "Highest monthly payment; tight on DTI once childcare is counted",
        "9–15 month build, disruptive with three kids under six",
        "Over-improvement risk above the Weatogue comp ceiling",
      ],
      foot: [ { k: "10-yr cash", v: "≈ tie" }, { k: "Monthly", v: "~$4.3–5.6K" } ],
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

  // ---- calculator defaults (the financial engine reads these) ----
  model: {
    currentValue: 575000,
    currentBalance: 239000,
    currentRate: 3.25,      // THE swing variable
    currentTermLeft: 24,    // yrs remaining on the original 30
    todayRate: 6.50,
    additionCost: 200000,
    additionRecoup: 45,     // % of spend reflected in market value
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
