"use client";

import React from "react";
import RoleLayout from "@/components/RoleLayout";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { 
  Building, 
  MapPin, 
  Users, 
  GraduationCap, 
  Award, 
  Calendar, 
  Globe, 
  Mail, 
  Phone, 
  FileEdit, 
  Share2, 
  ExternalLink
} from "lucide-react";

// Типы данных
interface UniversityInfo {
  name: string;
  shortName: string;
  logo: string;
  coverImage: string;
  description: string;
  foundedYear: number;
  location: string;
  address: string;
  website: string;
  email: string;
  phone: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  stats: {
    students: number;
    faculties: number;
    professors: number;
    courses: number;
    partners: number;
    rating: number;
  };
  accreditations: string[];
  facts: {
    title: string;
    description: string;
  }[];
}

// Данные университета (в реальном приложении должны загружаться с сервера)
const universityInfo: UniversityInfo = {
  name: "Казахский Национальный Университет им. аль-Фараби",
  shortName: "КазНУ",
  logo: "/logos/kaznu-logo.png",
  coverImage: "/images/university-cover.jpg",
  description: "Казахский национальный университет имени аль-Фараби — ведущее многопрофильное высшее учебное заведение Казахстана, один из старейших и крупнейших университетов в Центральной Азии. Основан в 1934 году. Университет предлагает широкий спектр программ обучения и исследований, поддерживает международные партнерства и стремится к инновациям в образовании.",
  foundedYear: 1934,
  location: "Алматы, Казахстан",
  address: "пр. аль-Фараби, 71, Алматы, 050040",
  website: "https://www.kaznu.kz",
  email: "info@kaznu.kz",
  phone: "+7 (727) 377-33-33",
  socialLinks: {
    facebook: "https://facebook.com/kaznu",
    twitter: "https://twitter.com/kaznuofficial",
    instagram: "https://instagram.com/kaznu_official",
    linkedin: "https://linkedin.com/school/kaznu"
  },
  stats: {
    students: 25000,
    faculties: 16,
    professors: 2500,
    courses: 450,
    partners: 120,
    rating: 4.8
  },
  accreditations: [
    "Министерство образования и науки Республики Казахстан",
    "Независимое агентство по обеспечению качества в образовании (НАОКО)",
    "Независимое агентство аккредитации и рейтинга (НААР)"
  ],
  facts: [
    {
      title: "Международное сотрудничество",
      description: "Университет сотрудничает с более чем 400 университетами и научными центрами из 50 стран мира."
    },
    {
      title: "Исследовательская деятельность",
      description: "КазНУ является ведущим научно-исследовательским центром Казахстана с более чем 20 исследовательскими институтами и центрами."
    },
    {
      title: "Инфраструктура",
      description: "Университетский городок включает 14 учебных корпусов, научную библиотеку, студенческие общежития, спортивные комплексы и культурные центры."
    }
  ]
};

// Анимация
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function UniversityProfilePage() {
  return (
    <RoleLayout pageTitle="Профиль университета">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        {/* Обложка и основная информация */}
        <motion.div variants={item} className="relative rounded-lg overflow-hidden h-48 md:h-64 bg-muted">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10"></div>
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4">
            <Avatar className="h-16 w-16 md:h-24 md:w-24 border-4 border-white">
              <AvatarImage src={universityInfo.logo} alt={universityInfo.name} />
              <AvatarFallback>{universityInfo.shortName}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white">{universityInfo.name}</h1>
              <p className="text-white/90 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{universityInfo.location}</span>
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <Share2 className="h-4 w-4 mr-1" />
              <span>Поделиться</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
              <FileEdit className="h-4 w-4 mr-1" />
              <span>Редактировать</span>
            </Button>
          </div>
        </motion.div>
        
        {/* Основная информация и статистика */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - Основная информация */}
          <motion.div variants={item} className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>О университете</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{universityInfo.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Год основания</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.foundedYear}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Количество студентов</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.stats.students.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Факультеты</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.stats.faculties}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Преподаватели</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.stats.professors.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Курсы и программы</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.stats.courses}+</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Партнеры</p>
                      <p className="text-sm text-muted-foreground">{universityInfo.stats.partners}+ компаний и организаций</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Достижения и факты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Аккредитации</h3>
                  <div className="flex flex-wrap gap-2">
                    {universityInfo.accreditations.map((accreditation, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {accreditation}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Интересные факты</h3>
                  <div className="space-y-4">
                    {universityInfo.facts.map((fact, index) => (
                      <div key={index} className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-1">{fact.title}</h4>
                        <p className="text-sm text-muted-foreground">{fact.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Правая колонка - Контактная информация и статистика */}
          <motion.div variants={item} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Адрес</p>
                    <p className="text-sm text-muted-foreground">{universityInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{universityInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Телефон</p>
                    <p className="text-sm text-muted-foreground">{universityInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Веб-сайт</p>
                    <a 
                      href={universityInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {universityInfo.website}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Показать на карте
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Рейтинги и статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg text-center">
                  <h3 className="text-4xl font-bold text-primary">{universityInfo.stats.rating}</h3>
                  <p className="text-sm text-muted-foreground">Общий рейтинг</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Национальный рейтинг</span>
                    <Badge>#1</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">QS World University Rankings</span>
                    <Badge>Топ 200</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Times Higher Education</span>
                    <Badge>Топ 500</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">16</p>
                    <p className="text-xs text-muted-foreground">Факультетов</p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">450+</p>
                    <p className="text-xs text-muted-foreground">Курсов</p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">25K+</p>
                    <p className="text-xs text-muted-foreground">Студентов</p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold">120+</p>
                    <p className="text-xs text-muted-foreground">Партнеров</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Быстрые ссылки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/university/students">
                    <Users className="h-4 w-4 mr-2" />
                    Управление студентами
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/university/analytics">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Аналитика
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/university/events">
                    <Calendar className="h-4 w-4 mr-2" />
                    Мероприятия
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/university/partnerships">
                    <Building className="h-4 w-4 mr-2" />
                    Партнерства
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </RoleLayout>
  );
} 