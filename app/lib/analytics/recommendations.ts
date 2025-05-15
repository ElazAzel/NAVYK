import { Recommendation } from '../types/recommendations';

interface AnalyticsEvent {
  eventType: 'view' | 'click' | 'favorite' | 'apply' | 'dismiss';
  recommendationType: 'course' | 'job' | 'event';
  recommendationId: string;
  userId: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class RecommendationAnalytics {
  private static instance: RecommendationAnalytics;
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  private eventQueue: AnalyticsEvent[] = [];
  private isProcessing = false;
  private batchSize = 10;
  private flushInterval = 30000; // 30 секунд

  private constructor() {
    this.startPeriodicFlush();
  }

  public static getInstance(): RecommendationAnalytics {
    if (!RecommendationAnalytics.instance) {
      RecommendationAnalytics.instance = new RecommendationAnalytics();
    }
    return RecommendationAnalytics.instance;
  }

  private startPeriodicFlush() {
    setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
  }

  private async flushEvents() {
    if (this.isProcessing || this.eventQueue.length === 0) return;

    this.isProcessing = true;
    const events = this.eventQueue.splice(0, this.batchSize);

    try {
      await fetch(`${this.API_URL}/analytics/recommendations/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      console.error('Ошибка при отправке аналитики:', error);
      // Возвращаем события обратно в очередь
      this.eventQueue.unshift(...events);
    } finally {
      this.isProcessing = false;
      
      // Если остались события, запускаем следующий флаш
      if (this.eventQueue.length > 0) {
        setTimeout(() => this.flushEvents(), 1000);
      }
    }
  }

  private trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>) {
    this.eventQueue.push({
      ...event,
      timestamp: Date.now(),
    });

    // Если очередь достигла размера батча, запускаем флаш
    if (this.eventQueue.length >= this.batchSize) {
      this.flushEvents();
    }
  }

  public trackView(recommendation: Recommendation, userId: string) {
    this.trackEvent({
      eventType: 'view',
      recommendationType: recommendation.type,
      recommendationId: recommendation.id,
      userId,
      metadata: {
        matchScore: recommendation.matchScore,
        skills: recommendation.skills.map(s => s.name),
      },
    });
  }

  public trackClick(recommendation: Recommendation, userId: string) {
    this.trackEvent({
      eventType: 'click',
      recommendationType: recommendation.type,
      recommendationId: recommendation.id,
      userId,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  public trackFavorite(recommendation: Recommendation, userId: string, isFavorite: boolean) {
    this.trackEvent({
      eventType: 'favorite',
      recommendationType: recommendation.type,
      recommendationId: recommendation.id,
      userId,
      metadata: {
        action: isFavorite ? 'add' : 'remove',
      },
    });
  }

  public trackApply(recommendation: Recommendation, userId: string) {
    this.trackEvent({
      eventType: 'apply',
      recommendationType: recommendation.type,
      recommendationId: recommendation.id,
      userId,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  public trackDismiss(recommendation: Recommendation, userId: string, reason?: string) {
    this.trackEvent({
      eventType: 'dismiss',
      recommendationType: recommendation.type,
      recommendationId: recommendation.id,
      userId,
      metadata: {
        reason,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Метод для получения статистики по рекомендациям
  public async getRecommendationStats(recommendationId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}/analytics/recommendations/${recommendationId}/stats`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch recommendation stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении статистики:', error);
      throw error;
    }
  }

  // Метод для получения персонализированных инсайтов
  public async getUserInsights(userId: string) {
    try {
      const response = await fetch(
        `${this.API_URL}/analytics/recommendations/users/${userId}/insights`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user insights');
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении инсайтов:', error);
      throw error;
    }
  }
}

export const recommendationAnalytics = RecommendationAnalytics.getInstance();