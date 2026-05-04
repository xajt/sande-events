// Theme types
export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  colors: string;
  accent: string;
  occasions: string[];
  category: string;
}

// Gallery types
export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  gradient: string;
  emoji: string;
  description: string;
  image?: string;
}

// Offering/Pricing types
export interface OfferingTier {
  name: string;
  tagline: string;
  price: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  popular?: boolean;
  features: string[];
  excluded: string[];
  ideal: string;
}

// Testimonial types
export interface Testimonial {
  text: string;
  author: string;
  occasion: string;
  rating: number;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  date: string;
  message: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Feature types
export interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

// Category filter types
export interface CategoryFilter {
  id: string;
  label: string;
  emoji: string;
}
