"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import ToggleButton from "@/components/ToggleButton";
import UserNav from "@/components/UserNav";
import { cn } from "@/lib/utils";

const marketingLinks = [
  { href: "/features", label: "Возможности" },
  { href: "/pricing", label: "Тарифы" },
  { href: "/events", label: "Мероприятия" },
  { href: "/blog", label: "Блог" },
  { href: "/faq", label: "FAQ" },
] as const;

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="page-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav
              aria-label="Основная навигация"
              className="hidden items-center gap-1 md:flex"
            >
              {marketingLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors duration-150 ease-ui",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ToggleButton />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
