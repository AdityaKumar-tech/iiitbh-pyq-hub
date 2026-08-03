// src/components/HeroSection.jsx

import { motion } from "framer-motion";
import PathIndicator from "./PathIndicator";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow — smaller & closer-cropped on mobile so it doesn't overwhelm */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-20 h-64 w-64 sm:-top-40 sm:-left-32 sm:h-96 sm:w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-64 w-64 sm:-bottom-40 sm:h-96 sm:w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 pt-14 sm:pt-24 pb-14 sm:pb-20">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-rest">
              🎓 IIIT Bhagalpur Academic Portal
            </span>

            <h1 className="mt-5 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink leading-[1.15] sm:leading-[1.1]">
              Everything you need for
              <span className="block mt-1 sm:mt-2 bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                this semester.
              </span>
            </h1>

            <p className="mt-4 sm:mt-7 max-w-xl text-sm sm:text-lg leading-relaxed sm:leading-8 text-muted">
              Access notes, previous year questions, assignments,
              lab manuals, practical files and syllabus —
              all organized by semester and subject so you never waste
              time searching again.
            </p>

            {/* Stats — 3-across grid on mobile instead of wrapping flex, so cards stay equal width */}
            <div className="mt-7 sm:mt-10 grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-4">
              <div className="rounded-xl sm:rounded-2xl bg-surface border border-line px-3 py-3 sm:px-5 sm:py-4 shadow-rest text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-black text-ink">8</p>
                <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                  Semesters
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-surface border border-line px-3 py-3 sm:px-5 sm:py-4 shadow-rest text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-black text-ink">1000+</p>
                <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                  Resources
                </p>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-surface border border-line px-3 py-3 sm:px-5 sm:py-4 shadow-rest text-center sm:text-left">
                <p className="text-lg sm:text-2xl font-black text-ink">24×7</p>
                <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                  Available
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — shrinks and drops delay on mobile so it doesn't feel like a slow second beat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="flex justify-center order-first md:order-last scale-[0.75] sm:scale-100 -mb-4 sm:mb-0"
          >
            <PathIndicator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}