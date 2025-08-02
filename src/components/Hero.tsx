import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-modern-datacenter.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern data center facility with professional QA validation" 
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Shield className="w-4 h-4 text-primary" />
              NDA-Covered
            </div>
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <Clock className="w-4 h-4 text-primary" />
              48h Delivery
            </div>
            <div className="glass-effect px-4 py-2 rounded-full flex items-center gap-2 text-sm text-muted-foreground font-medium">
              <CheckCircle className="w-4 h-4 text-primary" />
              Zero Software Install
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-8 leading-none tracking-tight">
            Independent QA Validation of{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Data Center Design
            </span>{" "}
            Deliverables in 48 Hours
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-4xl mx-auto leading-relaxed font-normal">
            Machine-precision checks combined with expert QA review. 
            Zero software install, zero training, full data security. 
            Built for US Clients who demand faster, error-free deliverables.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button variant="cta" size="lg" className="w-full sm:w-auto min-w-48">
              Book a Call
            </Button>
            <Button variant="outline-premium" size="lg" className="w-full sm:w-auto min-w-48">
              Download QA Report Sample
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-primary hover:text-primary-hover">
              Book a Discovery Call →
            </Button>
          </div>

          {/* Value Proposition */}
          <div className="glass-effect p-8 rounded-3xl max-w-3xl mx-auto">
            <p className="text-lg text-foreground mb-3 font-medium">
              We validate the information before it becomes a costly problem
            </p>
            <p className="text-muted-foreground">
              Helping PMs and Owners prevent delays, RFIs, rework, and budget overruns
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};