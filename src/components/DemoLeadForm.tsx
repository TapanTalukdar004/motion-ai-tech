"use client";

import React, { useState, useId } from "react";
import { Button } from "./ui/Button";
import { InputField } from "./ui/InputField";
import { CONTACT, whatsappLink, mailtoLink } from "@/lib/contact";
import { MessageCircle, Mail, CheckCircle2, CalendarCheck } from "lucide-react";

const STANDARDS = ["Class 9", "Class 10", "Class 11", "Class 12", "Other"];
const INTERESTS = [
  "DSA Foundations with C++ & SQL",
  "Python with AI & Machine Learning",
  "Full Program (Both Courses)",
  "Not sure yet — help me choose",
];

interface DemoLeadFormProps {
  /** Pre-selects the "interested in" field, e.g. a course title or "Full Program (Both Courses)". */
  defaultInterest?: string;
  /** Headline shown above the form. */
  heading?: string;
  /** Called once the enquiry has been sent. */
  onDone?: () => void;
}

const selectClass =
  "flex h-12 w-full rounded-2xl border-none bg-surface-container-low px-4 py-2 text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary transition-all";

export function DemoLeadForm({
  defaultInterest = INTERESTS[3],
  heading = "Book a Free Demo Class",
  onDone,
}: DemoLeadFormProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    standard: STANDARDS[1],
    interest: INTERESTS.includes(defaultInterest) ? defaultInterest : INTERESTS[3],
  });
  const [sent, setSent] = useState(false);
  const standardId = useId();
  const interestId = useId();

  const buildMessage = () =>
    [
      `Hi ${CONTACT.brand}! I'd like to book a *free demo* for the Young Coders Program.`,
      ``,
      `• Name: ${form.fullName || "—"}`,
      `• Class: ${form.standard}`,
      `• Interested in: ${form.interest}`,
      `• Phone: ${form.phone || "—"}`,
      form.email ? `• Email: ${form.email}` : ``,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = buildMessage();
    // No database needed — hand the lead straight to WhatsApp.
    if (typeof window !== "undefined") {
      window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    }
    setSent(true);
    onDone?.();
  };

  if (sent) {
    const msg = buildMessage();
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-secondary-container/15 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-secondary-container" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-heading font-bold text-on-surface">
            Almost there!
          </h3>
          <p className="text-on-surface-variant">
            We&apos;ve opened WhatsApp with your details pre-filled — just hit send and our
            team will confirm your free demo slot. Didn&apos;t open?
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full gap-2">
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp
            </Button>
          </a>
          <a
            href={mailtoLink(`Free demo — ${form.interest}`, msg)}
            className="flex-1"
          >
            <Button variant="outline" className="w-full gap-2">
              <Mail className="w-4 h-4" />
              Email us instead
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-heading font-bold text-on-surface">{heading}</h3>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <CalendarCheck className="w-5 h-5 text-primary" />
        </div>
      </div>

      <InputField
        label="Full Name"
        placeholder="Student or parent name"
        required
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Phone / WhatsApp"
          type="tel"
          placeholder="Your contact number"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <div className="w-full space-y-2">
          <label htmlFor={standardId} className="text-sm font-medium text-on-surface">
            Class / Standard
          </label>
          <select
            id={standardId}
            value={form.standard}
            onChange={(e) => setForm({ ...form, standard: e.target.value })}
            className={selectClass}
          >
            {STANDARDS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <InputField
        label="Email (optional)"
        type="email"
        placeholder="For your schedule & resources"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <div className="w-full space-y-2">
        <label htmlFor={interestId} className="text-sm font-medium text-on-surface">
          Interested in
        </label>
        <select
          id={interestId}
          value={form.interest}
          onChange={(e) => setForm({ ...form, interest: e.target.value })}
          className={selectClass}
        >
          {INTERESTS.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <Button type="submit" size="lg" className="w-full justify-center gap-3">
          <MessageCircle className="w-5 h-5" />
          Book My Free Demo
        </Button>
      </div>
      <p className="text-center text-xs text-on-surface-variant">
        No payment required. We&apos;ll confirm your slot on WhatsApp.
      </p>
    </form>
  );
}
