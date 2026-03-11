import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Clock, Award, Filter } from "lucide-react";
import { MENTORS } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const EXPERTISE_OPTIONS = ["All", "Product Strategy", "Fundraising", "Growth Hacking", "Legal & Compliance", "Engineering Leadership", "Brand Building"];
const PRICE_RANGES = ["All", "Under ₹4,000", "₹4,000 - ₹6,000", "Above ₹6,000"];

const Mentors: React.FC = () => {
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [bookingMentor, setBookingMentor] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = MENTORS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()));
    const matchExpertise = expertise === "All" || m.expertise.some((e) => e.includes(expertise));
    const matchRating = m.rating >= minRating;
    const matchPrice =
      priceRange === "All" ||
      (priceRange === "Under ₹4,000" && m.feePerHour < 4000) ||
      (priceRange === "₹4,000 - ₹6,000" && m.feePerHour >= 4000 && m.feePerHour <= 6000) ||
      (priceRange === "Above ₹6,000" && m.feePerHour > 6000);
    return matchSearch && matchExpertise && matchRating && matchPrice;
  });

  const handleBook = (mentorId: string, mentorName: string) => {
    if (!isAuthenticated) { navigate("/register"); return; }
    setBookingMentor(mentorId);
    setTimeout(() => {
      setBookingMentor(null);
      toast.success(`Session booking request sent to ${mentorName}!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/15 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-4">
              🎓 Mentor Marketplace
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Learn from <span className="text-gradient">India's Best</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Book 1-on-1 sessions with 300+ industry experts. Get advice on fundraising, product, growth, and more.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or expertise..."
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

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Expertise</label>
                <div className="space-y-1">
                  {EXPERTISE_OPTIONS.map((opt) => (
                    <button key={opt} onClick={() => setExpertise(opt)} className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${expertise === opt ? "bg-[#F97316]/20 text-[#F97316] font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Price Range</label>
                <div className="space-y-1">
                  {PRICE_RANGES.map((opt) => (
                    <button key={opt} onClick={() => setPriceRange(opt)} className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${priceRange === opt ? "bg-[#F97316]/20 text-[#F97316] font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Min Rating</label>
                <div className="flex gap-1">
                  {[0, 4, 4.5, 4.8].map((r) => (
                    <button key={r} onClick={() => setMinRating(r)} className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${minRating === r ? "bg-[#F97316]/20 text-[#F97316]" : "text-gray-400 hover:text-white bg-white/5"}`}>
                      {r === 0 ? "All" : `${r}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Mentors Grid */}
          <div className="flex-1">
            <p className="text-gray-400 text-sm mb-6">
              Showing <span className="text-white font-medium">{filtered.length}</span> mentors
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((mentor, i) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 hover:border-[#F97316]/40 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img src={mentor.photo} alt={mentor.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white">{mentor.name}</h3>
                      <p className="text-sm text-[#F97316]">{mentor.company}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < Math.floor(mentor.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">{mentor.rating} ({mentor.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{mentor.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.expertise.slice(0, 2).map((exp) => (
                      <span key={exp} className="px-2 py-0.5 bg-[#374151] text-gray-300 text-xs rounded-full">{exp}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {mentor.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ₹{mentor.feePerHour.toLocaleString()}/hr
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(mentor.id, mentor.name)}
                    disabled={bookingMentor === mentor.id}
                    className="w-full py-2.5 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {bookingMentor === mentor.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Book Session"
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;
