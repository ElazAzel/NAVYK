"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import PageLayout from "@/app/components/PageLayout";
import EventCard, { Event } from "@/app/components/EventCard";
import { 
  CalendarIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  FireIcon,
  MapPinIcon,
  ClockIcon,
  BookmarkIcon 
} from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";

export default function StudentEvents() {
  // Состояния для фильтрации и поиска
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Состояние для уведомления
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  
  // Данные о мероприятиях
  const [events, setEvents] = useState<Event[]>([
    {
      id: "e1",
      title: "Введение в машинное обучение",
      description: "Узнайте основы машинного обучения на этом вебинаре для начинающих. Мы рассмотрим ключевые концепции, алгоритмы и инструменты, которые помогут вам начать свой путь в ML.",
      date: "2023-07-10",
      startTime: "15:00",
      endTime: "17:00",
      location: "Онлайн",
      category: "вебинар",
      organizerType: "университет",
      organizerName: "ИТ Академия",
      attendees: 145,
      maxAttendees: 200,
      points: 50,
      registered: false,
      skills: ["Python", "ML", "Data Science"]
    },
    {
      id: "e2",
      title: "Разработка мобильных приложений с React Native",
      description: "Практический мастер-класс по созданию кроссплатформенных мобильных приложений с использованием React Native. Вы узнаете, как быстро создавать приложения для iOS и Android, используя известные вам веб-технологии.",
      date: "2023-07-15",
      startTime: "11:00",
      endTime: "14:00",
      location: "Технопарк, зал 303",
      category: "мастер-класс",
      organizerType: "компания",
      organizerName: "MobileDevs",
      attendees: 28,
      maxAttendees: 30,
      points: 100,
      registered: true,
      skills: ["React", "JavaScript", "Mobile Dev"]
    },
    {
      id: "e3",
      title: "Карьерный форум IT-2023",
      description: "Ежегодная конференция, посвященная карьере в IT. Встречи с работодателями, воркшопы по написанию резюме, тренировочные собеседования и нетворкинг.",
      date: "2023-07-20",
      startTime: "10:00",
      endTime: "18:00",
      location: "Выставочный центр, павильон 4",
      category: "конференция",
      organizerType: "работодатель",
      organizerName: "IT Карьера",
      attendees: 312,
      points: 150,
      registered: false,
      skills: ["Soft Skills", "Networking", "Job Interview"]
    },
    {
      id: "e4",
      title: "Воркшоп по UX/UI дизайну",
      description: "Интенсивный практический семинар по созданию удобных пользовательских интерфейсов. Вы узнаете основные принципы UX дизайна и научитесь применять их на практике.",
      date: "2023-07-25",
      startTime: "14:00",
      endTime: "18:00",
      location: "Дизайн-студия Miro, 5 этаж",
      category: "воркшоп",
      organizerType: "компания",
      organizerName: "Дизайн-студия Miro",
      attendees: 15,
      maxAttendees: 20,
      points: 120,
      registered: false,
      skills: ["UX", "UI", "Figma", "Design Thinking"]
    },
    {
      id: "e5",
      title: "Летняя стажировка в Data Science",
      description: "Трехмесячная оплачиваемая стажировка для студентов, изучающих Data Science. Вы будете работать с реальными данными и решать бизнес-задачи под руководством опытных специалистов.",
      date: "2023-08-01",
      startTime: "09:00",
      endTime: "18:00",
      location: "TechData офис",
      category: "стажировка",
      organizerType: "работодатель",
      organizerName: "TechData",
      attendees: 10,
      maxAttendees: 15,
      points: 300,
      registered: false,
      skills: ["Python", "SQL", "Data Analysis", "Statistics"]
    },
    {
      id: "e6",
      title: "Основы DevOps и CI/CD",
      description: "Курс познакомит вас с DevOps практиками и инструментами непрерывной интеграции и доставки. Вы узнаете как автоматизировать процессы разработки и деплоя.",
      date: "2023-08-10",
      startTime: "16:00",
      endTime: "19:00",
      location: "Онлайн",
      category: "курс",
      organizerType: "университет",
      organizerName: "ИТ Академия",
      attendees: 78,
      maxAttendees: 100,
      points: 200,
      registered: false,
      skills: ["DevOps", "CI/CD", "Docker", "Jenkins"]
    }
  ]);
  
  // Рекомендованные мероприятия на основе интересов пользователя
  const recommendedEvents = events.filter(event => 
    event.skills.some(skill => ["Python", "Data Science", "JavaScript"].includes(skill))
  );
  
  // Предстоящие мероприятия, на которые пользователь зарегистрирован
  const upcomingRegisteredEvents = events.filter(event => event.registered);
  
  // Все мероприятия, отфильтрованные и отсортированные
  const filteredEvents = events
    .filter(event => {
      // Фильтрация по поиску
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Фильтрация по категории
      if (filterCategory && event.category !== filterCategory) {
        return false;
      }
      
      // Фильтрация по дате
      if (filterDateRange) {
        const eventDate = new Date(event.date);
        const today = new Date();
        
        if (filterDateRange === "today") {
          return eventDate.toDateString() === today.toDateString();
        } else if (filterDateRange === "week") {
          const nextWeek = new Date();
          nextWeek.setDate(today.getDate() + 7);
          return eventDate >= today && eventDate <= nextWeek;
        } else if (filterDateRange === "month") {
          const nextMonth = new Date();
          nextMonth.setMonth(today.getMonth() + 1);
          return eventDate >= today && eventDate <= nextMonth;
        }
      }
      
      return true;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Обработчик регистрации на мероприятие
  const handleRegister = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, registered: true, attendees: event.attendees + 1 } 
          : event
      )
    );
    
    // Показываем уведомление
    setNotification({
      message: "Вы успешно зарегистрированы на мероприятие!",
      type: "success"
    });
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Обработчик отмены регистрации
  const handleCancel = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, registered: false, attendees: event.attendees - 1 } 
          : event
      )
    );
    
    setNotification({
      message: "Регистрация отменена",
      type: "success"
    });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  // Категории мероприятий для фильтрации
  const categories = [
    { id: "вебинар", label: "Вебинары" },
    { id: "мастер-класс", label: "Мастер-классы" },
    { id: "конференция", label: "Конференции" },
    { id: "воркшоп", label: "Воркшопы" },
    { id: "стажировка", label: "Стажировки" },
    { id: "курс", label: "Курсы" }
  ];
  
  // Диапазоны дат для фильтрации
  const dateRanges = [
    { id: "today", label: "Сегодня" },
    { id: "week", label: "Ближайшая неделя" },
    { id: "month", label: "Ближайший месяц" }
  ];
  
  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Мероприятия</h1>
        <p className="text-muted-foreground">
          Участвуйте в вебинарах, тренингах, конференциях и стажировках для развития своих навыков
        </p>
      </div>
      
      {/* Уведомление */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`p-4 mb-6 rounded-lg ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </motion.div>
      )}
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Все мероприятия</TabsTrigger>
          <TabsTrigger value="recommended">Рекомендуемые</TabsTrigger>
          <TabsTrigger value="registered">Мои мероприятия</TabsTrigger>
        </TabsList>
        
        <div className="mb-6">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск мероприятий..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-primary text-primary-foreground" : ""}
            >
              <FunnelIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 border rounded-lg space-y-4"
            >
              <div>
                <h3 className="text-sm font-medium mb-2">Категория</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filterCategory === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory(null)}
                  >
                    Все
                  </Button>
                  
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={filterCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(category.id)}
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Период</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filterDateRange === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterDateRange(null)}
                  >
                    Любой
                  </Button>
                  
                  {dateRanges.map((range) => (
                    <Button
                      key={range.id}
                      variant={filterDateRange === range.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterDateRange(range.id)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterCategory(null);
                    setFilterDateRange(null);
                    setSearchQuery("");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        <TabsContent value="all">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <CalendarIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Мероприятия не найдены</h3>
              <p className="text-sm text-muted-foreground">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended">
          {recommendedEvents.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2 flex items-center">
                  <FireIcon className="h-5 w-5 mr-1 text-orange-500" />
                  Рекомендуемые мероприятия
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Эти мероприятия соответствуют вашим навыкам и интересам
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onRegister={handleRegister}
                      onCancel={handleCancel}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <FireIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Нет рекомендаций</h3>
              <p className="text-sm text-muted-foreground">
                Мы подготовим для вас персональные рекомендации на основе ваших интересов
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="registered">
          {upcomingRegisteredEvents.length > 0 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2 flex items-center">
                  <BookmarkIcon className="h-5 w-5 mr-1 text-blue-500" />
                  Мои мероприятия
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Мероприятия, на которые вы зарегистрированы
                </p>
                
                <div className="space-y-4">
                  {upcomingRegisteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {event.category}
                            </Badge>
                            <h3 className="text-xl font-medium mb-1">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {event.organizerName}
                            </p>
                          </div>
                          <Badge variant="default">Вы зарегистрированы</Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleCancel(event.id)}
                          >
                            Отменить регистрацию
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <BookmarkIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Нет зарегистрированных мероприятий</h3>
              <p className="text-sm text-muted-foreground">
                Вы еще не зарегистрировались ни на одно мероприятие
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                const tab = document.querySelector(`[data-state="inactive"][value="all"]`) as HTMLElement;
                if (tab) tab.click();
              }}>
                Найти мероприятия
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
} 