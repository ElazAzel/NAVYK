"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, TrendingUp, BookOpen, Briefcase } from "lucide-react";
import { RecommendationEngine } from "@/lib/ml/recommendation-engine";
import { useNotifications } from "../notifications/NotificationsProvider";

interface EnhancedRecommendation {
  id: string;
  title: string;
  description: string;
  type: "course" | "job" | "event";
  skills: string[];
  matchScore: number;
  popularity: number;
  deadline?: string;
  provider?: string;
  location?: string;
  calendarEvents?: {
    date: Date;
    type: string;
    description: string;
  }[];
  predictedSuccess?: number;
  competitionLevel?: number;
}

export default function EnhancedRecommendationEngine({ type = "all" }: { type?: "course" | "job" | "event" | "all" }) {
  const [recommendations, setRecommendations] = useState<EnhancedRecommendation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // В реальном приложении здесь будет API-запрос
        // const response = await fetch('/api/enhanced-recommendations');
        // const data = await response.json();
        
        // Временные тестовые данные
        const mockRecommendations: EnhancedRecommendation[] = [
          {
            id: "1",
            title: "Full-Stack React Developer",
            description: "Позиция для опытного Full-Stack разработчика",
            type: "job",
            skills: ["React", "Node.js", "TypeScript"],
            matchScore: 92,
            popularity: 85,
            deadline: "2024-06-15",
            provider: "Kolesa Group",
            location: "Алматы",
            predictedSuccess: 88,
            competitionLevel: 75
          },
          // Добавьте другие рекомендации...
        ];

        // Уведомляем о новых высокоприоритетных рекомендациях
        mockRecommendations.forEach(rec => {
          if (rec.matchScore >= 90) {
            addNotification({
              title: "Найдена подходящая рекомендация",
              description: `${rec.title} - совпадение ${rec.matchScore}%`,
              type: "recommendation",
              priority: "high"
            });
          }
        });

        setRecommendations(mockRecommendations);
      } catch (error) {
        console.error("Ошибка при загрузке рекомендаций:", error);
      }
    };

    loadRecommendations();
  }, [addNotification]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Получаем события для выбранной даты
    if (date) {
      const events = recommendations
        .filter(rec => rec.calendarEvents?.some(event => 
          event.date.toDateString() === date.toDateString()
        ))
        .map(rec => ({
          title: rec.title,
          type: rec.type,
          description: rec.description
        }));
      setSelectedEvents(events);
    }
  };

  // Фильтруем рекомендации по выбранному типу
  const filteredRecommendations = type === "all" 
    ? recommendations 
    : recommendations.filter(rec => rec.type === type);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRecommendations.map((recommendation) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={
                      recommendation.type === "job" ? "default" :
                      recommendation.type === "course" ? "secondary" :
                      "outline"
                    }>
                      {recommendation.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">
                      {recommendation.matchScore}% match
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{recommendation.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Match Score</div>
                      <Progress value={recommendation.matchScore} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Competition Level</div>
                      <Progress 
                        value={recommendation.competitionLevel} 
                        className="h-2" 
                        indicatorClassName="bg-orange-500"
                      />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Predicted Success</div>
                      <Progress 
                        value={recommendation.predictedSuccess} 
                        className="h-2"
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {recommendation.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Календарь событий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
            
            {selectedEvents.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">События на {selectedDate?.toLocaleDateString()}</h4>
                {selectedEvents.map((event, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-start gap-2">
                      {event.type === "job" ? (
                        <Briefcase className="w-4 h-4 mt-1" />
                      ) : event.type === "course" ? (
                        <BookOpen className="w-4 h-4 mt-1" />
                      ) : (
                        <TrendingUp className="w-4 h-4 mt-1" />
                      )}
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.description}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}