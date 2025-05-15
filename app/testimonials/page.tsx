"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Quote,
  Star,
  BookOpen,
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState("all");

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

  // Отзывы пользователей
  const testimonials = [
    {
      id: 1,
      name: "Алексей Иванов",
      role: "Выпускник, Специалист по Data Science",
      avatar: "/avatars/alexey.jpg",
      company: "Технологическая компания 'Инсайт'",
      university: "Московский Государственный Университет",
      quote: "Благодаря платформе я нашел свою первую работу в сфере Data Science. Карьерная дорожная карта помогла мне понять, какие навыки мне нужно развивать, а доступ к закрытым мероприятиям позволил напрямую пообщаться с работодателями.",
      rating: 5,
      video: "/videos/alexey-interview.mp4",
      type: "student",
      tags: ["трудоустройство", "карьерный рост", "дорожная карта"]
    },
    {
      id: 2,
      name: "Мария Петрова",
      role: "HR-директор",
      avatar: "/avatars/maria.jpg",
      company: "Цифровые Технологии",
      university: "",
      quote: "Мы значительно сократили время на поиск кандидатов с нужными нам навыками. Особенно ценна возможность напрямую организовывать мероприятия для студентов и отслеживать их интерес к нашим вакансиям. За последний год мы наняли 15 молодых специалистов через платформу.",
      rating: 5,
      video: "/videos/maria-interview.mp4",
      type: "employer",
      tags: ["подбор персонала", "мероприятия", "аналитика"]
    },
    {
      id: 3,
      name: "Дмитрий Смирнов",
      role: "Проректор по учебной работе",
      avatar: "/avatars/dmitry.jpg",
      company: "",
      university: "Технический Университет",
      quote: "Аналитика активности студентов на платформе позволила нам скорректировать образовательные программы в соответствии с требованиями рынка. Увеличилось число трудоустроенных выпускников, а партнерства с компаниями стали более продуктивными.",
      rating: 4,
      video: "/videos/dmitry-interview.mp4",
      type: "university",
      tags: ["аналитика образования", "трудоустройство выпускников", "партнерства"]
    },
    {
      id: 4,
      name: "Екатерина Николаева",
      role: "Студентка, Frontend-разработчик",
      avatar: "/avatars/ekaterina.jpg",
      company: "IT-студия 'Вебмастер'",
      university: "Санкт-Петербургский Государственный Университет",
      quote: "Платформа стала для меня настоящим проводником в мир IT. Я прошла рекомендованные курсы, посетила несколько мероприятий и получила стажировку, которая переросла в постоянную работу. Самый ценный инструмент - это персонализированные рекомендации по развитию.",
      rating: 5,
      video: "/videos/ekaterina-interview.mp4",
      type: "student",
      tags: ["стажировка", "развитие навыков", "обучение"]
    },
    {
      id: 5,
      name: "Игорь Семенов",
      role: "Руководитель отдела разработки",
      avatar: "/avatars/igor.jpg",
      company: "Финтех Солюшнс",
      university: "",
      quote: "Мы высоко ценим возможность выстраивать долгосрочные отношения со студентами. Начиная с организации хакатонов и заканчивая предложением стажировок и трудоустройством, платформа обеспечивает нас качественными кандидатами на всех этапах.",
      rating: 4,
      video: "/videos/igor-interview.mp4",
      type: "employer",
      tags: ["подбор персонала", "хакатоны", "стажировки"]
    },
    {
      id: 6,
      name: "Наталья Кузнецова",
      role: "Директор центра карьеры",
      avatar: "/avatars/natalya.jpg",
      company: "",
      university: "Экономический Университет",
      quote: "Внедрение платформы значительно повысило уровень взаимодействия студентов с работодателями. Мы получаем детальную аналитику по активности и интересам студентов, а также можем эффективнее организовывать карьерные мероприятия.",
      rating: 5,
      video: "/videos/natalya-interview.mp4",
      type: "university",
      tags: ["центр карьеры", "аналитика", "мероприятия"]
    },
    {
      id: 7,
      name: "Андрей Васильев",
      role: "Аспирант, Исследователь",
      avatar: "/avatars/andrey.jpg",
      company: "Исследовательский институт",
      university: "Новосибирский Государственный Университет",
      quote: "Платформа помогла мне найти грант для моего исследовательского проекта и установить контакты с промышленными партнерами. Особенно полезными оказались рекомендации по участию в научных конференциях и семинарах.",
      rating: 4,
      video: "/videos/andrey-interview.mp4",
      type: "student",
      tags: ["исследования", "гранты", "научная работа"]
    },
    {
      id: 8,
      name: "Ольга Миронова",
      role: "Директор по персоналу",
      avatar: "/avatars/olga.jpg",
      company: "Логистическая компания 'Экспресс'",
      university: "",
      quote: "Мы используем платформу не только для поиска кандидатов, но и для организации образовательных программ совместно с университетами. Это позволяет нам 'выращивать' специалистов под конкретные позиции и существенно снижать затраты на адаптацию новых сотрудников.",
      rating: 5,
      video: "/videos/olga-interview.mp4",
      type: "employer",
      tags: ["образовательные программы", "сотрудничество с вузами", "рекрутмент"]
    }
  ];

  // Фильтрация отзывов в зависимости от выбранной вкладки
  const filteredTestimonials = testimonials.filter(testimonial => 
    activeTab === "all" || testimonial.type === activeTab
  );

  // Формирование звездного рейтинга
  const renderRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  // Получение иконки для типа пользователя
  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "student":
        return <GraduationCap className="h-4 w-4 mr-1" />;
      case "employer":
        return <Briefcase className="h-4 w-4 mr-1" />;
      case "university":
        return <BookOpen className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Получение текста для типа пользователя
  const getUserTypeText = (type: string) => {
    switch (type) {
      case "student":
        return "Студент";
      case "employer":
        return "Работодатель";
      case "university":
        return "Университет";
      default:
        return "";
    }
  };

  // Получение цвета для бейджа типа пользователя
  const getUserTypeBadgeColor = (type: string) => {
    switch (type) {
      case "student":
        return "bg-blue-100 text-blue-800";
      case "employer":
        return "bg-purple-100 text-purple-800";
      case "university":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
            Истории успеха наших пользователей
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Узнайте, как наша платформа помогает студентам, работодателям и университетам достигать своих целей и развивать карьерные возможности.
          </p>
        </motion.div>

        {/* Featured Video Testimonial */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <Card className="overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto bg-gray-100">
                <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
                <div className="flex items-center justify-center h-full">
                  <div className="relative h-full w-full">
                    <img 
                      src="/images/testimonial-cover.jpg" 
                      alt="Видеоотзыв" 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <Button
                        variant="outline" 
                        className="rounded-full h-16 w-16 flex items-center justify-center border-2 bg-white bg-opacity-20 text-white backdrop-blur-sm hover:bg-opacity-30"
                      >
                        <Play className="h-8 w-8 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-blue-500 mr-4" />
                  <div className="flex">
                    {renderRating(5)}
                  </div>
                </div>
                <blockquote className="text-xl font-medium text-gray-900 mb-6">
                  &quot;Платформа стала мостом между нашим университетом и индустрией. Мы видим значительный рост трудоустройства выпускников и улучшение образовательных программ благодаря аналитике и партнерствам.&quot;
                </blockquote>
                <div className="flex items-center mt-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/avatars/featured.jpg" alt="Александр Петров" />
                    <AvatarFallback>АП</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Александр Петров</p>
                    <p className="text-gray-600 text-sm">Ректор, Технологический Институт</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>Смотреть полное интервью</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Testimonials Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">Все отзывы</TabsTrigger>
              <TabsTrigger value="student">Студенты</TabsTrigger>
              <TabsTrigger value="employer">Работодатели</TabsTrigger>
              <TabsTrigger value="university">Университеты</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeIn}
              className="flex flex-col h-full"
            >
              <Card className="p-6 h-full flex flex-col relative hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {renderRating(testimonial.rating)}
                  </div>
                  <Badge 
                    className={`${getUserTypeBadgeColor(testimonial.type)} flex items-center`}
                  >
                    {getUserTypeIcon(testimonial.type)}
                    {getUserTypeText(testimonial.type)}
                  </Badge>
                </div>
                
                <div className="mb-6 flex-grow">
                  <Quote className="h-6 w-6 text-blue-500 mb-3" />
                  <blockquote className="text-gray-800">
                    {testimonial.quote}
                  </blockquote>
                </div>
                
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-gray-500 text-xs">
                      {testimonial.company && testimonial.company}
                      {testimonial.company && testimonial.university && ", "}
                      {testimonial.university && testimonial.university}
                    </p>
                  </div>
                </div>
                
                {testimonial.video && (
                  <Button 
                    variant="ghost" 
                    className="mt-6 flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Смотреть видеоотзыв
                  </Button>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
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
            <Button variant="outline" size="sm" className="h-8 w-8">8</Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Станьте частью нашего сообщества
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам студентов, работодателей и университетов, которые уже достигают своих целей с нашей платформой.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Оставить отзыв
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}