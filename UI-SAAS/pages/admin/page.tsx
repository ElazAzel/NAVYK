import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UserIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellAlertIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Label } from "@/components/ui/label"
import BarChart from "@/components/BarChart";
import PopularItemsTable from "@/components/PopularItemsTable";

interface DashboardData {
  stats: Array<{
    title: string;
    value: string | number;
    change: number;
    changeType: 'increase' | 'decrease';
    description: string;
  }>;
  skillsData: Array<{
    label: string;
    value: number;
  }>;
  popularEvents: Array<{
    id: string;
    title: string;
    category: string;
    participants: number;
  }>;
  popularCourses: Array<{
    id: string;
    title: string;
    category: string;
    participants: number;
  }>;
  popularVacancies: Array<{
    id: string;
    title: string;
    category: string;
    participants: number;
  }>;
}

const dashboardData: DashboardData = {
  stats: [
    {
      title: "Всего пользователей",
      value: "1,234",
      change: 12,
      changeType: "increase" as const,
      description: "За последние 30 дней"
    },
    {
      title: "Активные студенты",
      value: "856",
      change: 8,
      changeType: "increase" as const,
      description: "За последние 30 дней"
    },
    {
      title: "Новые компании",
      value: "45",
      change: 5,
      changeType: "decrease" as const,
      description: "За последние 30 дней"
    },
    {
      title: "Конверсия",
      value: "24%",
      change: 2,
      changeType: "increase" as const,
      description: "За последние 30 дней"
    }
  ],
  skillsData: [
    { label: "JavaScript", value: 85 },
    { label: "React", value: 75 },
    { label: "Node.js", value: 65 },
    { label: "Python", value: 60 },
    { label: "SQL", value: 55 }
  ],
  popularEvents: [
    {
      id: "1",
      title: "Карьерный форум 2024",
      category: "Карьера",
      participants: 250
    },
    {
      id: "2",
      title: "IT-конференция",
      category: "Технологии",
      participants: 180
    },
    {
      id: "3",
      title: "Мастер-класс по soft skills",
      category: "Развитие",
      participants: 120
    }
  ],
  popularCourses: [
    {
      id: "1",
      title: "Web Development",
      category: "Программирование",
      participants: 350
    },
    {
      id: "2",
      title: "Data Science",
      category: "Аналитика",
      participants: 280
    },
    {
      id: "3",
      title: "UX/UI Design",
      category: "Дизайн",
      participants: 200
    }
  ],
  popularVacancies: [
    {
      id: "1",
      title: "Frontend Developer",
      category: "Разработка",
      participants: 150
    },
    {
      id: "2",
      title: "Business Analyst",
      category: "Аналитика",
      participants: 120
    },
    {
      id: "3",
      title: "Product Manager",
      category: "Менеджмент",
      participants: 100
    }
  ]
};

export default function AdminDashboard() {
  // Данные пользователей по ролям
  const usersByRole = [
    { role: "student", label: "Студенты", count: 3850, color: "bg-blue-500" },
    { role: "university", label: "Университеты", count: 45, color: "bg-indigo-500" },
    { role: "employer", label: "Работодатели", count: 215, color: "bg-purple-500" },
    { role: "mentor", label: "Менторы", count: 136, color: "bg-rose-500" },
    { role: "admin", label: "Администраторы", count: 12, color: "bg-green-500" },
  ];

  // Список пользователей
  const users = [
    {
      id: "1",
      name: "Алмас Сериков",
      email: "almas.serikov@example.com",
      role: "student",
      university: "КазНУ им. аль-Фараби",
      createdAt: "15 января 2023",
      status: "active",
    },
    {
      id: "2",
      name: "Kolesa Group",
      email: "hr@kolesa.kz",
      role: "employer",
      location: "Алматы",
      createdAt: "23 февраля 2023",
      status: "active",
    },
    {
      id: "3",
      name: "Арман Сагынбаев",
      email: "arman.sagynbaev@example.com",
      role: "mentor",
      specialization: "Frontend Development",
      createdAt: "10 марта 2023",
      status: "active",
    },
    {
      id: "4",
      name: "Казахский Национальный Университет",
      email: "admin@kaznu.kz",
      role: "university",
      location: "Алматы",
      createdAt: "5 декабря 2022",
      status: "active",
    },
    {
      id: "5",
      name: "Бакыт Нурланов",
      email: "bakyt.nurlanov@example.com",
      role: "student",
      university: "КБТУ",
      createdAt: "20 апреля 2023",
      status: "pending",
    },
  ];

  // Последние активности на платформе
  const recentActivities = [
    {
      id: "1",
      user: "Алмас Сериков",
      action: "записался на курс",
      object: "Node.js и Express: бэкенд-разработка",
      time: "5 минут назад",
    },
    {
      id: "2",
      user: "Kolesa Group",
      action: "создал вакансию",
      object: "Frontend Developer",
      time: "25 минут назад",
    },
    {
      id: "3",
      user: "Арман Сагынбаев",
      action: "провел сессию со студентом",
      object: "Алмас Сериков",
      time: "1 час назад",
    },
    {
      id: "4",
      user: "КазНУ им. аль-Фараби",
      action: "опубликовал мероприятие",
      object: "День открытых дверей IT-факультета",
      time: "3 часа назад",
    },
    {
      id: "5",
      user: "Бакыт Нурланов",
      action: "зарегистрировался на платформе",
      object: "",
      time: "5 часов назад",
    },
  ];

  // Список сообщений и уведомлений
  const notifications = [
    {
      id: "1",
      title: "Новый баг на странице регистрации",
      description: "Пользователи сообщают о проблеме при регистрации через Google",
      priority: "high",
      status: "unresolved",
      createdAt: "2 часа назад",
    },
    {
      id: "2",
      title: "Обновление сервера",
      description: "Плановое обновление сервера сегодня в 23:00",
      priority: "medium",
      status: "scheduled",
      createdAt: "5 часов назад",
    },
    {
      id: "3",
      title: "Новый запрос на верификацию университета",
      description: "КИМЭП запрашивает верификацию аккаунта",
      priority: "medium",
      status: "pending",
      createdAt: "1 день назад",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Панель администратора</h1>
          <p className="text-muted-foreground">
            Управление пользователями, контентом и системными настройками
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <BellAlertIcon className="h-4 w-4 mr-2" />
            Уведомления
            <Badge variant="destructive" className="ml-2">{notifications.length}</Badge>
          </Button>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Добавить пользователя
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.stats.map((stat, index) => {
            const { title, value, change, changeType, description } = stat;
            return (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="flex items-center mt-1">
                    {changeType === "increase" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm ${
                        changeType === "increase"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {change}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      {description}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Популярные навыки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChart
            title="Популярные навыки"
            subtitle="Топ-5 востребованных навыков"
            data={dashboardData.skillsData}
          />
          <PopularItemsTable
            title="Популярные мероприятия"
            items={dashboardData.popularEvents}
          />
        </div>

        {/* Популярные курсы и вакансии */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PopularItemsTable
            title="Популярные курсы"
            items={dashboardData.popularCourses}
          />
          <PopularItemsTable
            title="Популярные вакансии"
            items={dashboardData.popularVacancies}
          />
        </div>

        {/* Настройки */}
        <Card>
          <CardHeader>
            <CardTitle>Настройки платформы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Название сайта</Label>
                <Input id="siteName" defaultValue="NAVYK" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Домен</Label>
                <Input id="domain" defaultValue="navyk.kz" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Язык по умолчанию</Label>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Выберите язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="kk">Казахский</SelectItem>
                    <SelectItem value="en">Английский</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Выберите часовой пояс" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-almaty">Алматы (UTC+6)</SelectItem>
                    <SelectItem value="asia-astana">Астана (UTC+6)</SelectItem>
                    <SelectItem value="asia-aktau">Актау (UTC+5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 flex items-center relative">
              <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 text-muted-foreground" />
              <Input placeholder="Поиск пользователей..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все роли</SelectItem>
                  <SelectItem value="student">Студенты</SelectItem>
                  <SelectItem value="university">Университеты</SelectItem>
                  <SelectItem value="employer">Работодатели</SelectItem>
                  <SelectItem value="mentor">Менторы</SelectItem>
                  <SelectItem value="admin">Администраторы</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="active">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="pending">Ожидающие</SelectItem>
                  <SelectItem value="blocked">Заблокированные</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">Имя</th>
                    <th className="h-12 px-4 text-left font-medium">Email</th>
                    <th className="h-12 px-4 text-left font-medium">Роль</th>
                    <th className="h-12 px-4 text-left font-medium">Дата регистрации</th>
                    <th className="h-12 px-4 text-left font-medium">Статус</th>
                    <th className="h-12 px-4 text-left font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-4 align-middle">{user.name}</td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          user.role === "student" ? "default" :
                          user.role === "university" ? "secondary" :
                          user.role === "employer" ? "destructive" :
                          user.role === "mentor" ? "outline" :
                          "outline"
                        }>
                          {user.role === "student" ? "Студент" :
                           user.role === "university" ? "Университет" :
                           user.role === "employer" ? "Работодатель" :
                           user.role === "mentor" ? "Ментор" :
                           "Администратор"}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{user.createdAt}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={user.status === "active" ? "outline" : "secondary"} className={
                          user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                          user.status === "pending" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                          "bg-red-100 text-red-800 hover:bg-red-200"
                        }>
                          {user.status === "active" ? "Активен" :
                           user.status === "pending" ? "Ожидает" :
                           "Заблокирован"}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Профиль</Button>
                          <Button size="sm" variant="outline">Редактировать</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm">
              Предыдущая
            </Button>
            <Button variant="outline" size="sm">
              Следующая
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center">
                      <Badge className={
                        notification.priority === "high" ? "bg-red-100 text-red-800 mr-2" :
                        notification.priority === "medium" ? "bg-amber-100 text-amber-800 mr-2" :
                        "bg-blue-100 text-blue-800 mr-2"
                      }>
                        {notification.priority === "high" ? "Высокий" :
                         notification.priority === "medium" ? "Средний" :
                         "Низкий"}
                      </Badge>
                      {notification.title}
                    </CardTitle>
                    <CardDescription>{notification.createdAt}</CardDescription>
                  </div>
                  <Badge variant={
                    notification.status === "unresolved" ? "destructive" :
                    notification.status === "scheduled" ? "outline" :
                    "secondary"
                  }>
                    {notification.status === "unresolved" ? "Не решено" :
                     notification.status === "scheduled" ? "Запланировано" :
                     "В ожидании"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.description}</p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-2 ml-auto">
                  <Button size="sm" variant="outline">Отметить как решенное</Button>
                  <Button size="sm">Перейти</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
              <CardDescription>
                Управление параметрами безопасности платформы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twoFactor">Двухфакторная аутентификация</Label>
                  <Select defaultValue="optional">
                    <SelectTrigger id="twoFactor">
                      <SelectValue placeholder="Выберите опцию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Отключена</SelectItem>
                      <SelectItem value="optional">Опциональная</SelectItem>
                      <SelectItem value="required">Обязательная для всех</SelectItem>
                      <SelectItem value="admins">Обязательная для администраторов</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordPolicy">Политика паролей</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="passwordPolicy">
                      <SelectValue placeholder="Выберите политику" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Базовая (мин. 8 символов)</SelectItem>
                      <SelectItem value="medium">Средняя (мин. 10 символов, буквы и цифры)</SelectItem>
                      <SelectItem value="strong">Строгая (мин. 12 символов, буквы, цифры и спецсимволы)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Отменить</Button>
              <Button>Сохранить изменения</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}