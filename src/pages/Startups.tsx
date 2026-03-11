import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Users, TrendingUp, ChevronRight } from "lucide-react";
import { STARTUPS, INDUSTRIES, FUNDING_STAGES } from "@/data/mockData";

const Startups: React.FC = () => {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [stage, setStage] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = STARTUPS.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === "All" || s.industry === industry;
    const matchStage = stage === "All" || s.fundingStage === stage;
    return matchSearch && matchIndustry && matchStage;
  });

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero Header */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A0E1A 0%, #111827 100%)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=600&fit=crop"
            alt="Startups"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316]/15 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] mb-4">
              🚀 Startup Directory
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Discover India's <span className="text-gradient">Best Startups</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Browse 2,500+ startups across every industry and stage. Find your next investment or partner.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search startups by name or tagline..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-56 flex-shrink-0"
          >
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <Filter className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-white">Filters</span>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Industry</label>
                <div className="space-y-1 max-h-52 overflow-y-auto scrollbar-hide">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        industry === ind
                          ? "bg-[#F97316]/20 text-[#F97316] font-medium"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Funding Stage</label>
                <div className="space-y-1">
                  {FUNDING_STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStage(s)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        stage === s
                          ? "bg-[#F97316]/20 text-[#F97316] font-medium"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setIndustry("All"); setStage("All"); setSearch(""); }}
                className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white border border-[#374151] rounded-lg hover:border-white/20 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </motion.aside>

          {/* Startup Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">
                Showing <span className="text-white font-medium">{Math.min(paginated.length, filtered.length)}</span> of{" "}
                <span className="text-white font-medium">{filtered.length}</span> startups
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">No startups found matching your filters</p>
                <button
                  onClick={() => { setIndustry("All"); setStage("All"); setSearch(""); }}
                  className="text-[#F97316] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginated.map((startup, i) => (
                    <motion.div
                      key={startup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <img
                          src={startup.logo}
                          alt={startup.name}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate group-hover:text-[#F97316] transition-colors">
                            {startup.name}
                          </h3>
                          <p className="text-xs text-gray-400 truncate">{startup.tagline}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-0.5 bg-[#F97316]/15 text-[#F97316] text-xs rounded-lg font-medium">
                          {startup.industry}
                        </span>
                        <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 text-xs rounded-lg">
                          {startup.fundingStage}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {startup.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Funding</p>
                          <p className="text-xs font-bold text-green-400">{startup.funding}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-gray-500" />
                            <p className="text-xs text-gray-400">{startup.location}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="w-2.5 h-2.5 text-gray-500" />
                            <p className="text-xs text-gray-400">{startup.teamSize} members</p>
                          </div>
                        </div>
                      </div>

                      {startup.growth && (
                        <div className="flex items-center gap-1 mb-4">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400 font-medium">{startup.growth} growth</span>
                        </div>
                      )}

                      <Link
                        to={`/startups/${startup.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
                      >
                        View Profile <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="px-8 py-3 border border-[#374151] text-white rounded-xl hover:border-[#F97316] hover:text-[#F97316] transition-all"
                    >
                      Load More Startups
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startups;
