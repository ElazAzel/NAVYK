import { ROUTES } from '@/lib/routes';
import { UserRole } from '@/context/auth-context';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  CalendarDays,
  Briefcase,
  Award,
  FolderKanban,
  Users,
  BarChart3,
  Building2,
  Cpu,
} from 'lucide-react';
import type { AppRoute } from './types/app-routes';

interface NavItem {
  title: string;
  href: AppRoute;
  icon: React.ReactElement;
}

type RoleNavMap = Record<NonNullable<UserRole>, NavItem[]>;

export const navigationConfig: RoleNavMap = {
  student: [
    { title: "Дашборд", href: ROUTES.STUDENT.DASHBOARD, icon: <LayoutDashboard className="h-4 w-4" /> },
    { title: "Карьерный план", href: ROUTES.STUDENT.ROADMAP, icon: <Map className="h-4 w-4" /> },
    { title: "Курсы", href: ROUTES.STUDENT.COURSES, icon: <BookOpen className="h-4 w-4" /> },
    { title: "Проекты", href: ROUTES.STUDENT.PROJECTS, icon: <FolderKanban className="h-4 w-4" /> },
    { title: "Мероприятия", href: ROUTES.STUDENT.EVENTS, icon: <CalendarDays className="h-4 w-4" /> },
    { title: "Вакансии", href: ROUTES.STUDENT.JOBS, icon: <Briefcase className="h-4 w-4" /> },
    { title: "Достижения", href: ROUTES.STUDENT.ACHIEVEMENTS, icon: <Award className="h-4 w-4" /> },
    { title: "Профиль", href: ROUTES.STUDENT.PROFILE, icon: <Users className="h-4 w-4" /> },
  ],
  employer: [
    { title: "Дашборд", href: ROUTES.EMPLOYER.DASHBOARD, icon: <LayoutDashboard className="h-4 w-4" /> },
    { title: "Вакансии", href: ROUTES.EMPLOYER.JOBS, icon: <Briefcase className="h-4 w-4" /> },
    { title: "Кандидаты", href: ROUTES.EMPLOYER.CANDIDATES, icon: <Users className="h-4 w-4" /> },
    { title: "Аналитика", href: ROUTES.EMPLOYER.ANALYTICS, icon: <BarChart3 className="h-4 w-4" /> },
    { title: "Мероприятия", href: ROUTES.EMPLOYER.EVENTS, icon: <CalendarDays className="h-4 w-4" /> },
    { title: "Профиль", href: ROUTES.EMPLOYER.PROFILE, icon: <Building2 className="h-4 w-4" /> },
  ],
  university: [
    { title: "Дашборд", href: ROUTES.UNIVERSITY.DASHBOARD, icon: <LayoutDashboard className="h-4 w-4" /> },
    { title: "Студенты", href: ROUTES.UNIVERSITY.STUDENTS, icon: <Users className="h-4 w-4" /> },
    { title: "Аналитика", href: ROUTES.UNIVERSITY.ANALYTICS, icon: <BarChart3 className="h-4 w-4" /> },
    { title: "Мероприятия", href: ROUTES.UNIVERSITY.EVENTS, icon: <CalendarDays className="h-4 w-4" /> },
    { title: "Профиль", href: ROUTES.UNIVERSITY.PROFILE, icon: <Building2 className="h-4 w-4" /> },
  ],
  mentor: [
    { title: "Дашборд", href: ROUTES.MENTOR.DASHBOARD, icon: <LayoutDashboard className="h-4 w-4" /> },
  ],
  admin: [
    { title: "Дашборд", href: ROUTES.ADMIN.DASHBOARD, icon: <LayoutDashboard className="h-4 w-4" /> },
    { title: "ML-модели", href: ROUTES.ADMIN.ML, icon: <Cpu className="h-4 w-4" /> },
  ]
};
