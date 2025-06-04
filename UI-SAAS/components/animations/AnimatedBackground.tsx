"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-600/20 blur-3xl"
        animate={{ 
          x: ["-50%", "-55%", "-45%", "-50%"],
          y: ["-50%", "-45%", "-55%", "-50%"],
        }}
        transition={{ 
          duration: 15, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl"
        animate={{ 
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ 
          duration: 20, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-400/10 to-orange-600/10 blur-3xl"
        animate={{ 
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ 
          duration: 18, 
          ease: "easeInOut", 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
    </div>
  );
} 