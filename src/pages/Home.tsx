import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Play, TrendingUp, Users, DollarSign, Star,
  Zap, BarChart2, Search, BookOpen, MessageCircle, CheckCircle,
  ChevronRight, Target, Rocket, Globe, Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  STARTUPS, INVESTORS, MENTORS, TESTIMONIALS, TRUSTED_LOGOS,
  COMMUNITY_POSTS, PLATFORM_STATS
} from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=800&fit=crop",
];

const TYPEWRITER_TEXTS = [
  "Validate your startup idea with AI",
  "Connect with top investors in India",
  "Build investor-ready business plans",
  "Access 300+ expert mentors",
  "Scale your venture with data",
];

const FEATURES = [
  {
    icon: Target,
    title: "AI Idea Validation",
    desc: "Get instant AI-powered analysis of your startup idea — market demand, competition, feasibility score.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: BookOpen,
    title: "Business Plan Builder",
    desc: "Build investor-ready business plans with AI-generated market analysis, revenue models, and growth strategies.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Investor Discovery",
    desc: "AI-matched investor recommendations based on your industry, stage, and traction metrics.",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: DollarSign,
    title: "Fundraising Module",
    desc: "Create compelling pitch pages, track investor interest, and manage your fundraising pipeline.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Mentor Marketplace",
    desc: "Connect with 300+ industry experts for 1-on-1 sessions on product, fundraising, and growth.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart2,
    title: "Startup Analytics",
    desc: "Track your key metrics, monitor burn rate, and visualize growth with powerful analytics dashboards.",
    color: "from-yellow-500 to-orange-500",
  },
];

const VALIDATOR_INDUSTRIES = [
  "EdTech", "HealthTech", "FinTech", "AgriTech", "CleanTech",
  "Logistics", "SaaS", "D2C", "HRTech", "RetailTech",
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    badge: null,
    color: "border-[#374151]",
    features: [
      "3 Idea Validations/month",
      "Basic Business Plan",
      "Startup Profile",
      "Community Access",
      "5 Investor Connections",
      "Email Support",
    ],
    cta: "Get Started Free",
    ctaStyle: "border border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10",
  },
  {
    name: "Growth",
    price: "₹1,999",
    period: "/month",
    badge: "Most Popular",
    color: "border-[#F97316]",
    features: [
      "Unlimited Idea Validations",
      "Full Business Plan Builder",
      "Fundraising Module",
      "50 Investor Connections",
      "3 Mentor Sessions/month",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Start Growth Plan",
    ctaStyle: "bg-[#F97316] hover:bg-[#ea6c10] text-white",
  },
  {
    name: "Pro",
    price: "₹4,999",
    period: "/month",
    badge: null,
    color: "border-[#374151]",
    features: [
      "Everything in Growth",
      "Unlimited Investor Access",
      "10 Mentor Sessions/month",
      "White-label Pitch Deck",
      "Investor CRM",
      "Due Diligence Reports",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    cta: "Start Pro Plan",
    ctaStyle: "border border-white/20 text-white hover:bg-white/5",
  },
];

// Typewriter Hook
function useTypewriter(texts: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }

    setDisplayed(current.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const typewriterText = useTypewriter(TYPEWRITER_TEXTS);

  const [heroImageIdx, setHeroImageIdx] = useState(0);
  const [validatorInput, setValidatorInput] = useState({ name: "", industry: "EdTech" });
  const [validatorResult, setValidatorResult] = useState<{
    demand: number; competition: number; feasibility: number; shown: boolean;
  } | null>(null);
  const [validatorLoading, setValidatorLoading] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [annualPricing, setAnnualPricing] = useState(false);

  // Auto-scroll hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleValidate = () => {
    if (!validatorInput.name) return;
    setValidatorLoading(true);
    setTimeout(() => {
      setValidatorResult({
        demand: Math.floor(Math.random() * 30) + 65,
        competition: Math.floor(Math.random() * 40) + 40,
        feasibility: Math.floor(Math.random() * 25) + 68,
        shown: true,
      });
      setValidatorLoading(false);
    }, 1800);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-[#0A0E1A]/60" />

        {/* Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#F97316]/20 rounded-full blur-3xl blob" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl blob" style={{ animationDelay: "4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F97316]/15 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Startup Intelligence Platform
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Build Smarter.<br />
              <span className="text-gradient">Raise Faster.</span><br />
              Scale Further.
            </motion.h1>

            <motion.div variants={itemVariants} className="text-lg sm:text-xl text-gray-300 mb-8 min-h-[2rem]">
              <span className="text-gray-300">{typewriterText}</span>
              <span className="typewriter-cursor text-[#F97316]" />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                className="group px-6 py-3.5 bg-[#F97316] hover:bg-[#ea6c10] text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                Start for Free →
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/about")}
                className="px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-[#F97316]" />
                Watch Demo
              </button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
              {[
                { icon: Rocket, label: "2,500+ Startups", color: "text-orange-400" },
                { icon: DollarSign, label: "₹150 Cr+ Raised", color: "text-green-400" },
                { icon: Users, label: "800+ Investors", color: "text-blue-400" },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm font-medium text-white">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-80 h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {HERO_IMAGES.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt="Startup life"
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ opacity: i === heroImageIdx ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A]/80 via-transparent to-transparent" />
              {/* Dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroImageIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === heroImageIdx ? "bg-[#F97316] w-6" : "bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: TRUSTED BY (Marquee) */}
      <section className="py-12 border-y border-[#374151]/50 overflow-hidden bg-[#0D1117]">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Trusted by India's fastest-growing ecosystem</p>
        </div>
        <div className="flex gap-0 overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((l, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 bg-[#1F2937]/50 border border-[#374151]/50 rounded-xl flex-shrink-0"
              >
                <div className="w-8 h-8 bg-[#F97316]/20 rounded-lg flex items-center justify-center text-[#F97316] text-xs font-bold">
                  {l.logo}
                </div>
                <span className="text-sm text-gray-400 font-medium whitespace-nowrap">{l.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT IS VenturIQ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-400 mb-6">
              <Globe className="w-3.5 h-3.5" />
              What is VenturIQ?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              The command center for <span className="text-gradient">India's next unicorns</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              VenturIQ combines artificial intelligence with India's most active startup ecosystem to give founders, investors, and mentors everything they need to succeed.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: Zap,
                  title: "AI-Powered Insights",
                  desc: "Get real-time market analysis, idea validation, and competitor intelligence powered by cutting-edge AI.",
                  color: "bg-orange-500/20 text-orange-400",
                },
                {
                  icon: Users,
                  title: "Ecosystem Network",
                  desc: "Access 800+ investors, 300+ mentors, and 2,500+ founders actively engaged on the platform.",
                  color: "bg-blue-500/20 text-blue-400",
                },
                {
                  icon: TrendingUp,
                  title: "Data-Driven Growth",
                  desc: "Track your startup's metrics, benchmark against peers, and make decisions backed by data.",
                  color: "bg-green-500/20 text-green-400",
                },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dashboard Mockup */}
            <div className="bg-[#111827] border border-[#374151] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-500">VenturIQ Dashboard</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Idea Score", value: "84/100", color: "text-green-400" },
                  { label: "Investors Matched", value: "23", color: "text-blue-400" },
                  { label: "Funding Progress", value: "₹3.2 Cr", color: "text-orange-400" },
                  { label: "Profile Views", value: "1,247", color: "text-purple-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]/50">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              {/* Chart mockup */}
              <div className="bg-[#1F2937] rounded-xl p-4 border border-[#374151]/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Revenue Growth (MoM)</span>
                  <span className="text-xs text-green-400 font-semibold">+42%</span>
                </div>
                <div className="flex items-end gap-1 h-16">
                  {[30, 45, 35, 60, 55, 75, 65, 85, 80, 95, 90, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#F97316] to-[#fb923c] rounded-sm opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-[#F97316] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              AI-Powered ✨
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: KEY FEATURES */}
      <section className="py-20 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316]/10 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] mb-4">
              <Star className="w-3.5 h-3.5" />
              Platform Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to <span className="text-gradient">build & grow</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From idea to IPO, VenturIQ provides the tools, insights, and connections at every stage of your startup journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-[#1F2937] border border-[#374151] rounded-2xl p-6 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#F97316] transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                <div className="flex items-center gap-1 text-[#F97316] text-sm font-medium">
                  Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How VenturIQ Works</h2>
          <p className="text-gray-400">From zero to funded in 3 simple steps</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#374151] via-[#F97316] to-[#374151]" />

          {[
            {
              step: "01",
              icon: Users,
              title: "Register & Create Profile",
              desc: "Sign up as a founder, investor, or mentor. Build your complete profile and startup details.",
            },
            {
              step: "02",
              icon: Zap,
              title: "Validate Your Idea with AI",
              desc: "Run AI-powered validation on your idea. Get market demand scores, competition analysis, and feasibility reports.",
            },
            {
              step: "03",
              icon: DollarSign,
              title: "Connect & Raise Funds",
              desc: "Get matched with relevant investors, book mentor sessions, and manage your fundraising pipeline.",
            },
          ].map(({ step, icon: Icon, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#F97316] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#1F2937] border-2 border-[#F97316] rounded-full flex items-center justify-center text-xs font-bold text-[#F97316]">
                  {step}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6: IDEA VALIDATOR DEMO */}
      <section className="py-20 bg-[#0D1117]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-400 mb-4">
              <Zap className="w-3.5 h-3.5" />
              Try it Live
            </div>
            <h2 className="text-3xl font-bold mb-4">Startup Idea Validator</h2>
            <p className="text-gray-400">Get an instant AI-powered assessment of your startup idea</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1F2937] border border-[#374151] rounded-2xl p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Startup Name</label>
                <input
                  type="text"
                  placeholder="e.g., EduNova"
                  value={validatorInput.name}
                  onChange={(e) => setValidatorInput((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                <select
                  value={validatorInput.industry}
                  onChange={(e) => setValidatorInput((p) => ({ ...p, industry: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#F97316] transition-colors"
                >
                  {VALIDATOR_INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleValidate}
              disabled={validatorLoading || !validatorInput.name}
              className="w-full py-3.5 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {validatorLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Validate My Idea
                </>
              )}
            </button>

            {validatorResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <h4 className="font-semibold text-white">AI Analysis Results for "{validatorInput.name}"</h4>
                {[
                  { label: "Market Demand", value: validatorResult.demand, color: "#22c55e", high: "High" },
                  { label: "Competition Level", value: validatorResult.competition, color: "#F97316", high: "Medium" },
                  { label: "Feasibility Score", value: validatorResult.feasibility, color: "#60a5fa", high: "High" },
                ].map(({ label, value, color, high }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300">{label}</span>
                      <span className="text-sm font-bold" style={{ color }}>
                        {value}% — {high}
                      </span>
                    </div>
                    <div className="h-2 bg-[#111827] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                ))}
                <Link
                  to={isAuthenticated ? "/dashboard" : "/register"}
                  className="inline-flex items-center gap-2 mt-2 text-sm text-[#F97316] hover:underline font-medium"
                >
                  Try Full Validator in Dashboard →
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: FEATURED STARTUPS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Startups</h2>
            <p className="text-gray-400">Top startups raising funds on VenturIQ</p>
          </div>
          <Link to="/startups" className="hidden sm:flex items-center gap-2 text-[#F97316] font-medium hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {STARTUPS.slice(0, 6).map((startup, i) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-72 bg-[#1F2937] border border-[#374151] rounded-2xl p-5 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-4">
                <img
                  src={startup.logo}
                  alt={startup.name}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate">{startup.name}</h4>
                  <p className="text-xs text-gray-400 truncate">{startup.tagline}</p>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-[#F97316]/15 text-[#F97316] text-xs rounded-lg font-medium">{startup.industry}</span>
                <span className="px-2 py-1 bg-blue-500/15 text-blue-400 text-xs rounded-lg font-medium">{startup.fundingStage}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{startup.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Funding</p>
                  <p className="text-sm font-bold text-green-400">{startup.funding}</p>
                </div>
                <Link
                  to={`/startups/${startup.id}`}
                  className="px-3 py-1.5 bg-[#F97316] text-white text-xs font-semibold rounded-lg hover:bg-[#ea6c10] transition-all"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <Link to="/startups" className="inline-flex items-center gap-2 text-[#F97316] font-medium">
            View All Startups <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SECTION 8: INVESTOR SPOTLIGHT */}
      <section className="py-20 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Investor Spotlight</h2>
              <p className="text-gray-400">Top investors actively looking for startups like yours</p>
            </div>
            <Link to="/investors" className="hidden sm:flex items-center gap-2 text-[#F97316] font-medium hover:underline">
              Explore Investors <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INVESTORS.slice(0, 4).map((investor, i) => (
              <motion.div
                key={investor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 text-center hover:border-[#F97316]/40 transition-all group"
              >
                <img
                  src={investor.photo}
                  alt={investor.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 group-hover:scale-105 transition-transform"
                />
                <h4 className="font-bold text-white mb-1">{investor.name}</h4>
                <p className="text-xs text-[#F97316] mb-2">{investor.fundName}</p>
                <p className="text-xs text-gray-500 mb-3">{investor.location}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {investor.focusAreas.slice(0, 2).map((area) => (
                    <span key={area} className="px-2 py-0.5 bg-[#374151] text-gray-300 text-xs rounded-full">{area}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mb-4">{investor.portfolioCount} portfolio companies</p>
                <Link
                  to="/investors"
                  className="block w-full py-2 border border-[#F97316] text-[#F97316] text-xs font-semibold rounded-xl hover:bg-[#F97316] hover:text-white transition-all"
                >
                  Connect
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: MENTOR MARKETPLACE PREVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Mentor Marketplace</h2>
            <p className="text-gray-400">Book 1-on-1 sessions with India's top startup experts</p>
          </div>
          <Link to="/mentors" className="hidden sm:flex items-center gap-2 text-[#F97316] font-medium hover:underline">
            Browse All Mentors <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS.slice(0, 4).map((mentor, i) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 hover:border-[#F97316]/40 transition-all"
            >
              <img
                src={mentor.photo}
                alt={mentor.name}
                className="w-16 h-16 rounded-xl object-cover mb-4"
              />
              <h4 className="font-bold text-white mb-0.5">{mentor.name}</h4>
              <p className="text-xs text-[#F97316] mb-2">{mentor.company}</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${j < Math.floor(mentor.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">({mentor.reviewCount})</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 2).map((exp) => (
                  <span key={exp} className="px-2 py-0.5 bg-[#374151] text-gray-300 text-xs rounded-full">{exp}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Fee/hour</p>
                  <p className="text-sm font-bold text-white">₹{mentor.feePerHour.toLocaleString()}</p>
                </div>
                <Link
                  to="/mentors"
                  className="px-3 py-1.5 bg-[#F97316] text-white text-xs font-semibold rounded-lg hover:bg-[#ea6c10] transition-all"
                >
                  Book Session
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 10: ANALYTICS PREVIEW */}
      <section className="py-20 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-6">
                <BarChart2 className="w-3.5 h-3.5" />
                Analytics Dashboard
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Track every metric that <span className="text-gradient">matters to investors</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                VenturIQ's analytics dashboard gives you real-time visibility into revenue, user acquisition, burn rate, and investor engagement — the metrics that matter most at every stage.
              </p>
              <ul className="space-y-3">
                {[
                  "Revenue Growth & MoM tracking",
                  "User Acquisition & Retention charts",
                  "Burn Rate & Runway calculator",
                  "Investor engagement tracking",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
              >
                View Your Analytics <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Revenue Chart */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-white">Revenue Growth</span>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">↑ 42% MoM</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[20, 35, 28, 50, 45, 65, 58, 80, 72, 90, 85, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex-1 bg-gradient-to-t from-[#F97316] to-[#fb923c] rounded-t-sm opacity-80"
                    />
                  ))}
                </div>
              </div>

              {/* User Acquisition */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-white">User Acquisition</span>
                  <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">↑ 28% MoM</span>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {[40, 55, 48, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex-1 bg-gradient-to-t from-[#60a5fa] to-[#93c5fd] rounded-t-sm opacity-80"
                    />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Burn Rate", value: "₹18 L/mo", color: "text-red-400" },
                  { label: "Runway", value: "14 months", color: "text-yellow-400" },
                  { label: "MRR", value: "₹26.7 L", color: "text-green-400" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-[#1F2937] border border-[#374151] rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-sm font-bold ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 11: PRICING */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400 mb-6">Choose the plan that fits your stage. Upgrade or downgrade anytime.</p>
          <div className="inline-flex items-center bg-[#1F2937] border border-[#374151] rounded-xl p-1">
            <button
              onClick={() => setAnnualPricing(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${!annualPricing ? "bg-[#F97316] text-white" : "text-gray-400"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualPricing(true)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${annualPricing ? "bg-[#F97316] text-white" : "text-gray-400"}`}
            >
              Annual <span className="ml-1 text-xs text-green-400">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-[#1F2937] border-2 ${plan.color} rounded-2xl p-8 ${plan.badge ? "shadow-2xl shadow-orange-500/20" : ""}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-white">
                  {plan.price === "Free" ? "Free" : annualPricing ? `₹${Math.floor(parseInt(plan.price.replace("₹", "").replace(",", "")) * 0.8).toLocaleString()}` : plan.price}
                </span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block w-full py-3 text-center text-sm font-semibold rounded-xl transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/pricing" className="text-[#F97316] text-sm hover:underline">
            See full feature comparison →
          </Link>
        </div>
      </section>

      {/* SECTION 12: TESTIMONIALS */}
      <section className="py-20 bg-[#0D1117] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Founders Love VenturIQ</h2>
            <p className="text-gray-400">Join thousands of founders who've scaled with our platform</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}, {t.startup}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: COMMUNITY PREVIEW */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-6">
              <MessageCircle className="w-3.5 h-3.5" />
              Community
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Learn from <span className="text-gradient">5,000+ founders</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Join India's most active startup community. Ask questions, share learnings, and get advice from founders who've been there.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: "Founders", value: PLATFORM_STATS.founders },
                { label: "Discussions", value: PLATFORM_STATS.discussions },
                { label: "Resources", value: PLATFORM_STATS.resources },
              ].map(({ label, value }) => (
                <div key={label} className="text-center bg-[#1F2937] border border-[#374151] rounded-xl p-4">
                  <p className="text-xl font-bold text-[#F97316] mb-1">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
            >
              Join Community <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {COMMUNITY_POSTS.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                to="/community"
                className="block bg-[#1F2937] border border-[#374151] rounded-xl p-4 hover:border-[#F97316]/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white hover:text-[#F97316] transition-colors line-clamp-1">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">{post.author}</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{post.replies} replies</span>
                      <span className="text-xs text-gray-600">•</span>
                      <span className="text-xs text-gray-500">{post.likes} likes</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 14: CTA BANNER */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#F97316] via-[#ea6c10] to-[#dc5d0e] p-12 text-center"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-64 h-64 border border-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm text-white font-medium mb-6">
                <Award className="w-4 h-4" />
                India's #1 Startup Platform
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
                Ready to Build Your Startup?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join 5,000+ founders who are building the future with VenturIQ. Get started free today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-[#F97316] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-xl"
                >
                  Get Started Free →
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
