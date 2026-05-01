import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import { ArrowRight, Bot, Code, Zap } from "lucide-react";
import { getCourses } from "@/lib/courses/server";


export default async function Home() {
  const courses = await getCourses();

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
                <Zap className="w-4 h-4 fill-tertiary" />
                <span>Motion AI & Tech Lab</span>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl leading-tight font-bold text-on-surface tracking-tight">
                Design. Develop. <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">Deploy.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg">
                Master modern technology with AI-driven workflows. Learn Python and Web Development with the tools of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    View Lab Tour
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative aspect-square lg:aspect-[4/3] rounded-[3rem] overflow-hidden bg-surface-container-low">
              {/* Asymmetrical Hero Image */}
              <div className="absolute inset-4 bg-gradient-to-tr from-surface-container to-surface-container-highest rounded-[2.5rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students working on robotics"
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
                    <h4 className="font-bold text-on-surface text-sm">AI-Powered Learning</h4>
                    <p className="text-xs text-on-surface-variant font-medium mt-1">Guided by Advanced Agents</p>
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
                <h2 className="font-heading font-bold text-4xl text-on-surface">Structured Excellence</h2>
                <p className="text-on-surface-variant text-lg">
                   Our DDD methodology ensures you design beautiful interfaces, develop robust code, and deploy to the world.
                </p>
              </div>
              <Link href="/about">
                <Button variant="tertiary" className="gap-2">
                  Learn about our methodology <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Code, title: "Modern Programming", desc: "Python from scratch to automation." },
                { icon: Bot, title: "AI Integration", desc: "Leverage Claude, Copilot, and Antigravity." },
                { icon: Zap, title: "Rapid Deployment", desc: "Push your ideas live in minutes." },
              ].map((feature, i) => (
                <div key={i} className="bg-surface-container-highest p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-heading font-bold text-xl text-on-surface mb-3">{feature.title}</h3>
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
              <h2 className="font-heading font-bold text-4xl text-on-surface">Featured Modules</h2>
              <Link href="/courses">
                <Button variant="outline" className="hidden md:flex">
                  View full catalog
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
                  View full catalog
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

