import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Features />
      </div>
      <CTA />
    </div>
  );
};

export default FeaturesPage;