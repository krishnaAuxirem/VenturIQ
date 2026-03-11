import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ChevronDown, ChevronUp, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    monthlyPrice: 0,
    badge: null,
    color: "border-[#374151]",
    features: [
      { label: "Idea Validations", value: "3/month" },
      { label: "Business Plan Builder", value: "Basic" },
      { label: "Startup Profile", value: true },
      { label: "Community Access", value: true },
      { label: "Investor Connections", value: "5/month" },
      { label: "Mentor Sessions", value: false },
      { label: "Analytics Dashboard", value: false },
      { label: "Fundraising Module", value: false },
      { label: "Priority Support", value: false },
      { label: "Investor CRM", value: false },
    ],
    cta: "Get Started Free",
    ctaStyle: "border border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10",
  },
  {
    name: "Growth",
    monthlyPrice: 1999,
    badge: "Most Popular",
    color: "border-[#F97316]",
    features: [
      { label: "Idea Validations", value: "Unlimited" },
      { label: "Business Plan Builder", value: "Full Access" },
      { label: "Startup Profile", value: true },
      { label: "Community Access", value: true },
      { label: "Investor Connections", value: "50/month" },
      { label: "Mentor Sessions", value: "3/month" },
      { label: "Analytics Dashboard", value: true },
      { label: "Fundraising Module", value: true },
      { label: "Priority Support", value: true },
      { label: "Investor CRM", value: false },
    ],
    cta: "Start Growth Plan",
    ctaStyle: "bg-[#F97316] hover:bg-[#ea6c10] text-white shadow-lg shadow-orange-500/25",
  },
  {
    name: "Pro",
    monthlyPrice: 4999,
    badge: null,
    color: "border-[#374151]",
    features: [
      { label: "Idea Validations", value: "Unlimited" },
      { label: "Business Plan Builder", value: "Advanced + Export" },
      { label: "Startup Profile", value: true },
      { label: "Community Access", value: true },
      { label: "Investor Connections", value: "Unlimited" },
      { label: "Mentor Sessions", value: "10/month" },
      { label: "Analytics Dashboard", value: "Advanced" },
      { label: "Fundraising Module", value: true },
      { label: "Priority Support", value: "24/7 Dedicated" },
      { label: "Investor CRM", value: true },
    ],
    cta: "Start Pro Plan",
    ctaStyle: "border border-white/20 text-white hover:bg-white/5",
  },
];

const FAQS = [
  {
    q: "Can I switch plans at any time?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "We offer a 14-day free trial for both Growth and Pro plans. No credit card required to start.",
  },
  {
    q: "How does the AI Idea Validator work?",
    a: "Our AI analyzes your startup idea against thousands of market data points to give you market demand scores, competition analysis, and a feasibility score.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. You can cancel your subscription at any time from your dashboard settings. You'll retain access until the end of your current billing period.",
  },
  {
    q: "Are there any setup fees?",
    a: "No setup fees, no hidden charges. The price you see is the price you pay. We also offer a 20% discount on annual plans.",
  },
  {
    q: "Do you offer special pricing for early-stage startups?",
    a: "Yes, we have special pricing for cohort-based programs, accelerators, and startup incubators. Contact us for a custom quote.",
  },
];

const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getPrice = (monthly: number) => {
    if (monthly === 0) return "Free";
    const price = annual ? Math.floor(monthly * 0.8) : monthly;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-16">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#F97316]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-sm text-green-400 mb-4">
              <Zap className="w-3.5 h-3.5" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Plans for every <span className="text-gradient">stage of growth</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              Start free, scale as you grow. No hidden fees, no surprises. Cancel anytime.
            </p>
            {/* Toggle */}
            <div className="inline-flex items-center bg-[#1F2937] border border-[#374151] rounded-xl p-1.5">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${!annual ? "bg-[#F97316] text-white" : "text-gray-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all ${annual ? "bg-[#F97316] text-white" : "text-gray-400"}`}
              >
                Annual
                <span className="ml-1.5 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-bold">-20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-[#1F2937] border-2 ${plan.color} rounded-2xl p-8 ${plan.badge ? "shadow-2xl shadow-orange-500/15" : ""}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="px-4 py-1.5 bg-[#F97316] text-white text-xs font-bold rounded-full">
                    ⭐ {plan.badge}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-white">{getPrice(plan.monthlyPrice)}</span>
                {plan.monthlyPrice > 0 && <span className="text-gray-400">/month</span>}
              </div>
              {annual && plan.monthlyPrice > 0 && (
                <p className="text-xs text-green-400 mb-6">Save ₹{Math.floor(plan.monthlyPrice * 0.2 * 12).toLocaleString()} per year</p>
              )}
              <div className={`${!annual || plan.monthlyPrice === 0 ? "mb-6" : "mb-4"}`} />

              <ul className="space-y-3 mb-8">
                {plan.features.map(({ label, value }) => (
                  <li key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{label}</span>
                    {typeof value === "boolean" ? (
                      value ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <span className="text-gray-600">—</span>
                      )
                    ) : (
                      <span className="text-white font-medium text-xs">{value}</span>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block w-full py-3.5 text-center text-sm font-semibold rounded-xl transition-all ${plan.ctaStyle}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#1F2937] border border-[#374151] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-white text-sm">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
