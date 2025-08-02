import { Button } from "@/components/ui/button";
import ctaImage from "@/assets/cta-workspace.jpg";
import { ArrowRight, Download, Calendar } from "lucide-react";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";

export const CTA = () => {
  const bookCallWebhook = useWebhook({
    source: "cta-section-book-call",
    title: "Book a Call",
    description: "Tell us about your project and we'll schedule a consultation to discuss your QA needs."
  });

  const downloadSampleWebhook = useWebhook({
    source: "cta-section-download-sample",
    title: "Download Sample Report",
    description: "Get a sample QA report to see the quality and detail of our analysis."
  });

  const discoveryCallWebhook = useWebhook({
    source: "cta-section-book-discovery",
    title: "Book Discovery Call",
    description: "Schedule a discovery call to explore how our QA services can benefit your project."
  });

  return (
    <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main CTA */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            Ready to Transform Your QA Process?
          </h2>
          <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
            <strong>48-hour QA validation → Save weeks of rework</strong>
          </p>
          <p className="text-base mb-10 opacity-80 max-w-xl mx-auto">
            Join leading data center developers who trust Valiblox to validate their deliverables 
            before they become costly problems.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
            <Button 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90 border-white font-bold text-base px-6 py-3 w-full sm:w-auto shadow-lg"
              onClick={bookCallWebhook.openModal}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Book a Call
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 font-semibold text-base px-6 py-3 w-full sm:w-auto"
              onClick={downloadSampleWebhook.openModal}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Sample Report
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 font-semibold text-base px-6 py-3 w-full sm:w-auto"
              onClick={discoveryCallWebhook.openModal}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Discovery Call
            </Button>
          </div>
        </div>

        {/* CTA Image Placeholder */}
        <div className="mb-10">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center" 
            alt="Professional woman working on laptop representing QA process transformation"
            className="mx-auto w-80 h-52 object-cover rounded-xl shadow-premium border border-white/20 opacity-90"
          />
        </div>

        {/* Value Reinforcement */}
        <div className="border-t border-white/20 pt-10">
          <h3 className="text-xl font-bold mb-6">
            Why Data Center Leaders Choose Valiblox
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">48h</div>
              <div className="opacity-80 text-sm">Rapid Turnaround</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="opacity-80 text-sm">NDA-Covered Security</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">0</div>
              <div className="opacity-80 text-sm">Software Installation</div>
            </div>
          </div>
        </div>

        {/* Final Value Statement */}
        <div className="mt-10 p-5 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-base font-semibold">
            "We validate the information before it becomes a costly problem"
          </p>
          <p className="mt-1 opacity-80 text-sm">
            Preventing delays, RFIs, rework, and budget overruns for US data center projects
          </p>
        </div>
      </div>

      {/* Webhook Modals */}
      <WebhookModal
        isOpen={bookCallWebhook.isModalOpen}
        onClose={bookCallWebhook.closeModal}
        onSubmit={bookCallWebhook.handleSubmit}
        {...bookCallWebhook.modalProps}
      />
      <WebhookModal
        isOpen={downloadSampleWebhook.isModalOpen}
        onClose={downloadSampleWebhook.closeModal}
        onSubmit={downloadSampleWebhook.handleSubmit}
        {...downloadSampleWebhook.modalProps}
      />
      <WebhookModal
        isOpen={discoveryCallWebhook.isModalOpen}
        onClose={discoveryCallWebhook.closeModal}
        onSubmit={discoveryCallWebhook.handleSubmit}
        {...discoveryCallWebhook.modalProps}
      />
    </section>
  );
};