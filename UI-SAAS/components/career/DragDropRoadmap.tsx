"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls, Reorder } from "framer-motion";
import { Check, Clock, Star, Award, Plus, Trash2, GripHorizontal, Calendar, BookOpen, Lightbulb, CheckCircle, ChevronRight, ArrowRight, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

// Типы для roadmap
interface Milestone {
  id: string;
  title: string;
  description: string;
  type: "course" | "skill" | "certification" | "job" | "project";
  duration?: string;
  deadline?: string;
  status: "completed" | "in-progress" | "planned" | "suggested";
  importance: number; // 1-5
  progress: number; // 0-100
  difficulty: number; // 1-5
  prerequisites?: string[];
  resources?: Array<{
    title: string;
    url: string;
  }>;
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  estimatedCompletion?: string;
  targetRole?: string;
  progress: number;
}

// Пример данных для roadmap
const exampleRoadmap: Roadmap = {
  id: "data-analyst-roadmap",
  title: "Путь до Data Analyst",
  description: "Развитие навыков для успешной карьеры аналитика данных",
  targetRole: "Middle Data Analyst",
  estimatedCompletion: "Декабрь 2023",
  progress: 35,
  milestones: [
    {
      id: "sql-basics",
      title: "Основы SQL",
      description: "Изучение основных запросов и работы с базами данных",
      type: "course",
      duration: "2 недели",
      status: "completed",
      importance: 5,
      progress: 100,
      difficulty: 2,
      resources: [
        {
          title: "SQL для начинающих",
          url: "https://example.com/sql-basics"
        }
      ]
    },
    {
      id: "python-basics",
      title: "Python для анализа данных",
      description: "Изучение Python и библиотек pandas, numpy, matplotlib",
      type: "course",
      duration: "4 недели",
      status: "in-progress",
      importance: 5,
      progress: 75,
      difficulty: 3,
      resources: [
        {
          title: "Python Data Science Handbook",
          url: "https://example.com/python-data-science"
        }
      ]
    },
    {
      id: "data-visualization",
      title: "Визуализация данных",
      description: "Создание информативных графиков и дашбордов",
      type: "skill",
      duration: "3 недели",
      status: "planned",
      importance: 4,
      progress: 0,
      difficulty: 3,
      prerequisites: ["python-basics"],
      resources: [
        {
          title: "Курс по Tableau",
          url: "https://example.com/tableau"
        }
      ]
    },
    {
      id: "statistics",
      title: "Статистика и анализ данных",
      description: "Изучение статистических методов анализа",
      type: "skill",
      duration: "5 недель",
      status: "planned",
      importance: 4,
      progress: 0,
      difficulty: 4,
      prerequisites: ["python-basics"],
      resources: [
        {
          title: "Статистика для анализа данных",
          url: "https://example.com/statistics"
        }
      ]
    },
    {
      id: "case-study",
      title: "Аналитический проект",
      description: "Анализ реальных данных и создание отчета",
      type: "project",
      duration: "3 недели",
      deadline: "15.11.2023",
      status: "planned",
      importance: 5,
      progress: 0,
      difficulty: 4,
      prerequisites: ["python-basics", "data-visualization", "statistics"]
    },
    {
      id: "sql-advanced",
      title: "Продвинутый SQL",
      description: "Оптимизация запросов, оконные функции, хранимые процедуры",
      type: "course",
      duration: "3 недели",
      status: "suggested",
      importance: 3,
      progress: 0,
      difficulty: 4,
      prerequisites: ["sql-basics"]
    },
    {
      id: "ml-basics",
      title: "Основы машинного обучения",
      description: "Линейная регрессия, классификация, кластеризация",
      type: "skill",
      duration: "6 недель",
      status: "suggested",
      importance: 3,
      progress: 0,
      difficulty: 5,
      prerequisites: ["python-basics", "statistics"]
    }
  ]
};

// Получить иконку для типа
const getTypeIcon = (type: string) => {
  switch (type) {
    case "course":
      return <BookOpen className="h-5 w-5" />;
    case "skill":
      return <Lightbulb className="h-5 w-5" />;
    case "certification":
      return <Award className="h-5 w-5" />;
    case "job":
      return <Briefcase className="h-5 w-5" />;
    case "project":
      return <Code className="h-5 w-5" />;
    default:
      return <Info className="h-5 w-5" />;
  }
};

// Получить цвет для типа
const getTypeColor = (type: string) => {
  switch (type) {
    case "course":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    case "skill":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "certification":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
    case "job":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    case "project":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  }
};

// Получить цвет для статуса
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500 text-white";
    case "in-progress":
      return "bg-blue-500 text-white";
    case "planned":
      return "bg-gray-500 text-white";
    case "suggested":
      return "bg-amber-500 text-white";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Получить текст для статуса
const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Завершено";
    case "in-progress":
      return "В процессе";
    case "planned":
      return "Запланировано";
    case "suggested":
      return "Рекомендуемое";
    default:
      return status;
  }
};

// Получить иконку для статуса
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "in-progress":
      return <Clock className="h-4 w-4" />;
    case "planned":
      return <Calendar className="h-4 w-4" />;
    case "suggested":
      return <Star className="h-4 w-4" />;
    default:
      return null;
  }
};

// Компонент для отображения звездочек важности
const ImportanceStars = ({ importance }: { importance: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < importance
              ? "text-amber-500 fill-amber-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default function DragDropRoadmap() {
  const [roadmap, setRoadmap] = useState<Roadmap>(exampleRoadmap);
  const [showTooltips, setShowTooltips] = useState(true);
  const [editMode, setEditMode] = useState(false);
  
  // Обработчик перетаскивания и сортировки
  const handleReorder = (newOrder: Milestone[]) => {
    setRoadmap({
      ...roadmap,
      milestones: newOrder
    });
  };
  
  // Обработчик изменения статуса
  const handleStatusChange = (id: string, newStatus: Milestone['status']) => {
    setRoadmap({
      ...roadmap,
      milestones: roadmap.milestones.map(milestone => 
        milestone.id === id 
          ? { 
              ...milestone, 
              status: newStatus,
              progress: newStatus === 'completed' ? 100 : 
                        newStatus === 'in-progress' ? 50 : 0
            } 
          : milestone
      )
    });
  };
  
  // Вычисление зависимостей
  const getDependencyGraph = () => {
    const dependencyMap: Record<string, string[]> = {};
    
    roadmap.milestones.forEach(milestone => {
      if (milestone.prerequisites && milestone.prerequisites.length > 0) {
        milestone.prerequisites.forEach(prereq => {
          if (!dependencyMap[prereq]) {
            dependencyMap[prereq] = [];
          }
          dependencyMap[prereq].push(milestone.id);
        });
      }
    });
    
    return dependencyMap;
  };
  
  // Получение зависимых элементов
  const dependencyGraph = getDependencyGraph();
  
  // Проверка возможности переключения статуса
  const canChangeStatus = (id: string, newStatus: string) => {
    // Если не "завершено" или "в процессе", всегда разрешаем
    if (newStatus !== "completed" && newStatus !== "in-progress") {
      return true;
    }
    
    const milestone = roadmap.milestones.find(m => m.id === id);
    if (!milestone?.prerequisites || milestone.prerequisites.length === 0) {
      return true;
    }
    
    // Проверяем, все ли необходимые prerequisites завершены
    return milestone.prerequisites.every(prereqId => {
      const prereq = roadmap.milestones.find(m => m.id === prereqId);
      return prereq?.status === "completed";
    });
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-1">{roadmap.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {roadmap.description}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1.5" 
            onClick={() => setShowTooltips(!showTooltips)}
          >
            <Info className="h-4 w-4" />
            {showTooltips ? "Скрыть подсказки" : "Показать подсказки"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1.5"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <Check className="h-4 w-4" />
                Готово
              </>
            ) : (
              <>
                <GripHorizontal className="h-4 w-4" />
                Редактировать
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Целевая роль
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold">{roadmap.targetRole}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Общий прогресс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xl font-semibold">{roadmap.progress}%</div>
              <Progress value={roadmap.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ожидаемое завершение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-semibold">{roadmap.estimatedCompletion}</div>
          </CardContent>
        </Card>
      </div>
      
      <TooltipProvider delayDuration={300}>
        <div className="space-y-8">
          <Reorder.Group axis="y" values={roadmap.milestones} onReorder={handleReorder} className="space-y-4">
            {roadmap.milestones.map((milestone) => (
              <Reorder.Item 
                key={milestone.id} 
                value={milestone}
                dragListener={editMode}
                className="focus:outline-none"
              >
                <motion.div 
                  layout 
                  transition={{
                    layout: { duration: 0.3 }
                  }}
                  className="relative"
                >
                  <div 
                    className={`
                      absolute -left-3 h-full w-1 rounded-full
                      ${milestone.status === "completed" ? "bg-green-500" : 
                        milestone.status === "in-progress" ? "bg-blue-500" : 
                        milestone.status === "suggested" ? "bg-amber-500" : "bg-gray-300 dark:bg-gray-700"}
                    `}
                  />
                  
                  <Card className={`
                    ${editMode ? "border-dashed cursor-move" : ""}
                    ${milestone.status === "completed" ? "border-green-200 dark:border-green-900/50" :
                      milestone.status === "in-progress" ? "border-blue-200 dark:border-blue-900/50" : ""}
                  `}>
                    {editMode && (
                      <div className="absolute top-3 -left-6 p-1 bg-gray-100 dark:bg-gray-800 border rounded-full shadow-sm">
                        <GripHorizontal className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                    
                    <CardHeader className="pb-2 relative">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className={`p-1.5 rounded-md ${getTypeColor(milestone.type)}`}>
                            {getTypeIcon(milestone.type)}
                          </div>
                          <CardTitle className="text-lg">
                            {milestone.title}
                          </CardTitle>
                        </div>
                        <Badge className={`${getStatusColor(milestone.status)} flex items-center gap-1`}>
                          {getStatusIcon(milestone.status)}
                          {getStatusText(milestone.status)}
                        </Badge>
                      </div>
                      
                      <CardDescription>
                        {milestone.type === "course" && "Курс"}
                        {milestone.type === "skill" && "Навык"}
                        {milestone.type === "certification" && "Сертификация"}
                        {milestone.type === "job" && "Работа"}
                        {milestone.type === "project" && "Проект"}
                        
                        {milestone.duration && ` • ${milestone.duration}`}
                        {milestone.deadline && ` • Дедлайн: ${milestone.deadline}`}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {milestone.description}
                      </p>
                      
                      <div className="flex flex-wrap justify-between gap-4 mb-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Важность</span>
                          <ImportanceStars importance={milestone.importance} />
                        </div>
                        
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Сложность</span>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full ${
                                  i < milestone.difficulty
                                    ? "bg-indigo-500"
                                    : "bg-gray-200 dark:bg-gray-700"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {milestone.status !== "completed" && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Прогресс</span>
                            <div className="flex items-center gap-2">
                              <Progress value={milestone.progress} className="h-2 w-24" />
                              <span className="text-sm font-medium">{milestone.progress}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {milestone.prerequisites && milestone.prerequisites.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                            Требуемые навыки:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {milestone.prerequisites.map(prereqId => {
                              const prereq = roadmap.milestones.find(m => m.id === prereqId);
                              if (!prereq) return null;
                              
                              return (
                                <Tooltip key={prereqId}>
                                  <TooltipTrigger asChild>
                                    <Badge 
                                      variant="outline" 
                                      className={`
                                        ${prereq.status === "completed" ? "border-green-300 dark:border-green-700" : ""}
                                      `}
                                    >
                                      {prereq.status === "completed" && (
                                        <Check className="h-3 w-3 text-green-500 mr-1" />
                                      )}
                                      {prereq.title}
                                    </Badge>
                                  </TooltipTrigger>
                                  {showTooltips && (
                                    <TooltipContent side="top">
                                      <p className="font-medium">{prereq.title}</p>
                                      <p className="text-sm">Статус: {getStatusText(prereq.status)}</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {dependencyGraph[milestone.id] && dependencyGraph[milestone.id].length > 0 && (
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                            Необходимо для:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {dependencyGraph[milestone.id].map(depId => {
                              const dep = roadmap.milestones.find(m => m.id === depId);
                              if (!dep) return null;
                              
                              return (
                                <Tooltip key={depId}>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline">
                                      <ArrowRight className="h-3 w-3 mr-1" />
                                      {dep.title}
                                    </Badge>
                                  </TooltipTrigger>
                                  {showTooltips && (
                                    <TooltipContent side="top">
                                      <p className="font-medium">{dep.title}</p>
                                      <p className="text-sm">Тип: {dep.type}</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    <CardFooter className="pt-2 flex gap-2">
                      {milestone.status !== "completed" && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="default" 
                              size="sm"
                              disabled={!canChangeStatus(milestone.id, "completed")}
                              onClick={() => handleStatusChange(milestone.id, "completed")}
                              className="flex items-center gap-1"
                            >
                              <Check className="h-4 w-4" />
                              Завершить
                            </Button>
                          </TooltipTrigger>
                          {showTooltips && !canChangeStatus(milestone.id, "completed") && (
                            <TooltipContent side="bottom">
                              Сначала необходимо завершить все предварительные требования
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )}
                      
                      {milestone.status !== "in-progress" && milestone.status !== "completed" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={!canChangeStatus(milestone.id, "in-progress")}
                          onClick={() => handleStatusChange(milestone.id, "in-progress")}
                          className="flex items-center gap-1"
                        >
                          <Clock className="h-4 w-4" />
                          Начать
                        </Button>
                      )}
                      
                      {milestone.status === "completed" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(milestone.id, "in-progress")}
                          className="flex items-center gap-1"
                        >
                          Отметить как незавершенное
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          
          {editMode && (
            <Button variant="outline" className="w-full border-dashed flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              Добавить новый элемент
            </Button>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}

// Иконка для типа "job" (не объявлено выше)
function Briefcase({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}

// Иконка для типа "project" (не объявлено выше)
function Code({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
} 