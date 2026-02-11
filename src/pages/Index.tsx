import CursorFollower from "@/components/CursorFollower";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ReelShowcase from "@/components/ReelShowcase";
import SignatureProjects from "@/components/SignatureProjects";
import BehindCamera from "@/components/BehindCamera";
import ServicesSection from "@/components/ServicesSection";
import ClientReactions from "@/components/ClientReactions";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <CursorFollower />
      <Navbar />
      <HeroSection />
      <ReelShowcase />
      <SignatureProjects />
      <BehindCamera />
      <ServicesSection />
      <ClientReactions />
      <ContactSection />
    </div>
  );
};

export default Index;
