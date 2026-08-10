// src/pages/SubjectSelectionPage.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SubjectGrid from "../components/SubjectGrid";
import Footer from "../components/Footer";
import pyqData from "../data/pyq-data.json";

const BRANCHES = [
  { id: "cse", label: "CSE" },
  { id: "ece", label: "ECE" },
  { id: "mnc", label: "MNC" },
  { id: "mae", label: "MAE" },
];

export default function SubjectSelectionPage() {
  const { semesterId } = useParams();
  const id = parseInt(semesterId?.replace("semester-", ""));
  
  const [activeBranch, setActiveBranch] = useState("cse");

  const semesterObj = pyqData.semesters.find(s => s.semester_number === id);
  const subjects = semesterObj ? semesterObj.subjects : [];

  
  const filteredSubjects = subjects.filter(subject => subject.branch === activeBranch || !subject.branch);

  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300 flex flex-col">

      <Navbar />

      <main className="relative overflow-hidden flex-1">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-32 h-112 w-md rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-72 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-20">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Breadcrumb
              trail={[
                {
                  label: "Resources",
                  to: "/resources",
                },
                {
                  label: `Semester ${id}`,
                },
              ]}
            />
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <PageHeader
              title={`Semester ${id}`}
              subtitle="Choose a subject to access Notes and Previous Year Questions."
            />
          </motion.div>

          {/* Branch Filter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-3 items-center"
          >
            {BRANCHES.map((branch) => {
              const isActive = activeBranch === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => setActiveBranch(branch.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white bg-primary shadow-md shadow-primary/25"
                      : "text-muted hover:text-ink bg-surface border border-line/60 hover:bg-surface-2 hover:border-line"
                  }`}
                >
                  <span className="relative z-10">{branch.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-branch-pill"
                      className="absolute inset-0 bg-primary rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Subject Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filteredSubjects.length > 0 ? (
                  <SubjectGrid
                    subjects={filteredSubjects}
                    semesterId={id}
                  />
                ) : (
                  <div className="rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-rest py-20 text-center">
                    <h3 className="text-2xl font-bold text-ink">
                      No Subjects Found
                    </h3>
                    <p className="mt-4 text-muted">
                      No subjects available for the selected branch in Semester {id}.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </main>

      <Footer />

    </div>
  );
}