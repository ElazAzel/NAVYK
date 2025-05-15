"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { motion } from "framer-motion";
import { 
  User, Mail, Phone, MapPin, Building, Calendar, 
  Edit, BookOpen, Briefcase, Star, 
  ChevronRight, Award, FileText, Github, Linkedin,
  PlusCircle, Users, MessageSquare, Eye, BarChart2,
  Save, Bell, GraduationCap, Shield, Trash, Upload,
  Library
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Progress } from "@/app/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";

// Типы данных
interface Skill {
  name: string;
  level: number; // 0-100
  category: "technical" | "soft" | "language";
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: "star" | "award" | "briefcase" | "book";
  type: "certificate" | "award" | "competition" | "course";
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  inProgress?: boolean;
  description?: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  phone?: string;
  location?: string;
  university?: string;
  faculty?: string;
  graduationYear?: string;
  specialization?: string;
  about?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  skills: Skill[];
  achievements: Achievement[];
  education: Education[];
  experience: Experience[];
}

export default function StudentProfilePage() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Данные студента
  const [student, setStudent] = useState({
    name: "Александр Петров",
    avatar: "/avatars/student1.jpg",
    bio: "Студент 3 курса факультета компьютерных наук. Увлекаюсь веб-разработкой и машинным обучением. Активно ищу возможности для стажировки в IT компаниях.",
    university: "Московский Государственный Университет",
    faculty: "Факультет компьютерных наук",
    year: 3,
    group: "КН-301",
    gpa: 4.7,
    email: "alex.petrov@student.msu.ru",
    phone: "+7 (900) 123-45-67",
    location: "Москва, Россия",
    skills: [
      { name: "JavaScript", level: "advanced" },
      { name: "React", level: "intermediate" },
      { name: "Python", level: "advanced" },
      { name: "Machine Learning", level: "beginner" },
      { name: "HTML/CSS", level: "advanced" },
      { name: "Node.js", level: "intermediate" },
      { name: "SQL", level: "intermediate" },
      { name: "Git", level: "intermediate" }
    ],
    languages: [
      { name: "Русский", level: "native" },
      { name: "Английский", level: "advanced" },
      { name: "Немецкий", level: "beginner" }
    ],
    interests: ["Веб-разработка", "Искусственный интеллект", "Мобильные приложения", "Компьютерная графика"],
    portfolioLinks: [
      { title: "GitHub", url: "https://github.com/alex-petrov" },
      { title: "Personal Website", url: "https://alexpetrov.dev" },
      { title: "LinkedIn", url: "https://linkedin.com/in/alex-petrov" }
    ]
  });

  // Настройки уведомлений
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    eventReminders: true,
    newAchievements: true,
    applicationStatus: true,
    messageAlerts: false
  });

  // Настройки приватности
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showSkills: true,
    showContact: false,
    allowMessages: true
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    // Здесь был бы API запрос для сохранения данных
  };

  // Получение цвета для уровня навыка
  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-blue-100 text-blue-800 border-blue-200";
      case "intermediate": return "bg-green-100 text-green-800 border-green-200";
      case "advanced": return "bg-purple-100 text-purple-800 border-purple-200";
      case "expert": return "bg-amber-100 text-amber-800 border-amber-200";
      case "native": return "bg-indigo-100 text-indigo-800 border-indigo-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Анимация для элементов
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <RoleLayout showSideNav={true} pageTitle="Профиль студента">
      <div className="container mx-auto space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <h1 className="text-3xl font-bold">Мой профиль</h1>
          <div className="flex gap-2">
            {editing ? (
              <Button onClick={handleSave} variant="default">
                <Save className="mr-2 h-4 w-4" />
                Сохранить
              </Button>
            ) : (
              <Button onClick={handleEditToggle} variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
              </Button>
            )}
          </div>
        </motion.div>

        <div>
          <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:max-w-2xl mb-6">
              <TabsTrigger value="personal">Личная информация</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="privacy">Приватность</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      {editing && (
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Загрузить фото
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Имя и фамилия</Label>
                          {editing ? (
                            <Input 
                              value={student.name} 
                              onChange={(e) => setStudent({...student, name: e.target.value})}
                            />
                          ) : (
                            <h2 className="text-2xl font-bold">{student.name}</h2>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Университет</Label>
                            {editing ? (
                              <Input 
                                value={student.university} 
                                onChange={(e) => setStudent({...student, university: e.target.value})}
                              />
                            ) : (
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{student.university}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Факультет</Label>
                            {editing ? (
                              <Input 
                                value={student.faculty} 
                                onChange={(e) => setStudent({...student, faculty: e.target.value})}
                              />
                            ) : (
                              <div className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{student.faculty}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Курс</Label>
                            {editing ? (
                              <Input 
                                type="number" 
                                value={student.year.toString()} 
                                onChange={(e) => setStudent({...student, year: parseInt(e.target.value)})}
                              />
                            ) : (
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{student.year} курс</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label>Группа</Label>
                            {editing ? (
                              <Input 
                                value={student.group} 
                                onChange={(e) => setStudent({...student, group: e.target.value})}
                              />
                            ) : (
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span>{student.group}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>О себе</Label>
                        {editing ? (
                          <Textarea 
                            rows={5} 
                            value={student.bio} 
                            onChange={(e) => setStudent({...student, bio: e.target.value})}
                          />
                        ) : (
                          <p className="text-muted-foreground">{student.bio}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Контактная информация</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            {editing ? (
                              <Input 
                                value={student.email} 
                                onChange={(e) => setStudent({...student, email: e.target.value})}
                              />
                            ) : (
                              <span>{student.email}</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            {editing ? (
                              <Input 
                                value={student.phone} 
                                onChange={(e) => setStudent({...student, phone: e.target.value})}
                              />
                            ) : (
                              <span>{student.phone}</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            {editing ? (
                              <Input 
                                value={student.location} 
                                onChange={(e) => setStudent({...student, location: e.target.value})}
                              />
                            ) : (
                              <span>{student.location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Навыки</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className={getSkillLevelColor(skill.level)}>
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Добавить навык
                    </Button>
                  )}
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Языки</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className={getSkillLevelColor(language.level)}>
                        {language.name}
                      </Badge>
                    ))}
                  </div>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Добавить язык
                    </Button>
                  )}
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Интересы</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary hover:bg-secondary/30">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Добавить интерес
                    </Button>
                  )}
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">Портфолио и ссылки</h3>
                  <div className="space-y-2">
                    {student.portfolioLinks.map((link, index) => (
                      <div key={index} className="flex justify-between items-center p-2 rounded-md border hover:bg-muted">
                        <span>{link.title}</span>
                        <div className="flex items-center gap-2">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {link.url}
                          </a>
                          {editing && (
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {editing && (
                    <Button variant="outline" size="sm" className="mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Добавить ссылку
                    </Button>
                  )}
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="notifications">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-6">Настройки уведомлений</h3>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Library className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Обновления курсов</h4>
                          <p className="text-sm text-muted-foreground">Уведомления о новых материалах, заданиях и оценках</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.courseUpdates}
                        onCheckedChange={(checked) => setNotifications({...notifications, courseUpdates: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Напоминания о мероприятиях</h4>
                          <p className="text-sm text-muted-foreground">Уведомления о предстоящих мероприятиях, на которые вы зарегистрированы</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => setNotifications({...notifications, eventReminders: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Новые достижения</h4>
                          <p className="text-sm text-muted-foreground">Уведомления о разблокированных достижениях и наградах</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.newAchievements}
                        onCheckedChange={(checked) => setNotifications({...notifications, newAchievements: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Статус заявок</h4>
                          <p className="text-sm text-muted-foreground">Уведомления об изменении статуса ваших заявок на вакансии</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.applicationStatus}
                        onCheckedChange={(checked) => setNotifications({...notifications, applicationStatus: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Сообщения и комментарии</h4>
                          <p className="text-sm text-muted-foreground">Уведомления о новых сообщениях и комментариях к вашим активностям</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notifications.messageAlerts}
                        onCheckedChange={(checked) => setNotifications({...notifications, messageAlerts: checked})}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="privacy">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-6">Настройки приватности</h3>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Видимость профиля</h4>
                          <p className="text-sm text-muted-foreground">Разрешить работодателям и представителям университета видеть ваш профиль</p>
                        </div>
                      </div>
                      <Switch 
                        checked={privacy.showProfile}
                        onCheckedChange={(checked) => setPrivacy({...privacy, showProfile: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <BarChart2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Видимость навыков</h4>
                          <p className="text-sm text-muted-foreground">Показывать ваши навыки и уровень их владения в публичном профиле</p>
                        </div>
                      </div>
                      <Switch 
                        checked={privacy.showSkills}
                        onCheckedChange={(checked) => setPrivacy({...privacy, showSkills: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Видимость контактов</h4>
                          <p className="text-sm text-muted-foreground">Разрешить доступ к вашим контактным данным (email, телефон)</p>
                        </div>
                      </div>
                      <Switch 
                        checked={privacy.showContact}
                        onCheckedChange={(checked) => setPrivacy({...privacy, showContact: checked})}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Получение сообщений</h4>
                          <p className="text-sm text-muted-foreground">Разрешить другим пользователям отправлять вам сообщения</p>
                        </div>
                      </div>
                      <Switch 
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RoleLayout>
  );
} 