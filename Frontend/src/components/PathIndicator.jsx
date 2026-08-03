// src/components/PathIndicator.jsx

import { motion } from "framer-motion";
import { Layers, BookOpen, FileText, ChevronRight } from "lucide-react";

const steps = [
  {
    label: "Semester",
    icon: Layers,
    color: "from-indigo-500 to-violet-500",
  },
  {
    label: "Subject",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Resource",
    icon: FileText,
    color: "from-orange-500 to-amber-500",
  },
];

export default function PathIndicator() {
  return (
    <div className="relative w-full max-w-lg">

      {/* Background Glow */}

      <div className="absolute inset-0 rounded-4xl bg-primary/5 blur-3xl" />

      <div className="relative rounded-[30px] border border-line bg-surface/80 backdrop-blur-xl shadow-hover p-8 overflow-hidden">

        {/* Decorative Gradient */}

        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary via-violet-500 to-cyan-500" />

        {/* Animated Line */}

        <div className="absolute top-17 left-17.5 right-17.5 h-0.5 bg-line">

          <motion.div
            className="h-full rounded-full bg-linear-to-r from-primary to-violet-500"
            animate={{
              width: ["0%", "50%", "100%", "0%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>

        <div className="relative flex items-center justify-between">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.label}
                className="flex flex-col items-center text-center group"
              >

                <motion.div
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${step.color} shadow-lg`}
                >

                  <Icon
                    size={24}
                    className="text-white"
                  />

                </motion.div>

                <h4 className="mt-4 font-semibold text-ink">
                  {step.label}
                </h4>

                <p className="mt-1 text-xs text-muted">
                  Step {index + 1}
                </p>

              </div>
            );
          })}

        </div>

        {/* Bottom */}

        <div className="mt-10 flex items-center justify-center gap-2 text-sm font-medium text-muted">

          <span>
            Every resource in just
          </span>

          <span className="font-semibold text-primary">
            3 clicks
          </span>

          <ChevronRight
            size={16}
            className="text-primary"
          />

        </div>

      </div>

    </div>
  );
}