// src/components/AnnouncementCard.jsx
import { motion } from "framer-motion";
import { Pin } from "lucide-react";

export default function AnnouncementCard({ item, pinned = false, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`rounded-card bg-white p-5 shadow-rest hover:shadow-hover transition-shadow duration-200 ${
        pinned ? "border-l-[3px] border-l-primary border-y border-r border-line" : "border border-line"
      }`}
    >
      {pinned && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md mb-3">
          <Pin size={11} /> Pinned
        </span>
      )}
      <h3 className="text-[15px] font-semibold text-ink leading-snug mb-1.5">
        {item.title}
      </h3>
      <p className="text-[13.5px] text-muted leading-relaxed mb-3">{item.body}</p>
      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
        <span>{item.date}</span>
        <span>·</span>
        <span>{item.category}</span>
      </div>
    </motion.div>
  );
}