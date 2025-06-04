"use client";

import Link from "next/link";
import React from "react";
import Logo from "@/components/Logo";
import ToggleButton from "@/components/ToggleButton";
import UserNav from "@/components/UserNav";
import RoleNavigation from "@/components/RoleNavigation";
import NotificationBell from "@/app/components/notifications/NotificationBell";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const { user } = useAuth();
  const showRoleNav = user && user.role !== null;

  return (
    <div className="border-b z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            {!user && (
              <nav className="hidden md:flex items-center gap-6">
                <Link 
                  href="/"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Главная
                </Link>
                <Link 
                  href="/features"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Возможности
                </Link>
                <Link 
                  href="/pricing"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Тарифы
                </Link>
                <Link 
                  href="/about"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  О нас
                </Link>
                <Link 
                  href="/contact"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Контакты
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <NotificationBell />
            <ToggleButton />
            <UserNav />
          </div>
        </div>
        
        {showRoleNav && (
          <div className="h-12 -mb-px border-t border-border pt-0 overflow-x-auto">
            <RoleNavigation className="h-full flex items-center" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;