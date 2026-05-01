"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Settings, BookOpen, Clock, Activity, Award, MessageCircle, Video, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getCourses } from "@/lib/courses/client";
import { Course } from "@/lib/courses/types";


export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      setUser(user);

      // Fetch Profile, Enrollments and Courses in parallel
      const [profileRes, enrollRes, coursesRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("enrollments").select("*").eq("user_id", user.id).eq("is_paid", true),
        getCourses()
      ]);

      setProfile(profileRes.data);
      setEnrollments(enrollRes.data || []);
      setCourses(coursesRes);
      
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-on-surface">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Explorer'}
              </h1>
              <p className="text-on-surface-variant flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                Laboratory Status: {enrollments.length > 0 ? "Active Scientist" : "Aspiring Researcher"}
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-on-surface">{profile?.standard || 'Class 10'}</p>
                <p className="text-xs text-on-surface-variant">Standard</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Account
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: BookOpen, label: "Paid Courses", value: enrollments.length.toString() },
              { icon: Clock, label: "Hours Learned", value: "0" },
              { icon: Activity, label: "Current Streak", value: "1 Day" },
              { icon: Award, label: "Certificates", value: "0" },
            ].map((stat, i) => (
              <div key={i} className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/20 flex flex-col gap-4">
                <stat.icon className="w-8 h-8 text-tertiary" />
                <div>
                  <h4 className="text-3xl font-bold text-on-surface font-heading">{stat.value}</h4>
                  <p className="text-sm font-medium text-on-surface-variant">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-heading text-2xl font-bold text-on-surface">Your Kinetic Modules</h2>
              <Link href="/courses">
                <Button variant="tertiary" size="sm">Explore More</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrollments.length > 0 ? (
                enrollments.map((enroll) => {
                  const course = courses.find(c => c.slug === enroll.course_slug);
                  if (!course) return null;
                  
                  return (
                    <div key={enroll.id} className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-surface-container-lowest transition-all hover:bg-secondary-fixed/5 border border-outline-variant/30 shadow-lg">
                      <div className="aspect-video relative overflow-hidden">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 bg-success-container/90 text-on-success-container px-4 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                          PAID
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-heading font-bold text-xl text-on-surface mb-6">{course.title}</h3>
                        
                        <div className="space-y-4 mt-auto">
                          <a href="https://chat.whatsapp.com/example" target="_blank" rel="noreferrer" className="block w-full">
                            <Button className="w-full gap-3 bg-[#25D366] hover:bg-[#128C7E] border-none">
                              <MessageCircle className="w-5 h-5" />
                              Join WhatsApp Group
                            </Button>
                          </a>
                          <div className="grid grid-cols-2 gap-4">
                             <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="block">
                               <Button variant="outline" className="w-full gap-2 text-xs">
                                 <Video className="w-4 h-4" />
                                 Google Meet
                               </Button>
                             </a>
                             <a href="https://zoom.us" target="_blank" rel="noreferrer" className="block">
                               <Button variant="outline" className="w-full gap-2 text-xs">
                                 <Video className="w-4 h-4" />
                                 Zoom Link
                               </Button>
                             </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center space-y-6 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant/50">
                  <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-10 h-10 text-on-surface-variant/30" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">No modules found in your lab</h3>
                    <p className="text-on-surface-variant">Enroll in a course to start your kinetic journey</p>
                  </div>
                  <Link href="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

