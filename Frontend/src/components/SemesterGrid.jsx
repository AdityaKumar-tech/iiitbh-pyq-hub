// src/components/SemesterGrid.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";

const semesters = [
  {
    num: 1,
    gradient: "from-indigo-500/80 to-violet-500/80",
    glow: "bg-indigo-400/20",
    borderHover: "group-hover:border-indigo-500/30",
    pillBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  },
  {
    num: 2,
    gradient: "from-teal-500/80 to-emerald-500/80",
    glow: "bg-teal-400/20",
    borderHover: "group-hover:border-teal-500/30",
    pillBg: "bg-teal-500/10 text-teal-600 dark:text-teal-300",
  },
  {
    num: 3,
    gradient: "from-rose-500/80 to-pink-500/80",
    glow: "bg-rose-400/20",
    borderHover: "group-hover:border-rose-500/30",
    pillBg: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
  },
  {
    num: 4,
    gradient: "from-amber-500/80 to-orange-500/80",
    glow: "bg-amber-400/20",
    borderHover: "group-hover:border-amber-500/30",
    pillBg: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  },
  {
    num: 5,
    gradient: "from-violet-500/80 to-purple-500/80",
    glow: "bg-violet-400/20",
    borderHover: "group-hover:border-violet-500/30",
    pillBg: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  },
  {
    num: 6,
    gradient: "from-sky-500/80 to-cyan-500/80",
    glow: "bg-sky-400/20",
    borderHover: "group-hover:border-sky-500/30",
    pillBg: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  },
  {
    num: 7,
    gradient: "from-orange-500/80 to-amber-500/80",
    glow: "bg-orange-400/20",
    borderHover: "group-hover:border-orange-500/30",
    pillBg: "bg-orange-500/10 text-orange-600 dark:text-orange-300",
  },
  {
    num: 8,
    gradient: "from-emerald-500/80 to-green-500/80",
    glow: "bg-emerald-400/20",
    borderHover: "group-hover:border-emerald-500/30",
    pillBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  },
];

export default function SemesterGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary mb-3">
            Academic Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Browse by Semester
          </h2>
        </div>

        <p className="text-sm font-medium text-muted/80 mr-10">
          Notes • PYQs
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((sem, index) => (
          <motion.div
            key={sem.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.04,
            }}
          >
            <Link
              to={`/resources/semester-${sem.num}`}
              className={`group relative block overflow-hidden rounded-3xl border border-line/60 bg-surface/60 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 ${sem.borderHover}`}
            >
              {/* Soft Ambient Blur Glow */}
              <div
                className={`absolute -right-8 -top-8 h-36 w-36 rounded-full blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-70 ${sem.glow}`}
              />

              {/* Top Subtle Border Accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${sem.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Watermark Number (Soft Contrast) */}
              <div className="absolute right-4 bottom-2 text-7xl font-black leading-none text-muted/10 group-hover:text-muted/20 transition-colors duration-300 select-none pointer-events-none">
                {String(sem.num).padStart(2, "0")}
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-between h-52">
                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br ${sem.gradient} text-white shadow-sm`}
                    >
                      <BookOpen size={18} />
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${sem.pillBg}`}
                    >
                      Sem {sem.num}
                    </span>
                  </div>

                  <p className="mt-4 text-[11px] uppercase tracking-widest font-semibold text-muted/70">
                    Semester
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-ink mt-0.5">
                    {String(sem.num).padStart(2, "0")}
                  </h3>
                </div>

                {/* Bottom Section */}
                <div>
                  <p className="text-xs text-muted/80 mb-4 font-normal">
                    Notes • PYQs • Labs
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-line/40">
                    <span className="text-xs font-semibold text-ink group-hover:text-primary transition-colors">
                      Explore Hub
                    </span>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-line/80 text-muted group-hover:text-white group-hover:bg-linear-to-br ${sem.gradient} transition-all duration-300 group-hover:rotate-45 shadow-sm`}
                    >
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}