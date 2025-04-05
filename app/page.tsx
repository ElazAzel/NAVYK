"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { UserIcon, AcademicCapIcon, BuildingOfficeIcon, UserGroupIcon, ShieldCheckIcon, ChartBarIcon, ChartPieIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Badge } from "./components/ui/badge";
import { motion } from "framer-motion";
import Footer from "./components/Footer";

// Импортируем анимированные компоненты
import { 
  AnimatedBackground,
  AnimatedDemoChart,
  AnimatedStatistics,
  AnimatedFeatureCard, 
  AnimatedDemoCard, 
  AnimatedTestimonialCard,
  AnimatedTextChanger
} from "./components/animations";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Если пользователь авторизован, перенаправляем на соответствующий дашборд
      if (user && user.role) {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [user, isLoading, router]);

  // Если идет загрузка или пользователь не авторизован, не перенаправляем
  // Это позволит основной странице загрузиться и отобразить контент для неавторизованных пользователей
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            NAVYK - платформа для развития навыков и карьеры
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Единая экосистема для студентов, компаний и университетов Казахстана, 
            где талант встречается с возможностями
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">Для студентов</h2>
            <p className="text-muted-foreground mb-4">
              Следите за развитием карьеры, записывайтесь на курсы и мероприятия, 
              ищите работу и стажировки
            </p>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Начать развитие
            </a>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">Для компаний</h2>
            <p className="text-muted-foreground mb-4">
              Находите талантливых специалистов, публикуйте вакансии, 
              проводите мероприятия и отслеживайте аналитику
            </p>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Найти таланты
            </a>
          </div>
          
          <div className="bg-card rounded-lg shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-3">Для университетов</h2>
            <p className="text-muted-foreground mb-4">
              Следите за прогрессом студентов, организуйте мероприятия,
              сотрудничайте с компаниями и получайте аналитику
            </p>
            <a 
              href="/login" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Улучшить образование
            </a>
          </div>
        </div>
        
        <div className="mt-10">
          <a 
            href="/login" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 mr-4"
          >
            Войти
          </a>
          <a 
            href="/signup" 
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Регистрация
          </a>
        </div>
      </div>
    </div>
  );
} 