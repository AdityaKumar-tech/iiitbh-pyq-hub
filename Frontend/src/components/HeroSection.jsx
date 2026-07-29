// src/components/HeroSection.jsx
import { motion } from "framer-motion";
import PathIndicator from "./PathIndicator";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
            Everything you need for
            <span className="text-[#4F46E5]"> this semester</span>.
          </h1>
          <p className="mt-5 text-base text-[#64748B] max-w-md leading-relaxed">
            Notes, PYQs, assignments, lab manuals, and syllabus — organized by
            semester and subject, so you never dig for material again.
          </p>
          <div className="mt-8 max-w-md">
            <SearchBar />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center"
        >
          <PathIndicator />
        </motion.div>
      </div>
    </section>
  );
}