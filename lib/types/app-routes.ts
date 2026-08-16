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
  DASHBOARD: '/employer/dashboard';
  JOBS: '/employer/jobs';
  CANDIDATES: '/employer/candidates';
};

export type UniversityRoutes = {
  DASHBOARD: '/university/dashboard';
  STUDENTS: '/university/students';
  ANALYTICS: '/university/analytics';
};

export type MentorRoutes = {
  DASHBOARD: '/mentor/dashboard';
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
export type AppRoute =
  | '/'
  | RouteValue<StudentRoutes>
  | RouteValue<EmployerRoutes>
  | RouteValue<UniversityRoutes>
  | RouteValue<MentorRoutes>
  | RouteValue<AdminRoutes>;
