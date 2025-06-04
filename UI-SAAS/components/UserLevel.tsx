"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { Badge } from "@/app/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { animateValue } from "@/app/lib/utils";

interface UserLevelProps {
  level: number;
  points: number;
  pointsToNextLevel: number;
  rankTitle: string;
  showAnimation?: boolean;
}

const UserLevel: React.FC<UserLevelProps> = ({
  level,
  points,
  pointsToNextLevel,
  rankTitle,
  showAnimation = false,
}) => {
  const [showLevelUp, setShowLevelUp] = useState(showAnimation);
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [animatedLevel, setAnimatedLevel] = useState(showAnimation ? level - 1 : level);
  
  useEffect(() => {
    // Анимация счетчика очков
    animateValue(0, points, 1500, setAnimatedPoints);

    // Анимация перехода на новый уровень
    if (showAnimation) {
      const timer = setTimeout(() => {
        setAnimatedLevel(level);
        
        // Показываем анимацию повышения уровня
        const levelUpTimer = setTimeout(() => {
          setShowLevelUp(false);
        }, 3000);
        
        return () => clearTimeout(levelUpTimer);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [points, level, showAnimation]);

  const pointsProgress = (points % pointsToNextLevel) / pointsToNextLevel * 100;
  
  return (
    <Card>
      <CardContent className="p-4 relative">
        <AnimatePresence>
          {showLevelUp && (
            <motion.div 
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="text-center text-white"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5, repeat: 1, repeatType: "reverse" }}
              >
                <div className="text-4xl mb-2">🎊</div>
                <h3 className="text-2xl font-bold mb-1">Новый уровень!</h3>
                <p className="text-xl">Вы достигли уровня {level}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div 
              className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm"
              key={animatedLevel}
              initial={showAnimation ? { scale: 0.8 } : false}
              animate={showAnimation ? { scale: [0.8, 1.2, 1] } : false}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {animatedLevel}
            </motion.div>
            <div>
              <h3 className="font-medium">Уровень {animatedLevel}</h3>
              <p className="text-xs text-muted-foreground">{rankTitle}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs py-1">
            <motion.span>{animatedPoints}</motion.span> баллов
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>До следующего уровня</span>
            <span>{pointsToNextLevel - (points % pointsToNextLevel)} баллов</span>
          </div>
          <motion.div
            initial={false}
            animate={{ width: `${pointsProgress}%` }}
            transition={{ duration: 0.8 }}
          >
            <Progress value={pointsProgress} className="h-2" />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLevel; 