// src/pages/ResourcesSemesterPage.jsx
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SemesterGrid from "../components/SemesterGrid";
import Footer from "../components/Footer";

export default function ResourcesSemesterPage() {
  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300">

      <Navbar />

      <main className="relative overflow-hidden">

        {/* Background Glow */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div className="absolute -top-44 -left-36 h-112 w-md rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute top-64 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-20">

          {/* Breadcrumb */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Breadcrumb trail={[{ label: "Resources" }]} />
          </motion.div>

          {/* Header */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <PageHeader
              title="Resources"
              subtitle="Choose your semester to access notes, PYQs, assignments, lab manuals and more."
            />
          </motion.div>

          {/* Semester Grid */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <SemesterGrid />
          </motion.div>

        </div>

      </main>
      <Footer />

    </div>
  );
}