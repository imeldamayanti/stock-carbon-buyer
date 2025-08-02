import { CompanyDashboard } from "@/components/CompanyDashboard";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Beautiful Hero Landing Section */}
      <HeroSection />
      
      {/* Dashboard Section */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
          <CompanyDashboard />
        </div>
      </div>
    </div>
  );
};

export default Index;
