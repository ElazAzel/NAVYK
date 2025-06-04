"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextChangerProps {
  texts?: string[];
  className?: string;
  interval?: number;
}

export function AnimatedTextChanger({
  texts = ["карьерного роста", "развития навыков", "построения будущего", "образования"],
  className = "font-semibold text-indigo-600 dark:text-indigo-400",
  interval = 3000
}: AnimatedTextChangerProps) {
  const [index, setIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  // Отображаем только первый элемент при рендеринге на сервере
  if (!isMounted) {
    return (
      <span className="relative inline-block min-w-[220px] min-h-[1.5em]">
        <span className={`absolute left-0 top-0 ${className}`}>
          {texts[0]}
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-block min-w-[220px] min-h-[1.5em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`absolute left-0 top-0 ${className}`}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
} 