"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Briefcase,
  BookOpen,
  BarChart,
  Users,
  Calendar,
  Map,
  MessageSquare,
  Bell,
  ChevronRight
} from "lucide-react";

export default function FeaturesPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

  const features = [
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Профессиональное развитие студентов",
      description: "Оптимизируйте свой учебный путь, взаимодействуйте с ведущими работодателями и получайте персонализированные рекомендации по развитию карьеры.",
      points: [
        "Персонализированные рекомендации по карьерному росту",
        "Доступ к мероприятиям от ведущих компаний",
        "Строитель карьерного пути в реальном времени"
      ],
      badge: "Для студентов"
    },
    {
      icon: <Briefcase className="h-10 w-10 text-purple-500" />,
      title: "Поиск талантливых кадров",
      description: "Найдите идеальных кандидатов на ваши вакансии, взаимодействуйте со студентами напрямую и развивайте университетские партнерства.",
      points: [
        "Умный подбор кандидатов на основе навыков и интересов",
        "Организация мероприятий для привлечения студентов",
        "Аналитика взаимодействия с потенциальными кандидатами"
      ],
      badge: "Для работодателей"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      title: "Аналитика образовательных программ",
      description: "Получайте детальную аналитику по вашим образовательным программам, отслеживайте успехи студентов и адаптируйте курсы под потребности рынка.",
      points: [
        "Детальные отчеты о активности и успехах студентов",
        "Интеграция с потребностями работодателей",
        "Улучшение образовательных программ на основе данных"
      ],
      badge: "Для университетов"
    },
    {
      icon: <BarChart className="h-10 w-10 text-amber-500" />,
      title: "Аналитика и отчеты",
      description: "Получайте ценные данные о взаимодействии студентов, работодателей и образовательных программ для принятия обоснованных решений.",
      points: [
        "Визуализации и дашборды в режиме реального времени",
        "Экспорт данных в различных форматах",
        "Персонализированные отчеты для всех участников"
      ],
      badge: "Аналитика"
    },
    {
      icon: <Calendar className="h-10 w-10 text-red-500" />,
      title: "Управление мероприятиями",
      description: "Организуйте и управляйте мероприятиями: от вебинаров и хакатонов до ярмарок вакансий и дней открытых дверей.",
      points: [
        "Полный цикл управления мероприятиями",
        "Автоматизированная регистрация участников",
        "Аналитика по результатам проведенных мероприятий"
      ],
      badge: "Мероприятия"
    },
    {
      icon: <Map className="h-10 w-10 text-indigo-500" />,
      title: "Карта карьерного развития",
      description: "Визуализируйте и планируйте карьерные пути, ставьте цели и отслеживайте прогресс в достижении профессиональных навыков.",
      points: [
        "Интерактивная дорожная карта развития",
        "Рекомендации на основе целей и интересов",
        "Интеграция с курсами и вакансиями"
      ],
      badge: "Карьерный рост"
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-cyan-500" />,
      title: "Коммуникационная платформа",
      description: "Обеспечьте эффективное общение между студентами, работодателями, менторами и представителями университетов.",
      points: [
        "Чаты и видеоконференции",
        "Система обратной связи по заявкам и резюме",
        "Уведомления о важных событиях и возможностях"
      ],
      badge: "Коммуникации"
    },
    {
      icon: <Bell className="h-10 w-10 text-pink-500" />,
      title: "Система уведомлений",
      description: "Получайте своевременные уведомления о важных событиях, новых возможностях и обновлениях статусов ваших заявок.",
      points: [
        "Настраиваемые уведомления для всех типов пользователей",
        "Интеграция с email и мобильными устройствами",
        "Персонализированные рекомендации на основе активности"
      ],
      badge: "Уведомления"
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
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm">
            Все возможности на одной платформе
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Образовательная платформа для успешного карьерного старта
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Объединяем студентов, работодателей и университеты в единую экосистему, 
            которая помогает каждому участнику достигать своих целей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Начать бесплатно
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Запросить демо
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex flex-col h-full"
            >
              <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
                <div className="mb-4">{feature.icon}</div>
                <Badge variant="secondary" className="w-fit mb-4">
                  {feature.badge}
                </Badge>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{feature.description}</p>
                <ul className="space-y-2 mb-4">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="mt-auto self-start group">
                  Узнать больше <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Готовы начать путь к успешной карьере?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам студентов, работодателей и университетов, уже использующих нашу платформу для достижения своих целей.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Создать аккаунт
            </Button>
            <Link href="/pricing" passHref>
              <Button size="lg" variant="outline" className="px-8">
                Узнать о ценах
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 