import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import CTA from "@/components/CTA";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Up to 10 tasks",
      "Basic AI suggestions",
      "Community support",
      "1 blockchain network",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for professionals",
    features: [
      "Unlimited tasks",
      "Advanced AI features",
      "Priority support",
      "Multiple blockchain networks",
      "API access",
      "Custom integrations",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom deployment",
      "SLA guarantee",
      "Advanced security",
      "Custom AI training",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blockchain-primary to-ai-primary bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-foreground/70 text-center max-w-2xl mx-auto mb-16">
            Choose the plan that best fits your needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="p-8 rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}</div>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                <Button className="w-full mb-8">Get Started</Button>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default Pricing;