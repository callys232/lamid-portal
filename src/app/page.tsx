import Header from "@/component/header";
import ServiceSection from "@/component/serviceSection";
import BusinessInnovationZone from "@/component/BusinessInnovationZone";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <ServiceSection />
      <BusinessInnovationZone />
    </div>
  );
}
