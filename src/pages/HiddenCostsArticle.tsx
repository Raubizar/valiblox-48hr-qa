import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertTriangle, DollarSign, Clock, Wrench, TrendingDown, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hiddenCostsImage from "@/assets/articles/hidden-costs-design-errors.jpg";

const toCurrency = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(isFinite(n) ? n : 0);

const pct = (n) => `${(Number(n) || 0).toFixed(2)}%`;

const HiddenCostsArticle = () => {
  const navigate = useNavigate();

  // ROI calculator state (with sensible defaults from the article sources)
  const [currency, setCurrency] = useState("USD");
  const [projectValue, setProjectValue] = useState(100_000_000);           // $100M
  const [projectDays, setProjectDays] = useState(730);                     // ~2 years
  const [directReworkPct, setDirectReworkPct] = useState(5.04);            // Navigant median direct rework %
  const [indirectFactor, setIndirectFactor] = useState(0.8);               // Indirect ≈ 80% of direct (Navigant)
  const [reworkShareOfDelayPct, setReworkShareOfDelayPct] = useState(52);  // 52% of delay due to rework (Navigant)
  const [avgDelayFromReworkPct, setAvgDelayFromReworkPct] = useState(9.82);// 9.82% schedule growth due to rework (Navigant)
  const [dailyOverhead, setDailyOverhead] = useState(15000);               // Navigant example
  const [dailyLD, setDailyLD] = useState(12750);                           // Navigant example
  const [qaPct, setQaPct] = useState(2.0);                                  // Invest 2% in QA
  const [extraSavingsPctFromQA, setExtraSavingsPctFromQA] = useState(50);   // QA prevents % of rework/delay impact

  const calc = useMemo(() => {
    const V = Number(projectValue) || 0;
    const D = Number(projectDays) || 0;

    const directPct = Number(directReworkPct) / 100;
    const indirect = Number(indirectFactor); // 0.8 of direct
    const totalReworkPct = directPct * (1 + indirect); // e.g., 5.04% * 1.8 = 9.07%

    const reworkCost = V * totalReworkPct;

    const scheduleGrowthFromReworkPct = Number(avgDelayFromReworkPct) / 100; // 0.0982
    const delayDays = D * scheduleGrowthFromReworkPct;

    const perDay = (Number(dailyOverhead) || 0) + (Number(dailyLD) || 0);
    const delayCost = delayDays * perDay;

    const baselineImpact = reworkCost + delayCost;

    // QA scenario
    const qaCost = V * (Number(qaPct) / 100);
    const prevented = baselineImpact * (Number(extraSavingsPctFromQA) / 100);
    const residualImpact = baselineImpact - prevented;
    const qaScenarioTotal = qaCost + residualImpact;

    const netBenefit = baselineImpact - qaScenarioTotal;
    const roi = qaCost > 0 ? (netBenefit / qaCost) * 100 : 0;

    return {
      totalReworkPct: totalReworkPct * 100,
      reworkCost,
      delayDays,
      perDay,
      delayCost,
      baselineImpact,
      qaCost,
      prevented,
      residualImpact,
      qaScenarioTotal,
      netBenefit,
      roi,
    };
  }, [
    projectValue,
    projectDays,
    directReworkPct,
    indirectFactor,
    avgDelayFromReworkPct,
    dailyOverhead,
    dailyLD,
    qaPct,
    extraSavingsPctFromQA,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        <article className="space-y-8">
          <header className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Stop Leaving Money on the Table: The Hidden Cost of Poor Design Quality in Data Center Projects
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By Valiblox Team</span>
              <span>•</span>
              <span>January 15, 2024</span>
              <span>•</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">Industry Insights</span>
            </div>
          </header>

          <img
            src={hiddenCostsImage}
            alt="Data center with highlighted design error costs"
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Directors and project managers often control the visible costs—then lose millions to invisible ones:
              <strong> low-quality or incomplete design information</strong>. Missing inputs and unchecked assumptions
              trigger rework, delays, and awkward client calls. (Like spilling coffee… except the mug costs seven figures.)
            </p>

            {/* Reality check */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="text-xl font-semibold">Reality Check</h3>
                </div>
                <ul className="text-muted-foreground list-disc pl-5 space-y-2">
                  <li>
                    <strong>Rework = 7.25%–10.89% of total cost (incl. indirects)</strong> on typical projects, with ~9.82% average schedule growth due to rework.
                    Source: Navigant Construction Forum, <em>The Impact of Rework on Construction</em> (2012).{" "}
                    <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                      Full PDF
                    </a>
                  </li>
                  <li>
                    <strong>52% of rework is caused by poor data and miscommunication</strong> (globally). US rework = 5% of spend, with{" "}
                    <strong>$31.3B/year</strong> of that directly from bad data/communication. PlanGrid/FMI, <em>Construction Disconnected</em> (2018).{" "}
                    <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">
                      Full PDF
                    </a>
                  </li>
                  <li>
                    <strong>Delays kill returns:</strong> each month of delay can cost ~<strong>$14.2M</strong> (lost revenue, overruns, penalties) and a 3‑month delay can drop IRR from 17.1% → 12.6%.
                    STL Partners (2025).{" "}
                    <a href="https://stlpartners.com/research/preventing-multimillion-dollar-data-centre-losses-through-reporting/" target="_blank" rel="noopener noreferrer">
                      Article
                    </a>
                  </li>
                  <li>
                    <strong>9 in 10 data center projects are delayed; average delay ~34% of plan,</strong> risking tenant churn and SLA penalties. Atif Ansar (Foresight) interview, Fierce Network (2025).{" "}
                    <a href="https://www.fierce-network.com/cloud/optimism-could-kill-data-center-boom" target="_blank" rel="noopener noreferrer">
                      Article
                    </a>
                  </li>
                  <li>
                    <strong>Design-induced rework can exceed 70% of total rework.</strong> Get It Right Initiative literature review (2015) citing Love et al.{" "}
                    <a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">
                      Full PDF
                    </a>
                  </li>
                  <li>
                    <strong>Early-phase missteps are the root cause</strong> of many failures and overruns—solve them with rigorous design reviews & commissioning. Uptime Institute (2015).{" "}
                    <a href="https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/" target="_blank" rel="noopener noreferrer">
                      Article
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Why errors get expensive */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Why Design Errors Get So Expensive (Fast)
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Compounding Delays</h3>
                    <p className="text-sm text-muted-foreground">
                      Navigant’s benchmark hypothetical uses <strong>$15,000/day</strong> extended overhead and <strong>$12,750/day</strong> LDs.
                      Small slips → big daily burn.{" "}
                      <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Bad Info → Bad Work</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>52%</strong> of rework is bad data/communication. That’s not “field chaos”—that’s <em>preventable</em> information quality.{" "}
                      <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Design Drives Rework</h3>
                    <p className="text-sm text-muted-foreground">
                      Literature shows design‑induced rework can be the majority share (often &gt;70%).{" "}
                      <a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Worked example with clear math */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Worked Example: How the Maths Adds Up
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">
                    Assume a <strong>$100M</strong> data center project (~730 days). We’ll use Navigant’s evidence‑based factors.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>Direct rework cost:</strong> <strong>5.04%</strong> of project value → <strong>$5.04M</strong>.{" "}
                      <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </li>
                    <li>
                      <strong>Total rework (incl. indirects):</strong> indirect ≈ <strong>80%</strong> of direct ⇒ <strong>1.8 × 5.04% = 9.07%</strong> → <strong>$9.07M</strong>.{" "}
                      <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </li>
                    <li>
                      <strong>Schedule growth from rework:</strong> ≈ <strong>9.82%</strong> of planned duration → <strong>~72 days</strong>.{" "}
                      <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </li>
                    <li>
                      <strong>Delay dollars:</strong> (Overhead + LDs) × days = (15,000 + 12,750) × 72 = <strong>$1,998,000</strong>.{" "}
                      <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                        Source
                      </a>
                    </li>
                  </ol>
                  <p className="font-semibold">
                    <span className="text-foreground">Illustrative total impact: </span>
                    <span className="text-destructive">~$9.07M (rework) + $1.998M (delay) ≈ $11.07M</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    STL Partners estimates ~<strong>$14.2M/month</strong> of additional losses for a typical 60MW facility, which can further depress IRR.{" "}
                    <a href="https://stlpartners.com/research/preventing-multimillion-dollar-data-centre-losses-through-reporting/" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* ROI Calculator */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                ROI Calculator: Design QA vs. Do-Nothing
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <Label>Currency (ISO code)</Label>
                        <Input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} placeholder="USD" />
                      </div>
                      <div>
                        <Label>Project Value</Label>
                        <Input type="number" value={projectValue} onChange={(e) => setProjectValue(Number(e.target.value))} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Planned Duration (days)</Label>
                          <Input type="number" value={projectDays} onChange={(e) => setProjectDays(Number(e.target.value))} />
                        </div>
                        <div>
                          <Label>QA Investment (% of value)</Label>
                          <Input type="number" step="0.1" value={qaPct} onChange={(e) => setQaPct(Number(e.target.value))} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Direct Rework % (Navigant median)</Label>
                          <Input type="number" step="0.01" value={directReworkPct} onChange={(e) => setDirectReworkPct(Number(e.target.value))} />
                        </div>
                        <div>
                          <Label>Indirect Factor (× direct)</Label>
                          <Input type="number" step="0.05" value={indirectFactor} onChange={(e) => setIndirectFactor(Number(e.target.value))} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Delay from Rework (% of duration)</Label>
                          <Input type="number" step="0.01" value={avgDelayFromReworkPct} onChange={(e) => setAvgDelayFromReworkPct(Number(e.target.value))} />
                        </div>
                        <div>
                          <Label>Rework Share of Delay (%)</Label>
                          <Input type="number" step="1" value={reworkShareOfDelayPct} onChange={(e) => setReworkShareOfDelayPct(Number(e.target.value))} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Daily Overhead</Label>
                          <Input type="number" value={dailyOverhead} onChange={(e) => setDailyOverhead(Number(e.target.value))} />
                        </div>
                        <div>
                          <Label>Daily LDs / Penalties</Label>
                          <Input type="number" value={dailyLD} onChange={(e) => setDailyLD(Number(e.target.value))} />
                        </div>
                      </div>

                      <div>
                        <Label>QA Prevents This % of Impact</Label>
                        <Input type="number" step="1" value={extraSavingsPctFromQA} onChange={(e) => setExtraSavingsPctFromQA(Number(e.target.value))} />
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold mb-2">Baseline (No Extra QA)</h4>
                        <p className="text-sm text-muted-foreground">
                          Total Rework (incl. indirects): <strong>{pct(calc.totalReworkPct)}</strong>
                        </p>
                        <p>Rework Cost: <strong>{toCurrency(calc.reworkCost, currency)}</strong></p>
                        <p>Delay Days (from rework): <strong>{Math.round(calc.delayDays)}</strong></p>
                        <p>Delay Cost (@ {toCurrency(calc.perDay, currency)}/day): <strong>{toCurrency(calc.delayCost, currency)}</strong></p>
                        <p className="mt-2">Total Baseline Impact: <strong className="text-destructive">{toCurrency(calc.baselineImpact, currency)}</strong></p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold mb-2">With QA</h4>
                        <p>QA Cost: <strong>{toCurrency(calc.qaCost, currency)}</strong></p>
                        <p>Impact Prevented: <strong>{toCurrency(calc.prevented, currency)}</strong></p>
                        <p>Residual Impact: <strong>{toCurrency(calc.residualImpact, currency)}</strong></p>
                        <p className="mt-2">Total with QA (QA + Residual): <strong className="text-foreground">{toCurrency(calc.qaScenarioTotal, currency)}</strong></p>
                      </div>

                      <div className="rounded-lg border p-4 bg-primary/5">
                        <h4 className="font-semibold mb-2">Net Benefit</h4>
                        <p>Savings vs. Baseline: <strong>{toCurrency(calc.netBenefit, currency)}</strong></p>
                        <p>ROI on QA Investment: <strong>{pct(calc.roi)}</strong></p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">
                    Defaults reflect Navigant (2012) findings: median direct rework ≈ 5.04% of project value; indirect ≈ 80% of direct; schedule growth due to rework ≈ 9.82%;
                    example daily costs: $15k overhead + $12.75k LDs. Adjust to your project reality.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Prevention vs correction */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-primary" />
                Prevention vs. Correction (a.k.a. Pay a Little Now or a Lot Later)
              </h2>
              <p className="text-muted-foreground">
                The biggest rework drivers are information quality and design omissions. Fixing them on paper is cheap; fixing them on site is not. PlanGrid/FMI found pros spend{" "}
                <strong>~35% of their time</strong> (≈ <strong>14 hours/week</strong>) on non‑optimal work like searching, conflict resolution, and rework—pure waste that better design QA reduces.{" "}
                <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">
                  Source
                </a>
              </p>
              <ul className="list-disc pl-5">
                <li><strong>Independent design QA/peer reviews</strong> against client requirements.</li>
                <li><strong>Constructability & BIM clash coordination</strong> before procurement.</li>
                <li><strong>Tier/commissioning readiness reviews</strong> aligned to reliability goals (Uptime Institute guidance).{" "}
                  <a href="https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/" target="_blank" rel="noopener noreferrer">Source</a>
                </li>
                <li><strong>Data discipline</strong>: single source of truth; enforce file naming & submittal quality.</li>
              </ul>
            </section>

            {/* Reputation impact */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-primary" />
                The Reputation Tax
              </h2>
              <p className="text-muted-foreground">
                In this market, schedule is king. As Foresight’s Atif Ansar puts it, <em>“a three‑month delay can basically wipe out your NPV”</em>, and tenants can walk.{" "}
                <a href="https://www.fierce-network.com/cloud/optimism-could-kill-data-center-boom" target="_blank" rel="noopener noreferrer">Source</a>. 
                Design QA isn’t red tape—it’s the seatbelt that keeps your ROI (and client trust) intact.
              </p>
            </section>

            {/* Summary table (as requested) */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Summary Table</h2>
              <Card>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-muted/40">
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Key Point</th>
                        <th className="text-left py-3 px-4 font-semibold">Figure / Calculation</th>
                        <th className="text-left py-3 px-4 font-semibold">Source (link)</th>
                        <th className="text-left py-3 px-4 font-semibold">What it Means</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Total rework (incl. indirects)</td>
                        <td className="py-3 px-4">7.25%–10.89% of project cost; schedule +9.82%</td>
                        <td className="py-3 px-4">
                          <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">Navigant PDF</a>
                        </td>
                        <td className="py-3 px-4">Budget and programme take a predictable hit if QA is weak.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Bad data & comms → rework</td>
                        <td className="py-3 px-4">52% of global rework; US: $31.3B/year</td>
                        <td className="py-3 px-4">
                          <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">PlanGrid/FMI PDF</a>
                        </td>
                        <td className="py-3 px-4">Information quality is a controllable lever.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Design-induced share of rework</td>
                        <td className="py-3 px-4">Often &gt;70% of total rework</td>
                        <td className="py-3 px-4">
                          <a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">GIRI Review</a>
                        </td>
                        <td className="py-3 px-4">Focus QA where it matters: design & coordination.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Delay impact on returns</td>
                        <td className="py-3 px-4">$14.2M/month; IRR 17.1% → 12.6% (3 months)</td>
                        <td className="py-3 px-4">
                          <a href="https://stlpartners.com/research/preventing-multimillion-dollar-data-centre-losses-through-reporting/" target="_blank" rel="noopener noreferrer">STL Partners</a>
                        </td>
                        <td className="py-3 px-4">Schedule slip quickly erodes ROI/NPV.</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Industry delay prevalence</td>
                        <td className="py-3 px-4">~90% delayed; ~34% avg overrun</td>
                        <td className="py-3 px-4">
                          <a href="https://www.fierce-network.com/cloud/optimism-could-kill-data-center-boom" target="_blank" rel="noopener noreferrer">Fierce Network</a>
                        </td>
                        <td className="py-3 px-4">Being “on time” is the exception—QA helps you be the exception.</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Bottom Line</h2>
              <p className="text-muted-foreground mb-4">
                Skipping design QA is a false economy. Measure twice in design so you only build once on site.
                If you like profits (and happy tenants), make quality checks non‑negotiable.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => navigate("/pricing")} className="bg-primary hover:bg-primary/90">
                  View QA Services
                </Button>
                <Button variant="outline" onClick={() => navigate("/articles")}>
                  Read More Articles
                </Button>
              </div>
            </section>

            {/* Full sources list */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Sources</h2>
              <ul className="text-sm space-y-2">
                <li>
                  Navigant Construction Forum (2012), <em>The Impact of Rework on Construction &amp; Some Practical Remedies</em>.{" "}
                  <a href="https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf" target="_blank" rel="noopener noreferrer">
                    https://www.cmaanet.org/sites/default/files/resource/Impact%20of%20Rework%20on%20Construction.pdf
                  </a>
                </li>
                <li>
                  PlanGrid &amp; FMI (2018), <em>Construction Disconnected</em>.{" "}
                  <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">
                    https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf
                  </a>
                </li>
                <li>
                  STL Partners (2025), <em>Preventing multimillion dollar data centre losses through reporting</em>.{" "}
                  <a href="https://stlpartners.com/research/preventing-multimillion-dollar-data-centre-losses-through-reporting/" target="_blank" rel="noopener noreferrer">
                    https://stlpartners.com/research/preventing-multimillion-dollar-data-centre-losses-through-reporting/
                  </a>
                </li>
                <li>
                  Fierce Network (2025), <em>Optimism could kill the data center boom</em> (interview with Dr. Atif Ansar, Foresight).{" "}
                  <a href="https://www.fierce-network.com/cloud/optimism-could-kill-data-center-boom" target="_blank" rel="noopener noreferrer">
                    https://www.fierce-network.com/cloud/optimism-could-kill-data-center-boom
                  </a>
                </li>
                <li>
                  Get It Right Initiative (2015), <em>Literature Review</em> (design‑induced rework &gt;70%).{" "}
                  <a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">
                    https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf
                  </a>
                </li>
                <li>
                  Uptime Institute (2015), <em>Avoiding Data Center Construction Problems</em>.{" "}
                  <a href="https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/" target="_blank" rel="noopener noreferrer">
                    https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default HiddenCostsArticle;
