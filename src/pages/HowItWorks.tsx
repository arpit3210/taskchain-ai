import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <HowItWorks />
      </div>
      <CTA />
    </div>
  );
};

export default HowItWorksPage;