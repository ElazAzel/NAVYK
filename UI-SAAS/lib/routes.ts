import type { AppRoutes } from './types/app-routes';

export const ROUTES: AppRoutes = {
  // Публичные страницы
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  // Страницы для студентов
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    PROFILE: '/student/profile',
    ROADMAP: '/student/roadmap',
    COURSES: '/student/courses',
    EVENTS: '/student/events',
    JOBS: '/student/jobs',
    ACHIEVEMENTS: '/student/achievements',
    SKILLS: '/student/skills',
    ACTIVITY: '/student/activity',
  },

  // Страницы для работодателей
  EMPLOYER: {
    DASHBOARD: '/employers/dashboard',
    JOBS: '/employers/jobs',
    CANDIDATES: '/employers/candidates',
  },

  // Страницы для университетов
  UNIVERSITY: {
    DASHBOARD: '/universities/dashboard',
    STUDENTS: '/universities/students',
    ANALYTICS: '/universities/analytics',
  },

  // Страницы для менторов
  MENTOR: {
    DASHBOARD: '/mentors/dashboard',
    SESSIONS: '/mentors/sessions',
    STUDENTS: '/mentors/students',
  },

  // Страницы для администраторов
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
  },
} as const;

// Типы пользователей и их домашние страницы
export const USER_HOME_ROUTES = {
  student: ROUTES.STUDENT.PROFILE,
  employer: ROUTES.EMPLOYER.DASHBOARD,
  university: ROUTES.UNIVERSITY.DASHBOARD,
  mentor: ROUTES.MENTOR.DASHBOARD,
  admin: ROUTES.ADMIN.DASHBOARD,
} as const;

// Защищенные маршруты и необходимые роли
export const PROTECTED_ROUTES = {
  [ROUTES.STUDENT.PROFILE]: ['student'],
  [ROUTES.STUDENT.ROADMAP]: ['student'],
  [ROUTES.STUDENT.COURSES]: ['student'],
  [ROUTES.STUDENT.JOBS]: ['student'],
  
  [ROUTES.EMPLOYER.DASHBOARD]: ['employer'],
  [ROUTES.EMPLOYER.JOBS]: ['employer'],
  [ROUTES.EMPLOYER.CANDIDATES]: ['employer'],
  
  [ROUTES.UNIVERSITY.DASHBOARD]: ['university'],
  [ROUTES.UNIVERSITY.STUDENTS]: ['university'],
  [ROUTES.UNIVERSITY.ANALYTICS]: ['university'],
  
  [ROUTES.MENTOR.DASHBOARD]: ['mentor'],
  [ROUTES.MENTOR.SESSIONS]: ['mentor'],
  [ROUTES.MENTOR.STUDENTS]: ['mentor'],
  
  [ROUTES.ADMIN.DASHBOARD]: ['admin'],
  [ROUTES.ADMIN.USERS]: ['admin'],
  [ROUTES.ADMIN.SETTINGS]: ['admin'],
} as const;

// Навигационные меню для разных типов пользователей
export const USER_NAVIGATION = {
  student: [
    { name: 'Профиль', path: ROUTES.STUDENT.PROFILE },
    { name: 'Карьерный план', path: ROUTES.STUDENT.ROADMAP },
    { name: 'Курсы', path: ROUTES.STUDENT.COURSES },
    { name: 'Вакансии', path: ROUTES.STUDENT.JOBS },
  ],
  employer: [
    { name: 'Дашборд', path: ROUTES.EMPLOYER.DASHBOARD },
    { name: 'Вакансии', path: ROUTES.EMPLOYER.JOBS },
    { name: 'Кандидаты', path: ROUTES.EMPLOYER.CANDIDATES },
  ],
  university: [
    { name: 'Дашборд', path: ROUTES.UNIVERSITY.DASHBOARD },
    { name: 'Студенты', path: ROUTES.UNIVERSITY.STUDENTS },
    { name: 'Аналитика', path: ROUTES.UNIVERSITY.ANALYTICS },
  ],
  mentor: [
    { name: 'Дашборд', path: ROUTES.MENTOR.DASHBOARD },
    { name: 'Сессии', path: ROUTES.MENTOR.SESSIONS },
    { name: 'Студенты', path: ROUTES.MENTOR.STUDENTS },
  ],
  admin: [
    { name: 'Дашборд', path: ROUTES.ADMIN.DASHBOARD },
    { name: 'Пользователи', path: ROUTES.ADMIN.USERS },
    { name: 'Настройки', path: ROUTES.ADMIN.SETTINGS },
  ],
} as const;