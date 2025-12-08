import Header from "@/component/header";
import ServiceSection from "@/component/serviceSection";
import BusinessInnovationZone from "@/component/BusinessInnovationZone";
import HumanCapitalDevelopment from "@/component/HumanCapitalDevelopment";
import SustainableDevelopment from "@/component/SustainableDev";
import AboutUs from "@/component/AboutUs";
import Vmo from "@/component/VMO";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <ServiceSection />
      <BusinessInnovationZone />
      <HumanCapitalDevelopment />
      <SustainableDevelopment />
      <AboutUs />
      <Vmo />
    </div>
  );
}
