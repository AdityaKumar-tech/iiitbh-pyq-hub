// src/components/SubjectHeader.jsx
import { BookOpen, Bookmark } from "lucide-react";
import { resourceTypes } from "../lib/resourceTypes";

export default function SubjectHeader({ subject, semesterId }) {

  return (
    <div className="mb-8 pb-8 border-b border-line">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen size={22} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold text-muted bg-[#F1F5F9] px-2 py-1 rounded-md">
                {subject.code}
              </span>
              <span className="text-xs text-muted">Semester {semesterId}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
              {subject.name}
            </h1>
            <p className="text-sm text-muted mt-1">{subject.instructor}</p>
          </div>
        </div>

      </div>

    </div>
  );
}