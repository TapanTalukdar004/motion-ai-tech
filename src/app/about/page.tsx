import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap, Bot, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-surface mb-6">About Motion AI & Tech</h1>
            <p className="text-xl text-on-surface-variant">We are pioneers in interactive education, transforming the way the world learns robotics, engineering, and artificial intelligence.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden bg-surface-container-low shadow-ambient group">
              <img 
                src="https://images.unsplash.com/photo-1531297172867-4d653760f38b?q=80&w=1000&auto=format&fit=crop" 
                alt="Technology laboratory"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
            </div>
            
            <div className="space-y-8">
               <div className="w-16 h-16 rounded-2xl bg-secondary-container/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-secondary-container" />
                </div>
              <h2 className="font-heading text-3xl font-bold text-on-surface">Our Vision: The Kinetic Laboratory</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                We believe that learning shouldn't happen in flat, static grids. Education should be a living, breathing laboratory where motion, interaction, and real-world application take precedence. 
              </p>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                By blending the high-energy pulse of robotics with structural precision, Motion AI gives you the premium futuristic platform you need to excel.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-[3rem] p-12 md:p-20 text-center mb-24 relative overflow-hidden">
             {/* Glow */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent blur-3xl rounded-full" />
             
             <h2 className="font-heading text-3xl font-bold text-on-surface mb-6 relative z-10">Ready to start engineering your future?</h2>
             <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 relative z-10">
               Join our community of thousands of students and instructors pushing the boundaries of technology.
             </p>
             <div className="relative z-10">
               <Button size="lg" className="px-12">Start Learning Today</Button>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
