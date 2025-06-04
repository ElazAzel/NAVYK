"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { animateValue } from "@/app/lib/utils";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  category: "учёба" | "активность" | "карьера" | "навыки";
  completed: boolean;
  dateCompleted?: string;
  reward: {
    type: "баллы" | "бейдж" | "статус";
    value: number | string;
  };
}

interface AchievementCardProps {
  achievement: Achievement;
  onClaimReward?: (achievementId: string) => void;
  displayMode?: "compact" | "full";
  isNew?: boolean;
}

const categoryColors = {
  "учёба": "bg-blue-500",
  "активность": "bg-green-500",
  "карьера": "bg-purple-500",
  "навыки": "bg-amber-500"
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onClaimReward,
  displayMode = "full",
  isNew = false
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(isNew);

  useEffect(() => {
    animateValue(0, achievement.progress, 1000, setAnimatedProgress);
    
    if (isNew) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement.progress, isNew]);

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
  
  if (displayMode === "compact") {
    return (
      <Card className={`relative overflow-hidden transition-all ${isNew ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-2 relative">
          <div className="absolute top-3 right-3">
            <Badge variant={achievement.completed ? "default" : "outline"}>
              {achievement.completed ? "Выполнено" : `${achievement.progress}/${achievement.maxProgress}`}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${categoryColors[achievement.category]}`}>
              {achievement.icon}
            </div>
            <CardTitle className="text-sm">{achievement.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Progress value={progressPercentage} className="h-1 mb-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={isNew ? { scale: 0.8, opacity: 0 } : false}
        animate={isNew ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Card className={`relative overflow-hidden ${isNew ? 'ring-2 ring-primary' : ''}`}>
          {showCelebration && (
            <motion.div 
              className="absolute inset-0 pointer-events-none z-10" 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-10" />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-4xl">🎉</div>
              </div>
            </motion.div>
          )}
          
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${categoryColors[achievement.category]}`}>
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle>{achievement.title}</CardTitle>
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Badge variant="outline" className="mr-1">{achievement.category}</Badge>
                    {achievement.completed && achievement.dateCompleted && <span className="ml-1">• Получено {achievement.dateCompleted}</span>}
                  </div>
                </div>
              </div>
              <Badge variant={achievement.completed ? "default" : "outline"}>
                {achievement.completed ? "Выполнено" : `${achievement.progress}/${achievement.maxProgress}`}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm mb-3">{achievement.description}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Прогресс</span>
                <span>{animatedProgress} из {achievement.maxProgress}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </CardContent>
          
          <CardFooter className="pt-0">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Награда: </span>
                  <span className="font-medium">
                    {achievement.reward.type === "баллы" 
                      ? `${achievement.reward.value} баллов` 
                      : achievement.reward.value}
                  </span>
                </div>
                
                {achievement.completed && onClaimReward && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md"
                    onClick={() => onClaimReward(achievement.id)}
                  >
                    Получить награду
                  </motion.button>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementCard; 