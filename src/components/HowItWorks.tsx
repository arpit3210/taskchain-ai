import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Create Tasks",
    description: "Add your tasks with detailed information and priority levels",
  },
  {
    title: "AI Processing",
    description: "Our AI analyzes and optimizes your task organization",
  },
  {
    title: "Blockchain Verification",
    description: "Tasks are secured and verified on the blockchain",
  },
  {
    title: "Track Progress",
    description: "Monitor completion and earn rewards for productivity",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background h-[94vh] ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Simple steps to revolutionize your task management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div
                className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-ai-primary/10 text-ai-primary mb-4">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;