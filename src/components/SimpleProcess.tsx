import { Upload, Cog, FileText } from "lucide-react";

export const SimpleProcess = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Securely share your files",
      description: "Upload drawings, models & specs via secure portal"
    },
    {
      number: 2,
      icon: Cog,
      title: "Machine-check & expert review",
      description: "AI validation followed by expert verification"
    },
    {
      number: 3,
      icon: FileText,
      title: "Receive PDF QA report in 48h",
      description: "Comprehensive findings with actionable recommendations"
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Simple 3-Step Process
          </h2>
          <p className="text-sm text-muted-foreground">
            From file submission to detailed QA report in 48 hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="glass-effect p-6 rounded-xl text-center h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full">
                  <div className="w-4 h-0.5 bg-gradient-to-r from-primary/40 to-primary/20"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};