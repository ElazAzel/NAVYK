"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { motion } from "framer-motion";
import { 
  Trophy, Medal, Star, Award, BookOpen, Calendar, 
  CheckCircle2, Target, Zap, Share2, Download, Gift
} from "lucide-react";

// Типы для достижений и бейджей
interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: "trophy" | "medal" | "star" | "award" | "book" | "target" | "zap" | "gift";
  date: string;
  points: number;
  category: "academics" | "career" | "skills" | "participation" | "special";
}

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: "trophy" | "medal" | "star" | "award" | "book" | "target" | "zap" | "gift";
  isUnlocked: boolean;
  category: "bronze" | "silver" | "gold" | "platinum" | "special";
  progress?: number; // если не разблокирован (0-100)
  requiredPoints?: number;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  requiredPoints: number;
  reward: string;
  isAchieved: boolean;
}

interface Stats {
  totalPoints: number;
  totalAchievements: number;
  totalBadges: number;
  level: number;
  nextLevelPoints: number;
  progressToNextLevel: number;
  streak: number;
  rank: string;
}

export default function AchievementsPage() {
  // Статистика пользователя
  const userStats: Stats = {
    totalPoints: 2750,
    totalAchievements: 18,
    totalBadges: 7,
    level: 5,
    nextLevelPoints: 3000,
    progressToNextLevel: 75,
    streak: 12,
    rank: "Продвинутый студент"
  };
  
  // Достижения пользователя
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Первые шаги",
      description: "Завершен первый курс на платформе",
      icon: "trophy",
      date: "2023-01-15",
      points: 100,
      category: "academics"
    },
    {
      id: 2,
      title: "Активный участник",
      description: "Посещено 5 мероприятий",
      icon: "medal",
      date: "2023-02-20",
      points: 150,
      category: "participation"
    },
    {
      id: 3,
      title: "JavaScript мастер",
      description: "Завершен продвинутый курс по JavaScript с отличной оценкой",
      icon: "award",
      date: "2023-03-10",
      points: 300,
      category: "skills"
    },
    {
      id: 4,
      title: "Сетевик",
      description: "Установлено 10 профессиональных контактов",
      icon: "star",
      date: "2023-03-25",
      points: 200,
      category: "career"
    },
    {
      id: 5,
      title: "Первая стажировка",
      description: "Получено первое предложение о стажировке",
      icon: "zap",
      date: "2023-04-05",
      points: 500,
      category: "career"
    },
    {
      id: 6,
      title: "React разработчик",
      description: "Создан и защищен проект на React",
      icon: "book",
      date: "2023-04-20",
      points: 400,
      category: "skills"
    },
    {
      id: 7,
      title: "Хакатон финалист",
      description: "Финалист университетского хакатона",
      icon: "trophy",
      date: "2023-05-01",
      points: 500,
      category: "special"
    },
    {
      id: 8,
      title: "Неделя без пропусков",
      description: "Выполнено задание каждый день в течение недели",
      icon: "target",
      date: "2023-05-15",
      points: 100,
      category: "participation"
    }
  ];
  
  // Бейджи пользователя
  const badges: Badge[] = [
    {
      id: 1,
      title: "Студент-новичок",
      description: "Получите свои первые 500 очков",
      icon: "trophy",
      isUnlocked: true,
      category: "bronze"
    },
    {
      id: 2,
      title: "Любознательный ученик",
      description: "Завершите 3 курса разных категорий",
      icon: "book",
      isUnlocked: true,
      category: "bronze"
    },
    {
      id: 3,
      title: "Нетворкер",
      description: "Посетите 10 мероприятий",
      icon: "star",
      isUnlocked: true,
      category: "silver"
    },
    {
      id: 4,
      title: "Мастер кода",
      description: "Завершите 5 курсов по программированию",
      icon: "award",
      isUnlocked: true,
      category: "silver"
    },
    {
      id: 5,
      title: "Карьерный рост",
      description: "Получите предложение о стажировке или работе",
      icon: "zap",
      isUnlocked: true,
      category: "gold"
    },
    {
      id: 6,
      title: "Путь к совершенству",
      description: "Достигните 5 уровня на платформе",
      icon: "target",
      isUnlocked: true,
      category: "gold"
    },
    {
      id: 7,
      title: "Хакатон победитель",
      description: "Займите призовое место на хакатоне",
      icon: "medal",
      isUnlocked: true,
      category: "special"
    },
    {
      id: 8,
      title: "Звезда кампуса",
      description: "Будьте в топ-10 рейтинга студентов",
      icon: "star",
      isUnlocked: false,
      category: "platinum",
      progress: 80,
      requiredPoints: 5000
    },
    {
      id: 9,
      title: "Технический гений",
      description: "Завершите 20 технических курсов",
      icon: "zap",
      isUnlocked: false,
      category: "platinum",
      progress: 60,
      requiredPoints: 6000
    },
    {
      id: 10,
      title: "Будущий лидер",
      description: "Станьте ментором для трех новых студентов",
      icon: "trophy",
      isUnlocked: false,
      category: "special",
      progress: 33,
      requiredPoints: 7000
    }
  ];
  
  // Вехи пользователя
  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Начало пути",
      description: "Наберите первые 1000 очков",
      requiredPoints: 1000,
      reward: "Доступ к эксклюзивным вебинарам",
      isAchieved: true
    },
    {
      id: 2,
      title: "Уверенный рост",
      description: "Наберите 2500 очков",
      requiredPoints: 2500,
      reward: "Персональная консультация с карьерным коучем",
      isAchieved: true
    },
    {
      id: 3,
      title: "Путь профессионала",
      description: "Наберите 5000 очков",
      requiredPoints: 5000,
      reward: "Рекомендательное письмо от университета",
      isAchieved: false
    },
    {
      id: 4,
      title: "Эксперт в своей области",
      description: "Наберите 10000 очков",
      requiredPoints: 10000,
      reward: "Приоритетный доступ к стажировкам в компаниях-партнерах",
      isAchieved: false
    }
  ];
  
  // Анимационные варианты
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Форматирование даты
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  // Получение иконки
  const getIcon = (iconType: string, className: string = "h-6 w-6") => {
    switch (iconType) {
      case 'trophy':
        return <Trophy className={className} />;
      case 'medal':
        return <Medal className={className} />;
      case 'star':
        return <Star className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'book':
        return <BookOpen className={className} />;
      case 'target':
        return <Target className={className} />;
      case 'zap':
        return <Zap className={className} />;
      case 'gift':
        return <Gift className={className} />;
      default:
        return <Award className={className} />;
    }
  };
  
  // Получение цвета категории бейджа
  const getBadgeCategoryColor = (category: string): string => {
    switch (category) {
      case 'bronze':
        return "bg-amber-700";
      case 'silver':
        return "bg-slate-400";
      case 'gold':
        return "bg-amber-400";
      case 'platinum':
        return "bg-gradient-to-r from-indigo-500 to-purple-500";
      case 'special':
        return "bg-gradient-to-r from-rose-400 to-orange-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Получение цвета категории достижения
  const getAchievementCategoryColor = (category: string): string => {
    switch (category) {
      case 'academics':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case 'career':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case 'skills':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case 'participation':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      case 'special':
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };
  
  // Получение текста категории достижения
  const getAchievementCategoryText = (category: string): string => {
    switch (category) {
      case 'academics':
        return "Учеба";
      case 'career':
        return "Карьера";
      case 'skills':
        return "Навыки";
      case 'participation':
        return "Участие";
      case 'special':
        return "Особые";
      default:
        return "Общие";
    }
  };
  
  return (
    <RoleLayout pageTitle="Достижения">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Обзор достижений */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <Trophy className="h-10 w-10 mb-2" />
              <p className="text-2xl font-bold">{userStats.totalPoints}</p>
              <p className="text-sm opacity-80">Общее количество очков</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <Award className="h-10 w-10 mb-2" />
              <p className="text-2xl font-bold">{userStats.totalAchievements}</p>
              <p className="text-sm opacity-80">Разблокированных достижений</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <Medal className="h-10 w-10 mb-2" />
              <p className="text-2xl font-bold">{userStats.totalBadges}</p>
              <p className="text-sm opacity-80">Полученных бейджей</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 flex flex-col items-center justify-center space-y-2">
              <Zap className="h-10 w-10 mb-2" />
              <p className="text-2xl font-bold">{userStats.level}</p>
              <p className="text-sm opacity-80">Текущий уровень</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Прогресс уровня пользователя */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Ваш прогресс</h3>
                  <p className="text-muted-foreground">Уровень {userStats.level} • {userStats.rank}</p>
                </div>
                <Badge className="md:self-start bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                  {userStats.streak} дней подряд
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {userStats.totalPoints} / {userStats.nextLevelPoints} XP до уровня {userStats.level + 1}
                  </span>
                  <span className="text-sm font-medium">{userStats.progressToNextLevel}%</span>
                </div>
                <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    style={{ width: `${userStats.progressToNextLevel}%` }}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span>Поделиться</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Экспорт PDF</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Вкладки для разных типов достижений */}
        <Tabs defaultValue="achievements" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Достижения</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Medal className="h-4 w-4" />
              <span>Бейджи</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Вехи</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Достижения */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Ваши достижения</CardTitle>
                <CardDescription>
                  Достижения, которые вы получили в ходе обучения и участия в мероприятиях
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <motion.div 
                      key={achievement.id} 
                      variants={item} 
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary`}>
                        {getIcon(achievement.icon)}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <Badge variant="outline" className={getAchievementCategoryColor(achievement.category)}>
                            {getAchievementCategoryText(achievement.category)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">{formatDate(achievement.date)}</p>
                          <Badge variant="secondary">+{achievement.points} XP</Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  Смотреть все
                </Button>
                <Button variant="default">
                  Поделиться достижениями
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Бейджи */}
          <TabsContent value="badges">
            <Card>
              <CardHeader>
                <CardTitle>Ваши бейджи</CardTitle>
                <CardDescription>
                  Специальные награды и бейджи, которые вы получили за свои достижения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {badges.map((badge) => (
                    <motion.div 
                      key={badge.id} 
                      variants={item} 
                      className={`flex flex-col items-center p-4 border rounded-lg ${!badge.isUnlocked ? 'opacity-70' : ''}`}
                    >
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full mb-3 ${getBadgeCategoryColor(badge.category)} text-white`}>
                        {getIcon(badge.icon, "h-8 w-8")}
                      </div>
                      <h4 className="font-medium text-center">{badge.title}</h4>
                      <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
                      
                      {!badge.isUnlocked && badge.progress !== undefined && (
                        <div className="w-full mt-3 space-y-1">
                          <Progress value={badge.progress} className="h-1" />
                          <p className="text-xs text-muted-foreground text-center">
                            {badge.progress}% • {badge.requiredPoints} XP
                          </p>
                        </div>
                      )}
                      
                      {badge.isUnlocked && (
                        <Badge variant="outline" className="mt-3">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Получено
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Вехи */}
          <TabsContent value="milestones">
            <Card>
              <CardHeader>
                <CardTitle>Вехи развития</CardTitle>
                <CardDescription>
                  Ключевые этапы вашего прогресса с особыми наградами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Линия прогресса */}
                  <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-muted transform -translate-x-1/2"></div>
                  
                  <div className="space-y-8 relative">
                    {milestones.map((milestone, index) => (
                      <motion.div 
                        key={milestone.id} 
                        variants={item} 
                        className={`flex flex-col md:flex-row items-center gap-4 ${!milestone.isAchieved ? 'opacity-60' : ''}`}
                      >
                        <div className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${milestone.isAchieved ? 'bg-primary' : 'bg-muted'} text-white`}>
                          {milestone.isAchieved ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="w-full md:w-auto p-4 border rounded-lg bg-card">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <Badge variant="outline">{milestone.requiredPoints} XP</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Gift className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">{milestone.reward}</p>
                          </div>
                          
                          {!milestone.isAchieved && (
                            <div className="w-full mt-3 space-y-1">
                              <Progress 
                                value={(userStats.totalPoints / milestone.requiredPoints) * 100} 
                                className="h-1"
                              />
                              <p className="text-xs text-muted-foreground">
                                {userStats.totalPoints} / {milestone.requiredPoints} XP
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </RoleLayout>
  );
} 