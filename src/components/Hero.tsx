import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle, Handshake } from "lucide-react";
import heroImage from "@/assets/hero-professional-sidebyside.webp";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";
import { DecorativeCheck } from "@/components/ui/decorative-check";

export const Hero = () => {
  const qaStrategyWebhook = useWebhook({
    source: "hero-qa-strategy-call",
    title: "Book a QA Strategy Call",
    description: "Schedule a consultation to discuss your QA validation needs and discover how we can help prevent costly deliverable issues."
  });

  return (
    <section className="py-20 bg-[#F3F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 xl:px-20">
        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground leading-tight tracking-tight">
              <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Independent QA Validation for Data Center Design Deliverables
              </span>
              — in 48h, Zero Disruption
            </h1>

            {/* Subheadline */}
            <div className="text-sm md:text-sm lg:text-base text-muted-foreground leading-relaxed font-normal space-y-3">
              <p>We verify every drawing, model, and specification against your standards and project requirements—combining machine precision with expert review.</p>
              <p>Our process prevents costly RFIs, rework, and delays—and we remain engaged until your deliverables meet all requirements.</p>
            </div>

            {/* Proof Strip */}
            <div className="text-sm font-medium text-foreground">
              1,200+ Packages Validated • €500M+ in Projects • Trusted by Tier-1 Operators
            </div>

            {/* Trust Points */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-background/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium border border-border/50">
                <Shield className="w-3 h-3 text-primary" />
                100% NDA-Covered
              </div>
              <div className="bg-background/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium border border-border/50">
                <CheckCircle className="w-3 h-3 text-primary" />
                No Software to Install
              </div>
              <div className="bg-background/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium border border-border/50">
                <Clock className="w-3 h-3 text-primary" />
                48h Initial Report
              </div>
            </div>

            {/* Partnership Guarantee */}
            <div className="bg-muted/40 border border-border/50 p-4 rounded-xl max-w-xl">
              <div className="flex items-start gap-3">
                <Handshake className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    Partnership Guarantee
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We stay with your team until the package passes your QA requirements—unlimited re-checks included.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex">
              <Button variant="cta" size="lg" onClick={qaStrategyWebhook.openModal}>
                Book a QA Strategy Call
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end items-start">
            <div className="w-full max-w-lg lg:max-w-2xl relative">
              {/* Decorative accent behind image */}
              <DecorativeCheck />
              
              {/* Image card */}
              <div className="relative hover:scale-[1.02] transition-transform duration-300">
                <img 
                  src={heroImage} 
                  alt="Confident business professional with laptop and ceramic coffee mug, representing trust and control in QA validation" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Modal */}
      <WebhookModal
        isOpen={qaStrategyWebhook.isModalOpen}
        onClose={qaStrategyWebhook.closeModal}
        onSubmit={qaStrategyWebhook.handleSubmit}
        {...qaStrategyWebhook.modalProps}
      />
    </section>
  );
};