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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
          
          {/* Accent Graphic */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary-container" />
          
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-on-surface">Welcome Back</h1>
            <p className="text-on-surface-variant text-sm mt-2">Sign in to your kinetic laboratory account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border-2 border-error/20 text-error text-sm font-bold rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <InputField 
              label="Email Address" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField 
              label="Password" 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-end">
              <Link href="#" className="text-sm font-bold text-tertiary hover:underline decoration-2 underline-offset-4">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Log In"}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-outline-variant/30 flex items-center justify-center gap-2">
            <p className="text-sm text-on-surface-variant">Don't have an account?</p>
            <Link href="/auth/signup" className="text-sm font-bold text-primary hover:underline decoration-2 underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
