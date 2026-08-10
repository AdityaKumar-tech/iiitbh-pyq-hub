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

import pyqData from "../data/pyq-data.json";
import { fetchPYQsFromDrive } from "../lib/driveApi";

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
  const id = parseInt(semesterId?.replace("semester-", "") || "1");
  const semesterObj = pyqData.semesters.find((s) => s.semester_number === id);
  const subject = semesterObj?.subjects.find((s) => s.slug === subjectSlug);

  const [sourceItems, setSourceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("pyqs");

  useEffect(() => {
    let folderIdToFetch = null;
    if (subject) {
      if (activeTab === "pyqs" && subject.pyqs_folder_id) {
         folderIdToFetch = subject.pyqs_folder_id;
      } else if (activeTab === "notes" && subject.notes_folder_id) {
         folderIdToFetch = subject.notes_folder_id;
      }
    }

    if (folderIdToFetch) {
      setLoading(true);
      setError(null);
      fetchPYQsFromDrive(folderIdToFetch).then((result) => {
        if (result && result.error) {
          setError(result.error);
          setSourceItems([]);
        } else {
          setSourceItems(Array.isArray(result) ? result : []);
        }
        setLoading(false);
      });
    } else {
      setSourceItems([]);
      setError(null);
      setLoading(false);
    }
  }, [subject, activeTab]);

  const ActiveIcon = FileText;

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

            {/* Content Control Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.4 }}
              className="mt-8"
            >

              <Tabs
                tabs={[
                  { key: "pyqs", label: "PYQs" },
                  { key: "notes", label: "Notes" }
                ]}
                active={activeTab}
                onChange={setActiveTab}
              />

              {/* Resource List Output */}
              <div className="min-h-70">
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <ResourceRowSkeleton key={i} />
                    ))}
                  </div>
                ) : error ? (
                  <div className="p-12 sm:p-16 rounded-card border border-red-500/20 bg-red-500/5 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-3 shadow-xs">
                      <AlertCircle size={22} />
                    </div>
                    <h3 className="text-sm font-bold text-ink">
                      Failed to load files
                    </h3>
                    <p className="text-xs text-red-400 mt-1 max-w-md leading-relaxed font-medium">
                      {error}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key="resource-list"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {sourceItems.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted font-medium px-1 mb-1">
                            <span>
                              Showing {sourceItems.length}{" "}
                              {sourceItems.length === 1 ? "file" : "files"}
                            </span>
                            <span className="flex items-center gap-1 text-primary">
                              <Sparkles size={12} /> Verified Material
                            </span>
                          </div>

                          {sourceItems.map((item) => (
                            <ResourceRow
                              key={item.id}
                              resource={item}
                              Icon={ActiveIcon}
                            />
                          ))}
                        </div>
                      ) : (
                        /* Empty State Container */
                        <div className="p-12 sm:p-16 rounded-card border border-dashed border-line bg-surface/50 text-center flex flex-col items-center justify-center">
                          <div className="w-14 h-14 rounded-2xl bg-surface-2 border border-line text-muted flex items-center justify-center mb-3 shadow-xs">
                            <FileText size={22} />
                          </div>
                          <h3 className="text-sm font-bold text-ink">
                            No files available
                          </h3>
                          <p className="text-xs text-muted mt-1 max-w-xs leading-relaxed">
                            There are no files uploaded in this subject yet.
                          </p>
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