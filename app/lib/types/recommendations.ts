export type RecommendationType = 'course' | 'job' | 'event';
export type RecommendationPriority = 'high' | 'medium' | 'low';

export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface BaseRecommendation {
  id: string;
  title: string;
  description: string;
  type: RecommendationType;
  skills: Skill[];
  matchScore: number;
  popularity: number;
  deadline?: string;
  provider?: string;
  location?: string;
  imageUrl?: string;
}

export interface CourseRecommendation extends BaseRecommendation {
  type: 'course';
  duration: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  prerequisites?: string[];
  completionRate: number;
  rating: number;
  reviews: number;
  syllabus: string[];
  startDate?: string;
  price?: number;
}

export interface JobRecommendation extends BaseRecommendation {
  type: 'job';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'intern' | 'junior' | 'middle' | 'senior' | 'lead';
  workMode: 'office' | 'remote' | 'hybrid';
  applicationDeadline?: string;
  competitionLevel: number;
  predictedSuccess: number;
  companyInfo: {
    name: string;
    logo?: string;
    industry: string;
    size: string;
    rating?: number;
  };
}

export interface EventRecommendation extends BaseRecommendation {
  type: 'event';
  eventType: 'workshop' | 'conference' | 'hackathon' | 'meetup' | 'webinar';
  startDate: string;
  endDate: string;
  format: 'online' | 'offline' | 'hybrid';
  capacity?: number;
  registeredCount: number;
  speakers: Array<{
    name: string;
    title: string;
    company: string;
    avatar?: string;
  }>;
  agenda?: string[];
  price?: number;
}

export type Recommendation = CourseRecommendation | JobRecommendation | EventRecommendation;

export interface RecommendationResponse {
  recommendations: Recommendation[];
  metadata: {
    total: number;
    filtered: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
  };
  insights: {
    topSkills: Array<{ name: string; demand: number }>;
    trendingCategories: Array<{ name: string; growth: number }>;
    marketInsights: {
      averageSalary: number;
      demandGrowth: number;
      competitionLevel: number;
    };
  };
}