import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Mail, MapPin, Phone, Linkedin, Twitter, Globe, FileText, Shield, Clock } from "lucide-react";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";

export const Footer = () => {
  const qaReportWebhook = useWebhook({
    source: "footer-qa-report",
    title: "Get Your 48 h QA Report",
    description: "Request your comprehensive QA validation report for data center deliverables."
  });

  return (
    <>
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Logo size="md" />
                <div className="text-lg font-bold">Valiblox</div>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Leading provider of comprehensive QA analysis and validation services for data center infrastructure and design compliance.
              </p>
              <div className="flex items-center gap-4">
                <Linkedin className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Globe className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Services</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">QA Validation Reports</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Compliance Analysis</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Design Review</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Executive Dashboards</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Resources</h3>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Industry Standards</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Best Practices</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Contact</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-slate-400" />
                  <span className="text-slate-300">team@valiblox.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span className="text-slate-300">Dublin, Ireland</span>
                </div>
              </div>
              <Button size="sm" className="w-full bg-primary hover:bg-primary-hover" onClick={qaReportWebhook.openModal}>
                Get Your 48 h QA Report
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Elements Bar */}
        <div className="border-t border-slate-700 bg-slate-800/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Shield className="w-4 h-4 text-primary" />
                <span>NDA-Protected</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="w-4 h-4 text-primary" />
                <span>Expert-Reviewed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-primary" />
                <span>Data Security Certified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-primary" />
                <span>team@valiblox.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
              <div>
                © 2024 Valiblox. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a href="/policies#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="/policies#terms" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="/policies#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Webhook Modal */}
      <WebhookModal
        isOpen={qaReportWebhook.isModalOpen}
        onClose={qaReportWebhook.closeModal}
        onSubmit={qaReportWebhook.handleSubmit}
        {...qaReportWebhook.modalProps}
      />
    </>
  );
};