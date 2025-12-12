// types/events.ts
export interface EventItem {
  id: number;
  title: string;
  description: string;
  image: string; // primary thumbnail
  images?: {
    path: string;
    alt?: string;
  }[]; // optional gallery
  date?: string;
  time?: string;
  location?: string;
}
