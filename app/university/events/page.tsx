"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  Tag,
  Building,
  Globe,
  Edit,
  ChevronRight,
  ExternalLink,
  Eye
} from "lucide-react";

// Типы данных
interface Attendee {
  id: string;
  name: string;
  avatarUrl: string | null;
  faculty: string;
  year: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  type: "workshop" | "lecture" | "conference" | "competition" | "career_fair" | "social";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  isOnline: boolean;
  organizer: string;
  maxAttendees: number | null;
  attendeesCount: number;
  attendees: Attendee[];
  tags: string[];
  facultiesInvolved: string[];
  status: "upcoming" | "active" | "past";
}

const eventsData: Event[] = [
  {
    id: "1",
    title: "Ярмарка вакансий ИТ-компаний",
    description: "Ежегодная ярмарка вакансий с участием ведущих ИТ-компаний города. Студенты смогут пообщаться с представителями компаний, узнать о возможностях стажировки и трудоустройства, а также посетить мини-воркшопы по подготовке к собеседованиям.",
    imageUrl: null,
    type: "career_fair",
    date: "2023-04-15",
    startTime: "10:00",
    endTime: "17:00",
    location: "Главный корпус, Зал А-200",
    isOnline: false,
    organizer: "Карьерный центр КазНУ",
    maxAttendees: 500,
    attendeesCount: 342,
    attendees: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", faculty: "Информационные технологии", year: 3 },
      { id: "u2", name: "Елена Петрова", avatarUrl: null, faculty: "Информационные технологии", year: 2 },
      { id: "u3", name: "Дамир Нугманов", avatarUrl: null, faculty: "Информационные технологии", year: 4 }
    ],
    tags: ["IT", "Карьера", "Вакансии", "Стажировки"],
    facultiesInvolved: ["Информационные технологии", "Инженерия", "Бизнес и экономика"],
    status: "upcoming"
  },
  {
    id: "2",
    title: "Международная конференция по искусственному интеллекту",
    description: "Трехдневная международная конференция, посвященная последним достижениям в области искусственного интеллекта и машинного обучения. В программе - выступления ведущих экспертов, панельные дискуссии и презентации исследовательских работ.",
    imageUrl: null,
    type: "conference",
    date: "2023-05-20",
    startTime: "09:00",
    endTime: "18:00",
    location: "Конференц-зал научной библиотеки",
    isOnline: true,
    organizer: "Факультет информационных технологий",
    maxAttendees: 300,
    attendeesCount: 215,
    attendees: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", faculty: "Информационные технологии", year: 3 },
      { id: "u7", name: "Нурлан Сагинтаев", avatarUrl: null, faculty: "Информационные технологии", year: 2 }
    ],
    tags: ["AI", "Машинное обучение", "Исследования", "Международный"],
    facultiesInvolved: ["Информационные технологии", "Естественные науки"],
    status: "upcoming"
  },
  {
    id: "3",
    title: "Мастер-класс по научным публикациям",
    description: "Практический мастер-класс по подготовке и публикации научных статей в международных журналах. Участники узнают о требованиях к научным публикациям, процессе рецензирования и стратегиях повышения шансов на публикацию.",
    imageUrl: null,
    type: "workshop",
    date: "2023-04-05",
    startTime: "14:00",
    endTime: "17:00",
    location: "Онлайн (Zoom)",
    isOnline: true,
    organizer: "Научный отдел КазНУ",
    maxAttendees: 100,
    attendeesCount: 78,
    attendees: [
      { id: "u3", name: "Дамир Нугманов", avatarUrl: null, faculty: "Информационные технологии", year: 4 },
      { id: "u6", name: "Динара Казиева", avatarUrl: null, faculty: "Естественные науки", year: 1 }
    ],
    tags: ["Наука", "Публикации", "Академическое письмо"],
    facultiesInvolved: ["Все факультеты"],
    status: "active"
  },
  {
    id: "4",
    title: "Студенческий научный конкурс",
    description: "Ежегодный конкурс научных проектов среди студентов университета. Участники представят свои исследовательские работы перед жюри и получат шанс выиграть финансирование для дальнейшего развития проекта.",
    imageUrl: null,
    type: "competition",
    date: "2023-03-10",
    startTime: "10:00",
    endTime: "16:00",
    location: "Корпус естественных наук, Аудитория 305",
    isOnline: false,
    organizer: "Студенческое научное общество",
    maxAttendees: 150,
    attendeesCount: 98,
    attendees: [
      { id: "u4", name: "Айгерим Сатпаева", avatarUrl: null, faculty: "Бизнес и экономика", year: 3 },
      { id: "u6", name: "Динара Казиева", avatarUrl: null, faculty: "Естественные науки", year: 1 }
    ],
    tags: ["Наука", "Конкурс", "Исследования", "Финансирование"],
    facultiesInvolved: ["Все факультеты"],
    status: "past"
  }
];

// Вспомогательные функции
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const getEventTypeBadge = (type: string) => {
  switch (type) {
    case 'workshop':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Мастер-класс</Badge>;
    case 'lecture':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Лекция</Badge>;
    case 'conference':
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Конференция</Badge>;
    case 'competition':
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Конкурс</Badge>;
    case 'career_fair':
      return <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">Ярмарка вакансий</Badge>;
    case 'social':
      return <Badge className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100">Социальное</Badge>;
    default:
      return <Badge>Другое</Badge>;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Предстоящее</Badge>;
    case 'active':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Активное</Badge>;
    case 'past':
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">Прошедшее</Badge>;
    default:
      return <Badge>Неизвестно</Badge>;
  }
};

// Анимация
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// Компонент карточки мероприятия
const EventCard = ({ event }: { event: Event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {getEventTypeBadge(event.type)}
            {getStatusBadge(event.status)}
          </div>
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-1 text-sm mt-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.date)}, {event.startTime} - {event.endTime}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {event.description}
          </p>
          
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-start gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{event.location} {event.isOnline && "(Онлайн)"}</span>
            </div>
            <div className="flex items-start gap-1 text-sm text-muted-foreground">
              <Building className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Организатор: {event.organizer}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="text-sm">
              {event.attendeesCount} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} участников
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-4">
            {event.tags.map((tag, idx) => (
              <Badge key={idx} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t">
          <div className="w-full flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <a href={`/university/events/${event.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Детали
              </a>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Редактировать
              </Button>
              <Button variant="default" size="sm">
                {event.status === "past" ? "Статистика" : "Управление"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function UniversityEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  
  // Фильтрация мероприятий
  const filteredEvents = eventsData.filter(event => {
    // Поиск по названию и описанию
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Фильтр по статусу
    const matchesStatus = !statusFilter || event.status === statusFilter;
    
    // Фильтр по типу
    const matchesType = !typeFilter || event.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Разделение мероприятий по статусу
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const activeEvents = filteredEvents.filter(e => e.status === 'active');
  const pastEvents = filteredEvents.filter(e => e.status === 'past');
  
  return (
    <RoleLayout pageTitle="Мероприятия университета">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Заголовок и действия */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Управление мероприятиями</h1>
            <p className="text-muted-foreground mt-1">
              Создавайте и управляйте мероприятиями для студентов и сотрудников университета
            </p>
          </div>
          <div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Создать мероприятие</span>
            </Button>
          </div>
        </div>
        
        {/* Поиск и фильтры */}
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск мероприятий..."
              className="w-full pl-10 pr-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Фильтры</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Календарь</span>
            </Button>
          </div>
        </motion.div>
        
        {/* Табы с мероприятиями */}
        <motion.div variants={item}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="past">Прошедшие</TabsTrigger>
            </TabsList>
            
            {/* Все мероприятия */}
            <TabsContent value="all" className="mt-0">
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Мероприятия не найдены</h3>
                  {searchQuery || statusFilter || typeFilter ? (
                    <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                  ) : (
                    <div className="mt-4">
                      <Button>Создать мероприятие</Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Предстоящие мероприятия */}
            <TabsContent value="upcoming" className="mt-0">
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Предстоящие мероприятия не найдены</h3>
                  {searchQuery || typeFilter ? (
                    <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                  ) : (
                    <div className="mt-4">
                      <Button>Создать мероприятие</Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Активные мероприятия */}
            <TabsContent value="active" className="mt-0">
              {activeEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Активные мероприятия не найдены</h3>
                  {searchQuery || typeFilter ? (
                    <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                  ) : (
                    <p className="text-muted-foreground">В настоящее время нет активных мероприятий</p>
                  )}
                </div>
              )}
            </TabsContent>
            
            {/* Прошедшие мероприятия */}
            <TabsContent value="past" className="mt-0">
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Прошедшие мероприятия не найдены</h3>
                  {searchQuery || typeFilter ? (
                    <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                  ) : (
                    <p className="text-muted-foreground">В архиве нет прошедших мероприятий</p>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Календарь мероприятий */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Календарь мероприятий</CardTitle>
              <CardDescription>
                Просмотр и планирование мероприятий в календарном формате
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] border-dashed border-2 rounded-lg border-muted flex items-center justify-center">
              <div className="text-center">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Календарь мероприятий университета</p>
                <Button variant="outline">Открыть календарь</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Статистика и рекомендации */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Статистика посещаемости</CardTitle>
              <CardDescription>
                Показатели посещаемости мероприятий за последний семестр
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] border-dashed border-2 rounded-lg border-muted flex items-center justify-center">
              <div className="text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">График посещаемости по типам мероприятий</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href="/university/analytics">
                  <span>Подробная статистика</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Полезные ресурсы</CardTitle>
              <CardDescription>
                Материалы для организации успешных мероприятий
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Руководство по организации мероприятий</h3>
                  <p className="text-sm text-muted-foreground">Подробное пошаговое руководство для организаторов</p>
                  <Button variant="link" className="p-0 h-auto text-primary flex items-center gap-1" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span>Открыть руководство</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-background hover:bg-muted/50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Рекомендации по привлечению участников</h3>
                  <p className="text-sm text-muted-foreground">Стратегии продвижения мероприятий среди студентов</p>
                  <Button variant="link" className="p-0 h-auto text-primary flex items-center gap-1" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <span>Перейти к статье</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </RoleLayout>
  );
} 