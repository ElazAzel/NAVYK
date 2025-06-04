"use client";

import React from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { AnimatedStatistics, AnimatedProgressBar } from "@/app/components/animations";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Award, 
  ChevronRight, 
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import Link from "next/link";

const container = {
  hidden: { opacity: 1, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1
  }
};

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <RoleLayout>
      <div className="container py-6 space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
            <p className="text-muted-foreground">
              Управляйте своим обучением и развитием
            </p>
          </div>

          {/* Статистика */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="grid gap-4 md:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <BookOpen className="h-5 w-5" />
                      <span>Активных курсов</span>
                    </div>
                    <span className="text-xs font-medium bg-blue-500/10 text-blue-500 py-1 px-2 rounded-full">
                      +12% с прошлого месяца
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-sm text-muted-foreground">курса в процессе</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>Мероприятия</span>
                    </div>
                    <span className="text-xs font-medium bg-green-500/10 text-green-500 py-1 px-2 rounded-full">
                      2 новых
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-sm text-muted-foreground">предстоящих событий</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Award className="h-5 w-5" />
                      <span>Достижения</span>
                    </div>
                    <span className="text-xs font-medium bg-yellow-500/10 text-yellow-500 py-1 px-2 rounded-full">
                      +3 новых
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">12</h3>
                    <p className="text-sm text-muted-foreground">полученных наград</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardContent className="pt-4">
                  <AnimatedStatistics value={85} label="Общий прогресс" />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Основной контент */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Дорожная карта */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Ваша дорожная карта</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    4 курса
                  </Badge>
                </div>
                <CardDescription>
                  План обучения и профессионального развития
                </CardDescription>
              </CardHeader>              <CardContent className="space-y-4">
                <Link
                  href="/student/roadmap"
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full p-2 bg-primary/10">
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Перейти к карте развития</p>
                      <p className="text-sm text-muted-foreground">
                        Просмотр полного плана обучения
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </CardContent>
            </Card>

            {/* Рекомендации */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Рекомендации для вас</CardTitle>
                  <Badge variant="outline" className="font-normal">
                    3 курса
                  </Badge>
                </div>
                <CardDescription>
                  На основе вашего профиля и интересов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Рекомендованные курсы и мероприятия */}
              </CardContent>
            </Card>
          </div>

          {/* Дополнительные секции */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Предстоящие мероприятия */}
            <Card>
              <CardHeader>
                <CardTitle>Предстоящие мероприятия</CardTitle>
                <CardDescription>События и встречи</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Список предстоящих мероприятий */}
              </CardContent>
            </Card>

            {/* Ваши навыки */}
            <Card>
              <CardHeader>
                <CardTitle>Ваши навыки</CardTitle>
                <CardDescription>Текущий уровень</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Прогресс по навыкам */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>React</span>
                      <span className="text-muted-foreground">80%</span>
                    </div>
                    <AnimatedProgressBar value={80} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>TypeScript</span>
                      <span className="text-muted-foreground">65%</span>
                    </div>
                    <AnimatedProgressBar value={65} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Статистика активности */}
            <Card>
              <CardHeader>
                <CardTitle>Статистика активности</CardTitle>
                <CardDescription>За последний месяц</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Часов обучения</p>
                    <p className="text-2xl font-bold">24.5</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Выполнено задач</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RoleLayout>
  );
}
