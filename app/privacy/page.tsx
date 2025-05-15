"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

export default function PrivacyPage() {
  const [openFAQs, setOpenFAQs] = useState<Record<number, boolean>>({});

  // Анимации
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Переключатель для FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // FAQs о политике конфиденциальности
  const privacyFAQs: FAQ[] = [
    {
      question: "Какие данные о пользователях вы собираете?",
      answer: "Мы собираем базовую информацию для создания учетной записи (имя, email, телефон), данные об образовании и опыте работы, информацию о пользовательской активности на платформе, а также техническую информацию (IP-адрес, тип браузера и устройства). Полный перечень собираемых данных указан в разделе 'Собираемые данные'."
    },
    {
      question: "Как долго вы храните персональные данные?",
      answer: "Мы храним ваши персональные данные до тех пор, пока ваша учетная запись активна или пока это необходимо для предоставления вам услуг. После удаления учетной записи мы удаляем или анонимизируем ваши данные в течение 30 дней, за исключением случаев, когда законодательство требует сохранить определенную информацию."
    },
    {
      question: "Передаете ли вы мои данные третьим лицам?",
      answer: "Мы можем передавать ваши данные третьим лицам в следующих случаях: партнерам-университетам и компаниям (с вашего согласия), поставщикам услуг, которые обрабатывают данные от нашего имени, а также в случаях, предусмотренных законодательством. Во всех случаях мы обеспечиваем соответствующий уровень защиты ваших данных."
    },
    {
      question: "Как вы защищаете мои персональные данные?",
      answer: "Мы используем комплексный подход к защите ваших данных, включая шифрование данных в процессе передачи и хранения, регулярный аудит безопасности, строгий контроль доступа для сотрудников, а также физическую защиту серверов и инфраструктуры. Мы также регулярно обновляем наши системы безопасности."
    },
    {
      question: "Как я могу удалить свои данные с платформы?",
      answer: "Вы можете запросить удаление своих данных через настройки аккаунта или отправив запрос на privacy@example.com. После получения запроса мы удалим ваши персональные данные из наших активных систем в течение 30 дней. Обратите внимание, что мы можем сохранить некоторые данные, если это требуется по закону."
    },
    {
      question: "Используете ли вы файлы cookie?",
      answer: "Да, мы используем файлы cookie и аналогичные технологии для улучшения работы платформы, анализа использования, персонализации контента и для маркетинговых целей. Вы можете управлять настройками cookie через панель настроек или в настройках вашего браузера."
    }
  ];

  // Дата последнего обновления политики
  const lastUpdated = "15 октября 2023 г.";

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
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Мы уважаем вашу конфиденциальность и стремимся обеспечить 
            прозрачность в отношении обработки ваших персональных данных.
          </p>
          <p className="text-sm text-gray-500">
            Последнее обновление: {lastUpdated}
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="collection">Сбор данных</TabsTrigger>
              <TabsTrigger value="usage">Использование</TabsTrigger>
              <TabsTrigger value="rights">Ваши права</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="text-gray-600 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Обзор политики конфиденциальности</h2>
                <p className="mb-4">
                  Настоящая Политика конфиденциальности описывает, как наша образовательная платформа (&quot;мы&quot;, &quot;нас&quot; или &quot;наш&quot;) собирает, 
                  использует и защищает ваши персональные данные при использовании нашего сервиса.
                </p>
                <p className="mb-4">
                  Используя нашу платформу, вы соглашаетесь с обработкой ваших данных в соответствии с данной Политикой. 
                  Если вы не согласны с какими-либо положениями Политики, пожалуйста, прекратите использование нашего сервиса.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Мы рекомендуем периодически проверять Политику конфиденциальности на наличие изменений. 
                    Продолжая использовать платформу после публикации изменений, вы подтверждаете свое согласие 
                    с обновленными условиями.
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="collection" className="text-gray-600 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Собираемые данные</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Информация, которую вы предоставляете</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Регистрационные данные (имя, email, телефон, пароль)</li>
                      <li>Профильная информация (образование, опыт работы, навыки)</li>
                      <li>Документы (резюме, портфолио, сертификаты)</li>
                      <li>Коммуникации (сообщения, отзывы, комментарии)</li>
                      <li>Данные о предпочтениях и интересах</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Информация, собираемая автоматически</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Технические данные (IP-адрес, тип устройства и браузера)</li>
                      <li>Данные о взаимодействии с платформой (посещенные страницы, действия)</li>
                      <li>Информация о местоположении (на основе IP-адреса или с вашего разрешения)</li>
                      <li>Cookie-файлы и аналогичные технологии</li>
                      <li>Аналитические данные о использовании сервиса</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{`Информация от третьих лиц`}</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Данные от университетов-партнеров (с вашего согласия)</li>
                      <li>Информация от работодателей (с вашего согласия)</li>
                      <li>Данные, полученные через социальные сети при авторизации</li>
                      <li>Информация от поставщиков аналитических сервисов</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="text-gray-600 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Использование данных</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Основные цели использования</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Предоставление доступа к платформе и ее функциям</li>
                      <li>Персонализация опыта использования платформы</li>
                      <li>Улучшение нашего сервиса и пользовательского опыта</li>
                      <li>Общение с вами по вопросам обслуживания и поддержки</li>
                      <li>Обработка платежей и управление подпиской (при наличии)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Дополнительные цели</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Предоставление актуальной информации о вакансиях и образовательных возможностях</li>
                      <li>Создание рекомендаций по карьерному развитию</li>
                      <li>Аналитика для улучшения образовательных программ и сервисов</li>
                      <li>Проведение исследований и разработка новых функций</li>
                      <li>Обеспечение безопасности платформы и предотвращение мошенничества</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Передача данных третьим лицам</h3>
                    <p className="mb-3">
                      Мы можем передавать ваши данные следующим категориям получателей:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Университеты и компании-партнеры (только с вашего согласия)</li>
                      <li>Поставщики услуг, действующие от нашего имени (хостинг, аналитика, платежи)</li>
                      <li>Государственные органы (в случаях, предусмотренных законодательством)</li>
                      <li>Аффилированные компании в рамках нашей корпоративной структуры</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="rights" className="text-gray-600 space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Ваши права и выбор</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Основные права</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Право на доступ к вашим персональным данным</li>
                      <li>Право на исправление неточной или неполной информации</li>
                      <li>Право на удаление ваших данных (с определенными ограничениями)</li>
                      <li>Право на ограничение обработки ваших данных</li>
                      <li>Право на получение ваших данных в структурированном формате</li>
                      <li>Право возражать против обработки данных в определенных случаях</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Как реализовать свои права</h3>
                    <p className="mb-3">
                      Для реализации любого из перечисленных прав вы можете:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Воспользоваться соответствующими настройками в личном кабинете</li>
                      <li>Отправить запрос на email: privacy@example.com</li>
                      <li>Заполнить форму запроса в разделе "Поддержка"</li>
                    </ul>
                    <p className="mt-3">
                      Мы рассмотрим ваш запрос и предоставим ответ в течение 30 дней. В некоторых случаях 
                      мы можем запросить дополнительную информацию для подтверждения вашей личности.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Безопасность данных
                    </h3>
                    <p>
                      Мы применяем современные технические и организационные меры для защиты ваших персональных данных, 
                      включая шифрование, регулярные аудиты безопасности и строгий контроль доступа.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Full Privacy Policy */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Полный текст политики конфиденциальности</h2>
          
          <div className="space-y-8 text-gray-600">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. Введение</h3>
              <p className="mb-2">
                Настоящая Политика конфиденциальности описывает, как наша образовательная платформа (&quot;мы&quot;, &quot;нас&quot; или &quot;наш&quot;) 
                собирает, использует, хранит и раскрывает информацию о пользователях наших сервисов.
              </p>
              <p>
                Политика применяется ко всем сервисам, функциям, программному обеспечению и другим компонентам нашей 
                образовательной платформы, включая веб-сайт, мобильные приложения и связанные с ними сервисы.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. Правовые основания для обработки персональных данных</h3>
              <p className="mb-2">
                Мы обрабатываем ваши персональные данные на следующих правовых основаниях:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Выполнение договора между вами и нашей компанией</li>
                <li>Ваше согласие на обработку персональных данных</li>
                <li>Наши законные интересы, если они не противоречат вашим правам и интересам</li>
                <li>Необходимость выполнения юридических обязательств</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. Хранение и защита данных</h3>
              <p className="mb-2">
                Мы храним ваши персональные данные до тех пор, пока это необходимо для предоставления вам запрошенных услуг, 
                или пока ваша учетная запись активна. После удаления учетной записи мы удаляем или анонимизируем ваши 
                данные в течение 30 дней, за исключением случаев, когда законодательство требует сохранить определенную информацию.
              </p>
              <p className="mb-2">
                Мы применяем технические и организационные меры для защиты ваших данных, включая:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Шифрование данных при передаче и хранении</li>
                <li>Строгие процедуры контроля доступа для сотрудников</li>
                <li>Регулярные проверки и обновления систем безопасности</li>
                <li>Обучение персонала по вопросам защиты данных</li>
                <li>Физическая защита серверов и инфраструктуры</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">4. Международная передача данных</h3>
              <p className="mb-2">
                Наши серверы могут располагаться в различных странах мира. Используя нашу платформу, 
                вы соглашаетесь с тем, что ваши данные могут быть переданы и обработаны за пределами 
                вашей страны проживания, где стандарты защиты данных могут отличаться.
              </p>
              <p>
                При международной передаче данных мы обеспечиваем соответствующие меры защиты, 
                включая стандартные договорные положения, сертификации или другие правовые механизмы.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">5. Дети и конфиденциальность</h3>
              <p>
                Наши услуги не предназначены для детей младше 16 лет. Мы намеренно не собираем персональные 
                данные от детей младше 16 лет без согласия родителей. Если вы узнали, что ребенок предоставил 
                нам личную информацию без согласия родителей, пожалуйста, свяжитесь с нами, и мы предпримем 
                шаги для удаления такой информации.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">6. Изменения в политике конфиденциальности</h3>
              <p>
                Мы можем периодически обновлять нашу Политику конфиденциальности для отражения изменений в нашей 
                практике обработки данных, новых функций сервиса или изменений в законодательстве. Мы будем 
                уведомлять вас о существенных изменениях через нашу платформу или по электронной почте. 
                Продолжая использовать наш сервис после внесения изменений, вы принимаете обновленную Политику.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">7. Контактная информация</h3>
              <p className="mb-2">
                Если у вас есть вопросы или предложения относительно нашей Политики конфиденциальности или 
                обработки ваших данных, пожалуйста, свяжитесь с нами:
              </p>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <span>privacy@example.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQs Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {privacyFAQs.map((faq, index) => (
              <Card key={index} className="p-4">
                <button 
                  className="flex justify-between items-center w-full text-left font-semibold text-gray-900 py-2"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {openFAQs[index] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFAQs[index] && (
                  <div className="pt-2 pb-1 text-gray-600 border-t mt-2">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center bg-blue-50 rounded-xl p-10"
        >
          <Lock className="h-12 w-12 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-6">
            Остались вопросы о конфиденциальности?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Если у вас есть вопросы о нашей политике конфиденциальности или о том, как мы обрабатываем 
            ваши данные, пожалуйста, свяжитесь с нашим специалистом по защите данных.
          </p>
          <Button size="lg" className="px-8">
            Связаться с нами
          </Button>
        </motion.div>
      </div>
    </div>
  );
}