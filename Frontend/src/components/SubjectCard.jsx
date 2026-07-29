// src/components/SubjectCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, ClipboardList, FlaskConical, BookOpen } from "lucide-react";

import { resourceTypes } from "../lib/resourceTypes";

export default function SubjectCard({ subject, semesterId, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Link
        to={`/resources/semester-${semesterId}/${subject.slug}`}
        className="group block rounded-card border border-line bg-white p-6 shadow-rest hover:shadow-hover hover:-translate-y-1 transition-all duration-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={18} className="text-primary" />
          </div>
          <span className="text-[11px] font-semibold text-muted bg-[#F1F5F9] px-2 py-1 rounded-md">
            {subject.code}
          </span>
        </div>

        <h3 className="text-[15px] font-semibold text-ink leading-snug mb-1">
          {subject.name}
        </h3>
        <p className="text-xs text-muted mb-4">{subject.instructor}</p>

        <div className="flex items-center gap-4 pt-4 border-t border-line">
          {Object.entries(subject.counts).map(([type, count]) => {
            const Icon = resourceTypes[type]?.icon;
            return (
              <span key={type} className="flex items-center gap-1.5 text-xs text-muted">
                <Icon size={13} />
                {count}
              </span>
            );
          })}
        </div>
      </Link>
    </motion.div>
  );
}