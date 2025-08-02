import { Shield, Lock, Award, Users, CheckCircle } from "lucide-react";
import trustImage from "@/assets/trust-partnership.jpg";

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
    <section className="py-32 gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-8 tracking-tight">
            Built on Trust & Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your project data and business information remain completely secure throughout our QA process
          </p>
        </div>

        {/* Trust Partnership Image */}
        <div className="mb-20 flex justify-center">
          <div className="relative max-w-4xl">
            <img 
              src={trustImage} 
              alt="Professional business partnership representing trust and collaboration in QA services"
              className="w-full h-auto rounded-3xl shadow-apple-xl"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/20 to-transparent"></div>
          </div>
        </div>

        {/* Trust Factors */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {trustFactors.map((factor, index) => (
            <div key={index} className="bg-card p-10 rounded-3xl shadow-apple border border-border/50 hover:shadow-apple-lg transition-all duration-300 group">
              <div className="mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                  {factor.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 tracking-tight">
                {factor.title}
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                {factor.description}
              </p>
              <ul className="space-y-3">
                {factor.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security & Compliance */}
        <div className="glass-effect rounded-3xl p-12 border border-border/30">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-semibold text-foreground tracking-tight">
                  Security & Compliance
                </h3>
              </div>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We understand that data center projects involve sensitive technical and business information. 
                Our security protocols ensure your files and project details remain completely confidential.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground leading-relaxed">
                    Files processed in secure, isolated environments
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground leading-relaxed">
                    Automatic file deletion after project completion
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground leading-relaxed">
                    Team bound by comprehensive NDAs
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">
                Certifications & Standards
              </h4>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-card rounded-2xl shadow-apple border border-border/50">
                    <span className="font-medium text-foreground text-lg">{cert.name}</span>
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold">
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