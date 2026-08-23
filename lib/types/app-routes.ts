import type { Route } from 'next';

export type StudentRoutes = {
  DASHBOARD: '/student/dashboard';
  PROFILE: '/student/profile';
  ROADMAP: '/student/roadmap';
  COURSES: '/student/courses';
  EVENTS: '/student/events';
  JOBS: '/student/jobs';
  ACHIEVEMENTS: '/student/achievements';
  PROJECTS: '/student/projects';
};

export type EmployerRoutes = {
  DASHBOARD: '/employer/dashboard';
  JOBS: '/employer/jobs';
  CANDIDATES: '/employer/candidates';
  ANALYTICS: '/employer/analytics';
  EVENTS: '/employer/events';
  PROFILE: '/employer/profile';
};

export type UniversityRoutes = {
  DASHBOARD: '/university/dashboard';
  STUDENTS: '/university/students';
  ANALYTICS: '/university/analytics';
  EVENTS: '/university/events';
  PROFILE: '/university/profile';
};

export type MentorRoutes = {
  DASHBOARD: '/mentor/dashboard';
};

export type AdminRoutes = {
  DASHBOARD: '/admin/dashboard';
  ML: '/admin/ml';
};

export type AppRoutes = {
  HOME: '/';
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
