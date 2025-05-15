import { RecommendationResponse, RecommendationType } from "../types/recommendations";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

interface GetRecommendationsParams {
  userId: string;
  type?: RecommendationType;
  page?: number;
  pageSize?: number;
  filters?: {
    skills?: string[];
    location?: string;
    employmentType?: string[];
    experienceLevel?: string[];
    salary?: {
      min?: number;
      max?: number;
    };
    rating?: number;
    difficulty?: number[];
  };
}

export async function getRecommendations(params: GetRecommendationsParams): Promise<RecommendationResponse> {
  try {
    const queryParams = new URLSearchParams({
      userId: params.userId,
      ...(params.type && { type: params.type }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.pageSize && { pageSize: params.pageSize.toString() })
    });

    if (params.filters) {
      const filters = params.filters;
      if (filters.skills?.length) {
        queryParams.append('skills', filters.skills.join(','));
      }
      if (filters.location) {
        queryParams.append('location', filters.location);
      }
      if (filters.employmentType?.length) {
        queryParams.append('employmentType', filters.employmentType.join(','));
      }
      if (filters.experienceLevel?.length) {
        queryParams.append('experienceLevel', filters.experienceLevel.join(','));
      }
      if (filters.salary?.min) {
        queryParams.append('salaryMin', filters.salary.min.toString());
      }
      if (filters.salary?.max) {
        queryParams.append('salaryMax', filters.salary.max.toString());
      }
      if (filters.rating) {
        queryParams.append('rating', filters.rating.toString());
      }
      if (filters.difficulty?.length) {
        queryParams.append('difficulty', filters.difficulty.join(','));
      }
    }

    const response = await fetch(`${API_URL}/recommendations?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
}

export async function getRecommendationById(id: string): Promise<RecommendationResponse> {
  try {
    const response = await fetch(`${API_URL}/recommendations/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    throw error;
  }
}

export async function getMarketInsights(): Promise<RecommendationResponse['insights']> {
  try {
    const response = await fetch(`${API_URL}/recommendations/insights`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch market insights');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching market insights:', error);
    throw error;
  }
}

export async function getTrendingSkills(): Promise<Array<{ name: string; demand: number }>> {
  try {
    const response = await fetch(`${API_URL}/recommendations/trending-skills`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending skills');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching trending skills:', error);
    throw error;
  }
}

export async function getPersonalizedInsights(userId: string): Promise<{
  careerPath: string[];
  suggestedSkills: string[];
  marketFit: number;
  growthOpportunities: Array<{
    skill: string;
    impact: number;
    timeToAcquire: string;
  }>;
}> {
  try {
    const response = await fetch(`${API_URL}/recommendations/insights/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch personalized insights');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching personalized insights:', error);
    throw error;
  }
}