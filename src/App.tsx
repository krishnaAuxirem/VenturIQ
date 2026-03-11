import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";

const Home = lazy(() => import("@/pages/Home"));
const Startups = lazy(() => import("@/pages/Startups"));
const StartupDetail = lazy(() => import("@/pages/StartupDetail"));
const Investors = lazy(() => import("@/pages/Investors"));
const Mentors = lazy(() => import("@/pages/Mentors"));
const Community = lazy(() => import("@/pages/Community"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetailImport = lazy(() => import("@/pages/Blog").then(m => ({ default: m.BlogDetail })));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg-primary)" }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Loading...</p>
    </div>
  </div>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1F2937",
                color: "#fff",
                border: "1px solid #374151",
                borderRadius: "12px",
                fontSize: "14px",
              },
              success: { iconTheme: { primary: "#F97316", secondary: "#fff" } },
            }}
          />
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<AppLayout><Home /></AppLayout>} />
                <Route path="/startups" element={<AppLayout><Startups /></AppLayout>} />
                <Route path="/startups/:id" element={<AppLayout><StartupDetail /></AppLayout>} />
                <Route path="/investors" element={<AppLayout><Investors /></AppLayout>} />
                <Route path="/mentors" element={<AppLayout><Mentors /></AppLayout>} />
                <Route path="/community" element={<AppLayout><Community /></AppLayout>} />
                <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
                <Route path="/blog" element={<AppLayout><Blog /></AppLayout>} />
                <Route path="/blog/:id" element={<AppLayout><BlogDetailImport /></AppLayout>} />
                <Route path="/about" element={<AppLayout><About /></AppLayout>} />
                <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
