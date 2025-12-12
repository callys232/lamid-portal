import type { EventItem } from "@/types/eventTypes";

export const mockEvents: EventItem[] = [
  {
    id: 1,
    title: "Leadership Summit 2026",
    description:
      "A gathering of industry leaders to discuss innovation, leadership strategies, and future opportunities.",
    image: "/images/leadership-summit.jpg",
    images: [
      {
        path: "/images/leadership-summit.jpg",
        alt: "Leadership Summit main hall",
      },
      { path: "/images/leadership-panel.jpg", alt: "Panel discussion" },
    ],
    date: "Jan 12, 2026",
    time: "10:00 AM",
    location: "Abuja",
  },
  {
    id: 2,
    title: "Business Growth Workshop",
    description:
      "Hands-on training for entrepreneurs focusing on scaling businesses and leveraging digital tools.",
    image: "/images/business-workshop.jpg",
    images: [
      { path: "/images/business-workshop.jpg", alt: "Workshop session" },
      { path: "/images/business-networking.jpg", alt: "Networking event" },
    ],
    date: "Feb 5, 2026",
    time: "2:00 PM",
    location: "Lagos",
  },
  {
    id: 3,
    title: "Tech Innovation Conference",
    description:
      "Exploring emerging technologies and their impact on African markets, with keynote speakers from global firms.",
    image: "/images/tech-conference.jpg",
    images: [
      { path: "/images/tech-conference.jpg", alt: "Conference keynote" },
      { path: "/images/tech-expo.jpg", alt: "Tech expo booths" },
    ],
    date: "Mar 20, 2026",
    time: "9:00 AM",
    location: "Port Harcourt",
  },
  {
    id: 4,
    title: "Human Capital Development Forum",
    description:
      "Strategies for workforce development, employee engagement, and organizational transformation.",
    image: "/images/hcd-forum.jpg",
    images: [
      { path: "/images/hcd-forum.jpg", alt: "Forum audience" },
      { path: "/images/hcd-panel.jpg", alt: "Panel discussion on HR" },
    ],
    date: "Apr 10, 2026",
    time: "11:00 AM",
    location: "Kano",
  },
];
