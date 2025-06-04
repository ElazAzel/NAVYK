"use client";

import React from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface ToggleButtonProps {
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label="Переключить тему"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ToggleButton; 