import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-on-surface">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border-none bg-surface-container-low px-4 py-2 text-sm text-on-surface ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-on-surface-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:bg-surface-container-lowest transition-all",
            error && "ring-2 ring-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }
);
InputField.displayName = "InputField";
