"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  Search, Filter, BookOpen, Calendar, ChevronRight, 
  Star, BookmarkPlus, ListFilter, CheckCircle2, 
  User, Clock, BarChart3, BookCheck
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// Типы
interface Course {
  id: number;
  title: string;
  description: string;
  image?: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  startDate: string;
  endDate?: string;
  duration: string;
  tags: string[];
  level: "beginner" | "intermediate" | "advanced";
}

interface EnrolledCourse extends Course {
  progress: number;
  nextLesson?: {
    title: string;
    date: string;
  };
  assignments: {
    total: number;
    completed: number;
    upcoming?: {
      title: string;
      dueDate: string;
    };
  };
}

interface CompletedCourse extends Course {
  completionDate: string;
  grade?: string;
  certificate?: string;
  feedback?: string;
}

interface RecommendedCourse extends Course {
  matchScore: number;
  reasons: string[];
  enrollmentDeadline?: string;
  studentsEnrolled: number;
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Анимационные варианты
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Форматирование даты
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  // Получение оставшихся дней до дедлайна
  const getDaysRemaining = (dateString: string): string => {
    const deadline = new Date(dateString);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Срок истек";
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Завтра";
    
    return `${diffDays} дней`;
  };
  
  // Активные курсы
  const enrolledCourses: EnrolledCourse[] = [
    {
      id: 1,
      title: "Основы React разработки",
      description: "Практический курс по основам React. Создание компонентов, управление состоянием, жизненный цикл и хуки.",
      image: "/images/courses/react-basics.jpg",
      instructor: {
        name: "Александр Петров",
        avatar: "/avatars/instructor1.jpg"
      },
      startDate: "2023-03-10",
      endDate: "2023-06-15",
      duration: "12 недель",
      tags: ["React", "JavaScript", "Frontend"],
      level: "beginner",
      progress: 65,
      nextLesson: {
        title: "Работа с контекстом в React",
        date: "2023-05-25T15:00:00"
      },
      assignments: {
        total: 8,
        completed: 5,
        upcoming: {
          title: "Создание мини-приложения с использованием контекста",
          dueDate: "2023-06-01T23:59:59"
        }
      }
    },
    {
      id: 2,
      title: "Алгоритмы и структуры данных",
      description: "Фундаментальные алгоритмы и структуры данных. Сложность алгоритмов, сортировки, поиск, графы.",
      image: "/images/courses/algorithms.jpg",
      instructor: {
        name: "Елена Смирнова",
        avatar: "/avatars/instructor2.jpg"
      },
      startDate: "2023-04-05",
      endDate: "2023-07-10",
      duration: "14 недель",
      tags: ["Algorithms", "Data Structures", "Computer Science"],
      level: "intermediate",
      progress: 32,
      nextLesson: {
        title: "Алгоритмы на графах. Поиск кратчайшего пути",
        date: "2023-05-24T13:30:00"
      },
      assignments: {
        total: 10,
        completed: 3,
        upcoming: {
          title: "Реализация алгоритма Дейкстры",
          dueDate: "2023-05-30T23:59:59"
        }
      }
    }
  ];
  
  // Рекомендуемые курсы
  const recommendedCourses: RecommendedCourse[] = [
    {
      id: 101,
      title: "Углубленное изучение TypeScript",
      description: "Продвинутый курс по TypeScript. Типы данных, интерфейсы, дженерики, декораторы и работа с проектами.",
      image: "/images/courses/typescript.jpg",
      instructor: {
        name: "Дмитрий Иванов",
        avatar: "/avatars/instructor3.jpg"
      },
      startDate: "2023-06-20",
      endDate: "2023-09-10",
      duration: "12 недель",
      tags: ["TypeScript", "JavaScript", "Frontend"],
      level: "intermediate",
      matchScore: 95,
      reasons: [
        "Соответствует вашему уровню знаний JavaScript",
        "Дополняет ваш опыт работы с React",
        "Востребован на рынке труда"
      ],
      enrollmentDeadline: "2023-06-15",
      studentsEnrolled: 128
    },
    {
      id: 102,
      title: "Архитектура веб-приложений",
      description: "Принципы проектирования масштабируемых веб-приложений. Паттерны проектирования, микросервисы, API.",
      image: "/images/courses/web-architecture.jpg",
      instructor: {
        name: "Ольга Козлова",
        avatar: "/avatars/instructor4.jpg"
      },
      startDate: "2023-07-01",
      endDate: "2023-10-15",
      duration: "16 недель",
      tags: ["Architecture", "Web Development", "Design Patterns"],
      level: "advanced",
      matchScore: 85,
      reasons: [
        "Соответствует вашей карьерной цели",
        "Следующий шаг после изучения React",
        "Высокий спрос на рынке труда"
      ],
      enrollmentDeadline: "2023-06-25",
      studentsEnrolled: 72
    }
  ];
  
  // Завершенные курсы
  const completedCourses: CompletedCourse[] = [
    {
      id: 201,
      title: "Основы JavaScript",
      description: "Введение в JavaScript. Синтаксис, типы данных, функции, DOM, AJAX.",
      image: "/images/courses/javascript-basics.jpg",
      instructor: {
        name: "Алексей Сидоров",
        avatar: "/avatars/instructor5.jpg"
      },
      startDate: "2022-09-15",
      endDate: "2022-12-20",
      duration: "14 недель",
      tags: ["JavaScript", "Web Development", "Frontend"],
      level: "beginner",
      completionDate: "2022-12-18",
      grade: "A",
      certificate: "JS-BASIC-2022-1234",
      feedback: "Отличное выполнение заданий. Продемонстрированы сильные навыки решения задач."
    },
    {
      id: 202,
      title: "HTML и CSS для начинающих",
      description: "Основы веб-верстки. HTML-теги, CSS-свойства, адаптивность, флексы и гриды.",
      image: "/images/courses/html-css.jpg",
      instructor: {
        name: "Наталья Морозова",
        avatar: "/avatars/instructor6.jpg"
      },
      startDate: "2022-06-10",
      endDate: "2022-08-30",
      duration: "12 недель",
      tags: ["HTML", "CSS", "Web Design"],
      level: "beginner",
      completionDate: "2022-08-28",
      grade: "A-",
      certificate: "HTML-CSS-2022-5678"
    }
  ];
  
  // Получение значка уровня курса
  const getCourseLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Начальный</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Средний</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Продвинутый</Badge>;
      default:
        return <Badge variant="outline">Курс</Badge>;
    }
  };
  
  // Получение цвета прогресса
  const getProgressColor = (progress: number): string => {
    if (progress < 30) return "bg-amber-500";
    if (progress < 70) return "bg-blue-500";
    return "bg-green-500";
  };
  
  return (
    <RoleLayout pageTitle="Курсы">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Поиск и фильтрация */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск курсов..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Фильтры</span>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" />
                    <span className="hidden sm:inline">Сортировка</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Вкладки для разных типов курсов */}
        <Tabs defaultValue="enrolled" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="enrolled" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Мои курсы</span>
              <Badge variant="secondary" className="ml-1">{enrolledCourses.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Рекомендуемые</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Завершенные</span>
              <Badge variant="secondary" className="ml-1">{completedCourses.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          {/* Активные курсы */}
          <TabsContent value="enrolled">
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <CardTitle>{course.title}</CardTitle>
                            {getCourseLevelBadge(course.level)}
                          </div>
                          <CardDescription className="flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.instructor.name}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Прогресс курса</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className={`h-2 ${getProgressColor(course.progress)}`} />
                        </div>
                        
                        <p className="text-muted-foreground">{course.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Период обучения</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(course.startDate)} - {formatDate(course.endDate || "")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Продолжительность</p>
                              <p className="text-sm text-muted-foreground">{course.duration}</p>
                            </div>
                          </div>
                        </div>
                        
                        {course.nextLesson && (
                          <div className="bg-muted/30 p-3 rounded-md">
                            <p className="text-sm font-medium">Следующее занятие</p>
                            <p className="text-sm text-muted-foreground">{course.nextLesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(course.nextLesson.date)}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-start gap-2">
                          <BarChart3 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Задания</p>
                            <p className="text-sm text-muted-foreground">
                              {course.assignments.completed} из {course.assignments.total} выполнено
                            </p>
                          </div>
                        </div>
                        
                        {course.assignments.upcoming && (
                          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                            <p className="text-sm font-medium">Предстоящее задание</p>
                            <p className="text-sm text-muted-foreground">{course.assignments.upcoming.title}</p>
                            <p className="text-sm text-amber-600 dark:text-amber-400">
                              Сдать до: {formatDate(course.assignments.upcoming.dueDate)} 
                              (осталось {getDaysRemaining(course.assignments.upcoming.dueDate)})
                            </p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex flex-wrap justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ChevronRight className="h-4 w-4" />
                          <span>Материалы курса</span>
                        </Button>
                        
                        <Button variant="default" size="sm" className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>Перейти к обучению</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Рекомендуемые курсы */}
          <TabsContent value="recommended">
            <div className="space-y-6">
              {recommendedCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <Card className="relative overflow-hidden">
                    {/* Индикатор совпадения */}
                    <div className="absolute right-4 top-4 flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                        {course.matchScore}%
                      </div>
                      <span className="text-xs font-medium mt-1 text-muted-foreground">Совпадение</span>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <CardTitle>{course.title}</CardTitle>
                            {getCourseLevelBadge(course.level)}
                          </div>
                          <CardDescription className="flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.instructor.name}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{course.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Период обучения</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(course.startDate)} - {formatDate(course.endDate || "")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Продолжительность</p>
                              <p className="text-sm text-muted-foreground">{course.duration}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-medium">Почему вам подойдет этот курс:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {course.reasons.map((reason, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{reason}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Студентов зарегистрировано</p>
                            <p className="text-sm text-muted-foreground">{course.studentsEnrolled}</p>
                          </div>
                        </div>
                        
                        {course.enrollmentDeadline && (
                          <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                            <p className="text-sm font-medium">Запись до {formatDate(course.enrollmentDeadline)}</p>
                            <p className="text-sm text-amber-600 dark:text-amber-400">
                              Осталось: {getDaysRemaining(course.enrollmentDeadline)}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex flex-wrap justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ChevronRight className="h-4 w-4" />
                          <span>Подробнее</span>
                        </Button>
                        <Button variant="default" size="sm" className="flex items-center gap-1">
                          <BookmarkPlus className="h-4 w-4" />
                          <span>Записаться</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Завершенные курсы */}
          <TabsContent value="completed">
            <div className="space-y-6">
              {completedCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <Card className="bg-muted/10">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="flex items-center flex-wrap gap-2">
                            <CardTitle>{course.title}</CardTitle>
                            {getCourseLevelBadge(course.level)}
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              Завершен
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center mt-1">
                            <User className="h-4 w-4 mr-1 text-muted-foreground" />
                            {course.instructor.name}
                          </CardDescription>
                        </div>
                        
                        {course.grade && (
                          <div className="flex flex-col items-center">
                            <div className="text-2xl font-bold text-primary">{course.grade}</div>
                            <span className="text-xs font-medium text-muted-foreground">Итоговая оценка</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Период обучения</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(course.startDate)} - {formatDate(course.endDate || "")}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Завершен</p>
                              <p className="text-sm text-muted-foreground">{formatDate(course.completionDate)}</p>
                            </div>
                          </div>
                        </div>
                        
                        {course.certificate && (
                          <div className="flex items-center text-primary">
                            <BookCheck className="h-5 w-5 mr-2" />
                            <p className="text-sm">Сертификат: {course.certificate}</p>
                          </div>
                        )}
                        
                        {course.feedback && (
                          <div className="bg-muted/30 p-3 rounded-md">
                            <p className="text-sm font-medium">Обратная связь от преподавателя:</p>
                            <p className="text-sm text-muted-foreground">{course.feedback}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4">
                      <div className="w-full flex flex-wrap justify-between gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ChevronRight className="h-4 w-4" />
                          <span>Материалы курса</span>
                        </Button>
                        
                        {course.certificate && (
                          <Button variant="default" size="sm" className="flex items-center gap-1">
                            <BookCheck className="h-4 w-4" />
                            <span>Сертификат</span>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </RoleLayout>
  );
} 