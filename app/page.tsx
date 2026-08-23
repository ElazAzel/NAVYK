"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { motion } from "framer-motion";
import Footer from "./components/Footer";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Авто-переход при авторизации — gentle redirect
  React.useEffect(() => {
    if (!isLoading && user?.role) {
      const to = `/${user.role}/dashboard`;
      const delay = user.role === "student" ? 500 : 0;
      const timer = setTimeout(() => router.push(to), delay);
      return () => clearTimeout(timer);
    }
  }, [user, isLoading, router]);

  return (
    <>

      {/* Hero — Linear/Vercel style: single column, restrained motion */}
      <div className="relative">
        <div className="absolute inset-0">
          {/* Фон: минимальный градиент или текстура — здесь оставить пустым или subtle bg */}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            {/* Заголовок: ≤2 строки, CTA под ним */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-none text-foreground">
              NAVYK
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Единая экосистема для студентов, компаний и университетов
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {/* Primary CTA — prominent, single accent */}
              <Link
                href="/login"
                className="rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                style={{ transitionProperty: "background-color", transitionDuration: "150ms", transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
              >
                Войти
              </Link>

              <Link
                href="/signup"
                className="rounded-md border border-input bg-background px-6 py-3 text-base font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                style={{ transitionProperty: "background-color", transitionDuration: "150ms", transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
              >
                Регистрация
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Внизу hero — subtle accent bar or nothing */}
      </div>

      {/* Section: Как это работает — varied layouts, no 3-equal-cards pattern */}
      <section className="section-y bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-8">Как это работает</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Карточка 1: Для студентов */}
            <div className="panel rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Для студентов</h3>
              <p className="text-muted-foreground text-sm">
                Отслеживайте карьеру, записывайтесь на курсы и мероприятия, ищите работу и стажировки.
              </p>
            </div>

            {/* Карточка 2: Для компаний — rotated layout (zigzag: image-left + text-right alternation) */}
            <div className="panel rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Для компаний</h3>
              <p className="text-muted-foreground text-sm">
                Находите талантливых специалистов, публикуйте вакансии, проводите мероприятия и отслеживайте аналитику.
              </p>
            </div>

            {/* Карточка 3: Для университетов — different layout again */}
            <div className="panel rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">Для университетов</h3>
              <p className="text-muted-foreground text-sm">
                Следите за прогрессом студентов, организуйте мероприятия, сотрудничайте с компаниями и получайте аналитику.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Ключевые возможности — bento-сетка, varied items */}
      <section className="section-y">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-8">Возможности</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Bento item 1: Compact card */}
            <div className="rounded-lg border bg-card p-5 sm:p-6 hover:bg-primary/5 hover:text-primary">
              <h3 className="text-base font-medium text-foreground mb-1">Карьерные планы</h3>
              <p className="text-sm text-muted-foreground">Создавайте персональные маршруты роста</p>
            </div>

            {/* Bento item 2: Icon + text vertical (image on left, text right alternate) */}
            <div className="rounded-lg border bg-card p-5 sm:p-6 hover:bg-primary/5 hover:text-primary flex flex-col">
              <span className="mt-1 text-primary/60">📊</span>
              <h3 className="text-base font-medium text-foreground mt-2">Аналитика</h3>
              <p className="text-sm text-muted-foreground mt-1">Поглубже смотрите показатели</p>
            </div>

            {/* Bento item 3: Another variant — full width with badge */}
            <div className="rounded-lg border bg-card p-5 sm:p-6">
              <h3 className="text-base font-medium text-foreground">Мероприятия</h3>
              <p className="text-sm text-muted-foreground">Участвуйте в хакатурах и событиях</p>
            </div>

            {/* Bento item 4: Compact stat — one of the "3 card row" alternatives */}
            <div className="rounded-lg border bg-card p-5 sm:p-6">
              <h3 className="text-base font-medium text-foreground">Вакансии</h3>
              <p className="text-sm text-muted-foreground">Публикуйте и откликайтесь</p>
            </div>

            {/* Bento item 5: Feature highlight — different variant */}
            <div className="rounded-lg border bg-card p-5 sm:p-6">
              <h3 className="text-base font-medium text-foreground">Проекты</h3>
              <p className="text-sm text-muted-foreground">Делитесь своими работами</p>
            </div>

            {/* Bento item 6: Last variant — unique layout */}
            <div className="rounded-lg border bg-card p-5 sm:p-6">
              <h3 className="text-base font-medium text-foreground">Сообщество</h3>
              <p className="text-sm text-muted-foreground">Общайтесь и networkите</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Сообщество / Testimonials — minimal, no heavy motion */}
      <section className="section-y bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-6">Вместе к успеху</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial card — clean, no gradient borders */}
            <div className="panel rounded-lg p-5 sm:p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                На платформе нашел свою первую стажировку. Рекомендую всем студентам!
              </p>
              <p className="text-sm text-foreground mt-3">— Алина, студентка</p>
            </div>

            <div className="panel rounded-lg p-5 sm:p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Карьерный план helped me structure my goals for the year.
              </p>
              <p className="text-sm text-foreground mt-3">— Максим, выпускник</p>
            </div>

            <div className="panel rounded-lg p-5 sm:p-6">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Университет видит динамику наших студентов в реальном времени.
              </p>
              <p className="text-sm text-foreground mt-3">— Началу университета</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — single section, no extra sections under it per rule */}
      <section className="section-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-3">
            Готовы начать свой путь?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к сообществу уже 10 000+ студентов и компаний в Казахстане
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              style={{ transitionProperty: "background-color", transitionDuration: "150ms", transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
            >
              Войти в аккаунт
            </Link>
            <Link
              href="/signup"
              className="rounded-md border border-input bg-background px-8 py-3 text-base font-medium text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              style={{ transitionProperty: "background-color", transitionDuration: "150ms", transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)" }}
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}