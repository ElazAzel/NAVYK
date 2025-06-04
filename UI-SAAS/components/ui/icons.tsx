import React from 'react';
import {
  LayoutDashboard,
  User,
  Building,
  School,
  BookOpen,
  Calendar,
  Award,
  Briefcase,
  Users,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

export type IconProps = {
  className?: string;
};

const createIcon = (Icon: React.ComponentType<IconProps>) => {
  return function IconWrapper({ className }: IconProps) {
    return <Icon className={className} />;
  };
};

export const Icons = {
  dashboard: createIcon(LayoutDashboard),
  user: createIcon(User),
  building: createIcon(Building),
  school: createIcon(School),
  book: createIcon(BookOpen),
  calendar: createIcon(Calendar),
  award: createIcon(Award),
  briefcase: createIcon(Briefcase),
  users: createIcon(Users),
  file: createIcon(FileText),
  chart: createIcon(BarChart3),
  settings: createIcon(Settings),
} as const;
