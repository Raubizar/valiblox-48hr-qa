import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, FileText } from "lucide-react";
import qaAnalysisImage from "@/assets/qa-analysis-report.jpg";
import complianceImage from "@/assets/compliance-validation.jpg";
import executiveDashboardImage from "@/assets/executive-dashboard.jpg";

const reports = [
  {
    id: 1,
    title: "Comprehensive QA Analysis Report",
    description: "Full validation analysis including structural integrity, code compliance, and design verification with detailed findings and recommendations.",
    image: qaAnalysisImage,
    type: "Technical Analysis",
    pages: "45-60 pages",
    deliverables: ["Issue identification", "Risk assessment", "Compliance verification"]
  },
  {
    id: 2,
    title: "Design Compliance Validation",
    description: "Detailed compliance check against industry standards, building codes, and project specifications with corrective action plans.",
    image: complianceImage,
    type: "Compliance Review",
    pages: "25-35 pages", 
    deliverables: ["Standards verification", "Code compliance", "Specification alignment"]
  },
  {
    id: 3,
    title: "Executive Summary Dashboard",
    description: "High-level executive overview with key findings, risk indicators, and actionable insights for project stakeholders and decision makers.",
    image: executiveDashboardImage,
    type: "Executive Summary",
    pages: "8-12 pages",
    deliverables: ["Key findings", "Risk matrix", "Action priorities"]
  }
];

export const Reports = () => {
  return (
    <section id="reports" className="py-20 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Professional QA Reports
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive, actionable reports tailored to your project needs. 
            Each report is professionally formatted and ready for stakeholder review.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reports.map((report) => (
            <Card key={report.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={report.image} 
                  alt={`${report.title} sample preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                  <FileText className="w-4 h-4" />
                  {report.type}
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {report.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <strong>Length:</strong> {report.pages}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Deliverables:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {report.deliverables.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <Download className="w-4 h-4" />
                      Download Sample
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-card p-8 rounded-lg shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need a Custom Report Format?
            </h3>
            <p className="text-muted-foreground mb-6">
              We can adapt our reporting to match your company's standards and requirements. 
              Discuss your specific needs with our team.
            </p>
            <Button variant="cta" size="lg">
              Request Custom Report Format
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};