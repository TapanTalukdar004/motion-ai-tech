"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/Button";
import { InputField } from "./ui/InputField";
import { CheckCircle2, Loader2, CreditCard, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EnrollmentFormProps {
  courseSlug: string;
  courseTitle: string;
}

export function EnrollmentForm({ courseSlug, courseTitle }: EnrollmentFormProps) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    standard: "Class 10",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
          setFormData({
            fullName: profileData.full_name || "",
            email: user.email || "",
            phone: profileData.phone || "",
            standard: profileData.standard || "Class 10",
          });
        }

        // Check for existing enrollment
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("course_slug", courseSlug)
          .single();
        
        if (enrollment) {
          setIsEnrolled(true);
        }
      }
    };
    getSession();
  }, [courseSlug]);


  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    setStatus("loading");

    try {
      // 1. Simulate Payment Gateway Call (Razorpay/Stripe)
      // In a real app, you'd call an API route here to create an order
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      // 2. Record successful enrollment
      const { error } = await supabase.from("enrollments").insert([
        {
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          course_slug: courseSlug,
          standard: formData.standard,
          is_paid: true, // In simulation, we mark it paid immediately
          payment_id: "sim_" + Math.random().toString(36).substr(2, 9),
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setMessage(`Successfully enrolled in ${courseTitle}! Your module is now active in your dashboard.`);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success" || isEnrolled) {
    return (
      <div className="bg-success-container/10 border border-success-container/30 p-8 rounded-[2rem] text-center space-y-6">
        <div className="w-20 h-20 bg-success-container rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-on-success-container" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-on-surface">
            {isEnrolled ? "Already Enrolled!" : "Payment Successful!"}
          </h3>
          <p className="text-on-surface-variant">
            {isEnrolled 
              ? `You are already enrolled in ${courseTitle}. You can access it from your dashboard.`
              : message}
          </p>
        </div>
        <Link href="/dashboard" className="block">
          <Button variant="secondary" className="w-full">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }


  return (
    <div className="bg-surface-container-highest p-8 rounded-[2rem] shadow-ambient border border-outline-variant/30">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-heading font-bold text-on-surface">Secure Enrollment</h3>
        <CreditCard className="w-6 h-6 text-primary" />
      </div>

      {!user ? (
        <div className="space-y-6">
          <div className="p-6 bg-tertiary/10 border border-tertiary/20 rounded-[2rem] text-center space-y-4">
             <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center mx-auto">
               <AlertCircle className="w-6 h-6 text-tertiary" />
             </div>
             <div className="space-y-1">
               <h4 className="font-bold text-on-surface">Authentication Required</h4>
               <p className="text-xs text-on-surface-variant">Please log in to your account to enroll in this module.</p>
             </div>
             <Link href={"/auth/login?redirect=" + encodeURIComponent(window.location.pathname)} className="block">
               <Button className="w-full">Sign In to Continue</Button>
             </Link>
          </div>
          
          {/* Faded/Disabled placeholder form for visual structure */}
          <div className="opacity-30 pointer-events-none space-y-4">
            <InputField label="Full Name" placeholder="Enter your name" disabled />
            <InputField label="Email Address" placeholder="Enter your email" disabled />
            <Button className="w-full" disabled>Pay ₹3000 & Enroll</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEnroll} className="space-y-4">
          <InputField
            label="Full Name"
            placeholder="Enter your name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            disabled={!!profile?.full_name}
          />
          <InputField
            label="Email Address"
            type="email"
            required
            value={formData.email}
            placeholder="Enter your email"
            disabled={true} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Phone Number (Optional)"
              placeholder="Enter your phone number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-on-surface">Standard</label>
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

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full justify-center gap-3 py-6"
              size="lg"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay ₹3000 & Enroll"
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale" />
            <div className="h-4 w-px bg-outline-variant/30 mx-2" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Secure Checkout</span>
          </div>
        </form>
      )}
    </div>
  );
}
