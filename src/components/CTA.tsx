import { Button } from "@/components/ui/button";
import ctaImage from "@/assets/cta-workspace.jpg";
import { ArrowRight, Download, Calendar } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Main CTA */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your QA Process?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            <strong>48-hour QA validation → Save weeks of rework</strong>
          </p>
          <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
            Join leading data center developers who trust Valiblox to validate their deliverables 
            before they become costly problems.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 border-white font-bold text-lg px-8 py-4 w-full sm:w-auto shadow-lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Get a Quote
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 w-full sm:w-auto"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Sample Report
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-white hover:bg-white/10 font-semibold text-lg px-8 py-4 w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Discovery Call
            </Button>
          </div>
        </div>

        {/* CTA Image Placeholder */}
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center" 
            alt="Professional woman working on laptop representing QA process transformation"
            className="mx-auto w-96 h-64 object-cover rounded-xl shadow-premium border border-white/20 opacity-90"
          />
        </div>

        {/* Value Reinforcement */}
        <div className="border-t border-white/20 pt-12">
          <h3 className="text-2xl font-bold mb-8">
            Why Data Center Leaders Choose Valiblox
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">48h</div>
              <div className="opacity-80">Rapid Turnaround</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="opacity-80">NDA-Covered Security</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="opacity-80">Software Installation</div>
            </div>
          </div>
        </div>

        {/* Final Value Statement */}
        <div className="mt-12 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
          <p className="text-lg font-semibold">
            "We validate the information before it becomes a costly problem"
          </p>
          <p className="mt-2 opacity-80">
            Preventing delays, RFIs, rework, and budget overruns for US data center projects
          </p>
        </div>
      </div>
    </section>
  );
};