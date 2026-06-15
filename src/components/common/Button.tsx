"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "sand" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sand/50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent-dark via-accent to-accent-light hover:from-accent hover:to-accent-light text-white shadow-md hover:shadow-accent/20 border border-white/5",
    secondary: "bg-primary-light hover:bg-primary-light/80 text-white border border-white/10",
    sand: "bg-sand hover:bg-sand-dark text-primary-dark shadow-md hover:shadow-sand/20",
    outline: "border border-sand text-sand hover:bg-sand hover:text-primary-dark",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs tracking-wider uppercase",
    md: "px-6 py-2.5 text-sm tracking-wide",
    lg: "px-8 py-3.5 text-base tracking-wide",
  };

  const content = (
    <motion.span 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
