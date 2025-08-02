import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import qaAnalysisImage from "@/assets/qa-analysis-report.jpg";
import complianceImage from "@/assets/compliance-validation.jpg";
import executiveDashboardImage from "@/assets/executive-dashboard.jpg";

const reports = [
  {
    id: 1,
    title: "Basic QA Validation Report",
    description: "Comprehensive drawings and specification review with compliance verification and actionable recommendations for Stage 2 submissions.",
    image: qaAnalysisImage,
    type: "Basic QA Package",
    stage: "Stage 2",
    slug: "basic-qa-validation",
    deliverables: ["Drawing validation", "Specification compliance", "Issue identification", "Correction recommendations"]
  },
  {
    id: 2,
    title: "Full QA Analysis Report",
    description: "Complete validation including 3D model LOD verification, clash detection summary, and comprehensive design coordination analysis.",
    image: complianceImage,
    type: "Full QA Package",
    stage: "Stage 3",
    slug: "full-qa-analysis",
    deliverables: ["All Basic QA features", "3D model validation", "Clash detection report", "LOD verification", "Coordination analysis"]
  },
  {
    id: 3,
    title: "IFC Compliance Validation Report",
    description: "Final IFC-ready compliance check with complete project validation, metadata verification, and submission-ready documentation.",
    image: executiveDashboardImage,
    type: "IFC Compliance Package",
    stage: "Stage 4",
    slug: "ifc-compliance-validation",
    deliverables: ["All previous features", "IFC compliance validation", "Metadata verification", "Final submission review", "Executive summary"]
  }
];

export const Reports = () => {
  return (
    <section id="reports" className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
            QA Reports by Package
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each pricing package delivers a comprehensive report tailored to your project stage and validation requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reports.map((report) => (
            <Card key={report.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={report.image} 
                  alt={report.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {report.stage}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {report.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {report.description}
                </CardDescription>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                  <span className="font-medium text-primary">{report.type}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
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
                      <Download className="w-4 h-4" />
                      Sample
                    </Button>
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <Link to={`/reports/${report.slug}`}>
                        <ArrowRight className="w-4 h-4" />
                        View Details
                      </Link>
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