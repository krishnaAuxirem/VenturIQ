import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Users, TrendingUp, Award, Globe, Heart, Zap, Star } from "lucide-react";

const TEAM = [
  {
    name: "Rohit Kapoor",
    role: "CEO & Co-Founder",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Ex-McKinsey, IIT Delhi. Built and exited 2 startups before founding VenturIQ.",
  },
  {
    name: "Priya Mehta",
    role: "CTO & Co-Founder",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop",
    bio: "Ex-Google, IIT Bombay. 15 years building AI/ML products at scale.",
  },
  {
    name: "Arjun Nair",
    role: "CPO",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Former Product Lead at Zerodha. Expert in building for India's next billion users.",
  },
  {
    name: "Kavya Singh",
    role: "Chief Revenue Officer",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    bio: "Ex-Sequoia, ISB. Closed $50M+ in enterprise deals before joining VenturIQ.",
  },
  {
    name: "Vikram Sharma",
    role: "Head of Investor Relations",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    bio: "Former angel investor with a portfolio of 30+ startups across India.",
  },
  {
    name: "Meera Iyer",
    role: "Head of Community",
    photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop",
    bio: "Built founder communities of 50,000+ at TiE and iSPIRT before joining us.",
  },
];

const STATS = [
  { label: "Founded", value: "2023", icon: Target },
  { label: "Team Size", value: "52", icon: Users },
  { label: "Startups Helped", value: "2,500+", icon: TrendingUp },
  { label: "Funding Facilitated", value: "₹150 Cr+", icon: Award },
];

const PARTNERS = [
  "Google for Startups", "Microsoft Ventures", "AWS Activate",
  "Nasscom", "FICCI", "Startup India", "TiE Delhi", "iSPIRT",
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=800&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/50 to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316]/15 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] mb-6">
              🌟 Our Story
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Built by founders,<br />
              <span className="text-gradient">for founders</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              We started VenturIQ because we experienced firsthand the pain of building a startup without the right tools, connections, and guidance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-[#F97316]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-[#F97316]" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{value}</p>
              <p className="text-sm text-gray-400">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To democratize access to startup intelligence, funding networks, and expert mentorship — making it possible for every ambitious founder in India to build, raise, and scale their venture, regardless of their background or connections.",
              color: "from-[#F97316] to-[#ea6c10]",
            },
            {
              icon: Globe,
              title: "Our Vision",
              text: "A world where geography, network, and background are no longer barriers to entrepreneurship. We believe the next generation of world-changing companies will be built in Tier 2 and Tier 3 cities of India, and VenturIQ will be their launchpad.",
              color: "from-blue-500 to-cyan-500",
            },
          ].map(({ icon: Icon, title, text, color }) => (
            <div key={title} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-8">
              <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mb-6`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-400 mb-6">
              <Heart className="w-3.5 h-3.5" />
              Our Story
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">From frustration to platform</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                In 2021, our co-founders Rohit and Priya were building their second startup. Despite having prior exits, they found the process of validating ideas, finding the right investors, and accessing quality mentors frustratingly manual and opaque.
              </p>
              <p>
                "We realized that if experienced founders face these challenges, imagine what first-time founders go through," says Rohit. "The information asymmetry in the startup ecosystem is enormous, and it disproportionately affects founders outside of metros."
              </p>
              <p>
                They spent 18 months building VenturIQ — a platform that combines AI-powered intelligence with India's most active founder and investor community. Today, VenturIQ has helped 2,500+ startups validate ideas, connect with investors, and collectively raise over ₹150 Crores.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { year: "2021", event: "Founded in Bengaluru" },
              { year: "2022", event: "First 500 founders" },
              { year: "2023", event: "₹5 Cr seed raised" },
              { year: "2024", event: "2,500+ startups, ₹150 Cr+" },
            ].map(({ year, event }) => (
              <div key={year} className="bg-[#1F2937] border border-[#374151] rounded-xl p-5">
                <p className="text-[#F97316] font-bold text-xl mb-1">{year}</p>
                <p className="text-gray-300 text-sm">{event}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Meet the Team</h2>
            <p className="text-gray-400">The people behind VenturIQ's mission</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 text-center hover:border-[#F97316]/30 transition-all"
              >
                <img src={member.photo} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4" />
                <h4 className="font-bold text-white mb-1">{member.name}</h4>
                <p className="text-sm text-[#F97316] mb-3">{member.role}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">Our Partners & Backers</h2>
            <p className="text-gray-400">Supported by India's most prestigious institutions</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PARTNERS.map((partner) => (
              <div key={partner} className="bg-[#1F2937] border border-[#374151] rounded-xl p-4 text-center hover:border-[#F97316]/30 transition-all">
                <div className="w-10 h-10 bg-[#F97316]/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="w-5 h-5 text-[#F97316]" />
                </div>
                <p className="text-sm text-gray-300 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#F97316] to-[#ea6c10] rounded-3xl p-12 text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Join the Movement</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Be part of India's most ambitious founder community. Your next unicorn journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-[#F97316] font-bold rounded-xl hover:bg-gray-50 transition-all">
              Get Started Free
            </Link>
            <Link to="/contact" className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
