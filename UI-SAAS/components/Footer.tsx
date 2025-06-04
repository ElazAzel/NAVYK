"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Instagram, Twitter, Github, Linkedin, ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks";

export default function Footer() {
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1
  });

  // Анимация для Footer
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.footer
      ref={ref as React.RefObject<HTMLDivElement>}
      className="border-t bg-background py-12 md:py-16"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={childVariants} className="space-y-4">
          <Logo size="large" />
          <p className="text-muted-foreground max-w-xs">
            Платформа для развития навыков и построения карьеры для студентов, компаний и университетов
          </p>
          <div className="flex space-x-3">
            <FooterSocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
            <FooterSocialLink href="https://instagram.com" icon={<Instagram />} label="Instagram" />
            <FooterSocialLink href="https://github.com" icon={<Github />} label="GitHub" />
            <FooterSocialLink href="https://linkedin.com" icon={<Linkedin />} label="LinkedIn" />
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-4">
          <h3 className="text-lg font-semibold">Платформа</h3>
          <ul className="space-y-2">
            <FooterLink href="/features">Возможности</FooterLink>
            <FooterLink href="/pricing">Тарифы</FooterLink>
            <FooterLink href="/testimonials">Отзывы</FooterLink>
            <FooterLink href="/faq">Частые вопросы</FooterLink>
          </ul>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-4">
          <h3 className="text-lg font-semibold">Сообщество</h3>
          <ul className="space-y-2">
            <FooterLink href="/blog">Блог</FooterLink>
            <FooterLink href="/events">Мероприятия</FooterLink>
            <FooterLink href="/partnerships">Партнерство</FooterLink>
            <FooterLink href="/careers">Вакансии</FooterLink>
          </ul>
        </motion.div>

        <motion.div variants={childVariants} className="space-y-4">
          <h3 className="text-lg font-semibold">Связаться с нами</h3>
          <p className="text-muted-foreground">
            Есть вопросы? Свяжитесь с нашей командой поддержки
          </p>
          <Link 
            href="mailto:info@navyk.com" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <Mail className="h-4 w-4 mr-2" />
            info@navyk.com
          </Link>
        </motion.div>
      </div>

      <motion.div 
        variants={childVariants}
        className="container mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between"
      >
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} NAVYK. Все права защищены.
        </p>
        <div className="flex space-x-6 text-sm">
          <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
            Условия использования
          </Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
            Политика конфиденциальности
          </Link>
        </div>
      </motion.div>
    </motion.footer>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center group"
      >
        {children}
        <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </Link>
    </li>
  );
}

function FooterSocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href}
      aria-label={label}
      className={cn(
        "h-8 w-8 rounded-full flex items-center justify-center",
        "bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
      )}
    >
      <span className="sr-only">{label}</span>
      {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4" })}
    </Link>
  );
} 