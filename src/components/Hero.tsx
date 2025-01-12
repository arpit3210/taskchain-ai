import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lock, Smartphone } from "lucide-react";
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Stats from "./Stats";
import TodoistFooter from "./Footer";


const Hero = () => {
  const { user } = useUser();

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#7E69AB] via-[#33C3F0] to-[#0EA5E9]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight animate-fade-up">
            Revolutionize Your Task Management with{" "}
            <span className="bg-gradient-to-r from-[#FEF7CD] to-[#33C3F0] bg-clip-text text-transparent">
              Blockchain & AI
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Experience the future of task management with our decentralized platform powered by artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-up [animation-delay:400ms]">
            <SignedOut>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FEF7CD] to-[#F97316] text-blockchain-dark hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to="/signup">
                  Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-gray-500 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                asChild
              >
                <Link to="/how-it-works">
                  Watch How it Works
                </Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#FEF7CD] to-[#F97316] text-blockchain-dark hover:opacity-90 transition-opacity"
                asChild
              >
                <Link to="/dashboard">
                  Go to My Workspace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-gray-500 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                asChild
              >
                <Link to="/how-it-works">
                  Explore Features
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
        
        <Stats /> 
      </div>
    </div>
  );
};

export default Hero;