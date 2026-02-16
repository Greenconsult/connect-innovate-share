import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import FormatSection from "@/components/FormatSection";
import AgendaSection from "@/components/AgendaSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <div id="objectives">
        <ObjectivesSection />
      </div>
      <div id="format">
        <FormatSection />
      </div>
      <div id="agenda">
        <AgendaSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Index;
