"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [activeTab, setActiveTab] = useState("students");

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

  // Тарифные планы для студентов
  const studentPlans = [
    {
      name: "Базовый",
      description: "Идеально для начинающих студентов",
      price: billingPeriod === "monthly" ? "0" : "0",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль студента", included: true },
        { name: "Доступ к публичным мероприятиям", included: true },
        { name: "Базовый доступ к вакансиям", included: true },
        { name: "Ограниченные рекомендации", included: true },
        { name: "Ограниченная дорожная карта развития", included: true },
        { name: "Приоритетная поддержка", included: false },
        { name: "Расширенная аналитика навыков", included: false },
        { name: "Персональный карьерный консультант", included: false }
      ],
      highlighted: false,
      buttonText: "Начать бесплатно"
    },
    {
      name: "Премиум",
      description: "Для студентов, серьезно относящихся к карьере",
      price: billingPeriod === "monthly" ? "590" : "5900",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль студента", included: true },
        { name: "Доступ к публичным мероприятиям", included: true },
        { name: "Полный доступ к вакансиям", included: true },
        { name: "Расширенные рекомендации", included: true },
        { name: "Полная дорожная карта развития", included: true },
        { name: "Приоритетная поддержка", included: true },
        { name: "Расширенная аналитика навыков", included: true },
        { name: "Персональный карьерный консультант", included: false }
      ],
      highlighted: true,
      buttonText: "Оформить подписку"
    },
    {
      name: "Карьера",
      description: "Максимальная поддержка для быстрого старта карьеры",
      price: billingPeriod === "monthly" ? "1490" : "14900",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль студента", included: true },
        { name: "Доступ к публичным мероприятиям", included: true },
        { name: "Приоритетный доступ к вакансиям", included: true },
        { name: "Персонализированные рекомендации", included: true },
        { name: "Продвинутая дорожная карта развития", included: true },
        { name: "Приоритетная поддержка 24/7", included: true },
        { name: "Расширенная аналитика навыков", included: true },
        { name: "Персональный карьерный консультант", included: true }
      ],
      highlighted: false,
      buttonText: "Оформить подписку"
    }
  ];

  // Тарифные планы для работодателей
  const employerPlans = [
    {
      name: "Старт",
      description: "Для малого бизнеса и стартапов",
      price: billingPeriod === "monthly" ? "9900" : "99000",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль компании", included: true },
        { name: "До 5 активных вакансий", included: true },
        { name: "Базовый доступ к базе студентов", included: true },
        { name: "Организация 1 мероприятия в месяц", included: true },
        { name: "Базовая аналитика кандидатов", included: true },
        { name: "Приоритетный поиск кандидатов", included: false },
        { name: "Расширенная аналитика", included: false },
        { name: "Интеграция с ATS", included: false }
      ],
      highlighted: false,
      buttonText: "Оформить подписку"
    },
    {
      name: "Бизнес",
      description: "Для растущих компаний и среднего бизнеса",
      price: billingPeriod === "monthly" ? "29900" : "299000",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль компании", included: true },
        { name: "До 20 активных вакансий", included: true },
        { name: "Расширенный доступ к базе студентов", included: true },
        { name: "Организация 5 мероприятий в месяц", included: true },
        { name: "Расширенная аналитика кандидатов", included: true },
        { name: "Приоритетный поиск кандидатов", included: true },
        { name: "Продвинутая аналитика и отчеты", included: true },
        { name: "Интеграция с ATS", included: false }
      ],
      highlighted: true,
      buttonText: "Оформить подписку"
    },
    {
      name: "Корпоративный",
      description: "Для крупных компаний с масштабным наймом",
      price: billingPeriod === "monthly" ? "69900" : "699000",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Брендированный профиль компании", included: true },
        { name: "Неограниченное количество вакансий", included: true },
        { name: "Полный доступ к базе студентов", included: true },
        { name: "Неограниченное количество мероприятий", included: true },
        { name: "Полная аналитика кандидатов", included: true },
        { name: "Продвинутый поиск кандидатов", included: true },
        { name: "Расширенная аналитика и прогнозы", included: true },
        { name: "Интеграция с ATS и другими системами", included: true }
      ],
      highlighted: false,
      buttonText: "Связаться с отделом продаж"
    }
  ];

  // Тарифные планы для университетов
  const universityPlans = [
    {
      name: "Базовый",
      description: "Для небольших учебных заведений",
      price: billingPeriod === "monthly" ? "19900" : "199000",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Профиль учебного заведения", included: true },
        { name: "До 500 студентов", included: true },
        { name: "Базовая аналитика активности студентов", included: true },
        { name: "Организация до 5 мероприятий в месяц", included: true },
        { name: "Базовый доступ к партнерским программам", included: true },
        { name: "Расширенная аналитика трудоустройства", included: false },
        { name: "Интеграция с LMS", included: false },
        { name: "Персональный менеджер", included: false }
      ],
      highlighted: false,
      buttonText: "Оформить подписку"
    },
    {
      name: "Продвинутый",
      description: "Для средних и крупных учебных заведений",
      price: billingPeriod === "monthly" ? "49900" : "499000",
      period: billingPeriod === "monthly" ? "/месяц" : "/год",
      features: [
        { name: "Расширенный профиль учебного заведения", included: true },
        { name: "До 2000 студентов", included: true },
        { name: "Расширенная аналитика активности студентов", included: true },
        { name: "Организация до 20 мероприятий в месяц", included: true },
        { name: "Расширенный доступ к партнерским программам", included: true },
        { name: "Расширенная аналитика трудоустройства", included: true },
        { name: "Интеграция с LMS", included: true },
        { name: "Персональный менеджер", included: false }
      ],
      highlighted: true,
      buttonText: "Оформить подписку"
    },
    {
      name: "Корпоративный",
      description: "Для крупных университетов и образовательных сетей",
      price: "По запросу",
      period: "",
      features: [
        { name: "Брендированный профиль учебного заведения", included: true },
        { name: "Неограниченное количество студентов", included: true },
        { name: "Полная аналитика активности и трудоустройства", included: true },
        { name: "Неограниченное количество мероприятий", included: true },
        { name: "Полный доступ к партнерским программам", included: true },
        { name: "Предиктивная аналитика трудоустройства", included: true },
        { name: "Интеграция с LMS и другими системами", included: true },
        { name: "Выделенный персональный менеджер", included: true }
      ],
      highlighted: false,
      buttonText: "Связаться с отделом продаж"
    }
  ];

  // Выбор активных планов в зависимости от вкладки
  const getActivePlans = () => {
    switch (activeTab) {
      case "students":
        return studentPlans;
      case "employers":
        return employerPlans;
      case "universities":
        return universityPlans;
      default:
        return studentPlans;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-16 px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Тарифные планы для всех участников
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Выберите подходящий тарифный план для ваших потребностей. 
            Все планы включают базовый набор функций для обеспечения комфортной работы.
          </p>
        </motion.div>

        {/* Tabs for user types */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-md mx-auto mb-10"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="students">Для студентов</TabsTrigger>
              <TabsTrigger value="employers">Для работодателей</TabsTrigger>
              <TabsTrigger value="universities">Для университетов</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Billing period toggle */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex justify-center items-center space-x-4 mb-10"
        >
          <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
            Ежемесячно
          </span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
              billingPeriod === "yearly" ? "bg-blue-600" : "bg-gray-200"
            }`}
            onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${billingPeriod === "yearly" ? "text-gray-900" : "text-gray-500"}`}>
            Ежегодно
            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
              Скидка 16%
            </Badge>
          </span>
        </motion.div>

        {/* Pricing Plans */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
        >
          {getActivePlans().map((plan, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className={`p-6 h-full flex flex-col overflow-hidden relative ${
                plan.highlighted 
                  ? "border-blue-500 shadow-lg" 
                  : "border-gray-200"
              }`}>
                {plan.highlighted && (
                  <Badge className="absolute top-0 right-0 rounded-bl-md rounded-tr-md px-3 py-1 bg-blue-500 text-white">
                    Популярный выбор
                  </Badge>
                )}
                <div className="mb-5">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-gray-600 mt-1">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {typeof plan.price === "string" && plan.price.includes("По") ? "" : "₽"}
                    </span>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  
                  {billingPeriod === "yearly" && typeof plan.price === "string" && !plan.price.includes("По") && (
                    <p className="text-green-600 text-sm mt-1">
                      Экономия ₽{parseInt(plan.price.replace(/\s/g, "")) * 0.16} в год
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-gray-700" : "text-gray-400"}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`mt-auto w-full ${
                    plan.highlighted 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : ""
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-24 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                Могу ли я сменить тарифный план?
              </h3>
              <p className="text-gray-600">
                Да, вы можете изменить свой тарифный план в любое время. При переходе на более дорогой план вам будет выставлен счет за разницу. При переходе на более дешевый план новая цена вступит в силу в следующем платежном периоде.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                Есть ли пробный период?
              </h3>
              <p className="text-gray-600">
                Для планов &quot;Премиум&quot; и &quot;Карьера&quot; для студентов предусмотрен 14-дневный пробный период. Для работодателей и университетов мы предлагаем демонстрационную версию по запросу.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                Какие способы оплаты вы принимаете?
              </h3>
              <p className="text-gray-600">
                Мы принимаем все основные кредитные карты и банковские переводы. Для корпоративных клиентов возможна оплата по счету с НДС.
              </p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <HelpCircle className="h-5 w-5 text-blue-500 mr-2" />
                Можно ли получить индивидуальное предложение?
              </h3>
              <p className="text-gray-600">
                Да, для крупных университетов, образовательных сетей и компаний с особыми требованиями мы предлагаем индивидуальные решения. Свяжитесь с нашим отделом продаж для получения персонального предложения.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 text-center bg-blue-50 rounded-xl p-10"
        >
          <h2 className="text-3xl font-bold mb-6">
            Остались вопросы?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Наша команда поддержки готова помочь вам выбрать подходящий план и ответить на все ваши вопросы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Связаться с поддержкой
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Запросить демо
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}