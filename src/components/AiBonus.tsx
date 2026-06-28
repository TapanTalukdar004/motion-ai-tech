import React from "react";
import {
  Sparkles,
  Bot,
  MessageCircle,
  Search,
  Database,
  Brain,
  ShieldCheck,
  Network,
  Image as ImageIcon,
  Lightbulb,
  Wrench,
  Rocket,
} from "lucide-react";
import type { AiBonus as AiBonusType } from "@/lib/courses/program";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  database: Database,
  chat: MessageCircle,
  bot: Bot,
  sparkles: Sparkles,
  shield: ShieldCheck,
  brain: Brain,
  image: ImageIcon,
  graph: Network,
};

export function AiBonus({ data }: { data: AiBonusType }) {
  return (
    <div className="bg-tertiary/5 p-8 md:p-12 rounded-[3rem] border border-tertiary/20 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary/10 text-xs font-bold uppercase tracking-wider text-tertiary">
          <Sparkles className="w-3.5 h-3.5" />
          AI Bonus
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-on-surface">
          {data.title}
        </h2>
        {data.tagline && (
          <p className="text-lg font-bold text-on-surface">{data.tagline}</p>
        )}
        <p className="text-on-surface-variant leading-relaxed max-w-3xl">{data.body}</p>
      </div>

      {/* Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.activities.map((act, i) => {
          const isPractical = act.type === "practical";
          const Icon =
            (act.icon ? ICONS[act.icon] : undefined) ??
            (isPractical ? Wrench : Lightbulb);
          return (
            <div
              key={i}
              className="bg-surface-container-lowest rounded-[1.5rem] p-6 space-y-3 border border-outline-variant/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isPractical
                      ? "bg-secondary-container/15 text-secondary-container"
                      : "bg-tertiary/10 text-tertiary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    isPractical
                      ? "bg-secondary-container/15 text-secondary-container"
                      : "bg-tertiary/10 text-tertiary"
                  }`}
                >
                  {isPractical ? "Hands-on" : "Theory"}
                </span>
              </div>
              <h3 className="font-heading font-bold text-on-surface">{act.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {act.description}
              </p>
              {act.tool && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-xs font-bold text-on-surface">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPractical ? "bg-secondary-container" : "bg-tertiary"
                    }`}
                  />
                  {act.tool}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Takeaway */}
      {data.takeaway && (
        <div className="flex items-start gap-4 bg-tertiary/10 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-xl bg-tertiary/15 flex items-center justify-center text-tertiary shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <p className="text-on-surface font-medium">{data.takeaway}</p>
        </div>
      )}
    </div>
  );
}
