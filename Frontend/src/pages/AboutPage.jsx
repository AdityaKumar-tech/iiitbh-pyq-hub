// src/pages/AboutPage.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Compass,
  Heart,
  BookOpen,
  Users,
  GitPullRequest,
  Upload,
  MessageCircle,
  Sparkles,
  Mail,
  GraduationCap,
  Briefcase,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// GitHub mark as inline SVG — lucide-react dropped brand/logo icons
// (Github, Twitter, etc.) in recent versions, so brand marks now
// need to be inlined directly rather than imported.
function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.814 1.103.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.192.694.8.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12" />
    </svg>
  );
}

// LinkedIn inline SVG for the connect button
function LinkedInIcon({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Converts a Google Drive sharing URL to a direct-embeddable thumbnail URL.
 * Supports formats:
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/file/d/FILE_ID/view...
 *   - https://drive.google.com/uc?id=FILE_ID
 *   - raw FILE_ID string
 *
 * Returns a thumbnail URL like:
 *   https://drive.google.com/thumbnail?id=FILE_ID&sz=w400
 */
function getGDriveThumbnail(url, size = 400) {
  if (!url) return null;

  let fileId = url;

  // Extract ID from /open?id=...
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  // Extract ID from /file/d/.../
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

const values = [
  {
    icon: Compass,
    title: "Built by students, for students",
    description:
      "Every feature exists because a real IIITBH student needed it — not because a syllabus said so.",
  },
  {
    icon: Heart,
    title: "Free, always",
    description:
      "No paywalls, no ads, no premium tier. Academic material should never be locked behind a price tag.",
  },
  {
    icon: Sparkles,
    title: "Quality over clutter",
    description:
      "One verified PDF beats ten duplicate uploads. We'd rather have less, and have it be right.",
  },
];

// ──────────────────────────────────────────────────────────────
//  LEADS DATA
// ──────────────────────────────────────────────────────────────
const leads = [
  {
    name: "Twinkle kumari",
    branch: "CSE",
    year: "3rd Year",
    linkedin: "https://www.linkedin.com/in/twinkle-kumari-b09306325",
    speciality: "Adhyaay GS | Web Developer | DSA C++ | Sports",
    photoUrl: "https://drive.google.com/open?id=1hdlwK5Bnb0qT7-LLaYRBlVZ8XPw8WCsI",
  },
  {
    name: "Rudra Narayan Chaturvedi ",
    branch: "CSE",
    year: "3rd Year",
    linkedin: "https://www.linkedin.com/in/rudra-narayan-chaturvedi-b91160328",
    speciality: "Adhyaay Coordinator | Interested in Backend development",
    photoUrl: "https://drive.google.com/open?id=1TGdhcLeWn37fERG16-1-p0yGlJkgx5FY",
  },
  {
    name: "Aakanksha",
    branch: "CSE",
    year: "3rd Year",
    linkedin: "https://www.linkedin.com/in/aakanksha-5b4494358",
    speciality: "Currently working on DSA along with Web Development and right now I am a strategy lead in Adhyaay",
    photoUrl: "https://drive.google.com/open?id=1PaONYynqx-KAHmfo8POy-R7_zhmwRepG",
  },
  {
    // Missing Lead
    name: "Open Seat",
    branch: null,
    year: null,
    linkedin: null,
    speciality: "Looking for a Contributor",
    photoUrl: null,
  },
];

const contributeSteps = [
  {
    icon: Upload,
    title: "Share your notes",
    description:
      "Got clean notes, a solved PYQ, or a lab manual? Send them in — every subject benefits from one more good upload.",
  },
  {
    icon: GitPullRequest,
    title: "Contribute code",
    description:
      "Adhyaay is open on GitHub. Bug fixes, new features, or UI polish — pull requests are always welcome.",
  },
  {
    icon: MessageCircle,
    title: "Report what's missing",
    description:
      "Found a broken link, an outdated PYQ, or a subject with nothing uploaded yet? Flag it and we'll sort it out.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-ink transition-colors duration-300 flex flex-col justify-between selection:bg-primary/20">
      <div>
        <Navbar />

        <main className="relative overflow-hidden">
          {/* ================= HERO ================= */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -left-20 h-64 w-64 sm:-top-40 sm:-left-32 sm:h-96 sm:w-96 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 right-0 h-64 w-64 sm:-bottom-40 sm:h-96 sm:w-96 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-rest">
                  <BookOpen size={14} />
                  About Adhyaay
                </span>

                <h1 className="mt-5 sm:mt-6 text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
                  One place for everything
                  <span className="block mt-1 sm:mt-2 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    IIIT Bhagalpur needs.
                  </span>
                </h1>

                <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-muted leading-relaxed max-w-xl mx-auto">
                  Adhyaay started as a simple frustration — hunting through
                  scattered Google Drive links and WhatsApp forwards just to
                  find last year's question paper. It shouldn't be this hard.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ================= OUR VISION ================= */}
          <section className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-hero bg-surface border border-line p-6 sm:p-10 shadow-rest"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Compass size={18} className="text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Our Vision
                </h2>
              </div>

              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-3xl">
                We believe no student at IIITBH should ever lose marks — or
                sleep — because material was hard to find rather than hard to
                learn. Adhyaay's vision is a single, always-current,
                completely free academic hub where every semester's notes,
                question papers, and resources are one search away. Not a
                startup chasing scale — a tool built to quietly make campus
                life easier, year after year, batch after batch.
              </p>

              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-3xl font-black text-ink">100%</p>
                  <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                    Free forever
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-3xl font-black text-ink">8</p>
                  <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                    Semesters covered
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-3xl font-black text-ink">1</p>
                  <p className="text-[11px] sm:text-sm text-muted mt-0.5 sm:mt-1">
                    Campus, one home
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* ================= ABOUT ADHYAAY (values) ================= */}
          <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                About Adhyaay
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted max-w-xl mx-auto">
                A student-built, student-run academic resource portal — here's
                what shapes every decision we make.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="group rounded-card bg-surface border border-line p-5 sm:p-6 shadow-rest hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                    <value.icon size={18} className="text-secondary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ================= THE LEADS ================= */}
          <section className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5 mb-8 sm:mb-10"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Users size={18} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  The Leads
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  The people steering Adhyaay forward
                </p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {leads.map((lead, i) => {
                const isOpenSeat = !lead.linkedin;
                const thumbnail = getGDriveThumbnail(lead.photoUrl);

                return (
                  <motion.div
                    key={lead.name + i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                    className={`rounded-card border p-5 sm:p-6 shadow-rest transition-all duration-300 ${
                      !isOpenSeat
                        ? "bg-surface border-line hover:shadow-hover hover:-translate-y-0.5"
                        : "bg-surface-2/60 border-dashed border-line"
                    }`}
                  >
                    {/* ── Photo + Identity ── */}
                    <div className="flex items-center gap-3.5">
                      {thumbnail ? (
                        <img
                          src={thumbnail}
                          alt={lead.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 shrink-0"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to initials if GDrive image fails
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Initials fallback (hidden when photo loads, visible when no photo) */}
                      <div
                        className={`w-14 h-14 rounded-full items-center justify-center text-sm font-bold shrink-0 ${
                          !isOpenSeat
                            ? "bg-primary/10 text-primary"
                            : "bg-surface-2 text-muted border border-dashed border-line"
                        }`}
                        style={{ display: thumbnail ? "none" : "flex" }}
                      >
                        {isOpenSeat
                          ? "?"
                          : lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-ink truncate">
                          {lead.name}
                        </p>

                        {/* Branch & Year badges */}
                        {lead.branch && lead.year ? (
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-secondary">
                              <GraduationCap size={11} />
                              {lead.branch}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-primary">
                              {lead.year}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs text-secondary font-medium mt-0.5">
                            {lead.speciality}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ── Speciality / Area of Interest ── */}
                    {!isOpenSeat && lead.speciality && (
                      <div className="mt-4 flex items-center gap-1.5">
                        <Briefcase size={13} className="text-muted shrink-0" />
                        <p className="text-xs sm:text-sm text-muted leading-relaxed">
                          {lead.speciality}
                        </p>
                      </div>
                    )}

                    {/* ── LinkedIn / CTA ── */}
                    {!isOpenSeat ? (
                      <a
                        href={lead.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${lead.name} on LinkedIn`}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-light transition-colors"
                      >
                        <LinkedInIcon size={13} />
                        Connect on LinkedIn
                      </a>
                    ) : (
                      <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed">
                        Content curation, backend help, or campus outreach —
                        there's room for you here.
                      </p>
                    )}

                    {isOpenSeat && (
                      <Link
                        to="/about#contribute"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary-light transition-colors"
                      >
                        <Mail size={13} />
                        This could be you
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ================= HOW TO CONTRIBUTE ================= */}
          <section
            id="contribute"
            className="relative max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                How to Contribute
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted max-w-xl mx-auto">
                Adhyaay grows only as fast as the people who care about it.
                Here's how to help.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              {contributeSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="relative rounded-card bg-surface border border-line p-5 sm:p-6 shadow-rest hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="absolute top-4 right-4 sm:top-5 sm:right-5 text-2xl sm:text-3xl font-black text-line select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <step.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink pr-8">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-8 sm:mt-10 rounded-hero bg-linear-to-r from-primary to-primary-light p-6 sm:p-10 text-center shadow-hover"
            >
              <h3 className="text-lg sm:text-2xl font-bold text-surface tracking-tight">
                Have something to share?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-surface/80 max-w-md mx-auto leading-relaxed">
                Every note you upload saves someone else hours before an exam.
              </p>
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://github.com/AdityaKumar-tech/iiitbh-pyq-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface text-primary font-semibold text-sm hover:bg-surface-2 transition-all duration-200 active:scale-[0.98]"
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
                <Link
                  to="/resources"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-surface/30 text-surface font-semibold text-sm hover:bg-surface/10 transition-all duration-200"
                >
                  Browse Resources
                </Link>
              </div>
            </motion.div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
