import { AlertTriangle, CheckCircle2, Clock, DollarSign } from "lucide-react";

export const PainSolution = () => {
  const painPoints = [
    {
      icon: <Clock className="w-6 h-6 text-destructive" />,
      title: "Manual QA Takes Weeks",
      description: "Traditional QA processes consume 5-10 business days of team time"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
      title: "Errors Cause Costly Rework",
      description: "Missing details lead to RFIs, claims, and project delays"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-destructive" />,
      title: "No Visibility Into File Quality",
      description: "Teams submit deliverables without confidence in compliance"
    }
  ];

  const solutions = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-success" />,
      title: "48-Hour QA Validation",
      description: "Machine accuracy + expert review delivers comprehensive QA reports"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-success" />,
      title: "Independent External Validation",
      description: "Supplements your process with trusted external QA stamp"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-success" />,
      title: "Full Data Security & NDA Coverage",
      description: "Zero cloud retention, complete project confidentiality"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            From QA Bottleneck to Competitive Advantage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your quality assurance from a time-consuming liability into a strategic asset
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Pain Points */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center lg:text-left">
              Current QA Challenges
            </h3>
            <div className="space-y-6">
              {painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div className="flex-shrink-0 mt-1">
                    {pain.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{pain.title}</h4>
                    <p className="text-muted-foreground">{pain.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center lg:text-left">
              Valiblox Solution
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex-shrink-0 mt-1">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{solution.title}</h4>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objections & Answers */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
            Common Concerns Addressed
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-card">
              <h4 className="font-semibold text-foreground mb-3">
                "Our internal teams handle this"
              </h4>
              <p className="text-muted-foreground">
                We supplement your process with machine accuracy and provide an independent QA stamp that enhances credibility with stakeholders.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card">
              <h4 className="font-semibold text-foreground mb-3">
                "What about data security?"
              </h4>
              <p className="text-muted-foreground">
                All reviews are NDA-covered with zero cloud data retention. Your files remain completely secure throughout the process.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-card">
              <h4 className="font-semibold text-foreground mb-3">
                "Speed vs quality trade-off?"
              </h4>
              <p className="text-muted-foreground">
                Machine-checking ensures no detail is missed, while expert review ensures real-world project sense and compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};