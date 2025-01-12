import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            DecentralizedToDo
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </a>
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