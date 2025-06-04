import { MetadataRoute } from 'next'

/**
 * Генерирует карту сайта для всех страниц платформы
 * 
 * @returns {MetadataRoute.Sitemap} Массив объектов, представляющих URL-адреса страниц
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Базовый URL сайта
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://navyk.kz'
  
  // Текущая дата для lastModified
  const currentDate = new Date().toISOString()
  
  // Список всех страниц сайта
  // В реальной системе это можно получать из базы данных или API
  
  // Общедоступные страницы
  const publicPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const, 
      priority: 0.7,
    },
    {
      url: `${baseUrl}/improvements`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]
  
  // Студенческие страницы
  const studentPages = [
    {
      url: `${baseUrl}/students/profile`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },    {
      url: `${baseUrl}/student/roadmap`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/students/courses`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/students/events`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/students/jobs`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/students/analytics`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ]
  
  // Страницы работодателей
  const employerPages = [
    {
      url: `${baseUrl}/employers/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/employers/jobs`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employers/candidates`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employers/analytics`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/employers/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]
  
  // Страницы университетов
  const universityPages = [
    {
      url: `${baseUrl}/universities/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/universities/students`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/universities/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/universities/analytics`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/universities/events`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]
  
  // Страницы менторов
  const mentorPages = [
    {
      url: `${baseUrl}/mentors/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mentors/students`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentors/sessions`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentors/analytics`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]
  
  // Административные страницы (не индексируются поисковыми системами)
  const adminPages = [
    {
      url: `${baseUrl}/admin/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin/users`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin/settings`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin/sitemap`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]
  
  // Объединяем все страницы в единый массив
  return [
    ...publicPages,
    ...studentPages,
    ...employerPages,
    ...universityPages,
    ...mentorPages,
    ...adminPages,
  ]
} 