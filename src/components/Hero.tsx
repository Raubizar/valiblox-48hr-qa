import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Shield, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-datacenter.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-subtle">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern data center facility with professional QA validation" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-background/90"></div>
      </div>
      
      {/* Hero Image Placeholder */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop&crop=center" 
          alt="Colorful software code on computer monitor representing technical QA validation"
          className="w-80 h-60 object-cover rounded-xl shadow-premium border border-border/20 opacity-80"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="trust-indicator">
              <Shield className="w-4 h-4" />
              NDA-Covered
            </div>
            <div className="trust-indicator">
              <Clock className="w-4 h-4" />
              48h Delivery
            </div>
            <div className="trust-indicator">
              <CheckCircle className="w-4 h-4" />
              Zero Software Install
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Independent QA Validation of{" "}
            <span className="text-primary">Data Center Design</span>{" "}
            Deliverables in 48 Hours
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Machine-precision checks combined with expert QA review. 
            Zero software install, zero training, full data security. 
            Built for US Clients who demand faster, error-free deliverables.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="cta" size="lg" className="w-full sm:w-auto">
              Get a Quote
            </Button>
            <Button variant="outline-premium" size="lg" className="w-full sm:w-auto">
              Download QA Report Sample
            </Button>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-primary hover:text-primary-hover">
              Book a Discovery Call →
            </Button>
          </div>

          {/* Value Proposition */}
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              <strong className="text-foreground">We validate the information before it becomes a costly problem</strong>
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