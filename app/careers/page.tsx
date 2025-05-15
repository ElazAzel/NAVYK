"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Users,
  Heart,
  Code,
  LineChart,
  MessageCircle,
  Lightbulb,
  Globe
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "remote" | "hybrid";
  experience: "junior" | "middle" | "senior" | "lead";
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  featured: boolean;
  postDate: string;
}

export default function CareersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

  // Вакансии платформы
  const jobPositions: JobPosition[] = [
    {
      id: "1",
      title: "Frontend-разработчик (React/Next.js)",
      department: "Разработка",
      location: "Москва, Россия / Удаленно",
      type: "hybrid",
      experience: "middle",
      description: "Мы ищем опытного Frontend-разработчика для создания и поддержки современных веб-интерфейсов нашей образовательной платформы.",
      responsibilities: [
        "Разработка и поддержка пользовательских интерфейсов на React/Next.js",
        "Оптимизация производительности фронтенда",
        "Улучшение пользовательского опыта и доступности",
        "Участие в проектировании новых компонентов и функций",
        "Работа в кросс-функциональной команде с дизайнерами и бэкенд-разработчиками"
      ],
      requirements: [
        "Опыт коммерческой разработки на React от 2 лет",
        "Опыт работы с Next.js, TypeScript",
        "Знание современных фронтенд-технологий и инструментов",
        "Опыт работы с RESTful API и GraphQL",
        "Понимание принципов адаптивного дизайна и доступности"
      ],
      benefits: [
        "Конкурентная заработная плата",
        "Гибкий график и возможность удаленной работы",
        "Медицинская страховка",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: true,
      postDate: "2023-10-15"
    },
    {
      id: "2",
      title: "Backend-разработчик (Python)",
      department: "Разработка",
      location: "Удаленно",
      type: "remote",
      experience: "middle",
      description: "Мы ищем Backend-разработчика для работы над серверной частью нашей образовательной платформы.",
      responsibilities: [
        "Проектирование и разработка API",
        "Работа с базами данных и хранилищами",
        "Интеграция с внешними сервисами",
        "Повышение производительности и масштабируемости системы",
        "Участие в код-ревью"
      ],
      requirements: [
        "Опыт коммерческой разработки на Python от 2 лет",
        "Опыт работы с Django/Flask/FastAPI",
        "Понимание архитектуры RESTful API и GraphQL",
        "Умение работать с SQL и NoSQL базами данных",
        "Навыки работы с Docker, CI/CD"
      ],
      benefits: [
        "Конкурентная заработная плата",
        "Полностью удаленная работа",
        "Медицинская страховка",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: true,
      postDate: "2023-10-12"
    },
    {
      id: "3",
      title: "UI/UX Дизайнер",
      department: "Продукт",
      location: "Санкт-Петербург, Россия / Удаленно",
      type: "hybrid",
      experience: "middle",
      description: "Мы ищем талантливого UI/UX Дизайнера для создания красивых и удобных интерфейсов нашей образовательной платформы.",
      responsibilities: [
        "Создание пользовательских интерфейсов для веб и мобильных приложений",
        "Проведение пользовательских исследований",
        "Создание прототипов и макетов",
        "Разработка дизайн-системы",
        "Работа в кросс-функциональной команде с разработчиками и продакт-менеджерами"
      ],
      requirements: [
        "Портфолио с примерами работ",
        "Опыт проектирования цифровых продуктов от 2 лет",
        "Владение инструментами: Figma, Adobe Photoshop/Illustrator",
        "Понимание принципов UX/UI дизайна и пользовательских исследований",
        "Навыки создания адаптивных интерфейсов"
      ],
      benefits: [
        "Конкурентная заработная плата",
        "Гибкий график и возможность удаленной работы",
        "Медицинская страховка",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: false,
      postDate: "2023-10-10"
    },
    {
      id: "4",
      title: "Аналитик данных",
      department: "Аналитика",
      location: "Москва, Россия",
      type: "full-time",
      experience: "senior",
      description: "Мы ищем Аналитика данных для анализа пользовательского поведения и улучшения нашей образовательной платформы.",
      responsibilities: [
        "Сбор, обработка и анализ больших объемов данных",
        "Разработка и оптимизация аналитических панелей и отчетов",
        "Выявление трендов и паттернов пользовательского поведения",
        "Подготовка рекомендаций для улучшения продукта",
        "Работа над прогнозными моделями"
      ],
      requirements: [
        "Опыт аналитической работы от 3 лет",
        "Владение SQL, Python и инструментами анализа данных",
        "Опыт работы с BI-системами (Tableau, Power BI)",
        "Понимание статистических методов",
        "Умение представлять сложные данные в понятной форме"
      ],
      benefits: [
        "Конкурентная заработная плата",
        "Офис в центре города",
        "Медицинская страховка",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: false,
      postDate: "2023-10-05"
    },
    {
      id: "5",
      title: "Менеджер по работе с университетами",
      department: "Развитие бизнеса",
      location: "Москва, Россия / Удаленно",
      type: "hybrid",
      experience: "middle",
      description: "Мы ищем Менеджера по работе с университетами для развития партнерских отношений с образовательными учреждениями.",
      responsibilities: [
        "Поиск и привлечение новых университетов-партнеров",
        "Установление и поддержание долгосрочных отношений с учебными заведениями",
        "Проведение презентаций и переговоров",
        "Разработка и реализация стратегий сотрудничества",
        "Анализ эффективности партнерских программ"
      ],
      requirements: [
        "Опыт работы в сфере образования или b2b-продаж от 2 лет",
        "Понимание системы высшего образования",
        "Навыки ведения переговоров и презентации",
        "Аналитический склад ума",
        "Готовность к командировкам"
      ],
      benefits: [
        "Конкурентная заработная плата + премии",
        "Гибкий график и возможность удаленной работы",
        "Медицинская страховка",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: false,
      postDate: "2023-09-28"
    },
    {
      id: "6",
      title: "Менеджер по работе с компаниями",
      department: "Развитие бизнеса",
      location: "Москва, Россия / Удаленно",
      type: "hybrid",
      experience: "senior",
      description: "Мы ищем Менеджера по работе с компаниями для привлечения и развития сотрудничества с работодателями.",
      responsibilities: [
        "Привлечение новых компаний на платформу",
        "Развитие отношений с существующими партнерами",
        "Проведение презентаций и переговоров",
        "Разработка и реализация стратегий сотрудничества",
        "Анализ рынка и конкурентов"
      ],
      requirements: [
        "Опыт в b2b-продажах или работе с корпоративными клиентами от 3 лет",
        "Понимание процессов рекрутмента и HR",
        "Отличные коммуникативные навыки",
        "Опыт ведения сложных переговоров",
        "Аналитический склад ума"
      ],
      benefits: [
        "Конкурентная заработная плата + премии",
        "Гибкий график и возможность удаленной работы",
        "Медицинская страховка и ДМС",
        "Профессиональное развитие и обучение",
        "Дружная команда и корпоративные мероприятия"
      ],
      featured: true,
      postDate: "2023-09-25"
    }
  ];

  // Фильтрация вакансий по вкладке и поисковому запросу
  const filteredJobs = jobPositions.filter(job => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "development" && job.department === "Разработка") ||
      (activeTab === "product" && job.department === "Продукт") ||
      (activeTab === "business" && job.department === "Развитие бизнеса") ||
      (activeTab === "analytics" && job.department === "Аналитика");
    
    const matchesSearch = 
      searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Форматирование даты публикации
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays <= 30) {
      return `${diffDays} ${getDayWord(diffDays)} назад`;
    } else {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    }
  };

  // Склонение слова "день"
  const getDayWord = (days: number) => {
    if (days === 1) return "день";
    if (days > 1 && days < 5) return "дня";
    return "дней";
  };

  // Получение типа работы в текстовом виде
  const getJobTypeText = (type: JobPosition["type"]) => {
    switch (type) {
      case "full-time": return "Полная занятость";
      case "part-time": return "Частичная занятость";
      case "remote": return "Удаленная работа";
      case "hybrid": return "Гибридный формат";
      default: return "";
    }
  };

  // Получение цвета для типа работы
  const getJobTypeColor = (type: JobPosition["type"]) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-amber-100 text-amber-800";
      case "remote": return "bg-green-100 text-green-800";
      case "hybrid": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Получение уровня опыта в текстовом виде
  const getExperienceText = (experience: JobPosition["experience"]) => {
    switch (experience) {
      case "junior": return "Junior";
      case "middle": return "Middle";
      case "senior": return "Senior";
      case "lead": return "Lead";
      default: return "";
    }
  };

  // Получение цвета для уровня опыта
  const getExperienceColor = (experience: JobPosition["experience"]) => {
    switch (experience) {
      case "junior": return "bg-cyan-100 text-cyan-800";
      case "middle": return "bg-blue-100 text-blue-800";
      case "senior": return "bg-indigo-100 text-indigo-800";
      case "lead": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Отделы компании и их иконки
  const departments = [
    { id: "all", name: "Все отделы", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: "development", name: "Разработка", icon: <Code className="h-4 w-4 mr-2" /> },
    { id: "product", name: "Продукт", icon: <Lightbulb className="h-4 w-4 mr-2" /> },
    { id: "analytics", name: "Аналитика", icon: <LineChart className="h-4 w-4 mr-2" /> },
    { id: "business", name: "Развитие бизнеса", icon: <Globe className="h-4 w-4 mr-2" /> }
  ];

  // Преимущества работы в компании
  const companyBenefits = [
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: "Влияние на образование",
      description: "Работая с нами, вы помогаете улучшать образовательную систему и создавать новые возможности для студентов."
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-green-500" />,
      title: "Профессиональное развитие",
      description: "Мы поддерживаем рост наших сотрудников через обучение, конференции и работу над сложными задачами."
    },
    {
      icon: <Heart className="h-12 w-12 text-red-500" />,
      title: "Забота о сотрудниках",
      description: "Мы обеспечиваем комфортные условия работы, конкурентную зарплату и пакет социальных льгот."
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-purple-500" />,
      title: "Открытая культура",
      description: "Мы ценим честный и открытый диалог, взаимопомощь и поддерживаем инициативы сотрудников."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 px-4 sm:px-6">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Карьера в нашей компании
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Присоединяйтесь к нашей команде и создавайте решения, которые меняют 
            образование и помогают студентам и работодателям находить друг друга.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Поиск вакансий..."
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Почему стоит работать с нами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyBenefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
                <div className="mx-auto mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Department Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full mb-8">
              {departments.map(dept => (
                <TabsTrigger key={dept.id} value={dept.id} className="flex items-center">
                  {dept.icon}
                  <span className="hidden md:inline">{dept.name}</span>
                  <span className="md:hidden">{dept.id === "all" ? "Все" : dept.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Jobs List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8 mb-12"
        >
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">Вакансии не найдены</h3>
              <p className="text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={fadeIn}
              >
                <Card className={`p-6 hover:shadow-lg transition-shadow duration-200 ${job.featured ? "border-blue-200" : ""}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {job.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                            Избранная вакансия
                          </Badge>
                        )}
                        <Badge className={getJobTypeColor(job.type)}>
                          {getJobTypeText(job.type)}
                        </Badge>
                        <Badge className={getExperienceColor(job.experience)}>
                          {getExperienceText(job.experience)}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-y-1">
                        <div className="flex items-center mr-4">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Опубликовано: {formatDate(job.postDate)}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="md:self-start whitespace-nowrap">
                      Подробнее <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Обязанности:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {job.responsibilities.slice(0, 3).map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                          {job.responsibilities.length > 3 && (
                            <li className="text-blue-500">и еще {job.responsibilities.length - 3}...</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Требования:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                          {job.requirements.length > 3 && (
                            <li className="text-blue-500">и еще {job.requirements.length - 3}...</li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          Мы предлагаем:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {job.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                          {job.benefits.length > 3 && (
                            <li className="text-blue-500">и еще {job.benefits.length - 3}...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* No Suitable Position Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Не нашли подходящую вакансию?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Мы всегда в поиске талантливых людей! Отправьте нам своё резюме, 
            и мы свяжемся с вами, когда появится подходящая позиция.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Отправить резюме
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Подписаться на новые вакансии
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 