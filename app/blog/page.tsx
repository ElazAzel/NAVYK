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
  Calendar,
  User,
  Clock,
  BookOpen,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from "lucide-react";

// Типы статей
interface Article {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  publishDate: string;
  readingTime: number;
  category: "career" | "education" | "industry" | "platform";
  tags: string[];
  featured: boolean;
  slug: string;
}

export default function BlogPage() {
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

  // Данные статей
  const articles: Article[] = [
    {
      id: "1",
      title: "10 ключевых навыков для успешной карьеры в 2023 году",
      excerpt: "Рынок труда постоянно меняется. Узнайте, какие навыки наиболее востребованы работодателями сегодня и как их развить для успешного карьерного роста.",
      cover: "/blog/skills-2023.jpg",
      authorName: "Елена Соколова",
      authorAvatar: "/avatars/elena.jpg",
      authorRole: "Карьерный консультант",
      publishDate: "2023-10-15",
      readingTime: 8,
      category: "career",
      tags: ["навыки", "карьера", "развитие"],
      featured: true,
      slug: "key-skills-2023"
    },
    {
      id: "2",
      title: "Как эффективно подготовиться к техническому интервью",
      excerpt: "Технические интервью могут быть сложными. Мы собрали лучшие практики и советы от HR-специалистов ведущих технологических компаний, чтобы помочь вам успешно пройти собеседование.",
      cover: "/blog/tech-interview.jpg",
      authorName: "Дмитрий Петров",
      authorAvatar: "/avatars/dmitry.jpg",
      authorRole: "Senior Developer, ABC Tech",
      publishDate: "2023-10-10",
      readingTime: 12,
      category: "career",
      tags: ["интервью", "трудоустройство", "IT"],
      featured: false,
      slug: "tech-interview-preparation"
    },
    {
      id: "3",
      title: "Тренды высшего образования: что изменилось за последние 5 лет",
      excerpt: "Образование трансформируется под влиянием технологий и новых подходов. Мы анализируем ключевые изменения в высшем образовании и их влияние на подготовку специалистов.",
      cover: "/blog/education-trends.jpg",
      authorName: "Анна Иванова",
      authorAvatar: "/avatars/anna.jpg",
      authorRole: "Проректор, Технологический Университет",
      publishDate: "2023-09-28",
      readingTime: 10,
      category: "education",
      tags: ["образование", "тренды", "университеты"],
      featured: false,
      slug: "education-trends-5years"
    },
    {
      id: "4",
      title: "Как построить эффективную стратегию найма молодых специалистов",
      excerpt: "Привлечение талантливых молодых кадров требует особого подхода. Узнайте, как крупные компании выстраивают стратегии работы со студентами и недавними выпускниками.",
      cover: "/blog/recruitment-strategy.jpg",
      authorName: "Максим Сидоров",
      authorAvatar: "/avatars/maxim.jpg",
      authorRole: "HR-директор, Инновационные Решения",
      publishDate: "2023-09-20",
      readingTime: 15,
      category: "industry",
      tags: ["рекрутмент", "HR", "бизнес"],
      featured: true,
      slug: "effective-recruitment-strategy"
    },
    {
      id: "5",
      title: "Дуальное образование: опыт интеграции теории и практики",
      excerpt: "Модель дуального образования набирает популярность. Разбираемся, какие преимущества она дает студентам, работодателям и университетам, и как внедрить эту систему.",
      cover: "/blog/dual-education.jpg",
      authorName: "Александр Николаев",
      authorAvatar: "/avatars/alexander.jpg",
      authorRole: "Декан факультета информационных технологий",
      publishDate: "2023-09-15",
      readingTime: 11,
      category: "education",
      tags: ["дуальное образование", "практика", "инновации"],
      featured: false,
      slug: "dual-education-experience"
    },
    {
      id: "6",
      title: "Новые возможности платформы: аналитика карьерного развития",
      excerpt: "Представляем новый инструмент аналитики, который поможет студентам отслеживать свой карьерный рост и получать персонализированные рекомендации на основе реальных данных рынка труда.",
      cover: "/blog/platform-analytics.jpg",
      authorName: "Команда разработки",
      authorAvatar: "/avatars/team.jpg",
      authorRole: "Платформа",
      publishDate: "2023-09-05",
      readingTime: 6,
      category: "platform",
      tags: ["аналитика", "обновление", "карьерный рост"],
      featured: false,
      slug: "career-analytics-tool"
    },
    {
      id: "7",
      title: "Успешные истории сотрудничества университетов и бизнеса",
      excerpt: "Рассказываем о реальных примерах успешного взаимодействия образовательных учреждений и компаний, которые привели к созданию инновационных образовательных программ и трудоустройству выпускников.",
      cover: "/blog/university-business.jpg",
      authorName: "Ирина Смирнова",
      authorAvatar: "/avatars/irina.jpg",
      authorRole: "Директор по развитию партнерств",
      publishDate: "2023-08-28",
      readingTime: 14,
      category: "industry",
      tags: ["партнерства", "кейсы", "образование"],
      featured: false,
      slug: "university-business-collaboration"
    },
    {
      id: "8",
      title: "Как составить эффективное резюме: советы рекрутеров",
      excerpt: "Резюме остается ключевым документом при поиске работы. Узнайте, как структурировать информацию, какие навыки выделять и каких ошибок избегать, чтобы ваше резюме заметили.",
      cover: "/blog/effective-resume.jpg",
      authorName: "Наталья Кузнецова",
      authorAvatar: "/avatars/natalia.jpg",
      authorRole: "Ведущий HR-специалист",
      publishDate: "2023-08-20",
      readingTime: 9,
      category: "career",
      tags: ["резюме", "трудоустройство", "советы"],
      featured: false,
      slug: "effective-resume-tips"
    }
  ];

  // Фильтрация статей по вкладке и поисковому запросу
  const filteredArticles = articles.filter(article => {
    const matchesTab = 
      activeTab === "all" || 
      article.category === activeTab;
    
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  // Получение категории статьи в текстовом виде
  const getCategoryText = (category: Article["category"]) => {
    switch (category) {
      case "career": return "Карьера";
      case "education": return "Образование";
      case "industry": return "Индустрия";
      case "platform": return "Платформа";
      default: return "Общее";
    }
  };

  // Получение иконки для категории
  const getCategoryIcon = (category: Article["category"]) => {
    switch (category) {
      case "career": return <Briefcase className="h-4 w-4 mr-1" />;
      case "education": return <BookOpen className="h-4 w-4 mr-1" />;
      case "industry": return <GraduationCap className="h-4 w-4 mr-1" />;
      case "platform": return <BookOpen className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  // Получение цвета для категории
  const getCategoryColor = (category: Article["category"]) => {
    switch (category) {
      case "career": return "bg-blue-100 text-blue-800";
      case "education": return "bg-green-100 text-green-800";
      case "industry": return "bg-purple-100 text-purple-800";
      case "platform": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Форматирование даты публикации
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Выделение избранных статей
  const featuredArticles = articles.filter(article => article.featured);

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
            Наш блог
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Актуальные статьи, советы и новости для студентов, работодателей и университетов.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Поиск по статьям..."
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && searchQuery === "" && activeTab === "all" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Рекомендуемые статьи</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <img 
                      src={article.cover} 
                      alt={article.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(article.category)} flex items-center`}>
                        {getCategoryIcon(article.category)}
                        {getCategoryText(article.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(article.publishDate)}</span>
                      <Clock className="h-4 w-4 ml-4 mr-1" />
                      <span>{article.readingTime} мин. чтения</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img 
                            src={article.authorAvatar} 
                            alt={article.authorName} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{article.authorName}</p>
                          <p className="text-xs text-gray-500">{article.authorRole}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-800 flex items-center">
                        Читать
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Articles Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="all">Все статьи</TabsTrigger>
              <TabsTrigger value="career">Карьера</TabsTrigger>
              <TabsTrigger value="education">Образование</TabsTrigger>
              <TabsTrigger value="industry">Индустрия</TabsTrigger>
              <TabsTrigger value="platform">Платформа</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">По вашему запросу ничего не найдено</h3>
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
            filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={fadeIn}
                className="flex flex-col h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative h-48">
                    <img 
                      src={article.cover} 
                      alt={article.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryColor(article.category)} flex items-center`}>
                        {getCategoryIcon(article.category)}
                        {getCategoryText(article.category)}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">{article.excerpt}</p>
                    <div className="mt-auto">
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(article.publishDate)}</span>
                        <Clock className="h-3 w-3 ml-3 mr-1" />
                        <span>{article.readingTime} мин. чтения</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                            <img 
                              src={article.authorAvatar} 
                              alt={article.authorName} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium">{article.authorName}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0">
                          Читать
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex justify-center mt-12"
          >
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-blue-50">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
              <span className="text-gray-500 mx-1">...</span>
              <Button variant="outline" size="sm" className="h-8 w-8">10</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Subscribe Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Оставайтесь в курсе новостей
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Подпишитесь на нашу рассылку, чтобы получать самые свежие статьи и новости о карьерных возможностях.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Ваш email"
              className="flex-grow py-6"
            />
            <Button size="lg" className="px-8 whitespace-nowrap">
              Подписаться
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 