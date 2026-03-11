export type UserRole = "founder" | "investor" | "mentor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  mobile?: string;
  bio?: string;
  company?: string;
  location?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: UserRole;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  fundingStage: string;
  location: string;
  teamSize: number;
  funding: string;
  description: string;
  logo: string;
  website?: string;
  revenue?: string;
  growth?: string;
  founded?: string;
}

export interface Investor {
  id: string;
  name: string;
  photo: string;
  fundName: string;
  focusAreas: string[];
  portfolioCount: number;
  location: string;
  stage: string[];
  minTicket: string;
  maxTicket: string;
  bio: string;
}

export interface Mentor {
  id: string;
  name: string;
  photo: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  feePerHour: number;
  bio: string;
  company: string;
  experience: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  startup: string;
  quote: string;
  avatar: string;
  rating: number;
}
