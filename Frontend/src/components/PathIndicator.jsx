// src/components/PathIndicator.jsx
import { motion } from "framer-motion";
import { Layers, BookOpen, FileText } from "lucide-react";

const steps = [
  { label: "Semester", icon: Layers },
  { label: "Subject", icon: BookOpen },
  { label: "Resource", icon: FileText },
];

export default function PathIndicator() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="flex items-center justify-between relative">
        {/* connecting line */}
        <div className="absolute top-6 left-6 right-6 h-px bg-[#E2E8F0]" />

        {/* travelling dot */}
        <motion.div
          className="absolute top-5.5 w-2 h-2 rounded-full bg-[#4F46E5]"
          animate={{ left: ["4%", "48%", "92%", "4%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="relative flex flex-col items-center gap-2 z-10">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center shadow-sm">
                <Icon size={18} className="text-[#4F46E5]" />
              </div>
              <span className="text-xs font-medium text-[#64748B]">{step.label}</span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-[#64748B] mt-4">
        Every resource, three clicks away.
      </p>
    </div>
  );
}