import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import signupImage from "/signup-image.png"
import { SmallLogo } from "../common/small-logo";
import { useAuthStore } from "@/store/auth-store";


export default function SignupForm() {
  const { signup, error, isLoading } = useAuthStore();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const success = await signup(email, password, firstName, lastName);
    if (success) {
      toast.success("Signed up completed successfully!");
      navigate("/login")
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev)
  };

  return (
    <section className="w-full mx-auto px-4 py-4 sm:px-0">
      <div className="xl:grid sm:grid-cols-2">
        <div className="flex flex-col items-center gap-41">
          <div className="pt-10">
            <SmallLogo />
          </div>
          <div className="border border-[#EBEBEB] rounded-3xl p-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">Welcome to Biroq</h3>
              <p className="text-sm font-normal">Don't have an account yet? Creating one takes less than <br /> a minute! 📦</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <span className="mt-5 text-red-400 text-sm">
                  {error}
                </span>
              )}
              <div className="flex flex-col gap-2 mt-6">
                <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="E.g, email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full px-4 py-1 border border-slate-700 rounded-full text-gray-700 placeholder:text-sm focus:outline-none focus:border-slate-300 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-amber-600 text-gray-100 rounded-full hover:bg-amber-700 transition-colors cursor-pointer font-medium"
              >
                {isLoading ? (
                  "Signing up"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="text-center text-gray-400 mt-5 text-sm font-normal">
              Already have an account?{" "}
              <Link to="/login" className="text-[12px] text-[#121212] hover:text-[#121212]/50 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
          <p className="text-sm font-normal text-gray-500">@2026 Biroq</p>
        </div>
        <div className="hidden xl:block">
          <img src={signupImage} alt="" />
        </div>
      </div>
    </section>
  )
}