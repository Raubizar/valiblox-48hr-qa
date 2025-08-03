import { TrendingDown, Clock, AlertTriangle } from "lucide-react";

export const WhyQAMatters = () => {
  const benefits = [
    {
      icon: TrendingDown,
      text: "Avoid 15% budget overruns from unspotted errors."
    },
    {
      icon: Clock,
      text: "Cut manual review time from days to minutes."
    },
    {
      icon: AlertTriangle,
      text: "Stop on-site clashes before they happen."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Why QA Matters in Data Center Projects
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Data center construction projects are among the most complex and costly infrastructure investments. 
            A single overlooked detail in drawings, specifications, or 3D models can cascade into massive delays, 
            budget overruns, and operational failures. Traditional QA processes rely heavily on manual reviews 
            that are slow, inconsistent, and prone to human error.
          </p>
        </div>

        <div className="glass-effect p-6 md:p-8 rounded-xl mb-8">
          <p className="text-foreground leading-relaxed mb-6">
            The stakes couldn't be higher. Data centers require precise coordination between mechanical, electrical, 
            and structural systems. When errors slip through, they don't just cost money—they can compromise critical 
            infrastructure that businesses depend on 24/7. Our machine-assisted validation process catches these 
            issues before they become problems, ensuring your project stays on track, on budget, and delivers 
            the reliability your clients expect.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                  <benefit.icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground font-medium">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't let preventable errors derail your next data center project. 
            Get the confidence that comes with independent, expert validation.
          </p>
        </div>
      </div>
    </section>
  );
};