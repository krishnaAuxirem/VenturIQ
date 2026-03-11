import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Clock, Tag, ChevronRight, ArrowLeft, Star, Send, ThumbsUp, MessageCircle } from "lucide-react";
import { BLOG_POSTS } from "@/data/mockData";
import toast from "react-hot-toast";

const CATEGORIES = ["All", "AI & Technology", "Fundraising", "Investor Relations", "Product", "Startup Advice", "Team Building"];

const FULL_CONTENT: Record<string, { sections: { heading?: string; body: string }[] }> = {
  b1: {
    sections: [
      { body: "The Indian startup ecosystem is undergoing a seismic transformation, driven largely by the rapid advancement and adoption of artificial intelligence. In 2025, founders no longer need to spend months conducting expensive market research or hire costly consulting firms to validate their startup ideas. AI-powered tools have democratized access to market intelligence, making high-quality idea validation accessible to every founder — regardless of their budget or connections." },
      { heading: "The Traditional Validation Problem", body: "Historically, validating a startup idea was an arduous, expensive, and time-consuming process. Founders would spend weeks building MVPs, conducting customer interviews, and commissioning market research reports that cost lakhs of rupees. By the time they had enough data to make an informed decision, their window of opportunity may have already closed. Competitors would have moved faster, or the market conditions would have shifted. The traditional approach was simply too slow for the pace of modern business." },
      { heading: "How AI Changes the Game", body: "Modern AI validation platforms can analyze millions of data points in seconds — social media conversations, search trends, patent filings, venture capital investment patterns, consumer reviews, and competitive landscapes. What once took a team of analysts three months can now be accomplished in under ten minutes. VenturIQ's AI Idea Validator, for instance, cross-references your startup concept against 50+ data sources to provide a comprehensive market demand score, competition analysis, and feasibility assessment in real-time." },
      { heading: "Key AI Capabilities in Idea Validation", body: "Market Demand Analysis: AI tools now track real-time search volume, social media sentiment, and consumer purchase behavior to gauge genuine market demand for your product. Competition Mapping: Machine learning algorithms can identify direct and indirect competitors, analyze their funding history, customer reviews, pricing strategies, and market positioning — giving you a complete competitive landscape overview. Revenue Potential Modeling: AI models trained on thousands of startup outcomes can estimate revenue potential, typical unit economics for your business model, and comparable benchmarks from similar companies that have succeeded or failed in your space." },
      { heading: "The VenturIQ Approach", body: "At VenturIQ, we've built our AI validation engine on top of proprietary data from over 15,000 Indian startups across 47 industries. Our model has been trained to understand the unique dynamics of the Indian market — consumer behavior patterns in Tier 2 and Tier 3 cities, regulatory environments, infrastructure constraints, and capital availability at different startup stages. When you input your idea into our validator, you receive a structured report covering market size (TAM, SAM, SOM), competitive intensity score, regulatory risk assessment, unit economics benchmarks, and a go-to-market fit analysis." },
      { heading: "Real-World Results", body: "Founders who use AI validation before building report 73% higher success rates in raising their first round of funding. They also report spending 60% less time in the pre-product phase, allowing them to move faster from ideation to market. Riya Desai, founder of FarmLink, credits VenturIQ's AI validation for helping her identify a critical gap in her original product hypothesis before she had written a single line of code. The AI analysis revealed that her target market — small-scale farmers in Maharashtra — had a strong preference for voice-based interfaces over text-based apps, a insight that completely reshaped her product direction." },
      { heading: "The Future of AI-Powered Validation", body: "As AI models become more sophisticated, the quality of idea validation will continue to improve. In the next 12-18 months, we expect AI validators to incorporate real-time funding news, regulatory changes, and macroeconomic indicators into their assessments. The founders who learn to leverage these tools effectively will have a significant competitive advantage over those who rely solely on intuition and traditional research methods. The message is clear: AI-powered validation isn't just a nice-to-have — it's becoming a core competency for every serious founder in 2025 and beyond." },
      { heading: "Getting Started", body: "To begin using AI for idea validation, start with free tools like VenturIQ's Idea Validator. Input your concept with as much detail as possible — your target customer, the problem you're solving, your proposed solution, and the revenue model you're considering. The more context you provide, the more accurate and actionable the AI analysis will be. Use the output not as a final verdict, but as a starting point for deeper customer discovery. Combine AI insights with real conversations with potential customers to build a comprehensive understanding of your market opportunity." },
    ],
  },
  b2: {
    sections: [
      { body: "Raising a seed round in India in 2025 is both an art and a science. With over 100,000 registered startups competing for a finite pool of early-stage capital, founders need to be strategic, prepared, and persistent. This guide draws on insights from 200+ founders who have successfully raised seed rounds ranging from ₹50 lakhs to ₹15 crores in the Indian ecosystem." },
      { heading: "Understanding the Indian Seed Landscape", body: "The Indian seed funding ecosystem has matured significantly over the past five years. Today, it comprises angel networks (Indian Angel Network, Mumbai Angels, Let's Venture), micro-VCs (Gemba Capital, Antler India, 100X.VC), family offices, corporate accelerators (Y Combinator India, T-Hub, NASSCOM 10,000 Startups), and international VCs with India mandates. Seed check sizes typically range from ₹25 lakhs to ₹5 crores, with valuations for pre-revenue startups ranging from ₹3 crores to ₹25 crores depending on the founding team's pedigree, market size, and early traction." },
      { heading: "Building Your Funding Thesis", body: "Before approaching any investor, you need to have a crisp, defensible funding thesis. This means knowing exactly how much money you need, what milestones you'll achieve with it, and why those milestones will make you fundable for the next round. Investors fund milestones, not months. A strong seed thesis for an EdTech startup might be: 'We're raising ₹2 Cr to launch in 3 metro markets, acquire 5,000 paying students, and prove a ₹450 CAC and ₹4,800 LTV, which will position us for a Series A at 10x revenue growth.'" },
      { heading: "The Perfect Pitch Deck", body: "Your pitch deck should tell a compelling story in 12-15 slides. The essential slides are: Problem (make investors feel the pain), Solution (demonstrate your unique insight), Market Size (TAM/SAM/SOM with a bottoms-up calculation), Business Model (how you make money), Traction (the most important slide — show real data), Team (why you're uniquely positioned to solve this), Competition (honest and insightful), Go-to-Market (specific and credible), Financial Projections (18-24 months with clear assumptions), and The Ask (specific amount and use of funds). Indian investors particularly respond to traction, team quality, and defensible market insights." },
      { heading: "Finding the Right Investors", body: "Not all money is equal. The best seed investors bring network, mentorship, and follow-on capacity in addition to capital. Research investors who have invested in companies similar to yours in stage, sector, and geography. Use platforms like VenturIQ to find investors who specifically focus on your sector and stage. Warm introductions convert at 5-10x the rate of cold outreach. Prioritize getting introductions from portfolio founders who can vouch for your character and capabilities." },
      { heading: "The Due Diligence Process", body: "Once an investor expresses interest, expect 4-8 weeks of due diligence. This will typically involve a technical review of your product, customer reference calls, legal document review (incorporation, IP ownership, employment contracts), financial model review, and background checks on founders. Prepare a data room with all key documents organized and ready to share. Companies that are well-organized in due diligence close 40% faster than those that aren't." },
      { heading: "Negotiating Term Sheets", body: "When you receive a term sheet, the key terms to negotiate are valuation, pro-rata rights, board composition, anti-dilution provisions, and liquidation preferences. For first-time founders, a clean simple agreement (SAFE or convertible note) is often preferable to a priced round, as it minimizes legal complexity and cost. Always have a startup lawyer review term sheets before signing." },
      { heading: "Post-Investment Relationship", body: "Closing the round is just the beginning. Establish clear communication cadences with your investors from day one. Monthly investor updates — covering progress against milestones, key metrics, challenges, and asks — are the most effective way to keep investors engaged and helpful. Investors who receive regular, honest updates are far more likely to help with future rounds, customer introductions, and hire recommendations." },
    ],
  },
  b3: {
    sections: [
      { body: "Every startup founder eventually faces the moment of truth: sitting across from a sophisticated investor and being asked to justify their business with data. Understanding exactly what metrics matter — and why — can be the difference between walking out with a term sheet and walking out with a polite rejection email three weeks later." },
      { heading: "Why Metrics Matter More Than Ever", body: "Indian investors have become significantly more data-driven since 2022. The era of story-driven, hope-based investing has given way to rigorous quantitative analysis. Today's institutional investors have access to benchmarking data from thousands of startups and can immediately contextualize your numbers within your sector, stage, and geography. Founders who don't know their metrics deeply signal either operational immaturity or something worse — that the business isn't performing well enough to track." },
      { heading: "1. Monthly Recurring Revenue (MRR) & Annual Recurring Revenue (ARR)", body: "For SaaS and subscription businesses, MRR is the most fundamental metric. Investors look at absolute MRR, MoM growth rate (25%+ is strong at early stage), and the quality of revenue (annual contracts vs month-to-month). For marketplace businesses, Gross Merchandise Value (GMV) and take rate are equivalent proxies." },
      { heading: "2. Customer Acquisition Cost (CAC)", body: "CAC is the total sales and marketing spend divided by the number of new customers acquired in the same period. Strong CAC is contextual — an EdTech company with a ₹200 CAC acquiring students for ₹99/month subscriptions is poorly positioned, while a B2B SaaS company with a ₹5,000 CAC selling ₹60,000 annual contracts has excellent unit economics." },
      { heading: "3. Lifetime Value (LTV) and LTV:CAC Ratio", body: "LTV measures the total revenue a customer generates over their relationship with your product. The LTV:CAC ratio is perhaps the single most important unit economics metric. A ratio below 3:1 signals an unsustainable business model. Between 3:1 and 5:1 is acceptable. Above 5:1 indicates excellent product-market fit. World-class SaaS businesses maintain LTV:CAC ratios above 10:1." },
      { heading: "4. Churn Rate and Net Revenue Retention", body: "Monthly churn rate measures the percentage of customers who cancel each month. Above 5% monthly churn is typically a red flag for early-stage companies. Net Revenue Retention (NRR) measures revenue retained from existing customers including expansion revenue from upsells. NRR above 100% — meaning you're growing revenue from existing customers faster than you're losing it to churn — is one of the most powerful signals of product-market fit." },
      { heading: "5. Payback Period", body: "Payback period is the number of months it takes to recover your CAC from gross margin. Under 12 months is excellent; 12-24 months is acceptable for most B2B businesses; over 24 months raises questions about capital efficiency. The shorter your payback period, the less capital-intensive your growth is — a huge advantage in the current funding environment." },
      { heading: "6. Gross Margin", body: "Gross margin is the percentage of revenue remaining after direct costs. Software businesses should target 70-85%+ gross margins. Marketplace businesses typically operate at 40-60%. Hardware businesses often struggle to exceed 30-40%. Low gross margins compress the entire unit economics stack and make it harder to build a capital-efficient business." },
      { heading: "Beyond the Numbers", body: "Metrics tell a story, but the best founders can explain the story behind the numbers. Why did CAC spike last quarter? What drove the improvement in NRR? What's the hypothesis behind your growth projections? Investors invest in founders, not spreadsheets. The ability to demonstrate deep understanding of your own business — both the numbers and the human dynamics driving them — is ultimately what separates fundable founders from the rest." },
    ],
  },
  b4: {
    sections: [
      { body: "Product-Led Growth (PLG) has emerged as the dominant go-to-market strategy for the world's fastest-growing B2B SaaS companies. From Slack to Figma to Notion, PLG companies grow by making their product so valuable and easy to adopt that users become the primary acquisition and expansion engine. In India, PLG strategies are particularly powerful because they enable companies to grow globally with lean teams and without massive marketing budgets." },
      { heading: "What is Product-Led Growth?", body: "PLG is a business methodology where the product itself is the primary driver of customer acquisition, retention, and expansion. Instead of relying on traditional sales-led approaches where salespeople demo the product and push prospects through a funnel, PLG companies let users experience the product's value first-hand — often through a freemium model or free trial — and then convert naturally when they've seen enough value to justify paying." },
      { heading: "The Three Pillars of PLG", body: "Viral Loops: Design your product so that using it naturally creates awareness among potential users. Figma succeeded because every time a designer shared a file for review, the reviewer was exposed to Figma's interface and experienced its value firsthand. Collaborative features, public outputs, and network effects are all classic viral loop mechanisms. Time to Value: The best PLG products get users to their 'aha moment' — the moment they truly feel the product's value — within minutes of signing up. Every onboarding friction point is a drop-off risk. Map your user journey and obsessively reduce time to value. Self-Serve Expansion: Build your pricing and feature structure so that users naturally want to upgrade as they use the product more. This means designing thoughtful upgrade triggers — hitting usage limits, needing team features, or requiring more advanced capabilities — that occur naturally as users get more value from the product." },
      { heading: "PLG for Indian B2B SaaS", body: "Indian B2B SaaS companies have a unique advantage: they can build products that serve both the Indian market and global markets from day one. Companies like Freshworks, Zoho, and Chargebee have demonstrated that India-built, globally-sold SaaS is a viable and enormously value-creative strategy. PLG amplifies this advantage by enabling global growth without proportional increases in sales headcount." },
      { heading: "Building Your PLG Foundation", body: "Start with a generous free tier that delivers genuine value. The worst PLG products are those with 'lite' versions so crippled that users can't get real value from them. Your free tier should make users successful enough that they naturally want more. Build robust analytics from day one to understand exactly where users are dropping off in your onboarding flow and what behaviors correlate with retention and upgrade. Instrument every key action and build dashboards that make these patterns visible to your entire team." },
      { heading: "When PLG Doesn't Work", body: "PLG is not the right strategy for every business. It works best for products that are easy to try, quick to show value, and naturally viral. Enterprise products that require extensive integration, customization, or security review cycles before delivering value are poor PLG candidates. Products with complex regulatory requirements or long institutional buying processes also tend to be better suited for traditional sales-led approaches." },
      { heading: "Measuring PLG Success", body: "The key metrics for PLG companies are Product Qualified Leads (PQLs — users who have hit specific activation events that predict conversion), free-to-paid conversion rate, time to activation, and viral coefficient. World-class PLG companies see free-to-paid conversion rates of 3-8% for freemium models and 15-25% for free trial models with a clearly defined time limit." },
    ],
  },
  b5: {
    sections: [
      { body: "The Indian startup ecosystem celebrated its 100,000th registered startup in 2024. Yet the brutal reality is that less than 1% of these startups will ever raise a Series A round. Understanding the specific, structural reasons why most seed-stage startups fail to make the leap to Series A is not defeatist — it's the most practical thing an early-stage founder can do to improve their odds." },
      { heading: "The Series A Bar in India Has Risen", body: "Five years ago, a Series A in India could be raised on the strength of a promising idea and a strong founding team. Today, investors expect concrete proof points: meaningful revenue traction (typically ₹2-5 Cr ARR for SaaS businesses), demonstrable product-market fit, a repeatable customer acquisition engine, and a team that has proven it can execute under pressure. The median Series A company in India is significantly further along than it was even three years ago." },
      { heading: "Mistake 1: Premature Scaling", body: "The single most common reason seed-stage startups fail to reach Series A is scaling prematurely — before they've achieved genuine product-market fit. They raise seed money, hire aggressively, launch expensive marketing campaigns, and burn through their runway before the fundamental question of 'do customers love this enough to pay for it and recommend it?' has been answered. The fix: stay lean and obsessively focused on finding product-market fit before allocating capital to growth." },
      { heading: "Mistake 2: Wrong Market Focus", body: "Many Indian startups initially target the most accessible market — tech-savvy, English-speaking urban users — when the true opportunity lies in underserved Tier 2 and Tier 3 markets. By the time they recognize this, they've burned through capital optimizing for the wrong customer segment. Others make the opposite mistake: targeting rural markets without the distribution infrastructure to reach them cost-effectively." },
      { heading: "Mistake 3: Building Without Selling", body: "Technical founders often fall into the trap of endlessly building features instead of selling. Product development becomes a comfort zone — a place to control outcomes in an uncertain world. But growth ultimately comes from customers, not features. The most successful early-stage founders spend 50-70% of their time on customer development, sales, and market feedback, even if they have strong technical skills." },
      { heading: "Mistake 4: Ignoring Unit Economics", body: "Startups that reach Series A can clearly demonstrate that their unit economics improve with scale. Many seed-stage companies have fundamentally broken unit economics — they're acquiring customers at a loss and hoping that volume will somehow make the math work. It doesn't. Investors who were once willing to invest in broken unit economics with a hypothesis for improvement are now much more conservative, requiring evidence that unit economics work at current scale before funding further growth." },
      { heading: "Mistake 5: Weak Investor Relationships", body: "Series A rounds are rarely won purely on the strength of your metrics. Relationships matter enormously. Founders who have been proactively building relationships with target Series A investors throughout their seed stage — sharing monthly updates, asking for introductions, inviting investors to customer events — are significantly more likely to raise quickly when they're ready. Founders who only reach out when they need money start the process at a severe disadvantage." },
      { heading: "The Path Forward", body: "The founders who make it to Series A share a set of common traits: extreme focus on a specific problem and customer segment, relentless customer centricity, disciplined capital allocation, and an honest, clear-eyed assessment of their own business at all times. They know their metrics deeply, communicate transparently with their seed investors, and build relationships with Series A investors long before they need to raise. None of this is magic — it's methodology." },
    ],
  },
  b6: {
    sections: [
      { body: "Building your early team is the most consequential decision you'll make as a founder. The first 10 hires will define your company's culture, capabilities, and trajectory far more than any product decision or marketing strategy. Yet most first-time founders approach hiring reactively — posting on job boards when they have an open role — rather than as the strategic, proactive discipline it needs to be." },
      { heading: "Why Early Hiring Is Different", body: "Early-stage hiring is fundamentally different from hiring at growth or mature companies. You're not backfilling established roles with defined job descriptions. You're hiring for undefined, evolving roles where the person will need to wear many hats, work in extreme uncertainty, and help shape the role itself as the company evolves. The competency profile for 'early employee #4' is categorically different from 'engineering manager, Series B company.'" },
      { heading: "Culture Before Compensation", body: "You cannot compete with Big Tech on compensation at the early stage. Your Infosys, Flipkart, or Google competitor will always offer a higher base salary, more guaranteed bonus, and better employee benefits. What you can offer that they cannot is equity upside, meaningful work, fast learning, and genuine ownership. The people who join early-stage startups are motivated by the opportunity to build something from scratch — to have problems that wouldn't exist without them. Attract for mission, retain with culture and ownership." },
      { heading: "ESOP as a Recruiting Tool", body: "Employee Stock Ownership Plans (ESOPs) are the most powerful recruiting tool available to early-stage startups. A well-designed ESOP pool of 10-15% of the company at founding, with a standard 4-year vesting schedule and 1-year cliff, allows you to offer employees genuine equity participation in the company's success. When structuring ESOPs, be generous early — equity is most valuable when it's most uncertain, and the people who join when the risk is highest deserve the highest potential reward." },
      { heading: "The Hiring Process", body: "Define the role with precision: not just what you need now, but what you'll need in 12 months as the company evolves. Prioritize candidates who have demonstrated intellectual humility, speed of learning, and comfort with ambiguity over those who have impressive credentials from structured environments. Startups don't need perfect resumes — they need hungry people who can figure things out in real-time. Structure your interview process around real work samples: give candidates actual problems your company is facing and evaluate how they approach them, not just how they perform in abstract case studies." },
      { heading: "Reference Checks Are Non-Negotiable", body: "The single most underutilized hiring tool is the reference check. Most founders do cursory reference calls that confirm what the candidate already told them. Instead, ask open-ended questions: 'What would this person's teammates say was their biggest weakness?' 'What type of manager does this person thrive under?' 'Would you hire this person back if you could?' The answers to these questions reveal far more than any interview." },
      { heading: "Letting Go When Necessary", body: "One of the most painful and necessary skills for early-stage founders is recognizing when an early hire is no longer the right fit as the company evolves. The person who was perfect at 5 employees may struggle at 25. The skills that made someone exceptional in the unstructured chaos of the earliest days may not translate to a company that's developing organizational structure and process. Have honest, compassionate conversations early rather than letting mismatches fester. Retention that isn't in the mutual interest of both parties is not retention at all." },
    ],
  },
};

const DEMO_COMMENTS = [
  {
    id: "c1",
    name: "Arjun Khanna",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
    text: "Excellent article! This covers exactly what I was looking for. The points about AI validation reducing time-to-decision are spot on — we used VenturIQ's validator for our AgriTech idea and it saved us weeks of manual research.",
    date: "March 8, 2025",
    likes: 24,
  },
  {
    id: "c2",
    name: "Priya Menon",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop",
    text: "Really well written. I'd add that combining AI validation with actual customer interviews gives you the best of both worlds — quantitative market signal plus qualitative insight into customer psychology. We did both and it was transformative.",
    date: "March 9, 2025",
    likes: 18,
  },
  {
    id: "c3",
    name: "Rahul Gupta",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop",
    text: "The section on LTV:CAC was incredibly useful. Most founders I know don't calculate this properly — they confuse gross revenue with net margin in the LTV calculation. Would love to see a follow-up post with a step-by-step calculation guide for different business models.",
    date: "March 10, 2025",
    likes: 31,
  },
  {
    id: "c4",
    name: "Kavita Singh",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop",
    text: "As a first-time founder currently in the middle of fundraising, this article is pure gold. Bookmarked and shared with my co-founder. The relationship-building point is so underrated — wish I'd started building investor relationships 6 months before we started raising.",
    date: "March 11, 2025",
    likes: 42,
  },
];

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
              Startup <span className="bg-gradient-to-r from-[#F97316] to-[#fb923c] bg-clip-text text-transparent">Intelligence</span> Hub
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
  const content = FULL_CONTENT[id || "b1"];
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [commentForm, setCommentForm] = useState({ name: "", text: "" });
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.text.trim()) return;
    const newComment = {
      id: `c${Date.now()}`,
      name: commentForm.name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(commentForm.name)}&background=F97316&color=fff&size=60`,
      text: commentForm.text,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      likes: 0,
    };
    setComments((prev) => [...prev, newComment]);
    setCommentForm({ name: "", text: "" });
    toast.success("Comment added successfully!");
  };

  const handleLike = (commentId: string) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

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
          {/* Header */}
          <span className="inline-block px-3 py-1 bg-[#F97316]/15 text-[#F97316] text-sm rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>

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

          {/* Article Content */}
          <div className="space-y-6">
            {content?.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-3">{section.heading}</h2>
                )}
                <p className="text-gray-300 leading-relaxed text-base">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#374151]">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[#374151] text-gray-300 text-sm rounded-full">#{tag}</span>
            ))}
          </div>

          {/* Author Box */}
          <div className="mt-8 p-5 bg-[#1F2937] border border-[#374151] rounded-2xl flex items-start gap-4">
            <img src={post.authorAvatar} alt={post.author} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            <div>
              <p className="font-bold text-white">{post.author}</p>
              <p className="text-xs text-[#F97316] mb-2">Contributing Author, VenturIQ Blog</p>
              <p className="text-sm text-gray-400">Startup ecosystem expert with 10+ years of experience in Indian venture capital, entrepreneurship, and startup strategy. Helping founders navigate the journey from idea to IPO.</p>
            </div>
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
                    <p className="text-xs text-gray-500 mt-1">{related.readTime} • {related.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-xl font-bold text-white">Comments ({comments.length})</h3>
            </div>

            {/* Existing Comments */}
            <div className="space-y-5 mb-10">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-white text-sm">{comment.name}</p>
                          <p className="text-xs text-gray-500">{comment.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">{comment.text}</p>
                      <button
                        onClick={() => handleLike(comment.id)}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          likedComments.has(comment.id) ? "text-[#F97316]" : "text-gray-500 hover:text-[#F97316]"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {comment.likes + (likedComments.has(comment.id) ? 1 : 0)} Helpful
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
              <h4 className="font-bold text-white mb-5">Leave a Comment</h4>
              <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    value={commentForm.name}
                    onChange={(e) => setCommentForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g., Arjun Sharma"
                    className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F97316] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Comment</label>
                  <textarea
                    required
                    value={commentForm.text}
                    onChange={(e) => setCommentForm((f) => ({ ...f, text: e.target.value }))}
                    rows={4}
                    placeholder="Share your thoughts, questions, or experiences related to this article..."
                    className="w-full bg-[#111827] border border-[#374151] rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#F97316] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#F97316] hover:bg-[#ea6c10] text-white text-sm font-semibold rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
