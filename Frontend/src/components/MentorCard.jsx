// src/components/MentorCard.jsx
import { Sparkles } from "lucide-react";

function LinkedinIcon(props) {
   return (
     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
       <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
     </svg>
   );
 }

export default function MentorCard({ mentor }) {
  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-rest hover:shadow-hover hover:-translate-y-1 transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
          {mentor.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-ink truncate">{mentor.name}</p>
          {mentor.linkedin && (
            <a
              href={mentor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2 transition-all mt-1"
            >
              <LinkedinIcon className="w-3.25 h-3.25" />
              LinkedIn
            </a>
          )}
        </div>
      </div>

      {mentor.specialty && (
        <div className="flex items-start gap-2 mt-4 pt-4 border-t border-line">
          <Sparkles size={14} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted leading-relaxed">{mentor.specialty}</p>
        </div>
      )}
    </div>
  );
}