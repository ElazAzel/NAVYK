"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";

interface EventTypeData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface EventParticipationChartProps {
  eventTypeData: EventTypeData[];
  participationTrend: Array<{
    month: string;
    count: number;
  }>;
  facultyParticipation: Array<{
    name: string;
    attendanceRate: number;
  }>;
}

const EventParticipationChart: React.FC<EventParticipationChartProps> = ({
  eventTypeData,
  participationTrend,
  facultyParticipation,
}) => {
  // Находим максимальные значения для масштабирования графиков
  const maxTrendValue = Math.max(...participationTrend.map(item => item.count));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Участие в мероприятиях</CardTitle>
        <CardDescription>Анализ вовлеченности студентов в мероприятия университета</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="types">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="types">Типы мероприятий</TabsTrigger>
            <TabsTrigger value="trend">Динамика</TabsTrigger>
            <TabsTrigger value="faculty">По факультетам</TabsTrigger>
          </TabsList>
          
          <TabsContent value="types">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {eventTypeData.map((type) => (
                  <div key={type.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{type.name}</span>
                      <span className="text-sm text-muted-foreground">{type.count} ({type.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`${type.color} h-2.5 rounded-full`} style={{ width: `${type.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {eventTypeData.map((type, index) => {
                      // Рассчитываем угол для каждого сегмента
                      let cumulativePercent = 0;
                      eventTypeData.slice(0, index).forEach(d => {
                        cumulativePercent += d.percentage;
                      });
                      
                      const startAngle = (cumulativePercent / 100) * 360;
                      const endAngle = startAngle + (type.percentage / 100) * 360;
                      
                      // Конвертируем угол в радианы и вычисляем координаты
                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);
                      
                      const x1 = 50 + 50 * Math.cos(startRad);
                      const y1 = 50 + 50 * Math.sin(startRad);
                      const x2 = 50 + 50 * Math.cos(endRad);
                      const y2 = 50 + 50 * Math.sin(endRad);
                      
                      // Флаг для больших дуг (более 180 градусов)
                      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                      
                      // Создаем путь дуги
                      const d = `
                        M 50 50
                        L ${x1} ${y1}
                        A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}
                        Z
                      `;
                      
                      // Цвет берем из данных
                      const color = type.color.replace('bg-', 'fill-');
                      
                      return (
                        <path 
                          key={type.name} 
                          d={d} 
                          className={color}
                          strokeWidth="0"
                        />
                      );
                    })}
                    <circle cx="50" cy="50" r="25" fill="white" />
                  </svg>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex flex-wrap justify-center gap-4 mt-4">
                {eventTypeData.map((type) => (
                  <div key={type.name} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${type.color.replace('bg-', '')} mr-2`}></div>
                    <span className="text-sm">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trend">
            <div className="space-y-6">
              <div className="h-60 relative">
                <div className="absolute inset-0 flex items-end">
                  {participationTrend.map((month, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full px-1">
                        <div 
                          className="bg-blue-500 w-full rounded-t"
                          style={{ 
                            height: `${(month.count / maxTrendValue) * 180}px`,
                            transition: 'height 0.3s ease-in-out'
                          }}
                        ></div>
                      </div>
                      <div className="text-xs mt-2 text-muted-foreground">
                        {month.month}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Горизонтальные линии шкалы */}
                <div className="absolute inset-0 flex flex-col justify-between pb-6">
                  {[0, 1, 2, 3].map((line) => (
                    <div key={line} className="w-full h-px bg-gray-200 relative">
                      <span className="absolute right-full pr-2 text-xs text-muted-foreground -translate-y-1/2">
                        {Math.round(maxTrendValue * (3 - line) / 3)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Динамика участия студентов в мероприятиях за последние 6 месяцев</p>
                <div className="mt-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 mr-2">
                    +24% рост участия
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    83% средняя заполняемость
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="faculty">
            <div className="space-y-4">
              {facultyParticipation.map((faculty) => (
                <div key={faculty.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{faculty.name}</span>
                    <span className="text-sm text-muted-foreground">{faculty.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        faculty.attendanceRate > 80 ? 'bg-green-500' : 
                        faculty.attendanceRate > 60 ? 'bg-blue-500' : 
                        faculty.attendanceRate > 40 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`} 
                      style={{ width: `${faculty.attendanceRate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Процент участия студентов факультетов в мероприятиях университета</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Лидер: {facultyParticipation.sort((a, b) => b.attendanceRate - a.attendanceRate)[0].name}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EventParticipationChart; 