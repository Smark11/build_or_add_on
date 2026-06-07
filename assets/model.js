/* =========================================================================
   FINANCIAL ENGINE — pure functions. Simulates Option A / B / C month-by-month.
   Honest framing (per the 4-expert review):
     • addition end-value uses a recoup %, not full cost
     • opportunity cost: the monthly cash a cheaper option frees is invested
       at investReturn → a "side pot" added to net worth
     • transaction costs flow through loan size (paid from sale proceeds)
   ========================================================================= */

function monthlyPayment(P, ratePct, years) {
  if (P <= 0) return 0;
  const r = ratePct / 100 / 12, n = years * 12;
  if (r === 0) return P / n;
  return (P * r) / (1 - Math.pow(1 + r, -n));
}

// run an amortizing loan for `months`, return interest paid, principal paid, ending balance
function amortize(P, ratePct, termYears, months) {
  if (P <= 0) return { interest: 0, principal: 0, end: 0, payment: 0 };
  const r = ratePct / 100 / 12;
  const pay = monthlyPayment(P, ratePct, termYears);
  let bal = P, interest = 0, principal = 0;
  for (let i = 0; i < months && bal > 0.01; i++) {
    const ic = bal * r;
    let pc = pay - ic;
    if (pc > bal) pc = bal;
    interest += ic; principal += pc; bal -= pc;
  }
  return { interest, principal, end: Math.max(bal, 0), payment: pay };
}

const grow = (start, apprPct, years) => start * Math.pow(1 + apprPct / 100, years);

// future value of a monthly contribution stream
function fvMonthly(monthly, ratePct, years) {
  if (monthly <= 0) return 0;
  const r = ratePct / 100 / 12, n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r);
}

function computeOptions(m) {
  const H = m.horizon, months = H * 12;
  const tax = (mktValue) => mktValue * m.assessRatio * m.millRate;

  // ---------------- OPTION A — addition ----------------
  const addedValue = m.additionCost * (m.additionRecoup / 100);
  const startA = m.currentValue + addedValue;
  const endA = grow(startA, m.appreciation, H);
  const first = amortize(m.currentBalance, m.currentRate, m.currentTermLeft, months);
  const he = amortize(m.additionCost, m.heRate, m.heTerm, months);
  const taxA = m.currentTax + addedValue * m.assessRatio * m.millRate;
  const maintA = m.maintRate * ((startA + endA) / 2) * H;
  const monthlyA = first.payment + he.payment + taxA / 12 + m.insurance / 12;
  const cashA = first.interest + he.interest + taxA * H + m.insurance * H + maintA;
  const equityA = endA - first.end - he.end;
  const piA = first.interest + first.principal + he.interest + he.principal;
  const avgMonthlyA = (piA + taxA * H + m.insurance * H) / months;

  // ---------------- OPTION B — move now ----------------
  const freed = m.currentValue * (1 - m.sellCostPct) - m.currentBalance;
  const buyClose = m.newHomePrice * m.buyCostPct;
  const downB = Math.max(freed - buyClose, 0);
  const loanB = Math.max(m.newHomePrice - downB, 0);
  const nb = amortize(loanB, m.todayRate, 30, months);
  const taxB = tax(m.newHomePrice);
  const endB = grow(m.newHomePrice, m.appreciation, H);
  const maintB = m.maintRate * ((m.newHomePrice + endB) / 2) * H;
  const monthlyB = nb.payment + taxB / 12 + m.insurance / 12;
  const cashB = nb.interest + taxB * H + m.insurance * H + maintB;
  const equityB = endB - nb.end;
  const avgMonthlyB = (nb.interest + nb.principal + taxB * H + m.insurance * H) / months;

  // ---------------- OPTION C — wait W yrs, then move ----------------
  const W = m.waitYears, postM = (H - W) * 12;
  const carry = amortize(m.currentBalance, m.currentRate, m.currentTermLeft, W * 12);
  const curAtMove = grow(m.currentValue, m.appreciation, W);
  const newAtMove = grow(m.newHomePrice, m.waitApprNew, W);
  const freedC = curAtMove * (1 - m.sellCostPct) - carry.end;
  const buyCloseC = newAtMove * m.buyCostPct;
  const downC = Math.max(freedC - buyCloseC, 0);
  const loanC = Math.max(newAtMove - downC, 0);
  const nc = amortize(loanC, m.waitRate, 30, postM);
  const taxC = tax(newAtMove);
  const endC = grow(newAtMove, m.appreciation, H - W);
  const maintCarry = m.maintRate * m.currentValue * W;
  const maintC = m.maintRate * ((newAtMove + endC) / 2) * (H - W) + maintCarry;
  const monthlyC = nc.payment + taxC / 12 + m.insurance / 12; // stabilized post-move
  const cashC = carry.interest + m.currentTax * W + m.insurance * W + maintCarry
              + nc.interest + taxC * (H - W) + m.insurance * (H - W)
              + m.maintRate * ((newAtMove + endC) / 2) * (H - W);
  const equityC = endC - nc.end;
  const piC = carry.interest + carry.principal + nc.interest + nc.principal;
  const avgMonthlyC = (piC + m.currentTax * W + taxC * (H - W) + m.insurance * H) / months;

  // ---------------- opportunity cost (side pot) ----------------
  // the option with the highest avg monthly outlay is the baseline; cheaper
  // options invest the difference at investReturn → extra net worth.
  const base = Math.max(avgMonthlyA, avgMonthlyB, avgMonthlyC);
  const sideA = fvMonthly(base - avgMonthlyA, m.investReturn, H);
  const sideB = fvMonthly(base - avgMonthlyB, m.investReturn, H);
  const sideC = fvMonthly(base - avgMonthlyC, m.investReturn, H);

  const A = { id: "a", monthly: monthlyA, cash: cashA, equity: equityA, side: sideA, net: equityA + sideA, endValue: endA };
  const B = { id: "b", monthly: monthlyB, cash: cashB, equity: equityB, side: sideB, net: equityB + sideB, endValue: endB };
  const C = { id: "c", monthly: monthlyC, cash: cashC, equity: equityC, side: sideC, net: equityC + sideC, endValue: endC };

  const nets = [A, B, C].map(o => o.net);
  const max = Math.max(...nets), min = Math.min(...nets);
  const spreadPct = max > 0 ? ((max - min) / max) * 100 : 0;
  const leader = [A, B, C].sort((x, y) => y.net - x.net)[0];

  return { A, B, C, leader: leader.id, spreadPct, max, min };
}
