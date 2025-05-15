import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const recommendationId = params.id;
    
    // В реальном приложении здесь будет запрос к базе данных
    // Сейчас возвращаем моковые данные для демонстрации
    const mockStats = {
      effectivenessScore: 85,
      applicationRate: 12.5,
      totalViews: 450,
      totalApplications: 56,
      candidateQualityScore: 78,
      viewsOverTime: [
        { date: "2024-01-01", views: 50 },
        { date: "2024-01-02", views: 75 },
        { date: "2024-01-03", views: 120 },
        { date: "2024-01-04", views: 95 },
        { date: "2024-01-05", views: 110 }
      ],
      candidateDistribution: [
        { name: "Junior", value: 35 },
        { name: "Middle", value: 45 },
        { name: "Senior", value: 20 }
      ],
      keyMetrics: [
        {
          name: "Среднее время отклика",
          value: "2.5 дня",
          change: +15
        },
        {
          name: "Процент приглашений",
          value: "45%",
          change: +8
        },
        {
          name: "Релевантность кандидатов",
          value: "82%",
          change: +5
        },
        {
          name: "Конверсия в найм",
          value: "12%",
          change: -3
        }
      ]
    };

    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching recommendation stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendation stats' },
      { status: 500 }
    );
  }
}