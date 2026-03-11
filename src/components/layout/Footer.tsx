import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Youtube, Send, ArrowRight } from "lucide-react";
import VenturIQLogo from "@/components/VenturIQLogo";

const footerLinks = {
  Product: [
    { label: "Idea Validator", to: "/dashboard" },
    { label: "Business Plan Builder", to: "/dashboard" },
    { label: "Investor Discovery", to: "/investors" },
    { label: "Mentor Marketplace", to: "/mentors" },
    { label: "Community", to: "/community" },
    { label: "Analytics", to: "/dashboard" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/about" },
    { label: "Press Kit", to: "/about" },
    { label: "Partners", to: "/about" },
    { label: "Contact", to: "/contact" },
  ],
  Resources: [
    { label: "Documentation", to: "/blog" },
    { label: "Startup Toolkit", to: "/blog" },
    { label: "Investor Guide", to: "/blog" },
    { label: "Pitch Templates", to: "/dashboard" },
    { label: "Community Forum", to: "/community" },
    { label: "Webinars", to: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/contact" },
    { label: "Terms of Service", to: "/contact" },
    { label: "Cookie Policy", to: "/contact" },
    { label: "Refund Policy", to: "/contact" },
    { label: "Disclaimer", to: "/contact" },
  ],
};

const socialLinks = [
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0D1117] border-t border-[#374151]/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4">
              <VenturIQLogo width={160} height={48} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's leading AI-powered startup intelligence platform. Build smarter, raise faster, scale further.
            </p>
            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Stay in the loop</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">✓</div>
                  Subscribed! Welcome to VenturIQ.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-[#1F2937] border border-[#374151] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 bg-[#F97316] hover:bg-[#ea6c10] text-white rounded-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-[#1F2937] hover:bg-[#F97316] border border-[#374151] hover:border-[#F97316] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-gray-400 hover:text-[#F97316] transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -ml-1 group-hover:ml-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#374151]/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 VenturIQ. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
