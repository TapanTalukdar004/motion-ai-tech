"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button, ButtonProps } from "./ui/Button";
import { DemoLeadForm } from "./DemoLeadForm";

interface EnquiryDialogProps {
  label: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  /** Pre-selects the form's "interested in" field. */
  defaultInterest?: string;
  heading?: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

export function EnquiryDialog({
  label,
  variant = "primary",
  size = "md",
  className,
  defaultInterest,
  heading,
  icon,
}: EnquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

    // Move focus into the dialog once it has mounted.
    const t = setTimeout(() => {
      const f = getFocusable();
      (f[0] ?? dialogRef.current)?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const f = getFocusable();
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      // Restore focus to the trigger when the dialog closes.
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <Button
        ref={triggerRef}
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {icon}
        {label}
      </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-label={heading || "Book a free demo"}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />
                <motion.div
                  ref={dialogRef}
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ type: "spring", damping: 26, stiffness: 240 }}
                  className="relative z-10 w-full max-w-md bg-surface-container-lowest rounded-[2rem] shadow-2xl border border-outline-variant/30 p-8 max-h-[90vh] overflow-y-auto focus:outline-none"
                >
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-5 right-5 p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <DemoLeadForm
                    defaultInterest={defaultInterest}
                    heading={heading}
                    onDone={() => {}}
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
