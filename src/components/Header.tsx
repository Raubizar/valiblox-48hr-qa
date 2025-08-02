import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleNavigation = (sectionId: string) => {
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
  
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Logo size="md" />
          <div className="text-xl font-bold text-foreground">Valiblox</div>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavigation('process')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Process
          </button>
          <button 
            onClick={() => handleNavigation('reports')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Reports
          </button>
          <a href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <button 
            onClick={() => handleNavigation('benefits')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Benefits
          </button>
          <button 
            onClick={() => handleNavigation('trust')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Trust & Security
          </button>
          <a href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
            Articles
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Download Sample
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-hover">
            Book a Call
          </Button>
        </div>
      </div>
    </header>
  );
};