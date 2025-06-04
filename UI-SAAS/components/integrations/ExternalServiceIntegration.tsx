"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, X, Lock, Globe, Database, Share2, Linkedin, Github, FileCode, MessageSquare, BookOpen, Server } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// Интерфейс для сервисной интеграции
interface ServiceIntegration {
  id: string;
  name: string;
  description: string;
  category: "career" | "education" | "communication" | "analytics" | "development";
  connected: boolean;
  icon: React.ReactNode;
  status: "active" | "pending" | "error" | "disconnected";
  permissions: string[];
  lastSync?: string;
  popular?: boolean;
}

// Мок-данные интеграций
const availableIntegrations: ServiceIntegration[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Синхронизация профиля, навыков и опыта работы с LinkedIn",
    category: "career",
    connected: true,
    icon: <Linkedin className="h-6 w-6" />,
    status: "active",
    permissions: ["Чтение профиля", "Чтение навыков", "Чтение опыта работы"],
    lastSync: "12.05.2023, 15:30",
    popular: true
  },
  {
    id: "github",
    name: "GitHub",
    description: "Импорт проектов, репозиториев и активности с GitHub",
    category: "development",
    connected: true,
    icon: <Github className="h-6 w-6" />,
    status: "active",
    permissions: ["Чтение репозиториев", "Чтение профиля", "Webhooks"],
    lastSync: "10.05.2023, 12:15",
    popular: true
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Получение уведомлений в Telegram о новых курсах и вакансиях",
    category: "communication",
    connected: false,
    icon: <MessageSquare className="h-6 w-6" />,
    status: "disconnected",
    permissions: ["Отправка сообщений"]
  },
  {
    id: "coursera",
    name: "Coursera",
    description: "Импорт пройденных курсов и сертификатов с Coursera",
    category: "education",
    connected: false,
    icon: <BookOpen className="h-6 w-6" />,
    status: "disconnected",
    permissions: ["Чтение курсов", "Чтение сертификатов"]
  },
  {
    id: "bamboohr",
    name: "BambooHR",
    description: "Интеграция с системой управления персоналом BambooHR",
    category: "career",
    connected: true,
    icon: <Database className="h-6 w-6" />,
    status: "error",
    permissions: ["Чтение сотрудников", "Запись кандидатов", "Чтение вакансий"],
    lastSync: "05.05.2023, 09:45"
  },
  {
    id: "workable",
    name: "Workable",
    description: "Интеграция с платформой подбора персонала Workable",
    category: "career",
    connected: false,
    icon: <Server className="h-6 w-6" />,
    status: "disconnected",
    permissions: ["Чтение вакансий", "Запись кандидатов"]
  },
  {
    id: "googleanalytics",
    name: "Google Analytics",
    description: "Интеграция с аналитическим сервисом Google Analytics",
    category: "analytics",
    connected: false,
    icon: <Globe className="h-6 w-6" />,
    status: "disconnected",
    permissions: ["Чтение данных"]
  },
  {
    id: "notion",
    name: "Notion",
    description: "Интеграция с Notion для управления заметками и документами",
    category: "communication",
    connected: false,
    icon: <FileCode className="h-6 w-6" />,
    status: "disconnected",
    permissions: ["Чтение страниц", "Запись страниц"]
  }
];

export default function ExternalServiceIntegration() {
  const [integrations, setIntegrations] = useState<ServiceIntegration[]>(availableIntegrations);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Обработчик переключения интеграции
  const toggleIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              connected: !integration.connected,
              status: !integration.connected ? "active" : "disconnected",
              lastSync: !integration.connected ? new Date().toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : undefined
            } 
          : integration
      )
    );
  };
  
  // Фильтрация интеграций по категории
  const filteredIntegrations = integrations.filter(integration => 
    activeCategory === "all" || integration.category === activeCategory
  );
  
  // Получение статуса интеграции
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "active":
        return { color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20", text: "Подключено" };
      case "pending":
        return { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", text: "Ожидание" };
      case "error":
        return { color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", text: "Ошибка" };
      default:
        return { color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-900/20", text: "Отключено" };
    }
  };
  
  // Получение иконки для категории
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "career":
        return <Linkedin className="h-4 w-4" />;
      case "education":
        return <BookOpen className="h-4 w-4" />;
      case "communication":
        return <MessageSquare className="h-4 w-4" />;
      case "analytics":
        return <Database className="h-4 w-4" />;
      case "development":
        return <Github className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };
  
  // Получение текста для категории
  const getCategoryText = (category: string) => {
    switch (category) {
      case "career":
        return "Карьера";
      case "education":
        return "Образование";
      case "communication":
        return "Коммуникации";
      case "analytics":
        return "Аналитика";
      case "development":
        return "Разработка";
      default:
        return "Все";
    }
  };
  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-1">Интеграции с внешними сервисами</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Подключите внешние сервисы для расширения возможностей платформы
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Запросить новую интеграцию
        </Button>
      </div>
      
      <Alert className="mb-6">
        <Lock className="h-4 w-4" />
        <AlertTitle>Безопасность данных</AlertTitle>
        <AlertDescription>
          Все интеграции используют безопасные протоколы авторизации (OAuth 2.0) и запрашивают только необходимые разрешения.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Все
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            Карьера
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Образование
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Коммуникации
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Аналитика
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            Разработка
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`h-full ${
                  integration.status === "error" ? "border-red-200 dark:border-red-900" : ""
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${
                          integration.connected 
                            ? "bg-indigo-100 dark:bg-indigo-900/30" 
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}>
                          {integration.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {integration.name}
                            {integration.popular && (
                              <Badge variant="outline" className="ml-1 text-xs font-normal">
                                Популярное
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center mt-1">
                            <Badge variant="outline" className={`
                              flex items-center gap-1 text-xs font-normal
                              ${getStatusInfo(integration.status).bg}
                              ${getStatusInfo(integration.status).color}
                            `}>
                              {integration.status === "active" ? <Check className="h-3 w-3" /> : 
                               integration.status === "error" ? <X className="h-3 w-3" /> : null}
                              {getStatusInfo(integration.status).text}
                            </Badge>
                            <Badge variant="outline" className="ml-2 text-xs font-normal">
                              {getCategoryIcon(integration.category)}
                              <span className="ml-1">{getCategoryText(integration.category)}</span>
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Switch 
                          checked={integration.connected}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {integration.description}
                    </p>
                    
                    {integration.connected && (
                      <>
                        <Separator className="my-3" />
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Последняя синхронизация:</span>
                            <span>{integration.lastSync}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Разрешения:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {integration.permissions.map(permission => (
                                <Badge key={permission} variant="secondary" className="text-xs font-normal">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      variant={integration.connected ? "outline" : "default"} 
                      size="sm"
                      className="w-full text-sm"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      {integration.connected ? (
                        <>Отключить</>
                      ) : (
                        <>
                          Подключить
                          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="pt-6">
        <h3 className="text-lg font-semibold mb-2">Интеграции API</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Используйте наш API для интеграции с собственными системами и сервисами
        </p>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h4 className="font-medium mb-1">REST API</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Полный доступ к данным через REST API с JWT-аутентификацией
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <FileCode className="h-4 w-4" />
                Документация API
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 