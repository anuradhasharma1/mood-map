"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // toggle login/register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    if (isLogin) {
      // Login with email/password
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Welcome back to MoodMap! ");
        router.push("/"); // redirect to home on success
      }
    } else {
      //  Register new account
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
      } else {
        // Auto login after register
        await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        });
        toast.success("Account created! Welcome!");
        router.push("/");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-1">
          Mood<span className="text-[#ffcc5c]">Map</span>
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4 bg-red-50 py-2 px-3 rounded-lg">
            {error}
          </p>
        )}

        {/* Name field (register only) */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 outline-none focus:border-[#00ccff] transition-colors text-sm"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 outline-none focus:border-[#00ccff] transition-colors text-sm"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-4 outline-none focus:border-[#00ccff] transition-colors text-sm"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[rgb(255,204,92)] text-white py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-[rgba(202,154,51,0.93)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-gray-400 text-xs">or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Google login */}
        <button
          onClick={() => { toast.loading("Redirecting to Google..."); signIn("google", { callbackUrl: "/" }) }}
          className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Toggle login/register */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(""); }}

            className="text-black font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}