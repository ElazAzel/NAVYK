"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Building, Briefcase, Calendar, ChevronRight, Star, BookmarkPlus, ListFilter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Типы
interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  type: "fulltime" | "parttime" | "contract" | "internship" | "remote";
  tags: string[];
  description: string;
  requirements: string[];
  postedDate: string;
  deadline?: string;
  isRemote?: boolean;
}

interface RecommendedJob extends Job {
  matchScore: number;
  relevantSkills: string[];
}

interface AppliedJob extends Job {
  status: "pending" | "interview" | "rejected" | "offer";
  appliedDate: string;
  feedback?: string;
}

export default function JobsPage() {
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
  
  // Получение дней с момента публикации
  const getDaysAgo = (dateString: string): string => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Сегодня";
    if (diffDays === 1) return "Вчера";
    
    return `${diffDays} дней назад`;
  };
  
  // Рекомендуемые вакансии
  const recommendedJobs: RecommendedJob[] = [
    {
      id: 1,
      title: "Frontend React Developer",
      company: "Tech Solutions",
      companyLogo: "/logos/tech-solutions.svg",
      location: "Москва",
      salary: "120 000 - 180 000 ₽",
      type: "fulltime",
      tags: ["React", "TypeScript", "TailwindCSS"],
      description: "Разработка современных веб-приложений на React. Работа в команде с опытными разработчиками.",
      requirements: ["Опыт работы с React от 1 года", "Знание TypeScript", "Навыки работы с REST API"],
      postedDate: "2023-05-01",
      deadline: "2023-06-01",
      isRemote: true,
      matchScore: 95,
      relevantSkills: ["React", "TypeScript", "TailwindCSS"]
    },
    {
      id: 2,
      title: "Junior Frontend Developer",
      company: "Innovative Startup",
      companyLogo: "/logos/innovative-startup.svg",
      location: "Санкт-Петербург",
      salary: "80 000 - 120 000 ₽",
      type: "fulltime",
      tags: ["JavaScript", "React", "CSS"],
      description: "Участие в разработке инновационного продукта. Возможность быстрого роста.",
      requirements: ["Базовые знания JavaScript", "Опыт работы с React", "Желание учиться"],
      postedDate: "2023-05-10",
      isRemote: false,
      matchScore: 85,
      relevantSkills: ["JavaScript", "React"]
    }
  ];
  
  // Примененные вакансии
  const appliedJobs: AppliedJob[] = [
    {
      id: 101,
      title: "Frontend Developer Intern",
      company: "Digital Agency",
      companyLogo: "/logos/digital-agency.svg",
      location: "Казань",
      type: "internship",
      tags: ["JavaScript", "HTML", "CSS"],
      description: "Стажировка для начинающих разработчиков. Обучение и работа над реальными проектами.",
      requirements: ["Базовые знания HTML/CSS/JS", "Желание учиться", "Портфолио проектов"],
      postedDate: "2023-04-15",
      deadline: "2023-05-15",
      isRemote: false,
      status: "interview",
      appliedDate: "2023-04-20",
      feedback: "Резюме рассмотрено, приглашение на собеседование."
    },
    {
      id: 102,
      title: "Junior React Developer",
      company: "WebTech",
      companyLogo: "/logos/webtech.svg",
      location: "Москва",
      salary: "100 000 - 130 000 ₽",
      type: "fulltime",
      tags: ["React", "JavaScript", "Git"],
      description: "Разработка веб-приложений на React в команде опытных разработчиков.",
      requirements: ["Опыт работы с React", "Знание JavaScript", "Опыт работы с Git"],
      postedDate: "2023-04-01",
      isRemote: true,
      status: "pending",
      appliedDate: "2023-04-05"
    }
  ];
  
  // Все доступные вакансии
  const availableJobs: Job[] = [
    {
      id: 201,
      title: "Middle Frontend Developer",
      company: "Enterprise Solutions",
      companyLogo: "/logos/enterprise-solutions.svg",
      location: "Москва",
      salary: "180 000 - 220 000 ₽",
      type: "fulltime",
      tags: ["React", "Redux", "TypeScript", "Next.js"],
      description: "Разработка корпоративных веб-приложений. Работа с микросервисной архитектурой.",
      requirements: ["Опыт работы от 2 лет", "Глубокое знание React", "Опыт работы с Redux", "TypeScript"],
      postedDate: "2023-05-05",
      deadline: "2023-06-10",
      isRemote: false
    },
    {
      id: 202,
      title: "Frontend React Developer (Part-time)",
      company: "Small Studio",
      companyLogo: "/logos/small-studio.svg",
      location: "Удаленно",
      salary: "45 000 - 70 000 ₽",
      type: "parttime",
      tags: ["React", "JavaScript", "Tailwind"],
      description: "Разработка UI компонентов для веб-приложений. Неполный рабочий день.",
      requirements: ["Опыт работы с React", "Знание JavaScript", "Верстка адаптивных интерфейсов"],
      postedDate: "2023-05-12",
      isRemote: true
    },
    {
      id: 203,
      title: "Junior Frontend Developer",
      company: "IT Academy",
      companyLogo: "/logos/it-academy.svg",
      location: "Екатеринбург",
      salary: "70 000 - 90 000 ₽",
      type: "fulltime",
      tags: ["JavaScript", "HTML", "CSS", "Vue"],
      description: "Разработка веб-интерфейсов для образовательной платформы. Возможность роста.",
      requirements: ["Базовые знания JavaScript", "Опыт верстки", "Желание учиться Vue.js"],
      postedDate: "2023-05-15",
      deadline: "2023-06-20",
      isRemote: false
    }
  ];
  
  // Получение значка типа вакансии
  const getJobTypeBadge = (type: string) => {
    switch (type) {
      case 'fulltime':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Полная занятость</Badge>;
      case 'parttime':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Частичная занятость</Badge>;
      case 'contract':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Контракт</Badge>;
      case 'internship':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Стажировка</Badge>;
      case 'remote':
        return <Badge variant="outline" className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100">Удаленная работа</Badge>;
      default:
        return <Badge variant="outline">Вакансия</Badge>;
    }
  };
  
  // Получение статуса заявки
  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">На рассмотрении</Badge>;
      case 'interview':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Собеседование</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Отказ</Badge>;
      case 'offer':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Предложение</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };
  
  return (
    <RoleLayout pageTitle="Вакансии">
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
                    placeholder="Поиск вакансий..."
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
        
        {/* Вкладки для разных типов вакансий */}
        <Tabs defaultValue="recommended" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Рекомендуемые</span>
            </TabsTrigger>
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Мои заявки</span>
              <Badge variant="secondary" className="ml-1">{appliedJobs.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <BookmarkPlus className="h-4 w-4" />
              <span>Все вакансии</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Рекомендуемые вакансии */}
          <TabsContent value="recommended">
            <div className="space-y-6">
              {recommendedJobs.map((job) => (
                <motion.div key={job.id} variants={item}>
                  <Card className="relative overflow-hidden">
                    {/* Индикатор совпадения */}
                    <div className="absolute right-4 top-4 flex flex-col items-center">
                      <div className="relative w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                        {job.matchScore}%
                      </div>
                      <span className="text-xs font-medium mt-1 text-muted-foreground">Совпадение</span>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={job.companyLogo} alt={job.company} />
                            <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-xl">{job.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                              {job.company}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{job.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Местоположение</p>
                              <p className="text-sm text-muted-foreground">
                                {job.location} {job.isRemote && "(Возможна удаленная работа)"}
                              </p>
                            </div>
                          </div>
                          
                          {job.salary && (
                            <div className="flex items-start gap-2">
                              <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Зарплата</p>
                                <p className="text-sm text-muted-foreground">{job.salary}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Опубликовано</p>
                              <p className="text-sm text-muted-foreground">{getDaysAgo(job.postedDate)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <p className="text-sm font-medium">Ваши навыки, соответствующие вакансии:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.relevantSkills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {getJobTypeBadge(job.type)}
                          {job.tags.map((tag, index) => (
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
                          <Briefcase className="h-4 w-4" />
                          <span>Откликнуться</span>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Заявки на вакансии */}
          <TabsContent value="applied">
            <div className="space-y-6">
              {appliedJobs.map((job) => (
                <motion.div key={job.id} variants={item}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={job.companyLogo} alt={job.company} />
                            <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center flex-wrap gap-2">
                              <CardTitle>{job.title}</CardTitle>
                              {getJobTypeBadge(job.type)}
                              {getApplicationStatusBadge(job.status)}
                            </div>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                              {job.company}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Местоположение</p>
                              <p className="text-sm text-muted-foreground">
                                {job.location} {job.isRemote && "(Возможна удаленная работа)"}
                              </p>
                            </div>
                          </div>
                          
                          {job.salary && (
                            <div className="flex items-start gap-2">
                              <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Зарплата</p>
                                <p className="text-sm text-muted-foreground">{job.salary}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Отклик отправлен</p>
                              <p className="text-sm text-muted-foreground">{formatDate(job.appliedDate)}</p>
                            </div>
                          </div>
                        </div>
                        
                        {job.feedback && (
                          <div className="bg-muted/30 p-3 rounded-md">
                            <p className="text-sm font-medium">Отзыв от работодателя:</p>
                            <p className="text-sm text-muted-foreground">{job.feedback}</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag, index) => (
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
                        
                        {job.status === 'pending' && (
                          <Button variant="default" size="sm" className="flex items-center gap-1 bg-red-500 hover:bg-red-600">
                            <span>Отозвать заявку</span>
                          </Button>
                        )}
                        
                        {job.status === 'interview' && (
                          <Button variant="default" size="sm" className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Подготовиться к собеседованию</span>
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Все доступные вакансии */}
          <TabsContent value="available">
            <div className="space-y-6">
              {availableJobs.map((job) => (
                <motion.div key={job.id} variants={item}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={job.companyLogo} alt={job.company} />
                            <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{job.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1 text-muted-foreground" />
                              {job.company}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{job.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Местоположение</p>
                              <p className="text-sm text-muted-foreground">
                                {job.location} {job.isRemote && "(Возможна удаленная работа)"}
                              </p>
                            </div>
                          </div>
                          
                          {job.salary && (
                            <div className="flex items-start gap-2">
                              <Briefcase className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Зарплата</p>
                                <p className="text-sm text-muted-foreground">{job.salary}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start gap-2">
                            <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Опубликовано</p>
                              <p className="text-sm text-muted-foreground">{getDaysAgo(job.postedDate)}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {getJobTypeBadge(job.type)}
                          {job.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Требования:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {job.requirements.map((req, index) => (
                              <li key={index} className="text-sm text-muted-foreground">{req}</li>
                            ))}
                          </ul>
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
                          <Briefcase className="h-4 w-4" />
                          <span>Откликнуться</span>
                        </Button>
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