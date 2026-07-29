// src/components/SemesterGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

export default function SemesterGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-[#0F172A] tracking-tight mb-8">
        Browse by semester
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {semesters.map((sem, i) => (
          <motion.div
            key={sem}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              to={`/resources/semester-${sem}`}
              className="block rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="text-xs font-medium text-[#64748B]">Semester</span>
              <p className="text-2xl font-semibold text-[#0F172A] mt-1">{sem}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}