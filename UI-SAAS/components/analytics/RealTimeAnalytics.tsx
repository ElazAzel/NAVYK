"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart, LineChart, PieChart, Activity, Users, BookOpen, Clock } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

// Типы данных для аналитики
interface AnalyticsData {
  activeUsers: number;
  courseViews: number;
  jobApplications: number;
  eventRegistrations: number;
  usersByUniversity: Record<string, number>;
  activityTimeline: Array<{time: string, count: number}>;
  popularSkills: Array<{skill: string, count: number}>;
  latestActivities: Array<{
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
  }>;
}

// Начальные данные
const initialData: AnalyticsData = {
  activeUsers: 0,
  courseViews: 0,
  jobApplications: 0,
  eventRegistrations: 0,
  usersByUniversity: {},
  activityTimeline: Array(12).fill(null).map((_, i) => ({
    time: `${i}:00`,
    count: 0
  })),
  popularSkills: [],
  latestActivities: []
};

export default function RealTimeAnalytics() {
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    // В реальном приложении здесь был бы реальный адрес сервера
    // const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "https://api.navyk.kz");
    
    // Симулируем данные для демонстрации
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        courseViews: prev.courseViews + Math.floor(Math.random() * 10),
        jobApplications: prev.jobApplications + Math.floor(Math.random() * 3),
        eventRegistrations: prev.eventRegistrations + Math.floor(Math.random() * 2),
        activityTimeline: prev.activityTimeline.map((item, i) => {
          if (i === new Date().getHours()) {
            return { ...item, count: item.count + Math.floor(Math.random() * 5) };
          }
          return item;
        }),
        latestActivities: [
          {
            id: Date.now().toString(),
            user: `Пользователь_${Math.floor(Math.random() * 1000)}`,
            action: ['просмотрел курс', 'откликнулся на вакансию', 'зарегистрировался на мероприятие'][Math.floor(Math.random() * 3)],
            target: ['Python для начинающих', 'Junior Frontend Developer', 'Мастер-класс по ML'][Math.floor(Math.random() * 3)],
            time: new Date().toLocaleTimeString()
          },
          ...prev.latestActivities.slice(0, 9)
        ]
      }));
      setLastUpdate(new Date().toLocaleTimeString());
    }, 3000);

    setConnected(true);

    return () => {
      clearInterval(interval);
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // Варианты отображения (список/карточки)
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-1">Аналитика в реальном времени</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Отслеживайте активность пользователей и собирайте инсайты в реальном времени
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={connected ? "default" : "destructive"} className="px-2 py-1">
            {connected ? "Подключено" : "Отключено"}
          </Badge>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Обновлено: {lastUpdate}
          </div>
          <div className="flex rounded-md overflow-hidden">
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <BarChart className="h-4 w-4 mr-1" />
              Список
            </Button>
            <Button 
              variant={viewMode === 'cards' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('cards')}
              className="rounded-none"
            >
              <PieChart className="h-4 w-4 mr-1" />
              Карточки
            </Button>
          </div>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Активные пользователи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-indigo-500" />
              <div className="text-3xl font-bold">{data.activeUsers}</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              +{Math.floor(data.activeUsers * 0.1)} за последний час
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Просмотры курсов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-green-500" />
              <div className="text-3xl font-bold">{data.courseViews}</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              +{Math.floor(data.courseViews * 0.05)} за последний час
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Отклики на вакансии
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-blue-500" />
              <div className="text-3xl font-bold">{data.jobApplications}</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              +{Math.floor(data.jobApplications * 0.08)} за последний час
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Регистрации на мероприятия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-purple-500" />
              <div className="text-3xl font-bold">{data.eventRegistrations}</div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              +{Math.floor(data.eventRegistrations * 0.12)} за последний час
            </p>
          </CardContent>
        </Card>
      </div>

      {/* График активности по времени */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Активность по времени</CardTitle>
          <CardDescription>
            Количество действий пользователей за последние 12 часов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 relative">
            {/* Контейнер для столбцов графика */}
            <div className="absolute inset-x-0 top-0 bottom-8 flex items-end justify-around">
              {data.activityTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  className="w-12 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-lg"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min(item.count, 100)}%` }}
                  transition={{ duration: 0.5, type: "spring" }}
                />
              ))}
            </div>
            
            {/* Контейнер для подписей под столбцами */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              {data.activityTimeline.map((item, i) => (
                <div key={i} className="text-xs text-center text-gray-500 dark:text-gray-400 w-12">
                  {item.time}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Последние активности */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Последние активности</CardTitle>
          <CardDescription>
            Действия пользователей в режиме реального времени
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.latestActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start p-3 border-b border-gray-100 dark:border-gray-800"
              >
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-2 mr-3">
                  <Activity className="h-4 w-4 text-indigo-500 dark:text-indigo-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 