import EventsHeader from "@/component/Events/eventsHeader";
import BusinessPrototypes from "@/component/bizPrototypes/bizPrototypes";
import Testimonial from "@/component/Testimonial";
import Slider from "../../component/slider";
import EventList from "@/component/Events/EventsList";
import Allevents from "@/component/Events/allEvents";

export default async function EventsPage() {
  return (
    <main>
      <EventsHeader />
      <Allevents />
      <EventList />
      <BusinessPrototypes />
      <Testimonial />
      <Slider />
    </main>
  );
}
