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
  vertical?: boolean;
}

export default function RoleNavigation({ className, vertical = false }: RoleNavigationProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const userRole = user?.role ?? "student";
  const navItems: NavItem[] = navigationConfig[userRole as NonNullable<UserRole>] ?? [];

  return (
    <nav
      aria-label="Навигация по разделу"
      className={cn("space-y-0.5", vertical && "flex flex-col", className)}
    >
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-[background-color,color] duration-150 ease-ui",
              vertical ? "w-full" : "",
              isActive
                ? "bg-secondary text-foreground [&_svg]:text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.icon}
            <span className={cn(isActive && "font-medium")}>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
