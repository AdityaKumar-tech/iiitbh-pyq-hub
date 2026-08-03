// src/components/RecentResources.jsx

import { motion } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

const resources = [
  {
    title: "Data Structures — Unit 4 Notes",
    subject: "DSA",
    type: "Notes",
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Operating Systems Mid-Sem PYQ 2024",
    subject: "Operating Systems",
    type: "PYQ",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "DBMS Lab Manual",
    subject: "DBMS",
    type: "Lab Manual",
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Computer Networks Assignment 2",
    subject: "CN",
    type: "Assignment",
    color: "from-pink-500 to-rose-500",
  },
];

export default function RecentResources() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}

      <div className="flex items-end justify-between mb-10">

        <div>
          <p className="font-semibold text-primary mb-2">
            Latest Uploads
          </p>

          <h2 className="text-4xl font-black tracking-tight text-ink">
            Recently Uploaded
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2 text-muted text-sm">
          <Clock3 size={16} />
          Updated regularly
        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {resources.map((resource, index) => (

          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.45,
            }}
          >

            <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-rest hover:shadow-hover transition-all duration-500 hover:-translate-y-2">

              {/* Glow */}

              <div
                className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-linear-to-br ${resource.color} blur-3xl opacity-10 group-hover:opacity-25 transition-all duration-500`}
              />

              <div className="relative p-6 flex flex-col h-full">

                {/* Icon */}

                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${resource.color} shadow-lg`}
                >
                  <FileText
                    size={22}
                    className="text-white"
                  />
                </div>

                {/* Badge */}

                <span className="mt-5 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {resource.type}
                </span>

                {/* Title */}

                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">
                  {resource.title}
                </h3>

                {/* Subject */}

                <p className="mt-2 text-sm text-muted">
                  {resource.subject}
                </p>

                <div className="mt-auto pt-8 flex items-center justify-between">

                  <span className="text-sm text-muted">
                    Recently Added
                  </span>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${resource.color} text-white shadow-lg group-hover:rotate-45 transition-transform duration-500`}
                  >
                    <ArrowUpRight size={18} />
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}