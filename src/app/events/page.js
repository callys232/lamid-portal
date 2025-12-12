import EventsHeader from "@/component/Events/eventsHeader";
import EventSummary from "@/component/Events/eventsSummary";
import HcdEvent from "../../component/Humancapital/hcdEvents";
import BusinessPrototypes from "@/component/bizPrototypes/bizPrototypes";
import Testimonial from "@/component/Testimonial";
import Slider from "../../component/slider";

export default async function EventsPage() {
  return (
    <main>
      <EventsHeader />

      <EventSummary />

      <HcdEvent />
      <BusinessPrototypes />
      <Testimonial />
      <Slider />
    </main>
  );
}
