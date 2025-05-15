"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  PlusCircle, Search, Filter, Clock, Users, Calendar, Briefcase,
  MapPin, DollarSign, ArrowUpDown, Edit, Trash, ExternalLink, Eye
} from "lucide-react";

// Интерфейсы для типизации данных
interface Applicant {
  id: string;
  name: string;
  avatar: string;
  appliedAt: string;
  status: "new" | "reviewing" | "interviewed" | "offered" | "rejected";
  matchPercent: number;
  resume: string;
}

interface JobVacancy {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary: string;
  posted: string;
  deadline: string;
  status: "active" | "paused" | "closed";
  applicants: Applicant[];
  description: string;
  requirements: string[];
  views: number;
  applications: number;
}

export default function EmployerJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  
  // Данные о вакансиях
  const [jobs, setJobs] = useState<JobVacancy[]>([
    {
      id: "job-1",
      title: "Старший Frontend-разработчик (React/NextJS)",
      department: "Разработка",
      location: "Москва / Удаленно",
      type: "full-time",
      salary: "от 180 000 ₽",
      posted: "2023-10-15",
      deadline: "2023-11-30",
      status: "active",
      views: 245,
      applications: 18,
      description: "Мы ищем опытного Frontend-разработчика для работы над нашими клиентскими приложениями. Вы будете работать в команде профессионалов над продуктами, которыми пользуются миллионы людей.",
      requirements: [
        "Опыт коммерческой разработки от 3-х лет",
        "Глубокие знания React и TypeScript",
        "Опыт работы с NextJS, Redux",
        "Понимание принципов UI/UX дизайна"
      ],
      applicants: [
        {
          id: "app-1",
          name: "Алексей Смирнов",
          avatar: "/avatars/applicant1.jpg",
          appliedAt: "2023-10-16",
          status: "interviewed",
          matchPercent: 92,
          resume: "/resumes/aleksey-resume.pdf"
        },
        {
          id: "app-2",
          name: "Мария Иванова",
          avatar: "/avatars/applicant2.jpg",
          appliedAt: "2023-10-17",
          status: "reviewing",
          matchPercent: 85,
          resume: "/resumes/maria-resume.pdf"
        },
        {
          id: "app-3",
          name: "Дмитрий Петров",
          avatar: "/avatars/applicant3.jpg",
          appliedAt: "2023-10-18",
          status: "new",
          matchPercent: 78,
          resume: "/resumes/dmitriy-resume.pdf"
        }
      ]
    },
    {
      id: "job-2",
      title: "UX/UI Дизайнер",
      department: "Дизайн",
      location: "Санкт-Петербург",
      type: "full-time",
      salary: "от 150 000 ₽",
      posted: "2023-10-20",
      deadline: "2023-12-15",
      status: "active",
      views: 187,
      applications: 12,
      description: "Ищем талантливого UX/UI дизайнера для создания интуитивно понятных и эстетически привлекательных интерфейсов для наших продуктов.",
      requirements: [
        "Опыт работы от 2-х лет",
        "Портфолио с примерами работ",
        "Знание Figma, Adobe XD",
        "Понимание принципов UX исследований"
      ],
      applicants: [
        {
          id: "app-4",
          name: "Екатерина Соколова",
          avatar: "/avatars/applicant4.jpg",
          appliedAt: "2023-10-21",
          status: "new",
          matchPercent: 89,
          resume: "/resumes/ekaterina-resume.pdf"
        },
        {
          id: "app-5",
          name: "Игорь Волков",
          avatar: "/avatars/applicant5.jpg",
          appliedAt: "2023-10-22",
          status: "new",
          matchPercent: 76,
          resume: "/resumes/igor-resume.pdf"
        }
      ]
    },
    {
      id: "job-3",
      title: "Python разработчик (Data Science)",
      department: "Data Science",
      location: "Удаленно",
      type: "contract",
      salary: "По договоренности",
      posted: "2023-10-25",
      deadline: "2023-12-01",
      status: "paused",
      views: 134,
      applications: 9,
      description: "Ищем Python разработчика для работы над проектами в области анализа данных и машинного обучения.",
      requirements: [
        "Опыт работы от 2-х лет",
        "Знание Python, Pandas, NumPy",
        "Опыт работы с ML библиотеками",
        "Понимание принципов Data Science"
      ],
      applicants: [
        {
          id: "app-6",
          name: "Андрей Козлов",
          avatar: "/avatars/applicant6.jpg",
          appliedAt: "2023-10-26",
          status: "reviewing",
          matchPercent: 94,
          resume: "/resumes/andrey-resume.pdf"
        }
      ]
    }
  ]);

  // Функция форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Функция получения цвета для статуса вакансии
  const getStatusColor = (status: JobVacancy["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-amber-100 text-amber-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Функция получения цвета для типа вакансии
  const getTypeColor = (type: JobVacancy["type"]) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-purple-100 text-purple-800";
      case "contract": return "bg-orange-100 text-orange-800";
      case "internship": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Функция фильтрации вакансий по активной вкладке
  const filteredJobs = jobs.filter(job => {
    if (activeTab === "active") return job.status === "active";
    if (activeTab === "paused") return job.status === "paused";
    if (activeTab === "closed") return job.status === "closed";
    return true;
  }).filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция создания новой вакансии
  const handleCreateJob = () => {
    console.log("Creating new job vacancy");
    // Здесь будет логика создания новой вакансии
  };

  // Анимация для элементов интерфейса
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <RoleLayout showSideNav={true} pageTitle="Управление вакансиями">
      <div className="container mx-auto py-6 space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Управление вакансиями</h1>
          <Button onClick={handleCreateJob} className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать вакансию
          </Button>
        </motion.div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Поиск вакансий..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Сортировка
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
              <TabsTrigger value="active">
                Активные
                <Badge variant="secondary" className="ml-2">{jobs.filter(j => j.status === "active").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="paused">
                Приостановленные
                <Badge variant="secondary" className="ml-2">{jobs.filter(j => j.status === "paused").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="closed">
                Закрытые
                <Badge variant="secondary" className="ml-2">{jobs.filter(j => j.status === "closed").length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Нет активных вакансий
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </TabsContent>

            <TabsContent value="paused" className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Нет приостановленных вакансий
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Нет закрытых вакансий
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </RoleLayout>
  );
}

// Компонент карточки вакансии
function JobCard({ job }: { job: JobVacancy }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const getStatusColor = (status: JobVacancy["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-amber-100 text-amber-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: JobVacancy["type"]) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-purple-100 text-purple-800";
      case "contract": return "bg-orange-100 text-orange-800";
      case "internship": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-y-4 flex-1">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <Badge className={getStatusColor(job.status)}>
                  {job.status === "active" ? "Активна" : job.status === "paused" ? "Приостановлена" : "Закрыта"}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-y-2 mb-3">
                <div className="flex items-center mr-4">
                  <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.department}</span>
                </div>
                <div className="flex items-center mr-4">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Badge variant="outline" className={getTypeColor(job.type)}>
                    {job.type === "full-time" ? "Полная занятость" : 
                     job.type === "part-time" ? "Частичная занятость" : 
                     job.type === "contract" ? "Контракт" : "Стажировка"}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{job.salary}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-y-2">
              <div className="flex items-center mr-4">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Опубликовано: {formatDate(job.posted)}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Срок: {formatDate(job.deadline)}</span>
              </div>
              <div className="flex items-center mr-4">
                <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{job.views} просмотров</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{job.applications} заявок</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Просмотр
            </Button>
            <Button variant="destructive" size="sm" className="flex-1">
              <Trash className="h-4 w-4 mr-2" />
              Удалить
            </Button>
          </div>
        </div>
        
        {job.applicants.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-3">Последние кандидаты ({job.applicants.length})</h4>
            <div className="space-y-3">
              {job.applicants.slice(0, 2).map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between border rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <img src={applicant.avatar} alt={applicant.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{applicant.name}</div>
                      <div className="text-sm text-muted-foreground">Заявка от {formatDate(applicant.appliedAt)}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge className={
                      applicant.status === "new" ? "bg-blue-100 text-blue-800" :
                      applicant.status === "reviewing" ? "bg-amber-100 text-amber-800" :
                      applicant.status === "interviewed" ? "bg-purple-100 text-purple-800" :
                      applicant.status === "offered" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {
                        applicant.status === "new" ? "Новая" :
                        applicant.status === "reviewing" ? "На рассмотрении" :
                        applicant.status === "interviewed" ? "Интервью проведено" :
                        applicant.status === "offered" ? "Предложение отправлено" :
                        "Отклонена"
                      }
                    </Badge>
                    <div className="ml-3 flex items-center">
                      <span className="text-sm font-medium">Совпадение: {applicant.matchPercent}%</span>
                      <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            applicant.matchPercent >= 90 ? "bg-green-500" :
                            applicant.matchPercent >= 70 ? "bg-amber-500" :
                            "bg-orange-500"
                          }`}
                          style={{ width: `${applicant.matchPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {job.applicants.length > 2 && (
                <Button variant="link" className="mt-2">
                  Показать всех кандидатов ({job.applicants.length})
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
} 