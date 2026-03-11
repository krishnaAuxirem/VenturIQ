import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Briefcase, CheckCircle } from "lucide-react";
import { INVESTORS } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const INVESTMENT_STAGES = ["All", "Pre-Seed", "Seed", "Series A", "Series B"];
const LOCATIONS = ["All", "Mumbai", "Bengaluru", "Delhi", "Hyderabad", "Chennai"];
const FOCUS_AREAS = ["All", "EdTech", "HealthTech", "FinTech", "AgriTech", "CleanTech", "D2C", "SaaS"];

const Investors: React.FC = () => {
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [location, setLocation] = useState("All");
  const [focus, setFocus] = useState("All");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = INVESTORS.filter((inv) => {
    const matchSearch =
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.fundName.toLowerCase().includes(search.toLowerCase());
    const matchStage = stage === "All" || inv.stage.includes(stage);
    const matchLoc = location === "All" || inv.location === location;
    const matchFocus = focus === "All" || inv.focusAreas.some((f) => f.includes(focus));
    return matchSearch && matchStage && matchLoc && matchFocus;
  });

  const handleConnect = (name: string) => {
    if (!isAuthenticated) { navigate("/register"); return; }
    toast.success(`Connection request sent to ${name}!`);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560472355-536de3962603?w=1600&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/15 border border-blue-500/30 rounded-full text-sm text-blue-400 mb-4">
              💼 Investor Network
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Connect with <span className="text-gradient">Top Investors</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              800+ active investors looking for their next portfolio company. Find the right fit for your startup.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search investors by name or fund..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-56 flex-shrink-0">
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-white">Filters</span>
              </div>

              {[
                { label: "Investment Stage", options: INVESTMENT_STAGES, value: stage, setter: setStage },
                { label: "Location", options: LOCATIONS, value: location, setter: setLocation },
                { label: "Focus Area", options: FOCUS_AREAS, value: focus, setter: setFocus },
              ].map(({ label, options, value, setter }) => (
                <div key={label} className="mb-5">
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">{label}</label>
                  <div className="space-y-1">
                    {options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setter(opt)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${value === opt ? "bg-[#F97316]/20 text-[#F97316] font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-6">
              Showing <span className="text-white font-medium">{filtered.length}</span> investors
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((investor, i) => (
                <motion.div
                  key={investor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img src={investor.photo} alt={investor.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white">{investor.name}</h3>
                      <p className="text-sm text-[#F97316]">{investor.fundName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-400">{investor.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {investor.focusAreas.map((area) => (
                      <span key={area} className="px-2 py-0.5 bg-[#374151] text-gray-300 text-xs rounded-full">{area}</span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {investor.stage.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-blue-500/15 text-blue-400 text-xs rounded-full">{s}</span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{investor.bio}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Ticket Size</p>
                      <p className="text-xs font-semibold text-white">{investor.minTicket} – {investor.maxTicket}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Portfolio</p>
                      <p className="text-xs font-semibold text-white">{investor.portfolioCount} companies</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleConnect(investor.name)}
                      className="py-2.5 bg-[#F97316] text-white text-xs font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
                    >
                      Connect
                    </button>
                    <Link
                      to="/register"
                      className="py-2.5 border border-[#374151] text-gray-300 text-xs font-medium text-center rounded-xl hover:border-white/20 hover:text-white transition-all"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;
