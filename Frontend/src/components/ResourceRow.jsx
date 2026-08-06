// src/components/ResourceRow.jsx
import { Download, Eye, FileText } from "lucide-react";

export default function ResourceRow({ resource, Icon = FileText, badge, onPreview, onDownload }) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:px-5 sm:py-4 rounded-card border border-line/80 bg-surface shadow-rest transition-all duration-200 hover:shadow-hover hover:-translate-y-0.5 hover:border-primary/30 overflow-hidden">
      {/* Top Subtle Border Accent on Hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary/50 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Main Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          <Icon size={18} className="text-primary" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-ink truncate group-hover:text-primary transition-colors duration-200">
              {resource.title}
            </h4>
            {badge && (
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-secondary/15 text-secondary">
                {badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted/90 font-medium">
            <span>{resource.meta}</span>
            {resource.author && (
              <>
                <span className="text-line">•</span>
                <span className="truncate">By {resource.author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions (Preview + Download) */}
      <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-line/40 justify-end">
        {/* Preview Button */}
        <a
          href={resource.viewUrl || "#"}
          onClick={onPreview ? (e) => { e.preventDefault(); onPreview(resource); } : undefined}
          aria-label={`Preview ${resource.title}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-muted border border-line/60 bg-surface hover:bg-surface-2 hover:text-ink transition-all duration-200"
        >
          <Eye size={14} />
          <span>Preview</span>
        </a>

        {/* Download Button */}
        <a
          href={resource.downloadUrl || "#"}
          onClick={onDownload ? (e) => { e.preventDefault(); onDownload(resource); } : undefined}
          aria-label={`Download ${resource.title}`}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-primary text-surface hover:bg-primary-light active:scale-[0.98] transition-all duration-200 shadow-xs cursor-pointer"
        >
          <Download size={14} />
          <span>Download</span>
        </a>
      </div>
    </div>
  );
}