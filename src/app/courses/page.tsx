import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { PricingSection } from "@/components/PricingSection";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import { PROGRAM } from "@/lib/courses/program";
import { getProgramCourses } from "@/lib/courses/programServer";
import { Sparkles, Clock, GraduationCap, Layers } from "lucide-react";

export default async function CoursesPage() {
  const courses = await getProgramCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mb-24">
          {/* Program header */}
          <div className="relative space-y-6 bg-surface-container p-10 md:p-14 rounded-[3rem] overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full -translate-y-1/3 translate-x-1/3" />
            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {PROGRAM.name}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-surface max-w-3xl">
                {PROGRAM.tagline}
              </h1>
              <p className="text-on-surface-variant max-w-2xl text-lg">
                <span className="font-bold text-on-surface">{PROGRAM.audience}.</span>{" "}
                {PROGRAM.intro}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-2xl text-sm font-bold text-on-surface">
                  <Layers className="w-4 h-4 text-tertiary" />
                  2 courses
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-2xl text-sm font-bold text-on-surface">
                  <Clock className="w-4 h-4 text-tertiary" />
                  8 weeks each
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-2xl text-sm font-bold text-on-surface">
                  <GraduationCap className="w-4 h-4 text-tertiary" />
                  Class 9+ · Ages 14+
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <EnquiryDialog
                  label="Book a Free Demo Class"
                  size="lg"
                  defaultInterest="Not sure yet — help me choose"
                  icon={<Sparkles className="w-4 h-4 mr-2" />}
                />
                <a href="#pricing">
                  <button className="h-14 px-8 text-base inline-flex items-center justify-center rounded-2xl font-bold font-sans tracking-wide border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all w-full sm:w-auto">
                    See pricing
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Course grid */}
          <div className="space-y-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-on-surface">
              The two courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} {...course} />
              ))}
            </div>
          </div>

          {/* Pricing */}
          <PricingSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
