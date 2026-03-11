import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Plus, Search, TrendingUp, Hash, X } from "lucide-react";
import { COMMUNITY_POSTS } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TABS = ["All", "Startup Advice", "Fundraising", "Product Feedback"];
const TRENDING_TOPICS = ["Fundraising Tips", "Product Market Fit", "Co-founder Equity", "Series A Checklist", "MVP Building", "Investor Pitch"];

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState({ title: "", content: "", tags: "" });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = COMMUNITY_POSTS.filter((p) => {
    const matchTab = activeTab === "All" || p.category === activeTab;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleAsk = () => {
    if (!isAuthenticated) { navigate("/register"); return; }
    setShowModal(true);
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setQuestion({ title: "", content: "", tags: "" });
    toast.success("Your question has been posted to the community!");
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/15 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-4">
              💬 Community Forum
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Founders <span className="text-gradient">Helping Founders</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Join 5,000+ founders sharing knowledge, advice, and support in India's most active startup community.
            </p>
            <button
              onClick={handleAsk}
              className="px-8 py-3.5 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Ask a Question
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search & Tabs */}
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1F2937] border border-[#374151] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-[#F97316] text-white" : "bg-[#1F2937] text-gray-400 border border-[#374151] hover:text-white"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 hover:border-[#F97316]/30 transition-all cursor-pointer"
                  onClick={() => {
                    if (!isAuthenticated) navigate("/register");
                  }}
                >
                  <div className="flex items-start gap-4">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-2 hover:text-[#F97316] transition-colors">{post.title}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-gray-400">{post.author}</span>
                        <span className="text-xs text-gray-600">•</span>
                        <span className="text-xs text-gray-500">{post.time}</span>
                        <span className="px-2 py-0.5 bg-[#374151] text-gray-400 text-xs rounded-full">{post.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-[#F97316]/10 text-[#F97316] text-xs rounded-full">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.replies} replies
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
                <span className="font-semibold text-white text-sm">Trending Topics</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#374151] hover:bg-[#F97316]/20 hover:text-[#F97316] text-gray-300 text-xs rounded-lg transition-all"
                  >
                    <Hash className="w-3 h-3" />
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F97316]/20 to-orange-700/10 border border-[#F97316]/30 rounded-2xl p-5">
              <h4 className="font-semibold text-white mb-2 text-sm">Join the Community</h4>
              <p className="text-xs text-gray-400 mb-4">5,000+ founders actively discussing. Join for free.</p>
              <button
                onClick={handleAsk}
                className="w-full py-2.5 bg-[#F97316] text-white text-sm font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
              >
                Ask Your First Question
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-white">Ask the Community</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Question Title</label>
                <input
                  type="text"
                  placeholder="What's your question?"
                  value={question.title}
                  onChange={(e) => setQuestion((q) => ({ ...q, title: e.target.value }))}
                  required
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Details</label>
                <textarea
                  placeholder="Provide more context..."
                  value={question.content}
                  onChange={(e) => setQuestion((q) => ({ ...q, content: e.target.value }))}
                  rows={4}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., Fundraising, MVP, Growth"
                  value={question.tags}
                  onChange={(e) => setQuestion((q) => ({ ...q, tags: e.target.value }))}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-[#374151] text-gray-300 rounded-xl hover:bg-white/5 transition-all text-sm">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all text-sm">
                  Post Question
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Community;
