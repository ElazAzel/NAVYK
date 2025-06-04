import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  type: "course" | "event" | "internship" | "skill";
  status: "completed" | "in-progress" | "recommended" | "locked";
  url: string;
}

interface CareerRoadmapProps {
  title: string;
  description: string;
  targetRole: string;
  progress: number;
  steps: RoadmapStep[];
}

const CareerRoadmap: React.FC<CareerRoadmapProps> = ({
  title,
  description,
  targetRole,
  progress,
  steps,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-2">{description}</p>
        <div className="mt-4">
          <Badge variant="outline" className="text-sm font-medium">
            Цель: {targetRole}
          </Badge>
        </div>
      </div>

      <div className="relative mb-8">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground text-right">
          Прогресс: {progress}%
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-10 h-full w-0.5 bg-border -z-10"></div>
            )}
            <Card className={`border ${step.status === "locked" ? "opacity-60" : ""}`}>
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === "completed" ? "bg-primary/20 text-primary" : 
                  step.status === "in-progress" ? "bg-blue-100 text-blue-600" : 
                  step.status === "recommended" ? "bg-amber-100 text-amber-600" : 
                  "bg-muted text-muted-foreground"
                }`}>
                  {step.status === "completed" ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    <span className="text-xl font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      step.type === "course" ? "default" : 
                      step.type === "event" ? "secondary" : 
                      step.type === "internship" ? "destructive" : 
                      "outline"
                    }>
                      {step.type === "course" ? "Курс" : 
                       step.type === "event" ? "Мероприятие" : 
                       step.type === "internship" ? "Стажировка" : 
                       "Навык"}
                    </Badge>
                    <Badge variant="outline" className={
                      step.status === "completed" ? "bg-primary/20 text-primary-foreground" : 
                      step.status === "in-progress" ? "bg-blue-100 text-blue-600" : 
                      step.status === "recommended" ? "bg-amber-100 text-amber-600" : 
                      ""
                    }>
                      {step.status === "completed" ? "Завершено" : 
                       step.status === "in-progress" ? "В процессе" : 
                       step.status === "recommended" ? "Рекомендуется" : 
                       "Недоступно"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={step.status === "locked" ? "outline" : "default"} 
                  size="sm" 
                  disabled={step.status === "locked"}
                  className="ml-auto"
                  onClick={() => window.location.href = step.url}
                >
                  {step.status === "completed" ? "Обзор" : 
                   step.status === "in-progress" ? "Продолжить" : 
                   step.status === "recommended" ? "Начать" : 
                   "Заблокировано"}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerRoadmap; 