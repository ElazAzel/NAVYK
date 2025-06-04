"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ChevronRight, Layers, BarChart4, Database, Share2, ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

// Импорт компонентов улучшений
import RealTimeAnalytics from "../analytics/RealTimeAnalytics";
import AIRecommendationEngine from "../recommendations/AIRecommendationEngine";
import ExternalServiceIntegration from "../integrations/ExternalServiceIntegration";
import DragDropRoadmap from "../career/DragDropRoadmap";

interface ImprovementCard {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  component: React.ReactNode;
  icon: React.ReactNode;
  color: string;
}

export default function PlatformEnhancements() {
  const [activeTab, setActiveTab] = useState<string>("analytics");
  
  const improvements: ImprovementCard[] = [
    {
      id: "analytics",
      title: "Аналитика в реальном времени",
      description: "Отслеживание активности студентов, работодателей и университетов в режиме реального времени.",
      benefits: [
        "Мгновенное отображение действий пользователей",
        "Агрегация статистики по категориям",
        "Визуализация трендов и закономерностей",
        "Уведомления о важных событиях"
      ],
      component: <RealTimeAnalytics />,
      icon: <BarChart4 className="h-8 w-8" />,
      color: "bg-blue-500 from-blue-500 to-blue-600"
    },
    {
      id: "recommendations",
      title: "ML-рекомендации",
      description: "Интеллектуальная система рекомендаций на основе машинного обучения.",
      benefits: [
        "Персонализированные предложения курсов, вакансий и мероприятий",
        "Автоматическое выявление релевантных навыков",
        "Прогнозирование трендов на рынке труда",
        "Адаптивный подбор карьерного пути"
      ],
      component: <AIRecommendationEngine />,
      icon: <Database className="h-8 w-8" />,
      color: "bg-purple-500 from-purple-500 to-purple-600"
    },
    {
      id: "integrations",
      title: "Внешние интеграции",
      description: "Подключение внешних сервисов и платформ для расширения функциональности.",
      benefits: [
        "Синхронизация с LinkedIn, GitHub, Telegram и другими платформами",
        "Экспорт данных в HR-системы работодателей",
        "Единый вход через популярные сервисы",
        "API для разработчиков и партнёров"
      ],
      component: <ExternalServiceIntegration />,
      icon: <Share2 className="h-8 w-8" />,
      color: "bg-green-500 from-green-500 to-green-600"
    },
    {
      id: "roadmap",
      title: "Drag-and-Drop Roadmap",
      description: "Интерактивная карта развития карьеры с возможностью планирования.",
      benefits: [
        "Визуальное построение карьерной траектории",
        "Отслеживание зависимостей между навыками",
        "Гибкая настройка приоритетов и сроков",
        "Рекомендации по оптимальному пути развития"
      ],
      component: <DragDropRoadmap />,
      icon: <Layers className="h-8 w-8" />,
      color: "bg-amber-500 from-amber-500 to-amber-600"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Улучшения платформы NAVYK</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Новые функции и возможности, которые делают образовательную платформу более полезной для студентов, работодателей и университетов.
          </p>
        </motion.div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {improvements.map((improvement, index) => (
            <motion.div
              key={improvement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TabsTrigger
                value={improvement.id}
                className={`w-full h-full p-0 data-[state=active]:bg-transparent`}
              >
                <Card 
                  className={`h-full border transition-all ${
                    activeTab === improvement.id 
                      ? "border-2 border-primary shadow-lg" 
                      : "hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3 bg-gradient-to-br ${improvement.color}`}>
                      {improvement.icon}
                    </div>
                    <CardTitle className="text-xl">{improvement.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{improvement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <ul className="space-y-1 text-sm">
                      {improvement.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                          <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      variant={activeTab === improvement.id ? "default" : "ghost"}
                      size="sm"
                      className="w-full"
                    >
                      {activeTab === improvement.id ? "Активно" : "Показать"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsTrigger>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-950 rounded-lg border p-1 shadow-sm">
          {improvements.map((improvement) => (
            <TabsContent key={improvement.id} value={improvement.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {improvement.component}
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Технологический стек улучшений</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Backend технологии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>WebSockets для обновления в реальном времени</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>ML-сервисы на Python (TensorFlow/PyTorch)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>API интеграции (REST, GraphQL, OAuth)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Система ролей и контроля доступа</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-500" />
                Frontend технологии
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Framer Motion для анимаций и взаимодействий</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Drag-and-drop интерфейсы для улучшения UX</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Интерактивные графики и диаграммы</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Компоненты с реальными данными</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5 text-purple-500" />
                Интеграции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>LinkedIn API для профилей и вакансий</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>GitHub API для проектов и активности</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>HR-системы (BambooHR, Workable)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-primary" />
                  <span>Telegram API для уведомлений</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Готовы внедрить улучшения?</h2>
            <p className="text-lg mb-6 text-white/90">
              Все эти улучшения могут быть внедрены в вашу образовательную платформу в кратчайшие сроки. Наша команда готова помочь с интеграцией и настройкой.
            </p>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90">
              <Link href="/contact" className="flex items-center gap-2">
                Связаться с нами
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <BarChart4 className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Улучшенная аналитика и инсайты</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Database className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Персонализированные рекомендации</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Интеграции с внешними системами</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <Layers className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Удобное планирование развития</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 