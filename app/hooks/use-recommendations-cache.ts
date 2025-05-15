import { useEffect, useState } from 'react';
import { RecommendationResponse } from '@/app/lib/types/recommendations';

const CACHE_EXPIRY = 5 * 60 * 1000; // 5 минут

interface CacheItem {
  data: RecommendationResponse;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem;
}

export function useRecommendationsCache() {
  const [cache, setCache] = useState<Cache>({});

  // Очистка устаревших данных из кэша
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newCache = { ...cache };
      let hasChanges = false;

      Object.keys(newCache).forEach(key => {
        if (now - newCache[key].timestamp > CACHE_EXPIRY) {
          delete newCache[key];
          hasChanges = true;
        }
      });

      if (hasChanges) {
        setCache(newCache);
      }
    }, 60000); // Проверяем каждую минуту

    return () => clearInterval(interval);
  }, [cache]);

  // Сохранение данных в кэш
  const setCacheItem = (key: string, data: RecommendationResponse) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }));
  };

  // Получение данных из кэша
  const getCacheItem = (key: string): RecommendationResponse | null => {
    const item = cache[key];
    if (!item) return null;

    // Проверяем срок действия кэша
    if (Date.now() - item.timestamp > CACHE_EXPIRY) {
      const newCache = { ...cache };
      delete newCache[key];
      setCache(newCache);
      return null;
    }

    return item.data;
  };

  // Генерация ключа кэша на основе параметров
  const generateCacheKey = (params: Record<string, any>): string => {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = params[key];
        return acc;
      }, {} as Record<string, any>);

    return JSON.stringify(sortedParams);
  };

  // Очистка всего кэша
  const clearCache = () => {
    setCache({});
  };

  return {
    setCacheItem,
    getCacheItem,
    generateCacheKey,
    clearCache
  };
}