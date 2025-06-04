"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";

interface CourseCategory {
  name: string;
  count: number;
  percentage: number;
  completionRate: number;
}

interface PopularCourse {
  id: string;
  title: string;
  category: string;
  enrollments: number;
  completionRate: number;
  satisfaction: number; // 1-5
  isPaid: boolean;
  provider: string;
}

interface CourseDistribution {
  paid: number;
  free: number;
}

interface SkillDevelopment {
  skill: string;
  initialLevel: number;
  currentLevel: number;
  improvement: number;
}

interface CourseProvider {
  name: string;
  courses: number;
  students: number;
}

interface CoursesAnalyticsProps {
  courseCategories: CourseCategory[];
  popularCourses: PopularCourse[];
  courseDistribution: CourseDistribution;
  skillDevelopment: SkillDevelopment[];
  totalStudents: number;
  totalCourses: number;
  averageCompletionRate: number;
  averageSatisfaction: number; // 1-5
  partnerProviders?: CourseProvider[];
}

const CoursesAnalytics: React.FC<CoursesAnalyticsProps> = ({
  courseCategories,
  popularCourses,
  courseDistribution,
  skillDevelopment,
  totalStudents,
  totalCourses,
  averageCompletionRate,
  averageSatisfaction,
  partnerProviders = [],
}) => {
  // Рассчитываем соотношение платных и бесплатных курсов
  const paidPercentage = Math.round((courseDistribution.paid / (courseDistribution.paid + courseDistribution.free)) * 100);
  const freePercentage = 100 - paidPercentage;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Аналитика популярных курсов</CardTitle>
        <CardDescription>Статистика по сторонним курсам, которые проходят студенты университета</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/30 p-3 md:p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xl md:text-3xl font-bold text-primary mb-1">{totalCourses}</div>
            <div className="text-xs md:text-sm text-muted-foreground text-center">Всего курсов</div>
          </div>
          
          <div className="bg-muted/30 p-3 md:p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xl md:text-3xl font-bold text-primary mb-1">{totalStudents}</div>
            <div className="text-xs md:text-sm text-muted-foreground text-center">Записей на курсы</div>
          </div>
          
          <div className="bg-muted/30 p-3 md:p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xl md:text-3xl font-bold text-primary mb-1">{averageCompletionRate}%</div>
            <div className="text-xs md:text-sm text-muted-foreground text-center">Средняя завершаемость</div>
          </div>
          
          <div className="bg-muted/30 p-3 md:p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-xl md:text-3xl font-bold text-primary mb-1">{averageSatisfaction.toFixed(1)}</div>
            <div className="text-xs md:text-sm text-muted-foreground text-center">Средняя оценка (из 5)</div>
          </div>
        </div>
        
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-4">
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="popular">Популярные</TabsTrigger>
            <TabsTrigger value="distribution">Распределение</TabsTrigger>
            <TabsTrigger value="skills">Навыки</TabsTrigger>
            <TabsTrigger value="providers">Провайдеры</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <div className="space-y-6">
              {courseCategories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs md:text-sm font-medium">{category.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {category.count} курсов • {category.completionRate}% завершаемость
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 font-medium">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${Math.max(5, category.percentage)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-xs md:text-sm text-muted-foreground">
                  <p>Распределение курсов по категориям</p>
                </div>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  {courseCategories.sort((a, b) => b.completionRate - a.completionRate)[0].name}
                </Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="popular">
            <div className="space-y-4">
              {popularCourses.map((course, index) => (
                <div key={course.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex flex-col md:flex-row justify-between md:items-start">
                    <div>
                      <span className="font-medium text-sm md:text-base">{course.title}</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                        {course.isPaid ? (
                          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs">
                            Платный
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs">
                            Бесплатный
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-xs">
                          {course.provider}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <div className="text-sm font-medium">{course.enrollments}</div>
                      <div className="text-xs text-muted-foreground">студентов</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Завершаемость</span>
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                          style={{ width: `${Math.max(5, course.completionRate)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs">
                        <span>Удовлетворенность</span>
                        <span className="font-medium">{course.satisfaction}/5</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-1.5 overflow-hidden">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                          style={{ width: `${Math.max(5, course.satisfaction * 20)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-4">
                <h3 className="text-xs md:text-sm font-medium">Соотношение платных и бесплатных курсов</h3>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Платные курсы</span>
                    <span className="font-medium">{courseDistribution.paid} ({paidPercentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${Math.max(5, paidPercentage)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Бесплатные курсы</span>
                    <span className="font-medium">{courseDistribution.free} ({freePercentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${Math.max(5, freePercentage)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs font-medium">Платные</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs font-medium">Бесплатные</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Круговая диаграмма для платных курсов */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray={`${paidPercentage * 2.51} ${100 * 2.51}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    
                    {/* Круговая диаграмма для бесплатных курсов */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="20"
                      strokeDasharray={`${freePercentage * 2.51} ${100 * 2.51}`}
                      strokeDashoffset={`${-paidPercentage * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                    
                    <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-900" />
                    
                    <text x="50" y="46" textAnchor="middle" className="fill-foreground text-xs font-bold">
                      {paidPercentage}% / {freePercentage}%
                    </text>
                    <text x="50" y="58" textAnchor="middle" className="fill-muted-foreground text-[8px]">
                      платные / бесплатные
                    </text>
                  </svg>
                </div>
                
                <div className="mt-4 text-xs md:text-sm text-muted-foreground text-center max-w-xs">
                  <p>
                    Студенты чаще завершают платные курсы (+18% к показателю завершаемости)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="space-y-6">
              {skillDevelopment.map((skill) => (
                <div key={skill.skill} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-xs md:text-sm">{skill.skill}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      +{skill.improvement}%
                    </Badge>
                  </div>
                  
                  <div className="relative pt-6">
                    <div className="flex justify-between text-xs text-muted-foreground absolute top-0 left-0 right-0">
                      <span>Начальный уровень</span>
                      <span>Текущий уровень</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                      {/* Начальный уровень */}
                      <div 
                        className="absolute bg-gray-400 h-2.5 rounded-full"
                        style={{ width: `${skill.initialLevel}%` }}
                      ></div>
                      
                      {/* Текущий уровень */}
                      <div 
                        className="absolute bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${skill.currentLevel}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs mt-1">
                      <span>{skill.initialLevel}%</span>
                      <span>{skill.currentLevel}%</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 text-center text-xs md:text-sm text-muted-foreground">
                <p>Средний прирост навыков студентов после прохождения онлайн-курсов</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    +
                    {Math.round(
                      skillDevelopment.reduce((sum, skill) => sum + skill.improvement, 0) /
                      skillDevelopment.length
                    )}
                    % в среднем
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="providers">
            <div className="space-y-6">
              <h3 className="text-xs md:text-sm font-medium mb-4">Распределение по провайдерам курсов</h3>
              
              {partnerProviders && partnerProviders.map((provider) => (
                <div key={provider.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs md:text-sm font-medium">{provider.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {provider.courses} курсов • {provider.students} студентов
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {Math.round((provider.students / totalStudents) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${Math.max(5, (provider.students / totalStudents) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="bg-muted/30 p-3 rounded-lg mt-6">
                <div className="text-xs md:text-sm text-center text-muted-foreground">
                  <p>Студенты университета получают доступ к партнерским курсам по сниженным ценам через реферальные ссылки</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CoursesAnalytics; 