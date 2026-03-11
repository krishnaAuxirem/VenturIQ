import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import VenturIQLogo from "@/components/VenturIQLogo";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl blob" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="flex justify-center mb-8">
          <VenturIQLogo width={200} height={60} asLink={false} />
        </div>

        <div className="text-8xl font-bold text-[#F97316] mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#ea6c10] transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            to="/startups"
            className="flex items-center justify-center gap-2 px-8 py-3.5 border border-[#374151] text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
          >
            Browse Startups
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
