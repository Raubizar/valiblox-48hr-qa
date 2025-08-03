import { Zap, Shield, Clock } from "lucide-react";

export const ValueSnapshot = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Full Visibility",
      description: "Immediate, item-by-item report of every non-compliance."
    },
    {
      icon: Shield,
      title: "Zero Effort",
      description: "Upload once; we run all QA cycles until everything is cleared."
    },
    {
      icon: Clock,
      title: "Schedule Protection",
      description: "48 h turnaround on every check keeps your project moving."
    }
  ];

  return (
    <section id="value" className="py-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Value Snapshot
          </h2>
          <div className="glass-effect p-4 rounded-xl border border-primary/20 max-w-md mx-auto mb-6">
            <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
              Pilot Proof
            </div>
            <p className="text-sm font-medium text-foreground">
              27 errors spotted in 48 h, saving 10 days of rework.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};