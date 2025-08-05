import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";
import { 
  FileText, 
  CheckCircle, 
  RotateCcw, 
  Layers, 
  Zap, 
  Shield, 
  Settings, 
  Clock, 
  DollarSign,
  Download,
  ArrowRight
} from "lucide-react";

// Import images
import pricingChart from "@/assets/ChatGPT Image Aug 5, 2025, 11_29_30 AM.png";
import blueprintImage from "@/assets/pricing/blueprint-validated.jpg";
import modelImage from "@/assets/pricing/3d-model-annotated.jpg";
import stampImage from "@/assets/pricing/validated-stamp.jpg";
import toolboxImage from "@/assets/pricing/custom-toolbox.jpg";
import pmImage from "@/assets/pricing/confident-pm.jpg";

const Pricing = () => {
  const submitPackageWebhook = useWebhook({
    source: "pricing-submit-package",
    title: "Submit Your Package",
    description: "Tell us about your project and we'll provide professional QA validation that prevents costly rework and schedule delays."
  });

  const downloadSampleWebhook = useWebhook({
    source: "pricing-download-sample",
    title: "Download Sample Report",
    description: "Get a sample QA report to see the quality and detail of our analysis."
  });

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Introduction Banner */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                {/* Main Headline */}
                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground leading-tight tracking-tight">
                  <span className="text-primary bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                    Pricing Aligned to Real QA Costs
                  </span>
                </h1>

                {/* Subheadline */}
                <div className="text-sm md:text-sm lg:text-base text-muted-foreground leading-relaxed font-normal space-y-2">
                  <p>Compare manual QA time & risk vs our 48h independent validation.</p>
                  <p>Stop burning weeks on coordination—get professional results in 2 days.</p>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Clock className="w-3 h-3 text-primary" />
                    48h delivery
                  </div>
                  <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <Shield className="w-3 h-3 text-primary" />
                    One free re-check
                  </div>
                  <div className="glass-effect px-2 py-1 rounded-full flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                    <CheckCircle className="w-3 h-3 text-primary" />
                    Professional validation
                  </div>
                </div>

                {/* Cost Banner */}
                <div className="glass-effect p-4 rounded-xl max-w-xl">
                  <p className="text-sm text-foreground mb-1 font-medium">
                    Manual QA & rework for a Data Center stage runs $8 000+ per phase. 
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-primary font-semibold">Valiblox delivers in 48 h for $990–$2 990.</span>
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src={pricingChart} 
                  alt="Cost comparison: Manual QA vs Valiblox" 
                  className="w-full max-w-xs lg:max-w-sm h-auto rounded-lg shadow-apple-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">


            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Choose Your QA Package
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each package builds on the previous, delivering comprehensive validation 
                at every stage of your data center project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Basic QA Package */}
              <Card className="relative border-2 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Re-check Badge */}
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    Includes 1 Free Re-check
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">Stage 2</Badge>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">$990</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">Stage 2 – Concept QA</CardTitle>
                  <p className="text-muted-foreground">Drawings & specs validation</p>
                  <p className="text-sm text-primary font-medium mt-2">We inspect & report—your consultants handle fixes</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <img 
                      src={blueprintImage} 
                      alt="Blueprint with validation checkmarks" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Enforce naming & version rules</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Validate drawing list instantly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Ensure title-block accuracy</span>
                    </div>
                  </div>
                  
                  {/* Trust Icons */}
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">NDA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">48h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Expert</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-xs text-muted-foreground italic">
                      Independent QA workflow already deployed across several hyperscale and colocation builds in Europe—client details protected by NDA.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-light rounded-lg mb-6">
                    <p className="text-sm font-medium text-primary">
                      Save 5–8 days of manual QA & avoid rework costs
                    </p>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-xs text-muted-foreground font-medium">Includes 1 Free Re-Check</p>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Secure Stage 2 QA
                  </Button>
                </CardContent>
              </Card>

              {/* Full QA Package */}
              <Card className="relative border-2 border-primary hover:border-primary transition-all duration-300 h-full">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                
                {/* Re-check Badge */}
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    Includes 1 Free Re-check
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">Stage 3</Badge>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">$1,990</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">Stage 3 – Developed QA</CardTitle>
                  <p className="text-muted-foreground">Includes Concept + model LOD, clash summary</p>
                  <p className="text-sm text-primary font-medium mt-2">We inspect & report—your consultants handle fixes</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <img 
                      src={modelImage} 
                      alt="3D model with professional annotations" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Model LOD/LOI compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Clash-risk summary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">All Stage 2 items</span>
                    </div>
                  </div>
                  
                  {/* Trust Icons */}
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">NDA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">48h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Expert</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-xs text-muted-foreground italic">
                      Independent QA workflow already deployed across several hyperscale and colocation builds in Europe—client details protected by NDA.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-light rounded-lg mb-6">
                    <p className="text-sm font-medium text-primary">
                      Replace 10+ days of coordination with one 48h report
                    </p>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-xs text-muted-foreground font-medium">Includes 1 Free Re-Check</p>
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary-hover">
                    Secure Stage 3 QA
                  </Button>
                </CardContent>
              </Card>

              {/* IFC Compliance Validation Package */}
              <Card className="relative border-2 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Re-check Badge */}
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" />
                    Includes 1 Free Re-check
                  </Badge>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">Stage 4</Badge>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">$2,990</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground">Stage 4 – Technical QA</CardTitle>
                  <p className="text-muted-foreground">Full IFC-ready compliance check</p>
                  <p className="text-sm text-primary font-medium mt-2">We inspect & report—your consultants handle fixes</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-6">
                    <img 
                      src={stampImage} 
                      alt="Technical drawing with validation stamp" 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Revision & metadata control</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">IFC-ready compliance summary</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">All Stage 3 items</span>
                    </div>
                  </div>
                  
                  {/* Trust Icons */}
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">NDA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">48h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Expert</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-6">
                    <p className="text-xs text-muted-foreground italic">
                      Independent QA workflow already deployed across several hyperscale and colocation builds in Europe—client details protected by NDA.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary-light rounded-lg mb-6">
                    <p className="text-sm font-medium text-primary">
                      Prevent late-stage RFIs and schedule slips
                    </p>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-xs text-muted-foreground font-medium">Includes 1 Free Re-Check</p>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Secure Stage 4 QA
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Risk Banner Below Pricing - Desktop */}
            <div className="glass-effect p-6 rounded-xl border border-destructive/20 mb-12 text-center hidden md:block">
              <p className="text-lg font-medium text-foreground">
                A single deliverable error on a $50 M project can cost up to 
                <span className="text-destructive font-semibold"> $500 k in rework and delays.</span>
                <span className="text-primary font-semibold"> Valiblox nips issues in 48 h.</span>
              </p>
            </div>

            {/* Custom Package Card */}
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Settings className="w-8 h-8 text-primary" />
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Custom QA Package</h3>
                          <p className="text-sm text-muted-foreground">Tailored multi-stage QA & enterprise integrations</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        Need multi-stage validation or bespoke QA requirements? 
                        Let's tailor a plan that fits your specific project needs and timeline.
                      </p>
                      
                      {/* Mobile Banners - Both banners near Custom Package */}
                      <div className="md:hidden space-y-4 mb-6">
                        <div className="glass-effect p-4 rounded-lg border border-primary/20 text-center">
                          <p className="text-sm font-medium text-foreground">
                            Manual QA & rework runs $8 000+ per phase. 
                            <span className="text-primary font-semibold"> Valiblox delivers in 48 h for $990–$2 990.</span>
                          </p>
                        </div>
                        <div className="glass-effect p-4 rounded-lg border border-destructive/20 text-center">
                          <p className="text-sm font-medium text-foreground">
                            A single error on a $50 M project can cost up to 
                            <span className="text-destructive font-semibold"> $500 k in rework.</span>
                            <span className="text-primary font-semibold"> Valiblox nips issues in 48 h.</span>
                          </p>
                        </div>
                      </div>
                      
                      <Button className="bg-primary hover:bg-primary-hover">
                        Discuss Custom QA
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <img 
                        src={toolboxImage} 
                        alt="Custom QA toolbox" 
                        className="max-w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee & Anchor Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Your QA Investment vs Manual Costs
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Manual QA for a Data Center stage can cost $3,000–10,000 in labour, coordination, 
              and rework—Valiblox delivers professional validation in 48h and includes one free re-check 
              to ensure you get exactly what you need.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">48 Hours</div>
                  <div className="text-sm text-muted-foreground">Professional delivery</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">Fixed Price</div>
                  <div className="text-sm text-muted-foreground">No hourly surprises</div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">Guaranteed</div>
                  <div className="text-sm text-muted-foreground">One free re-check</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  Ready to de-risk your <span className="text-primary">next submission?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Stop gambling with manual QA processes. Get professional validation 
                  that prevents costly rework and schedule delays.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover" onClick={submitPackageWebhook.openModal}>
                    Get Your 48 h QA Report
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={downloadSampleWebhook.openModal}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample Report
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src={pmImage} 
                  alt="Confident project manager with tablet" 
                  className="max-w-full h-auto rounded-lg shadow-apple-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Webhook Modals */}
      <WebhookModal
        isOpen={submitPackageWebhook.isModalOpen}
        onClose={submitPackageWebhook.closeModal}
        onSubmit={submitPackageWebhook.handleSubmit}
        {...submitPackageWebhook.modalProps}
      />
      <WebhookModal
        isOpen={downloadSampleWebhook.isModalOpen}
        onClose={downloadSampleWebhook.closeModal}
        onSubmit={downloadSampleWebhook.handleSubmit}
        {...downloadSampleWebhook.modalProps}
      />
    </main>
  );
};

export default Pricing;