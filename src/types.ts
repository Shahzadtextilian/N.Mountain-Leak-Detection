export type Page = 'home' | 'water-leak' | 'gas-leak' | 'about' | 'contact' | 'privacy' | 'disclaimer';

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  zip: string;
  serviceType: 'water' | 'gas' | 'both' | 'inspection';
  urgency: 'emergency' | 'today' | 'this_week' | 'quote_only';
  notes: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  text: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  features: string[];
  signsToWatch: string[];
  technologies: string[];
  emergencyAdvice: string[];
}
