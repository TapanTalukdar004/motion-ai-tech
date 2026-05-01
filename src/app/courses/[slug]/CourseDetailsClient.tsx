"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Clock, Users, Star, CheckCircle, Award, Layout, Code, Rocket, Cpu, Zap } from "lucide-react";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { motion } from "framer-motion";
import { Course } from "@/lib/courses/types";

import { notFound } from "next/navigation";

export default function CourseDetailsClient({ course }: { course: Course }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-12 pb-24">
        {/* Header Hero */}
        <section className="bg-surface-container-low border-b border-outline-variant/30 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex gap-2">
                  {course.tags.map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </motion.div>
                <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-6xl font-bold text-on-surface leading-tight">
                  {course.title}
                </motion.h1>
                <motion.p variants={itemVariants} className="text-xl text-on-surface-variant leading-relaxed">
                  {course.description}
                </motion.p>
                
                <motion.div variants={itemVariants} className="flex items-center gap-8 text-sm font-medium text-on-surface flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-on-surface-variant">Instructor</p>
                      <p className="font-bold">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl">
                    <Star className="w-4 h-4 text-secondary-container fill-secondary-container" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-surface-container rounded-2xl">
                    <Clock className="w-4 h-4 text-tertiary" />
                    <span className="font-bold">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary-container/10 rounded-2xl border border-secondary-container/20">
                    <Rocket className="w-4 h-4 text-secondary-container" />
                    <span className="font-bold text-secondary-container">Online</span>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                variants={itemVariants}
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
              
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-20">
                
                {/* Suitable For */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-on-surface flex items-center gap-3">
                      <Users className="w-8 h-8 text-primary" />
                      Who is this for?
                    </h2>
                    <p className="text-on-surface-variant font-medium">You don't need to be a tech genius or an aspiring developer to join. This is for curious minds in:</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {course.suitable_for.map((item, i) => (
                      <span key={i} className="px-6 py-3 bg-surface-container-high rounded-2xl font-bold text-on-surface-variant border border-outline-variant/30">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Tutor Support / Ease of Learning */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-secondary-container/5 p-12 rounded-[3rem] border border-secondary-container/20 space-y-6"
                >
                  <h2 className="font-heading text-3xl font-bold text-on-surface flex items-center gap-3">
                    <Zap className="w-8 h-8 text-secondary-container" />
                    Ease of Learning
                  </h2>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    {course.tutor_support}
                  </p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="bg-secondary-container/10 px-6 py-3 rounded-2xl border border-secondary-container/20 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                      <p className="text-sm font-bold text-on-surface">Classes conducted online via Google Meet & Zoom</p>
                    </div>
                  </div>
                </motion.div>

                {/* Course Structure (DDD) if applicable */}
                {course.structure && (course.structure.design || course.structure.develop || course.structure.deploy) && (

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                  >
                    <h2 className="font-heading text-3xl font-bold text-on-surface">The DDD Framework</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 hover:border-primary/50 transition-colors">
                        <Layout className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-xl font-bold mb-4">Design</h3>
                        <ul className="space-y-2 text-on-surface-variant text-sm">
                          {course.structure?.design?.map(s => <li key={s} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-primary" /> {s}</li>)}
                        </ul>

                      </div>
                      <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 hover:border-tertiary/50 transition-colors">
                        <Code className="w-10 h-10 text-tertiary mb-6" />
                        <h3 className="text-xl font-bold mb-4">Develop</h3>
                        <ul className="space-y-2 text-on-surface-variant text-sm">
                          {course.structure?.develop?.map(s => <li key={s} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-tertiary" /> {s}</li>)}
                        </ul>

                      </div>
                      <div className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 hover:border-secondary-container/50 transition-colors">
                        <Rocket className="w-10 h-10 text-secondary-container mb-6" />
                        <h3 className="text-xl font-bold mb-4">Deploy</h3>
                        <ul className="space-y-2 text-on-surface-variant text-sm">
                          {course.structure?.deploy?.map(s => <li key={s} className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-secondary-container" /> {s}</li>)}
                        </ul>

                      </div>
                    </div>
                  </motion.div>
                )}

                {/* What you'll learn */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-bold text-on-surface">What you'll learn</h2>
                    <div className="space-y-4">
                      {course.what_you_will_learn.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
                          <CheckCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                          <span className="text-on-surface-variant font-medium">{item}</span>
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
                    <h2 className="font-heading text-2xl font-bold text-on-surface">What you'll get</h2>
                    <div className="space-y-4">
                      {course.what_you_will_get.map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10">
                          <Award className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                          <span className="text-on-surface-variant font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Tools Section if applicable */}
                {course.tools && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <h2 className="font-heading text-2xl font-bold text-on-surface">Tools we will master</h2>
                    <div className="flex flex-wrap gap-3">
                      {course.tools.map((tool) => (
                        <span key={tool} className="px-5 py-2 bg-surface-container rounded-full text-sm font-bold text-on-surface flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Demo Certification */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="space-y-8 p-12 bg-surface-container-high rounded-[3rem] border border-outline-variant/30 text-center"
                >
                  <div className="space-y-2">
                    <h2 className="font-heading text-3xl font-bold text-on-surface">Your Future Certification</h2>
                    <p className="text-on-surface-variant">Earn a verified certificate of completion to showcase your skills.</p>
                  </div>
                  <div className="relative max-w-2xl mx-auto shadow-2xl rounded-xl overflow-hidden group">
                    <img 
                      src="/images/cert-template.png" 
                      alt="Demo Certification" 
                      className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  </div>
                </motion.div>
                {/* Upcoming Features */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 bg-surface-container-low rounded-[2rem] border border-dashed border-outline-variant/50"
                >
                  <h3 className="font-bold text-on-surface mb-2 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    Roadmap
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    We are constantly improving. Coming soon: Integrated payments via Razorpay & Stripe, Live Mentor sessions, and an Advanced AI Lab.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                   <div className="bg-primary p-8 rounded-[2rem] text-on-primary shadow-xl">
                      <p className="text-primary-container font-bold uppercase tracking-widest text-xs mb-2">Course Fee</p>
                      <h3 className="text-4xl font-heading font-bold">{course.price}</h3>
                   </div>
                   <EnrollmentForm courseSlug={course.slug} courseTitle={course.title} />
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
