import type { Route } from 'next';

export type StudentRoutes = {
  DASHBOARD: '/student/dashboard';
  PROFILE: '/student/profile';
  ROADMAP: '/student/roadmap';
  COURSES: '/student/courses';
  EVENTS: '/student/events';
  JOBS: '/student/jobs';
  ACHIEVEMENTS: '/student/achievements';
  SKILLS: '/student/skills';
  ACTIVITY: '/student/activity';
};

export type EmployerRoutes = {
  DASHBOARD: '/employers/dashboard';
  JOBS: '/employers/jobs';
  CANDIDATES: '/employers/candidates';
};

export type UniversityRoutes = {
  DASHBOARD: '/universities/dashboard';
  STUDENTS: '/universities/students';
  ANALYTICS: '/universities/analytics';
};

export type MentorRoutes = {
  DASHBOARD: '/mentors/dashboard';
  SESSIONS: '/mentors/sessions';
  STUDENTS: '/mentors/students';
};

export type AdminRoutes = {
  DASHBOARD: '/admin/dashboard';
  USERS: '/admin/users';
  SETTINGS: '/admin/settings';
};

export type AppRoutes = {
  HOME: '/';
  ABOUT: '/about';
  CONTACT: '/contact';
  STUDENT: StudentRoutes;
  EMPLOYER: EmployerRoutes;
  UNIVERSITY: UniversityRoutes;
  MENTOR: MentorRoutes;
  ADMIN: AdminRoutes;
};

export type RouteValue<T> = T[keyof T];
export type AppRoute = RouteValue<AppRoutes[keyof AppRoutes]>;
