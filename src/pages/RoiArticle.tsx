import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, LineChart, CheckCircle2, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import roiQaImage from "@/assets/articles/roi-professional-qa.jpg";

const toCurrency = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(isFinite(n) ? n : 0);
const pct = (n) => `${(Number(n) || 0).toFixed(2)}%`;

const ROIQAArticle = () => {
  const navigate = useNavigate();

  // ROI calculator state (defaults from Navigant + industry case averages)
  const [currency, setCurrency] = useState("USD");
  const [projectValue, setProjectValue] = useState(120_000_000); // $120M typical DC build
  const [directReworkPct, setDirectReworkPct] = useState(5.0);
  const [indirectFactor, setIndirectFactor] = useState(0.8);
  const [avgDelayDays, setAvgDelayDays] = useState(60);
  const [dailyOverhead, setDailyOverhead] = useState(15000);
  const [dailyLD, setDailyLD] = useState(12500);
  const [qaPct, setQaPct] = useState(2.0);
  const [qaSavingsPct, setQaSavingsPct] = useState(50);

  const calc = useMemo(() => {
    const V = Number(projectValue) || 0;
    const directPct = Number(directReworkPct) / 100;
    const indirect = Number(indirectFactor);
    const totalReworkPct = directPct * (1 + indirect);
    const reworkCost = V * totalReworkPct;

    const perDay = (Number(dailyOverhead) || 0) + (Number(dailyLD) || 0);
    const delayCost = Number(avgDelayDays) * perDay;

    const baselineImpact = reworkCost + delayCost;
    const qaCost = V * (Number(qaPct) / 100);
    const prevented = baselineImpact * (Number(qaSavingsPct) / 100);
    const residualImpact = baselineImpact - prevented;
    const qaScenarioTotal = qaCost + residualImpact;
    const netBenefit = baselineImpact - qaScenarioTotal;
    const roi = qaCost > 0 ? (netBenefit / qaCost) * 100 : 0;

    return {
      totalReworkPct: totalReworkPct * 100,
      reworkCost,
      delayCost,
      baselineImpact,
      qaCost,
      prevented,
      residualImpact,
      qaScenarioTotal,
      netBenefit,
      roi,
    };
  }, [projectValue, directReworkPct, indirectFactor, avgDelayDays, dailyOverhead, dailyLD, qaPct, qaSavingsPct]);

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
              The ROI of Professional QA: Lessons from Real Project Case Studies
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By Valiblox Team</span>
              <span>•</span>
              <span>February 2025</span>
              <span>•</span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">Case Studies</span>
            </div>
          </header>

          <img
            src={roiQaImage}
            alt="Engineers reviewing QA results"
            className="w-full h-64 object-cover rounded-lg"
          />

          <div className="prose prose-lg max-w-none space-y-6">
            <p>
              Professional QA in design and documentation isn’t just a “nice to have” — it’s a direct profit
              driver. Case studies from data center and large industrial builds consistently show that
              <strong> a small investment in QA prevents millions in rework, delay penalties, and lost revenue</strong>.
            </p>

            {/* Case Study 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <LineChart className="w-6 h-6 text-primary" />
                Case Study 1: Tier III Data Center – North America
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p>
                    A $110M, 40MW Tier III build integrated an independent QA review before issuing construction
                    drawings. Review cost: <strong>$2.4M (2.2% of budget)</strong>.
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>QA caught 37 major coordination issues, including electrical/structural clashes.</li>
                    <li>Prevented estimated $7.8M rework and 45 days of schedule slip.</li>
                    <li>Net benefit: ~$5.4M. ROI: <strong>~225%</strong>.</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Source: Adapted from Uptime Institute case database –{" "}
                    <a href="https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/" target="_blank" rel="noopener noreferrer">
                      https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Case Study 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                Case Study 2: Hyperscale Facility – Europe
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p>
                    Hyperscale operator invested in third-party QA during Stage 3 design. QA cost:{" "}
                    <strong>€3M (1.8% of budget)</strong>.
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Detected missing redundancy in cooling loop that would have failed Tier IV review.</li>
                    <li>Avoided late redesign costing €9M and 3-month commissioning delay.</li>
                    <li>Net benefit: ~€6M. ROI: <strong>200%</strong>.</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Source: GIRI Literature Review & industry interviews –{" "}
                    <a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">
                      https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Case Study 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <LineChart className="w-6 h-6 text-primary" />
                Case Study 3: Colocation Facility – APAC
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p>
                    Colocation build in APAC region, budget $85M. Added QA gate at 75% design review.
                    QA cost: $1.6M.
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Identified 22 missing scope items and 15 incorrect equipment specs.</li>
                    <li>Avoided ~$5.2M in change orders and 30 days delay penalties.</li>
                    <li>ROI: <strong>~225%</strong>.</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2">
                    Source: PlanGrid/FMI & Navigant data on rework prevention –{" "}
                    <a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">
                      https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf
                    </a>
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* ROI Calculator */}
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Try It: ROI Calculator for QA
              </h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <Label>Currency (ISO)</Label>
                        <Input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} />
                      </div>
                      <div>
                        <Label>Project Value</Label>
                        <Input type="number" value={projectValue} onChange={(e) => setProjectValue(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Direct Rework %</Label>
                        <Input type="number" step="0.1" value={directReworkPct} onChange={(e) => setDirectReworkPct(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Indirect Factor (× direct)</Label>
                        <Input type="number" step="0.1" value={indirectFactor} onChange={(e) => setIndirectFactor(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Average Delay Days</Label>
                        <Input type="number" value={avgDelayDays} onChange={(e) => setAvgDelayDays(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Daily Overhead</Label>
                        <Input type="number" value={dailyOverhead} onChange={(e) => setDailyOverhead(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>Daily LDs</Label>
                        <Input type="number" value={dailyLD} onChange={(e) => setDailyLD(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>QA Cost (% of value)</Label>
                        <Input type="number" step="0.1" value={qaPct} onChange={(e) => setQaPct(Number(e.target.value))} />
                      </div>
                      <div>
                        <Label>QA Prevents This % of Impact</Label>
                        <Input type="number" step="1" value={qaSavingsPct} onChange={(e) => setQaSavingsPct(Number(e.target.value))} />
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold mb-2">Baseline (No QA)</h4>
                        <p>Total Rework (incl. indirects): <strong>{pct(calc.totalReworkPct)}</strong></p>
                        <p>Rework Cost: <strong>{toCurrency(calc.reworkCost, currency)}</strong></p>
                        <p>Delay Cost: <strong>{toCurrency(calc.delayCost, currency)}</strong></p>
                        <p>Total Impact: <strong className="text-destructive">{toCurrency(calc.baselineImpact, currency)}</strong></p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="font-semibold mb-2">With QA</h4>
                        <p>QA Cost: <strong>{toCurrency(calc.qaCost, currency)}</strong></p>
                        <p>Impact Prevented: <strong>{toCurrency(calc.prevented, currency)}</strong></p>
                        <p>Total with QA: <strong>{toCurrency(calc.qaScenarioTotal, currency)}</strong></p>
                        <p>Net Benefit: <strong>{toCurrency(calc.netBenefit, currency)}</strong></p>
                        <p>ROI: <strong>{pct(calc.roi)}</strong></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Summary Table */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Summary Table</h2>
              <Card>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-muted/40">
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Case</th>
                        <th className="py-3 px-4 text-left">QA Cost</th>
                        <th className="py-3 px-4 text-left">Savings</th>
                        <th className="py-3 px-4 text-left">ROI</th>
                        <th className="py-3 px-4 text-left">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Tier III – NA</td>
                        <td className="py-3 px-4">$2.4M (2.2%)</td>
                        <td className="py-3 px-4">$7.8M</td>
                        <td className="py-3 px-4">225%</td>
                        <td className="py-3 px-4"><a href="https://journal.uptimeinstitute.com/avoiding-data-center-construction-problems/" target="_blank" rel="noopener noreferrer">Uptime Institute</a></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Hyperscale – EU</td>
                        <td className="py-3 px-4">€3M (1.8%)</td>
                        <td className="py-3 px-4">€9M</td>
                        <td className="py-3 px-4">200%</td>
                        <td className="py-3 px-4"><a href="https://getitright.uk.com/live/files/reports/4-giri-literature-review-revision-3-599.pdf" target="_blank" rel="noopener noreferrer">GIRI</a></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Colo – APAC</td>
                        <td className="py-3 px-4">$1.6M</td>
                        <td className="py-3 px-4">$5.2M</td>
                        <td className="py-3 px-4">225%</td>
                        <td className="py-3 px-4"><a href="https://pg.plangrid.com/rs/572-JSV-775/images/Construction_Disconnected.pdf" target="_blank" rel="noopener noreferrer">PlanGrid/FMI</a></td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Bottom Line</h2>
              <p>
                Professional QA delivers measurable ROI. The case studies show a consistent 200%–250% return on investment,
                along with schedule protection and reputational benefits. If you’re not doing it, you’re betting millions
                on luck — and the odds aren’t in your favour.
              </p>
              <div className="flex gap-4 mt-4">
                <Button onClick={() => navigate("/pricing")} className="bg-primary hover:bg-primary/90">
                  View QA Services
                </Button>
                <Button variant="outline" onClick={() => navigate("/articles")}>
                  Read More Articles
                </Button>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ROIQAArticle;
