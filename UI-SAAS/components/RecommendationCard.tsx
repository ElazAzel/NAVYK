import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LightBulbIcon, ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "course" | "event" | "job" | "skill";
  imageUrl?: string;
  relevanceScore: number; // от 0 до 100
  reasonMatched: string[];
  requiredSkills?: string[];
  missingSkills?: string[];
  deadline?: string;
  url: string;
  isLocked?: boolean;
  unlockRequirement?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onSave,
  onDismiss,
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave(recommendation.id);
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(recommendation.id);
    }
  };

  return (
    <Card className={`overflow-hidden ${recommendation.isLocked ? "opacity-75" : ""}`}>
      {recommendation.imageUrl && (
        <div className="relative h-40 w-full">
          <Image
            src={recommendation.imageUrl}
            alt={recommendation.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute top-2 right-2">
            <Badge variant={
              recommendation.type === "course" ? "default" :
              recommendation.type === "event" ? "secondary" :
              recommendation.type === "job" ? "destructive" :
              "outline"
            }>
              {recommendation.type === "course" ? "Курс" :
               recommendation.type === "event" ? "Мероприятие" :
               recommendation.type === "job" ? "Вакансия" :
               "Навык"}
            </Badge>
          </div>
          {recommendation.isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <div className="text-center p-4">
                <LockClosedIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  {recommendation.unlockRequirement}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      <CardHeader className={recommendation.imageUrl ? "pt-4" : ""}>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{recommendation.title}</CardTitle>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-muted-foreground">
                  Релевантность: {recommendation.relevanceScore}%
                </span>
              </div>
              {recommendation.deadline && (
                <div className="ml-4 text-sm text-muted-foreground">
                  До {recommendation.deadline}
                </div>
              )}
            </div>
          </div>
          {!recommendation.imageUrl && !recommendation.isLocked && (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <LightBulbIcon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="mb-4">
          {recommendation.description}
        </CardDescription>
        
        <div className="space-y-3">
          {recommendation.reasonMatched && recommendation.reasonMatched.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Почему вам подходит:
              </p>
              <ul className="space-y-1">
                {recommendation.reasonMatched.map((reason, index) => (
                  <li key={index} className="text-sm flex items-baseline">
                    <span className="h-1 w-1 rounded-full bg-primary mr-2 mt-1.5"></span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendation.requiredSkills && recommendation.requiredSkills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Требуемые навыки:
              </p>
              <div className="flex flex-wrap gap-1">
                {recommendation.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {recommendation.missingSkills && recommendation.missingSkills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Навыки для изучения:
              </p>
              <div className="flex flex-wrap gap-1">
                {recommendation.missingSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDismiss}
            disabled={recommendation.isLocked}
          >
            Скрыть
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSave}
            disabled={recommendation.isLocked}
          >
            Сохранить
          </Button>
        </div>
        <Button 
          size="sm"
          disabled={recommendation.isLocked}
          onClick={() => window.location.href = recommendation.url}
        >
          Подробнее
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard; 