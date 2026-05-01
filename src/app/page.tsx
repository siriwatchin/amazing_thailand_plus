import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RouteDemo from "@/components/RouteDemo";
import AIRouteBuilder from "@/components/AIRouteBuilder";
import AIGuideChat from "@/components/AIGuideChat";
import PriceComparison from "@/components/PriceComparison";
import TrustLayer from "@/components/TrustLayer";
import DigitalPassport from "@/components/DigitalPassport";
import SafetyLayer from "@/components/SafetyLayer";
import FinalCTA from "@/components/FinalCTA";
import { ThaiSectionDivider } from "@/components/ThaiOrnament";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-page">
      <Navbar />
      <Hero />
      <RouteDemo />
      <div className="bg-page py-2"><ThaiSectionDivider /></div>
      <AIRouteBuilder />
      <AIGuideChat />
      <div className="bg-page py-2"><ThaiSectionDivider /></div>
      <PriceComparison />
      <TrustLayer />
      <DigitalPassport />
      <div className="bg-page py-2"><ThaiSectionDivider /></div>
      <SafetyLayer />
      <FinalCTA />
    </main>
  );
}
