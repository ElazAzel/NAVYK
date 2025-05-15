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
  title: string;
  completed: boolean;
  startDate: string;
  endDate: string;
  score: number | null;
  progress?: number;
}

interface RecommendedCourse {
  title: string;
  level: string;
  duration: string;
  relevance: number;
  provider: string;
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
  const [activeTab, setActiveTab] = useState("overview");
  
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
      title: "Машинное обучение", 
      level: "Средний", 
      duration: "8 недель",
      relevance: 95,
      provider: "ТехноУниверситет"
    },
    { 
      title: "Мобильная разработка", 
      level: "Начальный", 
      duration: "6 недель",
      relevance: 88,
      provider: "Медиа Курсы"
    },
    { 
      title: "DevOps практики", 
      level: "Продвинутый", 
      duration: "10 недель",
      relevance: 75,
      provider: "IT Академия"
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
    <RoleLayout showSideNav={true} pageTitle="Дашборд">
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="col-span-1"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                    +12% с прошлого месяца
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground">Активных курсов</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="col-span-1"
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-500" />
                  </div>
                  <span className="text-xs font-medium bg-green-500/10 text-green-500 py-1 px-2 rounded-full">
                    +3 за неделю
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">7</h3>
                  <p className="text-sm text-muted-foreground">Достижений разблокировано</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="col-span-1"
          >
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-amber-500" />
                  </div>
                  <span className="text-xs font-medium bg-amber-500/10 text-amber-500 py-1 px-2 rounded-full">
                    Следующее: 15 апреля
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">4</h3>
                  <p className="text-sm text-muted-foreground">Предстоящих мероприятий</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="col-span-1"
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Building className="h-6 w-6 text-indigo-500" />
                  </div>
                  <span className="text-xs font-medium bg-indigo-500/10 text-indigo-500 py-1 px-2 rounded-full">
                    Релевантность: 85%
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-sm text-muted-foreground">Подходящих вакансий</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full max-w-4xl mb-6">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="courses">Курсы</TabsTrigger>
              <TabsTrigger value="events">Мероприятия</TabsTrigger>
              <TabsTrigger value="jobs" className="hidden md:inline-flex">Вакансии</TabsTrigger>
              <TabsTrigger value="achievements" className="hidden lg:inline-flex">Достижения</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <Card animation="hover">
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
                                <div className={`mr-2 h-5 w-5 rounded-full ${course.progress > 0 ? 'bg-amber-500/20' : 'bg-muted'} flex items-center justify-center`}>
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
                              course.progress > 0 && (
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
                            {!course.completed && course.progress > 0 && (
                              <AnimatedProgressBar 
                                value={course.progress} 
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
                
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Рекомендации для вас</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="font-normal bg-secondary/20 text-secondary"
                      >
                        {recommendedCourses.length} курсов
                      </Badge>
                    </div>
                    <CardDescription>
                      На основе вашего профиля и интересов
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
                          href="/student/recommendations"
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
              
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Предстоящие мероприятия</CardTitle>
                    <CardDescription>События и встречи</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
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
                        <Link href="/student/events">
                          <Button size="sm" variant="ghost" className="w-full justify-center">
                            Все мероприятия
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Ваши навыки</CardTitle>
                    <CardDescription>Текущий уровень</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
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
                        <Link href="/student/skills">
                          <Button size="sm" variant="ghost" className="w-full justify-center">
                            Полный профиль навыков
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика активности</CardTitle>
                    <CardDescription>За последний месяц</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
                        <Link href="/student/activity">
                          <Button size="sm" variant="ghost" className="w-full justify-center">
                            Подробная статистика
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="courses">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Активные курсы</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {activeCourses.map((course) => (
                      <Card key={course.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{course.title}</CardTitle>
                          <CardDescription className="flex justify-between">
                            <span>Прогресс: {course.progress}%</span>
                            <span className="font-medium">{course.completedLessons} из {course.totalLessons}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <AnimatedProgressBar 
                            value={course.progress} 
                            color={getProgressColor(course.progress)} 
                          />
                          
                          <div className="p-3 bg-muted rounded-md">
                            <div className="text-sm font-medium">Следующий урок:</div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">{course.nextLesson}</span>
                              <Badge variant="outline" className="font-normal">
                                <Clock className="h-3 w-3 mr-1" />
                                {course.nextDate}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            Преподаватель: {course.instructor}
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button size="sm" variant="outline">
                              Материалы
                            </Button>
                            <Button size="sm">
                              Продолжить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Рекомендуемые курсы</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recommendedCourses.map((course, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{course.title}</CardTitle>
                            <Badge className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white">
                              {course.relevance}%
                            </Badge>
                          </div>
                          <CardDescription>{course.level}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{course.provider}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1 pt-2">
                            <div className="text-sm font-medium">Почему вам подходит:</div>
                            <div className="text-sm text-muted-foreground">
                              Соответствует вашему профилю и дополняет ваши текущие навыки.
                            </div>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button size="sm" variant="outline">
                              Подробнее
                            </Button>
                            <Button size="sm">
                              Записаться
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Завершенные курсы</h3>
                  <div className="bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-6 p-3 text-sm font-medium border-b">
                      <div className="col-span-2">Название курса</div>
                      <div>Дата завершения</div>
                      <div className="text-center">Результат</div>
                      <div className="text-center">Сертификат</div>
                      <div className="text-center">Действия</div>
                    </div>
                    
                    {completedCourses.map((course) => (
                      <div 
                        key={course.id} 
                        className="grid grid-cols-6 p-3 text-sm hover:bg-muted/50 items-center"
                      >
                        <div className="col-span-2 font-medium">{course.title}</div>
                        <div className="text-muted-foreground">{course.completionDate}</div>
                        <div className="text-center">
                          <Badge className={`bg-${course.score >= 90 ? 'green' : course.score >= 75 ? 'blue' : 'amber'}-100 text-${course.score >= 90 ? 'green' : course.score >= 75 ? 'blue' : 'amber'}-700 border-${course.score >= 90 ? 'green' : course.score >= 75 ? 'blue' : 'amber'}-300`}>
                            {course.score}%
                          </Badge>
                        </div>
                        <div className="text-center">
                          {course.certificate ? (
                            <span className="inline-flex items-center text-green-600">
                              <span className="text-xs mr-1">✓</span> Получен
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Нет</span>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center space-x-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Award className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Вы записаны на мероприятия</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {registeredEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{event.title}</CardTitle>
                            {getEventStatusBadge(event.status)}
                          </div>
                          <CardDescription>{event.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{event.organizer}</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-md flex items-center">
                            <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                            <div className="text-sm">Место: {event.location}</div>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button size="sm" variant="outline">
                              Подробнее
                            </Button>
                            <Button size="sm" variant="destructive">
                              Отменить участие
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Доступные мероприятия</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    {availableEvents.map((event) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{event.title}</CardTitle>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <CardDescription>{event.date}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{event.participants} участников</span>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-md flex flex-col">
                            <div className="text-sm">Организатор: {event.organizer}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Осталось мест: {event.remaining}
                            </div>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button size="sm" variant="outline">
                              Подробнее
                            </Button>
                            <Button size="sm">
                              Записаться
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Прошедшие мероприятия</h3>
                  <div className="bg-muted/30 rounded-lg">
                    <div className="grid grid-cols-5 p-3 text-sm font-medium border-b">
                      <div className="col-span-2">Название</div>
                      <div>Дата</div>
                      <div>Организатор</div>
                      <div className="text-center">Материалы</div>
                    </div>
                    
                    {pastEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="grid grid-cols-5 p-3 text-sm hover:bg-muted/50 items-center"
                      >
                        <div className="col-span-2 font-medium">{event.title}</div>
                        <div className="text-muted-foreground">{event.date}</div>
                        <div className="text-muted-foreground">{event.organizer}</div>
                        <div className="text-center">
                          <div className="flex justify-center space-x-2">
                            {event.feedback && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Обратная связь">
                                <Star className="h-4 w-4 text-amber-500" />
                              </Button>
                            )}
                            {event.certificate && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Сертификат">
                                <Award className="h-4 w-4 text-primary" />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" title="Открыть детали">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Рекомендуемые вакансии</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {recommendedJobs.map((job) => (
                      <Card key={job.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{job.title}</CardTitle>
                              <CardDescription>{job.company}</CardDescription>
                            </div>
                            <Badge className={`bg-gradient-to-r ${job.matchScore > 90 ? 'from-green-500/80 to-emerald-500/80' : job.matchScore > 80 ? 'from-primary/80 to-secondary/80' : 'from-blue-500/80 to-cyan-500/80'} text-white`}>
                              {job.matchScore}% совпадение
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Building className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{job.location}</span>
                              {job.remote && (
                                <Badge variant="outline" className="ml-2 text-xs h-5 font-normal">Удаленно</Badge>
                              )}
                            </div>
                            <div className="font-medium text-primary">
                              {job.salary}
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            {job.description}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 pt-1">
                            {job.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="font-normal bg-secondary/10 text-secondary text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Опубликовано: {job.posted}
                            </div>
                            {job.deadline && (
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Срок: {job.deadline}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button size="sm" variant="outline">
                              Подробнее
                            </Button>
                            <Button size="sm">
                              Откликнуться
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Поиск вакансий</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Специализация</label>
                          <select className="w-full p-2 rounded-md border">
                            <option>Все специализации</option>
                            <option>Web-разработка</option>
                            <option>Mobile-разработка</option>
                            <option>Data Science</option>
                            <option>DevOps</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Город</label>
                          <select className="w-full p-2 rounded-md border">
                            <option>Все города</option>
                            <option>Москва</option>
                            <option>Санкт-Петербург</option>
                            <option>Новосибирск</option>
                            <option>Екатеринбург</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Опыт работы</label>
                          <select className="w-full p-2 rounded-md border">
                            <option>Любой опыт</option>
                            <option>Без опыта</option>
                            <option>От 1 года</option>
                            <option>От 3 лет</option>
                            <option>От 5 лет</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Тип занятости</label>
                          <select className="w-full p-2 rounded-md border">
                            <option>Любой тип</option>
                            <option>Полная занятость</option>
                            <option>Частичная занятость</option>
                            <option>Стажировка</option>
                            <option>Проектная работа</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>
                          Найти вакансии
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Учебные материалы по трудоустройству</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="p-3 rounded-lg bg-primary/10 mb-4 w-10 h-10 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <h4 className="text-base font-medium mb-2">Составление резюме</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Как составить идеальное резюме для IT компаний и пройти автоматические фильтры.
                        </p>
                        <div className="flex items-center text-xs text-primary">
                          <span>Открыть материал</span>
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="p-3 rounded-lg bg-secondary/10 mb-4 w-10 h-10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-secondary" />
                        </div>
                        <h4 className="text-base font-medium mb-2">Собеседование в IT</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Подготовка к техническим и поведенческим собеседованиям в IT компаниях.
                        </p>
                        <div className="flex items-center text-xs text-primary">
                          <span>Открыть материал</span>
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="p-3 rounded-lg bg-amber-500/10 mb-4 w-10 h-10 flex items-center justify-center">
                          <BarChart2 className="h-5 w-5 text-amber-500" />
                        </div>
                        <h4 className="text-base font-medium mb-2">Карьерный рост</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Планирование карьеры в IT и стратегии профессионального развития.
                        </p>
                        <div className="flex items-center text-xs text-primary">
                          <span>Открыть материал</span>
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleLayout>
  );
} 