"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Star, Clock, Award, TrendingUp, BookOpen, Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";

// Типы данных для рекомендаций
interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "course" | "job" | "event";
  matchScore: number; // от 0 до 100
  skills: string[];
  status?: "new" | "trending" | "recommended" | "popular";
  deadline?: string; // для событий и вакансий
  provider?: string; // для курсов - университет, для вакансий - компания
  image?: string;
}

// Имитация данных от ML-модели
const mockRecommendations: Recommendation[] = [
  {
    id: "course-1",
    title: "Python для анализа данных",
    description: "Научитесь анализировать данные с помощью Python и библиотек pandas, numpy, matplotlib.",
    type: "course",
    matchScore: 95,
    skills: ["Python", "Data Analysis", "Pandas", "NumPy"],
    status: "recommended",
    provider: "KazNU",
    image: "/images/courses/python-data.jpg",
  },
  {
    id: "job-1",
    title: "Junior Data Analyst",
    description: "Позиция для начинающего аналитика данных с знанием SQL и Python.",
    type: "job",
    matchScore: 88,
    skills: ["SQL", "Python", "Data Visualization", "Excel"],
    status: "new",
    deadline: "15.06.2023",
    provider: "Kaspi Bank",
    image: "/images/companies/kaspi.jpg",
  },
  {
    id: "event-1",
    title: "Воркшоп по SQL для аналитиков",
    description: "Практический мастер-класс по продвинутому SQL для аналитиков данных.",
    type: "event",
    matchScore: 91,
    skills: ["SQL", "Data Analysis", "PostgreSQL"],
    status: "trending",
    deadline: "22.05.2023",
    provider: "Kolesa Group",
    image: "/images/events/sql-workshop.jpg",
  },
  {
    id: "course-2",
    title: "Frontend-разработка с React",
    description: "Полный курс по созданию современных веб-приложений с использованием React.",
    type: "course",
    matchScore: 75,
    skills: ["JavaScript", "React", "HTML", "CSS"],
    provider: "Astana IT University",
    image: "/images/courses/react-course.jpg",
  },
  {
    id: "job-2",
    title: "React Developer",
    description: "Разработка пользовательских интерфейсов для финтех-продуктов.",
    type: "job",
    matchScore: 83,
    skills: ["React", "TypeScript", "Redux", "REST API"],
    status: "popular",
    deadline: "30.05.2023",
    provider: "Jusan Bank",
    image: "/images/companies/jusan.jpg",
  },
  {
    id: "event-2",
    title: "Meetup: ML в финтехе",
    description: "Обсуждение применения машинного обучения в финансовых технологиях.",
    type: "event",
    matchScore: 80,
    skills: ["Machine Learning", "Finance", "Python"],
    deadline: "12.06.2023",
    provider: "Halyk Bank",
    image: "/images/events/ml-fintech.jpg",
  },
  {
    id: "course-3",
    title: "Flutter для мобильной разработки",
    description: "Создание кросс-платформенных мобильных приложений на Dart и Flutter.",
    type: "course",
    matchScore: 70,
    skills: ["Flutter", "Dart", "Mobile Development", "UI/UX"],
    provider: "KBTU",
    image: "/images/courses/flutter-mobile.jpg",
  },
  {
    id: "job-3",
    title: "Mobile Developer (Android/Kotlin)",
    description: "Разработка и поддержка приложения для ритейла на Android с использованием Kotlin.",
    type: "job",
    matchScore: 79,
    skills: ["Android", "Kotlin", "Mobile", "REST API"],
    deadline: "20.06.2023",
    provider: "Magnum",
    image: "/images/companies/magnum.jpg",
  },
  {
    id: "event-3",
    title: "Хакатон: InnoTech Kazakhstan",
    description: "48-часовой хакатон по разработке инновационных решений для городов Казахстана.",
    type: "event",
    matchScore: 85,
    skills: ["Hackathon", "Innovation", "Teamwork", "Programming"],
    status: "trending",
    deadline: "10.07.2023",
    provider: "Astana Hub",
    image: "/images/events/hackathon.jpg",
  },
];

// Определяем цвет для статуса рекомендации
const getStatusColor = (status?: string) => {
  switch (status) {
    case "new":
      return "bg-green-500 text-white";
    case "trending":
      return "bg-purple-500 text-white";
    case "recommended":
      return "bg-indigo-500 text-white";
    case "popular":
      return "bg-amber-500 text-white";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Определяем иконку для типа рекомендации
const getTypeIcon = (type: string) => {
  switch (type) {
    case "course":
      return <BookOpen className="h-5 w-5" />;
    case "job":
      return <Briefcase className="h-5 w-5" />;
    case "event":
      return <Calendar className="h-5 w-5" />;
    default:
      return <TrendingUp className="h-5 w-5" />;
  }
};

// Основной компонент для рекомендаций
export default function AIRecommendationEngine() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [userSkills, setUserSkills] = useState<string[]>([
    "Python", "SQL", "Data Analysis", "JavaScript", "React"
  ]);
  
  // Эффект для загрузки данных при монтировании компонента
  useEffect(() => {
    // Имитация загрузки данных с сервера
    const loadData = async () => {
      setIsLoading(true);
      
      // В реальном приложении здесь был бы API-запрос к ML-сервису
      // для получения персонализированных рекомендаций
      
      // Имитируем задержку загрузки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Используем мок-данные для демонстрации
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Фильтрация рекомендаций по типу
  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === "all") return true;
    return rec.type === activeTab;
  });
  
  // Сортировка рекомендаций по релевантности
  const sortedRecommendations = [...filteredRecommendations].sort(
    (a, b) => b.matchScore - a.matchScore
  );
  
  // Отображение компонента в зависимости от состояния загрузки
  if (isLoading) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">Подбираем персонализированные рекомендации...</h2>
          <div className="max-w-md mx-auto space-y-3">
            <Progress value={65} className="h-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Анализируем ваш профиль и предпочтения
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-1">Персональные рекомендации</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Основано на вашем профиле и предпочтениях с использованием ИИ
          </p>
        </div>
        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
          <div className="flex flex-wrap gap-2 max-w-md">
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
              Ваши навыки:
            </span>
            {userSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="whitespace-nowrap">
                {skill}
              </Badge>
            ))}
            <Button variant="link" size="sm" className="text-indigo-500 dark:text-indigo-400 p-0 h-auto">
              +3 еще
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Все
          </TabsTrigger>
          <TabsTrigger value="course" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Курсы
          </TabsTrigger>
          <TabsTrigger value="job" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Вакансии
          </TabsTrigger>
          <TabsTrigger value="event" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Мероприятия
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 relative">
                    {recommendation.status && (
                      <Badge className={`absolute top-4 right-4 ${getStatusColor(recommendation.status)}`}>
                        {recommendation.status === "new" ? "Новое" : 
                          recommendation.status === "trending" ? "В тренде" : 
                          recommendation.status === "recommended" ? "Топ рекомендация" : 
                          "Популярное"}
                      </Badge>
                    )}
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`p-1.5 rounded-md ${
                        recommendation.type === "course" ? "bg-green-100 text-green-700" :
                        recommendation.type === "job" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>
                        {getTypeIcon(recommendation.type)}
                      </div>
                      <CardTitle className="text-lg">
                        {recommendation.title}
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {recommendation.provider}{recommendation.deadline && ` • До ${recommendation.deadline}`}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {recommendation.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {recommendation.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-normal">
                          {skill}
                        </Badge>
                      ))}
                      {recommendation.skills.length > 3 && (
                        <Badge variant="outline" className="font-normal">
                          +{recommendation.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm mr-1">Соответствие:</div>
                      <Progress value={recommendation.matchScore} className="h-2 flex-grow" />
                      <div className="text-sm font-medium">{recommendation.matchScore}%</div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button variant="default" className="w-full flex justify-between items-center">
                      <span>
                        {recommendation.type === "course" ? "Записаться на курс" :
                          recommendation.type === "job" ? "Откликнуться на вакансию" :
                          "Зарегистрироваться"}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-8">
        <Button variant="outline" className="mx-auto">
          Загрузить больше рекомендаций
        </Button>
      </div>
    </div>
  );
} 