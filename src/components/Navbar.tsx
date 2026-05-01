"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Search, User, LogOut, X, BookOpen, Info, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase.from('profiles').select('full_name').eq('id', userId).single();
      setProfile(data);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-surface/80 border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary-container flex items-center justify-center text-on-primary font-bold text-xl">
                  M
                </div>
                <span className="font-heading font-bold text-2xl tracking-tight text-on-surface">
                  Motion AI
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/courses" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
                Courses
              </Link>
              <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
                About
              </Link>
              <div className="h-6 w-px bg-outline-variant/30" />
              <div className="flex items-center gap-4">
                <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-on-surface hover:text-primary font-bold transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="text-on-surface hover:text-primary font-medium transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-2xl font-bold text-sm tracking-wide shadow-ambient hover:opacity-90 transition-opacity"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button className="p-2 text-on-surface-variant">
                <Search className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-on-surface transition-colors hover:bg-surface-container rounded-full"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-sm bg-surface shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">M</div>
                    <span className="font-heading font-bold text-xl">Motion AI</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-surface-container rounded-full">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {user && (
                  <div className="mb-8 p-6 bg-surface-container-low rounded-[2rem] border border-outline-variant/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Signed in as</p>
                        <p className="font-bold text-on-surface truncate">{profile?.full_name || user.email}</p>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard"
                      className="flex items-center gap-3 w-full p-3 bg-primary text-on-primary rounded-xl font-bold text-sm justify-center"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Dashboard
                    </Link>
                  </div>
                )}

                <div className="space-y-2 flex-grow">
                  <Link href="/courses" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-high transition-colors font-bold text-on-surface">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Courses
                  </Link>
                  <Link href="/about" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-high transition-colors font-bold text-on-surface">
                    <Info className="w-5 h-5 text-tertiary" />
                    About Us
                  </Link>
                  <div className="h-px bg-outline-variant/20 my-4" />
                </div>

                <div className="mt-auto space-y-4">
                  {user ? (
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full p-4 rounded-2xl text-error font-bold hover:bg-error/10 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <Link href="/auth/login" className="w-full">
                        <button className="w-full p-4 rounded-2xl border border-outline-variant font-bold">Log In</button>
                      </Link>
                      <Link href="/auth/signup" className="w-full">
                        <button className="w-full p-4 rounded-2xl bg-primary text-on-primary font-bold">Get Started</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

