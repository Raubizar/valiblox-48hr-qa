import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ValueSnapshot } from "@/components/ValueSnapshot";
import { SimpleProcess } from "@/components/SimpleProcess";
import { TrustStrip } from "@/components/TrustStrip";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueSnapshot />
      <SimpleProcess />
      <TrustStrip />
      <CTA />
      
      {/* Pricing Link Section */}
      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Button variant="outline" asChild>
            <a href="/pricing" className="inline-flex items-center gap-2">
              Curious about costs? See how we compare to manual QA
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>
      
      <Footer />
    </main>
  );
};

export default Index;
