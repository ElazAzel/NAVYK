"use client";

import React from "react";
import Link from "next/link";
import { useAuth, UserRole } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { 
  User, 
  LogOut, 
  Settings, 
  UserCircle,
  Building, 
  School, 
  BookOpen, 
  ShieldCheck 
} from "lucide-react";

const roleIcons: Record<NonNullable<UserRole>, React.ReactNode> = {
  "student": <User className="w-4 h-4 mr-2" />,
  "employer": <Building className="w-4 h-4 mr-2" />,
  "university": <School className="w-4 h-4 mr-2" />,
  "mentor": <BookOpen className="w-4 h-4 mr-2" />,
  "admin": <ShieldCheck className="w-4 h-4 mr-2" />,
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

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="outline" size="sm">
            Войти
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm">
            Регистрация
          </Button>
        </Link>
      </div>
    );
  }

  const userRole = user.role || "student";
  const firstLetter = user.name ? user.name[0] : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user.avatar || ""} 
              alt={user.name} 
            />
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Тип аккаунта</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center cursor-default">
          {userRole && roleIcons[userRole]}
          <span>{userRole && roleLabels[userRole]}</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <Link href={`/${userRole}/profile`}>
          <DropdownMenuItem className="cursor-pointer">
            <UserCircle className="w-4 h-4 mr-2" />
            <span>Мой профиль</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/${userRole}/settings`}>
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            <span>Настройки</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator />
        
        {/* Для демонстрационных целей переключение ролей */}
        <DropdownMenuLabel>Демо (переключение ролей)</DropdownMenuLabel>
        {(Object.keys(roleLabels) as NonNullable<UserRole>[])
          .filter(role => role !== userRole)
          .map(role => (
            <DropdownMenuItem 
              key={role} 
              className="cursor-pointer"
              onClick={() => switchRole(role)}
            >
              {roleIcons[role]}
              <span>Войти как {roleLabels[role]}</span>
            </DropdownMenuItem>
          ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 