import { Recommendation } from '../types/recommendations';

interface MetricsContext {
  relevanceScores: number[];
  relevantItems: Set<string>;
  totalItems: number;
  userInterests: Set<string>;
  userHistory: Set<string>;
  timeRange: {
    start: Date;
    end: Date;
  };
}

interface QualityMetrics {
  nDCG: number;
  MAP: number;
  MRR: number;
  diversity: number;
  coverage: number;
  serendipity: number;
  novelty: number;
}

interface InteractionMetrics {
  viewCount: number;
  clickCount: number;
  applyCount: number;
  bookmarkCount: number;
  timeSpent: number;
}

interface SatisfactionMetrics {
  relevance: number;
  timeliness: number;
  personalizedScore: number;
  explainability: number;
}

interface BusinessMetrics {
  conversionRate: number;
  retentionRate: number;
  engagementRate: number;
  averageTimeToConversion: number;
  revenueImpact: number;
}

interface MetricsReport {
  quality: QualityMetrics;
  interaction: InteractionMetrics;
  satisfaction: SatisfactionMetrics;
  business: BusinessMetrics;
}

class RecommendationMetrics {
  private calculateNDCG(recommendations: Recommendation[], relevanceScores: number[]): number {
    // Normalized Discounted Cumulative Gain
    const DCG = recommendations.reduce((sum, _, i) => {
      return sum + (relevanceScores[i] || 0) / Math.log2(i + 2);
    }, 0);

    const idealRelevanceScores = [...relevanceScores].sort((a, b) => b - a);
    const IDCG = idealRelevanceScores.reduce((sum, score, i) => {
      return sum + score / Math.log2(i + 2);
    }, 0);

    return IDCG === 0 ? 0 : DCG / IDCG;
  }

  private calculateMAP(recommendations: Recommendation[], relevantItems: Set<string>): number {
    // Mean Average Precision
    let sum = 0;
    let relevantCount = 0;

    recommendations.forEach((rec, i) => {
      if (relevantItems.has(rec.id)) {
        relevantCount++;
        sum += relevantCount / (i + 1);
      }
    });

    return relevantCount === 0 ? 0 : sum / relevantCount;
  }

  private calculateMRR(recommendations: Recommendation[], relevantItems: Set<string>): number {
    // Mean Reciprocal Rank
    const firstRelevantIndex = recommendations.findIndex(rec => relevantItems.has(rec.id));
    return firstRelevantIndex === -1 ? 0 : 1 / (firstRelevantIndex + 1);
  }

  private calculateDiversity(recommendations: Recommendation[]): number {
    // Рассчитываем разнообразие на основе категорий и тегов
    const categories = new Set<string>();
    const tags = new Set<string>();

    recommendations.forEach(rec => {
      if (rec.category) categories.add(rec.category);
      rec.tags?.forEach(tag => tags.add(tag));
    });

    const categoryDiversity = categories.size / recommendations.length;
    const tagDiversity = tags.size / (recommendations.length * 3); // предполагаем в среднем 3 тега на рекомендацию

    return (categoryDiversity + tagDiversity) / 2;
  }

  private calculateCoverage(recommendations: Recommendation[], totalItems: number): number {
    // Покрытие каталога
    const uniqueItems = new Set(recommendations.map(rec => rec.id));
    return uniqueItems.size / totalItems;
  }

  private calculateSerendipity(
    recommendations: Recommendation[],
    userInterests: Set<string>,
    userHistory: Set<string>
  ): number {
    // Неожиданность рекомендаций
    let unexpectedCount = 0;

    recommendations.forEach(rec => {
      const isInHistory = userHistory.has(rec.id);
      const isInInterests = rec.tags?.some(tag => userInterests.has(tag)) || false;

      if (!isInHistory && !isInInterests) {
        unexpectedCount++;
      }
    });

    return unexpectedCount / recommendations.length;
  }

  private calculateNovelty(recommendations: Recommendation[], userHistory: Set<string>): number {
    // Новизна рекомендаций
    let novelItems = 0;

    recommendations.forEach(rec => {
      if (!userHistory.has(rec.id)) {
        novelItems++;
      }
    });

    return novelItems / recommendations.length;
  }

  private simulateInteractionMetrics(): InteractionMetrics {
    // Симуляция метрик взаимодействия для демонстрации
    return {
      viewCount: Math.floor(Math.random() * 1000),
      clickCount: Math.floor(Math.random() * 500),
      applyCount: Math.floor(Math.random() * 100),
      bookmarkCount: Math.floor(Math.random() * 200),
      timeSpent: Math.floor(Math.random() * 3600), // в секундах
    };
  }

  private simulateSatisfactionMetrics(): SatisfactionMetrics {
    // Симуляция метрик удовлетворенности для демонстрации
    return {
      relevance: Math.random(),
      timeliness: Math.random(),
      personalizedScore: Math.random(),
      explainability: Math.random(),
    };
  }

  private simulateBusinessMetrics(): BusinessMetrics {
    // Симуляция бизнес-метрик для демонстрации
    return {
      conversionRate: Math.random() * 0.3,
      retentionRate: 0.6 + Math.random() * 0.3,
      engagementRate: 0.4 + Math.random() * 0.4,
      averageTimeToConversion: Math.floor(Math.random() * 72),
      revenueImpact: Math.floor(Math.random() * 1000000),
    };
  }

  async generateMetricsReport(
    recommendations: Recommendation[],
    context: MetricsContext
  ): Promise<MetricsReport> {
    const qualityMetrics: QualityMetrics = {
      nDCG: this.calculateNDCG(recommendations, context.relevanceScores),
      MAP: this.calculateMAP(recommendations, context.relevantItems),
      MRR: this.calculateMRR(recommendations, context.relevantItems),
      diversity: this.calculateDiversity(recommendations),
      coverage: this.calculateCoverage(recommendations, context.totalItems),
      serendipity: this.calculateSerendipity(
        recommendations,
        context.userInterests,
        context.userHistory
      ),
      novelty: this.calculateNovelty(recommendations, context.userHistory),
    };

    return {
      quality: qualityMetrics,
      interaction: this.simulateInteractionMetrics(),
      satisfaction: this.simulateSatisfactionMetrics(),
      business: this.simulateBusinessMetrics(),
    };
  }
}

export const recommendationMetrics = new RecommendationMetrics();