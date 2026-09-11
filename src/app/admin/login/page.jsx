"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FiArrowRight, FiLock, FiMail } from "react-icons/fi";
import Spin from "@/components/loadings/Spin";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!result?.ok) {
        setError("Invalid email or password.");
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 return (
   <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-4">
     {/* Header + Card */}
     <div className="relative z-10 w-full max-w-100">
       {/* Header */}
       <div className="mb-8 text-center">
         <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/5 bg-base-100">
           <FiLock className="text-lg text-primary" />
         </div>

         <h1 className="text-3xl font-semibold tracking-tight">
           Welcome <span className="text-primary">back.</span>
         </h1>

         <p className="mt-2 text-sm text-base-content/50">
           Sign in to manage your portfolio.
         </p>
       </div>

       {/* Card */}
       <div className="rounded-2xl border border-white/10 bg-base-100 p-6 shadow-2xl shadow-black/10 transition-all duration-500 hover:border-white/15 sm:p-7">
         <form onSubmit={handleSubmit}>
           {/* Error */}
           {error && (
             <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
               {error}
             </div>
           )}

           {/* Email */}
           <div>
             <label
               htmlFor="email"
               className="mb-2 block text-xs font-medium text-base-content/70"
             >
               Email Address
             </label>

             <div className="relative">
               <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-base-content/50" />

               <input
                 id="email"
                 name="email"
                 type="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="admin@example.com"
                 autoComplete="email"
                 required
                 className="h-12 w-full rounded-xl border border-white/10 bg-base-200 pl-11 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-base-content/40 focus:border-primary/40 focus:ring-1 focus:ring-primary/10"
               />
             </div>
           </div>

           {/* Password */}
           <div className="mt-5">
             <label
               htmlFor="password"
               className="mb-2 block text-xs font-medium text-base-content/70"
             >
               Password
             </label>

             <div className="relative">
               <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-base-content/50" />

               <input
                 id="password"
                 name="password"
                 type="password"
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="Enter your password"
                 autoComplete="current-password"
                 required
                 className="h-12 w-full rounded-xl border border-white/10 bg-base-200 pl-11 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-base-content/40 focus:border-primary/40 focus:ring-1 focus:ring-primary/10"
               />
             </div>
           </div>

           {/* Divider */}
           <div className="my-7 h-px w-full bg-white/10" />

           {/* Button */}
           <button
             type="submit"
             disabled={loading}
             className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-content transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
           >
             {loading ? (
               <>
                 <Spin />
                 Signing in...
               </>
             ) : (
               <>
                 Continue
                 <FiArrowRight
                   size={17}
                   className="transition-transform duration-300 group-hover:translate-x-1"
                 />
               </>
             )}
           </button>
         </form>
       </div>

       {/* Footer */}
       <p className="mt-5 text-center text-[11px] text-base-content/30">
         Authorized access only
       </p>
     </div>

     {/* Top Left Glow */}
     <div className="pointer-events-none absolute left-0 top-0 z-50">
       <div
         className="
          h-75 w-75
          md:h-100 md:w-100
          rounded-full
          blur-[100px]
          md:blur-[140px]
          bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
        "
       />
     </div>

     {/* Bottom Right Glow */}
     <div className="pointer-events-none absolute bottom-0 right-0 z-50">
       <div
         className="
          h-75 w-75
          md:h-100 md:w-100
          rounded-full
          blur-[100px]
          md:blur-[140px]
          bg-[radial-gradient(circle,#209181_0%,transparent_70%)]
        "
       />
     </div>
   </main>
 );
};

export default Page;
