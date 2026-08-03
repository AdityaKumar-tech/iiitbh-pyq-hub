// src/pages/SubjectPage.jsx

import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  AlertCircle,
  Search,
  X,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import SubjectHeader from "../components/SubjectHeader";
import Tabs from "../components/Tabs";
import ResourceRow from "../components/ResourceRow";
import Footer from "../components/Footer";

// Mock Data
const subjectsData = {
  3: {
    "data-structures": {
      name: "Data Structures & Algorithms",
      code: "CS301",
      instructor: "Prof. Sharma",
      department: "Computer Science",
      credits: 4,
      description:
        "Comprehensive study of fundamental data structures, algorithm design, asymptotic analysis, trees, graphs, and dynamic programming.",
      counts: {
        notes: 3,
        pyqs: 2,
      },
      notes: [
        {
          id: 1,
          title: "Unit 1 — Arrays, Strings & Linked Lists",
          meta: "PDF • 2.4 MB • Updated Jul 12",
          author: "Prof. Sharma",
          downloadUrl: "#",
          viewUrl: "#",
        },
        {
          id: 2,
          title: "Unit 2 — Stacks, Queues & Deques",
          meta: "PDF • 1.8 MB • Updated Jul 15",
          author: "Ankit Verma (TA)",
          downloadUrl: "#",
          viewUrl: "#",
        },
        {
          id: 3,
          title: "Unit 3 — Binary Trees & Heap Data Structures",
          meta: "PDF • 3.1 MB • Updated Jul 22",
          author: "Prof. Sharma",
          downloadUrl: "#",
          viewUrl: "#",
        },
      ],
      pyqs: [
        {
          id: 101,
          title: "End Semester Examination 2025 (With Answers)",
          meta: "PDF • 640 KB • Solved",
          year: "2025",
          author: "Examination Cell",
          downloadUrl: "#",
          viewUrl: "#",
        },
        {
          id: 102,
          title: "Mid Semester Examination 2024",
          meta: "PDF • 420 KB • Unsolved",
          year: "2024",
          author: "Examination Cell",
          downloadUrl: "#",
          viewUrl: "#",
        },
      ],
    },
  },
};

const tabs = [
  { key: "notes", label: "Lecture Notes", countKey: "notes", icon: FileText },
  { key: "pyqs", label: "Question Papers", countKey: "pyqs", icon: HelpCircle },
];

const tabIcons = {
  notes: FileText,
  pyqs: HelpCircle,
};

// Debounce hook for smooth filtering
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

function ResourceRowSkeleton() {
  return (
    <div className="rounded-card border border-line bg-surface p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-surface-2 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 bg-surface-2 rounded" />
          <div className="h-2.5 w-1/3 bg-surface-2 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function SubjectPage() {
  const { semesterId, subjectSlug } = useParams();
  const id = semesterId?.replace("semester-", "") || "3";
  const subject = subjectsData[id]?.[subjectSlug || "data-structures"];

  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebouncedValue(searchQuery, 300);
  const isSearching = searchQuery !== debouncedQuery;

  const sourceItems = useMemo(() => {
    if (!subject) return [];
    return subject[activeTab] || [];
  }, [subject, activeTab]);

  // Filter against debounced query
  const currentItems = useMemo(() => {
    if (!debouncedQuery.trim()) return sourceItems;

    const q = debouncedQuery.toLowerCase();
    return sourceItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        (item.author && item.author.toLowerCase().includes(q))
    );
  }, [sourceItems, debouncedQuery]);

  const ActiveIcon = tabIcons[activeTab] || FileText;

  // Not Found Fallback State
  if (!subject) {
    return (
      <div className="min-h-screen bg-background text-ink flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto px-6 py-28 text-center">
          <div className="w-20 h-20 rounded-3xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertCircle size={36} />
          </div>
          <h2 className="text-2xl font-black text-ink tracking-tight">
            Subject Not Found
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            The study material you're looking for might have been reorganized or is pending upload.
          </p>
          <Link
            to="/resources"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-surface font-semibold text-sm hover:bg-primary-light transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            <ArrowLeft size={16} /> Back to Resources
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300 flex flex-col justify-between selection:bg-primary/20">
      <div>
        <Navbar />

        <main className="relative overflow-hidden">
          {/* Ambient Light Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-linear-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none blur-3xl -z-10" />
          <div className="absolute top-32 right-12 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none -z-10" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-20">
            {/* Top Bar: Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Breadcrumb
                trail={[
                  { label: "Resources", to: "/resources" },
                  { label: `Semester ${id}`, to: `/resources/semester-${id}` },
                  { label: subject.name },
                ]}
              />
            </motion.div>

            {/* Subject Header Banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
            >
              <SubjectHeader subject={subject} semesterId={id} />
            </motion.div>

            {/* Content Control Area: Tabs & Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-2 sm:p-3 rounded-2xl border border-line/70 shadow-sm">
                {/* Tabs Component */}
                <Tabs
                  tabs={tabs.map((tab) => ({
                    ...tab,
                    count: subject.counts?.[tab.countKey] || subject[tab.key]?.length || 0,
                  }))}
                  active={activeTab}
                  onChange={(key) => {
                    setActiveTab(key);
                    setSearchQuery(""); // Clear search on tab switch
                  }}
                />

                {/* Search Input Box */}
                <div className="relative w-full md:w-72 shrink-0">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}...`}
                    className="w-full pl-10 pr-9 py-2 rounded-xl bg-surface-2/80 border border-line/60 text-xs text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary focus:bg-surface transition-all duration-200"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Resource List Output */}
              <div className="min-h-70">
                {isSearching ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <ResourceRowSkeleton key={i} />
                    ))}
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${debouncedQuery}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentItems.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted font-medium px-1 mb-1">
                            <span>
                              Showing {currentItems.length}{" "}
                              {currentItems.length === 1 ? "file" : "files"}
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <Sparkles size={12} /> Verified Material
                            </span>
                          </div>

                          {currentItems.map((item) => (
                            <ResourceRow
                              key={`${activeTab}-${item.id}`}
                              resource={item}
                              Icon={ActiveIcon}
                            />
                          ))}
                        </div>
                      ) : (
                        /* Empty State Container */
                        <div className="p-12 sm:p-16 rounded-card border border-dashed border-line bg-surface/50 text-center flex flex-col items-center justify-center">
                          <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-line text-muted flex items-center justify-center mb-3 shadow-xs">
                            <Search size={22} />
                          </div>
                          <h3 className="text-sm font-bold text-ink">
                            No matching resources found
                          </h3>
                          <p className="text-xs text-muted mt-1 max-w-xs leading-relaxed">
                            {debouncedQuery
                              ? `No results matching "${debouncedQuery}" in this category.`
                              : "There are no files uploaded in this section yet."}
                          </p>
                          {debouncedQuery && (
                            <button
                              onClick={() => setSearchQuery("")}
                              className="mt-4 px-4 py-1.5 rounded-lg bg-surface-2 text-xs font-semibold text-primary hover:bg-primary/10 border border-primary/20 transition-all"
                            >
                              Clear Search
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}