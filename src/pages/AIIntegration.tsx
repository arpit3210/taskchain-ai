import Navbar from "@/components/Navbar";
import { Brain, Sparkles, Zap } from "lucide-react";


const AIIntegration = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar - 15vh */}
     
        <Navbar />
  

      {/* Hero Section - 85vh */}
      {/* <section className="h-[85vh] relative overflow-hidden bg-gradient-to-br from-ai-primary via-blockchain-primary to-ai-secondary flex items-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI Integration
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the power of artificial intelligence in task management
            </p>
          </div>
        </div>
      </section> */}

      {/* Features Section - 85vh */}
      <section className=" bg-gradient-to-br h-[96vh] from-blockchain-dark to-ai-primary flex items-center">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all duration-300 group animate-fade-up">
              <Brain className="h-12 w-12 text-ai-accent mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold text-white text-center mb-4">
                Smart Task Analysis
              </h3>
              <p className="text-lg text-white/80 text-center leading-relaxed">
                Our AI analyzes your tasks and provides intelligent insights for better productivity
              </p>
            </div>
            
            <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all duration-300 group animate-fade-up [animation-delay:200ms]">
              <Sparkles className="h-12 w-12 text-ai-accent mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold text-white text-center mb-4">
                Automated Prioritization
              </h3>
              <p className="text-lg text-white/80 text-center leading-relaxed">
                Let AI help you prioritize tasks based on deadlines, importance, and your work patterns
              </p>
            </div>
            
            <div className="p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/30 transition-all duration-300 group animate-fade-up [animation-delay:400ms]">
              <Zap className="h-12 w-12 text-ai-accent mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-semibold text-white text-center mb-4">
                Smart Suggestions
              </h3>
              <p className="text-lg text-white/80 text-center leading-relaxed">
                Receive intelligent suggestions for task optimization and workflow improvements
              </p>
            </div>
          </div>
        </div>
      </section>


   
    </div>
  );
};

export default AIIntegration;