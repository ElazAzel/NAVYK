"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

const sizeClass = {
  small: "text-base",
  medium: "text-lg",
  large: "text-2xl",
};

const dotSize = {
  small: "h-1.5 w-1.5",
  medium: "h-2 w-2",
  large: "h-2.5 w-2.5",
};

const Logo: React.FC<LogoProps> = ({ className, size = "medium" }) => {
  return (
    <Link
      href="/"
      aria-label="NAVYK — на главную"
      className={cn(
        "inline-flex items-center font-bold tracking-tight text-foreground",
        sizeClass[size],
        className
      )}
    >
      <span>NAVYK</span>
      <span className={cn("ml-0.5 rounded-full bg-primary", dotSize[size])} />
    </Link>
  );
};

export default Logo;
