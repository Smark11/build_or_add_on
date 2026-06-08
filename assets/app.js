/* =========================================================================
   APP — render data, wire the live calculator, charts, map, scroll motion.
   ========================================================================= */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

  /* ---------- formatting ---------- */
  const moneyK = (n) => {
    n = Math.round(n);
    const s = n < 0 ? "-" : "";
    const a = Math.abs(n);
    if (a >= 1e6) return s + "$" + (a / 1e6).toFixed(a >= 1e7 ? 1 : 2).replace(/\.?0+$/, "") + "M";
    if (a >= 1e3) return s + "$" + Math.round(a / 1e3) + "K";
    return s + "$" + a;
  };
  const moneyFull = (n) => (n < 0 ? "-$" : "$") + Math.abs(Math.round(n)).toLocaleString();
  const pct = (n) => Number(n).toFixed(2).replace(/\.?0+$/, "") + "%";

  /* ===================== STATIC RENDERS ===================== */
  function renderProperty() {
    const wrap = $("#specs");
    DATA.property.specs.forEach(s => {
      wrap.appendChild(el("div", "spec", `<div class="k">${s.k}</div><div class="v">${s.v}${s.sub ? ` <small>${s.sub}</small>` : ""}</div>`));
    });
  }

  function renderSchools() {
    const wrap = $("#schoolBars");
    DATA.schools.forEach(s => {
      const row = el("div", "sbar" + (s.home ? " is-home" : ""));
      row.innerHTML = `
        <div class="sbar__name">${s.name}${s.home ? '<span class="home-flag">Your zone</span>' : ""}<small>${s.sub}</small></div>
        <div class="sbar__track"><i class="sbar__fill" data-w="${s.gs * 10}" title="Math ${s.math} · Reading ${s.read} · ${s.rank}"></i></div>
        <div class="sbar__score">${s.gs.toFixed(1)}<span style="font-size:.6em;color:var(--muted)">/10</span></div>`;
      wrap.appendChild(row);
    });
    const pl = $("#pipeline");
    DATA.pipeline.forEach(p => pl.appendChild(el("div", "pnode", `<div class="k">${p.k}</div><div class="v">${p.v}</div><div class="s">${p.s}</div>`)));
  }

  function renderOptions() {
    const wrap = $("#optCards");
    DATA.options.forEach(o => {
      const dots = Array.from({ length: 10 }, (_, i) => `<i class="${i < Math.round(o.score) ? "on" : ""}"></i>`).join("");
      const card = el("div", `opt opt--${o.cls}`);
      card.innerHTML = `
        ${o.recommended ? '<span class="opt__rec">★ Recommended</span>' : ""}
        <div class="opt__k">${o.k}</div>
        <div class="opt__title">${o.title}</div>
        <div class="opt__score"><span class="num">${o.score}</span><span class="den">/10</span><span class="scoredots">${dots}</span></div>
        <p class="opt__sum">${o.summary}</p>
        <ul class="opt__list pros">${o.pros.map(p => `<li>${p}</li>`).join("")}</ul>
        <ul class="opt__list cons">${o.cons.map(c => `<li>${c}</li>`).join("")}</ul>
        <div class="opt__foot">${o.foot.map(f => `<div><div class="k">${f.k}</div><div class="v">${f.v}</div></div>`).join("")}</div>`;
      wrap.appendChild(card);
    });
  }

  function renderExperts() {
    const wrap = $("#expCards");
    DATA.experts.forEach(e => {
      const c = el("div", "exp");
      c.innerHTML = `
        <div class="exp__head">
          <div class="exp__avatar" style="background:${e.color}">${e.initials}</div>
          <div class="exp__role">${e.role}<small>${e.sub}</small></div>
        </div>
        <p class="exp__verdict">“${e.verdict}”</p>
        <div class="exp__catch"><div class="k">${e.catchTitle}</div><p>${e.catch}</p></div>`;
      wrap.appendChild(c);
    });
    const cl = $("#corrections");
    DATA.corrections.forEach((c, i) => cl.appendChild(el("li", null, `<span class="num">${String(i + 1).padStart(2, "0")}</span><span class="ct">${c}</span>`)));
  }

  function renderListings() {
    const wrap = $("#listings");
    DATA.listings.forEach(l => {
      const c = el("div", "lcard" + (l.star ? " is-star" : ""));
      c.innerHTML = `
        ${l.star ? `<span class="lcard__star">★ ${l.star}</span>` : ""}
        <div class="lcard__top">
          <div class="lcard__price">${l.price}</div>
          <span class="lcard__zone ${l.zone ? "in" : "out"}">${l.zone ? "Latimer" : "Other zone"}</span>
        </div>
        <div class="lcard__addr">${l.addr}</div>
        <div class="lcard__specs"><span>${l.beds} bd</span><span>${l.baths} ba</span><span>${l.sqft} sqft</span><span>${l.lot}</span></div>
        ${l.status ? `<div class="lcard__status">● ${l.status}</div>` : ""}
        <div class="lcard__note">${l.note}</div>
        <a class="lcard__link" href="${l.url}" target="_blank" rel="noopener">View listing →</a>`;
      wrap.appendChild(c);
    });
  }

  function renderForecast() {
    const wrap = $("#timeline");
    DATA.forecast.forEach(f => {
      wrap.appendChild(el("div", "tl", `
        <div class="tl__h">${f.h}</div>
        <div class="tl__t">${f.t}</div>
        <div class="tl__row"><div class="k">Inventory</div><div class="v">${f.inv}</div></div>
        <div class="tl__row"><div class="k">Prices</div><div class="v">${f.price}</div></div>`));
    });
  }

  function renderAddition() {
    const A = DATA.addition;
    $("#additionIntro").textContent = A.intro;
    $("#additionCeiling").textContent = A.ceiling;
    $("#additionSoft").innerHTML = "<b>Soft costs & contingency.</b> " + A.softCosts;
    $("#additionSeptic").innerHTML = "<b>✓ On public water &amp; sewer — no septic limit.</b> " + A.septic;
    $("#additionBottom").innerHTML = "“" + A.bottomLine + "”<span class=\"by\">— Addition deep-dive · bottom line</span>";

    const rec = A.scenarios.find(s => s.rec);
    $("#additionRec").innerHTML = `
      <div>
        <div class="k">★ Recommended scope for this house</div>
        <div class="t">${rec.name}</div>
        <p>${rec.get} ${rec.note}</p>
      </div>
      <div class="price"><div class="n">${moneyK(rec.lo)}–${moneyK(rec.hi)}</div><div class="s">all-in · ${rec.time}</div></div>`;

    const wrap = $("#additionScenarios");
    A.scenarios.forEach(s => {
      const over = s.lo >= 150000;
      const card = el("div", "add-card" + (s.rec ? " is-rec" : "") + (over ? " over" : ""));
      card.innerHTML = `
        <div class="add-card__tag">${s.plan && s.plan.indexOf("Plan")===0 ? '<span class="plan-badge">'+s.plan+'</span> ' : ""}${s.rec ? "★ " : ""}${s.tag}</div>
        <div class="add-card__name">${s.name}</div>
        <div class="add-card__cost">${moneyK(s.lo)}–${moneyK(s.hi)}</div>
        <div class="add-card__get">${s.get}</div>
        <div class="add-card__meta"><span>${s.sqft}</span><span>recoup ${s.recoup}</span><span>${s.time}</span></div>
        <div class="add-card__note">${s.note}</div>`;
      wrap.appendChild(card);
    });

    const maxPct = Math.max(...A.lineItems.map(x => x.pct));
    const li = $("#additionLineItems");
    A.lineItems.forEach(x => {
      const row = el("div", "lineitem");
      row.innerHTML = `
        <div class="lineitem__top"><span class="lineitem__lab">${x.item}</span><span class="lineitem__pct">${x.pct}%</span></div>
        <div class="lineitem__track"><i class="lineitem__fill" data-w="${Math.round(x.pct / maxPct * 100)}"></i></div>
        <div class="lineitem__note">${x.note}</div>`;
      li.appendChild(row);
    });
  }

  function buildAdditionChart() {
    if (!window.Chart) return;
    const items = DATA.addition.scenarios.slice().sort((a, b) => a.lo - b.lo);
    const labels = items.map(s => (s.rec ? "★ " : "") + (s.plan && s.plan.indexOf("Plan")===0 ? s.plan.replace("Plan ","")+" · " : "") + s.name);
    const data = items.map(s => [s.lo, s.hi]);
    const colors = items.map(s => s.hi <= 150000 ? "#1F4A3D" : (s.lo >= 150000 ? "#B0461E" : "#C0842B"));
    const ceiling = {
      id: "ceil",
      afterDatasetsDraw(chart) {
        const x = chart.scales.x.getPixelForValue(150000);
        const { top, bottom } = chart.chartArea, ctx = chart.ctx;
        ctx.save(); ctx.strokeStyle = "#B0461E"; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x, bottom); ctx.stroke();
        ctx.setLineDash([]); ctx.fillStyle = "#B0461E"; ctx.font = "600 10px 'Spline Sans Mono'";
        ctx.fillText("~$150K ceiling", x + 5, top + 11); ctx.restore();
      },
    };
    new Chart($("#additionChart"), {
      type: "bar",
      data: { labels, datasets: [{ label: "Cost range", data, backgroundColor: colors, borderRadius: 5, barThickness: 17 }] },
      options: {
        indexAxis: "y", responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: "#20201B", callbacks: { label: (c) => ` ${moneyK(c.raw[0])} – ${moneyK(c.raw[1])}` } },
        },
        scales: {
          x: { min: 0, grid: { color: "#E4DCCB" }, ticks: { font: { family: "Spline Sans Mono", size: 10 }, color: "#63604F", callback: (v) => moneyK(v) } },
          y: { grid: { display: false }, ticks: { font: { family: "Spline Sans Mono", size: 10.5 }, color: "#56544A" } },
        },
      },
      plugins: [ceiling],
    });
  }

  function fpEl(plan) {
    const wrap = el("div", "fp");
    wrap.style.gridTemplateColumns = `repeat(${plan.cols},1fr)`;
    wrap.style.gridTemplateAreas = plan.grid.map(r => '"' + r.join(" ") + '"').join(" ");
    const seen = {};
    plan.grid.flat().forEach(code => {
      if (seen[code]) return; seen[code] = 1;
      const rm = plan.rooms[code]; if (!rm) return;
      const d = el("div", "fp__room" + (rm.new ? " is-new" : ""));
      d.style.gridArea = code;
      d.innerHTML = `<span class="fp__n">${rm.n}</span>${rm.d ? `<span class="fp__d">${rm.d}</span>` : ""}${rm.new ? '<span class="fp__tag">NEW</span>' : ""}`;
      wrap.appendChild(d);
    });
    return wrap;
  }
  function fpCard(plan) {
    const c = el("div", "fp-card");
    c.appendChild(el("div", "fp-card__title", plan.name));
    c.appendChild(fpEl(plan));
    return c;
  }
  function renderFloorplans() {
    const F = DATA.floorplans;
    $("#plansDisclaim").textContent = F.disclaimer;
    const ex = $("#plansExisting");
    F.existing.forEach(p => ex.appendChild(fpCard(p)));
    const wrap = $("#plansOptions");
    F.options.forEach(op => {
      const block = el("div", "optplan r");
      block.innerHTML = `<h3 class="optplan__h">${op.plan && op.plan.indexOf("Plan")===0 ? '<span class="plan-badge">'+op.plan+'</span> ' : ""}${op.title}${op.key === "REC" ? '<span class="tag pine" style="margin-left:10px;vertical-align:middle">Recommended</span>' : ""}</h3><p class="optplan__note">${op.note}</p>`;
      const body = el("div", "optplan__body");
      const plansCol = el("div", "optplan__plans");
      op.plans.forEach(p => plansCol.appendChild(fpCard(p)));
      const rendCol = el("div", "optplan__renders");
      op.renderings.forEach(r => {
        const rd = el("div", "render");
        rd.innerHTML = `<img src="images/${r.img}" alt="${r.cap}" loading="lazy" onerror="this.closest('.render').style.display='none'"><div class="render__cap">${r.cap}</div>`;
        rendCol.appendChild(rd);
      });
      body.appendChild(plansCol); body.appendChild(rendCol);
      block.appendChild(body);
      wrap.appendChild(block);
    });
  }

  function renderFinancialModels() {
    const F = DATA.financialModels; if (!F) return;
    $("#modelsIntro").textContent = F.intro;
    $("#modelsBottom").innerHTML = "\u201c" + F.bottomLine + "\u201d<span class=\"by\">\u2014 across all six models</span>";
    const w = $("#modelCards");
    F.models.forEach(m => {
      const c = el("div", "model-card");
      c.innerHTML = `
        <div class="model-card__top"><div class="model-card__n">${m.n}</div><span class="model-card__favors">Favors: ${m.favors}</span></div>
        <div class="model-card__row"><span class="mk">How it works</span><span class="mv">${m.how}</span></div>
        <div class="model-card__row"><span class="mk">The numbers</span><span class="mv">${m.num}</span></div>
        <div class="model-card__row"><span class="mk">What it says</span><span class="mv">${m.says}</span></div>
        <div class="model-card__caveat">Caveat — ${m.caveat}</div>`;
      w.appendChild(c);
    });
  }

  function renderStress() {
    const S = DATA.stress; if (!S) return;
    $("#stressIntro").textContent = S.intro;
    $("#stressVerdict").innerHTML = `<div class="k">Does the recommendation hold?</div><p>${S.verdict}</p>`;
    const w = $("#stressList");
    S.assumptions.forEach(x => {
      const ok = /verif/i.test(x.status);
      const it = el("div", "stress-item");
      it.innerHTML = `
        <div class="stress-item__head"><span class="stress-a">${x.a}</span><span class="stress-badge ${ok ? "ok" : "warn"}">${x.status}</span></div>
        <div class="stress-meta">Load-bearing: <b>${x.load}</b></div>
        <p class="stress-ch">${x.challenge}</p>
        <p class="stress-flip"><b>Flips if:</b> ${x.flip}</p>`;
      w.appendChild(it);
    });
    const v = $("#stressVuln");
    S.vulnerabilities.forEach(t => v.appendChild(el("li", null, t)));
  }

  function renderVerdictExtras() {
    const checklist = [
      ["Decide: playroom or bedrooms?", "the make-or-break question — a walkout finish solves a playroom need, but if they want real bedrooms/a primary suite, buying likely wins"],
      ["Pull the actual loan statement", "rate, balance & term — the entire ranking hinges on whether the rate is truly sub-4%"],
      ["Get a survey / plot plan", "the 40-ft R-40 side-yard setback means a rear addition is the only by-right path"],
      ["Confirm the public-sewer hookup", "verified on public water + sewer — confirm the lateral connection & usage fee with Simsbury WPCA"],
      ["Inland Wetlands check", "Farmington River floodplain proximity can independently block a rear addition"],
      ["Get 2–3 fixed-price bids", "not cost-plus — and carry 20% contingency on a 1992 home"],
      ["Pull recent Latimer-pocket comps", "set a hard scope ceiling so you don't over-improve the street"],
      ["Price the basement finish first", "~$50–90K at ~63% recoup may solve the space need at a fraction of the cost"],
    ];
    const cl = $("#checklist");
    checklist.forEach(([t, d]) => cl.appendChild(el("li", null, `<span class="box">✓</span><span class="tx"><b>${t}</b> — ${d}</span>`)));

    const flips = [
      "The loan statement shows the current rate is <b>not</b> sub-4% — move now (B) wins.",
      "The home won't appraise high enough to keep the second lien under ~85% CLTV.",
      "A survey or wetlands review makes a rear addition infeasible or far costlier.",
      "Recent comps top out below the post-addition value — building over-improves the street.",
      "The family\u2019s real need is bedrooms or a primary suite, not a playroom \u2014 then buying the larger home wins.",
      "A space-solving scope forces a rate-resetting renovation loan (CLTV) \u2014 staying loses its edge.",
      "The family weights turnkey space and liquidity over preserving the low rate.",
      "Addition bids come back high (~$400K+) while a great in-zone home is available.",
    ];
    const fl = $("#flips");
    flips.forEach(f => fl.appendChild(el("div", "flip", f)));
  }

  function renderMethodology() {
    const a = $("#assumptions");
    DATA.assumptions.forEach(x => a.appendChild(el("li", null, `<span class="k">${x.k}</span><span class="v">${x.v}</span>`)));
    // full references + footnote-key map
    const wrap = $("#references");
    window.__refmap = {};
    if (wrap && DATA.references) {
      let n = 0;
      DATA.references.forEach(r => {
        n++;
        if (r.key) window.__refmap[r.key] = n;
        const it = el("div", "ref-item"); it.id = "ref-" + n;
        it.innerHTML = `<span class="ref-n">${n}.</span><span class="ref-body"><a href="${r.u}" target="_blank" rel="noopener">${r.t}</a><span class="ref-tag">${r.cat}</span></span>`;
        wrap.appendChild(it);
      });
      const rc = $("#refCount"); if (rc) rc.textContent = n + " sources";
    }
    // resolve footnote citations into superscript links
    document.querySelectorAll("[data-cite]").forEach(c => {
      const nums = c.getAttribute("data-cite").split(",").map(k => window.__refmap[k.trim()]).filter(Boolean);
      if (!nums.length) { c.style.display = "none"; return; }
      c.innerHTML = nums.map(nn => `<a href="#ref-${nn}">${nn}</a>`).join(",");
    });
  }

  /* ===================== CALCULATOR ===================== */
  const CONTROLS = [
    { key: "currentRate", label: "Your current mortgage rate", sub: "★ the swing variable", min: 2.5, max: 7.5, step: 0.05, fmt: "pct" },
    { key: "currentBalance", label: "Mortgage balance remaining", min: 100000, max: 500000, step: 5000, fmt: "money" },
    { key: "additionCost", label: "Addition cost — Option A", min: 100000, max: 500000, step: 10000, fmt: "money" },
    { key: "additionRecoup", label: "Addition resale recoup", sub: "% of spend added to value", min: 20, max: 80, step: 5, fmt: "pctRaw" },
    { key: "newHomePrice", label: "New home price — Option B", min: 500000, max: 900000, step: 10000, fmt: "money" },
    { key: "todayRate", label: "Today's 30-yr mortgage rate", min: 5, max: 8, step: 0.05, fmt: "pct" },
    { key: "heRate", label: "Home-equity loan rate", min: 6, max: 10, step: 0.05, fmt: "pct" },
    { key: "appreciation", label: "Home appreciation / yr", min: 0, max: 8, step: 0.5, fmt: "pct" },
    { key: "investReturn", label: "Investment return / yr", sub: "opportunity cost of cash flow", min: 3, max: 10, step: 0.5, fmt: "pct" },
  ];
  const fmtVal = (v, f) => f === "money" ? moneyK(v) : f === "pctRaw" ? Math.round(v) + "%" : pct(v);
  const state = Object.assign({}, DATA.model);

  function buildControls() {
    const wrap = $("#controls");
    CONTROLS.forEach(c => {
      const row = el("div", "ctrl");
      row.innerHTML = `
        <div class="ctrl__top">
          <div class="ctrl__lab">${c.label}${c.sub ? `<small>${c.sub}</small>` : ""}</div>
          <div class="ctrl__val" id="val-${c.key}">${fmtVal(state[c.key], c.fmt)}</div>
        </div>
        <input type="range" id="in-${c.key}" min="${c.min}" max="${c.max}" step="${c.step}" value="${state[c.key]}" aria-label="${c.label}" aria-valuetext="${fmtVal(state[c.key], c.fmt)}">`;
      wrap.appendChild(row);
      $(`#in-${c.key}`, row).addEventListener("input", (e) => {
        state[c.key] = parseFloat(e.target.value);
        const t = fmtVal(state[c.key], c.fmt);
        $(`#val-${c.key}`).textContent = t;
        e.target.setAttribute("aria-valuetext", t);
        recompute();
      });
    });
    $("#resetBtn").addEventListener("click", () => {
      Object.assign(state, DATA.model);
      CONTROLS.forEach(c => { const t = fmtVal(state[c.key], c.fmt); const inp = $(`#in-${c.key}`); inp.value = state[c.key]; inp.setAttribute("aria-valuetext", t); $(`#val-${c.key}`).textContent = t; });
      recompute();
    });
  }

  const OPT_COLOR = { a: "#1F4A3D", b: "#B0461E", c: "#5C6B71" };
  const OPT_NAME = { a: "Stay & Add (A)", b: "Move Now (B)", c: "Wait (C)" };
  let netChart;

  function renderCalcCards(r) {
    const wrap = $("#calcCards");
    wrap.innerHTML = "";
    [["a", r.A], ["b", r.B], ["c", r.C]].forEach(([id, o]) => {
      const card = el("div", `ccard ccard--${id}`);
      card.innerHTML = `
        <h4>${OPT_NAME[id]}</h4>
        <div class="crow"><span class="l">Net worth @10yr</span><span class="n big">${moneyK(o.net)}</span></div>
        <div class="crow"><span class="l">Stabilized monthly</span><span class="n">${moneyFull(o.monthly)}</span></div>
        <div class="crow"><span class="l">10-yr cash cost</span><span class="n">${moneyK(o.cash)}</span></div>
        <div class="crow"><span class="l">Home equity @10yr</span><span class="n">${moneyK(o.equity)}</span></div>`;
      wrap.appendChild(card);
    });
  }

  function recompute() {
    const r = computeOptions(state);
    // The recommendation is consistent across the whole site: Stay & Add while a low
    // first-mortgage rate is held; it flips to Move only when that advantage is gone
    // (the site's core thesis). The dollar spread is context, never the verdict.
    const bar = $("#verdictBar");
    const lockedIn = state.currentRate < 4.25;
    const close = r.spreadPct < 10;
    const penaltyPerYr = Math.max(0, (state.todayRate - state.currentRate) / 100 * state.currentBalance);
    if (lockedIn) {
      bar.style.background = OPT_COLOR.a;
      $("#verdictText").textContent = "Stay & Add";
      $("#verdictNote").innerHTML = close
        ? `The 10-year dollars are about even (within <b>${r.spreadPct.toFixed(1)}%</b>) — so the tiebreakers decide, and at your ${pct(state.currentRate)} rate they favor staying: you keep the Latimer zone and a mortgage worth ~<b>${moneyFull(penaltyPerYr)}/yr</b> vs today's ${pct(state.todayRate)}.`
        : `Staying leads by <b>${moneyK(r.max - r.min)}</b> over 10 years <i>and</i> keeps the zone and your low ${pct(state.currentRate)} rate.`;
    } else {
      bar.style.background = OPT_COLOR.b;
      $("#verdictText").textContent = "Move Now";
      $("#verdictNote").innerHTML = `At ${pct(state.currentRate)} there's no low rate left to protect — the main reason to stay is gone, so buying a larger <i>in-zone</i> home (still Latimer) is the better call. ${close ? `The 10-year dollars stay close (within ${r.spreadPct.toFixed(1)}%), so it comes down to turnkey space vs. a build.` : `It also leads by <b>${moneyK(r.max - r.min)}</b> on the numbers.`}`;
    }
    renderCalcCards(r);
    // assumption note
    $("#assumeNote").innerHTML = state.currentRate < 4
      ? `<b>Lock-in active:</b> at ${pct(state.currentRate)}, keeping the first mortgage (Option A) is worth roughly <b>${moneyFull((state.todayRate - state.currentRate) / 100 * state.currentBalance)}/yr</b> vs re-borrowing at today's ${pct(state.todayRate)}. That's the engine behind staying.`
      : `<b>No lock-in benefit:</b> at ${pct(state.currentRate)} the current rate isn't low, so staying loses its advantage — and moving (B) becomes more attractive. This is exactly why verifying the real rate is the #1 step.`;
    updateNetChart(r);
  }

  function updateNetChart(r) {
    const labels = ["Stay & Add", "Move Now", "Wait"];
    const equity = [r.A.equity, r.B.equity, r.C.equity];
    const side = [r.A.side, r.B.side, r.C.side];
    if (!window.Chart) return;
    if (netChart) {
      netChart.data.datasets[0].data = equity;
      netChart.data.datasets[1].data = side;
      netChart.update();
      return;
    }
    netChart = new Chart($("#netChart"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Home equity", data: equity, backgroundColor: ["#1F4A3D", "#B0461E", "#5C6B71"], borderRadius: 6, stack: "s" },
          { label: "Invested cash-flow difference", data: side, backgroundColor: ["#5b8a78", "#d18a66", "#9aa6aa"], borderRadius: 6, stack: "s" },
        ],
      },
      options: chartOpts({ stacked: true, money: true }),
    });
  }

  /* ===================== STATIC CHARTS ===================== */
  function chartOpts({ stacked = false, money = false } = {}) {
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { family: "Spline Sans Mono", size: 10 }, color: "#56544A", boxWidth: 12, padding: 14 } },
        tooltip: {
          backgroundColor: "#20201B", titleFont: { family: "Hanken Grotesk" }, bodyFont: { family: "Spline Sans Mono" },
          callbacks: money ? { label: (c) => ` ${c.dataset.label}: ${moneyK(c.parsed.y)}` } : undefined,
        },
      },
      scales: {
        x: { stacked, grid: { display: false }, ticks: { font: { family: "Spline Sans Mono", size: 11 }, color: "#807C6C" } },
        y: { stacked, grid: { color: "#E4DCCB" }, ticks: { font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C", callback: money ? (v) => moneyK(v) : undefined } },
      },
    };
  }

  function buildRateChart() {
    if (!window.Chart) return;
    const s = DATA.rateScenarios;
    const mk = (label, data, color, dash) => ({ label, data, borderColor: color, backgroundColor: color, tension: .35, borderWidth: 2.5, borderDash: dash || [], pointRadius: 3, pointHoverRadius: 5 });
    new Chart($("#rateChart"), {
      type: "line",
      data: { labels: s.labels, datasets: [
        mk("Optimistic (rates fall)", s.optimistic, "#1F4A3D"),
        mk("Base case (consensus)", s.base, "#20201B", [6, 4]),
        mk("Pessimistic (rates rise)", s.pessimistic, "#B0461E"),
      ] },
      options: Object.assign(chartOpts(), {
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: "Spline Sans Mono", size: 11 }, color: "#807C6C" } },
          y: { grid: { color: "#E4DCCB" }, ticks: { font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C", callback: (v) => v + "%" }, suggestedMin: 5, suggestedMax: 7.5 },
        },
      }),
    });
  }

  function parsePrice(str) {
    const k = /K/i.test(str), m = /M/i.test(str);
    const nums = (str.match(/[\d,.]+/g) || []).map(x => parseFloat(x.replace(/,/g, ""))).filter(n => !isNaN(n));
    if (!nums.length) return null;
    let v = nums.reduce((a, b) => a + b, 0) / nums.length;
    if (m) v *= 1e6; else if (k || v < 10000) v *= 1000;
    return v;
  }
  function buildScatter() {
    if (!window.Chart) return;
    const pts = (zone) => DATA.listings.filter(l => l.zone === zone).map(l => {
      const p = parsePrice(l.price), s = parseFloat(String(l.sqft).replace(/,/g, ""));
      return p && s ? { x: s, y: p, addr: l.addr } : null;
    }).filter(Boolean);
    new Chart($("#scatterChart"), {
      type: "scatter",
      data: { datasets: [
        { label: "In Latimer zone", data: pts(true), backgroundColor: "#1F4A3D", pointRadius: 7, pointHoverRadius: 9 },
        { label: "Other zone", data: pts(false), backgroundColor: "#9aa6aa", pointRadius: 7, pointHoverRadius: 9 },
        { label: "2 Clover Lane (today)", data: [{ x: 1976, y: 575000, addr: "2 Clover Lane" }], backgroundColor: "#C0842B", pointStyle: "rectRot", pointRadius: 11, pointHoverRadius: 13 },
        { label: "After a ~$200K addition", data: [{ x: 2676, y: 665000, addr: "2 Clover Lane + addition" }], backgroundColor: "#C0842B", pointStyle: "star", pointRadius: 12, pointHoverRadius: 14 },
      ] },
      options: Object.assign(chartOpts(), {
        plugins: {
          legend: { labels: { font: { family: "Spline Sans Mono", size: 10 }, color: "#56544A", boxWidth: 12, padding: 12, usePointStyle: true } },
          tooltip: { backgroundColor: "#20201B", callbacks: { label: (c) => ` ${c.raw.addr}: ${moneyK(c.parsed.y)} · ${c.parsed.x.toLocaleString()} sqft` } },
        },
        scales: {
          x: { title: { display: true, text: "Square feet", font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C" }, grid: { color: "#E4DCCB" }, ticks: { font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C", callback: (v) => (v / 1000) + "k" } },
          y: { title: { display: true, text: "Price", font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C" }, grid: { color: "#E4DCCB" }, ticks: { font: { family: "Spline Sans Mono", size: 10 }, color: "#807C6C", callback: (v) => moneyK(v) } },
        },
      }),
    });
  }

  /* ===================== MAP ===================== */
  function buildMap() {
    if (!window.L) return;
    const map = L.map("map", { scrollWheelZoom: false }).setView([41.852, -72.822], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19,
    }).addTo(map);

    const dot = (color, r = 9, weight = 2) => ({ radius: r, fillColor: color, color: "#fff", weight, opacity: 1, fillOpacity: 1 });

    // current home
    L.circleMarker([DATA.property.lat, DATA.property.lng], dot("#C0842B", 12, 3)).addTo(map)
      .bindPopup(`<div class="pop"><div class="pop__price">2 Clover Lane</div><div class="pop__addr">The current home · already in the Latimer zone</div><span class="pop__zone in">Latimer Lane zone</span></div>`);
    // school
    const sm = DATA.school_marker;
    L.circleMarker([sm.lat, sm.lng], dot("#3b3b34", 10, 3)).addTo(map)
      .bindPopup(`<div class="pop"><div class="pop__price" style="font-size:1.05rem">${sm.addr}</div><div class="pop__addr">${sm.sub}</div></div>`);
    // listings
    DATA.listings.forEach(l => {
      const color = l.zone ? "#1F4A3D" : "#5C6B71";
      L.circleMarker([l.lat, l.lng], dot(color, l.star ? 11 : 8)).addTo(map)
        .bindPopup(`<div class="pop">
          <div class="pop__price">${l.price}</div>
          <div class="pop__addr">${l.addr}</div>
          <div class="pop__specs"><span>${l.beds} bd</span><span>${l.baths} ba</span><span>${l.sqft} sqft</span><span>${l.lot}</span></div>
          <span class="pop__zone ${l.zone ? "in" : "out"}">${l.zone ? "Latimer Lane zone" : "Other Simsbury zone"}</span><br>
          <a class="pop__link" href="${l.url}" target="_blank" rel="noopener">View listing →</a>
        </div>`);
    });
    map.on("click", () => map.scrollWheelZoom.enable());
  }

  /* ===================== MOTION ===================== */
  function motion() {
    const prog = $("#progress"), nav = $("#nav");
    const onScroll = () => {
      const h = document.documentElement;
      const sc = h.scrollTop / (h.scrollHeight - h.clientHeight);
      prog.style.width = (sc * 100) + "%";
      nav.classList.toggle("scrolled", h.scrollTop > 40);
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // escape hatch: reveal everything if IO unsupported, printing, or ?reveal (QA)
    const forceReveal = !("IntersectionObserver" in window) || location.search.indexOf("reveal") > -1 || window.matchMedia("print").matches;
    if (forceReveal) {
      document.querySelectorAll(".r").forEach(n => n.classList.add("in"));
      document.querySelectorAll(".sbar__fill, .lineitem__fill").forEach(f => { f.style.width = f.dataset.w + "%"; });
      if (location.search.indexOf("reveal") > -1) { const h = document.querySelector(".hero"); if (h) h.style.minHeight = "760px"; }
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          e.target.querySelectorAll?.(".sbar__fill, .lineitem__fill").forEach(f => { f.style.width = f.dataset.w + "%"; });
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".r").forEach(n => io.observe(n));
    // also observe the schools container for the bar animation
    const sb = $("#schoolBars"); if (sb) io.observe(sb);
  }

  /* ===================== INIT ===================== */
  document.addEventListener("DOMContentLoaded", () => {
    renderProperty(); renderSchools(); renderOptions(); renderAddition(); renderFloorplans(); renderFinancialModels(); renderStress(); renderExperts();
    renderListings(); renderForecast(); renderVerdictExtras(); renderMethodology();
    buildControls(); recompute();
    buildRateChart(); buildScatter(); buildAdditionChart(); buildMap();
    motion();
  });
})();
