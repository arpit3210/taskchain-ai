import Navbar from "@/components/Navbar";
import { Book, Code, FileText, MessageSquare } from "lucide-react";
import CTA from "@/components/CTA";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Everything you need to get started with DecentralizedToDo
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="#" className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Book className="h-12 w-12 text-ai-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
              <p className="text-foreground/70">
                Learn the basics and set up your first decentralized task management system
              </p>
            </a>
            
            <a href="#" className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Code className="h-12 w-12 text-ai-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">API Reference</h3>
              <p className="text-foreground/70">
                Detailed API documentation for developers and integrations
              </p>
            </a>
            
            <a href="#" className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <FileText className="h-12 w-12 text-ai-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Guides & Tutorials</h3>
              <p className="text-foreground/70">
                Step-by-step tutorials and best practices for optimal usage
              </p>
            </a>
            
            <a href="#" className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <MessageSquare className="h-12 w-12 text-ai-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community & Support</h3>
              <p className="text-foreground/70">
                Join our community and get help from other users
              </p>
            </a>
          </div>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Documentation;