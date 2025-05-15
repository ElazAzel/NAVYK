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
  Filter,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Users,
  Building,
  Laptop,
  Code,
  Briefcase,
  GraduationCap
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // минуты
  location: string;
  isOnline: boolean;
  organizer: string;
  organizerLogo: string;
  category: "career_fair" | "workshop" | "webinar" | "hackathon" | "conference" | "other";
  tags: string[];
  maxParticipants: number;
  currentParticipants: number;
  coverImage: string;
  featured: boolean;
  isPast: boolean;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    organizer: "all",
    location: "all"
  });

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

  // Мероприятия
  const events: Event[] = [
    {
      id: "1",
      title: "Хакатон по разработке AI-решений",
      description: "48-часовой хакатон по созданию инновационных решений с использованием искусственного интеллекта. Участники получат возможность работать с последними AI-технологиями и менторами из ведущих технологических компаний.",
      date: "2025-05-20",
      time: "10:00",
      duration: 2880,
      location: "Технопарк НАВЫК",
      isOnline: false,
      organizer: "AI Innovation Lab",
      organizerLogo: "/logos/ai-lab.jpg",
      category: "hackathon",
      tags: ["AI", "Machine Learning", "Python", "Innovation"],
      maxParticipants: 100,
      currentParticipants: 76,
      coverImage: "/images/events/hackathon.jpg",
      featured: true,
      isPast: false
    },
    {
      id: "2",
      title: "Мастер-класс по Frontend разработке",
      description: "Практический мастер-класс по современной frontend разработке. Разберем React 18, Next.js 14 и построим полноценное приложение с нуля.",
      date: "2025-05-25",
      time: "15:00",
      duration: 180,
      location: "Онлайн",
      isOnline: true,
      organizer: "Web Dev Masters",
      organizerLogo: "/logos/webdev.jpg",
      category: "workshop",
      tags: ["Frontend", "React", "Next.js", "JavaScript"],
      maxParticipants: 50,
      currentParticipants: 42,
      coverImage: "/images/events/frontend.jpg",
      featured: false,
      isPast: false
    },
    {
      id: "3",
      title: "Карьерный форум в IT",
      description: "Крупнейший карьерный форум в сфере IT. Встречи с работодателями, презентации компаний, собеседования и воркшопы по подготовке к интервью.",
      date: "2025-06-01",
      time: "09:00",
      duration: 480,
      location: "EXPO Centre",
      isOnline: false,
      organizer: "Tech Career Hub",
      organizerLogo: "/logos/career-hub.jpg",
      category: "career_fair",
      tags: ["Карьера", "IT", "Трудоустройство", "Networking"],
      maxParticipants: 1000,
      currentParticipants: 456,
      coverImage: "/images/events/career-fair.jpg",
      featured: true,
      isPast: false
    },
    {
      id: "4",
      title: "DevOps практики в современной разработке",
      description: "Вебинар о лучших практиках DevOps, автоматизации процессов и построении эффективных CI/CD пайплайнов.",
      date: "2025-06-05",
      time: "18:00",
      duration: 120,
      location: "Онлайн",
      isOnline: true,
      organizer: "DevOps Community",
      organizerLogo: "/logos/devops.jpg",
      category: "webinar",
      tags: ["DevOps", "CI/CD", "Docker", "Kubernetes"],
      maxParticipants: 200,
      currentParticipants: 87,
      coverImage: "/images/events/devops.jpg",
      featured: false,
      isPast: false
    }
  ];

  // Категории событий
  const eventCategories = {
    career_fair: "Ярмарка вакансий",
    workshop: "Мастер-класс",
    webinar: "Вебинар",
    hackathon: "Хакатон",
    conference: "Конференция",
    other: "Другое"
  };

  // Получение иконки для категории
  const getCategoryIcon = (category: Event["category"]) => {
    switch (category) {
      case "career_fair": return <Briefcase className="h-4 w-4 mr-1" />;
      case "workshop": return <Code className="h-4 w-4 mr-1" />;
      case "webinar": return <Laptop className="h-4 w-4 mr-1" />;
      case "hackathon": return <Code className="h-4 w-4 mr-1" />;
      case "conference": return <Users className="h-4 w-4 mr-1" />;
      default: return <GraduationCap className="h-4 w-4 mr-1" />;
    }
  };

  // Получение цвета для категории
  const getCategoryColor = (category: Event["category"]) => {
    switch (category) {
      case "career_fair": return "bg-blue-100 text-blue-800";
      case "workshop": return "bg-purple-100 text-purple-800";
      case "webinar": return "bg-green-100 text-green-800";
      case "hackathon": return "bg-red-100 text-red-800";
      case "conference": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Форматирование длительности
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    } else if (minutes < 24 * 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 
        ? `${hours} ч ${remainingMinutes} мин` 
        : `${hours} ч`;
    } else {
      const days = Math.floor(minutes / (24 * 60));
      const hours = Math.floor((minutes % (24 * 60)) / 60);
      return hours > 0 
        ? `${days} д ${hours} ч` 
        : `${days} д`;
    }
  };

  // Фильтрация событий
  const filteredEvents = events.filter(event => {
    // Фильтр по вкладке (предстоящие/прошедшие)
    const matchesTab = 
      (activeTab === "upcoming" && !event.isPast) || 
      (activeTab === "past" && event.isPast);
    
    // Фильтр по поисковому запросу
    const matchesSearch = 
      searchQuery === "" || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Фильтр по категории
    const matchesCategory = 
      filters.category === "all" || 
      event.category === filters.category;
    
    // Фильтр по организатору
    const matchesOrganizer = 
      filters.organizer === "all" || 
      event.organizer === filters.organizer;
    
    // Фильтр по локации
    const matchesLocation = 
      filters.location === "all" || 
      (filters.location === "online" && event.isOnline) || 
      (filters.location === "offline" && !event.isOnline);
    
    return matchesTab && matchesSearch && matchesCategory && matchesOrganizer && matchesLocation;
  });

  // Получение списка избранных событий
  const featuredEvents = events.filter(event => event.featured && !event.isPast);

  // Уникальные организаторы для фильтрации
  const organizers = Array.from(new Set(events.map(event => event.organizer)));

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
            Мероприятия
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Ярмарки вакансий, вебинары, конференции и другие мероприятия для профессионального развития и построения карьеры.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Поиск мероприятий..."
              className="pl-10 py-6 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && searchQuery === "" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8">Рекомендуемые мероприятия</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64">
                    <img 
                      src={event.coverImage} 
                      alt={event.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getCategoryColor(event.category)} flex items-center`}>
                        {getCategoryIcon(event.category)}
                        {eventCategories[event.category]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}, {formatDuration(event.duration)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-gray-100 flex items-center justify-center">
                          <img 
                            src={event.organizerLogo} 
                            alt={event.organizer} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{event.organizer}</span>
                      </div>
                      <Button className="text-white flex items-center">
                        Регистрация
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Events Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 max-w-xs mx-auto mb-8">
              <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
              <TabsTrigger value="past">Прошедшие</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8 flex flex-wrap gap-4"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-gray-700 mr-2">Фильтры:</span>
          </div>
          
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value as any})}
          >
            <option value="all">Все категории</option>
            {Object.entries(eventCategories).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            value={filters.location}
            onChange={(e) => setFilters({...filters, location: e.target.value})}
          >
            <option value="all">Все локации</option>
            <option value="online">Онлайн</option>
            <option value="offline">Оффлайн</option>
          </select>
          
          <select
            className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm"
            value={filters.organizer}
            onChange={(e) => setFilters({...filters, organizer: e.target.value})}
          >
            <option value="all">Все организаторы</option>
            {organizers.map((organizer) => (
              <option key={organizer} value={organizer}>{organizer}</option>
            ))}
          </select>
          
          {/* Reset filters button */}
          {(filters.category !== "all" || filters.location !== "all" || filters.organizer !== "all" || searchQuery !== "") && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setFilters({category: "all", location: "all", organizer: "all"});
                setSearchQuery("");
              }}
              className="ml-2"
            >
              Сбросить фильтры
            </Button>
          )}
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">Мероприятия не найдены</h3>
              <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтрации</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setFilters({category: "all", location: "all", organizer: "all"});
                  setSearchQuery("");
                }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={fadeIn}
                className="flex flex-col h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="relative h-48">
                    <img 
                      src={event.coverImage} 
                      alt={event.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryColor(event.category)} flex items-center`}>
                        {getCategoryIcon(event.category)}
                        {eventCategories[event.category]}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                    <div className="mt-auto space-y-3">
                      <div className="flex flex-wrap gap-y-2 text-xs text-gray-500">
                        <div className="flex items-center mr-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-1">
                            <img 
                              src={event.organizerLogo} 
                              alt={event.organizer} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-xs">{event.organizer}</span>
                        </div>
                        {!event.isPast ? (
                          <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto">
                            Подробнее
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            Завершено
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Pagination */}
        {filteredEvents.length > 6 && (
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
              <Button variant="outline" size="sm" className="h-8 w-8">5</Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Submit Event Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Хотите провести своё мероприятие?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Если вы представляете компанию или университет и хотите разместить свое мероприятие на нашей платформе, свяжитесь с нами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Разместить мероприятие
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Узнать условия
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}