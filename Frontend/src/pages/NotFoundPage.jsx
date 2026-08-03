// src/pages/NotFoundPage.jsx

import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Compass } from "lucide-react";
import Navbar from "../components/Navbar";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-between transition-colors duration-300">
      <div>
        <Navbar />

        <main className="relative overflow-hidden">
          {/* Ambient glow — consistent with SubjectPage's ambient treatment */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-20 h-64 w-64 sm:-top-40 sm:-left-32 sm:h-96 sm:w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-64 w-64 sm:-bottom-40 sm:h-96 sm:w-96 rounded-full bg-secondary/10 blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-20 sm:pt-32 pb-20 sm:pb-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Big 404 mark */}
              <div className="relative inline-flex items-center justify-center">
                <span className="text-7xl sm:text-9xl font-black tracking-tighter bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent select-none">
                  404
                </span>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute -top-1 -right-3 sm:-right-6 w-9 h-9 sm:w-12 sm:h-12 rounded-2xl bg-surface border border-line shadow-rest flex items-center justify-center"
                >
                  <Compass size={18} className="text-secondary sm:w-6 sm:h-6" />
                </motion.div>
              </div>

              <h1 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-bold text-ink tracking-tight">
                This page hasn't been uploaded yet
              </h1>

              <p className="mt-3 text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
                We couldn't find what you were looking for — the page may
                have moved, the resource might not exist, or the link could
                be outdated.
              </p>

              {/* Shows the broken path so the user can spot a typo */}
              <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-2/70 border border-line/70 text-xs text-muted font-mono max-w-full overflow-x-auto">
                <span className="shrink-0 text-secondary">Path:</span>
                <span className="truncate">{location.pathname}</span>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-surface font-semibold text-sm hover:bg-primary-light transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <Home size={16} />
                  Back to Home
                </Link>

                <Link
                  to="/resources"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-line text-ink font-semibold text-sm hover:bg-surface-2 transition-all duration-200"
                >
                  <Search size={16} />
                  Browse Resources
                </Link>
              </div>

              <button
                onClick={() => window.history.back()}
                className="mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted hover:text-ink transition-colors"
              >
                <ArrowLeft size={13} />
                Go back to previous page
              </button>
            </motion.div>
          </div>
        </main>
      </div>

    </div>
  );
}