"use client";

import React from "react";
import RoleLayout from "@/components/RoleLayout";
import { KPIStrip } from "@/components/dashboard/KPIStrip";
import { SectionCard } from "@/components/dashboard/SectionCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Building,
  BarChart2,
  Calendar,
  Clock,
  TrendingUp,
  Sparkles,
  Target,
} from "lucide-react";

interface KPIStat {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: string;
  positive?: boolean;
}

interface RecommendedCandidate {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  status: "new" | "review" | "interview" | "offer" | "hired";
  matchScore: number;
}

interface UpcomingInterview {
  candidate: string;
  position: string;
  date: string;
  type: string;
}

export default function EmployerDashboard() {
  const { user } = useAuth();

  // KPI Statistics
  const kpiStats: KPIStat[] = [
    {
      label: "Активных вакансий",
      value: 3,
      subtitle: "открытых позиций",
      delta: "+3 за последний месяц",
      positive: true,
    },
    {
      label: "Кандидаты",
      value: 48,
      subtitle: "активных соискателей",
      delta: "+12% с прошлого месяца",
      positive: true,
    },
    {
      label: "Найм за квартал",
      value: 8,
      subtitle: "трудоустроенных",
      delta: "+20% к прошлому кварталу",
    },
    {
      label: "Конверсия",
      value: "16.8%",
      subtitle: "от просмотра до отклика",
    },
  ];

  // Recommended candidates data
  const recommendedCandidates: RecommendedCandidate[] = [
    {
      id: " cand-001",
      name: "Александр Иванов",
      position: "Frontend разработчик",
      avatar: "/avatars/student.png",
      status: "interview",
      matchScore: 95,
    },
    {
      id: " cand-002",
      name: "Елена Смирнова",
      position: "UX/UI дизайнер",
      avatar: null,
      status: "review",
      matchScore: 88,
    },
    {
      id: " cand-003",
      name: "Дмитрий Козлов",
      position: "DevOps инженер",
      avatar: null,
      status: "new",
      matchScore: 75,
    },
  ];

  // Upcoming interviews data
  const upcomingInterviews: UpcomingInterview[] = [
    {
      candidate: "Александр Иванов",
      position: "Frontend разработчик",
      date: "14 Апреля, 10:00",
      type: "Техническое интервью",
    },
    {
      candidate: "Елена Смирнова",
      position: "UX/UI дизайнер",
      date: "16 Апреля, 14:30",
      type: "Презентация портфолио",
    },
  ];

  return (
    <RoleLayout pageTitle="Панель управления компанией">
      <div className="pt-6">
        {/* KPI Strip - топовые статистики */}
        <KPIStrip stats={kpiStats} />

        {/* Main content area */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Section: Кандидаты */}
          <SectionCard
            id="candidates"
            header={{
              title: "Недавние кандидаты",
              subtitle: "Последние отклики на ваши вакансии",
            }}
          >
            <div className="space-y-4">
              {recommendedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="flex items-start group cursor-pointer transition-colors duration-150 ease-user"
                  onMouseOver="this.style.background='rgba(var(--primary), 0.05)'"
                  onMouseOut="this.style.background=''"
                >
                  <div className="mr-3 mt-1 rounded-full bg-primary/10">
                    {candidate.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      </Avatar>
                    ) : (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{candidate.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {candidate.name}
                      </p>
                      <Badge className="text-[10px] bg-primary/20 text-primary">
                        {candidate.matchScore}% подходит
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{candidate.position}</p>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span>{candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Link
                href="/employer/candidates"
                className="inline-flex items-center text-sm text-primary"
              >
                Все кандидаты
                <svg
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </SectionCard>

          {/* Section: Предстоящие интервью */}
          <SectionCard
            id="interviews"
            header={{
              title: "Предстоящие интервью",
              subtitle: "Запланированные встречи",
            }}
          >
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.candidate}
                  className="flex items-start group cursor-pointer transition-colors duration-150 ease-user"
                  onMouseOver="this.style.background='rgba(var(--primary), 0.05)'"
                  onMouseOut="this.style.background=''"
                >
                  <div className="mr-3 mt-1">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {interview.candidate}
                    </p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <Calendar className="mr-1 h-3 w-3" /> {interview.date}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t">
              <Link
                href="/employer/interviews"
                className="inline-flex items-center text-sm text-primary"
              >
                Все интервью
                <svg
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </SectionCard>

          {/* Section: Вакансии - использовать KPIStrip stats для контекста */}
          <SectionCard
            id="jobs"
            header={{
              title: "Вакансии",
              subtitle: "Управление вакансиями",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Последние вакансии</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-sm"
                    onClick={() => window.location.href="/employer/jobs"}
                  >
                    Посмотреть все
                  </Button>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => window.location.href="/employer/jobs/new"}
                  aria-label="Создать новую вакансию"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </Button>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </RoleLayout>
  );
}