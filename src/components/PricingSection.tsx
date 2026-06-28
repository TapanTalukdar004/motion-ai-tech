import React from "react";
import { Check, Ticket, Users, CreditCard, Sparkles } from "lucide-react";
import { PRICING } from "@/lib/courses/program";
import { EnquiryDialog } from "./EnquiryDialog";

const ADDON_ICONS = {
  ticket: Ticket,
  users: Users,
  card: CreditCard,
} as const;

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 space-y-12">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high text-xs font-bold uppercase tracking-wider text-tertiary">
          <Sparkles className="w-3.5 h-3.5" />
          Pricing
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-on-surface">
          Simple, transparent plans
        </h2>
        <p className="text-on-surface-variant text-lg">
          Pick a single course or save with the full program. Every plan is hands-on,
          mentor-led, and ends with a project you build and present.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PRICING.plans.map((plan) => (
          <div
            key={plan.id}
            className={
              plan.highlight
                ? "relative flex flex-col p-8 rounded-[2.5rem] bg-primary text-on-primary shadow-2xl"
                : "relative flex flex-col p-8 rounded-[2.5rem] bg-surface-container-lowest border border-outline-variant/30"
            }
          >
            {plan.badge && (
              <span
                className={
                  plan.highlight
                    ? "absolute -top-3 left-8 bg-secondary-container text-on-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                    : "absolute -top-3 left-8 bg-primary text-on-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                }
              >
                {plan.badge}
              </span>
            )}

            <h3 className="font-heading text-2xl font-bold">{plan.name}</h3>
            <p
              className={
                plan.highlight
                  ? "text-on-primary/80 font-medium mt-1"
                  : "text-on-surface-variant font-medium mt-1"
              }
            >
              {plan.blurb}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-heading text-4xl font-bold">{plan.price}</span>
              {plan.originalPrice && (
                <span
                  className={
                    plan.highlight
                      ? "text-on-primary/60 line-through mb-1"
                      : "text-on-surface-variant line-through mb-1"
                  }
                >
                  {plan.originalPrice}
                </span>
              )}
            </div>
            {plan.save && (
              <span
                className={
                  plan.highlight
                    ? "mt-2 inline-block w-fit text-xs font-bold bg-on-primary/15 px-3 py-1 rounded-full"
                    : "mt-2 inline-block w-fit text-xs font-bold bg-secondary-container/15 text-secondary-container px-3 py-1 rounded-full"
                }
              >
                {plan.save}
              </span>
            )}

            <ul className="mt-8 space-y-3 flex-1">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium">
                  <Check
                    className={
                      plan.highlight
                        ? "w-5 h-5 shrink-0 text-on-primary"
                        : "w-5 h-5 shrink-0 text-tertiary"
                    }
                  />
                  <span className={plan.highlight ? "" : "text-on-surface-variant"}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <EnquiryDialog
                label={plan.cta}
                variant={plan.highlight ? "secondary" : "primary"}
                size="lg"
                className="w-full justify-center"
                defaultInterest={
                  plan.id === "full"
                    ? "Full Program (Both Courses)"
                    : "Not sure yet — help me choose"
                }
                heading={`Enroll — ${plan.name}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {PRICING.addOns.map((addon) => {
          const Icon = ADDON_ICONS[addon.icon];
          return (
            <div
              key={addon.title}
              className="bg-surface-container-low rounded-[1.75rem] p-6 border border-outline-variant/20"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary-container/15 flex items-center justify-center text-secondary-container mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-on-surface">{addon.title}</h4>
              <p className="text-sm text-on-surface-variant mt-1">{addon.text}</p>
            </div>
          );
        })}
      </div>

      {PRICING.footnotes.map((note) => (
        <p
          key={note}
          className="text-center text-sm text-on-surface-variant max-w-2xl mx-auto"
        >
          {note}
        </p>
      ))}
    </section>
  );
}
