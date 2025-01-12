import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            DecentralizedToDo
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/ai-integration" className="text-foreground/80 hover:text-foreground transition-colors">
            AI Integration
          </Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/documentation" className="text-foreground/80 hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Button className="bg-gradient-to-r from-blockchain-primary to-ai-primary hover:opacity-90 transition-opacity">
            Get Started
          </Button>
        </div>
        
        <button className="md:hidden p-2">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;