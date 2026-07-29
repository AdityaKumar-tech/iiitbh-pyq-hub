// src/components/RecentResources.jsx
import { FileText } from "lucide-react";

const resources = [
  { title: "Data Structures — Unit 4 Notes", subject: "DSA", type: "Notes" },
  { title: "OS Mid-Sem PYQ 2024", subject: "Operating Systems", type: "PYQ" },
  { title: "DBMS Lab Manual", subject: "DBMS", type: "Lab Manual" },
  { title: "Networks Assignment 2", subject: "Computer Networks", type: "Assignment" },
];

export default function RecentResources() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-[#0F172A] tracking-tight mb-8">
        Recently uploaded
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
        {resources.map((r) => (
          <div
            key={r.title}
            className="min-w- rounde65 d-xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-9 h-9 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center mb-4">
              <FileText size={16} className="text-[#4F46E5]" />
            </div>
            <p className="text-sm font-medium text-[#0F172A] leading-snug">{r.title}</p>
            <p className="text-xs text-[#64748B] mt-2">{r.subject} · {r.type}</p>
          </div>
        ))}
      </div>
    </section>
  );
}