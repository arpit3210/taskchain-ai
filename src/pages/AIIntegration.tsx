import Navbar from "@/components/Navbar";
import { Brain, Sparkles, Zap } from "lucide-react";
import CTA from "@/components/CTA";

const AIIntegration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-br from-ai-dark via-ai-primary to-blockchain-primary">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
            AI Integration
          </h1>
          <p className="text-xl text-white/80 text-center max-w-2xl mx-auto mb-16">
            Experience the power of artificial intelligence in task management
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Brain className="h-12 w-12 text-ai-accent mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white text-center mb-4">Smart Task Analysis</h3>
              <p className="text-white/70 text-center">
                Our AI analyzes your tasks and provides intelligent insights for better productivity
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Sparkles className="h-12 w-12 text-ai-accent mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white text-center mb-4">Automated Prioritization</h3>
              <p className="text-white/70 text-center">
                Let AI help you prioritize tasks based on deadlines, importance, and your work patterns
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <Zap className="h-12 w-12 text-ai-accent mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white text-center mb-4">Smart Suggestions</h3>
              <p className="text-white/70 text-center">
                Receive intelligent suggestions for task optimization and workflow improvements
              </p>
            </div>
          </div>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default AIIntegration;