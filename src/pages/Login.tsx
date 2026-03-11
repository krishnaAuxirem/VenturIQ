import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      toast.success("Welcome back to VenturIQ!");
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please check your credentials.");
    }
  };

  const fillDemo = (type: "user" | "admin") => {
    if (type === "user") {
      setEmail("user@venturiq.com");
      setPassword("User@123");
    } else {
      setEmail("admin@venturiq.com");
      setPassword("Admin@123");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">
      <Navbar />
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F97316]/10 rounded-full blur-3xl blob" style={{ animationDelay: "2s" }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Demo Credentials Card */}
        <div className="bg-[#1F2937]/80 border border-[#374151] rounded-xl p-4 mb-5">
          <p className="text-xs text-gray-400 mb-3 font-medium">🔑 Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => fillDemo("user")}
              className="px-3 py-2.5 bg-[#374151] hover:bg-[#F97316]/20 hover:border-[#F97316]/30 border border-transparent text-left rounded-lg transition-all"
            >
              <p className="text-xs font-semibold text-white">Founder Demo</p>
              <p className="text-xs text-gray-400">user@venturiq.com</p>
              <p className="text-xs text-gray-500">User@123</p>
            </button>
            <button
              onClick={() => fillDemo("admin")}
              className="px-3 py-2.5 bg-[#374151] hover:bg-[#F97316]/20 hover:border-[#F97316]/30 border border-transparent text-left rounded-lg transition-all"
            >
              <p className="text-xs font-semibold text-white">Admin Demo</p>
              <p className="text-xs text-gray-400">admin@venturiq.com</p>
              <p className="text-xs text-gray-500">Admin@123</p>
            </button>
          </div>
        </div>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-8">
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#F97316] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#374151]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#1F2937] px-3 text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: "G", color: "hover:bg-red-500/10 hover:border-red-500/30" },
              { name: "LinkedIn", icon: "in", color: "hover:bg-blue-500/10 hover:border-blue-500/30" },
            ].map(({ name, icon, color }) => (
              <button
                key={name}
                onClick={() => toast("Social login coming soon!", { icon: "ℹ️" })}
                className={`flex items-center justify-center gap-2 py-3 border border-[#374151] rounded-xl text-gray-300 hover:text-white transition-all text-sm font-medium ${color}`}
              >
                <span className="font-bold">{icon}</span>
                {name}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#F97316] font-semibold hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
