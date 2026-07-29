// src/components/OverviewPanel.jsx
import { ArrowRight } from "lucide-react";
import { resourceTypes } from "../lib/resourceTypes";

export default function OverviewPanel({ subject, onJumpToTab }) {
  const recent = subject.recent || [];

  return (
    <div className="flex flex-col gap-10">
      {subject.description && (
        <p className="text-[15px] text-ink leading-relaxed max-w-2xl">
          {subject.description}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Object.entries(subject.counts).map(([type, count]) => {
          const meta = resourceTypes[type];
          const Icon = meta.icon;
          return (
            <button
              key={type}
              onClick={() => onJumpToTab(type)}
              className="text-left rounded-card border border-line bg-white p-5 shadow-rest hover:shadow-hover hover:-translate-y-1 transition-all duration-200"
            >
              <Icon size={18} className="text-primary mb-3" />
              <p className="text-xl font-extrabold text-ink">{count}</p>
              <p className="text-xs text-muted mt-0.5">{meta.label}</p>
            </button>
          );
        })}
      </div>

      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-ink">Recently added</h2>
            <button
              onClick={() => onJumpToTab("downloads")}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:gap-1.5 transition-all"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recent.slice(0, 3).map((item) => {
              const Icon = resourceTypes[item.type]?.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 px-5 rounded-card border border-line bg-white"
                >
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{item.title}</p>
                    <p className="text-xs text-muted mt-0.5">{item.meta}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}