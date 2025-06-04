"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";

interface ComparisonMetric {
  name: string;
  value: number;
  average: number;
  topUniversityValue: number;
  unit?: string;
}

interface CompetingUniversity {
  id: string;
  name: string;
  overallScore: number;
  strengths: string[];
  metrics: {
    name: string;
    value: number;
    unit?: string;
  }[];
}

interface RankingPosition {
  category: string;
  position: number;
  totalUniversities: number;
  previousPosition?: number;
  change?: number;
}

interface UniversityComparisonProps {
  metrics: ComparisonMetric[];
  competingUniversities: CompetingUniversity[];
  rankings: RankingPosition[];
  universityName: string;
}

const UniversityComparison: React.FC<UniversityComparisonProps> = ({
  metrics,
  competingUniversities,
  rankings,
  universityName,
}) => {
  const sortedCompetitors = [...competingUniversities].sort((a, b) => b.overallScore - a.overallScore);
  
  // Функция для отображения значения метрики с единицей измерения
  const formatMetricValue = (value: number, unit?: string) => {
    if (unit === "%") return `${value}${unit}`;
    if (unit === "руб") return `${value.toLocaleString('ru-RU')} ${unit}`;
    return unit ? `${value} ${unit}` : value;
  };
  
  // Функция для получения цвета в зависимости от сравнения
  const getComparisonColor = (value: number, average: number) => {
    const percentDiff = ((value - average) / average) * 100;
    if (percentDiff >= 20) return "text-green-600";
    if (percentDiff >= 5) return "text-emerald-500";
    if (percentDiff >= -5) return "text-blue-500";
    if (percentDiff >= -20) return "text-amber-500";
    return "text-red-500";
  };
  
  // Функция для отображения процента отклонения от среднего
  const getPercentDiff = (value: number, average: number) => {
    const percentDiff = ((value - average) / average) * 100;
    return percentDiff > 0 ? `+${percentDiff.toFixed(1)}%` : `${percentDiff.toFixed(1)}%`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Сравнение с другими университетами</CardTitle>
        <CardDescription>Анализ конкурентных преимуществ и положения в рейтингах</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="metrics">Метрики</TabsTrigger>
            <TabsTrigger value="competitors">Конкуренты</TabsTrigger>
            <TabsTrigger value="rankings">Рейтинги</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.name} className="border rounded-lg p-4">
                    <div className="text-sm font-medium mb-2">{metric.name}</div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="text-2xl font-bold">
                        {formatMetricValue(metric.value, metric.unit)}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          metric.value > metric.average
                            ? "bg-green-50 text-green-700" 
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {getPercentDiff(metric.value, metric.average)}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Средний по университетам</span>
                          <span>{formatMetricValue(metric.average, metric.unit)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${(metric.average / metric.topUniversityValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{universityName}</span>
                          <span className={getComparisonColor(metric.value, metric.average)}>
                            {formatMetricValue(metric.value, metric.unit)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div 
                            className={`${
                              metric.value > metric.average ? "bg-green-500" : "bg-red-500"
                            } h-1.5 rounded-full`}
                            style={{ width: `${(metric.value / metric.topUniversityValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Лучший результат</span>
                          <span className="text-green-600">
                            {formatMetricValue(metric.topUniversityValue, metric.unit)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg text-sm text-center">
                <p className="text-muted-foreground">
                  Данные для сравнения собраны с {competingUniversities.length + 1} университетов
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="competitors">
            <div className="space-y-6">
              {sortedCompetitors.map((university, index) => (
                <div key={university.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-medium">{university.name}</span>
                      <div className="text-xs text-muted-foreground mt-1">
                        Рейтинг: #{index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {university.overallScore.toFixed(1)}/5
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <h4 className="text-sm font-medium">Ключевые показатели</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {university.metrics.map((metric) => (
                        <div key={metric.name} className="bg-muted/20 p-2 rounded">
                          <div className="text-xs text-muted-foreground">{metric.name}</div>
                          <div className="text-sm font-medium">
                            {formatMetricValue(metric.value, metric.unit)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Конкурентные преимущества</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rankings">
            <div className="space-y-6">
              {rankings.map((ranking) => (
                <div key={ranking.category} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <div className="font-medium">{ranking.category}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Всего в рейтинге: {ranking.totalUniversities}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-3">
                      #{ranking.position}
                    </div>
                    
                    {ranking.change !== undefined && (
                      <Badge 
                        variant="outline" 
                        className={`${
                          ranking.change > 0 
                            ? "bg-green-50 text-green-700" 
                            : ranking.change < 0 
                              ? "bg-red-50 text-red-700" 
                              : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {ranking.change > 0 ? '▲' : ranking.change < 0 ? '▼' : ''}
                        {Math.abs(ranking.change)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Рекомендации по улучшению позиций в рейтингах</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li className="text-sm text-muted-foreground">
                    Улучшите показатели трудоустройства выпускников для роста в академических рейтингах
                  </li>
                  <li className="text-sm text-muted-foreground">
                    Расширьте программы международного обмена для улучшения международных показателей
                  </li>
                  <li className="text-sm text-muted-foreground">
                    Увеличьте количество публикаций в высокорейтинговых журналах
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UniversityComparison; 