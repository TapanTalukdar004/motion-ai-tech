"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    standard: "Class 10",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            standard: formData.standard,
          },
        },
      });

      if (signupError) throw signupError;

      // Update profile with standard if trigger doesn't handle all meta
      if (data.user) {
        await supabase
          .from("profiles")
          .update({ 
            phone: formData.phone,
            standard: formData.standard 
          })
          .eq("id", data.user.id);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-xl bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          {/* Accent Graphic */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary-container" />
          
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary-container/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-secondary-container" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-on-surface">Join the Laboratory</h1>
            <p className="text-on-surface-variant text-sm mt-2">Create your account to start learning</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border-2 border-error/20 text-error text-sm font-bold rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField 
                label="Full Name" 
                placeholder="Enter your name" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
              <InputField 
                label="Phone Number (Optional)" 
                type="tel" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />

            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField 
                label="Email Address" 
                type="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <div className="w-full space-y-2">
                <label className="text-sm font-medium text-on-surface">Standard / Class</label>
                <select 
                  value={formData.standard}
                  onChange={(e) => setFormData({...formData, standard: e.target.value})}
                  className="flex h-12 w-full rounded-2xl border-none bg-surface-container-low px-4 py-2 text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                >
                  <option value="Class 10">Class 10</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Graduation Pursuing">Graduation Pursuing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <InputField 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />


            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/30 flex items-center justify-center gap-2">
            <p className="text-sm text-on-surface-variant">Already have an account?</p>
            <Link href="/auth/login" className="text-sm font-bold text-secondary-container hover:underline decoration-2 underline-offset-4">
              Log in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
