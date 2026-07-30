// src/components/Tabs.jsx
import { motion } from "framer-motion";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-line mb-8 -mx-1 px-1">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative shrink-0 pb-3 pt-1 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="subject-tab-indicator"
                className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}