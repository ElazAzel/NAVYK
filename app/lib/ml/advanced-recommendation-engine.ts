import * as tf from '@tensorflow/tfjs';
import { User } from '../types/user';
import { Recommendation } from '../types/recommendations';

interface EmbeddingCache {
  [key: string]: tf.Tensor;
}

export class AdvancedRecommendationEngine {
  private static instance: AdvancedRecommendationEngine;
  private model: tf.LayersModel | null = null;
  private itemEmbeddings: EmbeddingCache = {};
  private userEmbeddings: EmbeddingCache = {};
  private readonly embeddingSize = 128;

  private constructor() {}

  public static getInstance(): AdvancedRecommendationEngine {
    if (!AdvancedRecommendationEngine.instance) {
      AdvancedRecommendationEngine.instance = new AdvancedRecommendationEngine();
    }
    return AdvancedRecommendationEngine.instance;
  }

  private async buildModel() {
    // Создаем нейронную сеть для обучения эмбеддингов
    const userInput = tf.input({ shape: [this.embeddingSize] });
    const itemInput = tf.input({ shape: [this.embeddingSize] });

    // User tower
    const userTower = tf.sequential({
      layers: [
        tf.layers.dense({
          units: 64,
          activation: 'relu',
          inputShape: [this.embeddingSize]
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' })
      ]
    });

    // Item tower
    const itemTower = tf.sequential({
      layers: [
        tf.layers.dense({
          units: 64,
          activation: 'relu',
          inputShape: [this.embeddingSize]
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({ units: 32, activation: 'relu' })
      ]
    });

    const userVector = userTower.apply(userInput);
    const itemVector = itemTower.apply(itemInput);

    // Dot product layer для вычисления схожести
    const dot = tf.layers.dot({ axes: -1 }).apply([userVector, itemVector]);

    this.model = tf.model({
      inputs: [userInput, itemInput],
      outputs: dot
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });
  }

  private async generateEmbedding(text: string): Promise<tf.Tensor> {
    // Используем предварительно обученную модель Universal Sentence Encoder
    // В реальном приложении здесь будет использоваться TensorFlow.js USE
    const embedding = await tf.randomNormal([1, this.embeddingSize]).array();
    return tf.tensor(embedding);
  }

  private async getUserEmbedding(user: User): Promise<tf.Tensor> {
    if (this.userEmbeddings[user.id]) {
      return this.userEmbeddings[user.id];
    }

    // Генерируем эмбеддинг на основе профиля пользователя
    const userProfile = [
      user.student?.skills?.join(' '),
      user.student?.interests?.join(' '),
      user.student?.experience?.join(' '),
      user.student?.education?.join(' ')
    ].filter(Boolean).join(' ');

    const embedding = await this.generateEmbedding(userProfile);
    this.userEmbeddings[user.id] = embedding;
    return embedding;
  }

  private async getItemEmbedding(item: Recommendation): Promise<tf.Tensor> {
    if (this.itemEmbeddings[item.id]) {
      return this.itemEmbeddings[item.id];
    }

    // Генерируем эмбеддинг для рекомендации
    const itemProfile = [
      item.title,
      item.description,
      item.skills.map(s => s.name).join(' '),
      item.type
    ].join(' ');

    const embedding = await this.generateEmbedding(itemProfile);
    this.itemEmbeddings[item.id] = embedding;
    return embedding;
  }

  private calculateContextualScore(
    user: User,
    recommendation: Recommendation
  ): number {
    // Учитываем контекстуальные факторы
    const contextFactors = {
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      userActivity: Math.random(), // В реальном приложении - реальные данные активности
      seasonality: Math.floor((new Date().getMonth() + 1) / 3)
    };

    // Веса для разных контекстуальных факторов
    const weights = {
      timeOfDay: 0.2,
      dayOfWeek: 0.1,
      userActivity: 0.4,
      seasonality: 0.3
    };

    return (
      contextFactors.timeOfDay * weights.timeOfDay +
      contextFactors.dayOfWeek * weights.dayOfWeek +
      contextFactors.userActivity * weights.userActivity +
      contextFactors.seasonality * weights.seasonality
    );
  }

  private async predictRelevance(
    userEmbedding: tf.Tensor,
    itemEmbedding: tf.Tensor
  ): Promise<number> {
    if (!this.model) {
      await this.buildModel();
    }

    const prediction = this.model!.predict([userEmbedding, itemEmbedding]) as tf.Tensor;
    return (await prediction.data())[0];
  }

  public async getPersonalizedRecommendations(
    user: User,
    recommendations: Recommendation[],
    options: {
      limit?: number;
      type?: string;
      minScore?: number;
    } = {}
  ): Promise<Recommendation[]> {
    const { limit = 10, type, minScore = 0.5 } = options;

    // Получаем эмбеддинг пользователя
    const userEmbedding = await this.getUserEmbedding(user);

    // Фильтруем по типу, если указан
    let filteredRecommendations = type
      ? recommendations.filter(r => r.type === type)
      : recommendations;

    // Вычисляем релевантность для каждой рекомендации
    const scoredRecommendations = await Promise.all(
      filteredRecommendations.map(async (recommendation) => {
        const itemEmbedding = await this.getItemEmbedding(recommendation);
        
        // Получаем базовую релевантность из модели
        const baseScore = await this.predictRelevance(userEmbedding, itemEmbedding);
        
        // Учитываем контекстуальные факторы
        const contextScore = this.calculateContextualScore(user, recommendation);
        
        // Комбинируем оценки
        const finalScore = 0.7 * baseScore + 0.3 * contextScore;

        return {
          ...recommendation,
          relevanceScore: Math.round(finalScore * 100)
        };
      })
    );

    // Фильтруем по минимальному скору и сортируем
    return scoredRecommendations
      .filter(r => r.relevanceScore >= minScore * 100)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  public async updateModel(
    user: User,
    recommendation: Recommendation,
    interaction: {
      type: 'view' | 'click' | 'apply' | 'dismiss';
      timestamp: Date;
      duration?: number;
    }
  ): Promise<void> {
    // Обновляем модель на основе взаимодействий пользователя
    const userEmbedding = await this.getUserEmbedding(user);
    const itemEmbedding = await this.getItemEmbedding(recommendation);

    // Определяем целевое значение на основе типа взаимодействия
    const targetValue = (() => {
      switch (interaction.type) {
        case 'apply': return 1.0;
        case 'click': return 0.7;
        case 'view': return 0.3;
        case 'dismiss': return 0.0;
        default: return 0.5;
      }
    })();

    // Обучаем модель на одном примере
    if (this.model) {
      await this.model.trainOnBatch(
        [userEmbedding, itemEmbedding],
        tf.tensor([targetValue])
      );
    }

    // Очищаем кэш эмбеддингов для обновленных сущностей
    delete this.userEmbeddings[user.id];
    delete this.itemEmbeddings[recommendation.id];
  }

  public async batchUpdate(interactions: Array<{
    user: User;
    recommendation: Recommendation;
    interaction: {
      type: 'view' | 'click' | 'apply' | 'dismiss';
      timestamp: Date;
      duration?: number;
    };
  }>): Promise<void> {
    // Пакетное обновление модели
    const batchSize = 32;
    const batches = [];

    for (let i = 0; i < interactions.length; i += batchSize) {
      const batch = interactions.slice(i, i + batchSize);
      batches.push(batch);
    }

    for (const batch of batches) {
      const userEmbeddings = await Promise.all(
        batch.map(({ user }) => this.getUserEmbedding(user))
      );

      const itemEmbeddings = await Promise.all(
        batch.map(({ recommendation }) => this.getItemEmbedding(recommendation))
      );

      const targets = batch.map(({ interaction }) => {
        switch (interaction.type) {
          case 'apply': return 1.0;
          case 'click': return 0.7;
          case 'view': return 0.3;
          case 'dismiss': return 0.0;
          default: return 0.5;
        }
      });

      if (this.model) {
        await this.model.trainOnBatch(
          [tf.stack(userEmbeddings), tf.stack(itemEmbeddings)],
          tf.tensor(targets)
        );
      }
    }

    // Очищаем весь кэш эмбеддингов после пакетного обновления
    this.userEmbeddings = {};
    this.itemEmbeddings = {};
  }
}

export const advancedRecommendationEngine = AdvancedRecommendationEngine.getInstance();