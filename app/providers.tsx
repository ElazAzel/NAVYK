"use client";

import { ThemeProvider } from "next-themes";
import { NotificationsProvider } from "./components/notifications/NotificationsProvider";
import { AuthProvider } from "@/context/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <NotificationsProvider>
          {children}
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}