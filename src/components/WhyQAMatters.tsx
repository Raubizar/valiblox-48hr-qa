import { TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export const WhyQAMatters = () => {
  const painPoints = [
    {
      icon: TrendingUp,
      text: "Over 50 % of cost overruns come from design errors."
    },
    {
      icon: Clock,
      text: "Manual checks burn days per package."
    },
    {
      icon: AlertTriangle,
      text: "Unspotted clashes can delay site by weeks."
    },
    {
      icon: CheckCircle,
      text: "Early QA prevents expensive late-stage rework."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Why Independent QA Matters for Data Centers
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Data center projects face unique challenges where a single error can cascade into massive delays and cost overruns.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl text-center hover:shadow-luxury transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <point.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Pilot Success Story */}
        <div className="glass-effect p-8 rounded-xl border border-primary/20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">
              Real Pilot Result
            </div>
            <blockquote className="text-lg font-medium text-foreground mb-4">
              "I caught 27 hidden errors in 48 h, saving 10 days of rework."
            </blockquote>
            <p className="text-sm text-muted-foreground">
              — Project Manager, Fortune 500 Data Center Project
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};