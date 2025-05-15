"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)
      
      // Инициализация текущего состояния
      setMatches(media.matches)
      
      // Функция обработчик изменений медиа-запроса
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches)
      }
      
      // Добавляем слушатель событий
      media.addEventListener("change", listener)
      
      // Очистка слушателя при размонтировании
      return () => {
        media.removeEventListener("change", listener)
      }
    }
    
    // Возвращаем false по умолчанию для серверного рендеринга
    return () => {}
  }, [query])
  
  return matches
} 