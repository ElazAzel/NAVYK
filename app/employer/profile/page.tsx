"use client";

import React, { useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Building, MapPin, Globe, Users, Mail, Phone, 
  Edit, Save, Upload, Trash, Bell, Eye, 
  Shield, MessageSquare, Calendar
} from "lucide-react";

export default function EmployerProfilePage() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("company");

  // Данные компании
  const [company, setCompany] = useState({
    name: "ТехноИнновации",
    logo: "/companies/technoinnovations.png",
    industry: "Информационные технологии",
    size: "250-500 сотрудников",
    founded: "2010",
    website: "https://technoinnovations.ru",
    location: "Москва, Россия",
    about: "ТехноИнновации - ведущая российская IT компания, специализирующаяся на разработке инновационных программных решений для бизнеса. Наша миссия - создавать технологии, которые делают бизнес эффективнее.",
    mission: "Создаем технологии, которые меняют будущее",
    values: ["Инновации", "Командная работа", "Профессионализм", "Клиентоориентированность"],
    benefits: ["Гибкий график", "Медицинская страховка", "Профессиональное развитие", "Корпоративные мероприятия"],
    contact: {
      email: "hr@technoinnovations.ru",
      phone: "+7 (495) 123-45-67",
      hr: "Анна Смирнова"
    }
  });

  // Уведомления
  const [notifications, setNotifications] = useState({
    newApplications: true,
    messageAlerts: true,
    eventReminders: true,
    reportUpdates: false,
    newsletterUpdates: true
  });

  // Приватность
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showContactInfo: true,
    allowMessages: true,
    showStatistics: false
  });

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    setEditing(false);
    // Здесь был бы API запрос для сохранения данных
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <RoleLayout showSideNav={true} pageTitle="Профиль компании">
      <div className="container mx-auto py-6 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Профиль компании</h1>
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

        <Tabs defaultValue="company" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mb-6">
            <TabsTrigger value="company">О компании</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="privacy">Приватность</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>{company.name[0]}</AvatarFallback>
                    </Avatar>
                    {editing && (
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Загрузить логотип
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Название компании</Label>
                        {editing ? (
                          <Input 
                            value={company.name} 
                            onChange={(e) => setCompany({...company, name: e.target.value})}
                          />
                        ) : (
                          <h2 className="text-2xl font-bold">{company.name}</h2>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Отрасль</Label>
                          {editing ? (
                            <Input 
                              value={company.industry} 
                              onChange={(e) => setCompany({...company, industry: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{company.industry}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Размер компании</Label>
                          {editing ? (
                            <Input 
                              value={company.size} 
                              onChange={(e) => setCompany({...company, size: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{company.size}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Местоположение</Label>
                          {editing ? (
                            <Input 
                              value={company.location} 
                              onChange={(e) => setCompany({...company, location: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{company.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Веб-сайт</Label>
                          {editing ? (
                            <Input 
                              value={company.website} 
                              onChange={(e) => setCompany({...company, website: e.target.value})}
                            />
                          ) : (
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                              <a href={company.website} className="text-blue-600 hover:underline">
                                {company.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>О компании</Label>
                      {editing ? (
                        <Textarea 
                          rows={5} 
                          value={company.about} 
                          onChange={(e) => setCompany({...company, about: e.target.value})}
                        />
                      ) : (
                        <p className="text-muted-foreground">{company.about}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Контактная информация</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {editing ? (
                            <Input 
                              value={company.contact.email} 
                              onChange={(e) => setCompany({
                                ...company, 
                                contact: {...company.contact, email: e.target.value}
                              })}
                            />
                          ) : (
                            <span>{company.contact.email}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {editing ? (
                            <Input 
                              value={company.contact.phone} 
                              onChange={(e) => setCompany({
                                ...company, 
                                contact: {...company.contact, phone: e.target.value}
                              })}
                            />
                          ) : (
                            <span>{company.contact.phone}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                          {editing ? (
                            <Input 
                              value={company.contact.hr} 
                              onChange={(e) => setCompany({
                                ...company, 
                                contact: {...company.contact, hr: e.target.value}
                              })}
                            />
                          ) : (
                            <span>HR: {company.contact.hr}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Ценности компании</h3>
                  <div className="space-y-4">
                    {editing ? (
                      <div className="space-y-4">
                        <Label>Миссия компании</Label>
                        <Input 
                          value={company.mission} 
                          onChange={(e) => setCompany({...company, mission: e.target.value})}
                        />
                        <Label>Ценности (через запятую)</Label>
                        <Input 
                          value={company.values.join(", ")} 
                          onChange={(e) => setCompany({
                            ...company, 
                            values: e.target.value.split(",").map(v => v.trim())
                          })}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="italic text-muted-foreground mb-4">&ldquo;{company.mission}&rdquo;</div>
                        <div className="flex flex-wrap gap-2">
                          {company.values.map((value, index) => (
                            <Badge key={index} variant="secondary">{value}</Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Преимущества работы</h3>
                  {editing ? (
                    <div className="space-y-4">
                      <Label>Преимущества (через запятую)</Label>
                      <Input 
                        value={company.benefits.join(", ")} 
                        onChange={(e) => setCompany({
                          ...company, 
                          benefits: e.target.value.split(",").map(b => b.trim())
                        })}
                      />
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {company.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Настройка уведомлений</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Новые заявки на вакансии</h4>
                      <p className="text-sm text-muted-foreground">Получать уведомления о новых заявках на ваши вакансии</p>
                    </div>
                    <Switch 
                      checked={notifications.newApplications} 
                      onCheckedChange={(checked) => setNotifications({...notifications, newApplications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Сообщения от студентов</h4>
                      <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях от студентов</p>
                    </div>
                    <Switch 
                      checked={notifications.messageAlerts} 
                      onCheckedChange={(checked) => setNotifications({...notifications, messageAlerts: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Напоминания о мероприятиях</h4>
                      <p className="text-sm text-muted-foreground">Получать напоминания о предстоящих мероприятиях</p>
                    </div>
                    <Switch 
                      checked={notifications.eventReminders} 
                      onCheckedChange={(checked) => setNotifications({...notifications, eventReminders: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Обновления отчетов</h4>
                      <p className="text-sm text-muted-foreground">Получать уведомления об обновлениях аналитических отчетов</p>
                    </div>
                    <Switch 
                      checked={notifications.reportUpdates} 
                      onCheckedChange={(checked) => setNotifications({...notifications, reportUpdates: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Новости платформы</h4>
                      <p className="text-sm text-muted-foreground">Получать информацию о новых функциях и обновлениях платформы</p>
                    </div>
                    <Switch 
                      checked={notifications.newsletterUpdates} 
                      onCheckedChange={(checked) => setNotifications({...notifications, newsletterUpdates: checked})}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Настройки приватности</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Публичный профиль</h4>
                      <p className="text-sm text-muted-foreground">Сделать профиль компании видимым для студентов и университетов</p>
                    </div>
                    <Switch 
                      checked={privacy.publicProfile} 
                      onCheckedChange={(checked) => setPrivacy({...privacy, publicProfile: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Показывать контактную информацию</h4>
                      <p className="text-sm text-muted-foreground">Разрешить студентам видеть контактные данные компании</p>
                    </div>
                    <Switch 
                      checked={privacy.showContactInfo} 
                      onCheckedChange={(checked) => setPrivacy({...privacy, showContactInfo: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Разрешить сообщения</h4>
                      <p className="text-sm text-muted-foreground">Разрешить студентам отправлять сообщения напрямую</p>
                    </div>
                    <Switch 
                      checked={privacy.allowMessages} 
                      onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Делиться статистикой</h4>
                      <p className="text-sm text-muted-foreground">Показывать статистику компании университетам-партнерам</p>
                    </div>
                    <Switch 
                      checked={privacy.showStatistics} 
                      onCheckedChange={(checked) => setPrivacy({...privacy, showStatistics: checked})}
                    />
                  </div>
                </div>
              </Card>

              <div className="mt-6 flex justify-between items-center">
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    <Shield className="mr-2 h-4 w-4" />
                    Политика конфиденциальности
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Предпросмотр профиля
                  </Button>
                </div>
                
                <Button variant="destructive" size="sm">
                  <Trash className="mr-2 h-4 w-4" />
                  Очистить данные профиля
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Связаться с поддержкой
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              История изменений
            </Button>
          </div>
          
          {editing && (
            <Button variant="default" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Сохранить изменения
            </Button>
          )}
        </div>
      </div>
    </RoleLayout>
  );
} 