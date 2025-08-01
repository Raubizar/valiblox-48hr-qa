import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <div className="text-xl font-bold text-foreground">Valiblox</div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
            Process
          </a>
          <a href="#reports" className="text-muted-foreground hover:text-foreground transition-colors">
            Reports
          </a>
          <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">
            Benefits
          </a>
          <a href="#trust" className="text-muted-foreground hover:text-foreground transition-colors">
            Trust & Security
          </a>
          <a href="/articles" className="text-muted-foreground hover:text-foreground transition-colors">
            Articles
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:inline-flex">
            Download Sample
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary-hover">
            Submit Project
          </Button>
        </div>
      </div>
    </header>
  );
};