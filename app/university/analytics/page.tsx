"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Users, 
  GraduationCap, 
  LineChart,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ArrowUpRight,
  Download,
  RefreshCw
} from "lucide-react";

// Типы данных
interface StatCard {
  title: string;
  value: number | string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "amber";
}

interface FacultyData {
  name: string;
  studentsCount: number;
  avgProgress: number;
  completionRate: number;
  employmentRate: number;
}

interface ActivityData {
  date: string;
  studentsActive: number;
  eventsAttended: number;
}

// Мок-данные
const statCards: StatCard[] = [
  {
    title: "Активные студенты",
    value: 12845,
    change: 12.5,
    changeLabel: "с прошлого месяца",
    icon: <Users />,
    color: "blue"
  },
  {
    title: "Средний прогресс",
    value: "68%",
    change: 4.2,
    changeLabel: "с прошлого месяца",
    icon: <LineChart />,
    color: "green"
  },
  {
    title: "Трудоустройство",
    value: "74%",
    change: -2.1,
    changeLabel: "с прошлого месяца",
    icon: <GraduationCap />,
    color: "purple"
  },
  {
    title: "Мероприятия",
    value: 245,
    change: 18.3,
    changeLabel: "с прошлого месяца",
    icon: <Calendar />,
    color: "amber"
  }
];

const facultiesData: FacultyData[] = [
  {
    name: "Информационные технологии",
    studentsCount: 3250,
    avgProgress: 75,
    completionRate: 82,
    employmentRate: 88
  },
  {
    name: "Бизнес и экономика",
    studentsCount: 2840,
    avgProgress: 71,
    completionRate: 78,
    employmentRate: 82
  },
  {
    name: "Инженерия",
    studentsCount: 2150,
    avgProgress: 68,
    completionRate: 75,
    employmentRate: 79
  },
  {
    name: "Естественные науки",
    studentsCount: 1820,
    avgProgress: 72,
    completionRate: 80,
    employmentRate: 76
  },
  {
    name: "Социальные науки",
    studentsCount: 1560,
    avgProgress: 65,
    completionRate: 73,
    employmentRate: 71
  },
  {
    name: "Медицина",
    studentsCount: 1225,
    avgProgress: 80,
    completionRate: 85,
    employmentRate: 92
  }
];

const activityData: ActivityData[] = [
  { date: "2023-01-01", studentsActive: 8240, eventsAttended: 1250 },
  { date: "2023-02-01", studentsActive: 9120, eventsAttended: 1420 },
  { date: "2023-03-01", studentsActive: 9680, eventsAttended: 1580 },
  { date: "2023-04-01", studentsActive: 10240, eventsAttended: 1720 },
  { date: "2023-05-01", studentsActive: 11450, eventsAttended: 1950 },
  { date: "2023-06-01", studentsActive: 10780, eventsAttended: 1840 },
  { date: "2023-07-01", studentsActive: 9250, eventsAttended: 1350 },
  { date: "2023-08-01", studentsActive: 8970, eventsAttended: 1280 },
  { date: "2023-09-01", studentsActive: 11520, eventsAttended: 2120 },
  { date: "2023-10-01", studentsActive: 12150, eventsAttended: 2340 },
  { date: "2023-11-01", studentsActive: 12680, eventsAttended: 2450 },
  { date: "2023-12-01", studentsActive: 12845, eventsAttended: 2520 }
];

// Анимация
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

// Компоненты графиков
const LineChartPlaceholder = () => (
  <div className="h-[300px] w-full rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-muted/20">
    <div className="text-center">
      <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">Линейный график активности студентов</p>
    </div>
  </div>
);

const BarChartPlaceholder = () => (
  <div className="h-[300px] w-full rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-muted/20">
    <div className="text-center">
      <BarChartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">Столбчатая диаграмма по факультетам</p>
    </div>
  </div>
);

const PieChartPlaceholder = () => (
  <div className="h-[300px] w-full rounded-lg border border-dashed border-gray-300 flex items-center justify-center bg-muted/20">
    <div className="text-center">
      <PieChartIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">Круговая диаграмма распределения</p>
    </div>
  </div>
);

export default function UniversityAnalyticsPage() {
  const [dateRange, setDateRange] = useState<"week" | "month" | "quarter" | "year">("month");
  
  return (
    <RoleLayout pageTitle="Аналитика университета">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Заголовок и фильтры */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Аналитика и отчеты</h1>
            <p className="text-muted-foreground mt-1">
              Исследуйте данные об успеваемости, активности и трудоустройстве студентов
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Экспорт данных</span>
            </Button>
            <Button className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Обновить</span>
            </Button>
          </div>
        </div>
        
        {/* Карточки со статистикой */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => {
            const bgColor = card.color === "blue" 
              ? "from-blue-500 to-blue-600" 
              : card.color === "green" 
                ? "from-green-500 to-green-600" 
                : card.color === "purple" 
                  ? "from-purple-500 to-purple-600" 
                  : "from-amber-500 to-amber-600";
                  
            return (
              <Card key={index} className={`bg-gradient-to-br ${bgColor} text-white`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium opacity-90">{card.title}</p>
                      <p className="text-3xl font-bold mt-2">{card.value}</p>
                      <div className="flex items-center mt-2 text-xs">
                        {card.change > 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        <span>
                          {Math.abs(card.change)}% {card.changeLabel}
                        </span>
                      </div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      {React.cloneElement(card.icon as React.ReactElement, { className: "h-5 w-5" })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>
        
        {/* Временные периоды */}
        <motion.div variants={item} className="flex items-center justify-end">
          <div className="bg-background border rounded-md p-1 flex">
            <Button 
              variant={dateRange === "week" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setDateRange("week")}
            >
              Неделя
            </Button>
            <Button 
              variant={dateRange === "month" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setDateRange("month")}
            >
              Месяц
            </Button>
            <Button 
              variant={dateRange === "quarter" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setDateRange("quarter")}
            >
              Квартал
            </Button>
            <Button 
              variant={dateRange === "year" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setDateRange("year")}
            >
              Год
            </Button>
          </div>
        </motion.div>
        
        {/* Графики */}
        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="students">Студенты</TabsTrigger>
              <TabsTrigger value="faculties">Факультеты</TabsTrigger>
              <TabsTrigger value="employment">Трудоустройство</TabsTrigger>
              <TabsTrigger value="events">Мероприятия</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Активность студентов</CardTitle>
                    <CardDescription>
                      Динамика посещаемости и вовлеченности
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChartPlaceholder />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Прогресс по факультетам</CardTitle>
                    <CardDescription>
                      Средний прогресс обучения по факультетам
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartPlaceholder />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="students" className="mt-0">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Активность студентов</CardTitle>
                    <CardDescription>
                      Динамика активности и прогресса обучения
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChartPlaceholder />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение студентов</CardTitle>
                    <CardDescription>
                      Статистика по курсам, специальностям и успеваемости
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] overflow-auto">
                    <table className="w-full border-collapse">
                      <thead className="sticky top-0 bg-background">
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium">Факультет</th>
                          <th className="py-3 px-4 text-right font-medium">Кол-во студентов</th>
                          <th className="py-3 px-4 text-right font-medium">Ср. прогресс</th>
                          <th className="py-3 px-4 text-right font-medium">Завершаемость</th>
                          <th className="py-3 px-4 text-right font-medium">Трудоустройство</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facultiesData.map((faculty, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-3 px-4">{faculty.name}</td>
                            <td className="py-3 px-4 text-right">{faculty.studentsCount}</td>
                            <td className="py-3 px-4 text-right">{faculty.avgProgress}%</td>
                            <td className="py-3 px-4 text-right">{faculty.completionRate}%</td>
                            <td className="py-3 px-4 text-right">{faculty.employmentRate}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faculties" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Прогресс по факультетам</CardTitle>
                    <CardDescription>
                      Сравнение прогресса обучения между факультетами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartPlaceholder />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Распределение студентов</CardTitle>
                    <CardDescription>
                      Количество студентов по факультетам
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChartPlaceholder />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="employment" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Уровень трудоустройства</CardTitle>
                    <CardDescription>
                      Процент трудоустройства выпускников по годам
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChartPlaceholder />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Трудоустройство по специальностям</CardTitle>
                    <CardDescription>
                      Сравнение показателей трудоустройства по специальностям
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChartPlaceholder />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Посещаемость мероприятий</CardTitle>
                    <CardDescription>
                      Динамика посещаемости мероприятий по месяцам
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChartPlaceholder />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Типы мероприятий</CardTitle>
                    <CardDescription>
                      Распределение мероприятий по категориям
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChartPlaceholder />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Последняя активность */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Последняя активность</CardTitle>
              <CardDescription>
                Статистика активности студентов за последние 12 месяцев
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] overflow-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Дата</th>
                    <th className="py-3 px-4 text-right font-medium">Активных студентов</th>
                    <th className="py-3 px-4 text-right font-medium">Посещений мероприятий</th>
                    <th className="py-3 px-4 text-right font-medium">Изменение (мес/мес)</th>
                  </tr>
                </thead>
                <tbody>
                  {activityData.slice().reverse().map((month, index, array) => {
                    const prevMonth = index < array.length - 1 ? array[index + 1].studentsActive : month.studentsActive;
                    const change = ((month.studentsActive - prevMonth) / prevMonth) * 100;
                    const changeFormatted = change.toFixed(1);
                    
                    return (
                      <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          {new Date(month.date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                        </td>
                        <td className="py-3 px-4 text-right">{month.studentsActive.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">{month.eventsAttended.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end">
                            {change > 0 ? (
                              <><ArrowUpRight className="h-4 w-4 text-green-500 mr-1" /><span className="text-green-600">+{changeFormatted}%</span></>
                            ) : change < 0 ? (
                              <><ArrowDown className="h-4 w-4 text-red-500 mr-1" /><span className="text-red-600">{changeFormatted}%</span></>
                            ) : (
                              <span>0%</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </RoleLayout>
  );
} 