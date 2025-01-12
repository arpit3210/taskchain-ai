import { Brain, Lock, Smartphone } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Decentralized Security",
    description: "Your tasks are secured by blockchain technology, ensuring complete privacy and immutability.",
    items: ["Smart contract verification", "Blockchain-backed tasks", "Task hash visualization"],
  },
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Let artificial intelligence optimize your task management and boost productivity.",
    items: ["Priority suggestions", "Smart reminders", "Productivity insights"],
  },
  {
    icon: Smartphone,
    title: "Seamless Integration",
    description: "Access your tasks from anywhere, with perfect synchronization across all devices.",
    items: ["Multiple blockchain support", "Cross-platform sync", "API access"],
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-blockchain-dark to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Experience the perfect blend of security, intelligence, and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <feature.icon className="h-12 w-12 text-ai-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70 mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center text-sm text-foreground/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-ai-secondary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;