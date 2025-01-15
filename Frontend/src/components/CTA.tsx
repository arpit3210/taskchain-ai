import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    // <section className="py-24 bg-gradient-to-br from-blockchain-primary to-ai-primary relative overflow-hidden">
    <section className="py-24  relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Task Management?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of users who are already experiencing the future of decentralized task management.
          </p>
          <Button size="lg" className="bg-white text-blockchain-dark hover:bg-white/90 transition-colors">
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;