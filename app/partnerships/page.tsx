"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  BookOpen,
  Handshake,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  Briefcase
} from "lucide-react";

export default function PartnershipsPage() {
  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Программы партнерства для компаний
  const companyPrograms = [
    {
      id: "talent_recruitment",
      title: "Поиск талантов",
      description: "Получите доступ к базе талантливых студентов, которые соответствуют вашим требованиям и корпоративной культуре.",
      benefits: [
        "Доступ к резюме студентов с соответствующими навыками",
        "Проведение целевых мероприятий по рекрутингу",
        "Аналитика взаимодействия студентов с вашими вакансиями",
        "Формирование кадрового резерва из перспективных студентов"
      ],
      icon: <Users className="h-12 w-12 text-blue-500" />
    },
    {
      id: "educational_programs",
      title: "Образовательные программы",
      description: "Разрабатывайте и проводите совместные образовательные программы с университетами для подготовки будущих специалистов.",
      benefits: [
        "Совместные программы обучения с ведущими вузами",
        "Разработка курсов по востребованным в компании навыкам",
        "Вклад в формирование учебных планов",
        "Подготовка специалистов под конкретные требования"
      ],
      icon: <BookOpen className="h-12 w-12 text-green-500" />
    },
    {
      id: "employer_branding",
      title: "Брендинг работодателя",
      description: "Усильте свой HR-бренд среди молодых специалистов, проводя мероприятия и взаимодействуя со студенческим сообществом.",
      benefits: [
        "Проведение брендированных мероприятий на платформе",
        "Публикация историй успеха сотрудников",
        "Представление корпоративной культуры и ценностей",
        "Повышение узнаваемости среди молодой аудитории"
      ],
      icon: <Star className="h-12 w-12 text-amber-500" />
    }
  ];

  // Программы партнерства для университетов
  const universityPrograms = [
    {
      id: "career_development",
      title: "Развитие карьеры студентов",
      description: "Расширьте возможности трудоустройства ваших студентов через прямое взаимодействие с компаниями и доступ к актуальным вакансиям.",
      benefits: [
        "Интеграция с корпоративными программами найма",
        "Продвижение выпускников среди компаний-партнеров",
        "Аналитика трудоустройства и карьерного роста выпускников",
        "Целевые мероприятия с участием работодателей"
      ],
      icon: <Briefcase className="h-12 w-12 text-blue-500" />
    },
    {
      id: "curriculum_enhancement",
      title: "Совершенствование учебных программ",
      description: "Адаптируйте образовательные программы к требованиям рынка труда на основе аналитики и обратной связи от компаний.",
      benefits: [
        "Аналитика востребованных навыков на рынке труда",
        "Обратная связь от работодателей о качестве подготовки",
        "Интеграция реальных проектов в учебный процесс",
        "Совместная разработка курсов с компаниями"
      ],
      icon: <GraduationCap className="h-12 w-12 text-purple-500" />
    },
    {
      id: "industry_collaboration",
      title: "Сотрудничество с индустрией",
      description: "Установите стратегические партнерства с компаниями для проведения совместных исследований, стажировок и проектов.",
      benefits: [
        "Совместные исследовательские проекты с компаниями",
        "Программы стажировок для студентов",
        "Привлечение экспертов из индустрии для преподавания",
        "Совместные лаборатории и центры компетенций"
      ],
      icon: <Handshake className="h-12 w-12 text-green-500" />
    }
  ];

  // Партнеры платформы
  const featuredPartners = [
    {
      id: "corp1",
      name: "Технологические инновации",
      logo: "/partners/tech-innovations.jpg",
      type: "company",
      description: "Ведущая IT-компания, специализирующаяся на разработке программного обеспечения и инновационных технологических решений."
    },
    {
      id: "uni1",
      name: "Московский Технический Университет",
      logo: "/partners/mtu.jpg",
      type: "university",
      description: "Один из крупнейших технических вузов страны, готовящий специалистов по широкому спектру технических направлений."
    },
    {
      id: "corp2",
      name: "Финансовые Системы",
      logo: "/partners/fin-systems.jpg",
      type: "company",
      description: "Крупный финансовый холдинг, развивающий инновационные решения в сфере банкинга и финансовых технологий."
    },
    {
      id: "uni2",
      name: "Санкт-Петербургский Государственный Университет",
      logo: "/partners/spbu.jpg",
      type: "university",
      description: "Один из старейших и престижнейших университетов страны с богатой историей и традициями."
    },
    {
      id: "corp3",
      name: "Медиа Групп",
      logo: "/partners/media-group.jpg",
      type: "company",
      description: "Медиахолдинг, объединяющий различные медиаресурсы и развивающий цифровые платформы для контента."
    },
    {
      id: "uni3",
      name: "Экономический Университет",
      logo: "/partners/econ-uni.jpg",
      type: "university",
      description: "Ведущий вуз в области экономики, финансов, менеджмента и бизнес-образования."
    }
  ];

  // Истории успеха
  const successStories = [
    {
      id: "story1",
      title: "Программа стажировок для студентов IT-направлений",
      company: "Технологические инновации",
      university: "Московский Технический Университет",
      description: "Совместная программа стажировок привела к трудоустройству более 50 выпускников за последний год. Компания получила молодых специалистов, а университет повысил показатели трудоустройства.",
      image: "/stories/internship-program.jpg",
      results: [
        "50+ трудоустроенных выпускников",
        "15 совместных технических проектов",
        "Обновление учебной программы университета",
        "Запуск исследовательской лаборатории"
      ]
    },
    {
      id: "story2",
      title: "Совместная магистерская программа по финансовым технологиям",
      company: "Финансовые Системы",
      university: "Экономический Университет",
      description: "Разработка и запуск магистерской программы по финтех. Эксперты компании принимают участие в преподавании, а студенты проходят практику в реальных проектах компании.",
      image: "/stories/master-program.jpg",
      results: [
        "Запуск уникальной магистерской программы",
        "Привлечение более 100 студентов за 2 года",
        "80% выпускников получили предложения о работе",
        "5 совместных исследовательских проектов"
      ]
    },
    {
      id: "story3",
      title: "Хакатоны и воркшопы для студентов-разработчиков",
      company: "Медиа Групп",
      university: "Санкт-Петербургский Государственный Университет",
      description: "Серия хакатонов и практических воркшопов для студентов позволила выявить талантливых разработчиков и улучшить практические навыки студентов.",
      image: "/stories/hackathons.jpg",
      results: [
        "10 проведенных хакатонов и воркшопов",
        "Более 500 студентов-участников",
        "15 реализованных студенческих проектов",
        "25 студентов приняты на стажировку"
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 px-4 sm:px-6">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Партнерские программы
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Объединяем университеты и компании для создания эффективной экосистемы образования, 
            карьерного развития и инноваций.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
              Стать партнером
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Узнать больше
            </Button>
          </div>
        </motion.div>

        {/* Partnership Programs Tabs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <Tabs defaultValue="companies" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
              <TabsTrigger value="companies" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Для компаний
              </TabsTrigger>
              <TabsTrigger value="universities" className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Для университетов
              </TabsTrigger>
            </TabsList>
            <TabsContent value="companies">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {companyPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    variants={fadeIn}
                    className="flex flex-col h-full"
                  >
                    <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
                      <div className="mb-6">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{program.description}</p>
                      <ul className="space-y-2 mb-6">
                        {program.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="mt-auto self-start group">
                        Подробнее <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
            <TabsContent value="universities">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {universityPrograms.map((program) => (
                  <motion.div
                    key={program.id}
                    variants={fadeIn}
                    className="flex flex-col h-full"
                  >
                    <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
                      <div className="mb-6">
                        {program.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                      <p className="text-gray-600 mb-4 flex-grow">{program.description}</p>
                      <ul className="space-y-2 mb-6">
                        {program.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="mt-auto self-start group">
                        Подробнее <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Наши партнеры</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Компании и университеты, которые уже присоединились к нашей экосистеме и 
              активно развивают сотрудничество в образовании и трудоустройстве.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPartners.map((partner) => (
              <Card key={partner.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
                    <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold">{partner.name}</h3>
                    <Badge variant="outline" className={partner.type === "company" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}>
                      {partner.type === "company" ? "Компания" : "Университет"}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-800 p-0">
                  Подробнее <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button>Все партнеры</Button>
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Истории успеха</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Успешные примеры сотрудничества между компаниями и университетами, 
              которые привели к значимым результатам для всех участников.
            </p>
          </div>

          <div className="space-y-12">
            {successStories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={story.image} 
                      alt={story.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className="bg-blue-100 text-blue-800 flex items-center">
                        <Building className="h-3 w-3 mr-1" />
                        {story.company}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {story.university}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{story.description}</p>
                    <h4 className="font-semibold mb-2">Результаты:</h4>
                    <ul className="space-y-2 mb-4">
                      {story.results.map((result, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="mt-2">
                      Читать полностью
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center bg-blue-50 rounded-xl p-10"
        >
          <div className="max-w-3xl mx-auto">
            <Handshake className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              Присоединяйтесь к нашему сообществу партнеров
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Вместе мы можем создать эффективную экосистему для образования, 
              трудоустройства и развития талантов. Свяжитесь с нами, чтобы обсудить возможности сотрудничества.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Стать партнером
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Запросить презентацию
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 