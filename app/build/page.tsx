"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserIcon, AcademicCapIcon, BuildingOfficeIcon, UserGroupIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

interface RolePageLink {
  role: string;
  title: string;
  icon: React.ReactNode;
  links: Array<{
    url: string;
    title: string;
    description: string;
  }>;
  color: string;
}

export default function BuildPage() {
  const rolePages: RolePageLink[] = [
    {
      role: "student",
      title: "Студент",
      icon: <UserIcon className="h-5 w-5" />,
      links: [
        {
          url: "/student/profile",
          title: "Профиль студента",
          description: "Личный профиль и карьерный план студента"
        }
      ],
      color: "bg-blue-500"
    },
    {
      role: "employer",
      title: "Работодатель",
      icon: <BuildingOfficeIcon className="h-5 w-5" />,
      links: [
        {
          url: "/employer/dashboard",
          title: "Дашборд работодателя",
          description: "Аналитика и управление вакансиями"
        }
      ],
      color: "bg-purple-500"
    },
    {
      role: "university",
      title: "Университет",
      icon: <AcademicCapIcon className="h-5 w-5" />,
      links: [
        {
          url: "/university/dashboard",
          title: "Дашборд университета",
          description: "Управление образовательными программами"
        }
      ],
      color: "bg-indigo-500"
    },
    {
      role: "mentor",
      title: "Ментор",
      icon: <UserGroupIcon className="h-5 w-5" />,
      links: [
        {
          url: "/mentor/dashboard",
          title: "Дашборд ментора",
          description: "Управление сессиями и отзывами студентов"
        }
      ],
      color: "bg-rose-500"
    },
    {
      role: "admin",
      title: "Администратор",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      links: [
        {
          url: "/admin/dashboard",
          title: "Панель администратора",
          description: "Управление пользователями и настройками платформы"
        }
      ],
      color: "bg-green-500"
    }
  ];

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold mb-4">NAVYK - Сборка проекта</h1>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
          Сборка успешно выполнена. Ниже представлены ссылки на все демо-страницы разных ролей для удобного тестирования.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">Главная страница</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/build">Страница сборки</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rolePages.map((rolePage) => (
          <Card key={rolePage.role} className="overflow-hidden">
            <CardHeader className={`${rolePage.color} text-white`}>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-md">
                  {rolePage.icon}
                </div>
                <CardTitle>{rolePage.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {rolePage.links.map((link, index) => (
                  <div key={index} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="text-lg font-medium mb-1">{link.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{link.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link href={link.url}>
                        Открыть страницу
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Badge variant="outline">{rolePage.links.length} {rolePage.links.length === 1 ? 'страница' : 'страницы'}</Badge>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${rolePage.role}/dashboard`}>
                  Перейти к основной странице
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Версия 1.0.0 • Сборка от {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 
