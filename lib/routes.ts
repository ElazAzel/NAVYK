import type { AppRoutes } from './types/app-routes';

export const ROUTES: AppRoutes = {
  HOME: '/',

  STUDENT: {
    DASHBOARD: '/student/dashboard',
    PROFILE: '/student/profile',
    ROADMAP: '/student/roadmap',
    COURSES: '/student/courses',
    EVENTS: '/student/events',
    JOBS: '/student/jobs',
    ACHIEVEMENTS: '/student/achievements',
    PROJECTS: '/student/projects',
  },

  EMPLOYER: {
    DASHBOARD: '/employer/dashboard',
    JOBS: '/employer/jobs',
    CANDIDATES: '/employer/candidates',
    ANALYTICS: '/employer/analytics',
    EVENTS: '/employer/events',
    PROFILE: '/employer/profile',
  },

  UNIVERSITY: {
    DASHBOARD: '/university/dashboard',
    STUDENTS: '/university/students',
    ANALYTICS: '/university/analytics',
    EVENTS: '/university/events',
    PROFILE: '/university/profile',
  },

  MENTOR: {
    DASHBOARD: '/mentor/dashboard',
  },

  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    ML: '/admin/ml',
  },
} as const;

// Домашняя страница по роли
export const USER_HOME_ROUTES = {
  student: ROUTES.STUDENT.DASHBOARD,
  employer: ROUTES.EMPLOYER.DASHBOARD,
  university: ROUTES.UNIVERSITY.DASHBOARD,
  mentor: ROUTES.MENTOR.DASHBOARD,
  admin: ROUTES.ADMIN.DASHBOARD,
} as const;

// Защищенные маршруты и необходимые роли
export const PROTECTED_ROUTES = {
  [ROUTES.STUDENT.DASHBOARD]: ['student'],
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

  [ROUTES.ADMIN.DASHBOARD]: ['admin'],
  [ROUTES.ADMIN.ML]: ['admin'],
} as const;
