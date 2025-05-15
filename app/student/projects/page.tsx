"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Separator } from "@/app/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { 
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Users,
  Tag,
  ExternalLink,
  ChevronRight,
  Star,
  StarOff
} from "lucide-react";
import Link from "next/link";
import PageLayout from "@/app/components/PageLayout";

// Типы данных
interface ProjectMember {
  id: string;
  name: string;
  avatarUrl: string | null;
  role: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  tags: string[];
  startDate: string;
  endDate: string | null;
  status: "in_progress" | "completed" | "planned";
  progress: number;
  members: ProjectMember[];
  repositoryUrl?: string;
  demoUrl?: string;
  isFavorite: boolean;
}

// Мок-данные для проектов
const ACTIVE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Разработка библиотеки компонентов UI",
    description: "Создание набора переиспользуемых компонентов UI с использованием React и TypeScript. Библиотека должна поддерживать темизацию и быть документирована с помощью Storybook.",
    thumbnailUrl: null,
    tags: ["React", "TypeScript", "UI/UX"],
    startDate: "2023-10-15",
    endDate: null,
    status: "in_progress",
    progress: 65,
    members: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", role: "Тимлид" },
      { id: "u2", name: "Елена Петрова", avatarUrl: null, role: "UI дизайнер" },
      { id: "u3", name: "Дамир Нугманов", avatarUrl: null, role: "Разработчик" }
    ],
    repositoryUrl: "https://github.com/example/ui-library",
    isFavorite: true
  },
  {
    id: "2",
    title: "Мобильное приложение для отслеживания активности",
    description: "Разработка нативного мобильного приложения для отслеживания физической активности пользователей. Включает в себя интеграцию с API для шагомера и GPS.",
    thumbnailUrl: null,
    tags: ["Mobile", "React Native", "API"],
    startDate: "2023-11-20",
    endDate: null,
    status: "in_progress",
    progress: 30,
    members: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", role: "Разработчик" },
      { id: "u4", name: "Марат Исенов", avatarUrl: null, role: "Тимлид" }
    ],
    repositoryUrl: "https://github.com/example/fitness-app",
    isFavorite: false
  }
];

const COMPLETED_PROJECTS: Project[] = [
  {
    id: "3",
    title: "Веб-сайт для образовательного центра",
    description: "Разработка информационного сайта для образовательного центра с функционалом записи на курсы и личным кабинетом для студентов.",
    thumbnailUrl: null,
    tags: ["Web", "JavaScript", "Node.js"],
    startDate: "2023-07-10",
    endDate: "2023-09-20",
    status: "completed",
    progress: 100,
    members: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", role: "Фронтенд разработчик" },
      { id: "u5", name: "Айдана Бекова", avatarUrl: null, role: "Бэкенд разработчик" }
    ],
    repositoryUrl: "https://github.com/example/education-center",
    demoUrl: "https://edu-center-demo.example.com",
    isFavorite: true
  }
];

const PLANNED_PROJECTS: Project[] = [
  {
    id: "4",
    title: "Система управления лабораторными работами",
    description: "Разработка системы для автоматизации процесса выполнения и проверки лабораторных работ для кафедры информационных технологий.",
    thumbnailUrl: null,
    tags: ["Web", "Python", "Django"],
    startDate: "2023-12-15",
    endDate: null,
    status: "planned",
    progress: 0,
    members: [
      { id: "u1", name: "Алмас Сериков", avatarUrl: "/avatars/student1.jpg", role: "Разработчик" }
    ],
    isFavorite: false
  }
];

// Вспомогательные функции
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Компонент карточки проекта
const ProjectCard = ({ project, onToggleFavorite }: { project: Project, onToggleFavorite: (id: string) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(project.id)}
              className="h-8 w-8"
            >
              {project.isFavorite ? (
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
              ) : (
                <StarOff className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {project.description}
          </p>
          
          {project.status !== "planned" && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Прогресс</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          )}
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(project.startDate)}
              {project.endDate && ` - ${formatDate(project.endDate)}`}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {project.members.slice(0, 3).map((member, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatarUrl || undefined} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {idx === 0 && (
                  <span className="text-xs">{member.role}</span>
                )}
              </div>
            ))}
            {project.members.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/student/projects/${project.id}`}>
                Детали
              </Link>
            </Button>
            <div className="flex gap-2">
              {project.repositoryUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Репозиторий
                  </a>
                </Button>
              )}
              {project.demoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Демо
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Основной компонент страницы
export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjects, setActiveProjects] = useState<Project[]>(ACTIVE_PROJECTS);
  const [completedProjects, setCompletedProjects] = useState<Project[]>(COMPLETED_PROJECTS);
  const [plannedProjects, setPlannedProjects] = useState<Project[]>(PLANNED_PROJECTS);
  
  // Обработчик для добавления/удаления из избранного
  const handleToggleFavorite = (projectId: string) => {
    // Обновление активных проектов
    setActiveProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, isFavorite: !project.isFavorite } 
          : project
      )
    );
    
    // Обновление завершенных проектов
    setCompletedProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, isFavorite: !project.isFavorite } 
          : project
      )
    );
    
    // Обновление запланированных проектов
    setPlannedProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === projectId 
          ? { ...project, isFavorite: !project.isFavorite } 
          : project
      )
    );
  };
  
  // Фильтрация проектов по поисковому запросу
  const filteredActiveProjects = activeProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredCompletedProjects = completedProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredPlannedProjects = plannedProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Избранные проекты
  const favoriteProjects = [
    ...activeProjects.filter(p => p.isFavorite),
    ...completedProjects.filter(p => p.isFavorite),
    ...plannedProjects.filter(p => p.isFavorite)
  ];
  
  const filteredFavoriteProjects = favoriteProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Мои проекты</h1>
          <p className="text-muted-foreground">
            Управляйте учебными и исследовательскими проектами, отслеживайте прогресс и сотрудничайте с другими студентами
          </p>
        </div>
        
        {/* Поиск и фильтры */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск проектов..."
              className="w-full pl-10 pr-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Фильтры</span>
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Новый проект</span>
            </Button>
          </div>
        </div>
        
        {/* Табы с проектами */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="planned">Запланированные</TabsTrigger>
            <TabsTrigger value="completed">Завершенные</TabsTrigger>
            <TabsTrigger value="favorites">Избранные</TabsTrigger>
          </TabsList>
          
          {/* Активные проекты */}
          <TabsContent value="active" className="mt-0">
            {filteredActiveProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActiveProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Активных проектов не найдено</h3>
                {searchQuery ? (
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                ) : (
                  <div className="mt-4">
                    <Button>Создать новый проект</Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Запланированные проекты */}
          <TabsContent value="planned" className="mt-0">
            {filteredPlannedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlannedProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Запланированных проектов не найдено</h3>
                {searchQuery ? (
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                ) : (
                  <div className="mt-4">
                    <Button>Запланировать новый проект</Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Завершенные проекты */}
          <TabsContent value="completed" className="mt-0">
            {filteredCompletedProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompletedProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Завершенных проектов не найдено</h3>
                {searchQuery ? (
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                ) : (
                  <p className="text-muted-foreground">У вас пока нет завершенных проектов</p>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Избранные проекты */}
          <TabsContent value="favorites" className="mt-0">
            {filteredFavoriteProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFavoriteProjects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onToggleFavorite={handleToggleFavorite} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Избранных проектов не найдено</h3>
                {searchQuery ? (
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                ) : (
                  <p className="text-muted-foreground">
                    Добавляйте проекты в избранное, нажимая на звездочку в карточке проекта
                  </p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Рекомендуемые проекты */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Рекомендуемые проекты</h2>
            <Button variant="link" className="flex items-center gap-1">
              <span>Все рекомендации</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Рекомендуемый проект 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full flex flex-col border-blue-200">
                <CardHeader className="pb-2 bg-blue-50 dark:bg-blue-950/20">
                  <Badge className="w-fit mb-2" variant="outline">Рекомендовано</Badge>
                  <CardTitle className="text-xl">Разработка NLP-сервиса для анализа текстов</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="font-normal">Python</Badge>
                    <Badge variant="secondary" className="font-normal">Machine Learning</Badge>
                    <Badge variant="secondary" className="font-normal">API</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    Проект по разработке API для анализа текстовых данных с использованием методов обработки естественного языка и машинного обучения.
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">Командный</Badge>
                    <Badge variant="outline">Соответствует вашим навыкам</Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Примерная длительность: 2 месяца</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Требуется 3-4 участника</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full">Присоединиться к проекту</Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Рекомендуемый проект 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="h-full flex flex-col border-green-200">
                <CardHeader className="pb-2 bg-green-50 dark:bg-green-950/20">
                  <Badge className="w-fit mb-2" variant="outline">Рекомендовано</Badge>
                  <CardTitle className="text-xl">Разработка экологического приложения</CardTitle>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="font-normal">Mobile</Badge>
                    <Badge variant="secondary" className="font-normal">React Native</Badge>
                    <Badge variant="secondary" className="font-normal">Maps API</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    Создание мобильного приложения для отслеживания экологической ситуации в городе, с возможностью отмечать проблемные зоны на карте.
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">Индивидуальный/Командный</Badge>
                    <Badge variant="outline">Для начинающих</Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Примерная длительность: 3 месяца</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Возможен зачет по предмету &ldquo;Мобильная разработка&rdquo;</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full">Подробнее о проекте</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 