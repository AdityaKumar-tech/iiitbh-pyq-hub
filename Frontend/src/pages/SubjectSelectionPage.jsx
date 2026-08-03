// src/pages/SubjectSelectionPage.jsx

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import SubjectGrid from "../components/SubjectGrid";
import Footer from "../components/Footer";

const subjectsBySemester = {
  3: [
    {
      slug: "data-structures",
      name: "Data Structures & Algorithms",
      code: "CS301",
      instructor: "Prof. Sharma",
      counts: {
        notes: 12,
        pyqs: 6,
      },
    },
    {
      slug: "digital-electronics",
      name: "Digital Electronics",
      code: "EC302",
      instructor: "Prof. Verma",
      counts: {
        notes: 9,
        pyqs: 5,
      },
    },
  ],
};

export default function SubjectSelectionPage() {
  const { semesterId } = useParams();

  const id = semesterId?.replace("semester-", "");

  const subjects = subjectsBySemester[id] || [];

  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300">

      <Navbar />

      <main className="relative overflow-hidden">

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

          {/* Subject Grid */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >

            {subjects.length > 0 ? (
              <SubjectGrid
                subjects={subjects}
                semesterId={id}
              />
            ) : (
              <div className="rounded-3xl border border-line bg-surface/80 backdrop-blur-xl shadow-rest py-20 text-center">

                <h3 className="text-2xl font-bold text-ink">
                  No Subjects Available
                </h3>

                <p className="mt-4 text-muted">
                  Subjects for Semester {id} haven't been added yet.
                </p>

              </div>
            )}

          </motion.div>

        </div>

      </main>

      <Footer />

    </div>
  );
}