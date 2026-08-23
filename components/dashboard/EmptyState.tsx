"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Заголовок пустого состояния */
  title: string;
  /** Подзаголовок/описание */
  description: string;
  /** Действие (кнопка/ссылка) */
  action?: {
    label: string;
    href: string;
    asChild?: boolean;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center py-12">
      <p className="text-4xl text-muted-foreground opacity-50 mb-2">—</p>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      {action && (
        <div className="mt-4 flex gap-2">
          <a
            href={action.href}
            className={cn(
              "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            )}
          >
            {action.label}
          </a>
        </div>
      )}
    </div>
  );
};

export { EmptyState };