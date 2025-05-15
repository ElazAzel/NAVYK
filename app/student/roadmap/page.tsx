"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  ChevronRight,
  Star,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Users,
  Code,
  Lightbulb,
  ArrowRight,
  LucideIcon,
  LucideProps
} from "lucide-react";
import PageLayout from "@/app/components/PageLayout";

// Типы данных
interface Skill {
  id: string;
  name: string;
  category: "technical" | "soft" | "language";
  level: number; // 0-100
  requiredLevel?: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  icon: LucideIcon;
  skills: Skill[];
  date?: string;
}

interface RoadmapStage {
  id: string;
  title: string;
  description: string;
  currentStage: boolean;
  isCompleted: boolean;
  progress: number;
  milestones: Milestone[];
}

interface RecommendedActivity {
  id: string;
  title: string;
  type: "course" | "event" | "project" | "internship";
  description: string;
  skills: string[];
  date?: string;
  priority: "high" | "medium" | "low";
  url?: string;
}

// Мок-данные
const studentSkills: Skill[] = [
  { id: "s1", name: "JavaScript", category: "technical", level: 70 },
  { id: "s2", name: "React", category: "technical", level: 60 },
  { id: "s3", name: "Node.js", category: "technical", level: 45 },
  { id: "s4", name: "TypeScript", category: "technical", level: 35 },
  { id: "s5", name: "Командная работа", category: "soft", level: 75 },
  { id: "s6", name: "Коммуникация", category: "soft", level: 80 },
  { id: "s7", name: "Английский язык", category: "language", level: 65 },
  { id: "s8", name: "Презентационные навыки", category: "soft", level: 55 },
  { id: "s9", name: "Git", category: "technical", level: 65 },
  { id: "s10", name: "SQL", category: "technical", level: 40 }
];

const roadmapData: RoadmapStage[] = [
  {
    id: "stage1",
    title: "Основные технические навыки",
    description: "Формирование фундаментальных технических навыков и знаний",
    currentStage: false,
    isCompleted: true,
    progress: 100,
    milestones: [
      {
        id: "m1",
        title: "Основы программирования",
        description: "Изучение основ алгоритмов и структур данных",
        isCompleted: true,
        icon: Code,
        skills: [
          { id: "ms1", name: "Алгоритмы", category: "technical", level: 70 },
          { id: "ms2", name: "Структуры данных", category: "technical", level: 65 }
        ]
      },
      {
        id: "m2",
        title: "Введение в веб-разработку",
        description: "Изучение HTML, CSS и JavaScript",
        isCompleted: true,
        icon: BookOpen,
        skills: [
          { id: "ms3", name: "HTML", category: "technical", level: 85 },
          { id: "ms4", name: "CSS", category: "technical", level: 80 },
          { id: "ms5", name: "JavaScript", category: "technical", level: 70 }
        ]
      }
    ]
  },
  {
    id: "stage2",
    title: "Разработка веб-приложений",
    description: "Создание полноценных веб-приложений с использованием современных фреймворков и инструментов",
    currentStage: true,
    isCompleted: false,
    progress: 65,
    milestones: [
      {
        id: "m3",
        title: "Frontend-разработка",
        description: "Изучение React и связанных технологий",
        isCompleted: true,
        icon: Code,
        skills: [
          { id: "ms6", name: "React", category: "technical", level: 60 },
          { id: "ms7", name: "Redux", category: "technical", level: 40 }
        ]
      },
      {
        id: "m4",
        title: "Backend-разработка",
        description: "Изучение Node.js и баз данных",
        isCompleted: false,
        icon: Code,
        skills: [
          { id: "ms8", name: "Node.js", category: "technical", level: 45, requiredLevel: 60 },
          { id: "ms9", name: "SQL", category: "technical", level: 40, requiredLevel: 55 }
        ]
      },
      {
        id: "m5",
        title: "Проект веб-приложения",
        description: "Разработка полноценного веб-приложения",
        isCompleted: false,
        icon: Lightbulb,
        skills: [
          { id: "ms10", name: "Git", category: "technical", level: 65 },
          { id: "ms11", name: "Командная работа", category: "soft", level: 75 }
        ]
      }
    ]
  },
  {
    id: "stage3",
    title: "Профессиональное развитие",
    description: "Подготовка к карьере и трудоустройству",
    currentStage: false,
    isCompleted: false,
    progress: 10,
    milestones: [
      {
        id: "m6",
        title: "Стажировка",
        description: "Прохождение стажировки в технологической компании",
        isCompleted: false,
        icon: Briefcase,
        skills: [
          { id: "ms12", name: "TypeScript", category: "technical", level: 35, requiredLevel: 50 },
          { id: "ms13", name: "Английский язык", category: "language", level: 65, requiredLevel: 70 }
        ]
      },
      {
        id: "m7",
        title: "Дипломный проект",
        description: "Разработка и защита дипломного проекта",
        isCompleted: false,
        icon: Award,
        skills: [
          { id: "ms14", name: "Презентационные навыки", category: "soft", level: 55, requiredLevel: 70 },
          { id: "ms15", name: "Управление проектами", category: "soft", level: 40, requiredLevel: 60 }
        ]
      }
    ]
  }
];

const recommendedActivities: RecommendedActivity[] = [
  {
    id: "ra1",
    title: "Курс по TypeScript",
    type: "course",
    description: "Изучите основы TypeScript для улучшения качества кода",
    skills: ["TypeScript", "JavaScript"],
    priority: "high",
    url: "/student/courses/ts-fundamentals"
  },
  {
    id: "ra2",
    title: "Хакатон по разработке веб-приложений",
    type: "event",
    description: "Командное соревнование по разработке веб-приложений",
    skills: ["React", "Node.js", "Командная работа"],
    date: "2023-05-15",
    priority: "medium",
    url: "/student/events/webdev-hackathon"
  },
  {
    id: "ra3",
    title: "Стажировка в ИТ-компании",
    type: "internship",
    description: "Пройдите стажировку для получения практического опыта",
    skills: ["JavaScript", "React", "SQL", "Английский язык"],
    date: "2023-06-01",
    priority: "high",
    url: "/student/jobs/intern-positions"
  },
  {
    id: "ra4",
    title: "Проект по разработке API",
    type: "project",
    description: "Разработайте API с использованием Node.js и Express",
    skills: ["Node.js", "API", "JavaScript"],
    priority: "medium",
    url: "/student/projects/recommended"
  }
];

// Вспомогательные функции
const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'high':
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Высокий приоритет</Badge>;
    case 'medium':
      return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Средний приоритет</Badge>;
    case 'low':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Низкий приоритет</Badge>;
    default:
      return null;
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'course':
      return <BookOpen className="h-10 w-10 text-blue-500" />;
    case 'event':
      return <Calendar className="h-10 w-10 text-purple-500" />;
    case 'project':
      return <Code className="h-10 w-10 text-emerald-500" />;
    case 'internship':
      return <Briefcase className="h-10 w-10 text-amber-500" />;
    default:
      return <Star className="h-10 w-10 text-gray-500" />;
  }
};

const getActivityTypeName = (type: string) => {
  switch (type) {
    case 'course':
      return "Курс";
    case 'event':
      return "Мероприятие";
    case 'project':
      return "Проект";
    case 'internship':
      return "Стажировка";
    default:
      return "Активность";
  }
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

export default function RoadmapPage() {
  const [currentStageIndex, setCurrentStageIndex] = useState(
    roadmapData.findIndex(stage => stage.currentStage)
  );
  
  // Общий прогресс по дорожной карте
  const totalProgress = 
    roadmapData.reduce((sum, stage) => sum + stage.progress, 0) / roadmapData.length;
  
  return (
    <PageLayout>
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Карьерная дорожная карта</h1>
          <p className="text-muted-foreground">
            Персонализированный план вашего профессионального развития
          </p>
        </div>
        
        {/* Общий прогресс */}
        <motion.div variants={item} className="w-full">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-semibold">Общий прогресс</h2>
                    <p className="text-muted-foreground text-sm">
                      Ваш текущий этап: {roadmapData[currentStageIndex].title}
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {Math.round(totalProgress)}% завершено
                  </Badge>
                </div>
                
                <Progress value={totalProgress} className="h-2" />
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {roadmapData.map((stage, index) => (
                    <div 
                      key={stage.id} 
                      className={`flex items-center gap-1 ${
                        index === currentStageIndex ? 'text-primary font-medium' : 
                        index < currentStageIndex ? 'text-green-600' : 'text-muted-foreground'
                      }`}
                    >
                      <div 
                        className={`h-3 w-3 rounded-full ${
                          stage.isCompleted ? 'bg-green-500' : 
                          stage.currentStage ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      ></div>
                      <span className="text-sm">{stage.title}</span>
                      {index < roadmapData.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Текущий этап */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>{roadmapData[currentStageIndex].title}</CardTitle>
              <CardDescription>
                {roadmapData[currentStageIndex].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Прогресс этапа</p>
                <Badge variant="outline">
                  {roadmapData[currentStageIndex].progress}%
                </Badge>
              </div>
              
              <Progress 
                value={roadmapData[currentStageIndex].progress} 
                className="h-2" 
              />
              
              {/* Вехи текущего этапа */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Ключевые вехи</h3>
                
                <div className="space-y-6">
                  {roadmapData[currentStageIndex].milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    
                    return (
                      <div 
                        key={milestone.id} 
                        className={`flex ${
                          milestone.isCompleted ? 'opacity-60' : ''
                        }`}
                      >
                        <div className="mr-4 flex flex-col items-center">
                          <div className={`flex h-10 w-10 rounded-full items-center justify-center ${
                            milestone.isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {index < roadmapData[currentStageIndex].milestones.length - 1 && (
                            <div className="h-full w-0.5 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 pt-1.5 pb-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                            <h4 className="font-medium">
                              {milestone.title}
                              {milestone.isCompleted && (
                                <span className="ml-2 text-green-600 text-sm">✓ Завершено</span>
                              )}
                            </h4>
                            
                            {milestone.date && (
                              <p className="text-sm text-muted-foreground">
                                {new Date(milestone.date).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            {milestone.description}
                          </p>
                          
                          <div className="space-y-3">
                            <p className="text-sm">Требуемые навыки:</p>
                            <div className="space-y-2">
                              {milestone.skills.map(skill => {
                                const studentSkill = studentSkills.find(s => s.name === skill.name);
                                const level = studentSkill ? studentSkill.level : 0;
                                const requiredLevel = skill.requiredLevel || 100;
                                const completed = level >= requiredLevel;
                                
                                return (
                                  <div key={skill.id} className="space-y-1">
                                    <div className="flex justify-between">
                                      <p className="text-sm">{skill.name}</p>
                                      <p className={`text-sm ${completed ? 'text-green-600' : 'text-amber-600'}`}>
                                        {level}% / {requiredLevel}%
                                      </p>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${completed ? 'bg-green-500' : 'bg-amber-500'}`}
                                        style={{ width: `${level}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Рекомендации */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Рекомендуемые активности</CardTitle>
              <CardDescription>
                Мероприятия, курсы и проекты для развития требуемых навыков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedActivities.map(activity => (
                  <div 
                    key={activity.id} 
                    className="flex border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {getActivityTypeName(activity.type)}
                          </Badge>
                          <h4 className="font-medium">{activity.title}</h4>
                        </div>
                        {getPriorityBadge(activity.priority)}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {activity.description}
                      </p>
                      
                      {activity.date && (
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(activity.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {activity.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="font-normal">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={activity.url || "#"}>
                          <span>Подробнее</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Показать больше рекомендаций</Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Навыки */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Мои навыки</CardTitle>
              <CardDescription>
                Текущий уровень развития профессиональных навыков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Технические навыки</h3>
                  <div className="space-y-3">
                    {studentSkills
                      .filter(skill => skill.category === "technical")
                      .map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm">{skill.name}</p>
                            <p className="text-sm">{skill.level}%</p>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                skill.level < 40 ? 'bg-red-500' : 
                                skill.level < 70 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Софт-скиллы</h3>
                  <div className="space-y-3">
                    {studentSkills
                      .filter(skill => skill.category === "soft")
                      .map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm">{skill.name}</p>
                            <p className="text-sm">{skill.level}%</p>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                skill.level < 40 ? 'bg-red-500' : 
                                skill.level < 70 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Языки</h3>
                  <div className="space-y-3">
                    {studentSkills
                      .filter(skill => skill.category === "language")
                      .map(skill => (
                        <div key={skill.id} className="space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm">{skill.name}</p>
                            <p className="text-sm">{skill.level}%</p>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                skill.level < 40 ? 'bg-red-500' : 
                                skill.level < 70 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button>Пройти оценку навыков</Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
} 