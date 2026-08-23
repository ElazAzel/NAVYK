"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "medium",
  animated = true 
}) => {
  const sizeClass = {
    small: "text-lg",
    medium: "text-xl",
    large: "text-3xl"
  };

  // Варианты анимации для логотипа
  const logoAnimation = {
    initial: { 
      scale: 0.9,
      opacity: 0 
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Варианты анимации для точки
  const dotAnimation = {
    initial: { 
      scale: 0,
      opacity: 0 
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    },
    hover: { 
      scale: 1.5,
      rotate: 360,
      transition: { 
        duration: 0.3
      }
    }
  };

  // Определяем компонент в зависимости от того, нужна ли анимация
  const LogoComponent = animated ? motion.div : "div";
  const animationProps = animated 
    ? {
        initial: "initial",
        animate: "animate",
        whileHover: "hover",
        variants: logoAnimation
      } 
    : {};

  return (
    <Link href="/">
      <LogoComponent
        className={cn(
          "font-bold tracking-tight flex items-center",
          sizeClass[size],
          className
        )}
        {...animationProps}
      >
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          NAVYK
        </span>
        {animated ? (
          <motion.div
            className="ml-1 w-2 h-2 rounded-full bg-accent"
            variants={dotAnimation}
          />
        ) : (
          <div className="ml-1 w-2 h-2 rounded-full bg-accent" />
        )}
      </LogoComponent>
    </Link>
  );
};

export default Logo; 