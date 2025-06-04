"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AnimatedStatistics, AnimatedProgressBar, AnimatedDemoChart } from "@/app/components/animations";
import { motion } from "framer-motion";
import { 
  GraduationCap, Calendar, BookOpen, Building, Award, 
  TrendingUp, Clock, BarChart2, Users, Target, 
  ChevronRight, ArrowUpRight, CheckCircle, FileCheck,
  MessageSquare, Presentation, BookMarked, Heart,
  LucideIcon, PenLine, User, Star
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

interface Student {
  id: number;
  name: string;
  avatar?: string;
  course: string;
  progress: number;
  lastActive: string;
  email: string;
  assignments: {
    total: number;
    completed: number;
    pending: number;
  }
}

interface Course {
  id: number;
  title: string;
  students: number;
  progress: number;
  modules: number;
  nextSession: string;
}

interface Assignment {
  id: number;
  title: string;
  student: {
    id: number;
    name: string;
    avatar?: string;
  };
  course: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "needs_revision";
}

interface Feedback {
  id: number;
  studentName: string;
  studentAvatar?: string;
  course: string;
  rating: number;
  text: string;
  date: string;
}

export default function MentorDashboard() {
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
  
  // Данные для студентов
  const students: Student[] = [
    {
      id: 1,
      name: "Александр Смирнов",
      avatar: "/avatars/student.png",
      course: "Веб-разработка",
      progress: 67,
      lastActive: "Сегодня, 10:23",
      email: "alex@example.com",
      assignments: {
        total: 24,
        completed: 16,
        pending: 2
      }
    },
    {
      id: 2,
      name: "Мария Иванова",
      course: "Python для Data Science",
      progress: 42,
      lastActive: "Вчера, 18:45",
      email: "maria@example.com",
      assignments: {
        total: 20,
        completed: 8,
        pending: 3
      }
    },
    {
      id: 3,
      name: "Дмитрий Петров",
      course: "Основы UX/UI дизайна",
      progress: 85,
      lastActive: "Сегодня, 09:10",
      email: "dmitry@example.com",
      assignments: {
        total: 18,
        completed: 15,
        pending: 0
      }
    },
  ];
  
  // Данные для курсов
  const courses: Course[] = [
    {
      id: 1,
      title: "Веб-разработка",
      students: 12,
      progress: 60,
      modules: 8,
      nextSession: "Завтра, 15:00"
    },
    {
      id: 2,
      title: "Python для Data Science",
      students: 8,
      progress: 45,
      modules: 10,
      nextSession: "Четверг, 14:30"
    },
    {
      id: 3,
      title: "Основы UX/UI дизайна",
      students: 10,
      progress: 75,
      modules: 6,
      nextSession: "Сегодня, 17:00"
    },
  ];
  
  // Данные для заданий на проверку
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Модуль 4: CSS Flexbox и Grid",
      student: {
        id: 1,
        name: "Александр Смирнов",
        avatar: "/avatars/student.png"
      },
      course: "Веб-разработка",
      submittedAt: "Сегодня, 09:45",
      status: "pending"
    },
    {
      id: 2,
      title: "Модуль 3: Pandas и NumPy",
      student: {
        id: 2,
        name: "Мария Иванова"
      },
      course: "Python для Data Science",
      submittedAt: "Вчера, 15:20",
      status: "pending"
    },
    {
      id: 3,
      title: "Модуль 6: Прототипирование",
      student: {
        id: 3,
        name: "Дмитрий Петров"
      },
      course: "Основы UX/UI дизайна",
      submittedAt: "Вчера, 18:05",
      status: "needs_revision"
    },
    {
      id: 4,
      title: "Модуль 5: JavaScript DOM",
      student: {
        id: 1,
        name: "Александр Смирнов",
        avatar: "/avatars/student.png"
      },
      course: "Веб-разработка",
      submittedAt: "3 дня назад",
      status: "reviewed"
    },
  ];
  
  // Данные для обратной связи
  const feedback: Feedback[] = [
    {
      id: 1,
      studentName: "Александр Смирнов",
      studentAvatar: "/avatars/student.png",
      course: "Веб-разработка",
      rating: 5,
      text: "Очень структурированный и понятный материал. Спасибо за подробные разъяснения сложных концепций!",
      date: "2 дня назад"
    },
    {
      id: 2,
      studentName: "Мария Иванова",
      course: "Python для Data Science",
      rating: 4,
      text: "Полезные практические задания, но хотелось бы немного больше теории по некоторым темам.",
      date: "4 дня назад"
    },
  ];
  
  // Получение статуса задания
  const getAssignmentStatusBadge = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-300">На проверке</Badge>;
      case "reviewed":
        return <Badge className="bg-green-100 text-green-700 border-green-300">Проверено</Badge>;
      case "needs_revision":
        return <Badge className="bg-red-100 text-red-700 border-red-300">Требует доработки</Badge>;
      default:
        return null;
    }
  };
  
  // Получение цвета прогресса
  const getProgressColor = (progress: number): string => {
    if (progress < 30) return "red-500";
    if (progress < 70) return "amber-500";
    return "green-500";
  };
  
  return (
    <RoleLayout pageTitle="Дашборд ментора">
      <div className="space-y-8">
        <motion.div 
          variants={container} 
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активные студенты</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={students.length} />
                </div>
                <p className="text-xs text-muted-foreground">
                  в ваших курсах
                </p>
                <div className="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>2 новых на этой неделе</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Активные курсы</CardTitle>
                <BookOpen className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={courses.length} />
                </div>
                <p className="text-xs text-muted-foreground">
                  в менторстве
                </p>
                <div className="mt-3">
                  <AnimatedProgressBar 
                    value={70} 
                    max={100} 
                    color="secondary" 
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Задания на проверке</CardTitle>
                <FileCheck className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={assignments.filter(a => a.status === "pending").length} />
                </div>
                <p className="text-xs text-muted-foreground">
                  ожидают вашей проверки
                </p>
                <div className="mt-3 flex items-center text-xs text-amber-600 dark:text-amber-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Крайний срок: сегодня</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Рейтинг ментора</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={4.8} />
                </div>
                <p className="text-xs text-muted-foreground">
                  средняя оценка студентов
                </p>
                <div className="mt-3 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-200 dark:text-yellow-800'}`} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="mb-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Обзор</TabsTrigger>
              <TabsTrigger value="students" onClick={() => setActiveTab("students")}>Студенты</TabsTrigger>
              <TabsTrigger value="courses" onClick={() => setActiveTab("courses")}>Курсы</TabsTrigger>
              <TabsTrigger value="assignments" onClick={() => setActiveTab("assignments")}>Задания</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Активные задания</CardTitle>
                      <Badge variant="outline" className="font-normal">
                        {assignments.filter(a => a.status === "pending").length} на проверке
                      </Badge>
                    </div>
                    <CardDescription>
                      Задания, ожидающие вашей проверки
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignments.filter(a => a.status === "pending").map((assignment) => (
                      <div key={assignment.id} className="group cursor-pointer hover:bg-muted/50 p-3 rounded-md transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={assignment.student.avatar || undefined} alt={assignment.student.name} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {assignment.student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium group-hover:text-primary transition-colors">
                                {assignment.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {assignment.student.name}
                              </div>
                            </div>
                          </div>
                          {getAssignmentStatusBadge(assignment.status)}
                        </div>
                        <div className="pl-10">
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {assignment.course}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {assignment.submittedAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-3 border-t">
                      <Link
                        href="/mentor/assignments"
                        className="inline-flex items-center text-sm text-primary"
                      >
                        Все задания
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Ближайшие занятия</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="font-normal bg-secondary/20 text-secondary"
                      >
                        Эта неделя
                      </Badge>
                    </div>
                    <CardDescription>
                      Запланированные сессии и встречи
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-start group cursor-pointer transition-all">
                          <div className="mr-4 mt-1 p-2 rounded-full bg-accent/10 text-accent">
                            <Presentation className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="font-medium group-hover:text-primary transition-colors">
                                {course.title}: Занятие #{Math.floor(course.progress / 10)}
                              </p>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {course.nextSession}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              {course.students} студентов
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
                          href="/mentor/schedule"
                          className="inline-flex items-center text-sm text-primary"
                        >
                          Расписание
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          Добавить занятие
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Студенты на курсах</CardTitle>
                    <CardDescription>Прогресс ваших студентов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div key={student.id} className="group hover:bg-muted/30 p-2 rounded-md transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={student.avatar || undefined} alt={student.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{student.progress}%</span>
                          </div>
                          <div className="pl-10">
                            <div className="flex items-center text-xs text-muted-foreground mb-1">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {student.course}
                            </div>
                            <AnimatedProgressBar 
                              value={student.progress} 
                              color={getProgressColor(student.progress)} 
                            />
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t">
                        <Link href="/mentor/students">
                          <Button size="sm" variant="ghost" className="w-full justify-center">
                            Все студенты
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Обратная связь</CardTitle>
                    <CardDescription>Отзывы ваших студентов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {feedback.map((item) => (
                        <div key={item.id} className="group hover:bg-muted/30 p-2 rounded-md transition-colors cursor-pointer">
                          <div className="flex items-center mb-1">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={item.studentAvatar || undefined} alt={item.studentName} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {item.studentName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.studentName}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.course} • {item.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-3 w-3 ${star <= item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-200 dark:text-yellow-800'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.text}
                          </p>
                        </div>
                      ))}
                      <div className="pt-2 border-t">
                        <Link href="/mentor/feedback">
                          <Button size="sm" variant="ghost" className="w-full justify-center">
                            Все отзывы
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Эффективность обучения</CardTitle>
                    <CardDescription>Общая статистика ваших курсов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="mr-4 p-2 rounded-md bg-primary/10">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Выполнено заданий</div>
                          <div className="text-2xl font-bold">85%</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 p-2 rounded-md bg-secondary/10">
                          <Target className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <div className="font-medium">Достижение целей</div>
                          <div className="text-2xl font-bold">92%</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 p-2 rounded-md bg-amber-500/10">
                          <PenLine className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-medium">Среднее время проверки</div>
                          <div className="text-2xl font-bold">8.4 ч</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4 p-2 rounded-md bg-blue-500/10">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Отвеченные вопросы</div>
                          <div className="text-2xl font-bold">97%</div>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <Link href="/mentor/statistics">
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
            
            <TabsContent value="students">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Ваши студенты</h3>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <FileCheck className="h-4 w-4 mr-2" />
                      Экспорт
                    </Button>
                    <Button size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Добавить студента
                    </Button>
                  </div>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Поиск студентов..."
                          className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <select className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                          <option>Все курсы</option>
                          <option>Веб-разработка</option>
                          <option>Python для Data Science</option>
                          <option>Основы UX/UI дизайна</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Сортировать по:</span>
                        <select className="px-2 py-1 border rounded-md text-sm focus:outline-none">
                          <option>Имени</option>
                          <option>Прогрессу</option>
                          <option>Последней активности</option>
                        </select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 p-3 text-sm font-medium border-b">
                        <div className="col-span-2">Студент</div>
                        <div>Курс</div>
                        <div>Прогресс</div>
                        <div>Статус заданий</div>
                        <div>Последняя активность</div>
                        <div className="text-center">Действия</div>
                      </div>
                      
                      {students.map((student) => (
                        <div 
                          key={student.id} 
                          className="grid grid-cols-7 p-3 text-sm hover:bg-muted/50 items-center border-b last:border-0"
                        >
                          <div className="col-span-2 flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={student.avatar || undefined} alt={student.name} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                          <div className="text-muted-foreground">{student.course}</div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs text-muted-foreground">{student.progress}%</span>
                            </div>
                            <AnimatedProgressBar 
                              value={student.progress} 
                              color={getProgressColor(student.progress)} 
                              height={6}
                            />
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-xs">
                              <span className="text-green-600 dark:text-green-500">{student.assignments.completed}</span>
                              <span className="text-muted-foreground">выполнено</span>
                              <span className="text-muted-foreground mx-1">/</span>
                              <span className="text-amber-600 dark:text-amber-500">{student.assignments.pending}</span>
                              <span className="text-muted-foreground">на проверке</span>
                            </div>
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {student.lastActive}
                          </div>
                          <div className="flex justify-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <FileCheck className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <BarChart2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Анализ студенческой активности</CardTitle>
                    <CardDescription>Вовлеченность студентов в обучение</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <AnimatedDemoChart />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Средний прогресс</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            <AnimatedStatistics from={0} to={64} suffix="%" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Все студенты
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Активность</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            <AnimatedStatistics from={0} to={78} suffix="%" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Еженедельная активность
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Выполнение заданий</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            <AnimatedStatistics from={0} to={85} suffix="%" />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Своевременное выполнение
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Другие вкладки будут добавлены в следующем обновлении */}
          </Tabs>
        </div>
      </div>
    </RoleLayout>
  );
} 