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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Mail, 
  MoreHorizontal,
  ChevronDown,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  GraduationCap
} from "lucide-react";

// Типы данных
interface Student {
  id: string;
  name: string;
  avatarUrl: string | null;
  email: string;
  faculty: string;
  specialization: string;
  year: number;
  status: "active" | "pending" | "graduated" | "academic_leave";
  progress: number;
  lastActive: string;
  enrollmentDate: string;
}

// Мок-данные для студентов
const studentsData: Student[] = [
  {
    id: "1",
    name: "Алмас Сериков",
    avatarUrl: "/avatars/student1.jpg",
    email: "almas.serikov@example.com",
    faculty: "Информационные технологии",
    specialization: "Компьютерные науки",
    year: 3,
    status: "active",
    progress: 78,
    lastActive: "2023-04-01T10:30:00Z",
    enrollmentDate: "2021-09-01"
  },
  {
    id: "2",
    name: "Елена Петрова",
    avatarUrl: null,
    email: "elena.petrova@example.com",
    faculty: "Информационные технологии",
    specialization: "Информационные системы",
    year: 2,
    status: "active",
    progress: 65,
    lastActive: "2023-04-02T14:15:00Z",
    enrollmentDate: "2022-09-01"
  },
  {
    id: "3",
    name: "Дамир Нугманов",
    avatarUrl: null,
    email: "damir.nugmanov@example.com",
    faculty: "Информационные технологии",
    specialization: "Кибербезопасность",
    year: 4,
    status: "active",
    progress: 92,
    lastActive: "2023-04-03T09:45:00Z",
    enrollmentDate: "2020-09-01"
  },
  {
    id: "4",
    name: "Айгерим Сатпаева",
    avatarUrl: null,
    email: "aigerim.satpaeva@example.com",
    faculty: "Бизнес и экономика",
    specialization: "Финансы",
    year: 3,
    status: "active",
    progress: 81,
    lastActive: "2023-04-02T11:20:00Z",
    enrollmentDate: "2021-09-01"
  },
  {
    id: "5",
    name: "Тимур Ахметов",
    avatarUrl: null,
    email: "timur.akhmetov@example.com",
    faculty: "Инженерия",
    specialization: "Машиностроение",
    year: 4,
    status: "pending",
    progress: 55,
    lastActive: "2023-03-28T16:10:00Z",
    enrollmentDate: "2020-09-01"
  },
  {
    id: "6",
    name: "Динара Казиева",
    avatarUrl: null,
    email: "dinara.kazieva@example.com",
    faculty: "Естественные науки",
    specialization: "Биология",
    year: 1,
    status: "active",
    progress: 68,
    lastActive: "2023-04-03T13:40:00Z",
    enrollmentDate: "2023-09-01"
  },
  {
    id: "7",
    name: "Нурлан Сагинтаев",
    avatarUrl: null,
    email: "nurlan.sagintaev@example.com",
    faculty: "Информационные технологии",
    specialization: "Искусственный интеллект",
    year: 2,
    status: "academic_leave",
    progress: 45,
    lastActive: "2023-02-15T10:30:00Z",
    enrollmentDate: "2022-09-01"
  },
  {
    id: "8",
    name: "Карина Исмаилова",
    avatarUrl: null,
    email: "karina.ismailova@example.com",
    faculty: "Социальные науки",
    specialization: "Психология",
    year: 4,
    status: "graduated",
    progress: 100,
    lastActive: "2023-03-30T09:15:00Z",
    enrollmentDate: "2020-09-01"
  }
];

// Вспомогательные функции
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Активный</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">Ожидание</Badge>;
    case 'graduated':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Выпускник</Badge>;
    case 'academic_leave':
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">Академический отпуск</Badge>;
    default:
      return <Badge>Неизвестно</Badge>;
  }
};

const getProgressColor = (progress: number): string => {
  if (progress < 40) return "bg-red-500";
  if (progress < 70) return "bg-yellow-500";
  return "bg-green-500";
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

export default function UniversityStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [facultyFilter, setFacultyFilter] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Статистика
  const stats = {
    totalStudents: studentsData.length,
    activeStudents: studentsData.filter(s => s.status === 'active').length,
    averageProgress: Math.round(studentsData.reduce((acc, student) => acc + student.progress, 0) / studentsData.length),
    byFaculty: {
      "Информационные технологии": studentsData.filter(s => s.faculty === 'Информационные технологии').length,
      "Бизнес и экономика": studentsData.filter(s => s.faculty === 'Бизнес и экономика').length,
      "Инженерия": studentsData.filter(s => s.faculty === 'Инженерия').length,
      "Естественные науки": studentsData.filter(s => s.faculty === 'Естественные науки').length,
      "Социальные науки": studentsData.filter(s => s.faculty === 'Социальные науки').length
    }
  };
  
  // Фильтрация студентов
  const filteredStudents = studentsData.filter(student => {
    // Поиск по имени и email
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Фильтр по факультету
    const matchesFaculty = !facultyFilter || student.faculty === facultyFilter;
    
    // Фильтр по году обучения
    const matchesYear = !yearFilter || student.year === yearFilter;
    
    // Фильтр по статусу
    const matchesStatus = !statusFilter || student.status === statusFilter;
    
    return matchesSearch && matchesFaculty && matchesYear && matchesStatus;
  });
  
  // Уникальные факультеты для фильтра
  const faculties = Array.from(new Set(studentsData.map(s => s.faculty)));
  
  // Уникальные годы обучения для фильтра
  const years = Array.from(new Set(studentsData.map(s => s.year))).sort();
  
  return (
    <RoleLayout pageTitle="Управление студентами">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Статистика */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
              <p className="text-sm opacity-90">Всего студентов</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <p className="text-2xl font-bold">{stats.activeStudents}</p>
              <p className="text-sm opacity-90">Активных студентов</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <p className="text-2xl font-bold">{stats.averageProgress}%</p>
              <p className="text-sm opacity-90">Средний прогресс</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <p className="text-2xl font-bold">{faculties.length}</p>
              <p className="text-sm opacity-90">Факультетов</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Таблица студентов */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>Студенты</CardTitle>
                  <CardDescription>
                    Управляйте студентами, отслеживайте прогресс и просматривайте аналитику
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Экспорт</span>
                  </Button>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Добавить студента</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Поиск и фильтры */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск студентов..."
                    className="w-full pl-10 pr-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {/* Фильтр по факультету */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setFacultyFilter(null)}
                    >
                      <Filter className="h-4 w-4" />
                      <span>{facultyFilter || "Все факультеты"}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                    <div className="absolute z-10 mt-1 w-56 right-0 bg-background border rounded-md shadow-md p-1 hidden group-focus-within:block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setFacultyFilter(null)}
                      >
                        Все факультеты
                      </Button>
                      {faculties.map((faculty) => (
                        <Button
                          key={faculty}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setFacultyFilter(faculty)}
                        >
                          {faculty}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Фильтр по году обучения */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setYearFilter(null)}
                    >
                      <span>{yearFilter ? `${yearFilter} курс` : "Все курсы"}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                    <div className="absolute z-10 mt-1 w-40 right-0 bg-background border rounded-md shadow-md p-1 hidden group-focus-within:block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setYearFilter(null)}
                      >
                        Все курсы
                      </Button>
                      {years.map((year) => (
                        <Button
                          key={year}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setYearFilter(year)}
                        >
                          {year} курс
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Фильтр по статусу */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => setStatusFilter(null)}
                    >
                      <span>
                        {statusFilter === 'active' ? 'Активные' :
                         statusFilter === 'pending' ? 'Ожидающие' :
                         statusFilter === 'graduated' ? 'Выпускники' :
                         statusFilter === 'academic_leave' ? 'Акад. отпуск' :
                         'Все статусы'}
                      </span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                    <div className="absolute z-10 mt-1 w-40 right-0 bg-background border rounded-md shadow-md p-1 hidden group-focus-within:block">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setStatusFilter(null)}
                      >
                        Все статусы
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setStatusFilter('active')}
                      >
                        Активные
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setStatusFilter('pending')}
                      >
                        Ожидающие
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setStatusFilter('graduated')}
                      >
                        Выпускники
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setStatusFilter('academic_leave')}
                      >
                        Акад. отпуск
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Таблица студентов */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">
                        <div className="flex items-center gap-1">
                          <span>Студент</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-left font-medium hidden sm:table-cell">
                        <div className="flex items-center gap-1">
                          <span>Факультет / Специальность</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </th>
                      <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Курс</th>
                      <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Статус</th>
                      <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Прогресс</th>
                      <th className="py-3 px-4 text-left font-medium hidden lg:table-cell">Последняя активность</th>
                      <th className="py-3 px-4 text-center font-medium">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr 
                        key={student.id} 
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={student.avatarUrl || undefined} alt={student.name} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-xs text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden sm:table-cell">
                          <p className="text-sm">{student.faculty}</p>
                          <p className="text-xs text-muted-foreground">{student.specialization}</p>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className="text-sm">{student.year} курс</span>
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getProgressColor(student.progress)}`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs whitespace-nowrap">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(student.lastActive)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={`/university/students/${student.id}`}>
                                <ChevronRight className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredStudents.length === 0 && (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Студенты не найдены</h3>
                    <p className="text-muted-foreground">
                      {searchQuery || facultyFilter || yearFilter || statusFilter ? 
                        "Попробуйте изменить параметры поиска" : 
                        "В системе нет зарегистрированных студентов"}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Пагинация */}
              {filteredStudents.length > 0 && (
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Показано {filteredStudents.length} из {studentsData.length} студентов
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>
                      Предыдущая
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Следующая
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Дополнительные метрики */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Аналитика по факультетам</CardTitle>
              <CardDescription>
                Распределение студентов по факультетам и прогресс обучения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Статистика по факультетам */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Распределение студентов</h3>
                  <div className="space-y-4">
                    {Object.entries(stats.byFaculty).map(([faculty, count]) => (
                      <div key={faculty}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{faculty}</span>
                          <span className="text-sm">{count} студентов</span>
                        </div>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${(count / stats.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Статистика по статусам */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Статусы студентов</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold">
                        {studentsData.filter(s => s.status === 'active').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Активные</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold">
                        {studentsData.filter(s => s.status === 'pending').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Ожидающие</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold">
                        {studentsData.filter(s => s.status === 'graduated').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Выпускники</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg text-center">
                      <div className="flex justify-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold">
                        {studentsData.filter(s => s.status === 'academic_leave').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Акад. отпуск</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </RoleLayout>
  );
} 