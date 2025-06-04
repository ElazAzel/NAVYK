"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownCircleIcon, ArrowUpIcon, ArrowDownIcon, DocumentTextIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  description: string;
}

// Компонент для отображения статистики
const StatCard = ({ title, value, change, changeType, description }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <Badge variant={changeType === 'increase' ? 'success' : 'destructive'}>
          {changeType === 'increase' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
          {change}%
        </Badge>
      </div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </Card>
  );
};

interface ChartSectionProps {
  data: {
    labels: string[];
    values: number[];
  };
  title: string;
  subtitle: string;
}

// Компонент для отображения графика
const ChartSection = ({ data, title, subtitle }: ChartSectionProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex items-center space-x-2">
          <ExportDropdown />
        </div>
      </div>
      <div className="h-[300px] relative">
        {/* Здесь будет график */}
        <div className="flex justify-between">
          {data.labels.map((label: string, index: number) => (
            <div key={index} className="text-sm text-gray-500">{label}</div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {data.values.map((value: number, index: number) => (
            <div key={index} className="text-sm font-medium">{value}</div>
          ))}
        </div>
      </div>
    </Card>
  );
};

interface BarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  title: string;
  subtitle: string;
}

// Компонент для гистограммы
const BarChart = ({ data, title, subtitle }: BarChartProps) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <Card className="p-6 col-span-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <ExportDropdown />
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 font-medium">{item.value}</span>
                <span className="text-xs text-gray-500">({Math.round((item.value / maxValue) * 100)}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary rounded-full h-2.5 transition-all duration-500 ease-in-out"
                style={{
                  width: `${Math.max(5, (item.value / maxValue) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface PopularItem {
  id: string;
  title: string;
  category: string;
  participants: number;
  views?: number; // Количество просмотров
  interest?: number; // Процент заинтересованности
  date?: string; // Дата события/курса/вакансии
  status?: string; // Статус (активный, завершенный и т.д.)
}

interface PopularItemsTableProps {
  items: PopularItem[];
  title: string;
}

// Компонент для таблицы популярных курсов/мероприятий/вакансий
const PopularItemsTable = ({ items, title }: PopularItemsTableProps) => {
  // Определяем тип для правильного отображения заголовков
  const isVacancies = title === "Популярные вакансии";
  const isEvents = title === "Популярные мероприятия";
  const isCourses = title === "Популярные курсы";
  
  // Подготавливаем данные, добавляя недостающие поля
  const enhancedItems = items.map(item => ({
    ...item,
    views: item.views || Math.floor(item.participants * 1.5),
    interest: item.interest || Math.round((item.participants / 200) * 100)
  }));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {isVacancies && "Наиболее востребованные позиции"}
            {isEvents && "Мероприятия с наибольшим количеством участников"}
            {isCourses && "Курсы с наибольшим количеством студентов"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportDropdown />
          <Button variant="outline" size="sm" className="h-8">
            Подробная статистика
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Название</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Категория</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {isVacancies ? "Просмотры" : isEvents ? "Регистрации" : "Записи"}
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {isVacancies ? "Отклики" : isEvents ? "Участники" : "Активные студенты"}
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {isVacancies ? "Интерес" : isEvents ? "Популярность" : "Завершаемость"}
              </th>
            </tr>
          </thead>
          <tbody>
            {enhancedItems.map((item) => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-3 px-4 font-medium">{item.title}</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">{item.category}</Badge>
                </td>
                <td className="py-3 px-4 text-center">{item.views}</td>
                <td className="py-3 px-4 text-center">{item.participants}</td>
                <td className="py-3 px-4 text-right">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                        isVacancies ? "bg-primary" :
                        isEvents ? "bg-green-500" :
                        "bg-amber-500"
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, item.interest))}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{item.interest}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// Компонент для выпадающего меню экспорта
const ExportDropdown = () => {
  const handleExport = (format: string) => {
    // В реальном приложении здесь будет логика экспорта
    console.log(`Экспорт в ${format} формате`);
    
    // Имитация экспорта с уведомлением пользователя
    alert(`Данные успешно экспортированы в ${format} формате`);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <ArrowDownCircleIcon className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('Excel')}>
          <TableCellsIcon className="h-4 w-4 mr-2" />
          <span>Excel (.xlsx)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('PDF')}>
          <DocumentTextIcon className="h-4 w-4 mr-2" />
          <span>PDF для презентации</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface UniversityData {
  stats: Array<StatCardProps>;
  skillsData: Array<{
    label: string;
    value: number;
  }>;
  popularEvents: Array<PopularItem>;
  popularCourses: Array<PopularItem>;
}

interface EmployerData {
  stats: Array<StatCardProps>;
  skillsData: Array<{
    label: string;
    value: number;
  }>;
  popularVacancies: Array<PopularItem>;
}

type DataType = UniversityData | EmployerData;

export interface AnalyticsDashboardProps {
  userType: "university" | "employer";
  period: string;
  onPeriodChange: (period: string) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  userType,
  period,
  onPeriodChange,
}) => {
  // Пример данных для университета
  const universityData: UniversityData = {
    stats: [
      {
        title: "Активных студентов",
        value: "1,234",
        change: 12.3,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Записей на мероприятия",
        value: "2,845",
        change: 5.7,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Записей на курсы",
        value: "1,567",
        change: 2.1,
        changeType: "decrease" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Трудоустроено студентов",
        value: "87",
        change: 15.3,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
    ],
    skillsData: [
      { label: "Программирование на Python", value: 450 },
      { label: "Анализ данных", value: 380 },
      { label: "Web-разработка", value: 320 },
      { label: "Искусственный интеллект", value: 280 },
      { label: "Управление проектами", value: 220 },
    ],
    popularEvents: [
      {
        id: "1",
        title: "День карьеры",
        category: "Мероприятие",
        participants: 345,
      },
      {
        id: "2",
        title: "Хакатон по ИИ",
        category: "Соревнование",
        participants: 289,
      },
      {
        id: "3",
        title: "Мастер-класс по дизайну",
        category: "Мастер-класс",
        participants: 245,
      },
      {
        id: "4",
        title: "Лекция по машинному обучению",
        category: "Лекция",
        participants: 213,
      },
      {
        id: "5",
        title: "Встреча с работодателями",
        category: "Встреча",
        participants: 198,
      },
    ],
    popularCourses: [
      {
        id: "1",
        title: "Основы программирования на Python",
        category: "Программирование",
        participants: 412,
      },
      {
        id: "2",
        title: "Введение в анализ данных",
        category: "Аналитика",
        participants: 356,
      },
      {
        id: "3",
        title: "Web-разработка для начинающих",
        category: "Разработка",
        participants: 325,
      },
      {
        id: "4",
        title: "Машинное обучение на практике",
        category: "AI/ML",
        participants: 298,
      },
      {
        id: "5",
        title: "Soft skills для IT-специалистов",
        category: "Soft skills",
        participants: 267,
      },
    ],
  };

  // Пример данных для работодателя
  const employerData: EmployerData = {
    stats: [
      {
        title: "Просмотров вакансий",
        value: "3,421",
        change: 8.7,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Заинтересованных студентов",
        value: "546",
        change: 11.2,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Отправлено приглашений",
        value: "123",
        change: 3.5,
        changeType: "increase" as const,
        description: "По сравнению с предыдущим периодом",
      },
      {
        title: "Принято предложений",
        value: "42",
        change: 1.8,
        changeType: "decrease" as const,
        description: "По сравнению с предыдущим периодом",
      },
    ],
    skillsData: [
      { label: "Java разработка", value: 230 },
      { label: "Frontend (React)", value: 190 },
      { label: "DevOps", value: 150 },
      { label: "Data Science", value: 120 },
      { label: "Project Management", value: 90 },
    ],
    popularVacancies: [
      {
        id: "1",
        title: "Java Developer",
        category: "Разработка",
        participants: 187,
      },
      {
        id: "2",
        title: "React Frontend Developer",
        category: "Frontend",
        participants: 156,
      },
      {
        id: "3",
        title: "Data Scientist",
        category: "Аналитика",
        participants: 134,
      },
      {
        id: "4",
        title: "DevOps Engineer",
        category: "DevOps",
        participants: 115,
      },
      {
        id: "5",
        title: "Product Manager",
        category: "Management",
        participants: 98,
      },
    ],
  };

  // Выбор данных в зависимости от типа пользователя
  const data: DataType = userType === "university" ? universityData : employerData;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {userType === "university" ? "Аналитика университета" : "Аналитика компании"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {userType === "university"
              ? "Обзор активности студентов и популярности курсов и мероприятий"
              : "Обзор интереса к вакансиям и активности соискателей"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ExportDropdown />
          <Tabs
            defaultValue={period}
            className="w-[300px]"
            onValueChange={onPeriodChange}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
              <TabsTrigger value="year">Год</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.stats.map((stat, index) => (
          <StatCard 
            key={index} 
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            description={stat.description}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <BarChart
          data={data.skillsData}
          title="Популярные навыки"
          subtitle={
            userType === "university"
              ? "Наиболее востребованные навыки среди студентов"
              : "Наиболее востребованные навыки для ваших вакансий"
          }
        />
      </div>
      
      {userType === "university" && "popularEvents" in data && (
        <div className="mb-8">
          <PopularItemsTable
            items={data.popularEvents}
            title="Популярные мероприятия"
          />
        </div>
      )}
      
      {userType === "employer" && "popularVacancies" in data && (
        <div className="mb-8">
          <PopularItemsTable
            items={data.popularVacancies}
            title="Популярные вакансии"
          />
        </div>
      )}

      {userType === "university" && "popularCourses" in data && (
        <div className="mb-8">
          <PopularItemsTable
            items={data.popularCourses}
            title="Популярные курсы"
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
export { StatCard, ChartSection, BarChart, ExportDropdown }; 