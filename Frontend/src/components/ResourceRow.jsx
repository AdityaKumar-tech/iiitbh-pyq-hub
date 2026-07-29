// src/components/ResourceRow.jsx
import { Download } from "lucide-react";

export default function ResourceRow({ resource, Icon }) {
  return (
    <div className="group flex items-center justify-between gap-4 py-4 px-5 rounded-card border border-line bg-white hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink truncate">{resource.title}</p>
          <p className="text-xs text-muted mt-0.5">{resource.meta}</p>
        </div>
      </div>

      <button
        aria-label={`Download ${resource.title}`}
        className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors"
      >
        <Download size={14} />
        <span className="hidden sm:inline">Download</span>
      </button>
    </div>
  );
}