import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Building2, Zap, FileText, DollarSign, Users,
  BarChart2, GraduationCap, MessageCircle, Bell, Settings, LogOut,
  Menu, X, ChevronRight, TrendingUp, Eye, Target
} from "lucide-react";
import VenturIQLogo from "@/components/VenturIQLogo";
import { useAuth } from "@/contexts/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import toast from "react-hot-toast";

// ====== SIDEBAR CONFIG ======
const FOUNDER_SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: Building2, label: "My Startup Profile", tab: "startup-profile" },
  { icon: Target, label: "Idea Validator", tab: "idea-validator" },
  { icon: FileText, label: "Business Plan Builder", tab: "business-plan" },
  { icon: DollarSign, label: "Fundraising", tab: "fundraising" },
  { icon: Users, label: "Investor Connections", tab: "investors" },
  { icon: BarChart2, label: "Analytics", tab: "analytics" },
  { icon: GraduationCap, label: "Mentors", tab: "mentors" },
  { icon: MessageCircle, label: "Community", tab: "community" },
  { icon: Bell, label: "Notifications", tab: "notifications" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

const INVESTOR_SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: Building2, label: "Discover Startups", tab: "discover" },
  { icon: DollarSign, label: "My Portfolio", tab: "portfolio" },
  { icon: Bell, label: "Interests", tab: "interests" },
  { icon: MessageCircle, label: "Messages", tab: "messages" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

const MENTOR_SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: Users, label: "My Profile", tab: "profile" },
  { icon: Bell, label: "Session Requests", tab: "requests" },
  { icon: GraduationCap, label: "Booked Sessions", tab: "sessions" },
  { icon: MessageCircle, label: "Reviews", tab: "reviews" },
  { icon: DollarSign, label: "Earnings", tab: "earnings" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

const ADMIN_SIDEBAR = [
  { icon: LayoutDashboard, label: "Overview", tab: "overview" },
  { icon: Users, label: "Manage Users", tab: "users" },
  { icon: Building2, label: "Manage Startups", tab: "startups" },
  { icon: DollarSign, label: "Manage Investors", tab: "investors" },
  { icon: GraduationCap, label: "Manage Mentors", tab: "mentors" },
  { icon: FileText, label: "Blog Management", tab: "blog" },
  { icon: TrendingUp, label: "Funding Activity", tab: "funding" },
  { icon: BarChart2, label: "Platform Analytics", tab: "analytics" },
  { icon: FileText, label: "Reports", tab: "reports" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

// ====== CHART DATA ======
const REVENUE_DATA = [
  { month: "Sep", revenue: 12 }, { month: "Oct", revenue: 18 },
  { month: "Nov", revenue: 15 }, { month: "Dec", revenue: 24 },
  { month: "Jan", revenue: 22 }, { month: "Feb", revenue: 30 },
  { month: "Mar", revenue: 28 }, { month: "Apr", revenue: 38 },
];

const USER_DATA = [
  { month: "Sep", users: 120 }, { month: "Oct", users: 180 },
  { month: "Nov", users: 150 }, { month: "Dec", users: 240 },
  { month: "Jan", users: 280 }, { month: "Feb", users: 320 },
  { month: "Mar", users: 380 }, { month: "Apr", users: 450 },
];

const RETENTION_DATA = [
  { name: "Retained", value: 68, color: "#22c55e" },
  { name: "Churned", value: 32, color: "#374151" },
];

const MOCK_INVESTORS_LIST = [
  { name: "Vikram Mehta", fund: "Bharat Ventures", focus: "FinTech", status: "Interested", date: "Mar 10" },
  { name: "Ananya Krishnan", fund: "DeepTech Capital", focus: "AI/ML", status: "Reviewing", date: "Mar 8" },
  { name: "Meera Pillai", fund: "Consumer Alpha", focus: "D2C", status: "Contacted", date: "Mar 5" },
];

const MOCK_USERS = [
  { name: "Arjun Sharma", email: "arjun@gmail.com", role: "founder", status: "active", joined: "Mar 1" },
  { name: "Priya Iyer", email: "priya@iyer.com", role: "investor", status: "active", joined: "Feb 28" },
  { name: "Rohit Das", email: "rohit@das.com", role: "mentor", status: "active", joined: "Feb 25" },
  { name: "Kavya Singh", email: "kavya@singh.com", role: "founder", status: "suspended", joined: "Feb 20" },
  { name: "Vikram Nair", email: "vikram@nair.com", role: "investor", status: "active", joined: "Feb 15" },
];

// ====== COMPONENTS ======

const StatCard: React.FC<{ label: string; value: string; change?: string; color?: string; icon?: React.ElementType }> = ({
  label, value, change, color = "text-white", icon: Icon
}) => (
  <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm text-gray-400">{label}</p>
      {Icon && (
        <div className="w-9 h-9 bg-[#F97316]/15 rounded-xl flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#F97316]" />
        </div>
      )}
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    {change && <p className="text-xs text-green-400 mt-1">{change}</p>}
  </div>
);

// ====== FOUNDER SECTIONS ======
const FounderOverview: React.FC<{ user: { name: string } }> = ({ user }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back, {user.name.split(" ")[0]}! 👋</h2>
        <p className="text-gray-400 text-sm">Here's what's happening with your startup today.</p>
      </div>
      <div className="hidden sm:block text-right">
        <p className="text-xs text-gray-500">Last login</p>
        <p className="text-sm text-gray-300">Today, 9:32 AM</p>
      </div>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Idea Score" value="84/100" change="↑ +6 this week" color="text-green-400" icon={Target} />
      <StatCard label="Investors Reached" value="23" change="↑ 5 new this week" color="text-blue-400" icon={Users} />
      <StatCard label="Funding Progress" value="₹3.2 Cr" change="₹5 Cr target" color="text-[#F97316]" icon={DollarSign} />
      <StatCard label="Profile Views" value="1,247" change="↑ 32% this week" color="text-purple-400" icon={Eye} />
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Revenue Growth (₹ Lakhs)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} />
            <Line type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} dot={{ fill: "#F97316" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { icon: "👁️", text: "Vikram Mehta (Bharat Ventures) viewed your profile", time: "2h ago" },
            { icon: "💡", text: "Your idea score improved from 78 to 84", time: "1d ago" },
            { icon: "🤝", text: "New investor match: Ananya Krishnan", time: "2d ago" },
            { icon: "📅", text: "Mentor session with Rajesh Iyer confirmed", time: "3d ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-[#374151]/50 last:border-0">
              <span className="text-lg flex-shrink-0">{activity.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 line-clamp-1">{activity.text}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
      <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Target, label: "Validate Idea", color: "from-orange-500 to-amber-500" },
          { icon: FileText, label: "Build Plan", color: "from-blue-500 to-cyan-500" },
          { icon: Users, label: "Find Investors", color: "from-purple-500 to-violet-500" },
          { icon: GraduationCap, label: "Book Mentor", color: "from-green-500 to-emerald-500" },
        ].map(({ icon: Icon, label, color }) => (
          <button key={label} className={`flex flex-col items-center gap-2 p-4 bg-gradient-to-br ${color} rounded-xl hover:opacity-90 transition-all`}>
            <Icon className="w-5 h-5 text-white" />
            <span className="text-xs font-semibold text-white">{label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const StartupProfileSection: React.FC = () => {
  const [form, setForm] = useState({
    name: "EduNova", industry: "EdTech", model: "B2C / B2B2C",
    description: "AI-powered personalized learning for students across rural and urban India",
    teamSize: "8", revenue: "₹25 L ARR", stage: "Seed", marketSize: "₹50,000 Cr",
    growth: "45% MoM",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    toast.success("Startup profile saved successfully!");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Startup Profile</h2>
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Startup Name", key: "name" },
              { label: "Industry", key: "industry" },
              { label: "Business Model", key: "model" },
              { label: "Revenue Stage", key: "revenue" },
              { label: "Funding Stage", key: "stage" },
              { label: "Market Size", key: "marketSize" },
              { label: "Team Size", key: "teamSize" },
              { label: "MoM Growth", key: "growth" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                <input
                  type="text"
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2.5 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all text-sm">
              {saved ? "✓ Saved!" : "Save Profile"}
            </button>
            <button type="button" onClick={() => toast("Preview mode coming soon!")} className="px-6 py-2.5 border border-[#374151] text-gray-300 font-medium rounded-xl hover:bg-white/5 transition-all text-sm">
              Preview Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const IdeaValidatorSection: React.FC = () => {
  const [form, setForm] = useState({ title: "", description: "", industry: "EdTech", targetMarket: "" });
  const [result, setResult] = useState<null | { demand: number; competition: number; risk: string; feasibility: number }>(null);
  const [loading, setLoading] = useState(false);

  const INDUSTRIES = ["EdTech", "HealthTech", "FinTech", "AgriTech", "CleanTech", "Logistics", "SaaS", "D2C"];

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      demand: Math.floor(Math.random() * 30) + 65,
      competition: Math.floor(Math.random() * 40) + 40,
      risk: ["Low", "Medium", "Medium-High"][Math.floor(Math.random() * 3)],
      feasibility: Math.floor(Math.random() * 25) + 68,
    });
    setLoading(false);
    toast.success("AI analysis complete!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">AI Idea Validator</h2>
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <form onSubmit={handleValidate} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Idea Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g., AI-powered tutoring for Tier 2 cities"
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
              >
                {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Target Market</label>
            <input
              type="text"
              value={form.targetMarket}
              onChange={(e) => setForm((f) => ({ ...f, targetMarket: e.target.value }))}
              placeholder="e.g., Students aged 12-18 in Tier 2 and Tier 3 cities of India"
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Idea Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              placeholder="Describe your startup idea, problem it solves, and your unique approach..."
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !form.title}
            className="w-full py-3 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI is analyzing your idea...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Validate with AI
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-white">AI Analysis Report</h3>
            <button
              onClick={() => toast.success("Report saved!")}
              className="px-4 py-1.5 bg-[#374151] hover:bg-[#F97316]/20 text-gray-300 hover:text-[#F97316] text-xs font-medium rounded-lg transition-all"
            >
              Save Report
            </button>
          </div>
          <div className="space-y-5">
            {[
              { label: "Market Demand", value: result.demand, color: "#22c55e", suffix: "% — High Demand" },
              { label: "Competition Level", value: result.competition, color: "#F97316", suffix: "% — Medium Competition" },
              { label: "Feasibility Score", value: result.feasibility, color: "#60a5fa", suffix: "% — Highly Feasible" },
            ].map(({ label, value, color, suffix }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-gray-300">{label}</span>
                  <span className="text-sm font-bold" style={{ color }}>{value}{suffix}</span>
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
            <div className="bg-[#111827] rounded-xl p-4 mt-4">
              <p className="text-sm font-semibold text-white mb-2">Risk Assessment: <span className="text-yellow-400">{result.risk}</span></p>
              <p className="text-xs text-gray-400">
                Your idea shows strong market potential with manageable competition. The key risk factors include market saturation in metro areas and regulatory considerations. We recommend focusing on Tier 2/3 city market entry for differentiation.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const BusinessPlanSection: React.FC = () => {
  const [sections, setSections] = useState({
    executiveSummary: "EduNova is an AI-powered personalized learning platform targeting students across India...",
    marketAnalysis: "The Indian EdTech market is valued at ₹9,500 Cr and growing at 39% CAGR...",
    businessModel: "B2C subscription (₹299/month for students) + B2B2C (school partnerships at ₹50/student/year)...",
    revenueModel: "Recurring subscription revenue with 85% gross margins. Target ₹10 Cr ARR by FY26...",
    growthStrategy: "Phase 1: Bengaluru pilot (Q1 2025). Phase 2: South India expansion (Q3 2025). Phase 3: Pan-India (2026)...",
  });

  const handleExport = (type: string) => {
    toast.success(`Exporting as ${type}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Business Plan Builder</h2>
        <div className="flex gap-2">
          <button onClick={() => handleExport("PDF")} className="px-4 py-2 bg-[#374151] hover:bg-[#F97316]/20 text-gray-300 hover:text-[#F97316] text-sm font-medium rounded-xl transition-all">
            Export PDF
          </button>
          <button onClick={() => handleExport("Pitch Deck")} className="px-4 py-2 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
            Export Pitch
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(sections).map(([key, value]) => {
          const labels: Record<string, string> = {
            executiveSummary: "Executive Summary",
            marketAnalysis: "Market Analysis",
            businessModel: "Business Model",
            revenueModel: "Revenue Model",
            growthStrategy: "Growth Strategy",
          };
          return (
            <div key={key} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
              <label className="block text-sm font-semibold text-[#F97316] mb-3">{labels[key]}</label>
              <textarea
                value={value}
                onChange={(e) => setSections((s) => ({ ...s, [key]: e.target.value }))}
                rows={4}
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
              />
            </div>
          );
        })}
      </div>

      <button onClick={() => toast.success("Business plan saved!")} className="w-full py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
        Save Business Plan
      </button>
    </div>
  );
};

const FundraisingSection: React.FC = () => {
  const [campaign, setCampaign] = useState({ required: "5,00,00,000", equity: "12", status: "active" });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Fundraising</h2>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Create Pitch Campaign</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Funding Required (₹)</label>
            <input
              type="text"
              value={campaign.required}
              onChange={(e) => setCampaign((c) => ({ ...c, required: e.target.value }))}
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Equity Offered (%)</label>
            <input
              type="text"
              value={campaign.equity}
              onChange={(e) => setCampaign((c) => ({ ...c, equity: e.target.value }))}
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Status</label>
            <select
              value={campaign.status}
              onChange={(e) => setCampaign((c) => ({ ...c, status: e.target.value }))}
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
            >
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <button onClick={() => toast.success("Campaign updated!")} className="px-6 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
          Save Campaign
        </button>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Investor Interest</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#374151]">
                {["Investor", "Fund", "Focus", "Status", "Date", "Action"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_INVESTORS_LIST.map((inv, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-3 text-white font-medium">{inv.name}</td>
                  <td className="py-3 px-3 text-gray-400">{inv.fund}</td>
                  <td className="py-3 px-3 text-gray-400">{inv.focus}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      inv.status === "Interested" ? "bg-green-500/20 text-green-400" :
                      inv.status === "Reviewing" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>{inv.status}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{inv.date}</td>
                  <td className="py-3 px-3">
                    <button onClick={() => toast.success(`Message sent to ${inv.name}!`)} className="px-3 py-1 bg-[#F97316]/20 text-[#F97316] text-xs rounded-lg hover:bg-[#F97316]/30 transition-all">
                      Message
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AnalyticsSection: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="MRR" value="₹26.7 L" change="↑ 42% MoM" color="text-green-400" />
      <StatCard label="Active Users" value="4,280" change="↑ 28% MoM" color="text-blue-400" />
      <StatCard label="Burn Rate" value="₹18 L/mo" color="text-red-400" />
      <StatCard label="Runway" value="14 months" color="text-yellow-400" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Revenue Growth (₹ Lakhs)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} />
            <Line type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} dot={{ fill: "#F97316", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">User Acquisition</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={USER_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} />
            <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Customer Retention</h3>
        <div className="flex items-center gap-8">
          <ResponsiveContainer width="50%" height={150}>
            <PieChart>
              <Pie data={RETENTION_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                {RETENTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {RETENTION_DATA.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-300">{item.name}</span>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Monthly Trends</h3>
        <div className="space-y-3">
          {[
            { label: "CAC", value: "₹480", trend: "↓ 12%", good: true },
            { label: "LTV", value: "₹8,640", trend: "↑ 23%", good: true },
            { label: "LTV:CAC", value: "18:1", trend: "↑ 40%", good: true },
            { label: "Churn Rate", value: "3.2%", trend: "↓ 0.5%", good: true },
          ].map(({ label, value, trend, good }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-[#374151]/50 last:border-0">
              <span className="text-sm text-gray-400">{label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{value}</span>
                <span className={`text-xs ${good ? "text-green-400" : "text-red-400"}`}>{trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const NotificationsSection: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Notifications</h2>
    <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
      <div className="space-y-4">
        {[
          { type: "investor", icon: "💼", title: "Investor Interest", message: "Vikram Mehta (Bharat Ventures) expressed interest in your startup", time: "2 hours ago", unread: true },
          { type: "mentor", icon: "🎓", title: "Mentor Response", message: "Rajesh Iyer confirmed your session for March 15, 2025 at 3:00 PM", time: "5 hours ago", unread: true },
          { type: "ai", icon: "🤖", title: "AI Insight", message: "New market opportunity detected in your industry: Regional language EdTech growing 65% YoY", time: "1 day ago", unread: false },
          { type: "community", icon: "💬", title: "Community Reply", message: "3 founders replied to your question about B2B pricing strategies", time: "2 days ago", unread: false },
          { type: "investor", icon: "💼", title: "Profile View", message: "Ananya Krishnan (DeepTech Capital) viewed your startup profile", time: "3 days ago", unread: false },
        ].map((notif, i) => (
          <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:border-[#F97316]/30 ${notif.unread ? "bg-[#F97316]/5 border-[#F97316]/20" : "border-[#374151]/50"}`}>
            <div className="w-10 h-10 bg-[#374151] rounded-xl flex items-center justify-center text-xl flex-shrink-0">{notif.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-white">{notif.title}</p>
                {notif.unread && <div className="w-2 h-2 bg-[#F97316] rounded-full flex-shrink-0" />}
              </div>
              <p className="text-xs text-gray-400 mb-1">{notif.message}</p>
              <p className="text-xs text-gray-600">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsSection: React.FC<{ user: { name: string; email: string; role: string } }> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: user.name, email: user.email, bio: "", location: "Bengaluru, India" });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Profile Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Location", key: "location" },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">{label}</label>
              <input
                type="text"
                value={profile[key as keyof typeof profile]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              rows={3}
              placeholder="Tell us about yourself..."
              className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
            />
          </div>
        </div>
        <button onClick={() => toast.success("Profile updated!")} className="mt-4 px-6 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
          Save Changes
        </button>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Plan & Billing</h3>
        <div className="flex items-center justify-between p-4 bg-[#F97316]/10 border border-[#F97316]/30 rounded-xl">
          <div>
            <p className="font-semibold text-white">Starter Plan (Free)</p>
            <p className="text-xs text-gray-400">3 idea validations/month • 5 investor connections</p>
          </div>
          <button onClick={() => navigate("/pricing")} className="px-4 py-2 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
            Upgrade
          </button>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-2">Danger Zone</h3>
        <p className="text-gray-400 text-sm mb-4">These actions are irreversible. Please be careful.</p>
        <div className="flex gap-3">
          <button
            onClick={() => { logout(); navigate("/"); toast.success("Logged out successfully!"); }}
            className="px-4 py-2 bg-[#374151] text-gray-300 text-sm rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            Logout
          </button>
          <button onClick={() => toast.error("Please contact support to delete your account.")} className="px-4 py-2 bg-red-500/20 text-red-400 text-sm rounded-xl hover:bg-red-500/30 transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// ====== INVESTOR DASHBOARD CONTENT ======
const InvestorOverview: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Investor Dashboard</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Startups Viewed" value="147" change="↑ 23 this week" color="text-blue-400" />
      <StatCard label="Interests Expressed" value="28" change="↑ 5 new" color="text-green-400" />
      <StatCard label="Active Investments" value="6" color="text-[#F97316]" />
      <StatCard label="Portfolio Value" value="₹4.2 Cr" change="↑ 18% YoY" color="text-purple-400" />
    </div>
    <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-4">Recent Portfolio Activity</h3>
      {["EduNova raised follow-on round of ₹5 Cr", "FinPath achieved ₹10 Cr ARR milestone", "AgroSense onboarded 500 new farmers"].map((item, i) => (
        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#374151]/50 last:border-0">
          <div className="w-2 h-2 bg-[#F97316] rounded-full flex-shrink-0" />
          <p className="text-sm text-gray-300">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

// ====== MENTOR DASHBOARD CONTENT ======
const MentorOverview: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Mentor Dashboard</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Sessions Done" value="84" change="↑ 6 this month" color="text-green-400" />
      <StatCard label="Total Earnings" value="₹3.92 L" change="↑ ₹42K this month" color="text-[#F97316]" />
      <StatCard label="Rating" value="4.9 ⭐" color="text-yellow-400" />
      <StatCard label="Upcoming Sessions" value="3" color="text-blue-400" />
    </div>
    <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-4">Monthly Earnings (₹)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={[
          { month: "Oct", earnings: 28000 }, { month: "Nov", earnings: 35000 },
          { month: "Dec", earnings: 42000 }, { month: "Jan", earnings: 38000 },
          { month: "Feb", earnings: 45000 }, { month: "Mar", earnings: 52000 },
        ]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Earnings"]} />
          <Bar dataKey="earnings" fill="#F97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// ====== ADMIN DASHBOARD CONTENT ======
const AdminOverview: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Admin Overview</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Total Users" value="5,842" change="↑ 234 this week" color="text-blue-400" />
      <StatCard label="Total Startups" value="2,541" change="↑ 48 this week" color="text-green-400" />
      <StatCard label="Total Funding" value="₹150 Cr+" change="↑ ₹12 Cr this month" color="text-[#F97316]" />
      <StatCard label="Active Mentors" value="320" change="↑ 15 new" color="text-purple-400" />
    </div>
    <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-4">Platform Engagement</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={[
          { month: "Sep", dau: 420 }, { month: "Oct", dau: 580 },
          { month: "Nov", dau: 520 }, { month: "Dec", dau: 780 },
          { month: "Jan", dau: 920 }, { month: "Feb", dau: 1100 },
          { month: "Mar", dau: 1050 }, { month: "Apr", dau: 1280 },
        ]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
          <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} />
          <Line type="monotone" dataKey="dau" stroke="#F97316" strokeWidth={2} dot={{ fill: "#F97316" }} name="Daily Active Users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const ManageUsersSection: React.FC = () => {
  const [users, setUsers] = useState(MOCK_USERS);

  const handleAction = (email: string, action: string) => {
    if (action === "delete") {
      setUsers((u) => u.filter((user) => user.email !== email));
      toast.success("User deleted.");
    } else {
      setUsers((u) => u.map((user) => user.email === email ? { ...user, status: user.status === "active" ? "suspended" : "active" } : user));
      toast.success(`User ${action}ed.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Users</h2>
        <button onClick={() => toast.success("Export initiated!")} className="px-4 py-2 bg-[#374151] text-gray-300 text-sm rounded-xl hover:bg-[#F97316]/20 hover:text-[#F97316] transition-all">
          Export CSV
        </button>
      </div>
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-gray-400">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${
                      user.role === "founder" ? "bg-orange-500/20 text-orange-400" :
                      user.role === "investor" ? "bg-blue-500/20 text-blue-400" :
                      "bg-purple-500/20 text-purple-400"
                    }`}>{user.role}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{user.joined}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleAction(user.email, user.status === "active" ? "suspend" : "activate")} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-all">
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </button>
                      <button onClick={() => handleAction(user.email, "delete")} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ====== INVESTOR SECTIONS ======
const InvestorPortfolioSection: React.FC = () => {
  const [portfolio] = useState([
    { startup: "EduNova", industry: "EdTech", invested: "₹80 L", equity: "4.5%", valuation: "₹18 Cr", status: "Growing", statusColor: "text-green-400 bg-green-500/20" },
    { startup: "FinPath", industry: "FinTech", invested: "₹1.5 Cr", equity: "3.2%", valuation: "₹47 Cr", status: "Strong", statusColor: "text-green-400 bg-green-500/20" },
    { startup: "AgroSense", industry: "AgriTech", invested: "₹30 L", equity: "6%", valuation: "₹5 Cr", status: "Early", statusColor: "text-yellow-400 bg-yellow-500/20" },
    { startup: "LogiLink", industry: "Logistics", invested: "₹60 L", equity: "5%", valuation: "₹12 Cr", status: "Scaling", statusColor: "text-blue-400 bg-blue-500/20" },
    { startup: "GreenGrid", industry: "CleanTech", invested: "₹1.2 Cr", equity: "2.8%", valuation: "₹43 Cr", status: "Strong", statusColor: "text-green-400 bg-green-500/20" },
    { startup: "TalentForge", industry: "HRTech", invested: "₹20 L", equity: "8%", valuation: "₹2.5 Cr", status: "Watch", statusColor: "text-red-400 bg-red-500/20" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Portfolio</h2>
        <button onClick={() => toast.success("Portfolio report exported!")} className="px-4 py-2 bg-[#374151] text-gray-300 text-sm rounded-xl hover:bg-[#F97316]/20 hover:text-[#F97316] transition-all">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Invested" value="₹3.85 Cr" color="text-[#F97316]" />
        <StatCard label="Portfolio Value" value="₹12.7 Cr" change="↑ 230% unrealized" color="text-green-400" />
        <StatCard label="Companies" value="6" color="text-blue-400" />
        <StatCard label="Avg. Equity" value="4.9%" color="text-purple-400" />
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Startup", "Industry", "Invested", "Equity %", "Current Valuation", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {portfolio.map((row, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-semibold">{row.startup}</td>
                  <td className="py-3 px-4 text-gray-400">{row.industry}</td>
                  <td className="py-3 px-4 text-[#F97316] font-medium">{row.invested}</td>
                  <td className="py-3 px-4 text-gray-300">{row.equity}</td>
                  <td className="py-3 px-4 text-white font-medium">{row.valuation}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toast.success(`Viewing details for ${row.startup}`)} className="px-3 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-[#F97316]/20 hover:text-[#F97316] transition-all">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Portfolio Performance (₹ Cr)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={[
            { month: "Sep", value: 2.1 }, { month: "Oct", value: 2.8 }, { month: "Nov", value: 3.2 },
            { month: "Dec", value: 4.5 }, { month: "Jan", value: 5.8 }, { month: "Feb", value: 8.2 },
            { month: "Mar", value: 10.4 }, { month: "Apr", value: 12.7 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} formatter={(v) => [`₹${v} Cr`, "Portfolio Value"]} />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const InvestorInterestsSection: React.FC = () => {
  const [interests, setInterests] = useState([
    { startup: "HealthBridge", industry: "HealthTech", stage: "Seed", date: "Mar 10, 2025", status: "Pending" },
    { startup: "RetailAI", industry: "RetailTech", stage: "Seed", date: "Mar 7, 2025", status: "Connected" },
    { startup: "TalentForge", industry: "HRTech", stage: "Pre-Seed", date: "Mar 3, 2025", status: "Pending" },
    { startup: "GreenGrid", industry: "CleanTech", stage: "Series A", date: "Feb 25, 2025", status: "Connected" },
    { startup: "LogiLink", industry: "Logistics", stage: "Seed", date: "Feb 18, 2025", status: "In Discussion" },
    { startup: "AgroSense", industry: "AgriTech", stage: "Pre-Seed", date: "Feb 10, 2025", status: "Connected" },
  ]);

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    Connected: "bg-green-500/20 text-green-400",
    "In Discussion": "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Interests / Saved Startups</h2>
        <span className="px-3 py-1 bg-[#374151] text-gray-400 text-xs rounded-full">{interests.length} saved</span>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Startup", "Industry", "Stage", "Date of Interest", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {interests.map((row, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-semibold">{row.startup}</td>
                  <td className="py-3 px-4 text-gray-400">{row.industry}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#374151] text-gray-300">{row.stage}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{row.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[row.status]}`}>{row.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`Connecting with ${row.startup}!`)} className="px-2 py-1 bg-[#F97316]/20 text-[#F97316] text-xs rounded-lg hover:bg-[#F97316]/30 transition-all">Connect</button>
                      <button onClick={() => { setInterests((prev) => prev.filter((_, idx) => idx !== i)); toast("Removed from saved."); }} className="px-2 py-1 bg-[#374151] text-gray-400 text-xs rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InvestorMessagesSection: React.FC = () => {
  const [threads] = useState([
    { name: "Arjun Sharma", startup: "EduNova", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop", lastMsg: "Thank you for your interest! I'd love to set up a call to walk you through our traction.", time: "2h ago", unread: 2 },
    { name: "Priya Iyer", startup: "HealthBridge", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop", lastMsg: "We've just hit ₹1 Cr ARR — would love to share the updated deck.", time: "5h ago", unread: 0 },
    { name: "Rohan Das", startup: "AgroSense", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop", lastMsg: "Pilot results are in — 42% yield improvement across 200 farms.", time: "1d ago", unread: 1 },
  ]);
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState([
    { from: "founder", text: "Hi! Thank you so much for expressing interest in EduNova. We're really excited about the possibility of working with Bharat Ventures.", time: "10:15 AM" },
    { from: "investor", text: "Great to connect! I've been following EdTech closely. Can you share your latest deck and traction numbers?", time: "10:32 AM" },
    { from: "founder", text: "Absolutely! Attaching our deck here. We're at ₹45 L ARR, 4,200 active students, 45% MoM growth, and a 92% retention rate.", time: "10:48 AM" },
    { from: "investor", text: "Impressive metrics. What's your CAC and LTV breakdown by segment?", time: "11:05 AM" },
    { from: "founder", text: "Thank you for your interest! I'd love to set up a call to walk you through our traction.", time: "2h ago" },
  ]);
  const [newMsg, setNewMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages((prev) => [...prev, { from: "investor", text: newMsg, time: "Just now" }]);
    setNewMsg("");
    toast.success("Message sent!");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Messages</h2>
      <div className="grid lg:grid-cols-3 gap-4 h-[600px]">
        {/* Thread list */}
        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-y-auto">
          {threads.map((thread, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-full text-left p-4 border-b border-[#374151]/50 hover:bg-white/5 transition-all ${active === i ? "bg-[#F97316]/10 border-l-2 border-l-[#F97316]" : ""}`}>
              <div className="flex items-start gap-3">
                <img src={thread.avatar} alt={thread.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-white truncate">{thread.name}</p>
                    {thread.unread > 0 && <span className="w-5 h-5 bg-[#F97316] text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">{thread.unread}</span>}
                  </div>
                  <p className="text-xs text-[#F97316] mb-1">{thread.startup}</p>
                  <p className="text-xs text-gray-400 truncate">{thread.lastMsg}</p>
                  <p className="text-xs text-gray-600 mt-1">{thread.time}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Message window */}
        <div className="lg:col-span-2 bg-[#1F2937] border border-[#374151] rounded-2xl flex flex-col">
          <div className="p-4 border-b border-[#374151] flex items-center gap-3">
            <img src={threads[active].avatar} alt={threads[active].name} className="w-9 h-9 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-white">{threads[active].name}</p>
              <p className="text-xs text-[#F97316]">{threads[active].startup}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "investor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.from === "investor" ? "bg-[#F97316] text-white rounded-br-sm" : "bg-[#111827] text-gray-300 border border-[#374151] rounded-bl-sm"}`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === "investor" ? "text-white/60" : "text-gray-500"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-4 border-t border-[#374151] flex gap-3">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors"
            />
            <button type="submit" className="px-4 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ====== MENTOR SECTIONS ======
const MentorBookedSessionsSection: React.FC = () => {
  const sessions = [
    { founder: "Arjun Sharma", startup: "EduNova", topic: "Product-Market Fit", date: "Mar 15, 2025", time: "3:00 PM", duration: "60 min", fee: "₹5,000", status: "Confirmed" },
    { founder: "Priya Iyer", startup: "HealthBridge", topic: "Fundraising Strategy", date: "Mar 17, 2025", time: "11:00 AM", duration: "90 min", fee: "₹7,500", status: "Confirmed" },
    { founder: "Rohan Das", startup: "AgroSense", topic: "Go-to-Market Plan", date: "Mar 19, 2025", time: "2:00 PM", duration: "60 min", fee: "₹5,000", status: "Pending" },
    { founder: "Kavya Singh", startup: "RetailAI", topic: "Pitch Deck Review", date: "Mar 22, 2025", time: "4:30 PM", duration: "45 min", fee: "₹3,750", status: "Confirmed" },
    { founder: "Vikram Nair", startup: "LogiLink", topic: "B2B Sales Strategy", date: "Mar 25, 2025", time: "10:00 AM", duration: "60 min", fee: "₹5,000", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Booked Sessions</h2>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">3 Confirmed</span>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">2 Pending</span>
        </div>
      </div>

      <div className="space-y-3">
        {sessions.map((session, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 hover:border-[#F97316]/30 transition-all"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{session.founder}</p>
                  <p className="text-xs text-[#F97316] mb-1">{session.startup}</p>
                  <p className="text-xs text-gray-400">{session.topic}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-white">{session.date}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium text-white">{session.time}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium text-white">{session.duration}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Fee</p>
                  <p className="text-sm font-bold text-[#F97316]">{session.fee}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${session.status === "Confirmed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{session.status}</span>
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Joining session...") } className="px-4 py-2 bg-[#F97316] text-white text-xs font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Join</button>
                  <button onClick={() => toast("Session cancelled.")} className="px-4 py-2 bg-[#374151] text-gray-300 text-xs rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MentorReviewsSection: React.FC = () => {
  const reviews = [
    { founder: "Arjun Sharma", startup: "EduNova", rating: 5, text: "Rajesh's guidance on our GTM strategy was transformational. We went from 500 to 4,200 active users in 8 weeks after implementing his advice. Highly recommend!", date: "Mar 8, 2025" },
    { founder: "Priya Iyer", startup: "HealthBridge", rating: 5, text: "Outstanding session! His fundraising frameworks helped us structure our pitch narrative and we closed our seed round within 40 days. Incredible mentor.", date: "Feb 28, 2025" },
    { founder: "Rohan Das", startup: "AgroSense", rating: 4, text: "Very insightful session on product-market fit. Rajesh challenged our assumptions in a constructive way and helped us identify our true ICP. Would book again.", date: "Feb 20, 2025" },
    { founder: "Kavya Singh", startup: "RetailAI", rating: 5, text: "Best mentor session I've had on VenturIQ. He shared real-world examples from his time at Freshworks that were directly applicable to our situation. 5 stars!", date: "Feb 12, 2025" },
    { founder: "Vikram Nair", startup: "LogiLink", rating: 4, text: "Solid advice on B2B sales strategy. Practical frameworks that we immediately applied. Rajesh is generous with his knowledge and network.", date: "Feb 5, 2025" },
  ];
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <span className="text-xl font-bold text-yellow-400">{avgRating}</span>
          <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <span key={s} className="text-yellow-400 text-sm">★</span>)}</div>
          <span className="text-xs text-gray-400">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Reviews" value={`${reviews.length}`} color="text-white" />
        <StatCard label="Average Rating" value={`${avgRating}/5`} color="text-yellow-400" />
        <StatCard label="5-Star Reviews" value={`${reviews.filter(r => r.rating === 5).length}`} color="text-green-400" />
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-white">{review.founder}</p>
                <p className="text-xs text-[#F97316]">{review.startup}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <span key={s} className={`text-sm ${s <= review.rating ? "text-yellow-400" : "text-gray-600"}`}>★</span>)}</div>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{review.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MentorEarningsSection: React.FC = () => {
  const monthlyData = [
    { month: "Oct", sessions: 5, earnings: 28000 },
    { month: "Nov", sessions: 7, earnings: 35000 },
    { month: "Dec", sessions: 8, earnings: 42000 },
    { month: "Jan", sessions: 7, earnings: 38000 },
    { month: "Feb", sessions: 9, earnings: 45000 },
    { month: "Mar", sessions: 10, earnings: 52000 },
  ];
  const transactions = [
    { founder: "Arjun Sharma", topic: "Product Strategy", date: "Mar 15", amount: "₹5,000", status: "Paid" },
    { founder: "Priya Iyer", topic: "Fundraising Review", date: "Mar 12", amount: "₹7,500", status: "Paid" },
    { founder: "Rohan Das", topic: "GTM Planning", date: "Mar 8", amount: "₹5,000", status: "Pending" },
    { founder: "Kavya Singh", topic: "Pitch Deck Review", date: "Mar 3", amount: "₹3,750", status: "Paid" },
    { founder: "Vikram Nair", topic: "B2B Sales", date: "Feb 27", amount: "₹5,000", status: "Paid" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Earnings</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="This Month" value="₹52,000" change="↑ 15.5%" color="text-green-400" />
        <StatCard label="Total Earnings" value="₹3.92 L" color="text-[#F97316]" />
        <StatCard label="Sessions This Month" value="10" color="text-blue-400" />
        <StatCard label="Avg. per Session" value="₹5,200" color="text-purple-400" />
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
        <h3 className="font-semibold text-white mb-4">Monthly Earnings (₹)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
            <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} formatter={(v) => [`₹${Number(v).toLocaleString()}`, "Earnings"]} />
            <Bar dataKey="earnings" fill="#F97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-[#374151]">
          <h3 className="font-semibold text-white">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Founder", "Topic", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-medium">{tx.founder}</td>
                  <td className="py-3 px-4 text-gray-400">{tx.topic}</td>
                  <td className="py-3 px-4 text-gray-400">{tx.date}</td>
                  <td className="py-3 px-4 text-[#F97316] font-semibold">{tx.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${tx.status === "Paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ====== ADMIN SECTIONS ======
const AdminBlogManagementSection: React.FC = () => {
  const [posts, setPosts] = useState([
    { id: "b1", title: "How AI is Revolutionizing Startup Idea Validation in 2025", author: "Priya Mehta", category: "AI & Technology", status: "Published", date: "Mar 5, 2025" },
    { id: "b2", title: "The Complete Guide to Raising Your Seed Round in India", author: "Rahul Gupta", category: "Fundraising", status: "Published", date: "Feb 28, 2025" },
    { id: "b3", title: "10 Metrics Every Investor Looks for Before Writing a Check", author: "Ananya Singh", category: "Investor Relations", status: "Published", date: "Feb 20, 2025" },
    { id: "b4", title: "Building a Product That Sells Itself: PLG Strategies", author: "Kiran Patel", category: "Product", status: "Draft", date: "Feb 15, 2025" },
    { id: "b5", title: "Why 90% of Indian Startups Fail to Get to Series A", author: "Vikram Nair", category: "Startup Advice", status: "Published", date: "Feb 8, 2025" },
    { id: "b6", title: "The Founder's Guide to Building a Rockstar Early Team", author: "Meera Krishnan", category: "Team Building", status: "Draft", date: "Jan 30, 2025" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", category: "AI & Technology", status: "Draft" });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setPosts((prev) => [...prev, { id: `b${Date.now()}`, ...form, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) }]);
    setForm({ title: "", author: "", category: "AI & Technology", status: "Draft" });
    setShowForm(false);
    toast.success("Blog post created!");
  };

  const toggleStatus = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, status: p.status === "Published" ? "Draft" : "Published" } : p));
    toast.success("Post status updated!");
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Post deleted.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Create New Post</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Post Title</label>
                <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Enter post title..." className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Author</label>
                <input required value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} placeholder="Author name..." className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors">
                  {["AI & Technology", "Fundraising", "Investor Relations", "Product", "Startup Advice", "Team Building"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Status</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#F97316] transition-colors">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
              </div>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Create Post</button>
          </form>
        </motion.div>
      )}

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Title", "Author", "Category", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-medium max-w-xs"><p className="truncate">{post.title}</p></td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{post.author}</td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{post.category}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleStatus(post.id)} className={`px-2 py-0.5 text-xs rounded-full font-medium transition-all hover:opacity-80 ${post.status === "Published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{post.status}</button>
                  </td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{post.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => toast.success("Opening editor...")} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all">Edit</button>
                      <button onClick={() => deletePost(post.id)} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminManageInvestorsSection: React.FC = () => {
  const [investors, setInvestors] = useState([
    { name: "Vikram Mehta", email: "vikram@bharatventures.com", fund: "Bharat Ventures", focus: "FinTech / EdTech", status: "Active" },
    { name: "Ananya Krishnan", email: "ananya@deeptech.vc", fund: "DeepTech Capital", focus: "AI/ML / SaaS", status: "Active" },
    { name: "Rohit Singhania", email: "rohit@greenfuture.vc", fund: "GreenFuture Fund", focus: "CleanTech / AgriTech", status: "Active" },
    { name: "Meera Pillai", email: "meera@consumeralpha.in", fund: "Consumer Alpha", focus: "D2C / FMCG", status: "Pending" },
    { name: "Sanjay Gupta", email: "sanjay@healthfirst.vc", fund: "HealthFirst Ventures", focus: "HealthTech / BioTech", status: "Active" },
    { name: "Kavya Nair", email: "kavya@digitalindia.fund", fund: "Digital India Fund", focus: "SaaS / Marketplace", status: "Suspended" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Investors</h2>
        <button onClick={() => toast.success("Export initiated!")} className="px-4 py-2 bg-[#374151] text-gray-300 text-sm rounded-xl hover:bg-[#F97316]/20 hover:text-[#F97316] transition-all">Export CSV</button>
      </div>
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Name", "Email", "Fund Name", "Focus Area", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investors.map((inv, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-semibold whitespace-nowrap">{inv.name}</td>
                  <td className="py-3 px-4 text-gray-400">{inv.email}</td>
                  <td className="py-3 px-4 text-gray-300 whitespace-nowrap">{inv.fund}</td>
                  <td className="py-3 px-4 text-gray-400">{inv.focus}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${inv.status === "Active" ? "bg-green-500/20 text-green-400" : inv.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{inv.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setInvestors((prev) => prev.map((x, idx) => idx === i ? { ...x, status: x.status === "Active" ? "Suspended" : "Active" } : x)); toast.success("Status updated!"); }} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-all">
                        {inv.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button onClick={() => { setInvestors((prev) => prev.filter((_, idx) => idx !== i)); toast.success("Investor removed."); }} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminManageMentorsSection: React.FC = () => {
  const [mentors, setMentors] = useState([
    { name: "Rajesh Iyer", email: "rajesh@mentors.com", expertise: "Product Strategy", fee: "₹5,000/hr", rating: "4.9", status: "Active" },
    { name: "Sunita Rao", email: "sunita@mentors.com", expertise: "Fundraising", fee: "₹7,500/hr", rating: "4.8", status: "Active" },
    { name: "Amit Joshi", email: "amit@mentors.com", expertise: "Growth Hacking", fee: "₹3,500/hr", rating: "4.7", status: "Active" },
    { name: "Divya Menon", email: "divya@mentors.com", expertise: "Legal & Compliance", fee: "₹6,000/hr", rating: "4.9", status: "Pending" },
    { name: "Prakash Nambiar", email: "prakash@mentors.com", expertise: "Engineering Leadership", fee: "₹4,000/hr", rating: "4.6", status: "Active" },
    { name: "Nandita Shah", email: "nandita@mentors.com", expertise: "Brand Building", fee: "₹4,500/hr", rating: "4.8", status: "Suspended" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Mentors</h2>
        <button onClick={() => toast.success("Export initiated!")} className="px-4 py-2 bg-[#374151] text-gray-300 text-sm rounded-xl hover:bg-[#F97316]/20 hover:text-[#F97316] transition-all">Export CSV</button>
      </div>
      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Name", "Email", "Expertise", "Session Fee", "Rating", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-semibold whitespace-nowrap">{mentor.name}</td>
                  <td className="py-3 px-4 text-gray-400">{mentor.email}</td>
                  <td className="py-3 px-4 text-gray-300 whitespace-nowrap">{mentor.expertise}</td>
                  <td className="py-3 px-4 text-[#F97316] font-medium whitespace-nowrap">{mentor.fee}</td>
                  <td className="py-3 px-4"><span className="text-yellow-400 font-semibold">★ {mentor.rating}</span></td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${mentor.status === "Active" ? "bg-green-500/20 text-green-400" : mentor.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>{mentor.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setMentors((prev) => prev.map((x, idx) => idx === i ? { ...x, status: x.status === "Active" ? "Suspended" : "Active" } : x)); toast.success("Status updated!"); }} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition-all">
                        {mentor.status === "Active" ? "Suspend" : "Activate"}
                      </button>
                      <button onClick={() => { setMentors((prev) => prev.filter((_, idx) => idx !== i)); toast.success("Mentor removed."); }} className="px-2 py-1 bg-[#374151] text-gray-300 text-xs rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminFundingActivitySection: React.FC = () => {
  const activities = [
    { startup: "EduNova", founder: "Arjun Sharma", amount: "₹12 Cr", equity: "18%", investor: "Bharat Ventures", status: "Completed", date: "Mar 5, 2025" },
    { startup: "FinPath", founder: "Meena Verma", amount: "₹48 Cr", equity: "15%", investor: "DeepTech Capital", status: "Completed", date: "Feb 20, 2025" },
    { startup: "AgroSense", founder: "Rohan Das", amount: "₹1.2 Cr", equity: "12%", investor: "GreenFuture Fund", status: "In Progress", date: "Feb 14, 2025" },
    { startup: "GreenGrid", founder: "Sita Rao", amount: "₹18 Cr", equity: "20%", investor: "Consumer Alpha", status: "Completed", date: "Feb 1, 2025" },
    { startup: "HealthBridge", founder: "Priya Iyer", amount: "₹3.5 Cr", equity: "14%", investor: "HealthFirst Ventures", status: "In Progress", date: "Jan 25, 2025" },
    { startup: "LogiLink", founder: "Karan Mehta", amount: "₹5 Cr", equity: "16%", investor: "Digital India Fund", status: "Pending", date: "Jan 18, 2025" },
    { startup: "TalentForge", founder: "Anjali Kumar", amount: "₹75 L", equity: "10%", investor: "Angel Network", status: "Completed", date: "Jan 10, 2025" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Funding Activity</h2>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">4 Completed</span>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full font-medium">2 In Progress</span>
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full font-medium">1 Pending</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Funded This Month" value="₹88.7 Cr" color="text-[#F97316]" />
        <StatCard label="Deals Closed" value="4" color="text-green-400" />
        <StatCard label="Avg. Deal Size" value="₹12.5 Cr" color="text-blue-400" />
      </div>

      <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#374151] bg-[#111827]">
              <tr>
                {["Startup", "Founder", "Amount", "Equity %", "Investor", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.map((act, i) => (
                <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5 transition-all">
                  <td className="py-3 px-4 text-white font-semibold whitespace-nowrap">{act.startup}</td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{act.founder}</td>
                  <td className="py-3 px-4 text-[#F97316] font-bold whitespace-nowrap">{act.amount}</td>
                  <td className="py-3 px-4 text-gray-300">{act.equity}</td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{act.investor}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${act.status === "Completed" ? "bg-green-500/20 text-green-400" : act.status === "In Progress" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}>{act.status}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminReportsSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Platform Reports</h2>
        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
          <FileText className="w-4 h-4" />
          Export PDF Report
        </button>
      </div>

      <div className="print-area">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Users" value="5,842" change="↑ 234 this week" color="text-blue-400" />
          <StatCard label="Total Startups" value="2,541" change="↑ 48 this week" color="text-green-400" />
          <StatCard label="Total Funding Facilitated" value="₹150 Cr+" change="↑ ₹12 Cr this month" color="text-[#F97316]" />
          <StatCard label="Active Mentors" value="320" change="↑ 15 new" color="text-purple-400" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Investor Accounts", value: "800+", icon: "💼" },
            { label: "Mentor Sessions Booked", value: "4,200+", icon: "🎓" },
            { label: "Avg. Funding Round", value: "₹8.5 Cr", icon: "📈" },
            { label: "Community Posts", value: "1,200+", icon: "💬" },
            { label: "Idea Validations Run", value: "18,500+", icon: "💡" },
            { label: "Successful Exits", value: "12", icon: "🏆" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{icon}</span>
                <p className="text-sm text-gray-400">{label}</p>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 mb-6">
          <h3 className="font-semibold text-white mb-4">Monthly Platform Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={USER_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="users" fill="#F97316" radius={[4, 4, 0, 0]} name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
          <h3 className="font-semibold text-white mb-4">Sector Distribution of Startups</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { sector: "EdTech", count: 482, pct: 19 },
              { sector: "HealthTech", count: 356, pct: 14 },
              { sector: "FinTech", count: 425, pct: 17 },
              { sector: "AgriTech", count: 289, pct: 11 },
              { sector: "CleanTech", count: 198, pct: 8 },
              { sector: "Others", count: 791, pct: 31 },
            ].map(({ sector, count, pct }) => (
              <div key={sector} className="bg-[#111827] rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">{sector}</p>
                <p className="text-lg font-bold text-white">{count}</p>
                <div className="h-1.5 bg-[#374151] rounded-full mt-2"><div className="h-full bg-[#F97316] rounded-full" style={{ width: `${pct}%` }} /></div>
                <p className="text-xs text-gray-500 mt-1">{pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====== MAIN DASHBOARD ======
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");

  if (!user) return null;

  const getSidebar = () => {
    switch (user.role) {
      case "investor": return INVESTOR_SIDEBAR;
      case "mentor": return MENTOR_SIDEBAR;
      case "admin": return ADMIN_SIDEBAR;
      default: return FOUNDER_SIDEBAR;
    }
  };

  const renderContent = () => {
    switch (user.role) {
      case "investor":
        if (activeTab === "overview") return <InvestorOverview />;
        if (activeTab === "settings") return <SettingsSection user={user} />;
        if (activeTab === "discover") return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Discover Startups</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
                  <h4 className="font-bold text-white mb-1">Startup {i + 1}</h4>
                  <p className="text-xs text-gray-400 mb-3">AI-powered solution for India...</p>
                  <button onClick={() => toast.success("Interest expressed!")} className="px-4 py-2 bg-[#F97316] text-white text-xs font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">
                    Express Interest
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
        if (activeTab === "portfolio") return <InvestorPortfolioSection />;
        if (activeTab === "interests") return <InvestorInterestsSection />;
        if (activeTab === "messages") return <InvestorMessagesSection />;
        return <div className="text-gray-400 p-6">This section is under development.</div>;

      case "mentor":
        if (activeTab === "overview") return <MentorOverview />;
        if (activeTab === "settings") return <SettingsSection user={user} />;
        if (activeTab === "requests") return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Session Requests</h2>
            {["Arjun Sharma — Product Strategy (Mar 15)", "Priya Iyer — Fundraising Review (Mar 18)", "Rohan Das — Go-to-Market (Mar 22)"].map((req, i) => (
              <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 flex items-center justify-between">
                <span className="text-gray-300 text-sm">{req}</span>
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Session accepted!")} className="px-3 py-1.5 bg-green-500/20 text-green-400 text-xs rounded-xl hover:bg-green-500/30 transition-all">Accept</button>
                  <button onClick={() => toast("Session declined.")} className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs rounded-xl hover:bg-red-500/30 transition-all">Decline</button>
                </div>
              </div>
            ))}
          </div>
        );
        if (activeTab === "sessions") return <MentorBookedSessionsSection />;
        if (activeTab === "reviews") return <MentorReviewsSection />;
        if (activeTab === "earnings") return <MentorEarningsSection />;
        return <div className="text-gray-400 p-6">This section is under development.</div>;

      case "admin":
        if (activeTab === "overview") return <AdminOverview />;
        if (activeTab === "users") return <ManageUsersSection />;
        if (activeTab === "settings") return <SettingsSection user={user} />;
        if (activeTab === "analytics") return <AnalyticsSection />;
        if (activeTab === "startups") return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Manage Startups</h2>
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b border-[#374151] bg-[#111827]">
                  <tr>
                    {["Startup", "Founder", "Industry", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["EduNova — Arjun Sharma — EdTech — Pending", "HealthBridge — Priya Iyer — HealthTech — Approved", "AgroSense — Rohan Das — AgriTech — Pending"].map((row, i) => {
                    const [name, founder, industry, status] = row.split(" — ");
                    return (
                      <tr key={i} className="border-b border-[#374151]/50 hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-medium">{name}</td>
                        <td className="py-3 px-4 text-gray-400">{founder}</td>
                        <td className="py-3 px-4 text-gray-400">{industry}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${status === "Approved" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{status}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button onClick={() => toast.success("Startup approved!")} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-lg hover:bg-green-500/30 transition-all">Approve</button>
                            <button onClick={() => toast("Startup rejected.")} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg hover:bg-red-500/30 transition-all">Reject</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
        if (activeTab === "investors") return <AdminManageInvestorsSection />;
        if (activeTab === "mentors") return <AdminManageMentorsSection />;
        if (activeTab === "blog") return <AdminBlogManagementSection />;
        if (activeTab === "funding") return <AdminFundingActivitySection />;
        if (activeTab === "reports") return <AdminReportsSection />;
        return <div className="text-gray-400 p-6">This section is under development.</div>;

      default: // founder
        switch (activeTab) {
          case "overview": return <FounderOverview user={user} />;
          case "startup-profile": return <StartupProfileSection />;
          case "idea-validator": return <IdeaValidatorSection />;
          case "business-plan": return <BusinessPlanSection />;
          case "fundraising": return <FundraisingSection />;
          case "analytics": return <AnalyticsSection />;
          case "notifications": return <NotificationsSection />;
          case "settings": return <SettingsSection user={user} />;
          case "investors": return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Investor Connections</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {MOCK_INVESTORS_LIST.map((inv, i) => (
                  <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-bold text-white">{inv.name}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${inv.status === "Interested" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>{inv.status}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{inv.fund} • {inv.focus}</p>
                    <button onClick={() => toast.success(`Message sent to ${inv.name}!`)} className="px-4 py-1.5 bg-[#F97316] text-white text-xs font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Message</button>
                  </div>
                ))}
              </div>
            </div>
          );
          case "mentors": return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Mentors</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {["Rajesh Iyer — Product Strategy", "Sunita Rao — Fundraising", "Amit Joshi — Growth Hacking"].map((m, i) => {
                  const [name, exp] = m.split(" — ");
                  return (
                    <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{name}</p>
                        <p className="text-xs text-gray-400">{exp}</p>
                      </div>
                      <button onClick={() => toast.success(`Session booked with ${name}!`)} className="px-4 py-2 bg-[#F97316] text-white text-xs font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Book Session</button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
          case "community": return (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-4">Access the full community forum</p>
              <NavLink to="/community" className="px-6 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all">Go to Community</NavLink>
            </div>
          );
          default: return <div className="text-gray-400 p-6">This section is under development.</div>;
        }
    }
  };

  const sidebarItems = getSidebar();

  return (
    <div className="min-h-screen bg-[#0A0E1A] flex pt-16">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 flex flex-col bg-[#0D1117] border-r border-[#374151]/50 transition-all duration-300 ${
          sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-60"
        }`}
      >
        {/* Logo */}
        <div className="px-4 py-3 border-b border-[#374151]/50">
          <VenturIQLogo width={150} height={44} />
        </div>

        {/* User info */}
        <div className="p-4 border-b border-[#374151]/50">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=F97316&color=fff`}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user.name}</p>
              <span className="px-2 py-0.5 bg-[#F97316]/20 text-[#F97316] text-xs rounded-full capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          {sidebarItems.map(({ icon: Icon, label, tab }) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
              className={`sidebar-item w-full text-left mb-1 ${activeTab === tab ? "active" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-[#374151]/50">
          <button
            onClick={() => { logout(); navigate("/"); toast.success("Logged out!"); }}
            className="sidebar-item w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-60 min-h-[calc(100vh-4rem)]">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#374151]/50 bg-[#0D1117]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-semibold text-white capitalize">
            {sidebarItems.find((s) => s.tab === activeTab)?.label || "Dashboard"}
          </span>
        </div>

        <div className="p-6 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
