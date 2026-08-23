"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Settings,
  UserCircle2,
  Building2,
  GraduationCap,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const roleIcons: Record<NonNullable<UserRole>, React.ReactNode> = {
  "student": <GraduationCap className="h-4 w-4" />,
  "employer": <Building2 className="h-4 w-4" />,
  "university": <GraduationCap className="h-4 w-4" />,
  "mentor": <BookOpen className="h-4 w-4" />,
  "admin": <ShieldCheck className="h-4 w-4" />,
};

const roleLabels: Record<NonNullable<UserRole>, string> = {
  "student": "Студент",
  "employer": "Работодатель",
  "university": "Университет",
  "mentor": "Ментор",
  "admin": "Администратор",
};

export default function UserNav() {
  const { user, logout, switchRole } = useAuth();
  const router = useRouter();

  const handleProfile = () => {
    if (!user?.role) return;
    router.push(`/${user.role}/profile`);
  };

  const handleSettings = () => {
    if (!user?.role) return;
    router.push(`/${user.role}/profile`);
  };

  const handleSwitchRole = (role: NonNullable<UserRole>) => {
    switchRole(role);
    router.push(`/${role}/dashboard`);
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
          Войти
        </Button>
        <Button size="sm" onClick={() => router.push("/login")}>
          Регистрация
        </Button>
      </div>
    );
  }

  const userRole = user.role || "student";
  const firstLetter = user.name ? user.name[0] : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Меню пользователя"
          className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || ""} alt={user.name} />
            <AvatarFallback className="text-xs">{firstLetter}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-default" disabled>
          {roleIcons[userRole]}
          <span>{roleLabels[userRole]}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onSelect={handleProfile}>
          <UserCircle2 className="mr-2 h-4 w-4" />
          <span>Мой профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onSelect={handleSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Демо: переключение ролей */}
        <DropdownMenuLabel>Демо · роли</DropdownMenuLabel>
        {(Object.keys(roleLabels) as NonNullable<UserRole>[])
          .filter((role) => role !== userRole)
          .map((role) => (
            <DropdownMenuItem
              key={role}
              className="cursor-pointer"
              onSelect={() => handleSwitchRole(role)}
            >
              {roleIcons[role]}
              <span>Войти как {roleLabels[role]}</span>
            </DropdownMenuItem>
          ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onSelect={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
