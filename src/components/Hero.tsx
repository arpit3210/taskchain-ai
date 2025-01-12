import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Lock, Smartphone } from "lucide-react";
import Stats from "./Stats";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-blockchain-dark via-blockchain-primary to-ai-primary">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
            Revolutionize Your Task Management with{" "}
            <span className="bg-gradient-to-r from-ai-accent to-ai-primary bg-clip-text text-transparent">
              Blockchain & AI
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the future of task management with our decentralized platform powered by artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="bg-white text-blockchain-dark hover:bg-white/90 transition-colors">
              Try Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Watch How it Works
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-float">
              <Lock className="h-8 w-8 text-ai-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Decentralized Security</h3>
              <p className="text-white/70 mt-2">Your tasks are secured by blockchain technology</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-float [animation-delay:200ms]">
              <Brain className="h-8 w-8 text-ai-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white">AI-Powered Intelligence</h3>
              <p className="text-white/70 mt-2">Smart task prioritization and insights</p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-float [animation-delay:400ms]">
              <Smartphone className="h-8 w-8 text-ai-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Seamless Integration</h3>
              <p className="text-white/70 mt-2">Works across all your devices</p>
            </div>
          </div>
        </div>
        
        <Stats />
      </div>
    </div>
  );
};

export default Hero;