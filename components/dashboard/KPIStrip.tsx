"use client";

import React from "react";

interface Stat {
  label: string;
  value: string | number;
  subtitle?: string;
  delta?: string; // e.g., "+12% vs last month"
  positive?: boolean;
}

interface KPIStripProps {
  stats: Stat[];
  className?: string;
}

const KPIStrip: React.FC<KPIStripProps> = ({ stats, className }) => {
  // Если статистики нет, показываем пустое состояние
  if (!stats || stats.length === 0) {
    return (
      <div
        className={className || ""}
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          justifyContent: "center",
          height: "150px",
          color: "var(--muted-foreground)",
        }}
      >
        <p className="text-base">
          Пока нет статистики. Начните с добавления курсов или участия в мероприятиях.
        </p>
      </div>
    );
  }

  return (
    <div
      className={className || ""}
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "1fr"
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          style={{
            borderRadius: "0.5rem",
            border: "1px solid var(--border)",
            background: "var(--card)",
            transition: "background-color 150ms ease-ui"
          }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          <p className="text-2xl font-semibold text-foreground">
            {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
          </p>
          {stat.subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{stat.subtitle}</p>
          )}
          {stat.delta && (
            <p className="mt-2 text-xs font-medium">
              {stat.positive ? "text-success" : "text-destructive"}
              {stat.delta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export { KPIStrip };