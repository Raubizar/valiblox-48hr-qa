import { AlertTriangle, CheckCircle2, Clock, DollarSign } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";

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
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            From QA Bottleneck to Competitive Advantage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your quality assurance from a time-consuming liability into a strategic asset
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 flex justify-center">
          <div className="relative max-w-4xl">
            <img 
              src={teamImage} 
              alt="Professional team collaborating on quality assurance and project validation"
              className="w-full h-auto rounded-3xl shadow-apple-xl"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Pain Points */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center lg:text-left">
              Current QA Challenges
            </h3>
            <div className="space-y-4">
              {painPoints.map((pain, index) => (
                <div key={index} className="flex items-start gap-5 p-6 bg-card rounded-2xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center mt-1">
                    {pain.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-lg">{pain.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{pain.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center lg:text-left">
              Valiblox Solution
            </h3>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-5 p-6 bg-card rounded-2xl shadow-apple border border-primary/10 hover:shadow-apple-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mt-1">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-lg">{solution.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objections & Answers */}
        <div className="mt-32">
          <h3 className="text-3xl font-semibold text-foreground mb-16 text-center tracking-tight">
            Common Concerns Addressed
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-card rounded-3xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300">
              <h4 className="font-semibold text-foreground mb-4 text-lg">
                "Our internal teams handle this"
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                We supplement your process with machine accuracy and provide an independent QA stamp that enhances credibility with stakeholders.
              </p>
            </div>
            <div className="p-8 bg-card rounded-3xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300">
              <h4 className="font-semibold text-foreground mb-4 text-lg">
                "What about data security?"
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                All reviews are NDA-covered with zero cloud data retention. Your files remain completely secure throughout the process.
              </p>
            </div>
            <div className="p-8 bg-card rounded-3xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300">
              <h4 className="font-semibold text-foreground mb-4 text-lg">
                "Speed vs quality trade-off?"
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Machine-checking ensures no detail is missed, while expert review ensures real-world project sense and compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};