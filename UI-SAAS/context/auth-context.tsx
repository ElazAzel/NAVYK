"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Определяем доступные роли пользователей
export type UserRole = "student" | "employer" | "university" | "mentor" | "admin" | null;

// Интерфейс для данных пользователя
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Интерфейс контекста авторизации
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void; // Для демонстрационных целей
}

// Создаем контекст
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для использования контекста
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Пример пользователей для демонстрации (в реальном проекте должны быть в API)
const DEMO_USERS: Record<string, User> = {
  "student@example.com": {
    id: "1",
    name: "Александр Студент",
    email: "student@example.com",
    role: "student",
    avatar: "/avatars/student.png"
  },
  "employer@example.com": {
    id: "2",
    name: "ТОО Работодатель",
    email: "employer@example.com",
    role: "employer",
    avatar: "/avatars/employer.png"
  },
  "university@example.com": {
    id: "3",
    name: "Университет Example",
    email: "university@example.com",
    role: "university",
    avatar: "/avatars/university.png"
  },
  "mentor@example.com": {
    id: "4",
    name: "Ментор Менторович",
    email: "mentor@example.com",
    role: "mentor",
    avatar: "/avatars/mentor.png"
  },
  "admin@example.com": {
    id: "5",
    name: "Администратор",
    email: "admin@example.com",
    role: "admin",
    avatar: "/avatars/admin.png"
  }
};

// Провайдер контекста
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверяем авторизацию при загрузке страницы
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("navyk_user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Ошибка при восстановлении сессии:", e);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Функция входа
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Имитация запроса API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const demoUser = DEMO_USERS[email];
        
        if (demoUser && password === "password") {
          setUser(demoUser);
          localStorage.setItem("navyk_user", JSON.stringify(demoUser));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error("Неверный логин или пароль"));
        }
      }, 1000);
    });
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem("navyk_user");
  };

  // Функция для переключения роли (для демонстрации)
  const switchRole = (role: UserRole) => {
    if (!user) return;
    
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem("navyk_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    switchRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 