import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ValueSnapshot } from "@/components/ValueSnapshot";
import { SimpleProcess } from "@/components/SimpleProcess";
import { TrustStrip } from "@/components/TrustStrip";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Valiblox — Independent QA Validation for Data Center Deliverables in 48 Hours</title>
        <meta name="description" content="Independent QA validation of Data Center design deliverables in 48 hours. Machine-precision checks with expert review. Zero software install, NDA-covered, built for US clients." />
        <link rel="canonical" href={(typeof window!=="undefined"?window.location.origin:"") + "/"} />
        <meta property="og:title" content="Valiblox — Independent QA Validation in 48 Hours" />
        <meta property="og:description" content="Machine-precision checks with expert review. Zero software install, NDA-covered, built for US clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={(typeof window!=="undefined"?window.location.href:"")} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Valiblox',
            url: 'https://valiblox.com/',
            logo: 'https://valiblox.com/favicon.ico',
            sameAs: []
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Valiblox',
            url: 'https://valiblox.com/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://valiblox.com/?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })}
        </script>
      </Helmet>
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
