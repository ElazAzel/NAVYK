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
    if (!isLoading && user && user.role) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, isLoading, router]);
  
  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background/50 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              NAVYK - платформа для развития навыков и карьеры
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Единая экосистема для студентов, компаний и университетов Казахстана, 
              где талант встречается с возможностями
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedFeatureCard
              title="Для студентов"
              description="Следите за развитием карьеры, записывайтесь на курсы и мероприятия, ищите работу и стажировки"
              icon={<UserIcon className="w-6 h-6" />}
              delay={0.2}
            />
            
            <AnimatedFeatureCard
              title="Для компаний"
              description="Находите талантливых специалистов, публикуйте вакансии, проводите мероприятия и отслеживайте аналитику"
              icon={<BuildingOfficeIcon className="w-6 h-6" />}
              delay={0.4}
            />
            
            <AnimatedFeatureCard
              title="Для университетов"
              description="Следите за прогрессом студентов, организуйте мероприятия, сотрудничайте с компаниями и получайте аналитику"
              icon={<AcademicCapIcon className="w-6 h-6" />}
              delay={0.6}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-10"
          >
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
          </motion.div>
        </div>
      </div>
    </>
  );
}