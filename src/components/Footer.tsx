import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Mail, MapPin, Phone, Linkedin, Twitter, Globe, FileText, Shield, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div className="text-xl font-bold">Valiblox</div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Leading provider of comprehensive QA analysis and validation services for data center infrastructure and design compliance.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#process" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><FileText className="h-4 w-4" />QA Analysis</a></li>
              <li><a href="#reports" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Shield className="h-4 w-4" />Compliance Review</a></li>
              <li><a href="#benefits" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"><Clock className="h-4 w-4" />Design Validation</a></li>
              <li><a href="#trust" className="text-slate-300 hover:text-white transition-colors">Risk Assessment</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Code Compliance</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/articles" className="text-slate-300 hover:text-white transition-colors">Articles & Insights</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">White Papers</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Industry Standards</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <a href="mailto:team@valiblox.com" className="text-slate-300 hover:text-white transition-colors">
                  team@valiblox.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">+353 1 234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300">Dublin, Ireland</span>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary-hover">
              Book a Call
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 bg-slate-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>
              © 2024 Valiblox. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="/policies#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/policies#terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/policies#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};