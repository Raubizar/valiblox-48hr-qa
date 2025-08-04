import { Button } from "@/components/ui/button";
import { Shield, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-professional-sidebyside.webp";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";
import { DecorativeCheck } from "@/components/ui/decorative-check";
import { useState, useEffect } from "react";
import { processHeroImageBackground } from "@/utils/processHeroImage";

export const Hero = () => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string>(heroImage);
  const [isProcessing, setIsProcessing] = useState(false);

  const qaReportWebhook = useWebhook({
    source: "hero-qa-report",
    title: "Get Your 48 h QA Report",
    description: "Request your comprehensive QA validation report for data center deliverables."
  });

  useEffect(() => {
    const processImage = async () => {
      setIsProcessing(true);
      try {
        const processedUrl = await processHeroImageBackground();
        setProcessedImageUrl(processedUrl);
      } catch (error) {
        console.error('Failed to process hero image:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, []);

  return (
    <section className="py-20 bg-[#F3F6F8]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Main Headline */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground leading-tight tracking-tight">
              <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Spot Every Deliverable Error in 48 h
              </span>
              —Independent QA for Data Center Projects
            </h1>

            {/* Subheadline */}
            <div className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed font-normal space-y-2">
              <p>We flag issues in your drawings, models, and specs—then re-check for free until the package passes.</p>
              <p>No software to install, NDA-protected, machine-precision plus expert review.</p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-3">
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

            {/* CTA Button */}
            <div className="flex">
              <Button variant="cta" size="lg" onClick={qaReportWebhook.openModal}>
                Get Your 48 h QA Report
              </Button>
            </div>

            {/* Value Proposition */}
            <div className="glass-effect p-4 rounded-xl max-w-xl">
              <p className="text-sm text-foreground mb-1 font-medium">
                We validate the information before it becomes a costly problem
              </p>
              <p className="text-xs text-muted-foreground">
                Helping PMs and Owners prevent delays, RFIs, rework, and budget overruns
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg relative">
              {/* Decorative accent behind image */}
              <DecorativeCheck />
              
              {/* Image card */}
              <div className="relative bg-gradient-to-br from-background to-muted/20 rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)] hover:scale-[1.02] transition-transform duration-300 overflow-hidden">
                <img 
                  src={processedImageUrl} 
                  alt="Confident business professional with laptop and ceramic coffee mug, representing trust and control in QA validation" 
                  className={`w-full h-auto transition-opacity duration-300 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}
                  loading="lazy"
                />
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                    <div className="text-xs text-muted-foreground">Processing...</div>
                  </div>
                )}
              </div>
            </div>
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