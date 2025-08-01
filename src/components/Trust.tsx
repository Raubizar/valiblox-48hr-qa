import { Shield, Lock, Award, Users, CheckCircle } from "lucide-react";

export const Trust = () => {
  const trustFactors = [
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: "NDA & Data Security",
      description: "All reviews are NDA-covered with zero cloud data retention",
      features: ["Encrypted file transfer", "No data storage", "Complete confidentiality"]
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Industry Expertise",
      description: "BIM & QA experts with extensive data center project experience",
      features: ["AEC industry veterans", "Data center specialists", "Quality assurance certified"]
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Proven Track Record",
      description: "Trusted by leading firms for large industrial & data center projects", 
      features: ["Enterprise clients", "Complex project experience", "Consistent quality delivery"]
    }
  ];

  const certifications = [
    { name: "ISO 9001 Quality Management", status: "Certified" },
    { name: "SOC 2 Type II Security", status: "Compliant" },
    { name: "NDA Framework", status: "Standard" },
    { name: "Data Privacy Protection", status: "Guaranteed" }
  ];

  return (
    <section className="py-20 gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Built on Trust & Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your project data and business information remain completely secure throughout our QA process
          </p>
        </div>

        {/* Trust Factors */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {trustFactors.map((factor, index) => (
            <div key={index} className="bg-card p-8 rounded-xl shadow-card border hover:shadow-premium transition-all duration-300">
              <div className="mb-6">
                {factor.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {factor.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {factor.description}
              </p>
              <ul className="space-y-2">
                {factor.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Compliance */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card border">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-primary" />
                <h3 className="text-3xl font-bold text-foreground">
                  Security & Compliance
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We understand that data center projects involve sensitive technical and business information. 
                Our security protocols ensure your files and project details remain completely confidential.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">
                    Files processed in secure, isolated environments
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">
                    Automatic file deletion after project completion
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">
                    Team bound by comprehensive NDAs
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-foreground mb-6">
                Certifications & Standards
              </h4>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-success/5 rounded-lg border border-success/20">
                    <span className="font-medium text-foreground">{cert.name}</span>
                    <span className="text-sm bg-success text-success-foreground px-2 py-1 rounded">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};