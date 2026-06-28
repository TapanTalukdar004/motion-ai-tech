"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Curriculum } from "@/components/Curriculum";
import { AiBonus } from "@/components/AiBonus";
import { DemoLeadForm } from "@/components/DemoLeadForm";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  CheckCircle,
  Award,
  Rocket,
  Cpu,
  GraduationCap,
  BarChart3,
  Sparkles,
  Trophy,
  ArrowRight,
} from "lucide-react";
import type { ProgramCourse } from "@/lib/courses/program";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function YoungCoderDetails({ course }: { course: ProgramCourse }) {
  const totalWeeks = course.curriculum.reduce((n, m) => n + m.weeks.length, 0);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-12 pb-24">
        {/* Hero */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={container}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <motion.div variants={item} className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    Young Coders Program
                  </span>
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
                <motion.h1
                  variants={item}
                  className="font-heading text-4xl md:text-6xl font-bold text-on-surface leading-tight"
                >
                  {course.title}
                </motion.h1>
                <motion.p
                  variants={item}
                  className="text-xl text-on-surface-variant leading-relaxed"
                >
                  {course.description}
                </motion.p>

                <motion.div
                  variants={item}
                  className="flex items-center gap-3 text-sm font-medium text-on-surface flex-wrap"
                >
                  <div className="flex items-center gap-3 mr-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Mentored by</p>
                      <p className="font-bold">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl">
                    <Clock className="w-4 h-4 text-tertiary" />
                    <span className="font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl">
                    <BarChart3 className="w-4 h-4 text-tertiary" />
                    <span className="font-bold">{course.level.split("·")[0].trim()}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl">
                    <GraduationCap className="w-4 h-4 text-tertiary" />
                    <span className="font-bold">{course.ageGroup}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={item}
                className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-20">
                {/* Why this course */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="font-heading text-3xl font-bold text-on-surface flex items-center gap-3">
                    <Star className="w-7 h-7 text-secondary-container fill-secondary-container" />
                    Why this course
                  </h2>
                  <div className="space-y-3">
                    {course.whyThisCourse.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10"
                      >
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-on-surface-variant font-medium">{reason}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Who is this for */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-on-surface flex items-center gap-3">
                      <Users className="w-7 h-7 text-primary" />
                      Who is this for?
                    </h2>
                    <p className="text-on-surface-variant font-medium">
                      No prior experience needed — just curiosity. Perfect for:
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {course.suitable_for.map((s) => (
                      <span
                        key={s}
                        className="px-6 py-3 bg-surface-container-high rounded-2xl font-bold text-on-surface-variant border border-outline-variant/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-on-surface">
                      Course curriculum
                    </h2>
                    <p className="text-on-surface-variant font-medium">
                      {totalWeeks} weeks · concept + practical every week. Tap any week to
                      see the topics and what you&apos;ll build.
                    </p>
                  </div>
                  <Curriculum months={course.curriculum} />
                </motion.div>

                {/* ML algorithms table (Course 2) */}
                {course.mlAlgorithms && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-3xl font-bold text-on-surface">
                      ML algorithms you&apos;ll master
                    </h2>
                    <div className="overflow-x-auto rounded-[2rem] border border-outline-variant/30">
                      <table className="w-full text-left border-collapse min-w-[28rem]">
                        <thead>
                          <tr className="bg-surface-container-high">
                            <th className="font-heading text-sm font-bold text-on-surface px-6 py-4">
                              Algorithm
                            </th>
                            <th className="font-heading text-sm font-bold text-on-surface px-6 py-4">
                              Real-world use
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {course.mlAlgorithms.map((row, i) => (
                            <tr
                              key={row.algorithm}
                              className={
                                i % 2 === 0
                                  ? "bg-surface-container-lowest"
                                  : "bg-surface-container-low"
                              }
                            >
                              <td className="px-6 py-4 font-bold text-on-surface text-sm align-top">
                                <span className="flex items-start gap-2">
                                  <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />
                                  {row.algorithm}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-on-surface-variant text-sm align-top">
                                {row.use}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Capstone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface-container-high p-10 md:p-12 rounded-[3rem] space-y-6"
                >
                  <h2 className="font-heading text-3xl font-bold text-on-surface flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-secondary-container" />
                    Capstone Project
                  </h2>
                  <p className="text-lg text-on-surface-variant">{course.capstone.intro}</p>
                  <div className="space-y-3">
                    {course.capstone.options.map((opt) => (
                      <div
                        key={opt}
                        className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-2xl"
                      >
                        <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-on-surface-variant font-medium">{opt}</span>
                      </div>
                    ))}
                  </div>
                  {course.capstone.note && (
                    <p className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                      {course.capstone.note}
                    </p>
                  )}
                </motion.div>

                {/* AI Bonus */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <AiBonus data={course.aiBonus} />
                </motion.div>

                {/* Outcomes + What you'll get */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-bold text-on-surface">
                      By the end, students can
                    </h2>
                    <div className="space-y-4">
                      {course.outcomes.map((o) => (
                        <div
                          key={o}
                          className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10"
                        >
                          <CheckCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                          <span className="text-on-surface-variant font-medium">{o}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-bold text-on-surface">
                      What you&apos;ll get
                    </h2>
                    <div className="space-y-4">
                      {course.what_you_will_get.map((g) => (
                        <div
                          key={g}
                          className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10"
                        >
                          <Award className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                          <span className="text-on-surface-variant font-medium">{g}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Tools */}
                {course.tools && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-bold text-on-surface">
                      Tools we&apos;ll use
                    </h2>
                    <p className="text-on-surface-variant font-medium -mt-2">
                      All free and browser-based — nothing to install.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {course.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-5 py-2 bg-surface-container rounded-full text-sm font-bold text-on-surface flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Certificate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="space-y-8 p-10 md:p-12 bg-surface-container-high rounded-[3rem] border border-outline-variant/30 text-center"
                >
                  <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-on-surface">
                      Your Certificate of Completion
                    </h2>
                    <p className="text-on-surface-variant">
                      Finish your capstone and earn a verified certificate to showcase your
                      skills.
                    </p>
                  </div>
                  <div className="relative max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden group">
                    <img
                      src="/images/cert-template.png"
                      alt={`${course.title} certificate preview`}
                      className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  </div>
                </motion.div>
              </div>

              {/* Right column: price + lead form */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  <div className="bg-primary p-8 rounded-[2rem] text-on-primary shadow-xl">
                    <p className="text-on-primary/70 font-bold uppercase tracking-widest text-xs mb-2">
                      Course Fee
                    </p>
                    <h3 className="text-4xl font-heading font-bold">{course.price}</h3>
                    <p className="text-on-primary/80 text-sm mt-2">
                      {course.duration} · capstone · certificate
                    </p>
                    <Link
                      href="/courses#pricing"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-on-primary/90 hover:text-on-primary"
                    >
                      Save with the full program <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-surface-container-highest p-8 rounded-[2rem] shadow-xl border border-outline-variant/30">
                    <DemoLeadForm
                      defaultInterest={course.title}
                      heading="Book a Free Demo Class"
                    />
                  </div>

                  <EnquiryDialog
                    label="Enroll Now"
                    variant="outline"
                    size="lg"
                    className="w-full justify-center"
                    defaultInterest={course.title}
                    heading={`Enroll — ${course.title}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
