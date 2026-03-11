import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";
import toast from "react-hot-toast";

const ROLES: { value: UserRole; label: string; emoji: string; desc: string }[] = [
  { value: "founder", label: "Founder", emoji: "🚀", desc: "Building a startup" },
  { value: "investor", label: "Investor", emoji: "💼", desc: "Looking to invest" },
  { value: "mentor", label: "Mentor", emoji: "🎓", desc: "Sharing expertise" },
];

const Register: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "founder" as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const success = await register({
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
      role: form.role,
    });
    setLoading(false);

    if (success) {
      toast.success(`Welcome to VenturIQ, ${form.name.split(" ")[0]}!`);
      navigate("/dashboard");
    } else {
      setError("An account with this email already exists. Please login.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">
      <Navbar />
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl blob" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-gray-400 text-sm mt-1">Join 5,000+ founders building the future</p>
        </div>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-8">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map(({ value, label, emoji, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: value }))}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all text-center ${
                      form.role === value
                        ? "border-[#F97316] bg-[#F97316]/10"
                        : "border-[#374151] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xl mb-1">{emoji}</span>
                    <span className="text-xs font-semibold text-white">{label}</span>
                    <span className="text-xs text-gray-500 hidden sm:block">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                  placeholder="Arjun Sharma"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#374151]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#1F2937] px-3 text-gray-500">or sign up with</span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: "G", color: "hover:bg-red-500/10 hover:border-red-500/30" },
              { name: "LinkedIn", icon: "in", color: "hover:bg-blue-500/10 hover:border-blue-500/30" },
            ].map(({ name, icon, color }) => (
              <button
                key={name}
                onClick={() => toast("Social signup coming soon!", { icon: "ℹ️" })}
                className={`flex items-center justify-center gap-2 py-3 border border-[#374151] rounded-xl text-gray-300 hover:text-white transition-all text-sm font-medium ${color}`}
              >
                <span className="font-bold">{icon}</span>
                {name}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F97316] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
