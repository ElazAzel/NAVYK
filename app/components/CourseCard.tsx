"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";
import { ClockIcon, UserGroupIcon, AcademicCapIcon, BuildingLibraryIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  providerType: "университет" | "компания" | "платформа";
  duration: string; // например, "8 недель"
  hoursPerWeek: number;
  difficulty: "начинающий" | "средний" | "продвинутый";
  rating: number;
  reviewCount: number;
  students: number;
  image?: string;
  skills: string[];
  modules: {
    title: string;
    lessons: number;
  }[];
  price?: number; // если курс платный
  isEnrolled: boolean;
  progress?: number; // если пользователь записан
  certificateOnCompletion: boolean;
  points: number; // бонусные баллы за прохождение
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
  displayMode?: "compact" | "full";
}

const difficultyColors = {
  "начинающий": "bg-green-100 text-green-700",
  "средний": "bg-amber-100 text-amber-700",
  "продвинутый": "bg-purple-100 text-purple-700"
};

const providerIcons = {
  "университет": <BuildingLibraryIcon className="h-4 w-4" />,
  "компания": <AcademicCapIcon className="h-4 w-4" />,
  "платформа": <AcademicCapIcon className="h-4 w-4" />
};

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onContinue,
  displayMode = "full"
}) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const handleEnroll = () => {
    if (!onEnroll) return;
    
    setIsEnrolling(true);
    // Имитация задержки сетевого запроса
    setTimeout(() => {
      onEnroll(course.id);
      setIsEnrolling(false);
    }, 600);
  };
  
  const handleContinue = () => {
    if (!onContinue) return;
    onContinue(course.id);
  };

  // Отображение рейтинга в виде звезд
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  if (displayMode === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge variant="outline" className={`${difficultyColors[course.difficulty]} border-0 mb-1`}>
                {course.difficulty}
              </Badge>
              <CardTitle className="text-base">{course.title}</CardTitle>
              <div className="text-xs text-muted-foreground mt-1">
                {course.provider}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2 text-xs mb-2">
            <div className="flex">
              {renderRating()}
            </div>
            <span className="text-muted-foreground">({course.reviewCount})</span>
          </div>
          {course.isEnrolled && course.progress !== undefined && (
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-xs">
                <span>Прогресс</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1" />
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-1 pb-3">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-1 text-xs">
              <ClockIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{course.duration}</span>
            </div>
            {course.price ? (
              <Badge variant="outline">{course.price} ₸</Badge>
            ) : (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Бесплатно</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className={`${difficultyColors[course.difficulty]} border-0 mb-1`}>
              {course.difficulty}
            </Badge>
            <CardTitle>{course.title}</CardTitle>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              {providerIcons[course.providerType]}
              <span>{course.provider}</span>
            </div>
          </div>
          
          {course.isEnrolled ? (
            <Badge variant="default">Вы записаны</Badge>
          ) : (
            <Badge variant="outline" className="text-sm py-1">
              +{course.points} баллов
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {renderRating()}
          </div>
          <span className="text-sm text-muted-foreground">
            {course.rating.toFixed(1)} ({course.reviewCount} {course.reviewCount === 1 ? 'отзыв' : course.reviewCount < 5 ? 'отзыва' : 'отзывов'})
          </span>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <UserGroupIcon className="h-4 w-4" />
            <span>{course.students} студентов</span>
          </div>
        </div>
        
        <p className="text-sm mb-4">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span>Длительность: {course.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span>{course.hoursPerWeek} часов в неделю</span>
          </div>
        </div>
        
        {course.modules.length > 0 && (
          <div className="mt-3 mb-4">
            <p className="text-sm font-medium mb-2">Программа курса:</p>
            <div className="space-y-2">
              {course.modules.slice(0, 3).map((module, index) => (
                <div key={index} className="text-sm flex justify-between">
                  <span>{module.title}</span>
                  <span className="text-muted-foreground">{module.lessons} уроков</span>
                </div>
              ))}
              {course.modules.length > 3 && (
                <p className="text-xs text-muted-foreground">И еще {course.modules.length - 3} модулей</p>
              )}
            </div>
          </div>
        )}
        
        {course.isEnrolled && course.progress !== undefined && (
          <div className="space-y-1 mt-4">
            <div className="flex justify-between text-sm">
              <span>Прогресс курса</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}
        
        {course.skills.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-1">Вы освоите:</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.map(skill => (
                <Badge key={skill} variant="outline" className="text-xs py-0">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <div>
              {course.certificateOnCompletion && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <AcademicCapIcon className="h-3.5 w-3.5 mr-1" />
                        Сертификат
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>По окончании курса вы получите сертификат</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <div className="text-lg font-semibold">
              {course.price ? `${course.price} ₸` : (
                <span className="text-green-600">Бесплатно</span>
              )}
            </div>
          </div>
          
          {course.isEnrolled ? (
            <Button
              onClick={handleContinue}
              className="w-full flex items-center justify-center gap-1"
            >
              <span>Продолжить обучение</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="w-full flex items-center justify-center"
            >
              {isEnrolling ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Запись на курс...</span>
                </div>
              ) : (
                <span>Записаться на курс</span>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard; 