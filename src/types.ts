export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  agentNumber: number;
  title: string;
  category: string;
  description: string;
  notionUrl?: string;
  loomUrl?: string;
  images: string[];
  mockupSlides: {
    title: string;
    description: string;
    metrics: string;
  }[];
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  iconName: 'repurposing' | 'outreach' | 'scraping';
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  badge: string;
}

export interface ClientTier {
  tier: string;
  description: string;
  deliverables: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    avatarUrl: string;
    provider: 'google' | 'github';
  } | null;
  accessToken: string | null;
}
