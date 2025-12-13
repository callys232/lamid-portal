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
  category?: string;
  eventTitle?: string;
}

export interface EventModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}
export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  uploadedAt: string;
}
