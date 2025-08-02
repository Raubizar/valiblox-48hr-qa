import { TrendingUp, Shield, Clock, Users } from "lucide-react";
import analyticsImage from "@/assets/analytics-dashboard.jpg";

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
    <section id="benefits" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            Value for Clients & Owners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform QA from a necessary cost into a competitive advantage
          </p>
        </div>

        {/* Analytics Dashboard Image */}
        <div className="mb-16 flex justify-center">
          <div className="relative max-w-4xl">
            <img 
              src={analyticsImage} 
              alt="Professional analytics dashboard showing quality assurance metrics and compliance reports"
              className="w-full h-auto rounded-3xl shadow-apple-xl"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-8 bg-card rounded-3xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {benefit.description}
              </p>
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-2xl text-sm font-semibold">
                {benefit.metric}
              </div>
            </div>
          ))}
        </div>

        {/* ROI Section */}
        <div className="glass-effect rounded-3xl p-12 border border-border/30">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-semibold text-foreground mb-8 tracking-tight">
                ROI That Speaks for Itself
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-lg">
                      Reduces Internal Admin Time
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Teams focus on design excellence, not document chasing
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-lg">
                      Prevents Budget Overruns
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Early error detection saves thousands in rework costs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 text-lg">
                      Accelerates Project Delivery
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Faster approvals mean earlier project completion
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-10 rounded-3xl shadow-apple border border-border/50">
              <h4 className="text-2xl font-semibold text-foreground mb-8 text-center tracking-tight">
                Cost Comparison
              </h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-6 bg-destructive/5 rounded-2xl border border-destructive/10">
                  <span className="text-muted-foreground font-medium">Traditional Manual QA</span>
                  <span className="font-bold text-destructive text-lg">5-10 Days + $$$</span>
                </div>
                <div className="flex justify-between items-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="text-muted-foreground font-medium">Valiblox QA Service</span>
                  <span className="font-bold text-primary text-lg">48 Hours + ROI</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-8 leading-relaxed">
                <strong className="text-foreground">The cost of one QA round is often less than the cost of a single RFI or rework task.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};