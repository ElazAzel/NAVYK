"use client";

import React from "react";
import RoleLayout from "@/components/RoleLayout";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  Building,
  Award,
  TrendingUp,
  Clock,
  BarChart2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

interface RoadmapCourse {
  id?: string;
  title: string;
  description?: string;
  type?: "course" | "skill" | "certification" | "job" | "project";
  completed: boolean;
  startDate: string;
  endDate: string;
  score: number | null;
  progress?: number; // 0-100
  status?: "completed" | "in-progress" | "planned" | "suggested";
}

interface RecommendedCourse {
  id: string;
  title: string;
  level: string;
  duration: string;
  relevance: number;
  provider: string;
  description?: string;
  progress?: number;
  matchScore?: number;
}

interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  organizer: string;
}

interface ActiveCourse {
  id: number;
  title: string;
  progress: number;
  nextLesson: string;
  nextDate: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
}

interface CompletedCourse {
  id: number;
  title: string;
  completionDate: string;
  score: number;
  certificate: boolean;
  instructor: string;
}

interface RegisteredEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  organizer: string;
  type: string;
  status: string;
}

interface AvailableEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  organizer: string;
  type: string;
  participants: number;
  remaining: number;
}

interface PastEvent {
  id: number;
  title: string;
  date: string;
  organizer: string;
  feedback: boolean;
  certificate: boolean;
  rating: number;
}

interface JobVacancy {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  remote: boolean;
  tags: string[];
  matchScore: number;
  posted: string;
  deadline?: string;
  description: string;
}

interface KPIStat {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  positive?: boolean;
}

export default function StudentDashboard() {
  const { user } = useAuth();

  // KPI Statistics
  const kpiStats: KPIStat[] = [
    {
      label: "Активных курсов",
      value: 3,
      subtitle: "в процессе обучения",
      delta: "+12% с прошлого месяца",
      positive: true,
    },
    {
      label: "Достижений разблокировано",
      value: 7,
      subtitle: "в этом месяце",
      delta: "+3 за неделю",
      positive: true,
    },
    {
      label: "Предстоящих мероприятий",
      value: 4,
      subtitle: "в этом месяце",
      delta: "Следующее: 15 апреля",
    },
    {
      label: "Подходящих вакансий",
      value: 12,
      subtitle: "в этом месяце",
      delta: "Релевантность: 85%",
    },
  ];

  // Roadmap courses data
  const roadmapCourses: RoadmapCourse[] = [
    {
      title: "Основы программирования",
      completed: true,
      startDate: "10 сентября",
      endDate: "15 октября",
      score: 92,
    },
    {
      title: "Структуры данных и алгоритмы",
      completed: true,
      startDate: "20 октября",
      endDate: "25 ноября",
      score: 88,
    },
    {
      title: "Веб-разработка",
      completed: false,
      progress: 67,
      startDate: "1 декабря",
      endDate: "10 января",
      score: null,
    },
    {
      title: "Базы данных",
      completed: false,
      progress: 0,
      startDate: "15 января",
      endDate: "20 февраля",
      score: null,
    },
  ];

  // Recommended courses data
  const recommendedCourses: RecommendedCourse[] = [
    {
      id: "ml-001",
      title: "Машинное обучение",
      level: "Средний",
      duration: "8 недель",
      relevance: 95,
      provider: "ТехноУниверситет",
      matchScore: 95,
    },
    {
      id: "mob-001",
      title: "Мобильная разработка",
      level: "Начальный",
      duration: "6 недель",
      relevance: 88,
      provider: "Медиа Курсы",
      matchScore: 88,
    },
    {
      id: "devops-001",
      title: "DevOps практики",
      level: "Продвинутый",
      duration: "10 недель",
      relevance: 75,
      provider: "IT Академия",
      matchScore: 75,
    },
  ];

  // Upcoming events data
  const upcomingEvents: UpcomingEvent[] = [
    {
      title: "День карьеры IT",
      date: "15 Апреля, 10:00",
      location: "Главный корпус",
      organizer: "Университет",
    },
    {
      title: "Мастер-класс по блокчейну",
      date: "20 Апреля, 15:30",
      location: "Онлайн",
      organizer: "Криптокомпания",
    },
    {
      title: "Хакатон по искусственному интеллекту",
      date: "5-7 Мая",
      location: "Технопарк",
      organizer: "IT Ассоциация",
    },
  ];

  // Active courses data
  const activeCourses: ActiveCourse[] = [
    {
      id: 1,
      title: "Веб-разработка",
      progress: 67,
      nextLesson: "CSS Flexbox и Grid",
      nextDate: "5 Апреля, 14:00",
      instructor: "Анна Смирнова",
      totalLessons: 24,
      completedLessons: 16,
    },
    {
      id: 2,
      title: "Основы UX/UI дизайна",
      progress: 42,
      nextLesson: "Прототипирование интерфейсов",
      nextDate: "7 Апреля, 16:30",
      instructor: "Максим Петров",
      totalLessons: 18,
      completedLessons: 8,
    },
    {
      id: 3,
      title: "Python для Data Science",
      progress: 15,
      nextLesson: "Pandas и NumPy",
      nextDate: "6 Апреля, 10:00",
      instructor: "Дмитрий Иванов",
      totalLessons: 20,
      completedLessons: 3,
    },
  ];

  // Registered events data
  const registeredEvents: RegisteredEvent[] = [
    {
      id: 1,
      title: "День карьеры IT",
      date: "15 Апреля, 10:00",
      location: "Главный корпус",
      organizer: "Университет",
      type: "Карьера",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Мастер-класс по блокчейну",
      date: "20 Апреля, 15:30",
      location: "Онлайн",
      organizer: "Криптокомпания",
      type: "Образование",
      status: "confirmed",
    },
  ];

  // Available events data
  const availableEvents: AvailableEvent[] = [
    {
      id: 3,
      title: "Хакатон по искусственному интеллекту",
      date: "5-7 Мая",
      location: "Технопарк",
      organizer: "IT Ассоциация",
      type: "Соревнование",
      participants: 120,
      remaining: 15,
    },
    {
      id: 4,
      title: "Форум разработчиков",
      date: "12 Мая, 11:00",
      location: "Конференц-центр",
      organizer: "Dev Community",
      type: "Нетворкинг",
      participants: 200,
      remaining: 45,
    },
  ];

  // Past events data
  const pastEvents: PastEvent[] = [
    {
      id: 6,
      title: "Вебинар: Основы микросервисной архитектуры",
      date: "10 Марта, 15:00",
      organizer: "IT Академия",
      feedback: true,
      certificate: false,
      rating: 4.5,
    },
    {
      id: 7,
      title: "Встреча с работодателями IT сектора",
      date: "25 Марта, 12:00",
      organizer: "Центр карьеры",
      feedback: true,
      certificate: true,
      rating: 5,
    },
  ];

  // Recommended jobs data
  const recommendedJobs: JobVacancy[] = [
    {
      id: 1,
      title: "Frontend разработчик (React)",
      company: "ТехноПром",
      location: "Москва",
      salary: "от 150 000 ₽",
      remote: true,
      tags: ["React", "TypeScript", "Redux"],
      matchScore: 92,
      posted: "2 дня назад",
      deadline: "30 апреля, 2024",
      description: "Разработка пользовательских интерфейсов для корпоративных приложений.",
    },
    {
      id: 2,
      title: "Junior Python разработчик",
      company: "Финтех Солюшнс",
      location: "Санкт-Петербург",
      salary: "от 120 000 ₽",
      remote: false,
      tags: ["Python", "Django", "PostgreSQL"],
      matchScore: 85,
      posted: "4 дня назад",
      description: "Разработка и поддержка финансовых микросервисов.",
    },
    {
      id: 3,
      title: "Стажер Data Analyst",
      company: "Медиа Групп",
      location: "Москва",
      salary: "от 80 000 ₽",
      remote: true,
      tags: ["SQL", "Python", "Data Analysis"],
      matchScore: 78,
      posted: "1 неделю назад",
      deadline: "15 мая, 2024",
      description: "Анализ пользовательских данных и подготовка отчетов.",
    },
  ];

  return (
    <RoleLayout pageTitle="Дашборд">
      <div className="pt-6">
        {/* KPI Strip - топовые статистики */}
        <KPIStrip stats={kpiStats} />

        {/* Main content area - three columns grid */}
        <div className="grid gap-6 md:grid-cols-3 pt-6">
          {/* Section: Дорожная карта */}
          <SectionCard
            id="roadmap"
            header={{
              title: "Ваша дорожная карта",
              subtitle: "План обучения и профессионального развития",
            }}
          >
            <div className="space-y-4">
              {roadmapCourses.map((course, index) => (
                <div
                  key={index}
                  className="group cursor-pointer rounded-lg border p-4 sm:p-5 transition-colors duration-150 ease-ui hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {course.completed ? (
                        <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary text-xs">✓</span>
                        </div>
                      ) : (
                        <div
                          className={`mr-2 h-4 w-4 rounded-full ${
                            (course.progress ?? 0) > 0 ? "bg-amber-500/20" : "bg-muted"
                          } flex items-center justify-center`}
                        >
                          <span className="text-xs">{index + 1}</span>
                        </div>
                      )}
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {course.title}
                      </span>
                    </div>
                    {course.completed ? (
                      <span className="text-sm font-medium text-primary">
                        {course.score}%
                      </span>
                    ) : (
                      (course.progress ?? 0) > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {course.progress}%
                        </span>
                      )
                    )}
                  </div>
                  <div className="pl-7">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.startDate} - {course.endDate}
                      </span>
                      {course.completed && (
                        <span className="flex items-center text-green-600 dark:text-green-500">
                          <span>Завершен</span>
                        </span>
                      )}
                    </div>
                    {!course.completed && (course.progress ?? 0) > 0 && (
                      <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: (course.progress ?? 0) + "%" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Link
                href="/student/roadmap"
                className="inline-flex items-center text-sm text-primary"
              >
                Полная дорожная карта
                <svg
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </SectionCard>

          {/* Section: Рекомендации */}
          <SectionCard
            id="recommendations"
            header={{
              title: "Рекомендации для вас",
              subtitle: "На основе вашего профиля и интересов",
            }}
          >
            <div className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-start group cursor-pointer transition-colors duration-150 ease-user"
                >
                  <div className="mr-3 mt-1 p-2 rounded-full bg-primary/10 text-primary">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M8 12h.8l.4 1.2h4.6l.4 1.2H21" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {course.title}
                      </p>
                      <Badge className="font-normal">
                        {course.relevance}% подходит
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <svg
                        className="mr-1 h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M12 19l-7-7a1 1 0 0 1 1.414-1.414L17 13l4.59-4.59a1 1 0 0 1 1.414 1.414L21 13l-4.59 4.59a1 1 0 0 1-1.414 1.414L12 19z" />
                      </svg>
                      {course.level}, {course.duration}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Провайдер: {course.provider}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <div className="flex justify-between items-center">
                <Link
                  href="/recommendations"
                  className="inline-flex items-center text-sm text-primary"
                >
                  Все рекомендации
                  <svg
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button variant="outline" size="sm">
                  <svg
                    className="h-3.5 w-3.5 mr-1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M13 2L3 14h8l-1 6 9-6h-8l1-6zm-7 4h14M5 17l7 7 7-7M5 17l7 7 7-7" />
                  </svg>
                  Обновить интересы
                </Button>
              </div>
            </div>
          </SectionCard>

          {/* Section: Дополнительные секции - Skills + Activity */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Skills section */}
            <SectionCard
              id="skills"
              header={{
                title: "Ваши навыки",
                subtitle: "Текущий уровень",
              }}
            >
              <div className="space-y-4">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Программирование</span>
                  <span className="text-muted-foreground">Продвинутый</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Веб-разработка</span>
                  <span className="text-muted-foreground">Средний</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Базы данных</span>
                  <span className="text-muted-foreground">Начальный</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: "40%" }}
                  />
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Soft skills</span>
                  <span className="text-muted-foreground">Средний</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </SectionCard>

            {/* Activity section */}
            <SectionCard
              id="activity"
              header={{
                title: "Статистика активности",
                subtitle: "За последний месяц",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-md bg-primary/10">
                    <svg
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M3 3v18a3 3 0 0 0 3 3h18" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Изучено материалов</div>
                    <div className="text-2xl font-bold">28</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-md bg-secondary/10">
                    <svg
                      className="h-5 w-5 text-secondary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M3 3v18a3 3 0 0 0 3 3h18" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Выполнено заданий</div>
                    <div className="text-2xl font-bold">14</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-md bg-amber-500/10">
                    <svg
                      className="h-5 w-5 text-amber-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Получено баллов</div>
                    <div className="text-2xl font-bold">154</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 p-2 rounded-md bg-blue-500/10">
                    <svg
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M20 21v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2M10 11L8.12 6.38a1.99 1.99 0 0 0-2.83 0L2 21l4.94-4.94" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Групповые проекты</div>
                    <div className="text-2xl font-bold">2</div>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Link
                  href="/student/achievements"
                  className="inline-flex items-center text-sm text-primary"
                >
                  Подробная статистика
                  <svg
                    className="ml-1 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-center"
                >
                  Полная статистика
                </Button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}