import Navbar from "@/components/Navbar";
import Features from "@/components/Features";


const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <Features />
      </div>
 
    </div>
  );
};

export default FeaturesPage;