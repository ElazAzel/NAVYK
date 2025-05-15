"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from 'next/image';

// Анимированный фон с градиентом
export const AnimatedBackground: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(var(--primary), 0.05), var(--background), rgba(var(--secondary), 0.05))",
            "linear-gradient(to bottom right, rgba(var(--secondary), 0.05), var(--background), rgba(var(--primary), 0.05))",
            "linear-gradient(to bottom right, rgba(var(--primary), 0.05), var(--background), rgba(var(--secondary), 0.05))"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light" />
    </div>
  );
};

interface AnimatedStatisticsProps {
  from?: number;
  to?: number;
  duration?: number;
  formatter?: (value: number) => string;
  suffix?: string;
  prefix?: string;
}

/**
 * Компонент AnimatedStatistics отображает числовое значение с анимацией счетчика
 * @param from - начальное значение
 * @param to - конечное значение
 * @param duration - длительность анимации в секундах
 * @param formatter - функция форматирования числа
 * @param suffix - суффикс (например, "%", "₽" и т.д.)
 * @param prefix - префикс (например, "от", "$" и т.д.)
 */
export const AnimatedStatistics: React.FC<AnimatedStatisticsProps> = ({
  from = 0,
  to = 100,
  duration = 1.5,
  formatter = (value: number) => (Math.round(value * 10) / 10).toLocaleString(),
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(from);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(from + progress * (to - from));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, duration, isInView]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={ref}>
      {prefix}
      {formatter(count)}
      {suffix}
    </span>
  );
};

// Анимированная демо-карта
export interface AnimatedDemoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AnimatedDemoCard: React.FC<AnimatedDemoCardProps> = ({
  title,
  description,
  icon,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {icon && <div className="mb-4 text-primary">{icon}</div>}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

// Анимированная карточка функционала
export interface AnimatedFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
  className?: string;
}

export const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  title,
  description,
  icon,
  color = "primary",
  delay = 0,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:bg-opacity-80 transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className={`p-3 rounded-full bg-${color}/10 text-${color} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  );
};

// Анимированный отзыв
export interface AnimatedTestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  className?: string;
}

export const AnimatedTestimonialCard: React.FC<AnimatedTestimonialCardProps> = ({
  quote,
  author,
  role,
  avatar,
  className
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-card border rounded-xl p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-4 text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>
      <p className="text-foreground mb-4 italic">{quote}</p>
      <div className="flex items-center mt-4">
        {avatar ? (
          <Image src={avatar} alt={author} className="w-10 h-10 rounded-full mr-3" width={40} height={40} />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
            {author[0]}
          </div>
        )}
        <div>
          <p className="font-medium">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  showValue?: boolean;
  className?: string;
}

/**
 * Компонент AnimatedProgressBar отображает анимированную полосу прогресса
 * @param value - текущее значение
 * @param max - максимальное значение
 * @param color - цвет полосы (primary, secondary, accent или CSS цвет)
 * @param height - высота полосы в пикселях
 * @param showValue - отображать ли значение в процентах
 * @param className - дополнительные классы
 */
export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max = 100,
  color = "primary",
  height = 8,
  showValue = false,
  className,
}) => {
  const percentage = (value / max) * 100;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Определяем цвет полосы на основе предоставленного значения
  const getBarColor = () => {
    if (color === "primary") return "bg-primary";
    if (color === "secondary") return "bg-secondary";
    if (color === "accent") return "bg-accent";
    if (color.includes("-")) return `bg-${color}`;
    return `bg-[${color}]`;
  };

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="relative">
        <div
          className={`w-full rounded-full bg-muted`}
          style={{ height: `${height}px` }}
        >
          <motion.div
            className={`h-full rounded-full ${getBarColor()}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        {showValue && (
          <div className="mt-1 text-xs text-muted-foreground">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  );
};

interface AnimatedDemoChartProps {
  className?: string;
}

/**
 * Компонент AnimatedDemoChart отображает демонстрационный график с анимацией
 * Это компонент-заглушка для демонстрации. В реальном проекте здесь будет график данных.
 */
export const AnimatedDemoChart: React.FC<AnimatedDemoChartProps> = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Создаем случайные данные для графика
  const generateData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  };

  const data = generateData();
  const max = Math.max(...data);

  return (
    <div 
      ref={ref} 
      className="w-full h-64 p-4 bg-muted/30 rounded-xl"
    >
      <div className="text-xs text-muted-foreground mb-4">
        Распределение студентов по направлениям (в %)
      </div>
      <div className="flex items-end justify-between h-48 gap-1">
        {data.map((value, index) => {
          const height = (value / max) * 100;
          return (
            <motion.div
              key={index}
              className="relative flex-1 bg-primary/80 rounded-t-md hover:bg-primary transition-colors"
              style={{ height: 0 }}
              animate={isInView ? { height: `${height}%` } : { height: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100">
                {value}%
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
        <span>Янв</span>
        <span>Фев</span>
        <span>Мар</span>
        <span>Апр</span>
        <span>Май</span>
        <span>Июн</span>
        <span>Июл</span>
        <span>Авг</span>
        <span>Сен</span>
        <span>Окт</span>
        <span>Ноя</span>
        <span>Дек</span>
      </div>
    </div>
  );
};

// Анимированное переключение текста
export interface AnimatedTextChangerProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export const AnimatedTextChanger: React.FC<AnimatedTextChangerProps> = ({
  texts,
  interval = 3000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={cn("h-8 overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};