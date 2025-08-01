import { TrendingUp, Shield, Clock, Users } from "lucide-react";

export const ValueProposition = () => {
  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Guarantees Confidence",
      description: "Every submission backed by comprehensive QA validation",
      metric: "100% Compliance Coverage"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-success" />,
      title: "Prevents Costly Errors",
      description: "Catch issues before they reach site or procurement",
      metric: "Avg 15+ Issues Found"
    },
    {
      icon: <Clock className="w-8 h-8 text-success" />,
      title: "Reduces Approval Cycles",
      description: "Enhanced project visibility and faster stakeholder approval",
      metric: "48h vs Weeks"
    },
    {
      icon: <Users className="w-8 h-8 text-success" />,
      title: "Protects PM Reputation", 
      description: "Independent validation enhances professional credibility",
      metric: "Zero Blame Risk"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Value for Clients & Owners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform QA from a necessary cost into a competitive advantage
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-xl shadow-card border hover:shadow-premium transition-all duration-300">
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {benefit.description}
              </p>
              <div className="inline-block bg-success/10 text-success px-3 py-1 rounded-full text-sm font-semibold">
                {benefit.metric}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Section */}
        <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-2xl p-8 md:p-12 border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                ROI That Speaks for Itself
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Reduces Internal Admin Time
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Teams focus on design excellence, not document chasing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Prevents Budget Overruns
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Early error detection saves thousands in rework costs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Accelerates Project Delivery
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Faster approvals mean earlier project completion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-card">
              <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                Cost Comparison
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-destructive/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Traditional Manual QA</span>
                  <span className="font-bold text-destructive">5-10 Days + $$$</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-success/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Valiblox QA Service</span>
                  <span className="font-bold text-success">48 Hours + ROI</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-6">
                <strong className="text-foreground">The cost of one QA round is often less than the cost of a single RFI or rework task.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};