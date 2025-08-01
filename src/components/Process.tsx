import { Upload, Search, FileCheck } from "lucide-react";

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
    <section className="py-20 gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Unique 3-Step Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From deliverable submission to compliance confidence in just 48 hours
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-border z-0 transform translate-x-4"></div>
              )}
              
              {/* Step Card */}
              <div className="relative z-10 bg-card p-8 rounded-xl shadow-card border hover:shadow-premium transition-all duration-300">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full text-2xl font-bold mb-6">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-primary mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
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
        <div className="mt-16 text-center bg-card p-8 rounded-xl shadow-card">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Why Our Process Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Machine Precision</h4>
              <p className="text-sm text-muted-foreground">Automated checks ensure no detail is overlooked</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Expert Oversight</h4>
              <p className="text-sm text-muted-foreground">Human review ensures real-world project sense</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Rapid Turnaround</h4>
              <p className="text-sm text-muted-foreground">48-hour delivery keeps projects on schedule</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};