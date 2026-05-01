import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-ambient hover:opacity-90",
      secondary: "bg-surface-container-highest text-tertiary hover:opacity-90",
      tertiary: "text-primary hover:underline underline-offset-4 decoration-2 border-transparent",
      outline: "border border-outline-variant text-on-surface hover:bg-surface-container-low",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl font-bold font-sans tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
