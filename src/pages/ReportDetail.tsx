import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, CheckCircle, FileText, BarChart3, AlertTriangle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";
import qaAnalysisImage from "@/assets/qa-analysis-report.jpg";
import complianceImage from "@/assets/compliance-validation.jpg";
import executiveDashboardImage from "@/assets/executive-dashboard.jpg";
import analyticsImage from "@/assets/analytics-dashboard.jpg";
import { Helmet } from "react-helmet";

const reportData = {
  "basic-qa-validation": {
    title: "Basic QA Validation Report",
    stage: "Stage 2",
    type: "Basic QA Package",
    description: "Comprehensive drawings and specification review with compliance verification and actionable recommendations.",
    heroImage: qaAnalysisImage,
    sections: [
      {
        title: "Project Overview & Validation Summary",
        description: "Executive summary of key findings and validation status",
        image: executiveDashboardImage,
        content: [
          "Project compliance scorecard with clear pass/fail indicators",
          "Executive summary highlighting critical issues requiring immediate attention", 
          "Overall project health assessment with risk categorization",
          "Recommended next steps and timeline for addressing findings"
        ]
      },
      {
        title: "Drawing & Specification Analysis",
        description: "Detailed technical review of all submitted documentation",
        image: qaAnalysisImage,
        content: [
          "Line-by-line drawing validation against current standards",
          "Specification compliance verification with code references",
          "Identification of missing or incomplete documentation",
          "Cross-reference validation between drawings and specifications"
        ]
      },
      {
        title: "Issue Identification & Recommendations",
        description: "Actionable findings with prioritized correction strategies",
        image: complianceImage,
        content: [
          "Categorized issue list with severity levels (Critical/High/Medium/Low)",
          "Specific correction recommendations with implementation guidance",
          "Code compliance gaps with exact regulation references",
          "Estimated impact assessment for each identified issue"
        ]
      }
    ],
    value: [
      "Reduce costly design revisions by catching issues early in Stage 2",
      "Ensure first-time approval with comprehensive compliance verification",
      "Save 2-4 weeks of project timeline through proactive issue identification",
      "Minimize construction phase surprises and cost overruns"
    ],
    deliverables: [
      "Comprehensive validation report",
      "Drawing validation checklist with pass/fail status",
      "Specification compliance matrix",
      "Prioritized issue register with correction recommendations",
      "Executive summary for stakeholder communication"
    ]
  },
  "full-qa-analysis": {
    title: "Full QA Analysis Report", 
    stage: "Stage 3",
    type: "Full QA Package",
    description: "Complete validation including 3D model LOD verification, clash detection, and comprehensive design coordination analysis.",
    heroImage: complianceImage,
    sections: [
      {
        title: "Comprehensive Project Analysis",
        description: "Complete validation covering all aspects of the design package",
        image: analyticsImage,
        content: [
          "All Basic QA validation features plus advanced 3D model analysis",
          "Level of Development (LOD) verification for all model elements",
          "Complete design coordination assessment across all disciplines",
          "Advanced compliance verification including complex geometric requirements"
        ]
      },
      {
        title: "3D Model Validation & Clash Detection",
        description: "Advanced BIM model analysis with comprehensive clash detection",
        image: executiveDashboardImage,
        content: [
          "Automated clash detection with intelligent filtering and prioritization",
          "LOD verification ensuring model elements meet required detail levels",
          "Geometric accuracy validation against design intent",
          "Model completeness assessment with gap identification"
        ]
      },
      {
        title: "Design Coordination Analysis",
        description: "Multi-disciplinary coordination review and optimization recommendations",
        image: qaAnalysisImage,
        content: [
          "Cross-discipline coordination verification (Architecture, Structure, MEP)",
          "Space allocation and clearance validation",
          "System integration analysis with conflict resolution strategies", 
          "Constructability review with practical implementation guidance"
        ]
      }
    ],
    value: [
      "Eliminate 90%+ of coordination issues before construction begins",
      "Reduce construction change orders by identifying conflicts early",
      "Accelerate approval processes with comprehensive pre-validated submissions",
      "Minimize field coordination time through accurate pre-construction planning"
    ],
    deliverables: [
      "Detailed analysis report with visual documentation",
      "3D clash detection report with prioritized resolution strategies",
      "LOD verification matrix with compliance status for all elements",
      "Design coordination assessment with cross-discipline recommendations",
      "Advanced issue register with constructability impact analysis"
    ]
  },
  "ifc-compliance-validation": {
    title: "IFC Compliance Validation Report",
    stage: "Stage 4", 
    type: "IFC Compliance Package",
    description: "Final IFC-ready compliance check with complete project validation, metadata verification, and submission-ready documentation.",
    heroImage: executiveDashboardImage,
    sections: [
      {
        title: "Complete Project Validation",
        description: "Final comprehensive review ensuring submission readiness",
        image: complianceImage,
        content: [
          "All previous validation features plus final submission preparation",
          "Complete IFC model validation with schema compliance verification",
          "Final design freeze validation ensuring no outstanding issues",
          "Submission package completeness verification"
        ]
      },
      {
        title: "IFC Compliance & Metadata Verification",
        description: "Advanced IFC schema validation and metadata quality assurance",
        image: analyticsImage,
        content: [
          "IFC schema compliance verification with automated validation tools",
          "Metadata completeness and accuracy verification",
          "Property set validation ensuring all required data is present",
          "Classification system compliance (Uniclass, OmniClass, etc.)"
        ]
      },
      {
        title: "Final Submission Package",
        description: "Complete submission-ready documentation with executive reporting",
        image: executiveDashboardImage,
        content: [
          "Final submission checklist with compliance confirmation",
          "Executive summary for senior stakeholders and approval authorities",
          "Complete audit trail documentation for compliance verification",
          "Post-submission support documentation and issue resolution protocols"
        ]
      }
    ],
    value: [
      "Guarantee first-time approval with comprehensive final validation",
      "Eliminate submission delays through complete compliance verification",
      "Provide confidence to senior stakeholders with executive-level reporting",
      "Ensure long-term project success with complete documentation audit trail"
    ],
    deliverables: [
      "Comprehensive final validation report",
      "IFC compliance certificate with detailed validation results",
      "Complete metadata verification report",
      "Executive summary with project approval readiness confirmation",
      "Final submission checklist with compliance documentation"
    ]
  }
};

export default function ReportDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const downloadSampleWebhook = useWebhook({
    source: `report-detail-${slug}-download-sample`,
    title: "Download Sample Report",
    description: `Get a sample report to see the quality and detail of our analysis.`
  });

  const getReportWebhook = useWebhook({
    source: `report-detail-${slug}-get-report`,
    title: "Get This Report",
    description: `Request this specific report for your project.`
  });

  if (!slug || !reportData[slug as keyof typeof reportData]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Report Not Found</h1>
            <p className="text-muted-foreground mb-8">The requested report could not be found.</p>
            <Button asChild>
              <Link to="/#reports">Back to Reports</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const report = reportData[slug as keyof typeof reportData];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{report.title} - Detailed Report Analysis | Valiblox</title>
        <meta name="description" content={`Learn about our ${report.title} - ${report.description}. Detailed scope, results, and value proposition for your construction project.`} />
        <meta name="keywords" content={`${report.title}, QA validation, construction reports, BIM analysis, ${report.stage}`} />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/#reports">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reports
              </Link>
            </Button>
            <Badge variant="secondary">{report.stage}</Badge>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {report.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {report.description}
              </p>
              <div className="flex gap-4">
                <Button variant="cta" size="lg" onClick={downloadSampleWebhook.openModal}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Sample Report
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={report.heroImage} 
                alt={report.title}
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">
            What's Included in This Report
          </h2>
          
          <div className="space-y-16">
            {report.sections.map((section, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {section.description}
                  </p>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">
            Real Value for Your Project
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {report.value.map((item, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground font-medium">{item}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">
            Complete Deliverables Package
          </h2>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                {report.title} - Complete Package
              </CardTitle>
              <CardDescription>
                Everything you need for successful project validation and approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {report.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">{deliverable}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-4 mt-8 pt-6 border-t border-border">
                <Button variant="cta" size="lg" className="flex-1" onClick={getReportWebhook.openModal}>
                  <Download className="w-5 h-5 mr-2" />
                  Get This Report
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">
                    View All Packages
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      {/* Webhook Modals */}
      <WebhookModal
        isOpen={downloadSampleWebhook.isModalOpen}
        onClose={downloadSampleWebhook.closeModal}
        onSubmit={downloadSampleWebhook.handleSubmit}
        {...downloadSampleWebhook.modalProps}
      />
      <WebhookModal
        isOpen={getReportWebhook.isModalOpen}
        onClose={getReportWebhook.closeModal}
        onSubmit={getReportWebhook.handleSubmit}
        {...getReportWebhook.modalProps}
      />
    </div>
  );
}