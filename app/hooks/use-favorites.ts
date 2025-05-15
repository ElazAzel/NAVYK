import { useState, useEffect } from 'react';
import { Recommendation } from '@/app/lib/types/recommendations';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recommendation[]>([]);

  // Загрузка избранного при инициализации
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Сохранение избранного при изменениях
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recommendation: Recommendation) => {
    setFavorites(prev => {
      // Проверяем, нет ли уже такой рекомендации
      if (prev.some(item => item.id === recommendation.id)) {
        return prev;
      }
      return [...prev, recommendation];
    });
  };

  const removeFromFavorites = (recommendationId: string) => {
    setFavorites(prev => 
      prev.filter(item => item.id !== recommendationId)
    );
  };

  const toggleFavorite = (recommendation: Recommendation) => {
    if (isFavorite(recommendation.id)) {
      removeFromFavorites(recommendation.id);
    } else {
      addToFavorites(recommendation);
    }
  };

  const isFavorite = (recommendationId: string) => {
    return favorites.some(item => item.id === recommendationId);
  };

  const getFavoritesByType = (type: 'course' | 'job' | 'event') => {
    return favorites.filter(item => item.type === type);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesByType
  };
}