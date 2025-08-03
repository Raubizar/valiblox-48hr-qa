import { Lock, Clock, Zap } from "lucide-react";

export const TrustBar = () => {
  const trustBadges = [
    {
      icon: Lock,
      label: "NDA-covered"
    },
    {
      icon: Clock,
      label: "48 h SLA"
    },
    {
      icon: Zap,
      label: "Machine-Checked & Expert-Reviewed"
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Pilot Result */}
        <div className="text-center mb-8">
          <div className="glass-effect p-4 md:p-6 rounded-xl border border-primary/20">
            <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
              Pilot Result
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              27 hidden errors caught in 48h—saved 10 days of rework.
            </h3>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 glass-effect px-3 py-2 rounded-lg">
              <badge.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};