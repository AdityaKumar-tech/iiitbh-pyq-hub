// src/components/MentorCard.jsx

import { Sparkles, ArrowUpRight, Award } from "lucide-react";

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export default function MentorCard({ mentor }) {
  // Extract initials for fallback avatar
  const initials = mentor?.name
    ? mentor.name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "M";

  return (
    <div className="group relative overflow-hidden rounded-card border border-line/80 bg-surface p-5 shadow-rest transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:border-primary/30 flex flex-col justify-between">
      {/* Background Decorative Ambient Gradient */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-300 pointer-events-none" />

      <div>
        {/* Top Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar / Image Handler */}
            {mentor.image || mentor.avatar ? (
              <img
                src={mentor.image || mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 shrink-0 rounded-full object-cover border border-line ring-2 ring-surface shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-12 h-12 shrink-0 rounded-full bg-linear-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm tracking-wide group-hover:scale-105 transition-transform duration-300">
                {initials}
              </div>
            )}

            {/* Name & Role */}
            <div className="min-w-0">
              <h4 className="text-[15px] font-bold text-ink truncate group-hover:text-primary transition-colors duration-200">
                {mentor.name}
              </h4>
              <p className="text-xs text-muted/90 truncate font-medium mt-0.5">
                {mentor.role || mentor.title || "Academic Mentor"}
              </p>
            </div>
          </div>

          {/* Optional Badge / Level Tag */}
          {mentor.tag && (
            <span className="shrink-0 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
              {mentor.tag}
            </span>
          )}
        </div>

        {/* Specialty / Bio Section */}
        {mentor.specialty && (
          <div className="mt-4 pt-3.5 border-t border-line/60">
            <div className="flex items-start gap-2">
              <Sparkles
                size={14}
                className="text-secondary shrink-0 mt-0.5"
              />
              <p className="text-xs text-muted leading-relaxed line-clamp-2">
                {mentor.specialty}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links & Actions */}
      <div className="mt-5 pt-3 border-t border-line/40 flex items-center justify-between text-xs">
        {mentor.linkedin ? (
          <a
            href={mentor.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-primary transition-colors duration-200"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-primary" />
            <span>Connect</span>
            <ArrowUpRight size={12} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        ) : (
          <span className="text-[11px] text-muted/60 flex items-center gap-1">
            <Award size={12} /> Verified Mentor
          </span>
        )}

        {mentor.sessions && (
          <span className="text-[11px] font-medium text-muted/80 bg-surface-2 px-2 py-0.5 rounded-md border border-line/40">
            {mentor.sessions} sessions
          </span>
        )}
      </div>
    </div>
  );
}