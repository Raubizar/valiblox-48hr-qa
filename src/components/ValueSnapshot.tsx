import { Zap, Shield, Clock } from "lucide-react";

export const ValueSnapshot = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Automated precision",
      description: "Machine validation catches what manual reviews miss"
    },
    {
      icon: Shield,
      title: "QA-certified oversight",
      description: "Expert engineers verify every validation result"
    },
    {
      icon: Clock,
      title: "48 h turnaround",
      description: "Professional reports delivered within two business days"
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Value Snapshot
          </h2>
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