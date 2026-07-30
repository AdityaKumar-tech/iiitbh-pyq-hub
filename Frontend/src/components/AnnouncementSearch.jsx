// src/components/AnnouncementSearch.jsx
import { Search } from "lucide-react";

export default function AnnouncementSearch({ value, onChange }) {
  return (
    <div className="relative max-w-lg mb-10">
      <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search announcements..."
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
      />
    </div>
  );
}