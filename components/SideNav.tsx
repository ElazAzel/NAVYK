"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import RoleNavigation from "./RoleNavigation";
import Logo from "./Logo";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LogOut, Settings, Home } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

interface SideNavProps {
  className?: string;
}

export default function SideNav({ className }: SideNavProps) {
  const { user, logout } = useAuth();
  const [hoverProgress, setHoverProgress] = useState(false);

  if (!user) return null;

  // Данные для демонстрации геймификации
  const userLevel = 12;
  const userXP = 740;
  const nextLevelXP = 1000;
  const userProgress = Math.floor((userXP / nextLevelXP) * 100);

  // Вычисляем, сколько еще опыта нужно для следующего уровня
  const xpToNextLevel = nextLevelXP - userXP;

  return (
    <motion.div 
      initial={{ x: -64, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "h-screen fixed top-0 left-0 z-40 w-64 pb-4 border-r border-border bg-card backdrop-blur-sm bg-opacity-80 shadow-lg flex flex-col",
        className
      )}
    >
      <div className="flex items-center h-14 px-6 border-b border-border">
        <Logo className="text-primary" />
        <Badge variant="outline" className="ml-2">
          Beta
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-6 px-3">
          <div className="flex items-center mb-1">
            <Avatar className="h-10 w-10 mr-3 ring-2 ring-primary/30">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">{user.name}</p>
              <div className="flex items-center">
                <div className="flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary mr-2">
                  <span className="text-xs font-bold">{userLevel}</span>
                </div>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
          </div>
          
          <div 
            className="relative mt-2"
            onMouseEnter={() => setHoverProgress(true)}
            onMouseLeave={() => setHoverProgress(false)}
          >
            <Progress value={userProgress} className="h-2" />
            {hoverProgress && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 right-0 bg-popover border rounded-md p-1 text-xs text-center shadow-md"
              >
                <p>{userXP} / {nextLevelXP} XP</p>
                <p className="text-muted-foreground">{xpToNextLevel} XP до уровня {userLevel + 1}</p>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="space-y-1 px-3 mb-2">
          <Link 
            href={`/${user.role}/dashboard`}
            className="flex items-center py-2 px-3 text-sm rounded-md w-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Home className="mr-2 h-4 w-4 text-primary" />
            Главная
          </Link>
        </div>
        
        <div className="mb-3 px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Меню
          </p>
          <Separator />
        </div>
        
        <RoleNavigation vertical />
        
        <div className="mt-6 px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Дополнительно
          </p>
          <Separator />
        </div>
        
        <div className="mt-3 space-y-1 px-3">
          <Link 
            href={`/${user.role}/settings`}
            className="flex items-center py-2 px-3 text-sm rounded-md w-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
            Настройки
          </Link>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start px-3 hover:bg-destructive/10 hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-4">
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
              🚀
            </div>
            <div>
              <p className="text-sm font-medium">Достижения</p>
              <p className="text-xs text-muted-foreground">3 из 10 получено</p>
            </div>
          </div>
          <Progress value={30} className="h-1.5" />
        </div>
      </div>
    </motion.div>
  );
} 