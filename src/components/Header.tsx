import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useWebhook } from "@/hooks/useWebhook";
import { WebhookModal } from "@/components/WebhookModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const downloadSampleWebhook = useWebhook({
    source: "header-download-sample",
    title: "Download Sample",
    description: "Get a sample QA report to see the quality and detail of our analysis."
  });

  const bookCallWebhook = useWebhook({
    source: "header-book-call",
    title: "Book a Call",
    description: "Schedule a consultation to discuss your QA needs and project requirements."
  });

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false); // Close mobile menu when navigating
    if (isHomePage) {
      // If on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on subpage, navigate to homepage then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Close mobile menu when clicking links
  };
  
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Logo size="md" />
          <div className="text-lg font-bold text-foreground">Valiblox</div>
        </a>
        
        <nav className="hidden md:flex items-center gap-5">
          <button 
            onClick={() => handleNavigation('process')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Process
          </button>
          <button 
            onClick={() => handleNavigation('value')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Value
          </button>
          <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Pricing
          </a>
          <a href="/check" className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            Free Check
          </a>
          <a href="/articles" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Articles
          </a>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" onClick={downloadSampleWebhook.openModal}>
            Download Sample
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-hover" onClick={bookCallWebhook.openModal}>
            Book a Call
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('process')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Process
              </button>
              <button 
                onClick={() => handleNavigation('value')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Value
              </button>
              <a 
                href="/pricing" 
                onClick={handleLinkClick}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Pricing
              </a>
              <a 
                href="/check" 
                onClick={handleLinkClick}
                className="text-primary hover:text-primary/80 transition-colors py-2 font-medium"
              >
                Free Check
              </a>
              <a 
                href="/articles" 
                onClick={handleLinkClick}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Articles
              </a>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => { downloadSampleWebhook.openModal(); setIsMenuOpen(false); }}>
                  Download Sample
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary-hover" onClick={() => { bookCallWebhook.openModal(); setIsMenuOpen(false); }}>
                  Book a Call
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Webhook Modals */}
      <WebhookModal
        isOpen={downloadSampleWebhook.isModalOpen}
        onClose={downloadSampleWebhook.closeModal}
        onSubmit={downloadSampleWebhook.handleSubmit}
        {...downloadSampleWebhook.modalProps}
      />
      <WebhookModal
        isOpen={bookCallWebhook.isModalOpen}
        onClose={bookCallWebhook.closeModal}
        onSubmit={bookCallWebhook.handleSubmit}
        {...bookCallWebhook.modalProps}
      />
    </header>
  );
};