import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/CourseCard";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import Link from "next/link";
import { ArrowRight, Bot, Code, Award, Sparkles } from "lucide-react";
import { getProgramCourses } from "@/lib/courses/programServer";

export default async function Home() {
  const courses = await getProgramCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-secondary-container/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-sm font-bold text-tertiary">
                <Sparkles className="w-4 h-4 fill-tertiary" />
                <span>Young Coders Program · Ages 14+</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl leading-tight font-bold text-on-surface tracking-tight">
                Code. Data.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">
                  AI.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg">
                Coding, Data &amp; Artificial Intelligence for students of Class 9 and above.
                Two hands-on courses — C++ &amp; SQL foundations and Python with AI/ML — each
                ending in a real project you build and present.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <EnquiryDialog
                  label="Book a Free Demo"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  defaultInterest="Not sure yet — help me choose"
                />
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden bg-surface-container-low">
              {/* Asymmetrical Hero Image */}
              <div className="absolute inset-4 bg-gradient-to-tr from-surface-container to-surface-container-highest rounded-[2.5rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop"
                  alt="Students learning to code"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-[2rem] shadow-2xl max-w-xs block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-tertiary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Build a real AI project</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">
                      No experience needed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Modules */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl space-y-4">
                <h2 className="font-heading font-bold text-4xl text-on-surface">
                  Learn by building
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Every concept is paired with weekly practical work, and each course ends
                  with a capstone project the student builds and presents.
                </p>
              </div>
              <Link href="/about">
                <Button variant="tertiary" className="gap-2">
                  How we teach <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Code,
                  title: "Real Programming",
                  desc: "From your first C++ or Python program to data structures, algorithms & SQL.",
                },
                {
                  icon: Bot,
                  title: "AI & Machine Learning",
                  desc: "Train real ML models with scikit-learn and build your own AI project.",
                },
                {
                  icon: Award,
                  title: "Capstone & Certificate",
                  desc: "Finish with a project you present and a verified certificate of completion.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-surface-container-highest p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-heading font-bold text-xl text-on-surface mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-heading font-bold text-4xl text-on-surface">Our Courses</h2>
              <Link href="/courses">
                <Button variant="outline" className="hidden md:flex">
                  View full program
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.slug} {...course} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/courses">
                <Button variant="outline" className="w-full">
                  View full program
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
