import { Search, Clock, Shield } from "lucide-react";

export const TrustStrip = () => {
  const trustItems = [
    {
      icon: Search,
      label: "Independent Inspection"
    },
    {
      icon: Clock,
      label: "48 h Turnaround"
    },
    {
      icon: Shield,
      label: "NDA-Protected"
    }
  ];

  return (
    <section className="py-8 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Trust & Peace of Mind</h3>
        </div>
        
        <div className="flex justify-center items-center gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};