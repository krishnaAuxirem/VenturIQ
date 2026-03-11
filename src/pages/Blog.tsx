import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, Tag, ChevronRight, ArrowLeft } from "lucide-react";
import { BLOG_POSTS } from "@/data/mockData";

const CATEGORIES = ["All", "AI & Technology", "Fundraising", "Investor Relations", "Product", "Startup Advice", "Team Building"];

const Blog: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = BLOG_POSTS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1600&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316]/15 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] mb-4">
              📰 VenturIQ Blog
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Startup <span className="text-gradient">Intelligence</span> Hub
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Expert guides, founder stories, fundraising strategies, and everything you need to build a great startup.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1F2937] border border-[#374151] rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat ? "bg-[#F97316] text-white" : "bg-[#1F2937] text-gray-400 border border-[#374151] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <Link to={`/blog/${featured.id}`} className="group block bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden hover:border-[#F97316]/40 transition-all">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937] via-transparent lg:bg-gradient-to-l" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">Featured</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-3 py-1 bg-[#F97316]/15 text-[#F97316] text-xs font-semibold rounded-full mb-4">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F97316] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <img src={featured.authorAvatar} alt={featured.author} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-white">{featured.author}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{featured.date}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{featured.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/blog/${post.id}`}
                className="group block bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden hover:border-[#F97316]/40 hover:shadow-xl hover:shadow-orange-500/10 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/80 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#F97316]/20 text-[#F97316] text-xs rounded-full border border-[#F97316]/30">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-0.5 bg-[#374151] text-gray-400 text-xs rounded-full">
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-medium text-white">{post.author}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-2.5 h-2.5" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
          <Link to="/blog" className="text-[#F97316] hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-3 py-1 bg-[#F97316]/15 text-[#F97316] text-sm rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8">
            <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <p className="font-semibold text-white">{post.author}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <img src={post.image} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-10 shadow-2xl" />

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The startup ecosystem in India is evolving at an unprecedented pace. With over 100,000 registered startups and growing access to capital, the opportunity has never been greater. However, the challenge of standing out, finding the right investors, and validating your idea in a crowded market remains as daunting as ever.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">The AI Advantage in 2025</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Artificial intelligence has fundamentally changed how founders can validate and build their startups. What used to take months of market research and thousands of rupees in consulting fees can now be done in minutes with AI tools that analyze market data, competitive landscapes, and consumer trends in real-time.
            </p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Takeaways</h2>
            <ul className="space-y-3 text-gray-400">
              {[
                "AI-powered validation can reduce time-to-decision by 80%",
                "Data-driven pitching increases funding success rates by 3x",
                "Community insights from fellow founders are invaluable",
                "The right investor match matters more than the check size",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-[#F97316] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#374151]">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#374151] text-gray-300 text-sm rounded-full">#{tag}</span>
            ))}
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {BLOG_POSTS.filter((p) => p.id !== id).slice(0, 2).map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="flex gap-3 bg-[#1F2937] border border-[#374151] rounded-xl p-4 hover:border-[#F97316]/30 transition-all group"
                >
                  <img src={related.image} alt={related.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#F97316] transition-colors line-clamp-2">
                      {related.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{related.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
