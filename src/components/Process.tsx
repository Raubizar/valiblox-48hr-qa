import { Upload, Search, FileCheck } from "lucide-react";
import qaWorkstationImage from "@/assets/qa-workstation.jpg";

export const Process = () => {
  const steps = [
    {
      number: "01",
      icon: <Upload className="w-8 h-8" />,
      title: "Share Deliverables Securely",
      description: "Upload your design files through our secure portal. No IT setup required, no software installation needed.",
      details: ["300-800 files typical", "All major file formats", "Secure encrypted transfer"]
    },
    {
      number: "02", 
      icon: <Search className="w-8 h-8" />,
      title: "Machine Validation + Expert Review",
      description: "Our system performs comprehensive checks on naming conventions, LOD, title blocks, and clash risks.",
      details: ["Automated precision checks", "Expert QA oversight", "Industry standard validation"]
    },
    {
      number: "03",
      icon: <FileCheck className="w-8 h-8" />,
      title: "Detailed QA Report in 48h",
      description: "Receive a comprehensive QA report with compliance summary, ready for submission with full confidence.",
      details: ["Detailed compliance report", "Action item prioritization", "Submission-ready documentation"]
    }
  ];

  return (
    <section id="process" className="py-12 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            Our Unique 3-Step Process
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From deliverable submission to compliance confidence in just 48 hours
          </p>
        </div>

        {/* QA Workstation Image */}
        <div className="mb-12 flex justify-center">
          <div className="relative max-w-3xl">
            <img 
              src={qaWorkstationImage} 
              alt="Professional QA workstation with multiple monitors displaying technical validation software"
              className="w-full h-auto rounded-2xl shadow-apple-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-primary/20 z-0 transform translate-x-3"></div>
              )}
              
              {/* Step Card */}
              <div className="relative z-10 bg-card p-6 rounded-2xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300 group">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground rounded-2xl text-lg font-semibold mb-6 shadow-apple">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Benefits */}
        <div className="mt-12 text-center glass-effect p-8 rounded-2xl border border-border/30">
          <h3 className="text-xl font-semibold text-foreground mb-4 tracking-tight">
            Why Our Process Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Machine Precision</h4>
              <p className="text-muted-foreground leading-relaxed text-xs">Automated checks ensure no detail is overlooked</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Expert Oversight</h4>
              <p className="text-muted-foreground leading-relaxed text-xs">Human review ensures real-world project sense</p>
            </div>
            <div className="group">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <div className="w-6 h-6 bg-primary rounded-full"></div>
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Rapid Turnaround</h4>
              <p className="text-muted-foreground leading-relaxed text-xs">48-hour delivery keeps projects on schedule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};