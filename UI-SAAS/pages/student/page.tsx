"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AnimatedStatistics, AnimatedProgressBar, AnimatedDemoChart } from "@/app/components/animations";
import { motion } from "framer-motion";
import { 
  GraduationCap, Calendar, BookOpen, Building, Award, 
  TrendingUp, Clock, BarChart2, Sparkles, Target, 
  ChevronRight, ArrowUpRight, BriefcaseBusiness, 
  Users, BookMarked, Backpack, Star, Lightbulb
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

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

export default function StudentDashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  
  // Анимация для карточек
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Данные для дорожной карты курсов
  const roadmapCourses: RoadmapCourse[] = [
    { 
      title: "Основы программирования", 
      completed: true, 
      startDate: "10 сентября", 
      endDate: "15 октября",
      score: 92
    },
    { 
      title: "Структуры данных и алгоритмы", 
      completed: true, 
      startDate: "20 октября", 
      endDate: "25 ноября",
      score: 88
    },
    { 
      title: "Веб-разработка", 
      completed: false, 
      progress: 67, 
      startDate: "1 декабря", 
      endDate: "10 января",
      score: null
    },
    { 
      title: "Базы данных", 
      completed: false, 
      progress: 0, 
      startDate: "15 января", 
      endDate: "20 февраля",
      score: null
    },
  ];
    // Данные для рекомендаций по курсам
  const recommendedCourses: RecommendedCourse[] = [
    { 
      id: "ml-001",
      title: "Машинное обучение", 
      level: "Средний", 
      duration: "8 недель",
      relevance: 95,
      provider: "ТехноУниверситет",
      matchScore: 95
    },
    { 
      id: "mob-001",
      title: "Мобильная разработка", 
      level: "Начальный", 
      duration: "6 недель",
      relevance: 88,
      provider: "Медиа Курсы",
      matchScore: 88
    },
    { 
      id: "devops-001",
      title: "DevOps практики", 
      level: "Продвинутый", 
      duration: "10 недель",
      relevance: 75,
      provider: "IT Академия",
      matchScore: 75
    },
  ];
  
  // Данные для предстоящих мероприятий
  const upcomingEvents: UpcomingEvent[] = [
    { 
      title: "День карьеры IT", 
      date: "15 Апреля, 10:00", 
      location: "Главный корпус",
      organizer: "Университет"
    },
    { 
      title: "Мастер-класс по блокчейну", 
      date: "20 Апреля, 15:30", 
      location: "Онлайн",
      organizer: "Криптокомпания"
    },
    { 
      title: "Хакатон по искусственному интеллекту", 
      date: "5-7 Мая", 
      location: "Технопарк",
      organizer: "IT Ассоциация"
    },
  ];
  
  // Данные для активных курсов
  const activeCourses: ActiveCourse[] = [
    { 
      id: 1,
      title: "Веб-разработка",
      progress: 67,
      nextLesson: "CSS Flexbox и Grid", 
      nextDate: "5 Апреля, 14:00",
      instructor: "Анна Смирнова",
      totalLessons: 24,
      completedLessons: 16 
    },
    { 
      id: 2,
      title: "Основы UX/UI дизайна",
      progress: 42,
      nextLesson: "Прототипирование интерфейсов", 
      nextDate: "7 Апреля, 16:30",
      instructor: "Максим Петров",
      totalLessons: 18,
      completedLessons: 8 
    },
    { 
      id: 3,
      title: "Python для Data Science",
      progress: 15,
      nextLesson: "Pandas и NumPy", 
      nextDate: "6 Апреля, 10:00",
      instructor: "Дмитрий Иванов",
      totalLessons: 20,
      completedLessons: 3 
    },
  ];
  
  // Данные для завершенных курсов
  const completedCourses: CompletedCourse[] = [
    { 
      id: 4,
      title: "Основы программирования", 
      completionDate: "15 октября, 2023",
      score: 92,
      certificate: true,
      instructor: "Сергей Кузнецов" 
    },
    { 
      id: 5,
      title: "Структуры данных и алгоритмы", 
      completionDate: "25 ноября, 2023",
      score: 88,
      certificate: true,
      instructor: "Ольга Морозова" 
    },
    { 
      id: 6,
      title: "Git и контроль версий", 
      completionDate: "5 января, 2024",
      score: 95,
      certificate: true,
      instructor: "Антон Соколов" 
    },
  ];
  
  // Данные для мероприятий, на которые записан студент
  const registeredEvents: RegisteredEvent[] = [
    { 
      id: 1,
      title: "День карьеры IT", 
      date: "15 Апреля, 10:00", 
      location: "Главный корпус",
      organizer: "Университет",
      type: "Карьера",
      status: "confirmed" 
    },
    { 
      id: 2,
      title: "Мастер-класс по блокчейну", 
      date: "20 Апреля, 15:30", 
      location: "Онлайн",
      organizer: "Криптокомпания",
      type: "Образование",
      status: "confirmed" 
    },
  ];
  
  // Данные для доступных мероприятий
  const availableEvents: AvailableEvent[] = [
    { 
      id: 3,
      title: "Хакатон по искусственному интеллекту", 
      date: "5-7 Мая", 
      location: "Технопарк",
      organizer: "IT Ассоциация",
      type: "Соревнование",
      participants: 120,
      remaining: 15
    },
    { 
      id: 4,
      title: "Форум разработчиков", 
      date: "12 Мая, 11:00", 
      location: "Конференц-центр",
      organizer: "Dev Community",
      type: "Нетворкинг",
      participants: 200,
      remaining: 45
    },
    { 
      id: 5,
      title: "Презентация компании ТехноПром", 
      date: "18 Мая, 14:00", 
      location: "Аудитория 305",
      organizer: "ТехноПром",
      type: "Презентация",
      participants: 50,
      remaining: 23
    },
  ];
  
  // Данные для прошедших мероприятий
  const pastEvents: PastEvent[] = [
    { 
      id: 6,
      title: "Вебинар: Основы микросервисной архитектуры", 
      date: "10 Марта, 15:00", 
      organizer: "IT Академия",
      feedback: true,
      certificate: false,
      rating: 4.5
    },
    { 
      id: 7,
      title: "Встреча с работодателями IT сектора", 
      date: "25 Марта, 12:00", 
      organizer: "Центр карьеры",
      feedback: true,
      certificate: true,
      rating: 5
    },
  ];
  
  // Данные для вакансий
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
      description: "Разработка пользовательских интерфейсов для корпоративных приложений."
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
      description: "Разработка и поддержка финансовых микросервисов."
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
      description: "Анализ пользовательских данных и подготовка отчетов."
    }
  ];
  
  // Определение цвета прогресса в зависимости от значения
  const getProgressColor = (progress: number): string => {
    if (progress < 30) return "red-500";
    if (progress < 70) return "amber-500";
    return "green-500";
  };
  
  // Получение статуса регистрации на мероприятие
  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-700 border-green-300">Подтверждено</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300">Ожидание</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-300">Отменено</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <RoleLayout>
      <div className="container py-6 space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
            <p className="text-muted-foreground">
              Управляйте своим обучением и развитием
            </p>
          </div>

          {/* Статистика */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid gap-4 md:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <BookOpen className="h-5 w-5" />
                      <span>Активных курсов</span>
                    </div>
                    <span className="text-xs font-medium bg-blue-500/10 text-blue-500 py-1 px-2 rounded-full">
                      +12% с прошлого месяца
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-sm text-muted-foreground">курса в процессе</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Award className="h-5 w-5" />
                      <span>Достижений разблокировано</span>
                    </div>
                    <span className="text-xs font-medium bg-green-500/10 text-green-500 py-1 px-2 rounded-full">
                      +3 за неделю
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">7</h3>
                    <p className="text-sm text-muted-foreground">в этом месяце</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>Предстоящих мероприятий</span>
                    </div>
                    <span className="text-xs font-medium bg-amber-500/10 text-amber-500 py-1 px-2 rounded-full">
                      Следующее: 15 апреля
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">4</h3>
                    <p className="text-sm text-muted-foreground">в этом месяце</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building className="h-5 w-5" />
                      <span>Подходящих вакансий</span>
                    </div>
                    <span className="text-xs font-medium bg-indigo-500/10 text-indigo-500 py-1 px-2 rounded-full">
                      Релевантность: 85%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">12</h3>
                    <p className="text-sm text-muted-foreground">в этом месяце</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Основной контент */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Дорожная карта */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Ваша дорожная карта</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    4 курса
                  </Badge>
                </div>
                <CardDescription>
                  План обучения и профессионального развития
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {roadmapCourses.map((course, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {course.completed ? (
                            <div className="mr-2 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary text-xs">✓</span>
                            </div>
                          ) : (
                            <div className={`mr-2 h-5 w-5 rounded-full ${(course.progress ?? 0) > 0 ? 'bg-amber-500/20' : 'bg-muted'} flex items-center justify-center`}>
                              <span className="text-xs">{index + 1}</span>
                            </div>
                          )}
                          <span className="font-medium group-hover:text-primary transition-colors">{course.title}</span>
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
                          <AnimatedProgressBar 
                            value={course.progress ?? 0} 
                            color="amber-500" 
                            className="mt-2"
                          />
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
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Рекомендации */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Рекомендации для вас</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    3 курса
                  </Badge>
                </div>
                <CardDescription>
                  На основе вашего профиля и интересов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {recommendedCourses.map((course, index) => (
                    <div key={index} className="flex items-start group cursor-pointer transition-all">
                      <div className="mr-4 mt-1 p-2 rounded-full bg-accent/10 text-accent">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium group-hover:text-primary transition-colors">{course.title}</p>
                          <Badge className="font-normal bg-gradient-to-r from-primary/80 to-secondary/80 text-white">
                            {course.relevance}% подходит
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Target className="mr-1 h-3 w-3" />
                          {course.level}, {course.duration}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Провайдер: {course.provider}
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <Link
                      href="/students/recommendations"
                      className="inline-flex items-center text-sm text-primary"
                    >
                      Все рекомендации
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
                      Обновить интересы
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Дополнительные секции */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Предстоящие мероприятия */}
            <Card>
              <CardHeader>
                <CardTitle>Предстоящие мероприятия</CardTitle>
                <CardDescription>События и встречи</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-start group hover:bg-muted/30 p-2 rounded-md transition-colors cursor-pointer">
                    <div className="mr-3 mt-1">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.date}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {event.location} • {event.organizer}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <Link href="/students/events">
                    <Button size="sm" variant="ghost" className="w-full justify-center">
                      Все мероприятия
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Ваши навыки */}
            <Card>
              <CardHeader>
                <CardTitle>Ваши навыки</CardTitle>
                <CardDescription>Текущий уровень</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Программирование</span>
                    <span className="text-muted-foreground">Продвинутый</span>
                  </div>
                  <AnimatedProgressBar value={85} max={100} color="primary" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Веб-разработка</span>
                    <span className="text-muted-foreground">Средний</span>
                  </div>
                  <AnimatedProgressBar value={60} max={100} color="amber-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Базы данных</span>
                    <span className="text-muted-foreground">Начальный</span>
                  </div>
                  <AnimatedProgressBar value={40} max={100} color="secondary" />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Soft skills</span>
                    <span className="text-muted-foreground">Средний</span>
                  </div>
                  <AnimatedProgressBar value={65} max={100} color="blue-500" />
                </div>
                <div className="pt-2 border-t">
                  <Link href="/students/skills">
                    <Button size="sm" variant="ghost" className="w-full justify-center">
                      Полный профиль навыков
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Статистика активности */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика активности</CardTitle>
                <CardDescription>За последний месяц</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-md bg-primary/10">
                    <BookMarked className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Изучено материалов</div>
                    <div className="text-2xl font-bold">28</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-md bg-secondary/10">
                    <Backpack className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium">Выполнено заданий</div>
                    <div className="text-2xl font-bold">14</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-md bg-amber-500/10">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="font-medium">Получено баллов</div>
                    <div className="text-2xl font-bold">154</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 p-2 rounded-md bg-blue-500/10">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Групповые проекты</div>
                    <div className="text-2xl font-bold">2</div>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <Link href="/students/activity">
                    <Button size="sm" variant="ghost" className="w-full justify-center">
                      Подробная статистика
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}