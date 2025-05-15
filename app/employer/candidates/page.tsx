"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  Search, Filter, Star, Check, Clock, Mail, Calendar,
  Download, ExternalLink, Users, ArrowUpDown, Briefcase,
  FileText, MessageSquare, MoreHorizontal, Phone, GraduationCap,
  MapPin
} from "lucide-react";

// Интерфейсы для типизации данных
interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  from: string;
  to: string | null;
}

interface Experience {
  company: string;
  position: string;
  description: string;
  from: string;
  to: string | null;
}

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  position: string;
  location: string;
  skills: Skill[];
  matchPercent: number;
  status: "new" | "reviewing" | "interviewed" | "shortlisted" | "rejected" | "hired";
  appliedFor: string;
  appliedAt: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  resume: string;
  tags: string[];
  starred: boolean;
}

export default function EmployerCandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("");

  // Данные о кандидатах
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: "cand1",
      name: "Алексей Смирнов",
      avatar: "/avatars/applicant1.jpg",
      position: "Frontend-разработчик",
      location: "Москва, Россия",
      skills: [
        { name: "React", level: "expert" },
        { name: "TypeScript", level: "advanced" },
        { name: "NextJS", level: "intermediate" },
        { name: "HTML/CSS", level: "expert" }
      ],
      matchPercent: 92,
      status: "interviewed",
      appliedFor: "Старший Frontend-разработчик (React/NextJS)",
      appliedAt: "2023-10-16",
      email: "aleksey@example.com",
      phone: "+7 (900) 123-45-67",
      education: [
        {
          institution: "Московский Государственный Университет",
          degree: "Магистр",
          field: "Компьютерные науки",
          from: "2015",
          to: "2017"
        },
        {
          institution: "Московский Государственный Университет",
          degree: "Бакалавр",
          field: "Прикладная математика и информатика",
          from: "2011",
          to: "2015"
        }
      ],
      experience: [
        {
          company: "ООО Технологии Будущего",
          position: "Frontend-разработчик",
          description: "Разработка пользовательских интерфейсов для корпоративных клиентов. Работа с React, Redux, TypeScript.",
          from: "2020",
          to: null
        },
        {
          company: "Цифровые Решения",
          position: "Младший Frontend-разработчик",
          description: "Участие в разработке веб-приложений. Верстка, интеграция с API.",
          from: "2017",
          to: "2020"
        }
      ],
      resume: "/resumes/aleksey-resume.pdf",
      tags: ["React", "JavaScript", "Senior"],
      starred: true
    },
    {
      id: "cand2",
      name: "Мария Иванова",
      avatar: "/avatars/applicant2.jpg",
      position: "UX/UI Дизайнер",
      location: "Санкт-Петербург, Россия",
      skills: [
        { name: "Figma", level: "expert" },
        { name: "Adobe Photoshop", level: "advanced" },
        { name: "Prototyping", level: "expert" },
        { name: "User Research", level: "intermediate" }
      ],
      matchPercent: 85,
      status: "shortlisted",
      appliedFor: "UX/UI Дизайнер",
      appliedAt: "2023-10-17",
      email: "maria@example.com",
      phone: "+7 (900) 765-43-21",
      education: [
        {
          institution: "Санкт-Петербургский Государственный Университет",
          degree: "Магистр",
          field: "Дизайн интерфейсов",
          from: "2016",
          to: "2018"
        }
      ],
      experience: [
        {
          company: "Дизайн-студия 'Креатив'",
          position: "UX/UI Дизайнер",
          description: "Создание дизайна интерфейсов для мобильных приложений и веб-сайтов. Проведение пользовательских исследований.",
          from: "2018",
          to: null
        }
      ],
      resume: "/resumes/maria-resume.pdf",
      tags: ["Design", "Figma", "UX Research"],
      starred: true
    },
    {
      id: "cand3",
      name: "Дмитрий Петров",
      avatar: "/avatars/applicant3.jpg",
      position: "Backend-разработчик",
      location: "Новосибирск, Россия",
      skills: [
        { name: "Python", level: "expert" },
        { name: "Django", level: "advanced" },
        { name: "SQL", level: "advanced" },
        { name: "Docker", level: "intermediate" }
      ],
      matchPercent: 78,
      status: "new",
      appliedFor: "Python разработчик (Data Science)",
      appliedAt: "2023-10-18",
      email: "dmitry@example.com",
      phone: "+7 (900) 987-65-43",
      education: [
        {
          institution: "Новосибирский Государственный Технический Университет",
          degree: "Бакалавр",
          field: "Информационные технологии",
          from: "2014",
          to: "2018"
        }
      ],
      experience: [
        {
          company: "IT Solutions",
          position: "Backend-разработчик",
          description: "Разработка серверной части веб-приложений с использованием Python и Django.",
          from: "2019",
          to: null
        },
        {
          company: "Старт Технологии",
          position: "Стажер-разработчик",
          description: "Участие в разработке внутренних инструментов компании.",
          from: "2018",
          to: "2019"
        }
      ],
      resume: "/resumes/dmitry-resume.pdf",
      tags: ["Python", "Backend", "Data Science"],
      starred: false
    },
    {
      id: "cand4",
      name: "Екатерина Соколова",
      avatar: "/avatars/applicant4.jpg",
      position: "Frontend-разработчик",
      location: "Москва, Россия",
      skills: [
        { name: "Vue.js", level: "expert" },
        { name: "JavaScript", level: "expert" },
        { name: "CSS", level: "advanced" },
        { name: "WebGL", level: "intermediate" }
      ],
      matchPercent: 89,
      status: "reviewing",
      appliedFor: "Frontend-разработчик (Vue.js)",
      appliedAt: "2023-10-21",
      email: "ekaterina@example.com",
      phone: "+7 (900) 111-22-33",
      education: [
        {
          institution: "Российский Университет Дружбы Народов",
          degree: "Бакалавр",
          field: "Компьютерные науки",
          from: "2015",
          to: "2019"
        }
      ],
      experience: [
        {
          company: "Веб-студия 'Инновация'",
          position: "Frontend-разработчик",
          description: "Разработка и поддержка клиентских веб-приложений с использованием Vue.js.",
          from: "2020",
          to: null
        },
        {
          company: "Диджитал Агентство",
          position: "Верстальщик",
          description: "Верстка лендингов и корпоративных сайтов.",
          from: "2019",
          to: "2020"
        }
      ],
      resume: "/resumes/ekaterina-resume.pdf",
      tags: ["Vue.js", "JavaScript", "Frontend"],
      starred: false
    }
  ]);

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Функция для получения цвета статуса кандидата
  const getStatusColor = (status: Candidate["status"]) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "reviewing": return "bg-amber-100 text-amber-800";
      case "interviewed": return "bg-purple-100 text-purple-800";
      case "shortlisted": return "bg-green-100 text-green-800";
      case "hired": return "bg-emerald-100 text-emerald-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Функция для получения текста статуса кандидата
  const getStatusText = (status: Candidate["status"]) => {
    switch (status) {
      case "new": return "Новый";
      case "reviewing": return "На рассмотрении";
      case "interviewed": return "Интервью проведено";
      case "shortlisted": return "В шортлисте";
      case "hired": return "Нанят";
      case "rejected": return "Отклонен";
      default: return "Неизвестно";
    }
  };

  // Функция для получения цвета для уровня навыка
  const getSkillLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "beginner": return "bg-blue-100 text-blue-800";
      case "intermediate": return "bg-amber-100 text-amber-800";
      case "advanced": return "bg-green-100 text-green-800";
      case "expert": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Функция для фильтрации кандидатов по активной вкладке
  const filteredCandidates = candidates.filter(candidate => {
    // Фильтр по поисковому запросу
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Фильтр по вкладке
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "new" && candidate.status === "new") ||
      (activeTab === "reviewing" && candidate.status === "reviewing") ||
      (activeTab === "interviewed" && candidate.status === "interviewed") ||
      (activeTab === "shortlisted" && candidate.status === "shortlisted") ||
      (activeTab === "starred" && candidate.starred);
    
    return matchesSearch && matchesTab;
  });

  // Обработчик для переключения статуса "избранный"
  const handleToggleStar = (id: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, starred: !candidate.starred } 
        : candidate
    ));
  };

  // Обработчик для изменения статуса кандидата
  const handleChangeStatus = (id: string, newStatus: Candidate["status"]) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id 
        ? { ...candidate, status: newStatus } 
        : candidate
    ));
  };

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <RoleLayout showSideNav={true} pageTitle="Кандидаты">
      <div className="container mx-auto py-6 space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Кандидаты</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Экспорт
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Рассылка
            </Button>
          </div>
        </motion.div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Поиск кандидатов..."
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
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-6">
              <TabsTrigger value="all">
                Все
                <Badge variant="secondary" className="ml-2">{candidates.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="new">
                Новые
                <Badge variant="secondary" className="ml-2">{candidates.filter(c => c.status === "new").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reviewing">
                На рассмотрении
                <Badge variant="secondary" className="ml-2">{candidates.filter(c => c.status === "reviewing").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="interviewed">
                После интервью
                <Badge variant="secondary" className="ml-2">{candidates.filter(c => c.status === "interviewed").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="shortlisted">
                Шортлист
                <Badge variant="secondary" className="ml-2">{candidates.filter(c => c.status === "shortlisted").length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="starred">
                Избранные
                <Badge variant="secondary" className="ml-2">{candidates.filter(c => c.starred).length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredCandidates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Нет кандидатов для отображения
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {filteredCandidates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate} 
                      onToggleStar={handleToggleStar}
                      onChangeStatus={handleChangeStatus}
                      formatDate={formatDate}
                      getStatusColor={getStatusColor}
                      getStatusText={getStatusText}
                      getSkillLevelColor={getSkillLevelColor}
                    />
                  ))}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </RoleLayout>
  );
}

// Компонент карточки кандидата
function CandidateCard({ 
  candidate, 
  onToggleStar, 
  onChangeStatus,
  formatDate,
  getStatusColor,
  getStatusText,
  getSkillLevelColor
}: { 
  candidate: Candidate;
  onToggleStar: (id: string) => void;
  onChangeStatus: (id: string, status: Candidate["status"]) => void;
  formatDate: (dateString: string) => string;
  getStatusColor: (status: Candidate["status"]) => string;
  getStatusText: (status: Candidate["status"]) => string;
  getSkillLevelColor: (level: Skill["level"]) => string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card className="overflow-hidden">
        <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">{candidate.name}</h3>
                  <button 
                    className="ml-2 text-yellow-500 hover:text-yellow-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStar(candidate.id);
                    }}
                  >
                    <Star className="h-4 w-4" fill={candidate.starred ? "currentColor" : "none"} />
                  </button>
                </div>
                
                <div className="text-muted-foreground">{candidate.position}</div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className={getSkillLevelColor(skill.level)}>
                      {skill.name}
                    </Badge>
                  ))}
                  {candidate.skills.length > 3 && (
                    <Badge variant="outline">+{candidate.skills.length - 3}</Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col md:items-end space-y-2">
              <Badge className={getStatusColor(candidate.status)}>
                {getStatusText(candidate.status)}
              </Badge>
              
              <div className="flex items-center text-sm">
                <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Вакансия: {candidate.appliedFor}</span>
              </div>
              
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Отклик: {formatDate(candidate.appliedAt)}</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Совпадение: {candidate.matchPercent}%</span>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      candidate.matchPercent >= 90 ? "bg-green-500" :
                      candidate.matchPercent >= 70 ? "bg-amber-500" :
                      "bg-orange-500"
                    }`}
                    style={{ width: `${candidate.matchPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                window.open(candidate.resume, '_blank');
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Резюме
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${candidate.email}`;
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              Написать
            </Button>
            
            <div className="flex-1"></div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" 
                className={candidate.status === "rejected" ? "bg-red-100" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeStatus(candidate.id, "rejected");
                }}
              >
                Отклонить
              </Button>
              
              <Button variant="default" size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextStatus = 
                    candidate.status === "new" ? "reviewing" :
                    candidate.status === "reviewing" ? "interviewed" :
                    candidate.status === "interviewed" ? "shortlisted" :
                    candidate.status === "shortlisted" ? "hired" : "new";
                  onChangeStatus(candidate.id, nextStatus);
                }}
              >
                {candidate.status === "shortlisted" ? "Нанять" : "Следующий этап"}
              </Button>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="border-t p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Контактная информация</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{candidate.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mt-6 mb-4">Навыки</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className={getSkillLevelColor(skill.level)}>
                      {skill.name}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="text-lg font-semibold mt-6 mb-4">Теги</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Образование</h4>
                <div className="space-y-4">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-blue-500 pl-4 py-1">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                      <div className="text-muted-foreground mt-1">
                        {edu.degree}, {edu.field}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {edu.from} - {edu.to || "настоящее время"}
                      </div>
                    </div>
                  ))}
                </div>
                
                <h4 className="text-lg font-semibold mt-6 mb-4">Опыт работы</h4>
                <div className="space-y-4">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-green-500 pl-4 py-1">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-green-500" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="text-muted-foreground mt-1">{exp.position}</div>
                      <div className="text-sm text-muted-foreground">
                        {exp.from} - {exp.to || "настоящее время"}
                      </div>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-2">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Запланировать интервью
              </Button>
              <Button variant="default">
                <Check className="h-4 w-4 mr-2" />
                {candidate.status === "shortlisted" ? "Нанять" : "В шортлист"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
} 