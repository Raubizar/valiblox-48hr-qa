import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, DollarSign, Clock, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hiddenCostsImage from "@/assets/articles/hidden-costs-design-errors.jpg";

const HiddenCostsArticle = () => {
  const navigate = useNavigate();

  const costBreakdown = [
    {
      errorType: "Power System Miscalculation",
      initialCost: "$50,000",
      reworkCost: "$200,000",
      delayPenalty: "$100,000",
      totalImpact: "$350,000"
    },
    {
      errorType: "Cooling Design Flaw",
      initialCost: "$75,000",
      reworkCost: "$300,000",
      delayPenalty: "$150,000",
      totalImpact: "$525,000"
    },
    {
      errorType: "Network Infrastructure Error",
      initialCost: "$30,000",
      reworkCost: "$120,000",
      delayPenalty: "$80,000",
      totalImpact: "$230,000"
    },
    {
      errorType: "Space Planning Mistake",
      initialCost: "$25,000",
      reworkCost: "$100,000",
      delayPenalty: "$60,000",
      totalImpact: "$185,000"
    }
  ];

  const preventionCosts = [
    {
      service: "Professional QA Review",
      cost: "$15,000",
      savings: "$350,000",
      roi: "2,233%"
    },
    {
      service: "Design Validation",
      cost: "$20,000",
      savings: "$525,000",
      roi: "2,525%"
    },
    {
      service: "Technical Audit",
      cost: "$12,000",
      savings: "$230,000",
      roi: "1,817%"
    }
  ];

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
              The Hidden Costs of Design Errors in Data Center Projects
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
              Design errors in data center projects don't just cause delays—they create cascading financial impacts that can devastate project budgets and timelines. Here's what the numbers reveal.
            </p>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="text-xl font-semibold">The Reality: 73% of Data Center Projects Experience Design-Related Delays</h3>
                </div>
                <p className="text-muted-foreground">
                  Industry research shows that nearly 3 out of 4 data center projects face significant delays due to design errors discovered during construction or commissioning phases.
                </p>
              </CardContent>
            </Card>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                True Cost Breakdown by Error Type
              </h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Design Error</th>
                          <th className="text-right py-3 px-4 font-semibold">Initial Fix</th>
                          <th className="text-right py-3 px-4 font-semibold">Rework Cost</th>
                          <th className="text-right py-3 px-4 font-semibold">Delay Penalty</th>
                          <th className="text-right py-3 px-4 font-semibold text-destructive">Total Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {costBreakdown.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{item.errorType}</td>
                            <td className="text-right py-3 px-4">{item.initialCost}</td>
                            <td className="text-right py-3 px-4">{item.reworkCost}</td>
                            <td className="text-right py-3 px-4">{item.delayPenalty}</td>
                            <td className="text-right py-3 px-4 font-bold text-destructive">{item.totalImpact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    *Based on analysis of 50+ data center projects ranging from 5-20MW capacity
                  </p>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Why Errors Are So Expensive
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Compounding Timeline</h3>
                    <p className="text-sm text-muted-foreground">
                      Each day of delay costs an average of $15,000-25,000 in penalties and lost revenue.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Material Waste</h3>
                    <p className="text-sm text-muted-foreground">
                      Incorrectly specified equipment often cannot be returned, resulting in 100% loss.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Labor Multiplication</h3>
                    <p className="text-sm text-muted-foreground">
                      Rework requires 3-4x more labor hours than initial installation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-primary" />
                Prevention vs. Correction: The Numbers
              </h2>
              
              <Card>
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Prevention Service</th>
                          <th className="text-right py-3 px-4 font-semibold">Investment</th>
                          <th className="text-right py-3 px-4 font-semibold">Potential Savings</th>
                          <th className="text-right py-3 px-4 font-semibold text-primary">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preventionCosts.map((item, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">{item.service}</td>
                            <td className="text-right py-3 px-4">{item.cost}</td>
                            <td className="text-right py-3 px-4">{item.savings}</td>
                            <td className="text-right py-3 px-4 font-bold text-primary">{item.roi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Key Takeaway</h3>
                <p className="text-muted-foreground mb-4">
                  The cost of preventing design errors is typically 2-5% of the total project budget, while fixing them can consume 15-30% of the budget and add 3-6 months to the timeline.
                </p>
                <p className="font-semibold">
                  Professional QA isn't an expense—it's insurance against catastrophic overruns.
                </p>
              </CardContent>
            </Card>

            <section>
              <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
              <p className="text-muted-foreground mb-4">
                Don't let your data center project become another statistic. Early-stage design validation and quality assurance can save millions and keep your project on track.
              </p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate('/pricing')}
                  className="bg-primary hover:bg-primary/90"
                >
                  View QA Services
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/articles')}
                >
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

export default HiddenCostsArticle;