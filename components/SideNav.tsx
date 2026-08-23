"use client";

import React from "react";
import { useAuth } from "@/context/auth-context";
import RoleNavigation from "./RoleNavigation";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import { LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SideNavProps {
  className?: string;
}

export default function SideNav({ className }: SideNavProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const roleLabels: Record<string, string> = {
    student: "Студент",
    employer: "Работодатель",
    university: "Университет",
    mentor: "Ментор",
    admin: "Администратор",
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-[100dvh] w-60 flex-col border-r bg-card",
        className
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b px-5">
        <Logo size="small" />
      </div>

      <div className="flex items-center gap-3 px-4 py-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-xs">
            {user.name[0] ?? <UserRound className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-tight">{user.name}</p>
          <p className="text-xs text-muted-foreground">{roleLabels[user.role ?? ""] ?? user.role}</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <RoleNavigation vertical />
      </nav>

      <div className="shrink-0 border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut />
          Выйти
        </Button>
      </div>
    </aside>
  );
}
