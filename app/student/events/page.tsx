"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { motion } from "framer-motion";
import { 
  Calendar, MapPin, Search, Filter, Users,
  ChevronRight, Clock, Building, Plus, Star, 
  CheckCircle2, CalendarDays, ListFilter
} from "lucide-react";
import { useInView } from "@/lib/hooks";

// Типы для данных мероприятий
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  organizer: string;
  organizerLogo?: string;
  type: "workshop" | "conference" | "hackathon" | "meetup" | "other";
  tags: string[];
  image?: string;
}

interface RegisteredEvent extends Event {
  status: "upcoming" | "ongoing" | "completed";
  reminder?: boolean;
  joinUrl?: string;
}

interface AvailableEvent extends Event {
  participants: number;
  maxParticipants: number;
  price: string | null;
  applicationDeadline: string;
  isRecommended: boolean;
}

interface PastEvent extends Event {
  attended: boolean;
  feedback?: {
    submitted: boolean;
    rating?: number;
  };
  certificate?: string;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [ref, inView] = useInView({ triggerOnce: true });
  
  // Мероприятия, на которые студент записан
  const registeredEvents: RegisteredEvent[] = [
    {
      id: 1,
      title: "Хакатон по AI и ML",
      description: "48-часовой хакатон по созданию инновационных решений с использованием искусственного интеллекта и машинного обучения.",
      date: "2025-05-20T10:00:00",
      endDate: "2025-05-22T10:00:00",
      location: "Технопарк НАВЫК",
      organizer: "AI Innovation Lab",
      organizerLogo: "/logos/ai-lab.jpg",
      type: "hackathon",
      tags: ["AI", "ML", "Python", "Innovation"],
      status: "upcoming",
      reminder: true
    },
    {
      id: 2,
      title: "Мастер-класс по Frontend разработке",
      description: "Практический мастер-класс по современной frontend разработке с React и Next.js",
      date: "2025-05-25T15:00:00",
      endDate: "2025-05-25T18:00:00",
      location: "Онлайн",
      organizer: "Web Dev Masters",
      organizerLogo: "/logos/webdev.jpg",
      type: "workshop",
      tags: ["Frontend", "React", "Next.js"],
      status: "upcoming",
      joinUrl: "https://zoom.us/j/123456789",
      reminder: true
    }
  ];
  
  // Доступные мероприятия
  const availableEvents: AvailableEvent[] = [
    {
      id: 101,
      title: "Карьерный форум в IT",
      description: "Крупнейший карьерный форум в сфере IT. Встречи с работодателями, презентации компаний, собеседования и воркшопы.",
      date: "2025-06-01T09:00:00",
      endDate: "2025-06-01T18:00:00",
      location: "EXPO Centre",
      organizer: "Tech Career Hub",
      organizerLogo: "/logos/career-hub.jpg",
      type: "conference",
      tags: ["Карьера", "IT", "Networking"],
      participants: 456,
      maxParticipants: 1000,
      price: null,
      applicationDeadline: "2025-05-30",
      isRecommended: true
    },
    {
      id: 102,
      title: "DevOps практики в современной разработке",
      description: "Вебинар о лучших практиках DevOps, автоматизации процессов и построении эффективных CI/CD пайплайнов.",
      date: "2025-06-05T18:00:00",
      endDate: "2025-06-05T20:00:00",
      location: "Онлайн",
      organizer: "DevOps Community",
      organizerLogo: "/logos/devops.jpg",
      type: "workshop",
      tags: ["DevOps", "CI/CD", "Docker"],
      participants: 87,
      maxParticipants: 200,
      price: "5000 ₽",
      applicationDeadline: "2025-06-04",
      isRecommended: true
    }
  ];
  
  // Прошедшие мероприятия
  const pastEvents: PastEvent[] = [
    {
      id: 201,
      title: "Основы микросервисной архитектуры",
      description: "Практический воркшоп по построению микросервисной архитектуры.",
      date: "2025-04-15T14:00:00",
      endDate: "2025-04-15T18:00:00",
      location: "Tech Hub",
      organizer: "Microservices Pro",
      organizerLogo: "/logos/micro.jpg",
      type: "workshop",
      tags: ["Microservices", "Architecture", "Docker"],
      attended: true,
      feedback: {
        submitted: true,
        rating: 5
      },
      certificate: "CERT-MICRO-2025-001"
    }
  ];

  // Анимационные варианты
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

  return (
    <RoleLayout pageTitle="Мероприятия">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="space-y-6"
      >
        {/* Header and search */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Мероприятия и события</CardTitle>
              <CardDescription>
                Развивайтесь, учитесь и находите новые возможности. Участвуйте в мероприятиях от ведущих компаний и экспертов.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Поиск мероприятий..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Фильтры</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ListFilter className="h-4 w-4" />
                    <span>Сортировка</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="registered" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="registered" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Мои записи</span>
            </TabsTrigger>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Доступные</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Прошедшие</span>
            </TabsTrigger>
          </TabsList>

          {/* Content for registered events */}
          <TabsContent value="registered">
            <div className="space-y-6">
              {registeredEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="registered" />
              ))}
              {registeredEvents.length === 0 && (
                <EmptyState
                  icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
                  title="Нет записей на мероприятия"
                  description="Вы пока не зарегистрированы ни на одно мероприятие"
                />
              )}
            </div>
          </TabsContent>

          {/* Content for available events */}
          <TabsContent value="available">
            <div className="space-y-6">
              {availableEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="available" />
              ))}
              {availableEvents.length === 0 && (
                <EmptyState
                  icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
                  title="Нет доступных мероприятий"
                  description="В данный момент нет доступных мероприятий"
                />
              )}
            </div>
          </TabsContent>

          {/* Content for past events */}
          <TabsContent value="past">
            <div className="space-y-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="past" />
              ))}
              {pastEvents.length === 0 && (
                <EmptyState
                  icon={<Calendar className="h-12 w-12 text-muted-foreground" />}
                  title="Нет прошедших мероприятий"
                  description="У вас пока нет завершённых мероприятий"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </RoleLayout>
  );
}

// Компонент карточки мероприятия
function EventCard({ event, variant }: { 
  event: (RegisteredEvent | AvailableEvent | PastEvent), 
  variant: 'registered' | 'available' | 'past' 
}) {
  // Анимация для карточки
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div variants={item}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{event.title}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Building className="h-4 w-4 mr-1" />
                {event.organizer}
              </CardDescription>
            </div>
            {variant === 'registered' && 'status' in event && (
              <Badge variant="secondary">
                {event.status === 'ongoing' ? 'Идёт сейчас' : 'Предстоит'}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{event.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{new Date(event.date).toLocaleDateString('ru-RU', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              {'participants' in event && 'maxParticipants' in event && (
                <span>{event.participants} / {event.maxParticipants} участников</span>
              )}
            </div>
            <div className="flex gap-2">
              {variant === 'registered' && 'joinUrl' in event && event.joinUrl && (
                <Button variant="outline">Присоединиться</Button>
              )}
              {variant === 'available' && (
                <Button>Зарегистрироваться</Button>
              )}
              {variant === 'past' && 'certificate' in event && event.certificate && (
                <Button variant="outline">Скачать сертификат</Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Компонент для пустого состояния
function EmptyState({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 text-muted-foreground mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}