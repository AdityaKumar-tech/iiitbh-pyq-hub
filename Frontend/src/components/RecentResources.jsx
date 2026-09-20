// src/components/RecentResources.jsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  Clock3,
  Sparkles,
} from "lucide-react";
import pyqData from "../data/pyq-data.json";
import { fetchRecentResourcesFromDrive } from "../lib/driveApi";

const FALLBACK_RESOURCES = [
  {
    id: "fallback-1",
    title: "Data Structures — Unit 4 Notes",
    subject: "Data Structures",
    semNumber: 3,
    type: "Notes",
    subInfo: "Sem 3 • Data Structures",
    color: "from-indigo-500 to-violet-500",
    viewUrl: "/resources/semester-3/data-structures",
  },
  {
    id: "fallback-2",
    title: "Operating Systems Mid-Sem PYQ 2024",
    subject: "Operating Systems",
    semNumber: 5,
    type: "PYQ",
    subInfo: "Sem 5 • Operating Systems",
    color: "from-emerald-500 to-teal-500",
    viewUrl: "/resources/semester-5/os",
  },
  {
    id: "fallback-3",
    title: "DBMS Lab Manual & Query Sheet",
    subject: "DBMS",
    semNumber: 5,
    type: "Lab Manual",
    subInfo: "Sem 5 • DBMS",
    color: "from-orange-500 to-amber-500",
    viewUrl: "/resources/semester-5/dbms",
  },
  {
    id: "fallback-4",
    title: "Computer Networks Assignment 2",
    subject: "Computer Networks",
    semNumber: 6,
    type: "Assignment",
    subInfo: "Sem 6 • Computer Networks",
    color: "from-pink-500 to-rose-500",
    viewUrl: "/resources/semester-6/computer-networks",
  },
];

function ResourceSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-line bg-surface/80 p-6 flex flex-col justify-between animate-pulse">
      <div>
        <div className="h-12 w-12 rounded-2xl bg-surface-2" />
        <div className="mt-5 h-5 w-20 rounded-full bg-surface-2" />
        <div className="mt-5 h-6 w-3/4 rounded-md bg-surface-2" />
        <div className="mt-2 h-4 w-1/2 rounded-md bg-surface-2" />
      </div>
      <div className="mt-8 pt-4 flex items-center justify-between">
        <div className="h-4 w-24 rounded-md bg-surface-2" />
        <div className="h-10 w-10 rounded-full bg-surface-2" />
      </div>
    </div>
  );
}

export default function RecentResources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchRecentResourcesFromDrive(pyqData).then((driveItems) => {
      if (isMounted) {
        if (driveItems && driveItems.length > 0) {
          setItems(driveItems);
        } else {
          setItems(FALLBACK_RESOURCES);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-semibold text-primary mb-2 flex items-center gap-1.5">
            <Sparkles size={16} /> Latest Uploads
          </p>

          <h2 className="text-4xl font-black tracking-tight text-ink">
            Recently Uploaded
          </h2>
        </div>

        <div className="hidden md:flex items-center gap-2 text-muted text-sm font-medium">
          <Clock3 size={16} className="text-primary" />
          Updated regularly
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 min-h-[320px]">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ResourceSkeleton key={i} />
          ))
        ) : (
          items.map((resource, index) => {
            const isExternal = resource.viewUrl?.startsWith("http");
            return (
              <motion.div
                key={resource.id || resource.title + index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
              >
                <a
                  href={resource.viewUrl || "#"}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-rest hover:shadow-hover transition-all duration-500 hover:-translate-y-2 p-6"
                >
                  {/* Ambient Glow */}
                  <div
                    className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-linear-to-br ${resource.color || "from-primary to-secondary"} blur-3xl opacity-10 group-hover:opacity-25 transition-all duration-500`}
                  />

                  <div className="relative flex flex-col h-full">
                    {/* Top Icon */}
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${resource.color || "from-primary to-secondary"} shadow-lg shrink-0`}
                    >
                      <FileText size={22} className="text-white" />
                    </div>

                    {/* Type Badge */}
                    <span className="mt-5 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20">
                      {resource.type}
                    </span>

                    {/* Clean Title */}
                    <h3 className="mt-4 text-lg font-bold leading-snug text-ink group-hover:text-primary transition-colors duration-200 line-clamp-2">
                      {resource.title}
                    </h3>

                    {/* Sem & Subject Badge */}
                    <p className="mt-2 text-sm text-muted font-medium">
                      {resource.subInfo || (resource.semNumber ? `Sem ${resource.semNumber} • ${resource.subject}` : resource.subject)}
                    </p>

                    {/* Bottom Action Footer */}
                    <div className="mt-auto pt-8 flex items-center justify-between">
                      <span className="text-sm text-muted font-medium">
                        Recently Added
                      </span>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br ${resource.color || "from-primary to-secondary"} text-white shadow-lg group-hover:rotate-45 transition-transform duration-500 shrink-0`}
                      >
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })
        )}
      </div>

    </section>
  );
}