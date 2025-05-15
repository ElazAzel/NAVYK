"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Новое мероприятие",
      message: "Доступна регистрация на мастер-класс по React",
      date: "2025-05-16T10:00:00Z",
      read: false
    },
    {
      id: 2,
      title: "Напоминание",
      message: "Вебинар по ML начнется через час",
      date: "2025-05-16T09:00:00Z",
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <DropdownMenuItem
              key={notification.id}
              className="flex flex-col items-start p-4 space-y-1 cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex justify-between items-center w-full">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(notification.date)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              {!notification.read && (
                <Badge variant="secondary" className="mt-1">Новое</Badge>
              )}
            </DropdownMenuItem>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Нет новых уведомлений
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}