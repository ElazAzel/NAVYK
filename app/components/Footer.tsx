import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const footerColumns = [
  {
    title: "Платформа",
    links: [
      { href: "/features", label: "Возможности" },
      { href: "/pricing", label: "Тарифы" },
      { href: "/testimonials", label: "Отзывы" },
      { href: "/faq", label: "Частые вопросы" },
    ],
  },
  {
    title: "Сообщество",
    links: [
      { href: "/blog", label: "Блог" },
      { href: "/events", label: "Мероприятия" },
      { href: "/partnerships", label: "Партнерство" },
      { href: "/careers", label: "Вакансии" },
    ],
  },
  {
    title: "Правовое",
    links: [
      { href: "/terms", label: "Условия использования" },
      { href: "/privacy", label: "Политика конфиденциальности" },
      { href: "/policy", label: "Политика платформы" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="page-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Платформа развития навыков и построения карьеры для студентов,
              компаний и университетов Казахстана.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="space-y-4">
              <h3 className="text-sm font-medium">{column.title}</h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 ease-ui hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NAVYK. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Сделано в Казахстане
          </p>
        </div>
      </div>
    </footer>
  );
}
