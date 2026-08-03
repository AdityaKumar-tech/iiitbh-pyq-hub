// src/components/SubjectCard.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  ClipboardList,
  ArrowUpRight,
  User,
} from "lucide-react";

export default function SubjectCard({ subject, semesterId, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
      }}
    >
      <Link
        to={`/resources/semester-${semesterId}/${subject.slug}`}
        className="group relative block overflow-hidden rounded-card border border-line/80 bg-surface p-6 shadow-rest transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:border-primary/30"
      >
        {/* Soft Ambient Glow */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Accent Highlight */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary/40 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
                  <BookOpen size={20} />
                </div>

                <span className="inline-flex rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-ink/80 border border-line/60">
                  {subject.code}
                </span>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-muted border border-line/60 transition-all duration-300 group-hover:bg-primary group-hover:text-surface group-hover:rotate-45">
                <ArrowUpRight size={15} />
              </div>
            </div>

            {/* Subject Title & Instructor */}
            <h3 className="mt-5 text-lg font-bold tracking-tight text-ink group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-snug">
              {subject.name}
            </h3>

            {subject.instructor && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted/90 font-medium">
                <User size={13} className="text-muted/60 shrink-0" />
                <span className="truncate">{subject.instructor}</span>
              </p>
            )}
          </div>

          {/* Resource Count Stats */}
          <div className="mt-6 pt-4 border-t border-line/50 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-line/40 bg-surface-2/60 px-3 py-2.5">
              <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                <FileText size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/70 leading-none mb-1">
                  Notes
                </p>
                <p className="font-bold text-ink text-xs leading-none">
                  {subject.counts?.notes ?? 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-line/40 bg-surface-2/60 px-3 py-2.5">
              <div className="rounded-lg bg-secondary/10 p-1.5 text-secondary">
                <ClipboardList size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/70 leading-none mb-1">
                  PYQs
                </p>
                <p className="font-bold text-ink text-xs leading-none">
                  {subject.counts?.pyqs ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}