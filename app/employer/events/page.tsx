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
  PlusCircle, Search, Filter, Clock, Users, Calendar,
  MapPin, ArrowUpDown, Edit, Trash, ExternalLink, Eye,
  CalendarDays, Bell, CheckCircle, Building, BookOpen
} from "lucide-react";

// Интерфейсы
interface Participant {
  id: string;
  name: string;
  avatar: string;
  university: string;
  faculty: string;
  year: number;
  registered: string;
  status: "registered" | "attended" | "missed";
}

interface Event {
  id: string;
  title: string;
  type: "webinar" | "workshop" | "career_fair" | "hackathon" | "presentation" | "other";
  description: string;
  datetime: string;
  location: string;
  isOnline: boolean;
  status: "draft" | "scheduled" | "ongoing" | "completed" | "cancelled";
  maxParticipants: number;
  currentParticipants: number;
  participants: Participant[];
  image: string;
  created: string;
  duration: number; // в минутах
  tags: string[];
}

export default function EmployerEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("scheduled");
  
  // Данные о мероприятиях
  const [events, setEvents] = useState<Event[]>([
    {
      id: "event1",
      title: "День открытых дверей в ТехноИнновации",
      type: "presentation",
      description: "Приглашаем студентов и выпускников познакомиться с нашей компанией, узнать о направлениях работы и открытых вакансиях. В программе: презентация компании, мастер-классы от ведущих специалистов, нетворкинг.",
      datetime: "2023-11-25T14:00:00",
      location: "Москва, ул. Технологическая, 42",
      isOnline: false,
      status: "scheduled",
      maxParticipants: 50,
      currentParticipants: 32,
      participants: [
        {
          id: "part1",
          name: "Александр Козлов",
          avatar: "/avatars/student1.jpg",
          university: "МГУ им. Ломоносова",
          faculty: "Факультет ВМК",
          year: 3,
          registered: "2023-11-02",
          status: "registered"
        },
        {
          id: "part2",
          name: "Елена Соколова",
          avatar: "/avatars/student2.jpg",
          university: "МГТУ им. Баумана",
          faculty: "Факультет информатики и систем управления",
          year: 4,
          registered: "2023-11-03",
          status: "registered"
        }
      ],
      image: "/events/open-day.jpg",
      created: "2023-10-20",
      duration: 180,
      tags: ["open_day", "networking", "career"]
    },
    {
      id: "event2",
      title: "Вебинар: Современные подходы к Frontend-разработке",
      type: "webinar",
      description: "На вебинаре наши ведущие разработчики расскажут о современных трендах во Frontend-разработке, поделятся опытом использования новейших технологий и фреймворков.",
      datetime: "2023-12-10T18:00:00",
      location: "Online (Zoom)",
      isOnline: true,
      status: "scheduled",
      maxParticipants: 100,
      currentParticipants: 75,
      participants: [
        {
          id: "part3",
          name: "Дмитрий Иванов",
          avatar: "/avatars/student3.jpg",
          university: "Высшая школа экономики",
          faculty: "Факультет компьютерных наук",
          year: 2,
          registered: "2023-11-05",
          status: "registered"
        }
      ],
      image: "/events/webinar.jpg",
      created: "2023-10-25",
      duration: 120,
      tags: ["frontend", "development", "webinar"]
    },
    {
      id: "event3",
      title: "Хакатон: Разработка прототипа AI-приложения",
      type: "hackathon",
      description: "48-часовой хакатон для разработчиков, дизайнеров и продакт-менеджеров. Задача: создать прототип инновационного приложения с использованием технологий искусственного интеллекта.",
      datetime: "2023-11-18T10:00:00",
      location: "Москва, ул. Инновационная, 15",
      isOnline: false,
      status: "completed",
      maxParticipants: 30,
      currentParticipants: 28,
      participants: [
        {
          id: "part4",
          name: "Анна Петрова",
          avatar: "/avatars/student4.jpg",
          university: "МФТИ",
          faculty: "Факультет прикладной математики и информатики",
          year: 5,
          registered: "2023-10-28",
          status: "attended"
        },
        {
          id: "part5",
          name: "Максим Сидоров",
          avatar: "/avatars/student5.jpg",
          university: "ИТМО",
          faculty: "Факультет информационных технологий",
          year: 4,
          registered: "2023-10-30",
          status: "attended"
        }
      ],
      image: "/events/hackathon.jpg",
      created: "2023-09-20",
      duration: 2880, // 48 часов
      tags: ["hackathon", "ai", "innovation"]
    },
    {
      id: "event4",
      title: "Мастер-класс по Data Science",
      type: "workshop",
      description: "Практический мастер-класс по анализу данных и машинному обучению. Участники научатся работать с реальными данными, строить модели и интерпретировать результаты.",
      datetime: "2023-12-20T16:00:00",
      location: "Online (Teams)",
      isOnline: true,
      status: "scheduled",
      maxParticipants: 40,
      currentParticipants: 15,
      participants: [],
      image: "/events/workshop.jpg",
      created: "2023-11-10",
      duration: 180,
      tags: ["data_science", "machine_learning", "workshop"]
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

  // Функция форматирования времени
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Форматирование продолжительности
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    } else if (minutes < 24 * 60) {
      const hours = Math.floor(minutes / 60);
      const remainMinutes = minutes % 60;
      return remainMinutes > 0 
        ? `${hours} ч ${remainMinutes} мин` 
        : `${hours} ч`;
    } else {
      const days = Math.floor(minutes / (24 * 60));
      const hours = Math.floor((minutes % (24 * 60)) / 60);
      return hours > 0 
        ? `${days} д ${hours} ч` 
        : `${days} д`;
    }
  };

  // Получение текста для типа мероприятия
  const getEventTypeText = (type: Event["type"]) => {
    switch (type) {
      case "webinar": return "Вебинар";
      case "workshop": return "Мастер-класс";
      case "career_fair": return "Ярмарка вакансий";
      case "hackathon": return "Хакатон";
      case "presentation": return "Презентация";
      case "other": return "Другое";
      default: return "Мероприятие";
    }
  };

  // Получение цвета для статуса мероприятия
  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "ongoing": return "bg-green-100 text-green-800";
      case "completed": return "bg-purple-100 text-purple-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Получение текста для статуса мероприятия
  const getStatusText = (status: Event["status"]) => {
    switch (status) {
      case "draft": return "Черновик";
      case "scheduled": return "Запланировано";
      case "ongoing": return "Проходит";
      case "completed": return "Завершено";
      case "cancelled": return "Отменено";
      default: return "Неизвестно";
    }
  };

  // Функция фильтрации мероприятий
  const filteredEvents = events.filter(event => {
    // Фильтр по поисковому запросу
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по активной вкладке
    const now = new Date();
    const eventDate = new Date(event.datetime);
    
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "scheduled" && ["scheduled", "draft"].includes(event.status) && eventDate > now) ||
      (activeTab === "active" && event.status === "ongoing") ||
      (activeTab === "past" && (event.status === "completed" || (eventDate < now && event.status !== "cancelled")));
    
    return matchesSearch && matchesTab;
  });

  // Обработчик создания нового мероприятия
  const handleCreateEvent = () => {
    console.log("Creating new event");
    // Логика создания нового мероприятия
  };

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

  return (
    <RoleLayout showSideNav={true} pageTitle="Мероприятия">
      <div className="container mx-auto py-6 space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Мероприятия</h1>
          <Button onClick={handleCreateEvent} className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Создать мероприятие
          </Button>
        </motion.div>

        <Card className="p-4">
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 mb-6">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Поиск мероприятий..."
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
            <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
              <TabsTrigger value="all">
                Все
                <Badge variant="secondary" className="ml-2">{events.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                Предстоящие
                <Badge variant="secondary" className="ml-2">
                  {events.filter(e => ["scheduled", "draft"].includes(e.status) && new Date(e.datetime) > new Date()).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="active">
                Активные
                <Badge variant="secondary" className="ml-2">
                  {events.filter(e => e.status === "ongoing").length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="past">
                Прошедшие
                <Badge variant="secondary" className="ml-2">
                  {events.filter(e => e.status === "completed" || 
                    (new Date(e.datetime) < new Date() && e.status !== "cancelled")).length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4"
              >
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Мероприятия не найдены
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <EventCard 
                      key={event.id}
                      event={event}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      formatDuration={formatDuration}
                      getEventTypeText={getEventTypeText}
                      getStatusColor={getStatusColor}
                      getStatusText={getStatusText}
                    />
                  ))
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </RoleLayout>
  );
}

// Компонент карточки мероприятия
function EventCard({
  event,
  formatDate,
  formatTime,
  formatDuration,
  getEventTypeText,
  getStatusColor,
  getStatusText
}: {
  event: Event;
  formatDate: (dateString: string) => string;
  formatTime: (dateString: string) => string;
  formatDuration: (minutes: number) => string;
  getEventTypeText: (type: Event["type"]) => string;
  getStatusColor: (status: Event["status"]) => string;
  getStatusText: (status: Event["status"]) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const eventDate = new Date(event.datetime);
  const now = new Date();
  const isPast = eventDate < now && event.status !== "ongoing";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <Card className={`overflow-hidden ${isPast ? "bg-gray-50" : ""}`}>
        <div 
          className="p-6 hover:bg-gray-50 transition-colors cursor-pointer" 
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-40 h-32 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <Badge className={getStatusColor(event.status)}>
                    {getStatusText(event.status)}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(event.datetime)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatTime(event.datetime)}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>Продолжительность: {formatDuration(event.duration)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location} {event.isOnline && "(Онлайн)"}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground line-clamp-2">
                {event.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {getEventTypeText(event.type)}
                </Badge>
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-between items-end">
              <div className="text-right">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm">
                    {event.currentParticipants} / {event.maxParticipants}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Просмотр
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="border-t p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4">Описание</h4>
                <p>{event.description}</p>
                
                <h4 className="text-lg font-semibold mt-6 mb-4">Детали мероприятия</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Организатор: ТехноИнновации</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Тип: {getEventTypeText(event.type)}</span>
                  </div>
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Создано: {formatDate(event.created)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Участники ({event.participants.length})</h4>
                {event.participants.length === 0 ? (
                  <div className="text-muted-foreground">Пока нет зарегистрированных участников</div>
                ) : (
                  <div className="space-y-3">
                    {event.participants.map((participant) => (
                      <div key={participant.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarImage src={participant.avatar} alt={participant.name} />
                            <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{participant.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {participant.university}, {participant.faculty}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge className={
                            participant.status === "registered" ? "bg-blue-100 text-blue-800" :
                            participant.status === "attended" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {participant.status === "registered" ? "Зарегистрирован" :
                             participant.status === "attended" ? "Присутствовал" : "Пропустил"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    {event.participants.length < event.currentParticipants && (
                      <Button variant="link" className="mt-2">
                        Показать всех участников ({event.currentParticipants})
                      </Button>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Отметить посещаемость
                  </Button>
                  <Button variant="default">
                    <Users className="h-4 w-4 mr-2" />
                    Управление участниками
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
} 