import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Users, TrendingUp, Calendar, Globe,
  CheckCircle, Share2, ExternalLink, DollarSign
} from "lucide-react";
import { STARTUPS } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const TEAM_MEMBERS = [
  { name: "Arjun Sharma", role: "CEO & Co-Founder", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { name: "Priya Iyer", role: "CTO & Co-Founder", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop" },
  { name: "Rohan Mehta", role: "CPO", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
];

const StartupDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const startup = STARTUPS.find((s) => s.id === id);

  if (!startup) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Startup not found</h2>
          <Link to="/startups" className="text-[#F97316] hover:underline">← Back to Startups</Link>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    toast.success(`Connection request sent to ${startup.name}!`);
  };

  const handleInvestInterest = () => {
    if (!isAuthenticated) {
      navigate("/register");
      return;
    }
    toast.success(`Investment interest registered for ${startup.name}!`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Cover */}
      <div className="relative h-64 sm:h-80">
        <img
          src={`https://images.unsplash.com/photo-${1559136555 + STARTUPS.indexOf(startup)}?w=1600&h=600&fit=crop`}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=600&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent" />

        <button
          onClick={() => navigate("/startups")}
          className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-sm text-white text-sm rounded-lg border border-white/20 hover:bg-black/60 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <button
          onClick={handleShare}
          className="absolute top-6 right-6 p-2 bg-black/40 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-black/60 transition-all"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Logo & Header */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-20 h-20 rounded-2xl border-4 border-[#0A0E1A] object-cover shadow-xl"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{startup.name}</h1>
              <p className="text-gray-400">{startup.tagline}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-[#F97316]/15 text-[#F97316] text-sm rounded-full font-medium">{startup.industry}</span>
                <span className="px-3 py-1 bg-blue-500/15 text-blue-400 text-sm rounded-full">{startup.fundingStage}</span>
                <div className="flex items-center gap-1 px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-full">
                  <MapPin className="w-3 h-3" />
                  {startup.location}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConnect}
                className="px-5 py-2.5 border border-[#F97316] text-[#F97316] font-semibold rounded-xl hover:bg-[#F97316] hover:text-white transition-all text-sm"
              >
                Connect
              </button>
              <button
                onClick={handleInvestInterest}
                className="px-5 py-2.5 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all text-sm"
              >
                Express Interest
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed">{startup.description}</p>
                <p className="text-gray-400 leading-relaxed mt-4">
                  Founded in {startup.founded || "2022"}, {startup.name} is on a mission to solve one of India's most pressing challenges using technology, data, and a passionate team. The company has demonstrated strong product-market fit with consistent month-over-month growth and a growing customer base.
                </p>
              </div>

              {/* Traction */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Traction Metrics</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "ARR", value: startup.revenue || "₹2.5 Cr", color: "text-green-400" },
                    { label: "MoM Growth", value: startup.growth || "38%", color: "text-[#F97316]" },
                    { label: "Team Size", value: `${startup.teamSize} people`, color: "text-blue-400" },
                    { label: "Founded", value: startup.founded || "2022", color: "text-purple-400" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="text-center bg-[#111827] rounded-xl p-4 border border-[#374151]/50">
                      <p className="text-xs text-gray-500 mb-2">{label}</p>
                      <p className={`text-lg font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Team</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.name} className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-semibold text-white text-sm">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Details */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Funding Details</h3>
                <div className="space-y-3">
                  {[
                    { icon: DollarSign, label: "Total Raised", value: startup.funding, color: "text-green-400" },
                    { icon: TrendingUp, label: "Current Stage", value: startup.fundingStage, color: "text-blue-400" },
                    { icon: Users, label: "Team Size", value: `${startup.teamSize} members`, color: "text-purple-400" },
                    { icon: Calendar, label: "Founded", value: startup.founded || "2022", color: "text-gray-300" },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Icon className="w-4 h-4" />
                        {label}
                      </div>
                      <span className={`text-sm font-semibold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Highlights</h3>
                <div className="space-y-3">
                  {[
                    "Strong product-market fit",
                    "Experienced founding team",
                    "Scalable technology platform",
                    "Growing YoY revenue",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#F97316]/20 to-orange-700/10 border border-[#F97316]/30 rounded-2xl p-6 text-center">
                <p className="text-white font-semibold mb-2">Interested in investing?</p>
                <p className="text-gray-400 text-xs mb-4">Connect with the founding team and learn more.</p>
                <button
                  onClick={handleInvestInterest}
                  className="w-full py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
                >
                  Express Investment Interest
                </button>
                <button
                  onClick={() => window.open("#", "_blank")}
                  className="w-full mt-2 py-2.5 border border-[#374151] text-gray-300 text-sm font-medium rounded-xl hover:border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Visit Website
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StartupDetail;
