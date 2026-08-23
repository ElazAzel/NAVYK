"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AnimatedStatistics, AnimatedProgressBar, AnimatedDemoChart } from "@/app/components/animations";
import { motion } from "framer-motion";
import { 
  Briefcase, Users, Building, BarChart2, Calendar, 
  Clock, ArrowUpRight, TrendingUp, ChevronRight,
  FileCheck, UserPlus, Target, Bell, Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

export default function EmployerDashboard() {
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
  
  // Данные для вакансий
  const activeJobs = [
    { title: "Frontend разработчик", applicants: 12, views: 142, created: "10.04.2023" },
    { title: "UX/UI дизайнер", applicants: 8, views: 97, created: "15.04.2023" },
    { title: "DevOps инженер", applicants: 6, views: 78, created: "20.04.2023" },
  ];
  
  // Данные для соискателей
  const recentApplicants = [
    { 
      name: "Александр Иванов", 
      position: "Frontend разработчик", 
      avatar: "/avatars/student.png",
      status: "new" 
    },
    { 
      name: "Елена Смирнова", 
      position: "UX/UI дизайнер", 
      avatar: null,
      status: "interview" 
    },
    { 
      name: "Дмитрий Козлов", 
      position: "DevOps инженер", 
      avatar: null,
      status: "review" 
    },
  ];
  
  // Данные для грядущих интервью
  const upcomingInterviews = [
    { 
      candidate: "Александр Иванов", 
      position: "Frontend разработчик", 
      date: "14 Апреля, 10:00", 
      type: "Техническое интервью" 
    },
    { 
      candidate: "Елена Смирнова", 
      position: "UX/UI дизайнер", 
      date: "16 Апреля, 14:30", 
      type: "Презентация портфолио" 
    }
  ];
  
  // Получение статуса кандидата
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "new":
        return <Badge className="bg-blue-500">Новый</Badge>;
      case "review":
        return <Badge className="bg-yellow-500">На рассмотрении</Badge>;
      case "interview":
        return <Badge className="bg-green-500">Интервью</Badge>;
      case "offer":
        return <Badge className="bg-purple-500">Предложение</Badge>;
      case "hired":
        return <Badge className="bg-green-700">Нанят</Badge>;
      case "rejected":
        return <Badge variant="destructive">Отклонен</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };
  
  return (
    <RoleLayout pageTitle="Панель управления компанией">
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
                <CardTitle className="text-sm font-medium">Активные вакансии</CardTitle>
                <Briefcase className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={12} />
                </div>
                <p className="text-xs text-muted-foreground">
                  открытых позиций
                </p>
                <div className="mt-3 flex items-center text-xs text-green-600 dark:text-green-500">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+3 за последний месяц</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Кандидаты</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={48} />
                </div>
                <p className="text-xs text-muted-foreground">
                  активных соискателей
                </p>
                <div className="mt-3">
                  <AnimatedProgressBar value={60} max={100} color="secondary" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Найм за квартал</CardTitle>
                <Building className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={8} />
                </div>
                <p className="text-xs text-muted-foreground">
                  трудоустроенных кандидатов
                </p>
                <div className="mt-3 flex items-center text-xs">
                  <Badge className="bg-accent h-5">+20% к прошлому кварталу</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="overflow-hidden" variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
                <BarChart2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <AnimatedStatistics from={0} to={16.8} suffix="%" />
                </div>
                <p className="text-xs text-muted-foreground">
                  от просмотра до отклика
                </p>
                <div className="mt-3">
                  <AnimatedProgressBar value={16.8} max={100} color="blue-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <div className="mb-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Обзор</TabsTrigger>
              <TabsTrigger value="jobs" onClick={() => setActiveTab("jobs")}>Вакансии</TabsTrigger>
              <TabsTrigger value="applicants" onClick={() => setActiveTab("applicants")}>Кандидаты</TabsTrigger>
              <TabsTrigger value="analytics" onClick={() => setActiveTab("analytics")}>Аналитика</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2">
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Популярные вакансии</CardTitle>
                      <Badge variant="outline" className="font-normal">
                        ТОП 3
                      </Badge>
                    </div>
                    <CardDescription>
                      Наиболее просматриваемые вакансии
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {activeJobs.map((job, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center">
                              <div className={`mr-2 h-3 w-3 rounded-full ${index === 0 ? 'bg-primary' : index === 1 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <span className="font-medium group-hover:text-primary transition-colors">{job.title}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">{job.views} просмотров</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {job.applicants} соискателей
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              От {job.created}
                            </span>
                          </div>
                          <AnimatedProgressBar 
                            value={index === 0 ? 75 : index === 1 ? 50 : 40} 
                            color={index === 0 ? 'primary' : index === 1 ? 'yellow-500' : 'red-500'} 
                            className="mt-2"
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t">
                      <Link
                        href="/employer/jobs"
                        className="inline-flex items-center text-sm text-primary"
                      >
                        Все вакансии
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card animation="hover">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Ближайшие собеседования</CardTitle>
                      <Badge 
                        variant="secondary" 
                        className="font-normal bg-secondary/20 text-secondary"
                      >
                        {upcomingInterviews.length} запланировано
                      </Badge>
                    </div>
                    <CardDescription>
                      Запланированные встречи
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingInterviews.map((interview, index) => (
                        <div key={index} className="flex items-start group cursor-pointer transition-all">
                          <div className="mr-4 mt-1 p-2 rounded-full bg-accent/10 text-accent">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <p className="font-medium group-hover:text-primary transition-colors">{interview.candidate}</p>
                              <Badge className="ml-2 h-5 text-[10px]">{interview.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{interview.position}</p>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="mr-1 h-3 w-3" />
                              {interview.date}
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
                          href="/employer/interviews"
                          className="inline-flex items-center text-sm text-primary"
                        >
                          Все собеседования
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                        <Button variant="outline" size="sm">
                          <Bell className="h-3.5 w-3.5 mr-1.5" />
                          Напоминания
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Управление вакансиями</CardTitle>
                    <Button>
                      <Briefcase className="h-4 w-4 mr-2" />
                      Новая вакансия
                    </Button>
                  </div>
                  <CardDescription>Список всех ваших активных вакансий</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="relative w-64">
                        <input 
                          type="text" 
                          placeholder="Поиск вакансий..." 
                          className="h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-3.5 w-3.5 mr-1.5" />
                        Фильтр
                      </Button>
                    </div>
                    
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 p-3 text-sm font-medium border-b">
                        <div>Название</div>
                        <div>Создана</div>
                        <div className="text-center">Просмотры</div>
                        <div className="text-center">Соискатели</div>
                        <div className="text-center">Действия</div>
                      </div>
                      
                      {activeJobs.map((job, index) => (
                        <div 
                          key={index} 
                          className="grid grid-cols-5 p-3 text-sm hover:bg-muted/50 items-center"
                        >
                          <div className="font-medium">{job.title}</div>
                          <div className="text-muted-foreground">{job.created}</div>
                          <div className="text-center">{job.views}</div>
                          <div className="text-center">{job.applicants}</div>
                          <div className="text-center space-x-2">
                            <Button size="sm" variant="ghost">
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <FileCheck className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="applicants">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Недавние кандидаты</CardTitle>
                    <Badge className="font-normal">
                      Всего: 48 соискателей
                    </Badge>
                  </div>
                  <CardDescription>Последние отклики на ваши вакансии</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <div className="grid grid-cols-5 p-3 text-sm font-medium border-b">
                      <div>Соискатель</div>
                      <div>Позиция</div>
                      <div className="text-center">Статус</div>
                      <div className="text-center">Дата отклика</div>
                      <div className="text-center">Действия</div>
                    </div>
                    
                    {recentApplicants.map((applicant, index) => (
                      <div 
                        key={index} 
                        className="grid grid-cols-5 p-3 text-sm hover:bg-muted/50 items-center"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={applicant.avatar || undefined} alt={applicant.name} />
                            <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{applicant.name}</span>
                        </div>
                        <div className="text-muted-foreground">{applicant.position}</div>
                        <div className="text-center">{getStatusBadge(applicant.status)}</div>
                        <div className="text-center text-muted-foreground">
                          {index === 0 ? "Вчера" : index === 1 ? "3 дня назад" : "Неделю назад"}
                        </div>
                        <div className="text-center flex justify-center space-x-2">
                          <Button size="sm" variant="outline">
                            <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                            Интервью
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Target className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Аналитика по вакансиям</CardTitle>
                  <CardDescription>Статистика за последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <AnimatedDemoChart />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Всего просмотров</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          <AnimatedStatistics from={0} to={420} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          За последние 30 дней
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Новых откликов</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          <AnimatedStatistics from={0} to={52} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          За последние 30 дней
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Конверсия просмотров</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          <AnimatedStatistics from={0} to={12.4} suffix="%" />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          За последние 30 дней
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleLayout>
  );
} 