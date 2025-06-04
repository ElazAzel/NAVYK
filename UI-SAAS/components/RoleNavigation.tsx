"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/navigation";
import type { AppRoute } from "@/lib/types/app-routes";
import type { UserRole } from "@/context/auth-context";

interface NavItem {
  title: string;
  href: AppRoute;
  icon: React.ReactElement;
}

interface RoleNavigationProps {
  className?: string;
}

export default function RoleNavigation({ className }: RoleNavigationProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Получаем навигационные элементы для текущей роли пользователя
  const userRole = user?.role ?? 'student';
  const navItems: NavItem[] = navigationConfig[userRole as NonNullable<UserRole>] ?? [];

  return (
    <nav className={cn("flex space-x-4", className)}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center rounded-lg px-3 py-2",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span>{item.title}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}