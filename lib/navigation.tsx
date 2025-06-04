import { ROUTES } from '@/lib/routes';
import { UserRole } from '@/context/auth-context';
import { Icons } from '@/components/ui/icons';
import type { AppRoute } from './types/app-routes';

interface NavIcon extends React.FC<{ className?: string }> {}

interface NavItem {
  title: string;
  href: AppRoute;
  icon: React.ReactElement;
}

type RoleNavMap = Record<NonNullable<UserRole>, NavItem[]>;

export const navigationConfig: RoleNavMap = {
  student: [
    {
      title: "Дашборд",
      href: ROUTES.STUDENT.DASHBOARD,
      icon: <Icons.dashboard className="h-5 w-5" />
    },
    {
      title: "Профиль",
      href: ROUTES.STUDENT.PROFILE,
      icon: <Icons.user className="h-5 w-5" />
    },
    {
      title: "Карьерный план",
      href: ROUTES.STUDENT.ROADMAP,
      icon: <Icons.file className="h-5 w-5" />
    },
    {
      title: "Курсы",
      href: ROUTES.STUDENT.COURSES,
      icon: <Icons.book className="h-5 w-5" />
    },
    {
      title: "Мероприятия",
      href: ROUTES.STUDENT.EVENTS,
      icon: <Icons.calendar className="h-5 w-5" />
    },
    {
      title: "Вакансии",
      href: ROUTES.STUDENT.JOBS,
      icon: <Icons.briefcase className="h-5 w-5" />
    },
    {
      title: "Достижения",
      href: ROUTES.STUDENT.ACHIEVEMENTS,
      icon: <Icons.award className="h-5 w-5" />
    }
  ],
  employer: [
    {
      title: "Дашборд",
      href: ROUTES.EMPLOYER.DASHBOARD,
      icon: <Icons.dashboard className="h-5 w-5" />
    },
    {
      title: "Управление вакансиями",
      href: ROUTES.EMPLOYER.JOBS,
      icon: <Icons.briefcase className="h-5 w-5" />
    },
    {
      title: "Кандидаты",
      href: ROUTES.EMPLOYER.CANDIDATES,
      icon: <Icons.users className="h-5 w-5" />
    }
  ],
  university: [
    {
      title: "Дашборд",
      href: ROUTES.UNIVERSITY.DASHBOARD,
      icon: <Icons.dashboard className="h-5 w-5" />
    },
    {
      title: "Студенты",
      href: ROUTES.UNIVERSITY.STUDENTS,
      icon: <Icons.users className="h-5 w-5" />
    },
    {
      title: "Аналитика",
      href: ROUTES.UNIVERSITY.ANALYTICS,
      icon: <Icons.chart className="h-5 w-5" />
    }
  ],
  mentor: [
    {
      title: "Дашборд",
      href: ROUTES.MENTOR.DASHBOARD,
      icon: <Icons.dashboard className="h-5 w-5" />
    },
    {
      title: "Сессии",
      href: ROUTES.MENTOR.SESSIONS,
      icon: <Icons.calendar className="h-5 w-5" />
    },
    {
      title: "Студенты",
      href: ROUTES.MENTOR.STUDENTS,
      icon: <Icons.users className="h-5 w-5" />
    }
  ],
  admin: [
    {
      title: "Дашборд",
      href: ROUTES.ADMIN.DASHBOARD,
      icon: <Icons.dashboard className="h-5 w-5" />
    },
    {
      title: "Пользователи",
      href: ROUTES.ADMIN.USERS,
      icon: <Icons.users className="h-5 w-5" />
    },
    {
      title: "Настройки",
      href: ROUTES.ADMIN.SETTINGS,
      icon: <Icons.settings className="h-5 w-5" />
    }
  ]
};
