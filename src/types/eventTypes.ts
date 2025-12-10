// types/events.ts

export interface EventItem {
  id: number;
  title: string;
  description: string;
  images?: {
    path: string;
    alt?: string;
  }[];
  date?: string;
  time?: string;
  location?: string;
  image: string;
}
