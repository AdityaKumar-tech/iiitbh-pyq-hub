// src/components/Footer.jsx

import { Link } from "react-router-dom";
import { Mail, Heart, ArrowUpRight, ArrowUp } from "lucide-react";

function InstagramIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const exploreLinks = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/mentors", label: "Mentors" },
  { to: "/about", label: "About" },
];

const resourceLinks = [
  { to: "/resources/notes", label: "Notes" },
  { to: "/resources/papers", label: "Previous year papers" },
  { to: "/resources/labs", label: "Lab manuals" },
  { to: "/resources/assignments", label: "Assignments" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

        <div className="grid lg:grid-cols-12 gap-y-14 gap-x-8 pb-16">

          {/* Brand */}

          <div className="lg:col-span-5">

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full border border-secondary/40 bg-primary flex items-center justify-center">
                <span className="font-serif text-xl text-secondary-light leading-none">
                  अ
                </span>
              </div>
              <div>
                <h2 className="font-serif text-2xl text-ink tracking-tight">
                  Adhyaay
                </h2>
                <p className="text-xs uppercase tracking-widest text-muted mt-0.5">
                  Academic resource hub
                </p>
              </div>
            </div>

            <p className="mt-7 text-muted leading-7 max-w-sm">
              Notes, previous year papers, assignments and lab manuals for
              every semester — organized in one place for the students of
              IIIT Bhagalpur.
            </p>

            

          </div>

          {/* Explore */}

          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-muted mb-6">
              Explore
            </h3>
            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ink/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}

          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-widest text-muted mb-6">
              Resources
            </h3>
            <ul className="space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ink/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}

          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-widest text-muted mb-6">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/adhyaayiiitbh/"
                aria-label="LinkedIn"
                target="blank"
                className="h-10 w-10 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/adhyaay_iiitbh?igsh=MWx6MndmN2wzdXNzZQ=="
                target="blank"
                aria-label="Instagram"
                className="h-10 w-10 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}

        <div className="h-px bg-line" />

        {/* Bottom bar */}

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-8">

          <p className="text-xs text-muted text-center md:text-left">
            © {year} Adhyaay. Built by and for the students of IIIT Bhagalpur.
          </p>

          <div className="flex items-center gap-6">
            <p className="flex items-center gap-1.5 text-xs text-muted">
              Made with
              <Heart size={13} className="fill-secondary text-secondary" />
              in Bhagalpur
            </p>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="h-9 w-9 rounded-full border border-line flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowUp size={15} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}