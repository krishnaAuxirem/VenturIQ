import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell, Menu, X, ChevronDown, LogOut, User, Settings,
  LayoutDashboard, Sun, Moon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import VenturIQLogo from "@/components/VenturIQLogo";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Startups", to: "/startups" },
  { label: "Investors", to: "/investors" },
  { label: "Mentors", to: "/mentors" },
  { label: "Community", to: "/community" },
  { label: "Pricing", to: "/pricing" },
  { label: "Blog", to: "/blog" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const NOTIFICATIONS = [
  { id: 1, text: "Investor Vikram Mehta viewed your profile", time: "2m ago", unread: true },
  { id: 2, text: "New mentor session confirmed with Rajesh Iyer", time: "1h ago", unread: true },
  { id: 3, text: "Your idea score improved to 82/100", time: "3h ago", unread: false },
  { id: 4, text: "Community reply on your post", time: "1d ago", unread: false },
];

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdown(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdown(false);
    navigate("/");
  };

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  const navBg = scrolled
    ? isDark
      ? "bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[#374151]/50 shadow-lg"
      : "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    : "bg-transparent";

  const dropdownBg = isDark
    ? "bg-[#1F2937] border-[#374151]"
    : "bg-white border-gray-200 shadow-xl";

  const dropdownText = isDark ? "text-gray-300" : "text-gray-600";
  const dropdownHover = isDark ? "hover:bg-white/5" : "hover:bg-gray-50";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <VenturIQLogo width={160} height={48} />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-[#F97316] border-b-2 border-[#F97316]"
                      : isDark
                        ? "text-gray-300 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2" ref={dropdownRef}>
            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? "text-gray-400 hover:text-yellow-400 hover:bg-white/5"
                  : "text-gray-500 hover:text-orange-500 hover:bg-gray-100"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(!notifOpen); setUserDropdown(false); }}
                  className={`p-2 rounded-lg transition-all relative ${
                    isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F97316] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 top-12 w-80 border rounded-xl shadow-2xl overflow-hidden z-50 ${dropdownBg}`}
                    >
                      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? "border-[#374151]" : "border-gray-100"}`}>
                        <span className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>Notifications</span>
                        <span className="text-xs text-[#F97316]">{unreadCount} new</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {NOTIFICATIONS.map((n) => (
                          <div
                            key={n.id}
                            className={`px-4 py-3 border-b cursor-pointer transition-all ${
                              isDark ? "border-[#374151]/50 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"
                            } ${n.unread ? (isDark ? "bg-[#F97316]/5" : "bg-orange-50") : ""}`}
                          >
                            <p className={`text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}>{n.text}</p>
                            <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{n.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 text-center">
                        <button className="text-xs text-[#F97316] hover:underline">View all notifications</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => { setUserDropdown(!userDropdown); setNotifOpen(false); }}
                  className={`flex items-center gap-2 p-1.5 rounded-xl transition-all border ${
                    isDark ? "bg-white/5 hover:bg-white/10 border-white/10" : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                  }`}
                >
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=F97316&color=fff`}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className={`text-xs font-semibold leading-none ${isDark ? "text-white" : "text-gray-900"}`}>{user.name.split(" ")[0]}</p>
                    <p className="text-xs text-[#F97316] capitalize leading-none mt-0.5">{user.role}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                </button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 top-12 w-56 border rounded-xl shadow-2xl overflow-hidden z-50 ${dropdownBg}`}
                    >
                      <div className={`px-4 py-3 border-b ${isDark ? "border-[#374151]" : "border-gray-100"}`}>
                        <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</p>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#F97316]/20 text-[#F97316] text-xs rounded-full capitalize">{user.role}</span>
                      </div>
                      <div className="py-1">
                        {[
                          { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
                          { icon: User, label: "Profile", to: "/dashboard?tab=profile" },
                          { icon: Settings, label: "Settings", to: "/dashboard?tab=settings" },
                        ].map(({ icon: Icon, label, to }) => (
                          <Link
                            key={label}
                            to={to}
                            onClick={() => setUserDropdown(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-all ${dropdownText} ${dropdownHover}`}
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </Link>
                        ))}
                        <div className={`border-t mt-1 pt-1 ${isDark ? "border-[#374151]" : "border-gray-100"}`}>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isDark ? "text-gray-300 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-[#F97316] hover:bg-[#ea6c10] text-white rounded-lg transition-all shadow-lg shadow-orange-500/20"
                >
                  Get Started →
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all ${
                isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t backdrop-blur-xl ${
              isDark ? "bg-[#0D1117]/98 border-[#374151]/50" : "bg-white/98 border-gray-200"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "text-[#F97316] bg-[#F97316]/10"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-[#374151]">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className={`flex-1 px-4 py-2.5 text-sm font-medium text-center border rounded-lg transition-all ${isDark ? "text-gray-300 border-[#374151] hover:bg-white/5" : "text-gray-600 border-gray-200 hover:bg-gray-100"}`}>
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 px-4 py-2.5 text-sm font-semibold text-center bg-[#F97316] text-white rounded-lg hover:bg-[#ea6c10] transition-all">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
