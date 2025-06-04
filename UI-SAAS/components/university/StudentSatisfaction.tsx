"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";

interface SatisfactionData {
  category: string;
  score: number; // оценка от 1 до 5
  previousScore?: number; // для сравнения с прошлым периодом
  change?: number; // положительное или отрицательное изменение
}

interface SatisfactionDetails {
  aspect: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
}

interface StudentSatisfactionProps {
  academicSatisfaction: SatisfactionData[];
  campusSatisfaction: SatisfactionData[];
  detailedSatisfaction: SatisfactionDetails[];
  overallScore: number;
  averageScore: number;
  universityRank: number;
  totalUniversities: number;
}

const StudentSatisfaction: React.FC<StudentSatisfactionProps> = ({
  academicSatisfaction,
  campusSatisfaction,
  detailedSatisfaction,
  overallScore,
  averageScore,
  universityRank,
  totalUniversities,
}) => {
  // Расчет средних значений для каждой категории
  const avgAcademicScore = academicSatisfaction.reduce((acc, item) => acc + item.score, 0) / academicSatisfaction.length;
  const avgCampusScore = campusSatisfaction.reduce((acc, item) => acc + item.score, 0) / campusSatisfaction.length;
  
  // Определение цвета в зависимости от оценки
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4) return "text-emerald-500";
    if (score >= 3.5) return "text-blue-500";
    if (score >= 3) return "text-amber-500";
    if (score >= 2.5) return "text-orange-500";
    return "text-red-500";
  };
  
  // Получение цвета для прогресс-бара в зависимости от оценки
  const getProgressColor = (score: number) => {
    if (score >= 4.5) return "bg-green-600";
    if (score >= 4) return "bg-emerald-500";
    if (score >= 3.5) return "bg-blue-500";
    if (score >= 3) return "bg-amber-500";
    if (score >= 2.5) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Удовлетворенность студентов</CardTitle>
        <CardDescription>Оценка удовлетворенности студентов академическими и инфраструктурными аспектами</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold mb-1 ${getScoreColor(overallScore)}`}>
              {overallScore.toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground text-center">Общая оценка (из 5)</div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {universityRank} <span className="text-sm text-muted-foreground">из {totalUniversities}</span>
            </div>
            <div className="text-sm text-muted-foreground text-center">Рейтинг удовлетворенности</div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold mb-1 ${overallScore > averageScore ? 'text-green-600' : 'text-red-500'}`}>
              {(overallScore - averageScore) > 0 ? '+' : ''}{(overallScore - averageScore).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground text-center">Относительно среднего</div>
          </div>
        </div>
        
        <Tabs defaultValue="academic">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="academic">Образование</TabsTrigger>
            <TabsTrigger value="campus">Инфраструктура</TabsTrigger>
            <TabsTrigger value="details">Детали</TabsTrigger>
          </TabsList>
          
          <TabsContent value="academic">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Академические аспекты</h3>
                <div className={`font-medium ${getScoreColor(avgAcademicScore)}`}>
                  {avgAcademicScore.toFixed(1)} <span className="text-xs text-muted-foreground">/ 5</span>
                </div>
              </div>
              
              {academicSatisfaction.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                        {item.score.toFixed(1)}
                      </span>
                      {item.change !== undefined && (
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            item.change > 0 
                              ? "bg-green-50 text-green-700" 
                              : item.change < 0 
                                ? "bg-red-50 text-red-700" 
                                : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${getProgressColor(item.score)} h-2 rounded-full`}
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  {item.previousScore !== undefined && (
                    <div className="w-full flex justify-end">
                      <div className="text-xs text-muted-foreground">
                        Было: {item.previousScore.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="campus">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Инфраструктура университета</h3>
                <div className={`font-medium ${getScoreColor(avgCampusScore)}`}>
                  {avgCampusScore.toFixed(1)} <span className="text-xs text-muted-foreground">/ 5</span>
                </div>
              </div>
              
              {campusSatisfaction.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                        {item.score.toFixed(1)}
                      </span>
                      {item.change !== undefined && (
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${
                            item.change > 0 
                              ? "bg-green-50 text-green-700" 
                              : item.change < 0 
                                ? "bg-red-50 text-red-700" 
                                : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`${getProgressColor(item.score)} h-2 rounded-full`}
                      style={{ width: `${(item.score / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  {item.previousScore !== undefined && (
                    <div className="w-full flex justify-end">
                      <div className="text-xs text-muted-foreground">
                        Было: {item.previousScore.toFixed(1)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-6">
              {detailedSatisfaction.map((item) => (
                <div key={item.aspect} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{item.aspect}</h3>
                    <div className={`font-medium ${getScoreColor(item.score)}`}>
                      {item.score.toFixed(1)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">Сильные стороны</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {item.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-red-500 mb-2">Требует улучшения</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {item.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center items-center text-sm mt-4">
                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700">
                  Совет
                </Badge>
                <span className="text-muted-foreground">
                  Сосредоточьтесь на направлениях с наименьшей оценкой для повышения общей удовлетворенности
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentSatisfaction; 