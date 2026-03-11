import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube, Send, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const socials = [
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-blue-400" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-500" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0E1A]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F97316]/15 border border-[#F97316]/30 rounded-full text-sm text-[#F97316] mb-4">
              📬 Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              We'd Love to <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Have a question about VenturIQ? Want to partner with us? Our team is here to help.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#F97316] text-white rounded-xl hover:bg-[#ea6c10] transition-all text-sm font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      rows={6}
                      className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors text-sm resize-none"
                      placeholder="Tell us more about your query..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-60 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                lines: ["hello@venturiq.com", "support@venturiq.com"],
                color: "bg-orange-500/20 text-[#F97316]",
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+91 98765 43210", "Mon–Fri, 9AM–6PM IST"],
                color: "bg-blue-500/20 text-blue-400",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                lines: ["91 Springboard, Koramangala", "Bengaluru, Karnataka 560034"],
                color: "bg-green-500/20 text-green-400",
              },
            ].map(({ icon: Icon, title, lines, color }) => (
              <div key={title} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6 flex gap-4">
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{title}</h4>
                  {lines.map((line, i) => (
                    <p key={i} className="text-gray-400 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-[#374151] ${color} text-white rounded-xl flex items-center justify-center transition-all`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden h-48 relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=300&fit=crop"
                alt="Office location"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">Koramangala, Bengaluru</p>
                  <p className="text-gray-400 text-xs">View on Google Maps</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
