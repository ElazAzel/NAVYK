"use client";

import React, { useEffect, useState } from "react";
import RoleLayout from "@/components/RoleLayout";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [kpiStats, setKpiStats] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Получаем KPI статистику
    fetch(`/api/student`)
      .then((res) => res.json())
      .then((data) => {
        const stats = data?.stats || {};
        setKpiStats([
          { label: "Активные курсы", value: stats.activeCourses ?? 0 },
          { label: "Достижения", value: stats.achievements ?? 0 },
          { label: "Навыки", value: stats.skills ?? 0 },
          { label: "Прогресс", value: `${stats.progress ?? 0}%` },
        ]);
      })
      .catch(console.error);

    // Мероприятия
    fetch(`/api/events?status=upcoming`)
      .then((res) => res.json())
      .then((data) => setEvents(data?.events || []))
      .catch(console.error);

    // Вакансии
    fetch(`/api/vacancies?status=open`)
      .then((res) => res.json())
      .then((data) => setJobs(data?.vacancies || []))
      .catch(console.error);
  }, [user?.id]);

  if (!user) return null;

  return (
    <RoleLayout pageTitle="Мой дашборд">
      <div className="min-h-[100dvh] bg-background">
        <KPIStrip stats={kpiStats} />
        <div className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <SectionCard header={{ title: "Ближайшие мероприятия" }}>
            {events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event.id} className="p-4 rounded-lg border bg-card">
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.start_time).toLocaleDateString("ru-RU")}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/events/${event.id}`)}
                    >
                      Подробнее
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Нет upcoming событий"
                description="Ближайшие мероприятия скоро появятся"
                action={{ label: "Посмотреть все", href: "/events" }}
              />
            )}
          </SectionCard>

          <SectionCard header={{ title: "Вакансии" }}>
            {jobs.length > 0 ? (
              <ul className="space-y-4">
                {jobs.map((job) => (
                  <li key={job.id} className="p-4 rounded-lg border bg-card">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.employers?.company_name || "Компания"}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      Подробнее
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Вакансии отсутствуют"
                description="Попробуйте позже или вернитесь позже"
                action={{ label: "Обновить", href: "/student/dashboard" }}
              />
            )}
          </SectionCard>
        </div>
      </div>
    </RoleLayout>
  );
}
