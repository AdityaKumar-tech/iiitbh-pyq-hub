import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import PageHeader from "../components/PageHeader";
import MentorGrid from "../components/MentorGrid";
import Footer from "../components/Footer";

const SAMPLE_MENTORS = [
  // {
  //   id: "1",
  //   name: "Ankit Sharma",
  //   linkedin: "https://linkedin.com/in/ankitsharma",
  //   specialty: "Competitive Programming & DSA Interview Prep", // optional
  // },
  
];

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    async function fetchMentors() {
      try {
        setStatus("loading");

        // Fake API
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!cancelled) {
          setMentors(SAMPLE_MENTORS);
          setStatus("success");
        }

        // Replace above with your real API later.

      } catch {
        if (!cancelled) {
          setStatus("error");
        }
      }
    }

    fetchMentors();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300">

      <Navbar />

      <main className="relative overflow-hidden">

        {/* Background Glow */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div className="absolute -top-44 -left-36 h-120 w-120 rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute top-80 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-400/5" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-24">

          {/* Breadcrumb */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Breadcrumb trail={[{ label: "Mentors" }]} />
          </motion.div>

          {/* Header */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <PageHeader
              title="Mentors"
              subtitle="Connect with seniors and alumni on LinkedIn for guidance, projects, internships and interview preparation."
            />
          </motion.div>

          {/* Content */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            {status === "loading" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-line bg-surface/80 backdrop-blur-xl p-6 shadow-rest animate-pulse"
                  >
                    <div className="flex items-center gap-4">

                      <div className="h-14 w-14 rounded-full bg-surface-2" />

                      <div className="flex-1 space-y-3">

                        <div className="h-4 w-2/3 rounded bg-surface-2" />

                        <div className="h-3 w-1/2 rounded bg-surface-2" />

                      </div>

                    </div>

                    <div className="mt-6 space-y-3">

                      <div className="h-3 w-full rounded bg-surface-2" />

                      <div className="h-3 w-4/5 rounded bg-surface-2" />

                    </div>

                  </div>
                ))}

              </div>
            )}

            {status === "error" && (
              <div className="rounded-3xl border border-line bg-surface/80 backdrop-blur-xl p-16 shadow-rest text-center">

                <h3 className="text-xl font-bold text-ink">
                  Unable to load mentors
                </h3>

                <p className="mt-3 text-muted">
                  Something went wrong while fetching mentors.
                  Please refresh the page and try again.
                </p>

              </div>
            )}

            {status === "success" && (
              <MentorGrid mentors={mentors} />
            )}

          </motion.div>

        </div>

      </main>

      <Footer />

    </div>
  );
}