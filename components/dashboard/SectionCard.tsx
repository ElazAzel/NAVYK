"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

interface SectionCardProps {
  /** Уникальный ключ для анимации появления */
  id?: string;
  /** Заголовок секции */
  header: {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
  };
  /** Контент секции (children) */
  children: React.ReactNode;
  /** Подвал секции */
  footer?: React.ReactNode;
  /** Показывать состояние loading/empty/error */
  state?: "populated" | "loading" | "empty" | "error";
  /** Пользовательский класс для корневого контейнера */
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  id,
  header,
  children,
  footer,
  state = "populated",
  className,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, [id]);

  const stateClasses = {
    populated: "",
    loading: "animate-pulse",
    empty: "border-dashed text-muted-foreground",
    error: "border-red-500 text-red-500",
  }[state];

  // Empty state logic
  const emptyStateVisible =
    state === "empty" || (state === "populated" && React.Children.toArray(children).length === 0);

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 sm:p-8",
        stateClasses,
        "opacity-0 transition-all duration-300",
        mounted && "opacity-100"
      )}
    >
      {/* Заголовок */}
      <div className="flex flex-col space-y-2 mb-5">
        <h3 className="text-lg font-semibold text-foreground">{header.title}</h3>
        {header.subtitle && (
          <p className="text-sm text-muted-foreground">{header.subtitle}</p>
        )}
        {header.action && (
          <div className="mt-2 align-self-end">{header.action}</div>
        )}
      </div>

      {/* Контент с пустым состоянием */}
      {emptyStateVisible ? (
        <EmptyState
          title={header.title || "Данные отсутствуют"}
          description={header.subtitle || "В этом разделе появится информация когда вы начнете пользоваться платформой"}
          action={{
            label: "Начать",
            href: "/",
          }}
        />
      ) : (
        <div>{React.Children.toArray(children)}</div>
      )}

      {/* Подвал */}
      {footer && <div className="mt-5 pt-4 border-t border-border text-sm">{footer}</div>}
    </div>
  );
};

export { SectionCard };