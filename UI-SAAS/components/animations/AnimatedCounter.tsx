"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ end, duration = 2.5, suffix = "", prefix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - (startTimeRef.current || 0)) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      countRef.current = Math.floor(progress * end);
      setCount(countRef.current);
      
      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, [end, duration]);
  
  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

interface AnimatedStatCardProps {
  number: string;
  label: string;
  delay?: number;
  duration?: number;
  end: number;
  suffix?: string;
  prefix?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function AnimatedStatCard({ 
  number, 
  label, 
  delay = 0.1, 
  duration = 2.5, 
  end, 
  suffix = "", 
  prefix = "",
  gradientFrom = "from-indigo-500",
  gradientTo = "to-blue-600"
}: AnimatedStatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHasAnimated(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);
  
  return (
    <motion.div 
      className="flex flex-col items-center" 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay * 0.5 }}
    >
      <span className={`text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo} dark:${gradientFrom} dark:${gradientTo}`}>
        {hasAnimated ? (
          <AnimatedCounter end={end} duration={duration} suffix={suffix} prefix={prefix} />
        ) : `${prefix}0${suffix}`}
      </span>
      <span className="text-sm md:text-base text-center text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </motion.div>
  );
}

export function AnimatedStatistics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      <AnimatedStatCard 
        number="85%" 
        label="уровень трудоустройства" 
        delay={0.1}
        duration={2.5}
        end={85}
        suffix="%"
        gradientFrom="from-blue-500"
        gradientTo="to-violet-500"
      />
      <AnimatedStatCard 
        number="6800+" 
        label="активных студентов" 
        delay={0.2}
        duration={2.5}
        end={6800}
        suffix="+"
        gradientFrom="from-purple-500"
        gradientTo="to-pink-500"
      />
      <AnimatedStatCard 
        number="250+" 
        label="компаний-партнеров" 
        delay={0.3}
        duration={2.5}
        end={250}
        suffix="+"
        gradientFrom="from-amber-500"
        gradientTo="to-red-500"
      />
      <AnimatedStatCard 
        number="35%" 
        label="рост карьерного потенциала" 
        delay={0.4}
        duration={2.5}
        end={35}
        suffix="%"
        gradientFrom="from-emerald-500"
        gradientTo="to-cyan-500"
      />
    </div>
  );
} 