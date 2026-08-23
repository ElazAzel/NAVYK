"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import SideNav from "./SideNav";
import UserNav from "./UserNav";
import ToggleButton from "./ToggleButton";
import NotificationBell from "@/app/components/notifications/NotificationBell";
import { navigationConfig } from "@/lib/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";

interface RoleLayoutProps {
  children: ReactNode;
  showSideNav?: boolean;
  pageTitle?: string;
}

const getPageTitle = (pathname: string | null): string => {
  if (!pathname) return "Дашборд";
  for (const items of Object.values(navigationConfig)) {
    const match = items.find((item) => pathname.startsWith(item.href));
    if (match) return match.title;
  }
  const section = pathname.split("/")[2];
  return section ? section.charAt(0).toUpperCase() + section.slice(1) : "Дашборд";
};

export default function RoleLayout({
  children,
  showSideNav = true,
  pageTitle,
}: RoleLayoutProps) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Проверяем авторизацию и соответствие роли
  useEffect(() => {
    setMounted(true);

    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    if (user?.role && pathname) {
      const currentRole = pathname.split("/")[1];
      if (currentRole !== user.role) {
        router.push(`/${user.role}/dashboard`);
      }
    }
  }, [user, isLoading, pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3 bg-background">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary"
          role="status"
          aria-label="Загрузка"
        />
        <p className="text-sm text-muted-foreground">Загрузка…</p>
      </div>
    );
  }

  if (!user) return null;

  const title = pageTitle ?? getPageTitle(pathname);

  return (
    <div className="min-h-[100dvh] bg-background">
      {showSideNav && isDesktop && <SideNav />}
      {showSideNav && !isDesktop && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-60 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Навигация</SheetTitle>
            </SheetHeader>
            <SideNav />
          </SheetContent>
        </Sheet>
      )}

      <div className={showSideNav && isDesktop ? "lg:pl-60" : ""}>
        <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="flex h-14 items-center gap-3 px-4 sm:px-6 lg:px-8">
            {showSideNav && !isDesktop && (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Открыть меню"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu />
              </Button>
            )}
            <h1 className="truncate text-base font-semibold tracking-tight">
              {title}
            </h1>

            <div className="ml-auto flex items-center gap-1">
              <NotificationBell />
              <ToggleButton />
              <UserNav />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
