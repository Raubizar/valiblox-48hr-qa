import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-relaxed-pm.jpg";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";

export const Hero = () => {
  const qaReportWebhook = useWebhook({
    source: "hero-qa-report",
    title: "Get Your 48 h QA Report",
    description: "Request your comprehensive QA validation report for data center deliverables."
  });

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Relaxed project manager in suit with coffee and tablet, representing QA control" 
          className="w-full h-full object-cover opacity-15"
        />
      </div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Shield className="w-3 h-3 text-primary" />
              NDA-Covered
            </div>
            <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Clock className="w-3 h-3 text-primary" />
              48h Delivery
            </div>
            <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <CheckCircle className="w-3 h-3 text-primary" />
              Zero Software Install
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 leading-tight tracking-tight">
            Independent QA Validation in 48 h—{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              We Spot the Issues, Your Team Fixes Them
            </span>
          </h1>

          {/* Subheadline */}
          <div className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-normal space-y-1">
            <p>Effortless inspection of drawings, models & specs—no software, no bias, NDA-covered.</p>
            <p>Peace of mind for PMs & Owners: know what needs fixing before it gets costly.</p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-10">
            <Button variant="cta" size="sm" className="w-full sm:w-auto" onClick={qaReportWebhook.openModal}>
              Get Your 48 h QA Report
            </Button>
          </div>

          {/* Value Proposition */}
          <div className="glass-effect p-4 rounded-xl max-w-xl mx-auto">
            <p className="text-sm text-foreground mb-1 font-medium">
              We validate the information before it becomes a costly problem
            </p>
            <p className="text-xs text-muted-foreground">
              Helping PMs and Owners prevent delays, RFIs, rework, and budget overruns
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Modal */}
      <WebhookModal
        isOpen={qaReportWebhook.isModalOpen}
        onClose={qaReportWebhook.closeModal}
        onSubmit={qaReportWebhook.handleSubmit}
        {...qaReportWebhook.modalProps}
      />
    </section>
  );
};