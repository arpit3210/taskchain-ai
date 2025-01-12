import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";


const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <HowItWorks />
      </div>

    </div>
  );
};

export default HowItWorksPage;