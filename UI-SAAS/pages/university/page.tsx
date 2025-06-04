"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AnimatedStatistics, AnimatedProgressBar, AnimatedDemoChart } from "@/app/components/animations";
import { motion } from "framer-motion";
import { 
  School, Users, Calendar, BarChart2, BookOpen, Building, 
  Clock, ArrowUpRight, ChevronRight, TrendingUp, Bell,
  Award, GraduationCap, FileBarChart, UserPlus
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

export default function UniversityDashboard() {
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
  
  // Данные для направлений
  const popularMajors = [
    { title: "Программная инженерия", students: 486, growth: "+12%" },
    { title: "Информационные системы", students: 352, growth: "+8%" },
    { title: "Кибербезопасность", students: 215, growth: "+15%" },
  ];
  
  // Данные для мероприятий
  const upcomingEvents = [
    { 
      title: "День открытых дверей факультета IT", 
      date: "18 Апреля, 11:00", 
      type: "Ознакомительное",
      expected: 120 
    },
    { 
      title: "Встреча с работодателями: карьерные возможности", 
      date: "22 Апреля, 15:00", 
      type: "Карьера",
      expected: 85 
    },
    { 
      title: "Научная конференция \"Технологии будущего\"", 
      date: "25 Апреля, 10:00", 
      type: "Научное",
      expected: 50 
    },
  ];
  
  // Данные для студентов
  const topStudents = [
    { 
      name: "Александр Смирнов", 
      major: "Программная инженерия", 
      year: 3,
      avatar: "/avatars/student.png",
      achievements: 8 
    },
    { 
      name: "Мария Иванова", 
      major: "Кибербезопасность", 
      year: 4,
      avatar: null,
      achievements: 12 
    },
    { 
      name: "Дмитрий Петров", 
      major: "Информационные системы", 
      year: 2,
      avatar: null,
      achievements: 5 
    },
  ];
  
  // Данные для партнеров
  const partners = [
    { name: "ТехноПром", type: "IT", students: 12, vacancies: 5 },
    { name: "Финтех Солюшнс", type: "Финансы", students: 8, vacancies: 3 },
    { name: "Медиа Груп", type: "Медиа", students: 6, vacancies: 2 },
  ];
  
  return (
    <RoleLayout pageTitle="Управление университетом">
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
                  <AnimatedStatistics from={0} to={2845} />
                </div>
                <p className="text-xs text-muted-foreground">
                  зарегистрированных пользователей
                </p>
                <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+215 за последний семестр</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Мероприятия</CardTitle>
                <Calendar className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={14} />
                </div>
                <p className="text-xs text-muted-foreground">
                  запланировано на месяц
                </p>
                <div className="mt-3">
                  <AnimatedProgressBar value={50} max={100} color="secondary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Вовлеченность</CardTitle>
                <BarChart2 className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={67.3} suffix="%" />
                </div>
                <p className="text-xs text-muted-foreground">
                  активных студентов
                </p>
                <div className="mt-3">
                  <AnimatedProgressBar value={67.3} max={100} color="accent" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Партнеры</CardTitle>
                <Building className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={28} />
                </div>
                <p className="text-xs text-muted-foreground">
                  компаний-партнеров
                </p>
                <div className="mt-3 flex items-center text-xs text-blue-600 dark:text-blue-500">
                  <Badge className="h-5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800">
                    5 новых за квартал
                  </Badge>
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
              <TabsTrigger value="events" onClick={() => setActiveTab("events")}>Мероприятия</TabsTrigger>
              <TabsTrigger value="partners" onClick={() => setActiveTab("partners")}>Партнеры</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Популярные направления</CardTitle>
                      <Badge variant="outline" className="font-normal">
                        ТОП 3
                      </Badge>
                    </div>
                    <CardDescription>
                      Наиболее востребованные специальности
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {popularMajors.map((major, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div className={`mr-2 h-3 w-3 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <span className="font-medium group-hover:text-primary transition-colors">{major.title}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">{major.students} студентов</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {index === 0 ? "Бакалавриат / Магистратура" : "Бакалавриат"}
                            </span>
                            <span className="flex items-center text-green-600 dark:text-green-500">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              {major.growth}
                            </span>
                          </div>
                          <AnimatedProgressBar 
                            value={index === 0 ? 80 : index === 1 ? 60 : 40} 
                            color={index === 0 ? 'primary' : index === 1 ? 'yellow-500' : 'red-500'} 
                            className="mt-2"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <Link
                        href="/university/majors"
                        className="inline-flex items-center text-sm text-primary"
                      >
                        Все направления
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Предстоящие мероприятия</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="font-normal bg-secondary/20 text-secondary"
                      >
                        {upcomingEvents.length} запланировано
                      </Badge>
                    </div>
                    <CardDescription>
                      События университета
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start group cursor-pointer transition-all">
                          <div className="mr-4 mt-1 p-2 rounded-full bg-accent/10 text-accent">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="font-medium group-hover:text-primary transition-colors">{event.title}</p>
                              <Badge className="ml-2 h-5 text-[10px]">{event.type}</Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {event.date}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              Ожидается: {event.expected} участников
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
                          href="/university/events"
                          className="inline-flex items-center text-sm text-primary"
                        >
                          Все мероприятия
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                        <Button variant="outline" size="sm">
                          <Bell className="h-3.5 w-3.5 mr-1.5" />
                          Уведомления
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Топ студентов</CardTitle>
                    <Badge className="font-normal">
                      Всего: 2845 студентов
                    </Badge>
                  </div>
                  <CardDescription>Студенты с наибольшим количеством достижений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topStudents.map((student, index) => (
                      <div key={index} className="flex items-start group hover:bg-muted/50 p-3 rounded-md transition-colors cursor-pointer">
                        <div className="relative mr-4">
                          <Avatar className="h-12 w-12 ring-2 ring-primary/30">
                            <AvatarImage src={student.avatar || undefined} alt={student.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-2 -right-2 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <GraduationCap className="h-3.5 w-3.5 mr-1" />
                                {student.major}, {student.year} курс
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Award className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">{student.achievements} достижений</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              Профиль
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              Достижения
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              Статистика
                            </Button>
                          </div>
                        </div>
                        
                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100">
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex justify-between pt-3 border-t">
                      <Button size="sm" variant="outline">
                        <FileBarChart className="h-3.5 w-3.5 mr-1.5" />
                        Экспорт данных
                      </Button>
                      <Link href="/university/students">
                        <Button size="sm">
                          Все студенты
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление мероприятиями</CardTitle>
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Создать мероприятие
                    </Button>
                  </div>
                  <CardDescription>Запланированные события университета</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-3 text-sm font-medium border-b">
                      <div>Название</div>
                      <div>Дата</div>
                      <div>Тип</div>
                      <div className="text-center">Ожидается</div>
                      <div className="text-center">Действия</div>
                    </div>
                    
                    {upcomingEvents.map((event, index) => (
                      <div 
                        key={index} 
                        className="grid grid-cols-5 p-3 text-sm hover:bg-muted/50 items-center"
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-muted-foreground">{event.date}</div>
                        <div>
                          <Badge variant="outline" className="font-normal">{event.type}</Badge>
                        </div>
                        <div className="text-center">{event.expected}</div>
                        <div className="text-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Bell className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="partners">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Партнеры университета</CardTitle>
                    <Button>
                      <Building className="h-4 w-4 mr-2" />
                      Добавить партнера
                    </Button>
                  </div>
                  <CardDescription>Компании, сотрудничающие с университетом</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {partners.map((partner, index) => (
                      <div key={index} className="flex items-start hover:bg-muted/50 p-3 rounded-md transition-colors cursor-pointer">
                        <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl font-bold text-primary">
                          {partner.name[0]}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{partner.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Building className="h-3.5 w-3.5 mr-1" />
                                {partner.type}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <p className="text-xl font-bold text-primary">{partner.students}</p>
                                <p className="text-xs text-muted-foreground">Студентов</p>
                              </div>
                              <div>
                                <p className="text-xl font-bold text-secondary">{partner.vacancies}</p>
                                <p className="text-xs text-muted-foreground">Вакансий</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <Users className="h-3.5 w-3.5 mr-1.5" />
                              Студенты
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                              Вакансии
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              <FileBarChart className="h-3.5 w-3.5 mr-1.5" />
                              Аналитика
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Аналитика по направлениям</CardTitle>
            <CardDescription>Распределение студентов по специальностям</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <AnimatedDemoChart />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Всего направлений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedStatistics from={0} to={12} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Активных направлений обучения
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Средний балл</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedStatistics from={0} to={4.2} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    По всем направлениям
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Трудоустройство</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedStatistics from={0} to={76} suffix="%" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    По профилю обучения
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleLayout>
  );
} 