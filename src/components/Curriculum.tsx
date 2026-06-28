"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, BookOpen, Wrench } from "lucide-react";
import type { CurriculumMonth } from "@/lib/courses/program";

export function Curriculum({ months }: { months: CurriculumMonth[] }) {
  // Open the first week of the first month by default.
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="space-y-12">
      {months.map((month, mi) => (
        <div key={month.title} className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-9 h-9 rounded-xl bg-primary/10 text-primary font-heading font-bold flex items-center justify-center text-sm">
              {mi + 1}
            </span>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-on-surface">
              {month.title}
            </h3>
          </div>

          <div className="space-y-3">
            {month.weeks.map((wk, wi) => {
              const id = `${mi}-${wi}`;
              const isOpen = open === id;
              const panelId = `curriculum-panel-${id}`;
              const btnId = `curriculum-btn-${id}`;
              return (
                <div
                  key={id}
                  className="rounded-[1.75rem] border border-outline-variant/30 bg-surface-container-lowest overflow-hidden"
                >
                  <h4>
                    <button
                      id={btnId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="w-full flex items-center gap-4 text-left p-5 sm:p-6 hover:bg-surface-container-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary rounded-[1.75rem]"
                    >
                      <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-tertiary bg-tertiary/10 px-3 py-1.5 rounded-full">
                        {wk.week}
                      </span>
                      <span className="font-heading font-bold text-on-surface flex-1 text-base sm:text-lg">
                        {wk.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h4>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-surface-container-low rounded-[1.25rem] p-5 space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                              <BookOpen className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">
                                Topics
                              </span>
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {wk.topics}
                            </p>
                          </div>
                          <div className="bg-secondary-container/5 rounded-[1.25rem] p-5 space-y-2 border border-secondary-container/15">
                            <div className="flex items-center gap-2 text-secondary-container">
                              <Wrench className="w-4 h-4" />
                              <span className="text-xs font-bold uppercase tracking-wider">
                                Practice
                              </span>
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {wk.practice}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
