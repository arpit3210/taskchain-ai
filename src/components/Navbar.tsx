import React from 'react';
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  SignedIn, 
  SignedOut, 
  UserButton,
  useUser 
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            DecentralizedToDo
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/features" className="text-sm font-medium hover:text-blockchain-primary transition-colors">
            Features
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-blockchain-primary transition-colors">
            How It Works
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-blockchain-primary transition-colors">
            Pricing
          </Link>
        </div>

        {/* Authentication and CTA Buttons */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link to="/login">
              <Button 
                className="bg-gradient-to-r from-blockchain-primary to-ai-primary hover:opacity-90 transition-opacity mr-2"
                size="sm"
              >
                Get Started
              </Button>
            </Link>
    
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard">
              <Button 
                className="bg-gradient-to-r from-blockchain-primary to-ai-primary hover:opacity-90 transition-opacity mr-2"
                size="sm"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonPopoverCard: "bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl",
                  userButtonPopoverFooter: "hidden",
                }
              }} 
            />
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;